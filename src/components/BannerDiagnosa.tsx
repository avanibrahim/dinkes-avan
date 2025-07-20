import { motion, Variants } from "framer-motion";

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

const BannerDiagnosa = () => {
  return (
    <motion.section
                    className="mt-6 p-4 sm:p-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white w-full max-w-md mx-auto md:max-w-2xl lg:max-w-4xl"
                    variants={fadeUp}
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-tight">
                      Edukasi dan <br />
                      Deteksi Penyakit Menular
                    </h1>
                    <p className="inline-block bg-white text-teal-700 px-4 py-2 rounded-[1rem] font-medium text-[0.75rem] sm:text-base">
                    Jawab beberapa pertanyaan di bawah ini.
                      </p>
                  </motion.section>
    
  );
};

export default BannerDiagnosa;
