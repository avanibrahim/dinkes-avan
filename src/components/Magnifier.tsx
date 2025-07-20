// src/components/Magnifier.tsx
import React, { useRef, useState } from "react";

interface MagnifierProps {
  zoom?: number;      // seberapa besar level zoom
  lensSize?: number;  // diameter lensa dalam px
  children: React.ReactNode;
}

const Magnifier: React.FC<MagnifierProps> = ({
  zoom = 2,
  lensSize = 120,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setPos({ x, y });
    setShow(true);
  };

  const handleLeave = () => setShow(false);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchEnd={handleLeave}
      className="relative"
    >
      {children}
      {show && (
        <div
          className="absolute pointer-events-none overflow-hidden rounded-full shadow-[2rem_2rem_0_rgba(0,0,0,0.2)]"
          style={{
            left: pos.x - lensSize / 2,
            top: pos.y - lensSize / 2,
            width: lensSize,
            height: lensSize,
          }}
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: `${(pos.x /
                containerRef.current!.offsetWidth) *
                100}% ${(pos.y / containerRef.current!.offsetHeight) * 100}%`,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Magnifier;
