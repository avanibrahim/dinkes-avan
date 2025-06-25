import React from "react";
import { Construction } from "lucide-react";

const UnderMaintenancePage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-16 bg-white text-center">
      <div className="max-w-lg w-full space-y-8">
        {/* Judul */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#229b94] flex flex-col justify-center items-center gap-4">
          <Construction className="w-12 h-12 text-black" />
          Pages Maintenance
        </h1>


        {/* Deskripsi */}
        <p className="text-gray-700 text-sm md:text-base">
          Mohon maaf atas ketidaknyamanannya. Kami sedang melakukan pemeliharaan sistem untuk meningkatkan layanan. Silakan kembali lagi nanti.
        </p>

        {/* Tombol kembali */}
      </div>
    </section>
  );
};

export default UnderMaintenancePage;
