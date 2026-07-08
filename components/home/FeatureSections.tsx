import Link from "next/link";

const features = [
  {
    eyebrow: "SEO & Organic Growth",
    eyebrowColor: "text-[var(--color-green)]",
    title: "SEO that puts\nyou on page one.",
    description:
      "Proven SEO strategies tailored to your industry — e-commerce, SaaS, local businesses, and international brands. Real rankings. Real traffic. Zero paid ads required.",
    bullets: [
      "Full on-page, off-page & technical SEO",
      "International targeting: USA, UK, Canada, Australia, UAE & more",
      "Monthly ranking reports & transparent results",
      "Semantic SEO, AI SEO, International & Video SEO",
    ],
    cta: { label: "Explore SEO Services", href: "/services/seo" },
    imageGradient: "from-[#0071e3]/30 to-[#34c759]/30",
    reverse: false,
    hasGrid: false,
  },
  {
    eyebrow: "Social Media Advertising",
    eyebrowColor: "text-[#39f]",
    title: "Every platform.\nMaximum reach.",
    description:
      "From Facebook & Instagram to TikTok, LinkedIn, Pinterest & YouTube — paid social campaigns and organic content strategies that turn audiences into loyal customers across 11 countries.",
    cta: { label: "Explore Social Ads", href: "/services/ppc" },
    imageGradient: "from-[#1877f2]/30 to-[#e1306c]/30",
    reverse: true,
    hasGrid: false,
  },
  {
    eyebrow: "Web Design & Development",
    eyebrowColor: "text-[var(--color-green)]",
    title: "Websites that\nwork as hard as you.",
    description:
      "WordPress, Shopify, landing pages, and fully custom web applications — mobile-first, lightning-fast, and built to convert visitors into real revenue.",
    cta: { label: "Explore Web Services", href: "/services/web" },
    imageGradient: "from-[#34c759]/30 to-[#0071e3]/30",
    reverse: false,
    hasGrid: true,
    gridItems: [
      { emoji: "🔵", name: "WordPress", sub: "Custom themes & SEO-ready" },
      { emoji: "🟢", name: "Shopify", sub: "Stores that convert" },
      { emoji: "⚙️", name: "Custom Dev", sub: "Built to spec" },
      { emoji: "🚀", name: "Speed & Migration", sub: "Optimised & modernised" },
    ],
  },
  {
    eyebrow: "Content & More",
    eyebrowColor: "text-[var(--color-purple)]",
    title: "Content that converts.\nCopy that sells.",
    description:
      "From high-performing email sequences to strategic blogger outreach backlinks and topical authority blog assets — we engineer custom content structures that attract, engage, and retain clients for your brand across 11 countries.",
    cta: { label: "Explore Content Services", href: "/services/content" },
    imageGradient: "from-[#bb86fc]/30 to-[#5e5ce6]/30",
    reverse: true,
    hasGrid: false,
  },
];

export default function FeatureSections() {
  return (
    <>
      {features.map((feature, idx) => (
        <section key={idx} className="bg-black">
          <div
            className={`max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center py-24 px-6 ${
              feature.reverse && idx % 2 !== 0 ? "bg-white/[0.015]" : ""
            }`}
          >
            {/* Text Content */}
            <div className={`reveal ${feature.reverse ? "lg:order-2" : ""}`}>
              <span className={`text-[11px] font-semibold ${feature.eyebrowColor} tracking-[0.1em] uppercase mb-3.5 block`}>
                {feature.eyebrow}
              </span>
              <h2
                className="font-[var(--font-display)] text-white leading-[1.06] mb-4 tracking-[-0.02em] whitespace-pre-line"
                style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
              >
                {feature.title}
              </h2>
              <p className="text-[17px] font-light text-white/[0.42] leading-[1.7] max-w-[520px] mb-8">
                {feature.description}
              </p>

              {/* Bullet points for SEO */}
              {feature.bullets && (
                <div className="flex flex-col gap-3 mb-9">
                  {feature.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shadow-[0_0_8px_var(--color-green)] shrink-0" />
                      <span className="text-sm text-white/55">{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Grid items for Web */}
              {feature.hasGrid && feature.gridItems && (
                <div className="grid grid-cols-2 gap-2.5 mb-8">
                  {feature.gridItems.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white/[0.04] border border-white/[0.07] rounded-[14px]"
                    >
                      <div className="text-xl mb-1.5">{item.emoji}</div>
                      <div className="text-[13px] font-semibold text-white mb-[2px]">{item.name}</div>
                      <div className="text-xs text-white/55">{item.sub}</div>
                    </div>
                  ))}
                </div>
              )}

              <Link href={feature.cta.href}>
                <button className="bg-[var(--color-blue)] text-white text-[15px] font-medium px-[30px] py-[15px] rounded-full border-none cursor-pointer hover:bg-[var(--color-blue-hover)] hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,113,227,0.4)] transition-all duration-200">
                  {feature.cta.label} &nbsp;→
                </button>
              </Link>
            </div>

            {/* Image */}
            <div
              className={`reveal reveal-delay-2 relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-white/[0.02] group ${
                feature.reverse ? "lg:order-1" : ""
              }`}
            >
              <div
                className={`w-full aspect-video bg-gradient-to-br ${feature.imageGradient} flex items-center justify-center relative overflow-hidden`}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent" />
                <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.03),transparent)]" style={{ animation: "spinSlow 8s linear infinite" }} />
                <span className="text-6xl relative z-[1] opacity-60">
                  {idx === 0 ? "🔍" : idx === 1 ? "📱" : idx === 2 ? "🌐" : "✍️"}
                </span>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
