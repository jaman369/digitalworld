"use client";

import { useState, useEffect, useRef } from "react";

export default function SeoMotionPlayer() {
  const [height, setHeight] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Dynamic iframe height adjustment
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (
        event.data &&
        event.data.type === "SEO_MOTION_RESIZE" &&
        typeof event.data.height === "number"
      ) {
        const boundedHeight = Math.max(320, Math.min(1000, event.data.height));
        setHeight(boundedHeight);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Periodic and on-mount autoplay messages
  useEffect(() => {
    const sendPlay = () => {
      try {
        iframeRef.current?.contentWindow?.postMessage({ type: "AUTOPLAY" }, "*");
      } catch {
        // Ignored
      }
    };

    sendPlay();
    const t1 = setTimeout(sendPlay, 300);
    const t2 = setTimeout(sendPlay, 800);
    const t3 = setTimeout(sendPlay, 1600);
    const t4 = setTimeout(sendPlay, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // IntersectionObserver to auto-run when anyone sees the video
  useEffect(() => {
    const target = containerRef.current;
    if (!target || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            iframeRef.current?.contentWindow?.postMessage(
              { type: "AUTOPLAY" },
              "*"
            );
          } else if (!entry.isIntersecting) {
            iframeRef.current?.contentWindow?.postMessage(
              { type: "PAUSE" },
              "*"
            );
          }
        });
      },
      { threshold: [0, 0.1, 0.25, 0.5] }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xl sm:shadow-2xl border border-neutral-200/90 transition-all duration-300"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50/90 backdrop-blur-xs z-10 min-h-[380px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold text-neutral-600 tracking-wider uppercase">
              Loading SEO Motion Player...
            </span>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src="/embeds/seo-motion.html"
        title="Digital World Agency - SEO Motion Graphics Explainer"
        className="w-full border-0 block"
        style={{
          height: height ? `${height}px` : "620px",
          minHeight: "320px",
          transition: "height 0.25s ease-out",
        }}
        allow="autoplay; fullscreen"
        onLoad={() => {
          setIsLoaded(true);
          iframeRef.current?.contentWindow?.postMessage({ type: "AUTOPLAY" }, "*");
        }}
      />
    </div>
  );
}
