"use client";
import { motion } from "framer-motion";
import React from "react";

const InfoSectionAnimated = () => {
  return (
    <section className="py-20 bg-[#F1FDF5] px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 space-y-6 text-center lg:text-left"
        >
          <p className="text-teal-600 font-medium text-sm tracking-wide uppercase">
            Find Test
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            With more than 80+ tests covered and reliable results,<br className="hidden md:block" /> you can be sure that your health is in the best hands.
          </h2>
          <p className="text-gray-600 text-base">
            With medical professionals in more than 100+ countries and a 98% customer satisfaction rate, our platform offers reliable health information. With a wide network of doctors, we offer a broad range of high quality tests — up to 70% cheaper than other providers.
          </p>
          <ul className="text-left text-gray-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-teal-600 text-xl">✔</span>
              <span>
                <strong>100% free app</strong> designed to help you find the right Test for you.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 text-xl">✔</span>
              <span>
                <strong>Available 900+ Labs</strong> with specialists.
              </span>
            </li>
          </ul>
          <a
            href="#"
            className="inline-block mt-4 px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition"
          >
            See the test list
          </a>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 flex justify-center"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3ed879c19fcfbb98231f34e5bbccd4a4a23c22d?width=1032"
            alt="Chart"
           className="w-full max-w-[18rem] mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InfoSectionAnimated;
