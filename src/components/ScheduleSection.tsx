"use client";
import { motion } from "framer-motion";
import React from "react";

export const ScheduleSection = () => {
  return (
    <section className="py-20 bg-white px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 flex justify-center"
        >
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f3fa147cedcfa21986a88a0ca0c3c027c6df572?width=1472" 
            alt="Doctor" 
            className="w-full max-w-[28rem] mx-auto" 
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 space-y-4 text-center lg:text-left"
        >
          <p className="text-teal-600 font-medium text-sm tracking-wide uppercase">
            Make a Schedule
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Make a schedule in advance with the available doctor
          </h2>
          <p className="text-gray-600 text-base">
            Cpathlabs is a very painful process, especially if you’re not taking care of your health and having regular check-ups. HealthyCarely makes it easier for everyone to schedule a doctor’s appointment.
          </p>
          <ul className="text-left text-gray-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-teal-600 text-xl">✔</span>
              <span><strong>Make a schedule online</strong> is easy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 text-xl">✔</span>
              <span><strong>Easy to connect</strong> with nearest lab</span>
            </li>
          </ul>
          <a 
            href="#" 
            className="inline-block mt-4 px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition"
          >
            Make Schedule Now!
          </a>
        </motion.div>
      </div>
    </section>
  );
};
