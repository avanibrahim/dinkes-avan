import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-start lg:items-center justify-center pl-6 pr-6 lg:pr-[20.5rem] py-20 bg-gradient-to-br from-[#e6f7f9] to-white">
      <div className="w-full max-w-lg bg-white/90 rounded-[2rem] shadow-2xl border border-[#b2e4e1] flex flex-col items-center px-8 py-6 space-y-8">
        {/* Ilustrasi animasi */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#229b94] mb-2 tracking-tight text-center">-404- <br />Maintenance Page</h1>
        <motion.img
          src="/img/doctor-404.svg"
          alt="Dokter lucu"
          className="w-44 h-44 object-contain mb-2 drop-shadow-lg"
        />
        {/* Headline */}
        {/* Deskripsi */}
        <p className="text-gray-600 text-base md:text-[1rem] text-center leading-relaxed">
          Halaman yang kamu cari sedang dalam pengembangan.<br/>
          Yuk kembali ke halaman utama!
        </p>
        {/* Tombol kembali */}
        <a
          href="/"
          className="group inline-flex items-center gap-2 mt-2 px-7 py-3 bg-[#229b94] hover:bg-[#14766d] text-white font-bold rounded-xl shadow transition-all duration-150 hover:-translate-y-1"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Beranda
        </a>
      </div>
    </section>
  );
}
