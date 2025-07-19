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
    <motion.section
                  className="mt-6 p-4 sm:p-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white w-full max-w-md mx-auto md:max-w-2xl lg:max-w-4xl"
                  variants={fadeUp}
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-tight">
                    Hubungi Kami
                  </h1>
                  <p className="inline-block bg-white text-teal-700 px-4 py-2 rounded-[1rem] font-medium">
                  Kami siap membantu Anda
                  </p>
                </motion.section>

    {/* Judul Section */}
    <motion.section
      className="text-[2rem] font-semibold mt-4"
      variants={fadeUp}
    >
      Kontak Kami
    </motion.section>

    {/* Form dan Info Kontak */}
    <motion.section
      className="mt-4 bg-gray-100 border border-gray-300 p-6 rounded-2xl"
      variants={fadeUp}
    >
      <form className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-gray-800 mb-1">
            Nama
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nama Anda"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-800 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Anda"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-gray-800 mb-1">
            Subjek
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subjek Pesan"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-800 mb-1">
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tulis pesan Anda..."
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Kirim Pesan
        </button>
      </form>

      <div className="mt-8 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Dinas Kesehatan
        </h3>
        <p className="text-gray-600">
          Jl. Contoh No. 123, Kota Gorontalo, Indonesia
        </p>
        <p className="text-gray-600">Telp: (021) 1234-5678</p>
        <p className="text-gray-600">Email: contact@edinkesdiagnosa.id</p>
      </div>
    </motion.section>
  </motion.main>

  {/* Right Panel */}
 
</div>

  );
}
