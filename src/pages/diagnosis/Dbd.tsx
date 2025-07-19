// src/pages/Diagnosis/Dbd.tsx
import React, { useState, useRef } from "react";
import RightPanel from "@/components/RightPanel";
import { RefreshCw, HeartPulse } from "lucide-react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";
import BannerDiagnosa from "@/components/BannerDiagnosa";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const gejalaList = [
  {
    id: "panas_tinggi_lesu",
    pertanyaan:
      "Apakah Anda mengalami demam tinggi secara mendadak disertai rasa lemah atau lesu?",
  },
  {
    id: "nyeri_ulu_hati",
    pertanyaan:
      "Apakah Anda sering merasakan nyeri di bagian ulu hati secara tiba-tiba atau terus menerus?",
  },
  {
    id: "bintik_merah_petekie",
    pertanyaan:
      "Apakah muncul bintik-bintik merah di kulit Anda yang menyerupai petekie (tidak hilang saat ditekan)?",
  },
  {
    id: "mimisan",
    pertanyaan: "Apakah Anda mengalami mimisan yang terjadi tiba-tiba tanpa sebab jelas?",
  },
  {
    id: "muntah_berdarah",
    pertanyaan:
      "Apakah Anda pernah muntah atau buang air besar yang mengandung darah dalam beberapa hari terakhir?",
  },
  {
    id: "gelisah_kaki_dingin",
    pertanyaan:
      "Apakah Anda merasa gelisah dan mendapati tangan atau kaki Anda terasa dingin?",
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

export default function DbdDiagnosis() {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const currentQuestion = gejalaList[currentIndex];

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setCurrentIndex((i) => Math.min(i + 1, gejalaList.length));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await axios.post("http://localhost:5050/api/diagnosa", {
          penyakit: "DBD",
          gejala: answers,
        });
        const payload = res.data.diagnosis ? res.data.diagnosis[0] : res.data;
        setResult(payload);
      } catch {
        alert("Gagal mengambil hasil diagnosis.");
      } finally {
        setLoading(false);
      }
    }, 5000);
  };

  const exportPDF = () => {
    if (pdfRef.current) {
      html2pdf().from(pdfRef.current).save("hasil-diagnosis-dbd.pdf");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "positif":
        return "text-red-600 bg-red-100";
      case "netral":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-green-600 bg-green-100";
    }
  };

  return (
    <div className="flex bg-[#FAF9F6] min-h-screen">
      <motion.main
            className="flex-1 lg:pl-[1rem] lg:pr-[21rem] px-6 pb-10"
            initial="hidden"
            animate="visible"
            variants={container}
          >
        {/* Header */}
       <Header />

        {/* Banner */}
        <BannerDiagnosa />

        {/* Diagnosis Flow */}
         <motion.section className="mt-[1.5rem]" variants={fadeUp}>
          <div className="flex items-center justify-between w-full mb-4">
            <h2 className="text-xl font-semibold mb-0">
              Diagnosa Penyakit DBD
            </h2>
          <motion.button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2  bg-gradient-to-br from-teal-500 to-cyan-600 text-white px-3 py-1 rounded"
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.div>
          <span className="text-sm">Refresh Halaman</span>
        </motion.button>
        </div>

          <motion.div className="bg-white rounded-2xl shadow-lg p-8 relative" variants={fadeUp}>
            {currentIndex < gejalaList.length ? (
              <>
                {/* Question */}
                <motion.div className="border-2 border-gray-300 rounded-lg p-6 mb-6" variants={fadeUp}>
                  <p className="text-lg font-medium">{currentQuestion.pertanyaan}</p>
                </motion.div>

                {/* Options */}
                <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6" variants={fadeUp}>
                  {options.map((opt) => (
                    <motion.button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="py-3 rounded-full text-sm font-medium bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Progress */}
                <motion.p className="text-center text-gray-500" variants={fadeUp}>
                  Pertanyaan {currentIndex + 1} dari {gejalaList.length}
                </motion.p>
              </>
            ) : (
              <>
                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={loading || !!result}
                  className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-lg text-lg font-medium mb-6"
                  whileHover={{ scale: 1.02 }}
                  variants={fadeUp}
                >
                  {loading ? "Menganalisis..." : "Lihat Hasil Diagnosa"}
                </motion.button>

                {/* Result */}
                {result && (
                  <motion.div ref={pdfRef} className="space-y-6" variants={fadeUp}>
                    {/* Status */}
                    <div
                      className={`p-6 rounded-lg text-center font-bold text-xl ${getStatusColor(
                        result.status
                      )}`}
                    >
                      ANDA {result.status.toUpperCase()} DBD
                    </div>

                    {/* Confidence & Kategori */}
                    <p className="text-center text-gray-700">
                      Confidence: {(result.cf * 100).toFixed(1)}% —{" "}
                      <span className="font-semibold">{result.kategori}</span>
                    </p>

                    {/* Deskripsi */}
                    <motion.div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800" variants={fadeUp}>
                      <h3 className="font-semibold mb-1">Deskripsi Penyakit</h3>
                      <p>{result.deskripsi_penyakit}</p>
                    </motion.div>

                    {/* Analisis */}
                    <motion.div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800" variants={fadeUp}>
                      <h3 className="font-semibold mb-1">Analisis Gejala Dominan</h3>
                      <p>{result.analisis}</p>
                    </motion.div>

                    {/* Chart */}
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.detail} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                          <XAxis dataKey="gejala" tick={{ fontSize: 12 }} />
                          <YAxis tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                          <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
                          <Bar dataKey="cf_hasil" fill="#4ade80">
                            <LabelList dataKey="cf_hasil" formatter={(v) => `${(v * 100).toFixed(0)}%`} position="top" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Saran */}
                    <motion.div variants={fadeUp}>
                      <h3 className="text-lg font-semibold">{result.judul_catatan}</h3>
                      <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                        {result.catatan.map((c: string, i: number) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Export */}
                    <motion.button
                      onClick={exportPDF}
                      className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-2 rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      variants={fadeUp}
                    >
                      Export ke PDF
                    </motion.button>
                  </motion.div>
                )}
              </>
            )}

            {/* Loading Overlay */}
            {loading && (
              <motion.div
                className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <HeartPulse className="w-16 h-16 text-teal-500 animate-pulse mb-4" />
                <p className="text-gray-700 font-medium">
                  Mohon tunggu, sistem sedang menganalisis gejala...
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
}
