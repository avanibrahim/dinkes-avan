// src/components/LoadingFallback.tsx
import React from "react";
import logo from "/img/mobilel.png";

const LoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <p className="text-base sm:text-lg font-medium text-gray-700">
      Memuat Halaman...
    </p>
  </div>
);

export default LoadingFallback;
