// src/pages/Home.tsx
import RightPanel from "@/components/RightPanel";
import Header from "@/components/Header";
import { X, Droplet, Ribbon, Thermometer } from 'lucide-react';
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState} from "react";

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalContent = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.1 } },
};

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

interface Option {
  title: string;
  url: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  colorClass: string;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const options: Option[] = [
    {
      title: 'DBD',
      url: '/diagnosis-dbd',
      Icon: Droplet,
      colorClass: 'bg-teal-50 text-red-600',
    },
    {
      title: 'HIV/AIDS',
      url: '/diagnosis-hiv',
      Icon: Ribbon,
      colorClass: 'bg-red-50 text-pink-600',
    },
    {
      title: 'TBC',
      url: '/diagnosis-tbc',
      Icon: Thermometer,
      colorClass: 'bg-yellow-50 text-blue-600',
    },
  ];

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
          className="mt-6 p-4 sm:p-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white w-full max-w-[29rem] mx-auto md:max-w-2xl lg:max-w-4xl"
          variants={fadeUp}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-tight">
            Edukasi dan <br />
            Deteksi Penyakit Menular
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <>
          <button
            className="w-full sm:w-auto bg-white text-teal-600 px-3 py-2 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base hover:bg-gray-300 transition"
            onClick={openModal}
          >
            Mulai Diagnosa
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                variants={modalBackdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-6"
                  variants={modalContent}
                >
                  {/* Header with Title, Subtitle, and Close Button */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Diagnosa Penyakit
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Pilih salah satu Penyakit untuk memulai Diagnosa!
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                      aria-label="Close modal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-gray-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {options.map(({ title, url, Icon, colorClass }) => (
                  <a
                    key={title}
                    href={url}
                    onClick={closeModal}
                    className="flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-600 font-medium py-3 rounded-lg transition"
                  >
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${colorClass}`} />
                    <span>{title}</span>
                  </a>
                ))}
              </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
            <button 
            className="w-full sm:w-auto border border-white  hover:bg-gray-300 transition px-3 py-2 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base"
            onClick={() => window.location.href = '/edukasi'}
            >
              Edukasi
            </button>
          </div>
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


        {/* Hospital Map */}
        <motion.section className="mt-[1.5rem]" variants={fadeUp}>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Nearby Hospital</h2>
        <div className="relative w-full rounded-3xl shadow-lg border border-gray-200 overflow-hidden group">
            {/* Iframe Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=...."
              className="w-full h-60 sm:h-80"
              style={{
                border: 0,
                filter: "grayscale(17%) brightness(110%) contrast(96%) saturate(95%)",
                borderRadius: "inherit",
               // biar tidak kegeser saat scroll
              }}
              loading="lazy"
              allowFullScreen
              aria-label="Lokasi Dinas Kesehatan Kota Gorontalo"
            />
            {/* Glassmorphism Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center w-[92vw] sm:w-auto max-w-[98vw]">
              <div className="backdrop-blur-md bg-white/70 px-3 py-1 rounded-full shadow font-semibold text-teal-700 mb-2 text-xs sm:text-base sm:px-6 sm:py-2 whitespace-nowrap">
                Dinas Kesehatan Kota Gorontalo
              </div>
              <a
                href="https://maps.google.com/?q=Dinas+Kesehatan+Kota+Gorontalo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-1.5 rounded-full bg-teal-500 text-white font-medium shadow hover:bg-teal-600 transition text-xs sm:text-base sm:px-5 sm:py-2"
              >
                Lihat di Google Maps
              </a>
            </div>

          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
