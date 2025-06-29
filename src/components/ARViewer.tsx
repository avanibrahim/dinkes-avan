import React, { useEffect } from "react";
import { toast } from "sonner"; // Kalau kamu pakai Sonner untuk notifikasi

export default function ARViewer() {
  useEffect(() => {
    // 🔔 Notif ketika halaman pertama kali load
    toast.info("Izinkan akses kamera agar fitur AR dapat digunakan");

    // ✅ Otomatis matikan kamera saat user pindah halaman
    return () => {
      const streams = (document.querySelector("video")?.srcObject as MediaStream)?.getTracks();
      if (streams) {
        streams.forEach((track) => {
          if (track.readyState === "live") {
            track.stop(); // ⛔ Matikan kamera
          }
        });
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <h1 className="text-center text-2xl font-bold py-4 text-green-700">
        Augmented Reality Demo
      </h1>

      <a-scene
        embedded
        arjs="sourceType: webcam;"
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true;"
      >
        

        <a-marker type="pattern" url="/marker/pattern-processed_marker.patt">
          <a-entity
            gltf-model="#model"
            scale="0.5 0.5 0.5"
            position="0 0 0"
            animation-mixer
          ></a-entity>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
}
