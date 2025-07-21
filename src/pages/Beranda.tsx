import RightPanel from "@/components/RightPanel";
import Header from "@/components/Header";
import { Bell, Settings } from "lucide-react";
import { motion, Variants } from "framer-motion";
import LoadingScreen from '../components/LoadingScreen';
import React, { useState, useEffect } from 'react';

const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }},
  };

  

export default function Beranda() {
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedImages >= 1) {
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [loadedImages]);

  useEffect(() => {
    const maxTimeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(maxTimeout);
  }, []);

  
  return (
    <div className="flex bg-[#FAF9F6] min-h-screen">
    <motion.main
      className="flex-1 lg:pl-[1rem] lg:pr-[21rem] px-6 pb-0"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* Header */}
      <Header />

      {/* Banner */}
      <motion.section
                className="mt-6 p-4 sm:p-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white w-full max-w-md mx-auto md:max-w-2xl lg:max-w-4xl"
                variants={fadeUp}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-tight">
                  Edukasi dan <br />
                  Deteksi Penyakit Menular
                </h1>
                <p className="inline-block bg-white text-teal-700 px-4 py-2 rounded-[1rem] font-medium text-[0.75rem] sm:text-base">
                    Pelajari Edukasi Penyakit Menular Lebih Lanjut
                  </p>
              </motion.section>


      {/* Edukasi Section */}
      <motion.section className="mt-[1.5rem]" variants={fadeUp}>
    <h2 className="text-xl font-semibold mb-4">
      Edukasi Penyakit Menular
    </h2>
    <div className="grid grid-cols-3 gap-4">
      {["DBD", "HIV/AIDS", "TBC"].map((title) => (
        <motion.div
          key={title}
          className="bg-white p-3 sm:p-4 rounded-2xl shadow text-center"
          variants={fadeUp}
        >
          <div className="w-12 h-12 mx-auto mb-2 sm:w-16 sm:h-16">
            <img
              src={
                title === "DBD"
                  ? "/img/icons/dbdl.png"
                  : title === "HIV/AIDS"
                  ? "/img/icons/aidsl.png"
                  : "/img/icons/tbcl.png"
              }
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm sm:text-base font-medium mb-2 sm:mb-4">
            {title}
          </p>
          <button
            className="
              w-full sm:w-auto
              text-[0.55rem] sm:text-sm
              bg-gray-100 text-gray-700
              px-2 sm:px-4
              py-1 sm:py-2
              rounded-full
              mx-auto
              transition hover:bg-gray-200
              whitespace-normal break-words
            "
            onClick={() => window.location.href = '/edukasi'}
          >
            Pelajari Selengkapnya
          </button>
        </motion.div>
      ))}
    </div>
  </motion.section>


      {/* Scan QR Section */}
      <motion.section className="mt-[1.5rem] mb-20" variants={fadeUp}>
    <h2 className="text-xl font-semibold mb-4 text-gray-800">
      SCAN ME
    </h2>
    <div className="grid grid-cols-3 gap-3">
      {[
        "qr1.png",
        "qr2.png",
        "qr3.png",
      ].map((src, idx) => (
        <motion.div
          key={idx}
          className="bg-white p-2 rounded-2xl shadow flex items-center justify-center"
          variants={fadeUp}
        >
          <img
            src={`/img/qr/${src}`}
            alt={`QR Code ${idx + 1}`}
            className="w-24 h-24 sm:w-40 sm:h-40 object-contain"
          />
        </motion.div>
      ))}
    </div>
  </motion.section>
    </motion.main> 
    </div>
  );
}
