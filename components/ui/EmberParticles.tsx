"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  color: string;
  glowColor: string;
}

const WARM_TONES = [
  { main: "#ff5f00", glow: "#ff2a00" },
  { main: "#ff2a00", glow: "#ff8f00" },
  { main: "#ff8f00", glow: "#ff5f00" },
  { main: "#ff3d00", glow: "#ffab00" },
  { main: "#ff6d00", glow: "#d50000" },
];

export default function EmberParticles({ count = 18 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const tone = WARM_TONES[Math.floor(Math.random() * WARM_TONES.length)];
      return {
        id: i,
        size: Math.floor(Math.random() * 4) + 3, // 3px to 6px
        left: Math.random() * 100, // 0% to 100%
        duration: Math.random() * 4 + 6, // 6s to 10s
        delay: Math.random() * 5, // 0s to 5s
        color: tone.main,
        glowColor: tone.glow,
      };
    });
    setParticles(generatedParticles);
  }, [count]);

  return (
    <div className="ember-particle-container absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ember-particle absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: `-20px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.glowColor}`,
            animation: `floatUp ${p.duration}s infinite linear`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
            transform: translateY(-15vh) scale(1);
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-105vh) scale(0.6);
            opacity: 0;
          }
        }
      `}} />
    </div>
  );
}
