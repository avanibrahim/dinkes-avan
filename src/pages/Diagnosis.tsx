import React, { useState } from "react";
import { CheckCircle, XCircle, Microscope, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import ResultCard from "@/components/diagnosis/ResultCard";


const questions = [
  { id: "q1", text: "Apakah tinggi badan Anda tidak sesuai dengan usia (sangat pendek)?", category: "stunting" },
  { id: "q2", text: "Apakah ada riwayat gizi buruk atau asupan nutrisi kurang sejak lahir?", category: "stunting" },
  { id: "q3", text: "Apakah anak Anda tidak mendapatkan ASI eksklusif selama 6 bulan pertama?", category: "stunting" },
  { id: "q4", text: "Apakah Anda tinggal di lingkungan dengan sanitasi buruk?", category: "stunting" },

  { id: "q5", text: "Apakah Anda mengalami penurunan berat badan drastis tanpa sebab jelas?", category: "hiv" },
  { id: "q6", text: "Apakah Anda sering demam berkepanjangan (lebih dari 1 bulan)?", category: "hiv" },
  { id: "q7", text: "Apakah ada riwayat kontak dengan penderita HIV?", category: "hiv" },
  { id: "q8", text: "Apakah Anda mengalami kelelahan terus-menerus tanpa alasan?", category: "hiv" },

  { id: "q9", text: "Apakah Anda mengalami demam tinggi mendadak (di atas 38°C)?", category: "dbd" },
  { id: "q10", text: "Apakah ada bintik-bintik merah di kulit atau pendarahan ringan (mimisan, gusi berdarah)?", category: "dbd" },
  { id: "q11", text: "Apakah tinggal di daerah yang banyak kasus DBD?", category: "dbd" },
  { id: "q12", text: "Apakah Anda merasa nyeri otot dan sendi yang parah seperti gejala 'breakbone fever'?", category: "dbd" },
];


export default function DiagnosisForm() {
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [result, setResult] = useState<string | null>(null);
  const [mlPrediction, setMlPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const allAnswered = questions.every((q) => answers.hasOwnProperty(q.id));

  const diagnose = async () => {
    setLoading(true);
    setResult(null);
    setMlPrediction(null);

    let stunting = 0, hiv = 0, dbd = 0, sehat = 0;

    questions.forEach((q) => {
      if (answers[q.id]) {
        if (q.category === "stunting") stunting++;
        if (q.category === "hiv") hiv++;
        if (q.category === "dbd") dbd++;
        if (q.category === "sehat") sehat++;
      }
    });

    let resultText = "";
    if (stunting >= 2) resultText += "Kemungkinan Stunting.\n";
    if (hiv >= 2) resultText += "Kemungkinan HIV.\n";
    if (dbd >= 2) resultText += "Kemungkinan DBD.\n";
    if (!resultText) resultText = "Tidak ditemukan indikasi kuat ke arah Stunting, HIV, atau DBD.";

    setResult(resultText);

    // 🔗 Kirim ke API FastAPI
    try {
      const res = await fetch("http://localhost:8000/predict", {
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
      setMlPrediction(data.prediction);
    } catch (err) {
      console.error("Gagal prediksi ML:", err);
      setMlPrediction("Gagal memuat prediksi dari model ML.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pt-44">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
    
    {/* 🖼 ILUSTRASI KESEHATAN */}
    <div className="flex justify-center items-start border-radius-xl overflow-hidden">
      <img
        src="/img/diagnosis.png"
        alt="Ilustrasi Diagnosis"
        className="w-full max-w-sm md:max-w-md object-contain"
      />
    </div>

    {/* 📋 FORM DIAGNOSIS - Scrollable */}
    <div className="max-w-4xl mx-auto px-4 pt-13">
  {/* Header Tetap di Atas */}
  <div className="mb-6">
    <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2">
      Form Diagnosa Stunting
    </h1>
    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
      Jawablah pertanyaan di bawah ini sesuai dengan kondisi yang Anda alami untuk membantu sistem dalam mendiagnosis kemungkinan penyakit secara cepat dan akurat.
    </p>
  </div>

  {/* Bagian yang Bisa Discroll */}
  <div className="h-[70vh] overflow-y-auto pr-2 scroll-smooth space-y-6">
    {questions.map((q, index) => (
      <div
        key={q.id}
        className="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-sm transition hover:shadow-md"
      >
        <p className="font-medium text-gray-800 mb-3">
          {index + 1}. {q.text}
        </p>
        <div className="flex gap-4">
          <button
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition",
              answers[q.id] === true
                ? "bg-teal-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-teal-100"
            )}
            onClick={() => handleAnswerChange(q.id, true)}
          >
            <CheckCircle size={18} /> Ya
          </button>
          <button
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition",
              answers[q.id] === false
                ? "bg-red-500 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-red-100"
            )}
            onClick={() => handleAnswerChange(q.id, false)}
          >
            <XCircle size={18} /> Tidak
          </button>
        </div>
      </div>
    ))}

    {/* Tombol Submit di dalam scroll */}
    <div className="text-center mt-10 pb-10">
      <button
        onClick={diagnose}
        disabled={loading || !allAnswered}
        className="bg-teal-600 text-white font-semibold text-lg px-6 py-3 rounded-xl shadow-md hover:bg-teal-700 transition disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Lihat Hasil Diagnosis"}
      </button>
    </div>
  </div>
</div>


  </div>

  {/* 🔽 HASIL DI BAWAH - Tetap horizontal */}
  <div className="mt-12">
    {result && (
      <div className="w-full bg-transparant border border-gray-100 rounded-xl shadow-md p-6 mb-6">
        <ResultCard result={result} />
      </div>
    )}

    {mlPrediction && (
      <div className="w-full p-6 bg-teal-50 border border-indigo-100 rounded-xl shadow flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-2 text-teal-700 font-semibold text-lg mb-3 sm:mb-0">
          <Bot size={20} /> Prediksi Machine Learning
        </div>
        <p className="text-gray-800 text-sm text-center sm:text-right whitespace-pre-line">
          {mlPrediction}
        </p>
      </div>
    )}
  </div>
</section>


  );
}
