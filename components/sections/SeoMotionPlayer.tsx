"use client";

import { useState, useEffect, useRef } from "react";

export default function SeoMotionPlayer() {
  const [height, setHeight] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (
        event.data &&
        event.data.type === "SEO_MOTION_RESIZE" &&
        typeof event.data.height === "number"
      ) {
        // Enforce reasonable boundaries
        const boundedHeight = Math.max(460, Math.min(1300, event.data.height));
        setHeight(boundedHeight);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xl sm:shadow-2xl border border-neutral-200/90 transition-all duration-300">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50/90 backdrop-blur-xs z-10 min-h-[500px]">
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
          height: height ? `${height}px` : "840px",
          minHeight: "500px",
          transition: "height 0.25s ease-out",
        }}
        allow="autoplay; fullscreen"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

