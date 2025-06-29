import React, { useEffect } from "react";
import { toast } from "sonner"; // Kalau kamu pakai Sonner untuk notifikasi

export default function ARViewer() {
    useEffect(() => {
        toast.info("Izinkan akses kamera agar fitur AR dapat digunakan");
      
        return () => {
          // Brutal cleanup all video stream
          navigator.mediaDevices.enumerateDevices().then(() => {
            const videos = document.querySelectorAll("video");
            videos.forEach((video) => {
              const stream = video.srcObject as MediaStream;
              if (stream) {
                stream.getTracks().forEach((track) => track.stop());
              }
            });
          });
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
