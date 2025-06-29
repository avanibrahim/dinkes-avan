import React, { useState } from "react";
import { CheckCircle, XCircle, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import ResultCard from "@/components/diagnosis/ResultCard";
import ChartResult from "@/components/diagnosis/ChartResult";
import { exportDiagnosisToPDF } from "@/lib/pdf";

const questions = [
  { id: "q1", text: "Apakah Anda mengalami demam tinggi mendadak (di atas 38°C)?" },
  { id: "q2", text: "Apakah terdapat bintik merah pada kulit atau pendarahan ringan (gusi, mimisan)?" },
  { id: "q3", text: "Apakah Anda mengalami nyeri otot dan sendi yang parah?" },
  { id: "q4", text: "Apakah Anda merasa lelah atau lemas berlebihan tanpa sebab jelas?" },
  { id: "q5", text: "Apakah Anda tinggal di daerah yang banyak kasus DBD?" },
  { id: "q6", text: "Apakah Anda mengalami mual, muntah, atau sakit perut?" },
];

export default function DbdDiagnosis() {
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [result, setResult] = useState<string | null>(null);
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
    setMlResult(null);

    const score = Object.values(answers).filter(Boolean).length;
    if (score >= 3) {
      setResult("Hasil manual menunjukkan indikasi kemungkinan DBD.");
    } else {
      setResult("Tidak ditemukan indikasi kuat DBD berdasarkan jawaban Anda.");
    }

    try {
      const res = await fetch("http://localhost:8000/predict/dbd", {
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
      setMlResult({
        prediction: "Gagal memuat hasil dari model.",
        penjelasan: "",
        saran: "",
        chart_data: { positif: 0, negatif: 0 },
      });
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#e6f7f9] to-white py-36 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[80vh]">
        {/* KIRI: Gambar + Edukasi */}
        <div className="flex flex-col justify-center items-start space-y-6 px-4">
          <img
            src="/img/dbd.png" // Ganti dengan path gambar kamu
            alt="Ilustrasi DBD"
            className="w-full max-w-sm mx-auto"

          />
          <div>
            <h2 className="text-2xl font-bold text-teal-700 mb-2">Apa Itu DBD?</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Demam Berdarah Dengue (DBD) adalah penyakit akibat virus dengue yang ditularkan
              oleh nyamuk Aedes aegypti. Gejala umum meliputi demam tinggi mendadak, nyeri
              otot, bintik merah, dan bisa berakibat fatal jika tidak ditangani dengan cepat.
            </p>
          </div>
        </div>

        {/* KANAN: Form */}
        <section className="h-[80vh] bg-white/70 rounded-xl shadow px-6 py-6 backdrop-blur-sm flex flex-col">
          <div>
            <h1 className="text-3xl font-bold text-teal-700 mb-2">Form Diagnosis DBD</h1>
            <p className="text-gray-600 mb-4">Jawab pertanyaan berikut dengan jujur.</p>
          </div>

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
                        ? "bg-green-500 text-white"
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
                        : "bg-gray-100 text-gray-700 hover:bg-red-200"
                    )}
                  >
                    <XCircle size={18} /> Tidak
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <button
              onClick={diagnose}
              disabled={!allAnswered || loading}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Lihat Hasil Diagnosis"}
            </button>

            {allAnswered && mlResult && (
              <button
                onClick={() =>
                  exportDiagnosisToPDF({
                    title: "Hasil Diagnosa DBD",
                    answers,
                    result: result || "",
                    mlPrediction: mlResult.prediction,
                  })
                }
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Download Hasil PDF
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
            <div className="flex-1 space-y-4 animate-slide-in-left">
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

            <div className="w-full md:w-[300px] lg:w-[400px] animate-slide-in-right">
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
