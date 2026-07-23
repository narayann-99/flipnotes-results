"use client";

import React, { useEffect, useRef } from "react";

export default function AnimatedGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetCoords = useRef({ x: 50, y: 50 });
  const currentCoords = useRef({ x: 50, y: 50 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetCoords.current.x = (e.clientX / window.innerWidth) * 100;
      targetCoords.current.y = (e.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      // Smooth lerp interpolation for soft purple ambient mouse tracking
      currentCoords.current.x += (targetCoords.current.x - currentCoords.current.x) * 0.08;
      currentCoords.current.y += (targetCoords.current.y - currentCoords.current.y) * 0.08;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--x", `${currentCoords.current.x.toFixed(2)}%`);
        containerRef.current.style.setProperty("--y", `${currentCoords.current.y.toFixed(2)}%`);
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000 dots-grid purple-glow"
      style={{
        "--x": "50%",
        "--y": "50%",
      } as React.CSSProperties}
    />
  );
}
