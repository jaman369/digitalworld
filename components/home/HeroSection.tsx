import Link from "next/link";

const flagCountries = ["USA", "UK", "Canada", "Australia", "UAE", "Ireland", "Bangladesh"];

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center text-center relative overflow-hidden pt-[52px] max-md:flex-col max-md:justify-start max-md:pt-[76px] max-md:pb-12 max-md:min-h-auto">
      {/* Background Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orbs */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full -top-[200px] -left-[200px] will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(0,113,227,0.5) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "drift1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full -bottom-[150px] -right-[100px] will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(52,199,89,0.3) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "drift2 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full top-[30%] left-[40%] will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(94,92,230,0.3) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "drift3 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full top-[60%] left-[10%] will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(255,159,10,0.2) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "drift1 8s ease-in-out infinite reverse",
          }}
        />

        {/* Grain */}
        <div className="grain" />

        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] max-w-[920px] px-6 py-10">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 text-xs font-medium text-white/50 tracking-[0.1em] uppercase mb-7 px-3.5 py-1.5 border border-white/[0.12] rounded-full bg-white/[0.04] opacity-0"
          style={{ animation: "fadeUp 0.9s 0.2s cubic-bezier(0.25,0.46,0.45,0.94) forwards" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shadow-[0_0_8px_var(--color-green)]" />
          Available for new projects · Based in Dhaka, Bangladesh
        </div>

        {/* Title */}
        <h1
          className="font-[var(--font-display)] text-white mb-7 tracking-[-0.02em] leading-[1.02] font-normal opacity-0"
          style={{
            fontSize: "clamp(52px, 8vw, 100px)",
            animation: "fadeUp 0.9s 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
          }}
        >
          Grow your business
          <br />
          beyond borders.
        </h1>

        {/* Subtitle */}
        <p
          className="font-light text-white/45 max-w-[640px] mx-auto mb-12 leading-[1.65] opacity-0"
          style={{
            fontSize: "clamp(17px, 2.2vw, 22px)",
            animation: "fadeUp 0.9s 0.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
          }}
        >
          <strong className="text-white/75 font-normal">Digital World</strong> is a full-service
          digital marketing agency helping businesses in the{" "}
          <strong className="text-white/75 font-normal">USA, UK, Canada, UAE, Australia</strong> &
          beyond dominate search, ads, and the web — led by{" "}
          <strong className="text-white/75 font-normal">Kamrujjaman Mufti</strong>.
        </p>

        {/* CTAs */}
        <div
          className="flex gap-3.5 justify-center flex-wrap opacity-0"
          style={{ animation: "fadeUp 0.9s 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards" }}
        >
          <Link href="/contact">
            <button className="bg-[var(--color-blue)] text-white text-[15px] font-medium px-[30px] py-[15px] rounded-full border-none cursor-pointer hover:bg-[var(--color-blue-hover)] hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,113,227,0.4)] transition-all duration-200">
              Start a Project &nbsp;→
            </button>
          </Link>
          <a href="#services">
            <button className="bg-transparent text-white text-[15px] font-normal px-[30px] py-[15px] rounded-full border border-white/[0.22] cursor-pointer hover:border-white/55 hover:bg-white/[0.05] hover:scale-[1.03] transition-all duration-200">
              Explore Services
            </button>
          </a>
        </div>
      </div>

      {/* Country Flag Pills */}
      <div
        className="flex gap-1.5 items-center flex-wrap justify-center opacity-0 mt-8 max-w-[920px] px-6 w-full min-[901px]:absolute min-[901px]:bottom-[130px] min-[901px]:left-1/2 min-[901px]:-translate-x-1/2 min-[901px]:m-0 min-[901px]:p-0 min-[901px]:w-auto"
        style={{ animation: "fadeIn 1s 1.2s forwards" }}
      >
        {flagCountries.map((country) => (
          <div
            key={country}
            className="flex items-center gap-[5px] text-[11px] text-white/40 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]"
          >
            {country}
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 max-md:hidden"
        style={{ animation: "fadeIn 1s 1.4s forwards" }}
      >
        <div className="text-[10px] tracking-[0.12em] uppercase text-white/60">Scroll</div>
        <div
          className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
          style={{ animation: "scrollLine 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
