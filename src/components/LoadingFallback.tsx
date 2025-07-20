// src/components/LoadingFallback.tsx
import React from "react";
import logo from "/img/mobilel.png";

const LoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <img
      src={logo}
      alt="Logo"
      className="w-24 h-auto sm:w-24 sm:h-24 mb-3"
    />
    <p className="text-base sm:text-lg font-medium text-gray-700">
      Memuat Halaman...
    </p>
  </div>
);

export default LoadingFallback;
