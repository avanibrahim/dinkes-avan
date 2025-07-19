def combine_cf(cf_values):
    """
    Menggabungkan nilai CF menggunakan:
    CFcombine = CF1 + CF2 * (1 - CF1)
    """
    if not cf_values:
        return 0.0
    result = cf_values[0]
    for cf in cf_values[1:]:
        result = result + cf * (1 - result)
    return round(result, 4)


def interpret_cf(cf_value, jumlah_gejala_aktif):
    """
    Interpretasi hasil akhir diagnosis:
    - Jika gejala aktif < 3, tetap 'Netral'
    - Jika cukup bukti, nilai CF menentukan status
    """
    if jumlah_gejala_aktif < 3:
        return "Netral"

    if cf_value < 0.6:
        return "Negatif"
    elif cf_value < 0.8:
        return "Netral"
    else:
        return "Positif"


def process_cf(jawaban_user, daftar_gejala):
    """
    Memproses input user:
    - CF pakar dikalikan nilai user
    - Jika < 0.6 → penalti
    - Jika < 0.4 → abaikan
    - Jika gejala < 3 → CF final diturunkan
    """
    cf_list = []
    detail = []

    for id_gejala, data_gejala in daftar_gejala.items():
        nilai_user = jawaban_user.get(id_gejala)

        if nilai_user is None or nilai_user < 0.4:
            continue  # terlalu rendah → tidak dihitung

        cf_pakar = data_gejala["cf"]
        penalti = 0.5 if nilai_user < 0.6 else 1.0
        cf_hasil = round(nilai_user * cf_pakar * penalti, 4)

        cf_list.append(cf_hasil)
        detail.append({
            "gejala": data_gejala.get("nama", data_gejala.get("pertanyaan", id_gejala)),
            "cf_user": nilai_user,
            "cf_pakar": cf_pakar,
            "cf_hasil": cf_hasil
        })

    final_cf = combine_cf(cf_list)
    jumlah_gejala_aktif = len(cf_list)

    # Turunkan CF jika terlalu sedikit gejala yang meyakinkan
    if jumlah_gejala_aktif < 3:
        final_cf = round(final_cf * 0.6, 4)

    status = interpret_cf(final_cf, jumlah_gejala_aktif)

    return {
        "cf": final_cf,
        "status": status,
        "detail": detail
    }
