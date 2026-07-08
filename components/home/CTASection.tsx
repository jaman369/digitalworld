import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-[#1d1d1f] py-24 px-6 text-center overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,113,227,0.15) 0%, transparent 70%)",
        }}
      />

      <h2
        className="reveal font-[var(--font-display)] text-white leading-[1.06] tracking-[-0.02em] mb-6 relative z-[1]"
        style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
      >
        Ready to grow
        <br />
        your business?
      </h2>
      <p className="reveal text-[17px] font-light text-white/45 max-w-[520px] mx-auto mb-10 leading-[1.7] relative z-[1]">
        Book a free 30-minute strategy call. No obligation, no sales pitch — just honest advice on how to dominate your market.
      </p>
      <div className="reveal flex gap-3.5 justify-center flex-wrap relative z-[1]">
        <Link href="/contact">
          <button className="bg-[var(--color-blue)] text-white text-base font-medium px-9 py-4 rounded-full border-none cursor-pointer hover:bg-[var(--color-blue-hover)] hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,113,227,0.4)] transition-all duration-200">
            Book Free Consultation &nbsp;→
          </button>
        </Link>
        <a href="#services">
          <button className="bg-transparent text-white text-base font-normal px-9 py-4 rounded-full border border-white/[0.22] cursor-pointer hover:border-white/55 hover:bg-white/[0.05] hover:scale-[1.03] transition-all duration-200">
            View All Services
          </button>
        </a>
      </div>
    </section>
  );
}
