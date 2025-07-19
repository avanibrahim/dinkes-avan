// src/components/LoadingScreen.tsx
import React from "react";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center z-40 bg-black bg-opacity-55 transition-opacity duration-500">
    <img
      src="https://data.tangerangselatankota.go.id/uploads/group/2023-05-09-090514.181927dinkes.png"
      alt="Loading..."
      className="w-24 h-24 animate-pulse"
    />
    <p className="text-gray-100 mt-4 text-lg">Memuat Halaman...</p>
  </div>
);

export default LoadingScreen;