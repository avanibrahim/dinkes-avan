import React, { useState } from "react";

export default function ScanQR() {
  const [active, setActive] = useState(false);

  const handleStart = () => {
    setActive(true); // render a-scene setelah user klik
  };

  return (
    <>
      <h1 className="text-center text-xl font-bold my-4">Scan Marker AR</h1>

      {!active ? (
        <button
          onClick={handleStart}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Aktifkan Kamera
        </button>
      ) : (
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
      )}
    </>
  );
}
