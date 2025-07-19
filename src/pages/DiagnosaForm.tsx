"use client";
import { useState } from "react";
import axios from "axios";

const gejalaList = [
  {
    id: "batuk_lebih_2_minggu",
    pertanyaan: "Batuk lebih dari 2 minggu, berdahak/tidak",
  },
  {
    id: "berkeringat_malam",
    pertanyaan: "Berkeringat malam tanpa aktivitas fisik",
  },
  {
    id: "demam_berulang",
    pertanyaan: "Demam meriang hilang timbul tanpa sebab",
  },
  {
    id: "berat_badan_turun",
    pertanyaan: "Berat badan turun/tidak naik 2 bulan terakhir",
  },
  {
    id: "nafsu_makan_menurun",
    pertanyaan: "Nafsu makan menurun signifikan",
  },
  {
    id: "lemah_letih_lesu",
    pertanyaan: "Lemah, letih, lesu setiap hari",
  },
];

const options = [
  { label: "Tidak", value: 0.0 },
  { label: "Ragu", value: 0.2 },
  { label: "Kurang Yakin", value: 0.4 },
  { label: "Yakin", value: 0.6 },
  { label: "Sangat Yakin", value: 0.8 },
  { label: "Pasti", value: 1.0 },
];

export const DiagnosaForm: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const currentQuestion = gejalaList[currentIndex];

  const handleAnswer = async (value: number) => {
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);

    if (currentIndex < gejalaList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:5050/api/diagnosa", {
          penyakit: "TBC",
          gejala: updated,
        });
        setResult(res.data);
      } catch (error) {
        alert("Gagal mengambil hasil diagnosis.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 mx-auto mt-6 w-full max-w-xl bg-white bg-opacity-90 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Diagnosis Tuberkulosis (TBC)</h2>

      {loading && (
        <div className="text-red-700 font-medium text-sm my-4">
          Menganalisis gejala, mohon tunggu...
        </div>
      )}

      {!loading && result && (
        <div className="text-sm text-left space-y-3">
          <p>
            Status:{" "}
            <strong
              className={
                result.status === "Positif"
                  ? "text-red-600"
                  : result.status === "Netral"
                  ? "text-yellow-600"
                  : "text-green-600"
              }
            >
              {result.status.toUpperCase()}
            </strong>
          </p>
          <p>Nilai CF: <strong>{(result.cf * 100).toFixed(2)}%</strong></p>

          <h3 className="font-semibold">{result.judul_catatan}</h3>
          <ul className="list-disc list-inside">
            {result.catatan.map((c: string, i: number) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !result && currentQuestion && (
        <div className="w-full text-left space-y-4">
          <p className="text-sm">{currentQuestion.pertanyaan}</p>

          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition-all"
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 text-center">
            Pertanyaan {currentIndex + 1} dari {gejalaList.length}
          </p>
        </div>
      )}
    </div>
  );
};
