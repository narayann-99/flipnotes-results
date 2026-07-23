"use client";

import React, { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export default function AnimatedGrid() {
  const mouseX = useSpring(useMotionValue(50), { damping: 40, stiffness: 150 });
  const mouseY = useSpring(useMotionValue(50), { damping: 40, stiffness: 150 });
  const [coords, setCoords] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xVal = (e.clientX / window.innerWidth) * 100;
      const yVal = (e.clientY / window.innerHeight) * 100;
      mouseX.set(xVal);
      mouseY.set(yVal);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const unsubX = mouseX.on("change", (x) => {
      setCoords((prev) => ({ ...prev, x: `${x}%` }));
    });
    const unsubY = mouseY.on("change", (y) => {
      setCoords((prev) => ({ ...prev, y: `${y}%` }));
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY]);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000 dots-grid purple-glow"
      style={{
        "--x": coords.x,
        "--y": coords.y,
      } as React.CSSProperties}
    />
  );
}
