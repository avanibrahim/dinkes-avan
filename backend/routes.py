from flask import Blueprint, request, jsonify
from knowledge_base import knowledge_base
from cf_logic import combine_cf

routes = Blueprint("api", __name__, url_prefix="/api")

def interpretasi_cf(cf):
    if cf >= 0.85:
        return "Kemungkinan Sangat Tinggi"
    elif cf >= 0.7:
        return "Kemungkinan Tinggi"
    elif cf >= 0.4:
        return "Kemungkinan Rendah"
    else:
        return "Kemungkinan Sangat Rendah"

def deskripsi_penyakit(nama):
    deskripsi = {
        "DBD": "Demam Berdarah Dengue (DBD) adalah infeksi virus yang ditularkan oleh nyamuk Aedes aegypti. Gejala umum meliputi demam tinggi, bintik merah, mimisan, dan nyeri di ulu hati.",
        "HIV": "HIV adalah virus yang menyerang sistem kekebalan tubuh. Gejalanya bisa berupa kelelahan ekstrem, sariawan, dan infeksi berulang.",
        "TBC": "Tuberkulosis (TBC) adalah infeksi paru menular yang disebabkan oleh bakteri Mycobacterium tuberculosis. Gejala khas meliputi batuk lama, demam, dan berat badan turun."
    }
    return deskripsi.get(nama, "-")

def analisis_gejala_dominan(detail):
    if not detail:
        return "Tidak ada gejala yang cukup signifikan untuk dianalisis."
    tertinggi = max(detail, key=lambda x: x["cf_hasil"])
    return (
        f"Gejala paling dominan yang Anda alami adalah: "
        f"'{tertinggi['gejala']}' dengan nilai kepercayaan {tertinggi['cf_hasil']}."
    )

def generate_catatan(status, penyakit):
    if status == "Positif":
        return {
            "DBD": [
                "Beri minum air matang seperti oralit.",
                "Kompres hangat untuk turunkan demam.",
                "Segera ke Puskesmas/RS jika gejala berat."
            ],
            "HIV": [
                "Lakukan tes HIV di klinik terdekat.",
                "Hindari aktivitas penularan.",
                "Konsultasi VCT sesegera mungkin."
            ],
            "TBC": [
                "Pemeriksaan dahak di RS/Puskesmas.",
                "Gunakan masker saat batuk.",
                "Pastikan ventilasi ruang baik."
            ]
        }[penyakit]
    elif status == "Netral":
        return [
            "Gejala belum cukup kuat untuk kesimpulan pasti.",
            "Segera periksa ke dokter untuk penanganan lebih akurat."
        ]
    else:
        return [
            "Pantau gejala lanjutan dengan cermat.",
            "Jaga daya tahan tubuh dan konsumsi cairan.",
            "Segera periksa bila kondisi memburuk."
        ]

@routes.route("/diagnosa", methods=["POST"])
def diagnosa_handler():
    data = request.json or {}
    jawaban_user = data.get("gejala", {})
    penyakit_input = data.get("penyakit")

    # validasi input
    if not penyakit_input or penyakit_input not in knowledge_base:
        return jsonify({"error": "Penyakit tidak dikenali"}), 400

    daftar_gejala = knowledge_base[penyakit_input]
    cf_list = []
    detail = []

    # hitung CF per gejala
    for gid, info in daftar_gejala.items():
        nilai = jawaban_user.get(gid, 0)
        if nilai > 0:
            cf_hasil = round(nilai * info["cf"], 2)
            cf_list.append(cf_hasil)
            detail.append({
                "gejala": info["pertanyaan"],
                "cf_user": nilai,
                "cf_pakar": info["cf"],
                "cf_hasil": cf_hasil
            })

    # jika user tidak menjawab satupun gejala >0
    if not cf_list:
        payload = {
            "penyakit": penyakit_input,
            "cf": 0.0,
            "status": "Negatif",
            "kategori": interpretasi_cf(0.0),
            "judul_catatan": "EDUKASI KESEHATAN",
            "catatan": ["Tidak ada gejala yang cocok."],
            "deskripsi_penyakit": deskripsi_penyakit(penyakit_input),
            "analisis": analisis_gejala_dominan([]),
            "detail": []
        }
        return jsonify(payload)

    # gabung CF list
    from cf_logic import combine_cf
    hasil_cf = round(combine_cf(cf_list), 2)

    # tentukan status
    if hasil_cf >= 0.7:
        status = "Positif"
    elif hasil_cf >= 0.4:
        status = "Netral"
    else:
        status = "Negatif"

    payload = {
        "penyakit": penyakit_input,
        "cf": hasil_cf,
        "status": status,
        "kategori": interpretasi_cf(hasil_cf),
        "judul_catatan": f"Catatan untuk diagnosa {status}",
        "catatan": generate_catatan(status, penyakit_input),
        "deskripsi_penyakit": deskripsi_penyakit(penyakit_input),
        "analisis": analisis_gejala_dominan(detail),
        "detail": detail
    }
    return jsonify(payload)
