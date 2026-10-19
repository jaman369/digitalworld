"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { countriesData } from "@/data/countries";
import { CloudAboutData } from "@/types";
import { defaultAboutData } from "@/data/aboutDefaultData";

/* ── Animated Counter Hook ─────────────────────────────────── */
function useCountUp(end: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);

  return count;
}

/* ── Single stat card with animated number ──────────────────── */
function AnimatedStat({
  numericValue,
  suffix,
  label,
  isVisible,
}: {
  numericValue: number;
  suffix: string;
  label: string;
  isVisible: boolean;
}) {
  const count = useCountUp(numericValue, 2200, isVisible);

  return (
    <div className="bg-white border border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center">
      <span className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight mb-2">
        {isVisible ? count : 0}{suffix}
      </span>
      <span className="font-sans text-[11px] sm:text-xs font-bold text-neutral-500 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<CloudAboutData>(defaultAboutData);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setAboutData(data);
        }
      } catch {}
    }
    load();
  }, []);

  // Section Data with reliable fallbacks
  const hero = aboutData.hero || defaultAboutData.hero;
  const journey = aboutData.journey || defaultAboutData.journey;
  const whyUs = aboutData.whyUs || defaultAboutData.whyUs;
  const expertise = aboutData.expertise || defaultAboutData.expertise;
  const process = aboutData.process || defaultAboutData.process;
  const values = aboutData.values || defaultAboutData.values;
  const tools = aboutData.tools || defaultAboutData.tools;
  const cta = aboutData.cta || defaultAboutData.cta;

  const timelineData = journey?.timeline || aboutData.timeline || defaultAboutData.timeline || [];
  const statsMetrics = aboutData.metricsList || aboutData.metrics || defaultAboutData.metricsList || [];
  const whyUsCards = whyUs?.cards || defaultAboutData.whyUs?.cards || [];
  const expertiseItems = expertise?.items || defaultAboutData.expertise?.items || [];
  const processSteps = process?.steps || defaultAboutData.process?.steps || [];
  const valuesCards = values?.cards || defaultAboutData.values?.cards || [];
  const toolsList = tools?.tools || defaultAboutData.tools?.tools || [];

  // IntersectionObserver for the metrics section
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const node = metricsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Visual accents
  const expertiseIcons = [Icons.Search, Icons.Sparkles, Icons.Target, Icons.Laptop, Icons.PenTool, Icons.Cpu, Icons.Video];
  const expertiseColors = [
    "bg-blue-50 text-blue-600",
    "bg-purple-50 text-purple-600",
    "bg-orange-50 text-orange-600",
    "bg-blue-50 text-blue-600",
    "bg-emerald-50 text-emerald-600",
    "bg-indigo-50 text-indigo-600",
    "bg-rose-50 text-rose-600",
  ];

  const processIcons = [Icons.Compass, Icons.Lightbulb, Icons.CheckSquare, Icons.TrendingUp];

  const valueAccents = [
    "border-blue-200 bg-blue-50/40 text-blue-900",
    "border-emerald-200 bg-emerald-50/40 text-emerald-900",
    "border-amber-200 bg-amber-50/40 text-amber-900",
    "border-purple-200 bg-purple-50/40 text-purple-900",
  ];

  const founderName = hero?.name || aboutData.name || "Kamrujjaman Mufti";

  return (
    <article className="min-h-screen bg-transparent">
      
      {/* ── 1. ABOUT ME (Hero Section) ────────────────────────────── */}
      <section className="relative overflow-hidden bg-transparent py-12 sm:py-16 lg:py-20">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
        
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Biography & CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/90 border border-blue-100 px-3.5 py-1 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {hero?.badge || "ABOUT ME"}
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.08] mb-4">
                {hero?.greeting || "Hi, I'm"} <br />
                {founderName ? (
                  founderName.split(" ").map((part, i) => (
                    <span key={i} className={i === 1 ? "text-primary italic font-serif" : ""}>
                      {part}{" "}
                    </span>
                  ))
                ) : (
                  <>
                    Kamrujjaman <br />
                    <span className="text-primary italic font-serif">Mufti.</span>
                  </>
                )}
              </h1>

              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mb-4">
                {hero?.bioParagraph1 || aboutData.bioParagraph1 || defaultAboutData.hero?.bioParagraph1}
              </p>
              
              {(hero?.bioParagraph2 || aboutData.bioParagraph2) && (
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mb-8">
                  {hero?.bioParagraph2 || aboutData.bioParagraph2}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
                <Link
                  href={hero?.primaryCtaLink || "/portfolio"}
                  className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover px-7 py-3.5 font-sans text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {hero?.primaryCtaText || "View My Work"}
                </Link>
                <Link
                  href={hero?.secondaryCtaLink || "/contact"}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-7 py-3.5 font-sans text-xs font-bold text-neutral-800 shadow-sm transition-all hover:border-neutral-300"
                >
                  {hero?.secondaryCtaText || "Contact Me"} <Icons.ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-6 w-full">
                {["English", "Hindi", "Urdu", "Bengali"].map((lang) => (
                  <span
                    key={lang}
                    className="bg-neutral-100/80 border border-neutral-200/70 text-neutral-600 text-[10px] sm:text-xs font-semibold px-4 py-1.5 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Headshot Profile Image */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-blue-500/10 blur-[80px] pointer-events-none -z-10 rounded-full" />

              <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] flex items-center justify-center p-2">
                <Image
                  src={hero?.imagePath || aboutData.imagePath || "/images/23.png"}
                  alt={founderName}
                  width={440}
                  height={440}
                  priority
                  className="w-full h-auto object-contain mix-blend-multiply select-none hover:scale-[1.02] transition-transform duration-500 rounded-3xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. MY JOURNEY ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-t border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Story Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4">
                {journey?.eyebrow || "MY JOURNEY"}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight tracking-tight mb-6">
                {journey?.title || "From Learning How Search Works to Building Digital Growth Strategies"}
              </h2>
              
              <div className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                {journey?.paragraph1 && <p>{journey.paragraph1}</p>}
                {journey?.paragraph2 && <p>{journey.paragraph2}</p>}
                {journey?.paragraph3 && <p>{journey.paragraph3}</p>}
                <p className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100/80 text-neutral-800 font-medium italic">
                  &ldquo;The tools and technologies continue to evolve, but my principle remains the same: understand the problem first, then find the right solution.&rdquo;
                </p>
              </div>
            </div>

            {/* Right Timeline Milestones */}
            <div className="lg:col-span-6 flex flex-col justify-center pl-0 lg:pl-6">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 tracking-tight mb-8 flex items-center gap-2">
                <Icons.Milestone className="h-5 w-5 text-primary" />
                My Professional Journey
              </h3>

              <div className="flex flex-col gap-6 relative">
                {timelineData.map((item, idx) => (
                  <div key={idx} className="flex gap-5 relative group">
                    {idx < timelineData.length - 1 && (
                      <div className="absolute left-2.5 top-6 bottom-[-1.75rem] w-0.5 bg-neutral-200" />
                    )}
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        idx === 0
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-primary bg-white"
                      } relative z-10 mt-1`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          idx === 0 ? "bg-emerald-500 animate-pulse" : "bg-primary"
                        }`}
                      />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="bg-blue-50 border border-blue-100 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          {item.years}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-900 mb-1">
                        {item.role}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                        {item.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. ABOUT DIGITAL WORLD (Agency, Mission & Philosophy) ──── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-neutral-50/40 to-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 inline-block">
              {whyUs?.eyebrow || "WHY WORK WITH US"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-tight mb-4">
              {whyUs?.title || "What Sets Digital World Apart"}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              {whyUs?.subtitle || "A thoughtful, multi-disciplinary approach to digital marketing and AI growth."}
            </p>
          </div>

          {/* Feature Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {whyUsCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200/70 rounded-3xl p-8 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                    {idx === 0 ? <Icons.Layers className="h-6 w-6" /> : idx === 1 ? <Icons.MessageSquare className="h-6 w-6" /> : <Icons.SlidersHorizontal className="h-6 w-6" />}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                    {card.badge}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OUR EXPERTISE ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 inline-block">
              {expertise?.eyebrow || "OUR EXPERTISE"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              {expertise?.title || "Core Services Designed for Cohesive Growth"}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              {expertise?.subtitle || "Instead of treating digital marketing disciplines as separate silos, we look at how search visibility, paid campaigns, web experiences, content strategy, and AI-driven automation work together."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {expertiseItems.map((svc, idx) => {
              const IconComp = expertiseIcons[idx % expertiseIcons.length] || Icons.CheckCircle;
              const colorClass = expertiseColors[idx % expertiseColors.length];

              return (
                <div
                  key={idx}
                  className="bg-white border border-neutral-200/70 rounded-3xl p-7 shadow-sm hover:shadow-premium hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colorClass}`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50 px-2.5 py-1 rounded-full border border-neutral-100">
                        {svc.badge}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-900 mb-3 leading-snug">
                      {svc.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                      {svc.desc}
                    </p>
                  </div>

                  <Link
                    href={svc.link || "/services"}
                    className="font-sans text-xs font-bold text-primary hover:text-primary-hover inline-flex items-center gap-1.5 transition-colors pt-4 border-t border-neutral-100 mt-auto"
                  >
                    Explore Service <Icons.ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Our Services <Icons.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. HOW WE WORK ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-neutral-50/50 border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 inline-block">
              {process?.eyebrow || "OUR PROCESS"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              {process?.title || "How We Work"}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
              {process?.subtitle || "A simple, practical approach to digital growth:"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
            {processSteps.map((step, idx) => {
              const IconComp = processIcons[idx % processIcons.length] || Icons.CheckCircle;

              return (
                <div
                  key={idx}
                  className="bg-white border border-neutral-200/70 rounded-3xl p-7 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-2xl font-bold text-primary/70">
                      {step.step || `0${idx + 1}`}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <IconComp className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-sans font-bold text-base text-neutral-900 mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto text-center bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-2xs">
            <p className="font-sans text-xs sm:text-sm text-neutral-700 font-medium">
              Our aim is to keep the process practical, communication clear, and decisions connected to the goals that matter to your business.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. EXPERIENCE & GLOBAL REACH ──────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 inline-block">
              EXPERIENCE & GLOBAL REACH
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              Based in Bangladesh. Serving Businesses Across Borders.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Digital World is based in Dhaka, Bangladesh, with experience supporting businesses across multiple markets.
            </p>
          </div>

          {/* Experience at a Glance: 4 Stats */}
          <div className="mb-14">
            <h3 className="text-center font-sans text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
              Experience at a Glance
            </h3>
            <div ref={metricsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {statsMetrics.map((stat, i) => (
                <AnimatedStat
                  key={i}
                  numericValue={Number(stat.numericValue) || 0}
                  suffix={stat.suffix || ""}
                  label={stat.label || ""}
                  isVisible={metricsVisible}
                />
              ))}
            </div>
          </div>

          {/* Markets We Serve (11 countries) */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-center font-serif text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mb-2">
              Markets We Serve
            </h3>
            <p className="text-center font-sans text-xs sm:text-sm text-neutral-500 max-w-2xl mx-auto mb-8">
              United States · United Kingdom · Canada · United Arab Emirates · Australia · Ireland · South Africa · Germany · Netherlands · New Zealand · Bangladesh
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {countriesData.map((country) => (
                <div
                  key={country.id}
                  className="bg-white border border-neutral-100 rounded-2xl p-4 sm:p-5 shadow-[0_6px_20px_rgba(0,0,0,0.01)] hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center justify-center text-center"
                >
                  <div className="relative w-10 h-7 mb-3 overflow-hidden rounded border border-neutral-100/50 shadow-sm shrink-0">
                    <Image
                      src={
                        country.flagCode === "GB" ? "/Flag emoji/United Kingdom.svg" :
                        country.flagCode === "US" ? "/Flag emoji/United States.svg" :
                        country.flagCode === "CA" ? "/Flag emoji/Canada.svg" :
                        country.flagCode === "AU" ? "/Flag emoji/Australia.svg" :
                        country.flagCode === "IE" ? "/Flag emoji/Ireland.svg" :
                        country.flagCode === "AE" ? "/Flag emoji/UAE.svg" :
                        country.flagCode === "ZA" ? "/Flag emoji/South Africa.svg" :
                        country.flagCode === "DE" ? "/Flag emoji/Germany.svg" :
                        country.flagCode === "NL" ? "/Flag emoji/Netherlands.svg" :
                        country.flagCode === "NZ" ? "/Flag emoji/New Zealand.svg" :
                        "/Flag emoji/Bangladesh.svg"
                      }
                      alt={country.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-800 mb-0.5">
                    {country.name}
                  </h4>
                  <p className="font-sans text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {country.specialtyTag}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-100 text-center max-w-3xl mx-auto">
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Every market has its own audience, competition, and customer expectations. We take these differences into account when shaping digital marketing strategies for individual businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. OUR VALUES ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-neutral-50/30 to-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 inline-block">
            {values?.eyebrow || "OUR VALUES"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-12">
            {values?.title || "The Principles Behind Every Project"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
            {valuesCards.map((item, idx) => {
              const accentClass = valueAccents[idx % valueAccents.length];

              return (
                <div
                  key={idx}
                  className={`rounded-3xl p-7 sm:p-8 border shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${accentClass}`}
                >
                  <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-wider opacity-60 mb-3">
                      Principle {item.number || `0${idx + 1}`}
                    </div>
                    <h3 className="font-sans font-bold text-base sm:text-lg mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-90">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. TOOLS & TECHNOLOGY ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[11px] sm:text-xs font-bold text-blue-600 uppercase tracking-[0.25em] mb-3 inline-block">
            {tools?.eyebrow || "TOOLS & STACK"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-12 lg:mb-16">
            {tools?.title || "Tools I use every day."}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto text-left">
            {toolsList.map((tool) => (
              <div
                key={tool.name}
                className="bg-[#f8fafc] border border-slate-100/90 rounded-2xl p-4 sm:p-4.5 flex items-center gap-3.5 sm:gap-4 hover:bg-white hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-[0_2px_6px_rgba(0,0,0,0.03)] border border-slate-100 p-2.5 relative">
                  <Image
                    src={tool.icon || "/Emoji/computer.png"}
                    alt={tool.name}
                    width={24}
                    height={24}
                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-[15px] sm:text-base text-neutral-900 leading-tight mb-0.5">
                    {tool.name}
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 font-medium leading-tight">
                    {tool.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. LET'S TALK ABOUT YOUR NEXT PROJECT (CTA) ───────────── */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-neutral-50/50 to-white relative overflow-hidden">
        <div className="container mx-auto max-w-5xl px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-4 py-1 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">
            {cta?.eyebrow || "LET'S CONNECT"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
            {cta?.title || "One Digital Partner. Connected Solutions. A Focus on Growth."}
          </h2>
          <div className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans mb-10">
            {cta?.paragraph1 && <p className="mb-3">{cta.paragraph1}</p>}
            {cta?.paragraph2 && <p className="font-medium text-neutral-800">{cta.paragraph2}</p>}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta?.primaryCtaLink || "/contact"}
              className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {cta?.primaryCtaText || "Contact Me"}
            </Link>
            <Link
              href={cta?.secondaryCtaLink || "/contact"}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 px-8 py-4 font-sans text-xs sm:text-sm font-bold text-neutral-800 shadow-sm transition-all hover:border-neutral-400"
            >
              <Icons.Calendar className="h-4 w-4 text-primary" />
              {cta?.secondaryCtaText || "Book a Free 30-Minute Strategy Consultation"}
            </Link>
          </div>
        </div>
      </section>

    </article>
  );
}
