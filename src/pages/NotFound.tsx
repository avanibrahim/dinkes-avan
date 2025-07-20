import React from "react";
import { Construction } from "lucide-react";

const UnderMaintenancePage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-[#e6f7f9] to-white text-center">
      <div className="max-w-lg w-full space-y-8">
        {/* Judul */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#229b94] flex flex-col justify-center items-center gap-4">
          <Construction className="w-12 h-12 text-black" />
          404 Not-Found
        </h1>


        {/* Deskripsi */}
        <p className="text-gray-700 text-sm md:text-base">
          Anda Telah melewati batas dari website ini. Halaman yang Anda cari tidak ditemukan, Mohon maaf atas ketidaknyamanan ini.
        </p>

        {/* Tombol kembali */}
        <a
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-[#229b94] hover:bg-[#229b94] text-white font-semibold rounded-lg transition"
        >
          Kembali ke Beranda
        </a>
      </div>
    </section>
  );
};

export default UnderMaintenancePage;
