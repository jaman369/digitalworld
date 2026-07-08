"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 w-11 h-11 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center z-[9998] hover:bg-white/20 transition-all duration-300 backdrop-blur-sm ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3L3 8L4.4 9.4L7 6.8V13H9V6.8L11.6 9.4L13 8L8 3Z" fill="currentColor" />
      </svg>
    </button>
  );
}
