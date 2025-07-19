"use client";
import { motion } from "framer-motion";

const tests = [
        {
          title: "Tuberkulosis (TBC)",
          description: "Diagnosis melalui batuk kronis dan penurunan berat badan",
          icon: "/img/icons/tbcl.png",
        },
        {
          title: "Demam Berdarah (DBD)",
          description: "Diagnosis berdasarkan demam tinggi dan trombosit rendah",
          icon: "/img/icons/dbdl.png",
        },
        {
          title: "HIV/AIDS",
          description: "Diagnosis melalui tes antibodi dan antigen HIV",
          icon: "/img/icons/aidsl.png",
        },
        {
          title: "Scan QR",
          description: "Akses hasil diagnosis melalui kode QR",
          icon: "/img/icons/scanqrl.png",
        },
      ];

export default function TestListSection() {
  return (
    <section className="py-20 bg-white px-6 md:px-16" id="test-list">
    <div className="max-w-6xl mx-auto">
         <p className="text-sm text-teal-600 font-medium mb-2 text-center md:text-center">
            Daftar Tes
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center md:text-center">
            Layanan diagnosis penyakit untuk menunjang pemeriksaan kesehatan secara komprehensif
            </h2>

  
      <div className="overflow-x-auto">
        <div className="flex gap-6 w-max">
          {tests.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
              className="w-[270px] min-w-[250px] bg-white border border-gray-300 border-t-4 border-teal-600 rounded-xl p-6 flex-shrink-0 shadow-sm"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="h-14 w-14 object-contain mb-4"
              />
              <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-snug">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
  

  );
}
