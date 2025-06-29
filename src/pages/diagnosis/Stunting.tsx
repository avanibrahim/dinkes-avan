"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import ResultCard from "@/components/diagnosis/ResultCard";
import ChartResult from "@/components/diagnosis/ChartResult";
import { exportDiagnosisToPDF } from "@/lib/pdf";

const questions = [
  { id: "q1", text: "Apakah tinggi badan anak sangat pendek dibanding teman seusianya?" },
  { id: "q2", text: "Apakah anak tidak mendapatkan ASI eksklusif selama 6 bulan pertama?" },
  { id: "q3", text: "Apakah anak mengalami kekurangan asupan gizi dalam waktu lama?" },
  { id: "q4", text: "Apakah anak sering mengalami infeksi berulang seperti diare atau ISPA?" },
  { id: "q5", text: "Apakah berat badan anak tidak naik sesuai grafik pertumbuhan?" },
  { id: "q6", text: "Apakah lingkungan tempat tinggal anak memiliki sanitasi buruk?" },
  { id: "q7", text: "Apakah keluarga memiliki riwayat stunting sebelumnya?" },
  { id: "q8", text: "Apakah ibu mengalami kekurangan gizi selama masa kehamilan?" },
];

export default function DiagnosisForm() {
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [result, setResult] = useState<string | null>(null);
  const [mlPrediction, setMlPrediction] = useState<string | null>(null);
  const [mlResult, setMlResult] = useState<{
    prediction: string;
    penjelasan: string;
    saran: string;
    chart_data: { positif: number; negatif: number };
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const allAnswered = questions.every((q) => answers.hasOwnProperty(q.id));

  const handleAnswerChange = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const diagnose = async () => {
    setLoading(true);
    setResult(null);
    setMlPrediction(null);
    setMlResult(null);

    const manualScore = Object.values(answers).filter(Boolean).length;
    setResult(
      manualScore >= 4
        ? "Hasil manual menunjukkan indikasi kuat Stunting."
        : "Tidak ada indikasi kuat Stunting berdasarkan jawaban Anda."
    );

    try {
      const res = await fetch("http://localhost:8000/predict/stunting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          questions.reduce((acc, q) => {
            acc[q.id] = answers[q.id] ? 1 : 0;
            return acc;
          }, {} as { [key: string]: number })
        ),
      });
      const data = await res.json();
      setMlResult(data);
    } catch (err) {
      console.error("❌ Gagal prediksi:", err);
      setMlPrediction("Gagal memuat hasil dari model.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#e6f7f9] to-white py-36 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[80vh]">
        {/* KIRI: Edukasi */}
        <div className="flex flex-col justify-center items-start space-y-6 px-4">
          <img
            src="/img/stunting.png"
            alt="Ilustrasi Stunting"
            className="w-full max-w-sm mx-auto"
          />
          <div>
            <h2 className="text-2xl font-bold text-teal-700 mb-2">Apa Itu Stunting?</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Stunting adalah kondisi gagal tumbuh pada anak balita akibat kekurangan gizi kronis
              dan infeksi berulang, terutama pada 1.000 hari pertama kehidupan. Anak yang stunting
              memiliki tinggi badan lebih pendek dari standar usianya dan berisiko mengalami
              hambatan perkembangan kognitif dan kesehatan jangka panjang.
            </p>
          </div>
        </div>

        {/* KANAN: Form Diagnosis */}
        <section className="h-[80vh] bg-white/70 rounded-xl shadow px-6 py-6 backdrop-blur-sm flex flex-col">
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold text-teal-700 mb-2">Form Diagnosis Stunting</h1>
            <p className="text-gray-600 mb-4">Jawab pertanyaan berikut dengan jujur.</p>
          </div>

          {/* SCROLLABLE FORM */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-5">
            {questions.map((q, i) => (
              <div key={q.id} className="bg-white p-4 rounded-xl shadow">
                <p className="mb-2 font-medium text-gray-800">
                  {i + 1}. {q.text}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswerChange(q.id, true)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition",
                      answers[q.id] === true
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-green-100"
                    )}
                  >
                    <CheckCircle size={18} /> Ya
                  </button>
                  <button
                    onClick={() => handleAnswerChange(q.id, false)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition",
                      answers[q.id] === false
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-red-100"
                    )}
                  >
                    <XCircle size={18} /> Tidak
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER: Tombol */}
          <div className="mt-4 space-y-3">
            <button
              onClick={diagnose}
              disabled={!allAnswered || loading}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Lihat Hasil Diagnosis"}
            </button>

            {allAnswered && (result || mlPrediction) && (
  <button
  className="bg-red-600 text-white px-4 py-2 rounded"
  onClick={() => {
    console.log("✅ Tombol diklik");
    exportDiagnosisToPDF({
      title: "Test",
      answers: { q1: true, q2: false },
      result: "Positif",
      mlPrediction: "Prediksi dari ML: Negatif",
    });
  }}
>
  Download PDF
</button>

)}

          </div>
        </section>
      </div>

      {/* HASIL DIAGNOSIS */}
      {(result || mlResult) && (
  <div className="max-w-7xl mx-auto mt-12 animate-fade-in bg-white rounded-xl shadow px-6 py-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Hasil Diagnosis</h2>

    <div className="flex flex-col md:flex-row gap-6">
      {/* KIRI: Teks dan ResultCard */}
      <div className="flex-1 space-y-4">
        {result && (
          <p className="text-gray-700 text-sm md:text-base">
            <span className="font-semibold">Analisis Manual:</span> {result}
          </p>
        )}

        {mlResult && (
          <ResultCard
            result={mlResult.prediction}
            penjelasan={mlResult.penjelasan}
            saran={mlResult.saran}
            chartData={mlResult.chart_data}
          />
        )}
      </div>

      {/* KANAN: Chart */}
      <div className="w-full md:w-[300px] lg:w-[400px]">
        <ChartResult
          data={[
            { name: "Gejala Terpenuhi", value: Object.values(answers).filter(Boolean).length },
            { name: "Tidak Terpenuhi", value: Object.values(answers).filter((v) => !v).length },
            { name: "Prediksi ML", value: mlResult?.prediction === "Positif" ? 1 : 0 },
          ]}
        />
      </div>
    </div>
  </div>
)}

    </div>
  );
}
