import RightPanel from "@/components/RightPanel";
import { Clock, UserCheck, Shield } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";
import DoctorContactSection from "@/components/DoctorContactSection";

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

export default function Contact() {
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

    {/* Banner untuk Contact */}
    <motion.section className="mt-6 p-4 sm:p-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white w-full max-w-md mx-auto md:max-w-2xl lg:max-w-4xl" variants={fadeUp}>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-tight">
                    Hubungi Kontak <br />
                    Dokter yang telah tersedia
                  </h1>
                  <p className="inline-block bg-white text-teal-700 px-4 py-2 rounded-[1rem] font-medium text-[0.75rem] sm:text-base">
                  Kami siap membantu Anda
                  </p>
                </motion.section>

    {/* Judul Section */}
    <motion.section
      className="text-xl font-semibold mb-4 mt-4"
      variants={fadeUp}
    >
      Kontak Kami
    </motion.section>

    {/* Form dan Info Kontak */}
    <DoctorContactSection />

     {/* Unified Feature Box */}
     <motion.section
  className="mt-6 bg-gray-50 p-6 rounded-2xl shadow-inner max-w-4xl mx-auto"
  variants={fadeUp}
>
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
    <div className="flex items-center space-x-2">
      <Clock className="w-6 h-6 text-green-500" />
      <div>
        <h4 className="text-sm font-semibold text-gray-800">Konsultasi 24/7</h4>
        <p className="text-xs text-gray-600">Layanan selalu tersedia</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <UserCheck className="w-6 h-6 text-teal-500" />
      <div>
        <h4 className="text-sm font-semibold text-gray-800">Dokter Bersertifikat</h4>
        <p className="text-xs text-gray-600">Tenaga medis berlisensi</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Shield className="w-6 h-6 text-blue-500" />
      <div>
        <h4 className="text-sm font-semibold text-gray-800">Privasi Terjamin</h4>
        <p className="text-xs text-gray-600">Data Anda aman</p>
      </div>
    </div>
  </div>
</motion.section>



  </motion.main>

  {/* Right Panel */}
 
</div>

  );
}
