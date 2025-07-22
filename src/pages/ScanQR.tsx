// src/ScanQR.tsx
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import JSARuco from "js-aruco";

export default function ScanQR() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    let rafId: number;

    // 1) Inisialisasi detector js-aruco
    const DetectorClass =
      (JSARuco as any).Detector ||
      (JSARuco as any).ARDetector ||
      (JSARuco as any).AR?.Detector;
    if (!DetectorClass) {
      const msg = "Gagal inisialisasi js-aruco Detector";
      console.error(msg);
      setError(msg);
      toast.error(msg);
      return;
    }
    const detector = new DetectorClass();

    // 2) Siapkan canvas tersembunyi untuk deteksi
    const detectCanvas = document.createElement("canvas");
    const detectCtx = detectCanvas.getContext("2d")!;

    // 3) Loop deteksi + render overlay
    const tick = () => {
      const video = videoRef.current;
      const overlay = overlayRef.current;
      if (!video || !overlay) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const w = video.videoWidth;
      const h = video.videoHeight;
      if (w && h) {
        // set ukuran deteksi
        detectCanvas.width = w;
        detectCanvas.height = h;
        // gambar video ke deteksi canvas
        detectCtx.drawImage(video, 0, 0, w, h);

        // dapatkan imageData dan deteksi markers
        const imageData = detectCtx.getImageData(0, 0, w, h);
        const markers = detector.detect(imageData);

        // siapkan overlay canvas
        overlay.width = w;
        overlay.height = h;
        const ctx = overlay.getContext("2d")!;
        ctx.clearRect(0, 0, w, h);

        // gambar overlay untuk tiap marker (Hiro = kotak 4 titik)
        markers.forEach((marker: any) => {
          if (marker.corners?.length === 4) {
            // outline hijau
            ctx.strokeStyle = "lime";
            ctx.lineWidth = 3;
            ctx.beginPath();
            marker.corners.forEach((c: any, i: number) => {
              if (i === 0) ctx.moveTo(c.x, c.y);
              else ctx.lineTo(c.x, c.y);
            });
            ctx.closePath();
            ctx.stroke();

            // kotak merah semi-transparan di tengah
            const cx =
              marker.corners.reduce((sum: number, c: any) => sum + c.x, 0) / 4;
            const cy =
              marker.corners.reduce((sum: number, c: any) => sum + c.y, 0) / 4;
            const size = Math.min(w, h) * 0.2;
            ctx.fillStyle = "rgba(255,0,0,0.5)";
            ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
          }
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    // 4) Mulai kamera
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then((s) => {
        stream = s;
        const v = videoRef.current!;
        v.srcObject = s;
        v.muted = true; // untuk autoplay
        v.playsInline = true;
        v.autoplay = true;
        toast.success("Kamera aktif – memulai AR detection");
        v.addEventListener("loadedmetadata", () => {
          v.play();
          tick();
        });
      })
      .catch((e) => {
        console.error("Error akses kamera:", e);
        setError(e.message || "Unknown error");
        toast.error("Gagal akses kamera");
      });

    // 5) Cleanup
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // === UI kamera PERSIS seperti awal, + overlay canvas untuk AR ===
  return (
    <div className=" w-screen h-screen bg-black">
      <video
        ref={videoRef}
        className=" inset-0 w-full h-full object-cover"
        muted
        playsInline
        autoPlay
      />
      <canvas
        ref={overlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
