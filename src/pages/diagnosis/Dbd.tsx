import { useState } from "react";
import axios from "@/api/axiosConfig";

interface HasilDiagnosis {
  cf: number;
  status: string;
  judul_catatan: string;
  catatan: string[];
  detail?: {
    gejala: string;
    cf_user: number;
    cf_pakar: number;
    cf_hasil: number;
  }[];
}

export default function DbdDiagnosis() {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<HasilDiagnosis | null>(null);
  const [loading, setLoading] = useState(false);

  const gejala = [
    { id: "panas_tinggi_lesu", pertanyaan: "Mendadak panas tinggi, tampak lemah dan lesu" },
    { id: "nyeri_ulu_hati", pertanyaan: "Seringkali ulu hati terasa nyeri" },
    { id: "bintik_merah_petekie", pertanyaan: "Tampak bintik merah seperti petekie" },
    { id: "mimisan", pertanyaan: "Kadang-kadang terjadi mimisan" },
    { id: "muntah_berdarah", pertanyaan: "Muntah atau buang air besar bercampur darah" },
    { id: "gelisah_kaki_dingin", pertanyaan: "Gelisah, ujung tangan dan kaki dingin" }
  ];

  const handleChange = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitDiagnosis = async () => {
    setLoading(true);
    setResult(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulasi 5 detik
      const res = await axios.post("/api/diagnosa", {
        penyakit: "DBD",
        gejala: answers
      });
      setResult(res.data);
    } catch (error) {
      alert("Gagal mengirim data ke server.");
    }
    setLoading(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto p-6 bg-white rounded shadow">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <p className="text-blue-700 font-medium text-sm">Mohon tunggu, sistem sedang menganalisis gejala...</p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Form Diagnosis Penyakit DBD</h1>

      {gejala.map((item) => (
        <div key={item.id} className="mb-6">
          <label className="block font-medium mb-2">{item.pertanyaan}</label>
          <div className="flex gap-4">
            {[{ label: "YA", value: 1.0 }, { label: "TIDAK", value: 0.0 }].map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`px-4 py-2 rounded border ${
                  answers[item.id] === opt.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                onClick={() => handleChange(item.id, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={submitDiagnosis}
        disabled={loading}
        className="mt-6 px-6 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
      >
        Diagnosa Sekarang
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Ringkasan Hasil</h2>
          <p className="mb-2">
            Berdasarkan gejala yang Anda pilih, terdapat indikasi <strong>{Math.round(result.cf * 100)}%</strong>
            mengarah pada kemungkinan {" "}
            <span className={
              result.status === "Positif" ? "text-red-600 font-semibold" :
              result.status === "Netral" ? "text-yellow-600 font-semibold" :
              "text-green-600 font-semibold"
            }>
              {result.status === "Positif"
                ? "POSITIF"
                : result.status === "Netral"
                ? "belum pasti (NETRAL)"
                : "TIDAK TERINDIKASI"}
            </span>{" "}
            terhadap penyakit <strong>DBD</strong>.
          </p>

          <p className="mb-4 text-sm text-gray-600">
            * Perhitungan ini berdasarkan metode <strong>Certainty Factor</strong> dengan bobot keyakinan dari pakar.
            Hasil ini bukan diagnosis medis final.
          </p>

          <h3 className="font-semibold">{result.judul_catatan}</h3>
          <ul className="list-disc ml-6 mt-2 text-sm">
            {result.catatan.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          {result.detail && (
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Detail Perhitungan:</h4>
              <table className="text-sm w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Gejala</th>
                    <th className="p-2 border">CF User</th>
                    <th className="p-2 border">CF Pakar</th>
                    <th className="p-2 border">Hasil</th>
                  </tr>
                </thead>
                <tbody>
                  {result.detail.map((d, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border">{d.gejala}</td>
                      <td className="p-2 border text-center">{d.cf_user}</td>
                      <td className="p-2 border text-center">{d.cf_pakar}</td>
                      <td className="p-2 border text-center">{d.cf_hasil.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}