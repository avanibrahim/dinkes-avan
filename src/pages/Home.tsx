// src/pages/Home.tsx
import RightPanel from "@/components/RightPanel";
import Header from "@/components/Header";
import { Bell, Settings } from "lucide-react";
import { motion, Variants } from "framer-motion";

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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
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
        <motion.section
          className="mt-6 p-6 sm:p-8 rounded-[0.5rem] bg-gradient-to-br from-teal-500 to-cyan-600 text-white"
          variants={fadeUp}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Edukasi dan <br />
            Deteksi Penyakit Menular
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto bg-white text-teal-600 px-4 py-2 rounded-full font-medium">
              Mulai Diagnosa
            </button>
            <button className="w-full sm:w-auto border border-white px-4 py-2 rounded-full font-medium">
              Edukasi
            </button>
          </div>
        </motion.section>

        {/* Edukasi Section */}
        <motion.section className="mt-8" variants={fadeUp}>
          <h2 className="text-xl font-semibold mb-4">Edukasi Penyakit Menular</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["DBD", "HIV/AIDS", "TBC"].map((title) => (
              <motion.div
                key={title}
                className="bg-white p-4 rounded-2xl shadow text-center"
                variants={fadeUp}
              >
                <div className="w-16 h-16 mx-auto mb-2">
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
                <p className="font-medium mb-2">{title}</p>
                <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Pelajari Selengkapnya
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Hospital Map */}
        <motion.section className="mt-8 mb-20" variants={fadeUp}>
          <h2 className="text-xl font-semibold mb-4">Nearby Hospital</h2>
          <div className="rounded-[1.5rem] overflow-hidden shadow-xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6345302060736!2d123.05812650000001!3d0.5499508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32792b3fb13f6fed%3A0x7db7e50aaa135582!2sDinas%20Kesehatan%20Kota%20Gorontalo!5e0!3m2!1sid!2sid!4v1752584916259!5m2!1sid!2sid"
              className="w-full h-48 sm:h-64"
              style={{
                border: 0,
                filter:
                  "grayscale(15%) brightness(105%) contrast(98%) saturate(90%)",
              }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </motion.section>
      </motion.main>

  
    </div>
  );
}
