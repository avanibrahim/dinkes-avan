from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

knowledge_base = {
    "DBD": {
        "panas_tinggi_lesu": {"pertanyaan": "Mendadak panas tinggi, tampak lemah dan lesu", "cf": 0.8},
        "nyeri_ulu_hati": {"pertanyaan": "Seringkali ulu hati terasa nyeri", "cf": 0.7},
        "bintik_merah_petekie": {"pertanyaan": "Tampak bintik merah seperti petekie", "cf": 0.9},
        "mimisan": {"pertanyaan": "Kadang-kadang terjadi mimisan", "cf": 0.7},
        "muntah_berdarah": {"pertanyaan": "Muntah atau buang air besar bercampur darah", "cf": 0.8},
        "gelisah_kaki_dingin": {"pertanyaan": "Gelisah, ujung tangan dan kaki dingin", "cf": 0.9}
    },
    # HIV dan TBC bisa ditambahkan di sini jika perlu
}

@app.route("/api/diagnosa", methods=["POST"])
def diagnosa():
    data = request.json
    penyakit = data.get("penyakit")
    jawaban_user = data.get("gejala", {})

    if penyakit not in knowledge_base:
        return jsonify({"error": "Penyakit tidak ditemukan"}), 400

    cf_list = []
    detail_perhitungan = []

    for id_gejala, nilai_user in jawaban_user.items():
        data_gejala = knowledge_base[penyakit].get(id_gejala)
        if data_gejala:
            cf = nilai_user * data_gejala["cf"]
            cf_list.append(cf)
            detail_perhitungan.append({
                "gejala": id_gejala,
                "cf_user": nilai_user,
                "cf_pakar": data_gejala["cf"],
                "cf_hasil": cf
            })

    if not cf_list:
        return jsonify({
            "cf": 0.0,
            "status": "Negatif",
            "judul_catatan": "EDUKASI KESEHATAN",
            "catatan": ["Tidak ada gejala yang cocok."],
            "detail": []
        })

    hasil_cf = cf_list[0]
    for cf in cf_list[1:]:
        hasil_cf = hasil_cf + cf * (1 - hasil_cf)

    # Tentukan hasil
    if hasil_cf >= 0.7:
        status = "Positif"
        judul_catatan = "TINDAKAN PERTOLONGAN"
        catatan = [
            "Beri minum sebanyak-banyaknya dengan air matang seperti teh, susu, atau oralit.",
            "Beri obat penurun demam (parasetamol), bantu dengan kompres air hangat.",
            "Segera bawa ke Puskesmas atau RS jika terjadi muntah terus, nyeri ulu hati, tangan/kaki dingin."
        ]
    elif hasil_cf >= 0.4:
        status = "Netral"
        judul_catatan = "SARAN LANJUTAN"
        catatan = [
            "Gejala belum cukup kuat untuk kesimpulan pasti.",
            "Segera periksa ke dokter untuk diagnosis lebih akurat."
        ]
    else:
        status = "Negatif"
        judul_catatan = "EDUKASI KESEHATAN"
        catatan = [
            "Pantau gejala lanjutan dengan cermat.",
            "Jaga daya tahan tubuh dan konsumsi cairan.",
            "Segera periksa bila kondisi memburuk."
        ]

    return jsonify({
        "cf": round(hasil_cf, 2),
        "status": status,
        "judul_catatan": judul_catatan,
        "catatan": catatan,
        "detail": detail_perhitungan
    })

if __name__ == "__main__":
    app.run(debug=True, port=5050)
