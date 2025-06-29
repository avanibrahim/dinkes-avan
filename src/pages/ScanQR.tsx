import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ScanQR() {
  const [loaded, setLoaded] = useState(false);

  // ⬇️ Load skrip eksternal hanya saat komponen dimount
  useEffect(() => {
    toast.info("Izinkan akses kamera untuk mulai AR");

    const loadScripts = async () => {
      // Cegah duplikat load
      if (document.querySelector("#aframe-script")) return setLoaded(true);

      const aframe = document.createElement("script");
      aframe.src = "https://aframe.io/releases/1.4.2/aframe.min.js";
      aframe.id = "aframe-script";
      aframe.onload = () => {
        const arjs = document.createElement("script");
        arjs.src = "https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar.min.js";
        arjs.onload = () => setLoaded(true);
        document.body.appendChild(arjs);
      };
      document.body.appendChild(aframe);
    };

    loadScripts();

    // Cleanup kamera saat keluar
    return () => {
      const video = document.querySelector("video");
      const stream = (video?.srcObject as MediaStream)?.getTracks();
      stream?.forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white relative">
      <h1 className="text-center text-xl font-bold my-4 z-10 relative">
        Scan Marker AR
      </h1>

      {loaded ? (
        <a-scene
          embedded
          arjs="sourceType: webcam;"
          vr-mode-ui="enabled: false"
          renderer="logarithmicDepthBuffer: true;"
        >
          <a-marker preset="hiro">
            <a-box position="0 0.5 0" material="color: red;"></a-box>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      ) : (
        <div className="text-center mt-10">Memuat AR Engine...</div>
      )}
    </div>
  );
}
