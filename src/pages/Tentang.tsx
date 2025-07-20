import RightPanel from "@/components/RightPanel";
import { Bell, Settings } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";
import Magnifier from "@/components/Magnifier";

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

export default function Tentang() {
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
              className="mt-6 p-4 sm:p-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white w-full max-w-md mx-auto md:max-w-2xl lg:max-w-4xl"
              variants={fadeUp}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-tight">
                Edukasi dan <br />
                Deteksi Penyakit Menular
              </h1>
              <p className="inline-block bg-white text-teal-700 px-4 py-2 rounded-[1rem] font-medium">
              Pelajari Lebih Lanjut Tentang Website
              </p>
            </motion.section>

      {/* Edukasi Section */}
        <motion.section
        className="text-xl font-semibold mb-4 mt-4"
            variants={fadeUp}
            >
            Tentang Website
    
        </motion.section>

       
      <motion.section
        className="
          mt-4 bg-gray-100 border border-gray-300 
          px-4 py-6 sm:px-6 sm:py-8 
          rounded-2xl 
          max-w-4xl mx-auto
        "
        variants={fadeUp}
      >
        <p className="text-sm sm:text-base leading-relaxed text-gray-700 mb-4 text-justify">
          Website Edukasi dan Diagnosa Penyakit Menular adalah platform digital berbasis web yang dirancang untuk
          memberikan informasi edukatif dan layanan diagnosa dini terkait tiga penyakit menular utama, yaitu HIV,
          TBC (Tuberkulosis), dan DBD (Demam Berdarah Dengue).
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-700 mb-4 text-justify">
          Dengan antarmuka modern dan user-friendly, website ini bertujuan meningkatkan kesadaran masyarakat mengenai
          bahaya penyakit menular, cara pencegahan, gejala, serta langkah-langkah pengobatan. Selain itu, pengguna dapat
          melakukan diagnosa awal melalui form interaktif untuk membantu mengenali risiko terhadap ketiga penyakit
          tersebut.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-700 text-justify">
          Platform ini juga menyediakan sumber daya visual profesional, seperti logo dan ikon untuk setiap penyakit,
          yang dapat digunakan untuk kegiatan edukasi, presentasi, maupun keperluan promosi kesehatan. Dengan adanya
          fitur-fitur komprehensif dan tampilan yang mudah digunakan, website ini diharapkan dapat menjadi rujukan
          utama bagi masyarakat dalam mendapatkan pengetahuan dan deteksi dini penyakit menular penting di Indonesia.
        </p>
      </motion.section>


    </motion.main>

      {/* Right Panel */}
   

    </div>
  );
}
