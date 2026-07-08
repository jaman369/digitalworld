"use client";

import { useEffect, useRef } from "react";

const stats = [
  { target: 150, suffix: "+", label: "Projects Delivered" },
  { target: 120, suffix: "+", label: "Happy Clients" },
  { target: 5, suffix: "", label: "Years Experience" },
  { target: 11, suffix: "", label: "Countries Served" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted.current) {
          counted.current = true;
          let current = 0;
          const speed = 200;
          const inc = target / speed;

          const update = () => {
            current += inc;
            if (current < target) {
              el.textContent = Math.ceil(current).toString();
              setTimeout(update, 15);
            } else {
              el.textContent = target.toString();
            }
          };
          update();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="font-[var(--font-display)] text-black leading-none mb-2" style={{ fontSize: "clamp(64px, 8vw, 96px)" }}>
      <span ref={ref}>0</span>
      {suffix && <span className="text-[32px] align-super">{suffix}</span>}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-[#f5f5f7] py-[72px] px-6">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-center text-xs font-medium text-[var(--color-gray)] tracking-[0.08em] uppercase mb-12">
          Proven track record
        </p>
        <div className="bg-white rounded-[32px] py-[60px] px-0 grid grid-cols-4 shadow-[0_8px_40px_rgba(0,0,0,0.02)] max-[900px]:grid-cols-2 max-[900px]:gap-y-10 max-[600px]:grid-cols-1 max-[600px]:py-10 max-[600px]:px-5 max-[600px]:gap-y-[30px]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center relative ${
                i < stats.length - 1
                  ? "after:content-[''] after:absolute after:right-0 after:top-[15%] after:h-[70%] after:w-px after:bg-[#f0f0f0] max-[900px]:after:hidden max-[600px]:after:!hidden"
                  : ""
              } ${
                i % 2 === 0 && i < stats.length - 1
                  ? "max-[900px]:after:!block"
                  : ""
              }`}
            >
              <CountUp target={stat.target} suffix={stat.suffix} />
              <div className="text-[13px] text-black font-medium uppercase tracking-[0.05em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
