"use client";

import { useState } from "react";

const pricingData = [
  {
    tier: "Starter",
    monthlyPrice: "$299",
    yearlyPrice: "$239",
    per: "/mo",
    desc: "Perfect for small businesses starting their digital journey with essential SEO and web presence.",
    features: [
      "On-page SEO (up to 10 pages)",
      "Google Business Profile setup",
      "Monthly ranking report",
      "1 blog post per month",
      "Basic website audit",
      "Email support",
    ],
    ctaLabel: "Get Started",
    ctaPrimary: false,
    featured: false,
  },
  {
    tier: "Growth",
    monthlyPrice: "$1,299",
    yearlyPrice: "$999",
    per: "/mo",
    desc: "For growing businesses ready to scale with comprehensive SEO, ads, and content strategy.",
    features: [
      "Full SEO (on-page, off-page, technical)",
      "Google Ads management",
      "Social media advertising",
      "4 blog posts per month",
      "Monthly strategy calls",
      "Competitor analysis",
      "Conversion rate optimization",
      "Priority support",
    ],
    ctaLabel: "Start Growing",
    ctaPrimary: true,
    featured: true,
    badge: "Most Popular",
  },
  {
    tier: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    per: "",
    desc: "Full-service digital partnership for established brands with complex needs across multiple markets.",
    features: [
      "Everything in Growth",
      "International SEO strategy",
      "Multi-platform ad management",
      "Custom web development",
      "Dedicated account manager",
      "Weekly reporting & calls",
      "Content marketing strategy",
      "24/7 priority support",
    ],
    ctaLabel: "Contact Us",
    ctaPrimary: false,
    featured: false,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative bg-black py-[120px] px-6 overflow-hidden isolate max-[880px]:py-20">
      {/* Background glows */}
      <div
        className="absolute -left-[12%] top-[30%] w-[55%] h-[65%] -z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,113,227,0.55) 0%, rgba(0,113,227,0.18) 35%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -right-[10%] bottom-0 w-[55%] h-[65%] -z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(80,160,255,0.42) 0%, rgba(0,80,200,0.14) 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Header */}
      <div className="relative text-center max-w-[720px] mx-auto z-[3]">
        <span className="text-[11px] font-semibold text-white/55 tracking-[0.1em] uppercase mb-3.5 block">
          Pricing
        </span>
        <h2
          className="font-[var(--font-display)] text-white leading-[1.06] tracking-[-0.02em]"
          style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
        >
          Transparent pricing.
          <br />
          No hidden fees.
        </h2>
        <p className="text-base text-white/50 mt-3.5 leading-relaxed">
          Choose a plan that fits your business goals. All plans include a free 30-minute strategy consultation.
        </p>
      </div>

      {/* Big watermark text */}
      <div
        className="relative text-center font-[var(--font-display)] leading-[0.85] tracking-[-0.04em] italic font-normal select-none pointer-events-none z-[1] mt-10 -mb-40 max-[880px]:mt-6 max-[880px]:-mb-20"
        style={{
          fontSize: "clamp(140px, 20vw, 300px)",
          color: "transparent",
          background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        Pricing
      </div>

      {/* Pricing Cards */}
      <div className="relative grid grid-cols-1 max-[880px]:max-w-[420px] lg:grid-cols-3 gap-5 max-w-[1120px] mx-auto z-[4] items-stretch">
        {pricingData.map((plan, i) => (
          <div
            key={i}
            className={`relative flex flex-col rounded-[28px] p-[30px_28px_28px] overflow-hidden transition-all duration-[350ms] group ${
              plan.featured
                ? "-translate-y-[18px] max-[880px]:translate-y-0 border border-white/[0.18] shadow-[0_50px_120px_rgba(0,113,227,0.32),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[24px] max-[880px]:hover:-translate-y-1.5"
                : "border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-1.5 hover:border-white/[0.18] hover:shadow-[0_40px_100px_rgba(0,113,227,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
            }`}
            style={{
              background: plan.featured
                ? "linear-gradient(180deg, rgba(28,32,44,0.88) 0%, rgba(8,12,22,0.92) 100%)"
                : "linear-gradient(180deg, rgba(20,22,28,0.78) 0%, rgba(8,10,16,0.85) 100%)",
              backdropFilter: "blur(28px) saturate(140%)",
            }}
          >
            {/* Glass overlay */}
            <div
              className="absolute inset-0 rounded-[inherit] pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 45%)" }}
            />

            {/* Badge */}
            {plan.badge && (
              <div
                className="absolute top-[18px] right-[18px] bg-white/10 border border-white/[0.18] text-white text-[10px] font-semibold px-[11px] py-[5px] rounded-full tracking-[0.1em] uppercase z-[3]"
                style={{ backdropFilter: "blur(8px)" }}
              >
                {plan.badge}
              </div>
            )}

            {/* Content */}
            <div className="relative z-[1]">
              <div className="text-[13px] font-medium text-white/55 mb-3.5 tracking-[0.02em]">
                {plan.tier}
              </div>

              <div className="flex items-baseline gap-1 mb-3.5">
                <span className="font-[var(--font-display)] text-[46px] text-white tracking-[-0.02em] leading-none">
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                {plan.per && <span className="text-base text-white/50 font-normal">{plan.per}</span>}
              </div>

              <p className="text-[13.5px] text-white/50 leading-relaxed mb-[22px] min-h-[48px]">
                {plan.desc}
              </p>

              {/* Features */}
              <ul className="list-none p-0 mb-[30px] flex flex-col gap-3.5">
                {plan.features.map((feat, j) => (
                  <li key={j} className="text-[13.5px] text-white/[0.82] leading-[1.5] flex gap-3 items-start">
                    <span className="shrink-0 w-[18px] h-[18px] rounded-full bg-white/[0.08] border border-white/[0.14] flex items-center justify-center mt-[1px]">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2.5 6.5 5 9 9.5 3.5" />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href="/contact"
              className={`relative z-[1] mt-auto w-full flex items-center justify-center px-[22px] py-3.5 rounded-full text-[13.5px] font-semibold transition-all duration-200 hover:-translate-y-[1px] ${
                plan.ctaPrimary
                  ? "bg-[var(--color-blue)] text-white border border-[#39f] shadow-[0_10px_30px_rgba(0,113,227,0.45)] hover:bg-[#0058b8] hover:border-[#0058b8]"
                  : "bg-white text-[#0a0a0a] border border-white hover:bg-white/[0.92]"
              }`}
            >
              {plan.ctaLabel}
            </a>
          </div>
        ))}
      </div>

      {/* Billing Toggle */}
      <div className="relative max-w-[1120px] mx-auto mt-12 z-[4] flex justify-start max-[880px]:justify-center items-center gap-3.5">
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="inline-flex items-center gap-3 text-white/[0.82] text-[13.5px] bg-none border-none cursor-pointer p-0 font-inherit"
        >
          Annual billing
          <div
            className={`relative w-[44px] h-6 rounded-full border transition-all duration-[250ms] ${
              isYearly
                ? "bg-[var(--color-blue)] border-[#39f]"
                : "bg-white/10 border-white/[0.18]"
            }`}
          >
            <div
              className={`absolute left-[2px] top-[1px] w-[18px] h-[18px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-transform duration-[250ms] ${
                isYearly ? "translate-x-5" : ""
              }`}
            />
          </div>
        </button>
        <span className="text-xs text-white/45">Save up to 20%</span>
      </div>
    </section>
  );
}
