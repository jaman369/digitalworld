"use client";

import { useEffect } from "react";

export default function ServiceHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash ? window.location.hash.substring(1) : "";
      if (!hash) return;

      const targetEl = document.getElementById(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Run on mount with slight delay to ensure dynamic hydration is completed
    const t1 = setTimeout(scrollToHash, 100);
    const t2 = setTimeout(scrollToHash, 400);

    window.addEventListener("hashchange", scrollToHash);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
