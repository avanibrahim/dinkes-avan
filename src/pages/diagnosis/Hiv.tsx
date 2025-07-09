import { useState } from "react";
import axios from "@/api/axiosConfig";

interface HasilDiagnosis {
  cf: number;
  status: string;
  judul_catatan: string;
  catatan: string[];
}

export default function HivDiagnosis() {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<HasilDiagnosis | null>(null);
  const [loading, setLoading] = useState(false);

  const gejala = [
    { id: "demam_berulang", pertanyaan: "Demam berulang atau mirip flu yang tidak kunjung reda" },
    { id: "kelelahan_ekstrem", pertanyaan: "Kelelahan ekstrem tanpa sebab yang jelas" },
    { id: "berat_badan_turun", pertanyaan: "Berat badan turun drastis" },
    { id: "diare_berkepanjangan", pertanyaan: "Diare terus-menerus atau kronis" },
    { id: "pembengkakan_kelenjar", pertanyaan: "Pembengkakan kelenjar getah bening yang menetap" },
    { id: "sariawan_ruam_luka", pertanyaan: "Sariawan, ruam, atau luka di mulut, anus, atau alat kelamin" }
  ];

  const handleChange = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitDiagnosis = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/diagnosa", {
        penyakit: "HIV",
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
      <h1 className="text-2xl font-bold mb-4">Form Diagnosis Penyakit HIV/AIDS</h1>

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
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
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
