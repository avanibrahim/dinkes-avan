import { useState } from "react";
import axios from "@/api/axiosConfig";

interface HasilDiagnosis {
  cf: number;
  status: string;
  judul_catatan: string;
  catatan: string[];
}

export default function TbcDiagnosis() {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<HasilDiagnosis | null>(null);
  const [loading, setLoading] = useState(false);

  const gejala = [
    { id: "batuk_lebih_2_minggu", pertanyaan: "Batuk lebih dari 2 minggu, berdahak atau tidak" },
    { id: "berkeringat_malam", pertanyaan: "Berkeringat malam hari tanpa aktivitas" },
    { id: "demam_berulang", pertanyaan: "Demam meriang hilang-timbul tanpa sebab" },
    { id: "berat_badan_turun", pertanyaan: "Berat badan menurun atau tidak naik dalam 2 bulan" },
    { id: "nafsu_makan_menurun", pertanyaan: "Nafsu makan menurun signifikan" },
    { id: "lemah_letih_lesu", pertanyaan: "Lemah, letih, dan lesu setiap hari" }
  ];

  const handleChange = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitDiagnosis = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/diagnosa", {
        penyakit: "TBC",
        gejala: answers
      });
      setResult(res.data);
    } catch (error) {
      alert("Gagal mengirim data ke server.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Form Diagnosis Penyakit TBC</h1>

      {gejala.map((item) => (
        <div key={item.id} className="mb-4">
          <label className="block font-medium mb-1">{item.pertanyaan}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={answers[item.id] || 0}
            onChange={(e) => handleChange(item.id, parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-500">Tingkat keyakinan: {(answers[item.id] || 0).toFixed(1)}</div>
        </div>
      ))}

      <button
        onClick={submitDiagnosis}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? "Memproses..." : "Diagnosa Sekarang"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Hasil Diagnosis: {result.status}</h2>
          <p className="mb-3">Tingkat Keyakinan (CF): <strong>{result.cf}</strong></p>
          <h3 className="font-semibold">{result.judul_catatan}</h3>
          <ul className="list-disc ml-6 mt-2 text-sm">
            {result.catatan.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
