"use client";

import { useEffect, useRef } from "react";

export default function CursorLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animId: number;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      if (lightRef.current) {
        lightRef.current.style.left = currentX + "px";
        lightRef.current.style.top = currentY + "px";
      }
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <div ref={lightRef} className="cursor-light hidden md:block" />;
}
