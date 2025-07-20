import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Phone } from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }},
  };

interface Doctor {
  name: string;
  specialty: string;
  number: string; // tanpa tanda +, contoh: "6281234567890"
  photo: string; // path ke foto profil dokter
}

const doctors: Doctor[] = [
  {
    name: "NAMA DOKTER",
    specialty: "Spesialis Penyakit",
    number: "6282291325909",
    photo: "/img/doctors/dmale.png",
  },
  {
    name: "NAMA DOKTER",
    specialty: "Spesialis Penyakit",
    number: "6282291325909",
    photo: "/img/doctors/dfemale.png",
  },
  {
    name: "NAMA DOKTER",
    specialty: "Spesialis Penyakit",
    number: "6282291325909",
    photo: "/img/doctors/dmale.png",
  },
  {
    name: "NAMA DOKTER",
    specialty: "Spesialis Penyakit",
    number: "6282291325909",
    photo: "/img/doctors/dfemale.png",
  },
];

const DoctorContactSection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({ patientName: "", illness: "", notes: "" });

  const handleContactClick = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    const msg = `Halo ${selectedDoctor.name},%0A` +
                `Saya pasien ${formData.patientName}.%0A` +
                `Diagnosa Penyakit: ${formData.illness}.%0A` +
                `Keluhan: ${formData.notes}`;
    window.open(`https://wa.me/${selectedDoctor.number}?text=${msg}`, "_blank");
    setShowForm(false);
    setFormData({ patientName: "", illness: "", notes: "" });
  };

  return (
    <>
      <motion.section
        className="mt-[1.5rem]"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {doctors.map((doc) => (
            <motion.div
              key={doc.number}
              className="bg-white p-3 sm:p-4 rounded-2xl shadow text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              variants={fadeUp}
            >
              <div className="w-12 h-12 mx-auto mb-2 sm:w-16 sm:h-16">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="text-sm sm:text-base font-medium mb-1 text-gray-800 break-words">
                {doc.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 break-words">
                {doc.specialty}
              </p>
              <button
                onClick={() => handleContactClick(doc)}
                className="flex items-center justify-center w-full bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium py-1 sm:py-2 px-3 sm:px-4 rounded-full hover:bg-gray-200 transition"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-green-600" />
                Hubungi
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>


      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowForm(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              key="modal"
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Form Konsultasi {selectedDoctor?.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Isi form sebelum menghubungi dokter.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="patientName" className="block text-gray-700 mb-1">
                      Nama Anda
                    </label>
                    <input
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      placeholder="Nama Lengkap"
                      className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="illness" className="block text-gray-700 mb-1">
                      Nama Penyakit
                    </label>
                    <input
                      id="illness"
                      name="illness"
                      value={formData.illness}
                      onChange={handleChange}
                      placeholder="Contoh: TBC"
                      className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-gray-700 mb-1">
                      Keluhan / Catatan
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Jelaskan gejala atau keluhan"
                      className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium"
                  >
                    Kirim dan Hubungi
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DoctorContactSection;
