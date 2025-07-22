import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, HeartPulse, Syringe, ShieldPlus, Pill } from "lucide-react";

interface WelcomeLayerProps {
  show: boolean;
  onClose: () => void;
}

const WELCOME_DRAG_LIMIT = -120;

const healthIcons = [
  { icon: Stethoscope, style: "left-6 top-16 text-pink-300", delay: 0 },
  { icon: HeartPulse, style: "right-8 top-24 text-rose-200", delay: 0 },
  { icon: Syringe, style: "left-4 bottom-36 text-cyan-200", delay: 0 },
  { icon: ShieldPlus, style: "right-4 bottom-24 text-teal-200", delay: 0 },
  { icon: Pill, style: "left-1/2 top-6 text-yellow-200", delay: 0 },
];

const WelcomeLayer: React.FC<WelcomeLayerProps> = ({ show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          drag="y"
          dragConstraints={{ top: WELCOME_DRAG_LIMIT, bottom: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.y < WELCOME_DRAG_LIMIT * 0.6) {
              onClose();
            }
          }}
          whileDrag={{ y: [0, WELCOME_DRAG_LIMIT], opacity: 0.96, scale: 0.98 }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-transparent md:hidden"
          style={{ touchAction: "none", cursor: "grab" }}
        >
          {/* Animated Gradient BG */}
          <motion.div
  className="absolute inset-0 w-screen h-screen"
  style={{
    background: "linear-gradient(120deg, #2dd4bf, #06b6d4, #fbc2eb 70%)",
    backgroundSize: "300% 300%",
    zIndex: 0,
  }}
  animate={{
    backgroundPosition: [
      "0% 50%",
      "100% 50%",
      "0% 50%",
    ],
  }}
  transition={{
    repeat: Infinity,
    duration: 9,
    ease: "linear",
  }}
/>


          {/* Animated Floating Health Icons */}
          {healthIcons.map(({ icon: Icon, style, delay }, i) => (
            <motion.div
              key={i}
              className={`absolute ${style} pointer-events-none`}
              initial={{ y: 0, opacity: 0.7 }}
              animate={{ y: [0, 14, -18, 0] }}
              transition={{
                duration: 5 + delay,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay,
              }}
              style={{ zIndex: 2 }}
            >
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 opacity-70 drop-shadow-lg" />
            </motion.div>
          ))}

          {/* Main Content */}
          <div className="relative flex flex-col items-center text-center px-4 w-full max-w-md z-10 pointer-events-none">
            <img
              src="img/mobilel.png"
              alt="Logo"
              className="w-32 h-auto mb-6 pointer-events-auto"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow pointer-events-auto">
              Selamat Datang di Website Deteksi Penyakit Menular
            </h1>
            <p className="text-white mb-8 text-lg max-w-xs opacity-90 pointer-events-auto">
              Temukan edukasi, diagnosa, dan pencegahan DBD, TBC, dan HIV/AIDS.
            </p>
            <button
              onClick={onClose}
              className="bg-white text-teal-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-teal-100 transition pointer-events-auto"
            >
              Masuk
            </button>
            {/* Spacer biar swipe up benar-benar di paling bawah */}
            <div className="flex-1 min-h-[14vh] sm:min-h-[8vh]" />
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-auto">
              {/* Panah up & teks */}
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="animate-bounce mb-2">
                <path d="M20 4V20" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <path d="M12 12L20 4L28 12" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              </svg>
              <span className="text-white text-xs opacity-80">Swipe Up untuk masuk</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeLayer;
