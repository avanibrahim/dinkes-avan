// src/components/LoadingFallback.tsx
import React from "react";

const LoadingFallback: React.FC = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen p-4 bg-black bg-opacity-60">
    {/* Heartbeat Loading SVG */}
    <div className="relative">
    <svg
  className="h-20 w-20 mb-6"
  viewBox="0 0 80 80"
  fill="none"
>
  {/* Love shape */}
  <path
    d="M40 67
      S13 50 13 33
      C13 20 29 19 40 31
      C51 19 67 20 67 33
      S40 67 40 67Z"
    fill="#f1f1f1"
    stroke="#229b94"
    strokeWidth="3"
    strokeLinejoin="round"
    className="heartbeat"
  />
  {/* Heartbeat/EKG line (lebih kecil & rapat di tengah) */}
  <polyline
    points="25,42 32,42 36,36 40,51 44,32 48,42 55,42"
    stroke="#229b94"
    strokeWidth="2.3"
    fill="none"
    strokeLinejoin="round"
    strokeLinecap="round"
  />
</svg>
<style>
{`
.heartbeat {
  transform-origin: 50% 75%;
  animation: heartbeat-realistic 1.3s cubic-bezier(0.4,0,0.6,1) infinite;
}
@keyframes heartbeat-realistic {
  0% { transform: scale(1); }
  10% { transform: scale(1.08); }
  17% { transform: scale(0.98); }
  22% { transform: scale(1.08); }
  28% { transform: scale(1); }
  100% { transform: scale(1); }
}
`}
</style>


    </div>
    <p className="text-base sm:text-lg font-medium text-white drop-shadow">
      Memuat Halaman...
    </p>
  </div>
);

export default LoadingFallback;
