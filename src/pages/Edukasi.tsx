import RightPanel from "@/components/RightPanel";
import { Bell, Settings } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";

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

export default function Edukasi() {
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
          Pelajari Lebih Lanjut Edukasi Penyakit Menular
        </p>
      </motion.section>
  
      {/* Edukasi Penyakit Title */}
      <motion.section
        className="text-[2rem] font-semibold mt-4"
        variants={fadeUp}
      >
        Edukasi Penyakit
      </motion.section>
  
      {/* 3 Boxes Vertikal */}
      <motion.section
  className="mt-4 grid grid-cols-1 gap-6"
  variants={fadeUp}
>
  {/* DBD */}
  <div className="bg-gray-100 border border-gray-300 p-6 rounded-2xl">
  <h3 className="text-lg font-semibold text-teal-600 mb-4 text-left">
    Demam Berdarah Dengue | DBD
  </h3>
  <div className="flex flex-col md:flex-row items-start gap-4">
    <img
      src="img/qr/qr1.png"
      alt="QR Code DBD"
      className="w-full md:w-32 h-auto md:h-32 rounded-lg object-cover mx-auto"
    />
    <div className="flex-1 bg-white border border-gray-200 p-6 rounded-lg">
      <p className="text-[1rem] leading-relaxed text-gray-700 mb-6 text-justify">
        <strong>Demam Berdarah Dengue (DBD)</strong> adalah penyakit infeksi yang disebabkan oleh
        virus Dengue. Penyakit ini ditularkan melalui gigitan nyamuk <em>Aedes aegypti</em>.
      </p>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Gejala Utama DBD</h4>
      <ul className="list-disc list-inside text-[1rem] leading-relaxed text-gray-700 mb-6">
        <li>Demam tinggi mendadak</li>
        <li>Nyeri otot dan sendi</li>
        <li>Sakit kepala</li>
      </ul>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Cara Pencegahan</h4>
      <ul className="list-disc list-inside text-[1rem] leading-relaxed text-gray-700 mb-6">
        <li>Gunakan kelambu atau repellant</li>
        <li>Bersihkan tempat penampungan air rutin</li>
        <li>Buang barang bekas yang menampung air</li>
      </ul>
    </div>
  </div>
</div>


  {/* HIV */}
  <div className="bg-gray-100 border border-gray-300 p-6 rounded-2xl">
    <h3 className="text-lg font-semibold text-teal-600 mb-4 text-left">
    HIV/AIDS
    </h3>
    <div className="flex flex-col md:flex-row items-start gap-4">
      <img
        src="img/qr/qr2.png"
        alt="QR Code HIV/AIDS"
        className="w-32 h-32 rounded-lg object-cover"
      />
       <div className="flex-1 bg-white border border-gray-200 p-6 rounded-lg">
  <p className="text-[1rem] leading-relaxed text-gray-700 mb-6 text-justify">
    <strong>HIV/AIDS</strong> adalah penyakit yang disebabkan oleh infeksi <strong>Human Immunodeficiency Virus (HIV)</strong>. Virus ini menyerang dan melemahkan sistem kekebalan tubuh manusia, sehingga tubuh menjadi lebih rentan terhadap berbagai infeksi dan penyakit. Jika tidak ditangani, HIV dapat berkembang menjadi <strong>Acquired Immunodeficiency Syndrome (AIDS)</strong>, yaitu tahap akhir infeksi HIV yang ditandai dengan kumpulan gejala berat akibat kerusakan sistem imun.
  </p>
  <h4 className="text-lg font-semibold text-gray-800 mb-2">Gejala Utama HIV/AIDS</h4>
  <ul className="list-disc list-inside text-[1rem] leading-relaxed text-gray-700 mb-6">
    <li>Demam berkepanjangan</li>
    <li>Penurunan berat badan drastis</li>
    <li>Mudah lelah dan lemas</li>
    <li>Sering sariawan atau infeksi jamur</li>
    <li>Pembengkakan kelenjar getah bening</li>
  </ul>
  <h4 className="text-lg font-semibold text-gray-800 mb-2">Cara Pencegahan</h4>
  <ul className="list-disc list-inside text-[1rem] leading-relaxed text-gray-700 mb-6">
    <li>Gunakan kondom saat berhubungan seksual</li>
    <li>Hindari penggunaan jarum suntik secara bergantian</li>
    <li>Lakukan tes HIV secara rutin bila berisiko</li>
    <li>Pastikan transfusi darah menggunakan darah yang sudah diperiksa</li>
    <li>Edukasi dan hindari perilaku berisiko penularan HIV</li>
  </ul>
       </div>
    </div>
  </div>

  {/* TBC */}
  <div className="bg-gray-100 border border-gray-300 p-6 rounded-2xl">
    <h3 className="text-lg font-semibold text-teal-600 mb-4 text-left">
      TBC
    </h3>
    <div className="flex flex-col md:flex-row items-start gap-4">
      <img
        src="img/qr/qr3.png"
        alt="QR Code TBC"
        className="w-32 h-32 rounded-lg object-cover"
      />
      <div className="flex-1 bg-white border border-gray-200 p-6 rounded-lg">
  <p className="text-[1rem] leading-relaxed text-gray-700 mb-6 text-justify">
    <strong>TBC (Tuberkulosis)</strong> adalah penyakit infeksi menular yang disebabkan oleh bakteri <strong>Mycobacterium tuberculosis</strong>. Penyakit ini umumnya menyerang paru-paru, tetapi juga dapat menyerang organ tubuh lain. Penularan TBC terjadi melalui udara, terutama saat penderita batuk, bersin, atau meludah, sehingga bakteri tersebar dan terhirup orang di sekitarnya.
  </p>
  <h4 className="text-lg font-semibold text-gray-800 mb-2">Gejala Utama TBC</h4>
  <ul className="list-disc list-inside text-[1rem] leading-relaxed text-gray-700 mb-6">
    <li>Batuk lebih dari 2 minggu, bisa bercampur darah</li>
    <li>Demam dan keringat malam</li>
    <li>Penurunan berat badan tanpa sebab jelas</li>
    <li>Nafsu makan menurun</li>
    <li>Rasa lemas atau lesu</li>
  </ul>
  <h4 className="text-lg font-semibold text-gray-800 mb-2">Cara Pencegahan</h4>
  <ul className="list-disc list-inside text-[1rem] leading-relaxed text-gray-700 mb-6">
    <li>Tutup mulut dan hidung saat batuk atau bersin</li>
    <li>Pastikan ruangan memiliki sirkulasi udara yang baik</li>
    <li>Lakukan imunisasi BCG pada bayi</li>
    <li>Segera periksa ke dokter jika mengalami gejala TBC</li>
    <li>Minum obat TBC sesuai anjuran dokter sampai tuntas</li>
  </ul>
</div>

    </div>
  </div>
</motion.section>
    </motion.main>
  </div>  
  );
}
