import React, { useState } from "react";
import { BarChart3, CheckCircle, XCircle, AlertCircle, TrendingUp, HeartPulse, Shield, Microscope } from "lucide-react"; // Import ikon tambahan
import { cn } from "@/lib/utils"; // Pastikan utilitas cn tersedia

// Definisi pertanyaan dan aturan diagnosis (Basis Pengetahuan Sederhana)
const questions = [
  {
    id: "q1",
    text: "Apakah tinggi badan Anda tidak sesuai dengan usia (sangat pendek)?",
    category: "stunting",
  },
  {
    id: "q2",
    text: "Apakah ada riwayat gizi buruk atau asupan nutrisi kurang sejak lahir?",
    category: "stunting",
  },
  {
    id: "q3",
    text: "Apakah Anda mengalami penurunan berat badan drastis tanpa sebab jelas?",
    category: "hiv",
  },
  {
    id: "q4",
    text: "Apakah Anda sering demam berkepanjangan (lebih dari 1 bulan)?",
    category: "hiv",
  },
  {
    id: "q5",
    text: "Apakah Anda mengalami demam tinggi mendadak (di atas 38°C)?",
    category: "dbd",
  },
  {
    id: "q6",
    text: "Apakah ada bintik-bintik merah di kulit atau pendarahan ringan (mimisan, gusi berdarah)?",
    category: "dbd",
  },
  {
    id: "q7",
    text: "Apakah ada riwayat kontak dengan penderita HIV?",
    category: "hiv",
  },
  {
    id: "q8",
    text: "Apakah tinggal di daerah yang banyak kasus DBD?",
    category: "dbd",
  },
  // Tambahkan pertanyaan lain sesuai kebutuhan dan kompleksitas
];

const Diagnosis = () => {
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);

  const handleAnswerChange = (questionId: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const performDiagnosis = () => {
    // Reset hasil diagnosis
    setDiagnosisResult(null);

    // Mesin Inferensi Sederhana
    let stuntingScore = 0;
    let hivScore = 0;
    let dbdScore = 0;

    questions.forEach((q) => {
      if (answers[q.id]) { // Jika jawaban 'Ya'
        if (q.category === "stunting") stuntingScore++;
        if (q.category === "hiv") hivScore++;
        if (q.category === "dbd") dbdScore++;
      }
    });

    // Aturan Diagnosis
    let result = "Hasil awal: Tidak terindikasi penyakit serius dari gejala yang diberikan.";
    let hasSeriousSymptoms = false;

    if (stuntingScore >= 2) { // 2 atau lebih gejala stunting
      result = "Indikasi kemungkinan Stunting. Segera konsultasi ke fasilitas kesehatan terdekat.";
      hasSeriousSymptoms = true;
    }
    if (hivScore >= 2) { // 2 atau lebih gejala HIV
      result = (hasSeriousSymptoms ? result + "\n" : "") + "Indikasi kemungkinan HIV. Sangat disarankan untuk melakukan tes lebih lanjut.";
      hasSeriousSymptoms = true;
    }
    if (dbdScore >= 2) { // 2 atau lebih gejala DBD
      result = (hasSeriousSymptoms ? result + "\n" : "") + "Indikasi kemungkinan DBD. Segera periksakan diri ke dokter atau IGD.";
      hasSeriousSymptoms = true;
    }

    if (!hasSeriousSymptoms && Object.keys(answers).length === questions.length && Object.values(answers).every(ans => !ans)) {
        result = "Berdasarkan gejala yang Anda pilih, tidak ada indikasi kuat ke arah Stunting, HIV, atau DBD. Namun, jika ada keluhan lain, konsultasikan ke profesional medis.";
    } else if (!hasSeriousSymptoms) {
        result = "Berdasarkan gejala yang dipilih, tidak ada indikasi kuat ke arah Stunting, HIV, atau DBD. Jika gejala berlanjut, konsultasi ke profesional medis.";
    }


    setDiagnosisResult(result);
  };

  // Cek apakah semua pertanyaan sudah dijawab
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <section className="flex flex-col items-center py-24 px-6 max-w-7xl mx-auto animate-fade-in min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center max-w-2xl text-center mb-12">
        <span className="bg-tealCustomLight text-tealCustom px-3 py-1 rounded-full text-xs mb-5 font-semibold tracking-wider select-none">
          KUISIONER DIAGNOSA DINI
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-tealCustom leading-tight">
          Cek Indikasi Awal Penyakit <br /> Stunting, HIV, dan DBD
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg">
          Jawab pertanyaan-pertanyaan berikut dengan jujur untuk mendapatkan indikasi awal potensi penyakit. Ingat, ini bukan diagnosis medis resmi.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-100">
        {questions.map((q, index) => (
          <div key={q.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-800 text-lg mb-2 md:mb-0 md:w-3/4">
              {index + 1}. {q.text}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleAnswerChange(q.id, true)}
                className={cn(
                  "px-5 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                  answers[q.id] === true
                    ? "bg-tealCustom text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
              >
                <CheckCircle size={20} /> Ya
              </button>
              <button
                onClick={() => handleAnswerChange(q.id, false)}
                className={cn(
                  "px-5 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                  answers[q.id] === false
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
              >
                <XCircle size={20} /> Tidak
              </button>
            </div>
          </div>
        ))}

        <div className="text-center mt-8">
          <button
            onClick={performDiagnosis}
            disabled={!allAnswered}
            className={cn(
              "bg-tealCustom text-white font-semibold rounded-lg px-8 py-3 shadow-md transition focus:outline-none focus:ring-4 focus:ring-tealCustomLight",
              !allAnswered && "opacity-50 cursor-not-allowed"
            )}
          >
            {allAnswered ? "Dapatkan Hasil Diagnosis" : "Jawab Semua Pertanyaan"}
          </button>
        </div>

        {diagnosisResult && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-inner text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-2">
              <Microscope size={28} className="text-blue-500" /> Hasil Indikasi Awal:
            </h2>
            <p className="text-xl text-gray-800 whitespace-pre-line">
              {diagnosisResult}
            </p>
            <p className="mt-4 text-sm text-gray-600">
              *Disclaimer: Hasil ini adalah indikasi awal. Untuk diagnosis pasti, konsultasi dengan tenaga medis profesional.
            </p>
          </div>
        )}
      </div>

      {/* Bagian edukasi/informasi tambahan bisa ditambahkan di sini */}
      <div className="w-full max-w-4xl mt-12 bg-gray-50 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-tealCustom mb-6 flex items-center gap-3">
          <Shield size={28} className="text-tealCustom" /> Pentingnya Pencegahan & Deteksi Dini
        </h2>
        <p className="text-gray-700 text-lg mb-4">
          Pencegahan dan deteksi dini sangat krusial dalam mengatasi masalah kesehatan seperti stunting, HIV, dan DBD. Dengan memahami gejala awal dan mengambil tindakan yang tepat, kita dapat meningkatkan kualitas hidup dan mencegah komplikasi serius.
        </p>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <TrendingUp size={20} className="text-green-500 mt-1" />
            <span>Peningkatan kualitas hidup anak melalui nutrisi yang adekuat.</span>
          </li>
          <li className="flex items-start gap-3">
            <HeartPulse size={20} className="text-red-500 mt-1" />
            <span>Pengelolaan HIV yang lebih baik dengan penanganan cepat.</span>
          </li>
          <li className="flex items-start gap-3">
            <Shield size={20} className="text-blue-500 mt-1" />
            <span>Perlindungan komunitas dari wabah DBD.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Diagnosis;
