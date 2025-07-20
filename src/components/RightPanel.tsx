// src/components/RightPanel.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CalendarDays, Clock, X } from "lucide-react";
import clsx from "clsx";

export interface RightPanelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const path = location.pathname.toLowerCase();
  const isDiagnosisPage =
    path === "/diagnosis-dbd" ||
    path === "/diagnosis-hiv" ||
    path === "/diagnosis-tbc";

  let tentangImg: string | null = null;
  if (path === "/diagnosis-dbd") tentangImg = "/img/qr/qr1.png";
  else if (path === "/diagnosis-hiv") tentangImg = "/img/qr/qr2.png";
  else if (path === "/diagnosis-tbc") tentangImg = "/img/qr/qr3.png";

  const sectionTitle = isDiagnosisPage ? "Scan QR" : "Tentang";

  const dateStr = now.toLocaleDateString("id-ID", {
    timeZone: "Asia/Makassar",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [timeStr, period] = now
    .toLocaleTimeString("en-US", {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .split(" ");

  return (
    <>
  {/* Overlay: click outside to close panel */}
  {isOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-30"
      onClick={() => setIsOpen(false)}
    />
  )}

  <aside
    className={clsx(
      // Lebar panel: full di mobile, 80 (320px) di md ke atas
      'fixed right-0 transform transition-transform duration-300 ease-in-out w-full max-w-full md:w-80 bg-white border-l px-4 md:px-6 py-6 md:py-8 overflow-y-auto z-40',
      // Posisi top (untuk sticky header di mobile)
      'top-16 md:top-0 bottom-0',
      {
        'translate-x-0': isOpen,
        'translate-x-full': !isOpen,
        'lg:translate-x-0': true,
      }
    )}
    // Prevent clicks inside panel from bubbling to overlay
    onClick={e => e.stopPropagation()}
  >
    {/* Close button on mobile */}
    {isOpen && (
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 p-2 bg-white rounded-md shadow-lg md:hidden"
        aria-label="Close panel"
      >
        <X className="w-6 h-6 text-gray-600" />
      </button>
    )}

    <div className="flex flex-col space-y-8 ">
      <p>
      </p>
      {/* Real Time */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3 pt-0 sm:pt-0 border-b sm:border-b border-gray-400">Real Time</h3>
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="flex flex-col items-center justify-center w-32 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl shadow">
            <CalendarDays className="w-5 h-5 mb-1" />
            <p className="text-xs font-medium">Tanggal</p>
            <p className="text-lg font-mono font-bold leading-none text-center">{dateStr}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-32 h-20 bg-gray-100 text-gray-800 rounded-xl shadow">
            <Clock className="w-5 h-5 mb-1 text-teal-500" />
            <p className="text-xs font-medium">Waktu</p>
            <p className="text-lg font-mono font-bold leading-none">{timeStr}</p>
            <p className="text-xs mt-1 text-teal-500 font-semibold">{period}</p>
          </div>
        </div>
      </div>



      {/* Scan QR / Tentang */}
      <div>
        <div className="flex justify-between items-center mb-4 border-b sm:border-b border-gray-400">
          <h3 className="font-semibold text-gray-900 ">{sectionTitle}</h3>
          <span className="text-xl text-gray-400">•••</span>
        </div>
        {isDiagnosisPage && tentangImg ? (
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-5 md:flex-col md:items-center md:justify-start ">

          {/* QR IMAGE */}
          <div className="flex flex-col items-center justify-center gap-4 py-2">
          <div className="w-32 h-32 sm:w-42 sm:h-42 bg-gray-100 rounded-1xl overflow-hidden shadow-sm flex justify-center items-center">
              <img
                src={tentangImg}
                alt={sectionTitle}
                className="object-contain w-full h-full"
              />
            </div>

            {/* CAMERA BUTTON */}
            <button
              className="flex items-center gap-2 bg-gradient-to-tr from-teal-500 to-cyan-500 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-md px-4 py-2 transition-all w-full max-w-[180px] justify-center"
              aria-label="Scan QR"
              type="button"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
                <rect x="3" y="3" width="16" height="16" rx="3" />
                <circle cx="11" cy="11" r="4" />
              </svg>
              <span className="text-sm font-medium">Mulai Scan</span>
            </button>
          </div>
        </div>
                
        
        ) : (
          <div className="bg-white border rounded-2xl p-4 text-sm text-black leading-relaxed shadow-sm text-justify hyphens-auto">
            <p>
              Website ini dibuat untuk memberikan edukasi dan deteksi penyakit
              menular yaitu HIV, TBC, dan DBD.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Blanditiis, nihil incidunt. Nobis iste molestiae consequatur
              veniam debitis laborum officia cupiditate harum quibusdam illum.
            </p>
          </div>
        )}
      </div>

      {/* Kontak */}
      <div>
        <div className="flex justify-between items-center mb-2 border-b sm:border-b border-gray-400">
          <h3 className="font-semibold text-gray-900 capitalize">kontak</h3>
          <span className="text-xl text-gray-400">•••</span>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4 rounded-2xl text-white shadow flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            <img
              src="/img/contact.png"
              alt="avatar"
              className="object-cover w-full h-full mt-2"
            />
          </div>
          <div className="text-sm">
            <p className="font-semibold">Nama Dokter</p>
            <p className="text-sm">0812-3456-789</p>
            <p className="text-xs mt-1">Dokter Spesialis</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</>

  );
};

export default RightPanel;
