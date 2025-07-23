import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

interface InfoDropdownProps {
  id?: string;
  title: string;
  qrSrc: string;
  description: string;
  details: {
    heading: string;
    items: string[];
  }[];
}

const dropdownVariants = {
  hidden: { scaleY: 0, opacity: 0, transformOrigin: 'top' },
  visible: { scaleY: 1, opacity: 1, transformOrigin: 'top' },
};

const InfoDropdown: React.FC<InfoDropdownProps> = ({ id, title, qrSrc, description, details }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <section
      id={id}
      className="bg-gray-100 border border-gray-300 p-6 rounded-2xl"
      tabIndex={-1} // For focus when scrolling into view
    >
      <h3 className="text-lg font-semibold text-teal-600 mb-4 text-left">{title}</h3>
      <div className="flex flex-col items-start md:items-center gap-4 mb-6">
        <img src={qrSrc} alt={`QR Code ${title}`} className="w-32 h-auto md:h-32 rounded-lg object-cover mx-auto" />
        <p className="text-base leading-relaxed text-gray-700 text-center md:text-center">{description}</p>
      </div>
      <button
        className="flex items-center justify-between w-full bg-white border border-gray-200 p-4 rounded-lg mb-2"
        onClick={() => setOpen(prev => !prev)}
      >
        <span className="text-[1rem] font-semibold text-gray-600">Info Selengkapnya</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
            className="bg-white border border-t-0 border-gray-200 p-6 rounded-b-lg"
          >
            {details.map(section => (
              <div key={section.heading} className="mb-6 last:mb-0">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{section.heading}</h4>
                <ul className="list-disc pl-6 text-base leading-relaxed text-gray-700">
                  {section.items.map(item => (
                    <li key={item} className="mb-2">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Main Page ---
const EdukasiPage: React.FC = () => {
  const location = useLocation();

  // Auto scroll to anchor if hash in URL (SPA-friendly)
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace("#", ""));
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // Optionally, focus for accessibility:
          el.focus?.();
        }
      }, 50); // Wait for DOM/layout
    }
  }, [location]);

  return (
    <div className="flex bg-[#FAF9F6] min-h-screen">
      <motion.main className="flex-1 lg:pl-[1rem] lg:pr-[21rem] px-6 pb-10" initial="hidden" animate="visible" variants={container}>
        {/* Header */}
        <Header />

        {/* Banner */}
        <motion.section className="mt-6 p-4 sm:p-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white w-full max-w-md mx-auto md:max-w-2xl lg:max-w-4xl" variants={fadeUp}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-tight">
            Edukasi dan <br />
            Deteksi Penyakit Menular
          </h1>
          <p className="inline-block bg-white text-teal-700 px-4 py-2 rounded-[1rem] font-medium text-[0.75rem] sm:text-base">
            Pelajari Lebih Lanjut Edukasi Penyakit Menular
          </p>
        </motion.section>

        {/* Section title */}
        <motion.section 
          className="text-xl font-semibold mb-4 mt-4" 
          variants={fadeUp}
        >
          Edukasi Penyakit
        </motion.section>

        {/* Disease sections */}
        <motion.section className="mt-4 grid grid-cols-1 gap-6 text-justify" variants={fadeUp}>
          <InfoDropdown
            id="dbd"
            title="Demam Berdarah Dengue | DBD"
            qrSrc="img/qr/qr1.png"
            description="SCAN QR Code di atas untuk melihat visual lebih lanjut tentang Demam Berdarah Dengue (DBD)."
            details={[
              { heading: 'Pengertian', items: ['Demam Berdarah Dengue (DBD) adalah penyakit menular yang disebabkan oleh virus dengue yang ditandai dengan panas (demam) dan disertai dengan pendarahan. Demam Berdarah Dengue ditularkan melalui gigitan nyamuk Aedes Aegypti dan Aedes Albopuctus betina yang hidup di dalam dan di sekitar rumah.'] },
              { heading: 'Gejala Utama DBD', items: ['Demam tinggi mendadak, tubuh lemah dan lesu', 'Nyeri ulu hati, bisa terjadi pendarahan lambung', 'Muncul bintik merah di kulit (petekie) akibat pecah pembuluh darah', 'Kadang mimisan, muntah, atau BAB bercampur darah', 'Gelisah, ujung tangan dan kaki dingin serta berkeringat'] },
              { heading: 'Cara Pencegahan', items: ['Menggunakan lawasida', 'Menggunakan anti nyamuk', 'Menggunakan kelambu saat tidur', 'Memelihara ikan pemangsa jentik', 'Menanam tanaman pengusir nyamuk', 'Mengatur cahaya dan ventilasi rumah', 'Menghindari gantung pakaian yang menjadi tempat nyamuk'] }
            ]}
          />
          <InfoDropdown
            id="hiv"
            title="HIV/AIDS"
            qrSrc="img/qr/qr2.png"
            description="SCAN QR Code di atas untuk melihat visual lebih lanjut tentang HIV/AIDS."
            details={[
              { heading: 'Pengertian', items: ['HIV (Human Immunodeficiency Virus) adalah virus yang menyerang dan melemahkan sistem kekebalan tubuh, terutama sel darah putih CD4. Orang yang terinfeksi HIV bisa saja belum menunjukkan gejala selama bertahun-tahun. Tanpa pengobatan, HIV akan terus merusak kekebalan tubuh hingga berkembang menjadi AIDS (Acquired Immunodeficiency Syndrome), yaitu kondisi di mana tubuh sangat rentan terkena infeksi serius dan berbagai penyakit.', 'HIV belum dapat disembuhkan, namun dengan pengobatan antiretroviral (ARV), penderita dapat hidup sehat dan mencegah HIV berkembang menjadi AIDS.'] },
              { heading: 'Gejala Utama HIV/AIDS', items: ['Demam berkepanjangan', 'Penurunan berat badan drastis', 'Mudah lelah dan lemas', 'Sering sariawan atau infeksi jamur', 'Pembengkakan kelenjar getah bening'] },
              { heading: 'Cara Pencegahan', items: ['Gunakan kondom saat berhubungan seksual', 'Hindari penggunaan jarum suntik secara bergantian', 'Lakukan tes HIV secara rutin bila berisiko', 'Pastikan transfusi darah menggunakan darah yang sudah diperiksa', 'Edukasi dan hindari perilaku berisiko penularan HIV'] }
            ]}
          />
          <InfoDropdown
            id="tbc"
            title="Tuberkulosis | TBC"
            qrSrc="img/qr/qr3.png"
            description="SCAN QR Code di atas untuk melihat visual lebih lanjut tentang Tuberkulosis (TBC)."
            details={[
              { heading: 'Pengertian', items: ['Tuberkulosis (TBC) adalah penyakit menular yang disebabkan oleh bakteri Mycobacterium tuberculosis. TBC umumnya menyerang paru-paru, namun juga bisa menyerang bagian tubuh lainnya seperti tulang, otak, dan ginjal. TBC menyebar melalui udara ketika seseorang yang terinfeksi batuk atau bersin.', 'TBC dapat diobati dengan antibiotik khusus selama 6-9 bulan. Pengobatan harus dilakukan secara teratur dan tuntas untuk mencegah resistensi obat.'] },
              { heading: 'Gejala Utama TBC', items: ['Batuk lebih dari 2 minggu, bisa bercampur darah', 'Demam dan keringat malam', 'Penurunan berat badan tanpa sebab jelas', 'Nafsu makan menurun', 'Rasa lemas atau lesu'] },
              { heading: 'Cara Pencegahan', items: ['Tutup mulut dan hidung saat batuk atau bersin', 'Pastikan ruangan memiliki sirkulasi udara yang baik', 'Lakukan imunisasi BCG pada bayi', 'Segera periksa ke dokter jika mengalami gejala TBC', 'Minum obat TBC sesuai anjuran dokter sampai tuntas'] }
            ]}
          />
        </motion.section>
      </motion.main>
    </div>
  );
};

export default EdukasiPage;