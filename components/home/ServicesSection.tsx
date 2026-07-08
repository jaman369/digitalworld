import Link from "next/link";

const servicePills = [
  "Social Media Advertising",
  "Content Marketing",
  "Email Marketing",
  "Conversion Rate Optimisation",
  "Backlink Building",
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-black py-24 px-6">
      {/* Ember Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => {
          const positions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 15, 35, 55, 75, 85, 5];
          const durations = [7, 9, 6, 8, 10, 7.5, 8.5, 6.5, 9.5, 8.2, 7.8, 9.2, 6.8, 8.8, 7.2];
          const delays = [0, 2, 1, 4, 0.5, 3, 1.5, 4.5, 2.5, 5, 3.5, 1.2, 2.8, 0.8, 3.2];
          const sizes = [6, 4, 8, 6, 5, 6, 7, 6, 4, 6, 6, 6, 8, 6, 5];
          const useAlt = [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false];

          return (
            <div
              key={i}
              className="absolute -bottom-5 rounded-full opacity-0"
              style={{
                left: `${positions[i]}%`,
                width: `${sizes[i]}px`,
                height: `${sizes[i]}px`,
                background: "#ff5f00",
                boxShadow: "0 0 10px #ff5f00, 0 0 20px #ff2a00",
                animation: `${useAlt[i] ? "floatUpAlt" : "floatUp"} ${durations[i]}s infinite ease-in`,
                animationDelay: `${delays[i]}s`,
              }}
            />
          );
        })}
      </div>

      <div className="max-w-[1120px] mx-auto relative z-[1]">
        {/* Intro */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="reveal text-[11px] font-semibold text-[#39f] tracking-[0.1em] uppercase mb-3.5 block">
            What We Do
          </span>
          <h2
            className="reveal font-[var(--font-display)] text-white leading-[1.06] mb-4 tracking-[-0.02em]"
            style={{ fontSize: "clamp(34px, 4.5vw, 58px)" }}
          >
            Every service your
            <br />
            brand needs — in one place.
          </h2>
          <p className="reveal text-[17px] font-light text-white/[0.42] leading-[1.7] max-w-[520px] mx-auto">
            From ranking on page one to building your complete online presence. 8 service categories. Dozens of specialisms. Zero excuses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* SEO Card */}
          <div className="reveal flex flex-col rounded-[var(--radius-card)] overflow-hidden border border-white/[0.08] shadow-[0_10px_30px_rgba(20,104,134,0.25)] hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(20,104,134,0.45)] hover:border-white/[0.18] transition-all duration-[350ms] relative group">
            <Link href="/services/seo" className="absolute inset-0 z-[1]" aria-label="SEO Services" />
            <div className="bg-gradient-to-br from-[#146886] to-[#0a4969] p-7 pb-0 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />
              <div className="relative w-[52px] h-[52px] rounded-[14px] bg-white/[0.18] backdrop-blur-[10px] border border-white/25 flex items-center justify-center text-[26px] mb-6">
                🔍
              </div>
              <div className="relative text-[19px] font-semibold text-white mb-2.5">Search Engine Optimisation</div>
              <div className="relative text-sm text-white/[0.88] leading-[1.65] mb-4">
                Long-term search visibility that compounds. Rank higher, get found, grow without paid ads.
              </div>
              <div className="relative flex items-end gap-[7px] h-[72px]">
                {[40, 58, 50, 75, 68, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-white shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                    style={{
                      height: `${h}%`,
                      opacity: 0.35 + i * 0.13,
                      animation: `barRise 2s ${i * 0.12}s ease-in-out infinite alternate`,
                      transformOrigin: "bottom",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#0d3d52] to-[#072a3d] px-7 py-1 flex flex-col relative z-[2]">
              {[
                { label: "Local SEO", href: "/services/seo#svc-local" },
                { label: "Ecommerce SEO", href: "/services/seo#svc-ecom", popular: true },
                { label: "International SEO", href: "/services/seo#svc-intl" },
                { label: "Semantic & AI SEO", href: "/services/seo#svc-semantic", last: true },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center justify-between py-[13px] text-sm text-white hover:text-[#4fc3f7] transition-colors duration-[180ms] ${
                    !item.last ? "border-b border-white/10" : ""
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.popular && (
                      <span className="text-[10px] bg-white/[0.18] text-white px-[7px] py-[2px] rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </span>
                  <span className="text-base">›</span>
                </Link>
              ))}
            </div>
            <div className="absolute top-5 right-5 text-white text-lg opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[250ms]">
              →
            </div>
          </div>

          {/* Web Design Card */}
          <div className="reveal reveal-delay-1 flex flex-col rounded-[var(--radius-card)] overflow-hidden bg-white/[0.06] border border-white/[0.08] hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300 relative group">
            <Link href="/services/web" className="absolute inset-0 z-[1]" aria-label="Web Design" />
            <div className="bg-gradient-to-br from-[#0d1f0d] to-[#0a180a] p-7 pb-0">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(52,199,89,0.15)] flex items-center justify-center text-[26px] mb-6">
                🌐
              </div>
              <div className="text-[19px] font-semibold text-white mb-2.5">Web Design & Development</div>
              <div className="text-sm text-white/[0.42] leading-[1.65] mb-4">
                Fast, modern websites built to convert — from WordPress blogs to custom-built Shopify stores.
              </div>
              <div className="bg-black/40 rounded-t-lg overflow-hidden">
                <div className="bg-white/[0.08] px-2.5 py-[7px] flex items-center gap-[5px]">
                  <div className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]" />
                  <div className="w-[7px] h-[7px] rounded-full bg-[#febc2e]" />
                  <div className="w-[7px] h-[7px] rounded-full bg-[#28c840]" />
                  <div className="flex-1 h-3 bg-white/[0.07] rounded mx-1.5" />
                </div>
                <div className="p-2.5 flex flex-col gap-[5px]">
                  {[80, 60, 90].map((w, i) => (
                    <div
                      key={i}
                      className="h-[7px] rounded bg-[rgba(52,199,89,0.2)]"
                      style={{
                        width: `${w}%`,
                        animation: `barRise 1.8s ${i * 0.2}s ease-in-out infinite alternate`,
                        transformOrigin: "bottom",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="px-7 py-1 flex flex-col relative z-[2]">
              {[
                { label: "WordPress Development", href: "/services/web#svc-wordpress" },
                { label: "Shopify Development", href: "/services/web#svc-shopify", popular: true },
                { label: "Landing Page Design", href: "/services/web#svc-landing" },
                { label: "Website Speed Optimization", href: "/services/web#svc-speed", last: true },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center justify-between py-[13px] text-sm text-white/75 hover:text-[#34c759] transition-colors duration-[180ms] ${
                    !item.last ? "border-b border-white/[0.08]" : ""
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.popular && (
                      <span className="text-[10px] bg-[rgba(52,199,89,0.25)] text-[#34c759] px-[7px] py-[2px] rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </span>
                  <span className="text-base">›</span>
                </Link>
              ))}
            </div>
            <div className="absolute top-5 right-5 text-[#39f] text-lg opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[250ms]">
              →
            </div>
          </div>

          {/* PPC Card */}
          <div className="reveal reveal-delay-2 flex flex-col rounded-[var(--radius-card)] overflow-hidden bg-white/[0.04] border border-white/[0.08] hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300 relative group">
            <Link href="/services/ppc" className="absolute inset-0 z-[1]" aria-label="PPC Advertising" />
            <div className="bg-gradient-to-br from-[#1a0800] to-[#120600] p-7 pb-0">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(255,100,30,0.12)] flex items-center justify-center text-[26px] mb-6">
                🎯
              </div>
              <div className="text-[19px] font-semibold text-white mb-2.5">Pay-Per-Click Advertising</div>
              <div className="text-sm text-white/[0.42] leading-[1.65] mb-4">
                Paid campaigns that return real revenue — Google Search, Shopping, Display & Meta Ads.
              </div>
              <div className="flex gap-4 items-end h-[72px] px-2.5">
                {[
                  { color: "#1877f2", label: "Meta", h: 70, delay: "0s" },
                  { color: "#ea4335", label: "Google", h: 90, delay: "0.5s" },
                  { color: "#00b2ff", label: "TikTok", h: 60, delay: "0.25s" },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t"
                      style={{
                        height: `${bar.h}%`,
                        background: `linear-gradient(180deg, ${bar.color}, ${bar.color}66)`,
                        animation: `barRise 2s ${bar.delay} ease-in-out infinite alternate`,
                        transformOrigin: "bottom",
                      }}
                    />
                    <span className="text-[10px] text-white/55 font-medium">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-7 py-1 flex flex-col relative z-[2]">
              {[
                { label: "Google Search & Shopping Ads", href: "/services/ppc#svc-search" },
                { label: "Facebook & Instagram Ads", href: "/services/ppc#svc-facebook" },
                { label: "Remarketing & Retargeting", href: "/services/ppc#svc-remarketing", last: true },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center justify-between py-[13px] text-sm text-white/75 hover:text-[#ff9f0a] transition-colors duration-[180ms] ${
                    !item.last ? "border-b border-white/[0.08]" : ""
                  }`}
                >
                  {item.label}
                  <span className="text-base">›</span>
                </Link>
              ))}
            </div>
            <div className="absolute top-5 right-5 text-[#39f] text-lg opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[250ms]">
              →
            </div>
          </div>

          {/* Content Card */}
          <div className="reveal reveal-delay-3 flex flex-col rounded-[var(--radius-card)] overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300 relative group">
            <Link href="/services/content" className="absolute inset-0 z-[1]" aria-label="Content Services" />
            <div className="bg-gradient-to-br from-[#1c0d2b] to-[#11071c] p-7 pb-0">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(187,134,252,0.12)] flex items-center justify-center text-[26px] mb-6">
                ✍️
              </div>
              <div className="text-[19px] font-semibold text-white mb-2.5">Content & More</div>
              <div className="text-sm text-white/[0.42] leading-[1.65] mb-4">
                Compelling content and optimization funnels — Email Marketing, Digital PR, HARO & copywriting.
              </div>
              <div className="bg-black/40 rounded-t-lg overflow-hidden p-3.5 h-[72px] flex flex-col gap-[7px]">
                {[
                  { w: 90, fillW: 30 },
                  { w: 75, fillW: 50 },
                  { w: 45, fillW: 40 },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="h-1.5 bg-white/20 rounded relative overflow-hidden"
                    style={{ width: `${bar.w}%` }}
                  >
                    <div
                      className="absolute left-0 top-0 h-full bg-[#bb86fc] rounded"
                      style={{
                        width: `${bar.fillW}%`,
                        animation: `barRise ${2.5 - i * 0.5}s ${i * 0.5}s infinite ease-in-out alternate`,
                        transformOrigin: "left",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="px-7 py-1 flex flex-col relative z-[2]">
              {[
                { label: "Email Marketing", href: "/services/content#svc-email" },
                { label: "Content Marketing", href: "/services/content#svc-content", popular: true },
                { label: "CRO Audit & Testing", href: "/services/content#svc-cro" },
                { label: "Blogger Outreach & Backlinks", href: "/services/content#svc-backlink", last: true },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center justify-between py-[13px] text-sm text-white/75 hover:text-[#bb86fc] transition-colors duration-[180ms] ${
                    !item.last ? "border-b border-white/[0.08]" : ""
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.popular && (
                      <span className="text-[10px] bg-[rgba(187,134,252,0.2)] text-[#bb86fc] px-[7px] py-[2px] rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </span>
                  <span className="text-base">›</span>
                </Link>
              ))}
            </div>
            <div className="absolute top-5 right-5 text-[#39f] text-lg opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[250ms]">
              →
            </div>
          </div>
        </div>

        {/* Service Pills */}
        <div className="flex flex-wrap gap-2.5 mt-6 justify-center">
          {servicePills.map((pill) => (
            <div
              key={pill}
              className="text-[13px] text-white/50 bg-white/[0.05] border border-white/[0.08] px-[18px] py-2 rounded-full cursor-pointer hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              {pill}
            </div>
          ))}
          <div className="text-[13px] text-[#39f] bg-[rgba(0,113,227,0.08)] border border-[rgba(0,113,227,0.2)] px-[18px] py-2 rounded-full cursor-pointer">
            View All Services →
          </div>
        </div>
      </div>
    </section>
  );
}
