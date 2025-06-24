import React, { useState } from "react";
import { Newspaper } from "lucide-react";

const beritaList = [
  {
    id: 1,
    judul: "Stunting Turun 3% di Kabupaten A",
    ringkasan: "Upaya kolaboratif lintas sektor berhasil menurunkan angka stunting secara signifikan.",
    img: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    judul: "Puskesmas Gencarkan Program PMT",
    ringkasan: "Pemberian Makanan Tambahan dilakukan secara rutin guna mendukung gizi anak di desa terpencil.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    judul: "Pelatihan Kader Posyandu Digital",
    ringkasan: "Teknologi informasi membantu percepatan pelaporan & pemantauan balita stunting.",
    img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&q=80"
  },
];

// URL video tutorial scan QR iPhone 16 Pro (YouTube)
const tutorialVideoUrl = "https://www.youtube.com/embed/kWUCK2pBbZU";

// Mockup iPhone 16 Pro frame image (bisa diganti dengan SVG atau PNG dari sumber mockup)
const iphoneMockupUrl = "https://mockupnest.com/wp-content/uploads/2023/01/iphone-16-pro-mockup-1.png";

const ScanQRWithMockup = () => {
  const [scanActive, setScanActive] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Fungsi dummy untuk scan (bisa diganti dengan scanner nyata)
  const startScan = () => {
    setScanActive(true);
    setScanResult(null);
  };

  const stopScan = () => {
    setScanActive(false);
  };

  // Contoh hasil scan QR code uji coba
  const contohQR = "DATA_STUNTING_123";

  return (
    <section className="max-w-7xl mx-auto py-16 px-6 animate-fade-in space-y-16">
      {/* Judul */}
      <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-blue-700">
        <Newspaper size={32} className="text-blue-400" /> Berita & Tutorial Scan QR Code
      </h1>

      {/* Grid dua kolom: Berita dan Mockup + Video */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Daftar Berita */}
        <div className="space-y-8">
          {beritaList.map((b) => (
            <article key={b.id} className="bg-white border border-border rounded-xl shadow-lg hover:scale-105 transition-transform overflow-hidden flex flex-col">
              <img src={b.img} alt={b.judul} className="w-full h-40 object-cover" loading="lazy" />
              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-lg text-blue-700 mb-2">{b.judul}</h2>
                <p className="text-sm text-muted-foreground flex-1">{b.ringkasan}</p>
                <button className="mt-4 text-blue-600 font-bold text-sm hover:underline self-start">
                  Baca Selengkapnya
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Mockup iPhone 16 Pro + Video + Scan Button + Himbauan */}
        <div className="flex flex-col items-center space-y-8">
          {/* Mockup iPhone 16 Pro dengan frame */}
          <div className="relative w-72 h-[600px] md:w-80 md:h-[680px]">
            <img
              src={iphoneMockupUrl}
              alt="iPhone 16 Pro Mockup"
              className="w-full h-full object-contain"
              loading="lazy"
            />
            {/* Area layar mockup untuk video tutorial */}
            <div className="absolute top-[15%] left-[10%] w-[80%] h-[70%] rounded-xl overflow-hidden shadow-inner bg-black">
              <iframe
                src={tutorialVideoUrl}
                title="Tutorial Scan QR Code iPhone 16 Pro"
                allowFullScreen
                className="w-full h-full"
                frameBorder="0"
              />
            </div>
          </div>

          {/* Teks himbauan */}
          <div className="bg-tealCustomLight rounded-lg p-4 max-w-md text-center text-tealCustom font-semibold shadow-md">
            <p>
              Pastikan Anda memberikan izin akses kamera saat diminta untuk memulai pemindaian QR code.
              Gunakan tombol di bawah untuk membuka kamera dan mulai scan QR code dari pihak Dinkes.
            </p>
          </div>

          {/* Tombol Scan QR */}
          <button
            onClick={startScan}
            className="bg-tealCustom hover:bg-tealCustomLighter text-white font-semibold rounded-lg px-8 py-3 shadow-md transition"
          >
            Mulai Scan QR Code
          </button>

          {/* Area hasil scan (dummy) */}
          {scanActive && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-lg text-center text-blue-700 font-semibold max-w-md">
              {/* Contoh hasil scan */}
              QR Code berhasil discan: <br />
              <span className="font-bold">{contohQR}</span>
              <br />
              {/* Tombol stop scan */}
              <button
                onClick={stopScan}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
              >
                Berhenti Scan
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScanQRWithMockup;
