"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { countriesData } from "@/data/countries";
import { CloudAboutData } from "@/types";

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
    <div
      className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-premium transition-all duration-300 flex flex-col items-center justify-center"
    >
      <span className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight mb-2">
        {isVisible ? count : 0}{suffix}
      </span>
      <span className="font-sans text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest text-center">
        {label}
      </span>
    </div>
  );
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<CloudAboutData>({
    name: "Kamrujjaman Mufti",
    title: "Digital Marketing Expert & Web Developer",
    bioParagraph1: "Full-service digital marketing expert with 5 years of hands-on experience helping businesses of all sizes grow through SEO, web development, paid ads, and content marketing.",
    bioParagraph2: "Every project I take on is treated as a partnership, where your success is my success.",
    imagePath: "/images/23.png",
    timeline: [
      { years: "2026 - Present", role: "AI Automation Specialist", company: "Building custom AI workflows, intelligent agents & automated growth systems" },
      { years: "2024 - 2026", role: "Digital Marketing Expert", company: "KJ Digital World" },
      { years: "2022 - 2024", role: "SEO & Paid Ads Specialist", company: "Freelance / Agency Partner" },
      { years: "2021 - 2022", role: "Web Developer", company: "Building fast, optimized websites" },
      { years: "2020 - 2021", role: "The Beginning", company: "Mastering the fundamentals of digital marketing" }
    ],
    metrics: [
      { numericValue: 150, suffix: "+", label: "Projects Delivered" },
      { numericValue: 120, suffix: "+", label: "Happy Clients" },
      { numericValue: 5, suffix: "", label: "Years Experience" },
      { numericValue: 11, suffix: "", label: "Countries Served" }
    ]
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/about");
        if (res.ok) {
          const data = await res.json();
          setAboutData((prev) => ({ ...prev, ...data }));
        }
      } catch {}
    }
    load();
  }, []);

  const timelineData = aboutData.timeline || [
    { years: "2026 - Present", role: "AI Automation Specialist", company: "Building custom AI workflows, intelligent agents & automated growth systems" },
    { years: "2024 - 2026", role: "Digital Marketing Expert", company: "KJ Digital World" },
    { years: "2022 - 2024", role: "SEO & Paid Ads Specialist", company: "Freelance / Agency Partner" },
    { years: "2021 - 2022", role: "Web Developer", company: "Building fast, optimized websites" },
    { years: "2020 - 2021", role: "The Beginning", company: "Mastering the fundamentals of digital marketing" }
  ];

  const statsMetrics = aboutData.metrics || [
    { numericValue: 150, suffix: "+", label: "Projects Delivered" },
    { numericValue: 120, suffix: "+", label: "Happy Clients" },
    { numericValue: 5, suffix: "", label: "Years Experience" },
    { numericValue: 11, suffix: "", label: "Countries Served" }
  ];

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

  const expertiseData = [
    { title: "Search Engine Optimization", icon: Icons.Search, desc: "Optimize GBP mappings, crawl budgets, and entity relevance architectures.", color: "bg-blue-50 text-blue-600" },
    { title: "Pay Per Click Campaigns", icon: Icons.Target, desc: "Scale acquisitions predictably across Google Search, Shopping, and Smart Bidding campaigns.", color: "bg-orange-50 text-orange-600" },
    { title: "Social Media Advertising", icon: Icons.Smartphone, desc: "Configure custom Meta Pixels, lookalike loops, and creative hooks.", color: "bg-purple-50 text-purple-600" },
    { title: "Web Development", icon: Icons.Laptop, desc: "Stunning custom-coded Next.js visual frontends optimized for transaction speeds.", color: "bg-blue-50 text-blue-600" },
    { title: "Sourcing Services", icon: Icons.Truck, desc: "Verify manufacturing licenses, factory compliance reports, and cargo routes.", color: "bg-orange-50 text-orange-600" },
    { title: "Content Marketing", icon: Icons.PenTool, desc: "Draft high-converting copy frameworks, editorial briefs, and syndication strategies.", color: "bg-amber-50 text-amber-600" }
  ];

  const valuesData = [
    { title: "Data-Driven Decisions", desc: "Analyze patterns before making moves.", color: "bg-blue-50/50 border-blue-100 text-blue-900" },
    { title: "Absolute Transparency", desc: "Direct communication and honest progress.", color: "bg-emerald-50/50 border-emerald-100 text-emerald-900" },
    { title: "Creative Solutions", desc: "Unique hooks and custom-designed funnels.", color: "bg-amber-50/50 border-amber-100 text-amber-900" },
    { title: "Client Focused", desc: "Your growth is our target. Full alignment.", color: "bg-violet-50/50 border-violet-100 text-violet-900" }
  ];

  const toolsList = [
    { name: "Ahrefs", desc: "SEO Research", icon: "/Emoji/mag.png" },
    { name: "SEMrush", desc: "Competitor Analysis", icon: "/Emoji/bar_chart.png" },
    { name: "WordPress", desc: "Web Development", icon: "/Emoji/computer.png" },
    { name: "Shopify", desc: "E-Commerce", icon: "/Emoji/shopping_trolley.png" },
    { name: "Figma", desc: "UI/UX Design", icon: "/Emoji/triangular_ruler.png" },
    { name: "Meta Ads Manager", desc: "Performance Ads", icon: "/Emoji/dart.png" },
    { name: "Google Ads", desc: "Search & Display", icon: "/Emoji/red_circle.png" },
    { name: "Google Tag Manager", desc: "Tracking & Analytics", icon: "/Emoji/label.png" },
    { name: "Google Analytics 4", desc: "Performance Tracking", icon: "/Emoji/chart_with_upwards_trend.png" },
    { name: "n8n", desc: "Automation", icon: "/Emoji/gear.png" },
    { name: "Adobe Suite", desc: "Graphic Design", icon: "/Emoji/art.png" },
    { name: "Screaming Frog", desc: "Technical SEO", icon: "/Emoji/frog.png" }
  ];

  const bottomCtaServices = [
    { title: "SEO Agency", desc: "Grow search footprint and capture high-intent buyers.", link: "/services/seo", icon: Icons.Search },
    { title: "PPC & Paid Ads", desc: "Accelerate conversions through targeted search bidding.", link: "/services/ppc", icon: Icons.Target },
    { title: "Web Design & Dev", desc: "Custom visual frontends optimized for speed and UX.", link: "/services/web-design-dev", icon: Icons.Laptop },
    { title: "Content & Strategy", desc: "Build authority and lists that drive stable acquisitions.", link: "/services/content-marketing", icon: Icons.PenTool },
    { title: "AI Automation", desc: "Integrate custom intelligent agents and workflows.", link: "/services/ai-automation", icon: Icons.Cpu },
    { title: "AI Video Production", desc: "Studio-quality AI explainers, product ads, and spokesperson videos.", link: "/services/ai-video-production", icon: Icons.Video }
  ];

  return (
    <article className="min-h-screen bg-transparent">
      
      {/* 1. About Hero Section */}
      <section className="relative overflow-hidden bg-transparent py-12 sm:py-16 lg:py-20">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
        
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Biography & CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-100 px-3.5 py-1 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                ABOUT ME
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.08] mb-4">
                Hi, I&apos;m <br />
                {aboutData.name ? (
                  aboutData.name.split(" ").map((part, i) => (
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

              <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl mb-4">
                {aboutData.bioParagraph1 || "Full-service digital marketing expert helping businesses grow through SEO, web development, paid ads, and content marketing."}
              </p>
              
              {aboutData.bioParagraph2 && (
                <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl mb-8">
                  {aboutData.bioParagraph2}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover px-7 py-3.5 font-sans text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  View Work
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-7 py-3.5 font-sans text-xs font-bold text-neutral-800 shadow-sm transition-all hover:border-neutral-300"
                >
                  Contact Me <Icons.ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-6 w-full">
                {["English", "Hindi", "Urdu", "Bengali"].map((lang) => (
                  <span
                    key={lang}
                    className="bg-neutral-100/70 border border-neutral-200/60 text-neutral-500 text-[10px] sm:text-xs font-semibold px-4 py-1.5 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-blue-500/10 blur-[80px] pointer-events-none -z-10 rounded-full" />

              <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] flex items-center justify-center p-2">
                <Image
                  src={aboutData.imagePath || "/images/23.png"}
                  alt={aboutData.name || "Kamrujjaman Mufti"}
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

      {/* 2. Timeline / Results Section */}
      <section className="py-14 lg:py-20 bg-white border-t border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4">
                MY JOURNEY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight tracking-tight mb-4">
                From curiosity to <br />nearly a decade of results.
              </h2>
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-5">
                It started with one simple question: how do websites actually rank on Google? That question turned into a career — and eventually into Digital World.
              </p>
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-5">
                I&apos;m {aboutData.name || "Kamrujjaman"}, founder of Digital World, a digital marketing agency based in Dhaka, Bangladesh. For nearly a decade, I&apos;ve worked as an SEO, AEO, AIO, and GEO specialist, helping small businesses, growing brands, and enterprises across 11 countries — including the USA, UK, Canada, UAE, and Australia — build visibility that actually converts.
              </p>
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-5">
                <strong className="font-bold text-neutral-900">What we do:</strong> SEO (Local, Ecommerce, International, Video, SaaS, Semantic, and AI SEO), Google Ads and Meta Ads management, web design and development, content marketing, AI automation, and AI video production — all under one roof.
              </p>
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-5">
                <strong className="font-bold text-neutral-900">Why it matters:</strong> Most businesses don&apos;t need more traffic. They need the right traffic — customers actively searching for what you sell, on Google, and increasingly on AI platforms like ChatGPT, Gemini, and Google AI Overviews.
              </p>
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
                <strong className="font-bold text-neutral-900">How we help:</strong> Every project starts as a partnership, not a transaction. Your growth is my growth — which is why we build for sustainable rankings and long-term visibility.
              </p>
            </div>

            {/* Right Timeline Milestones */}
            <div className="lg:col-span-6 flex flex-col justify-center gap-8 pl-0 lg:pl-10">
              {timelineData.map((item, idx) => (
                <div key={idx} className="flex gap-6 relative group">
                  {idx < timelineData.length - 1 && (
                    <div className="absolute left-2.5 top-6 bottom-[-2.5rem] w-0.5 bg-neutral-200" />
                  )}
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${idx === 0 ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-primary bg-white"} relative z-10 mt-1`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-emerald-500 animate-pulse" : "bg-primary"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-50 border border-blue-100 text-primary text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                        {item.years}
                      </span>
                    </div>
                    <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-900 mb-0.5">
                      {item.role}
                    </h4>
                    <p className="font-sans text-xs text-neutral-400">
                      {item.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. Numbers / Stats Section */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 inline-block">
            METRICS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-8">
            5 years of work, <br className="sm:hidden" />
            in <span className="text-primary italic font-serif font-medium">4 numbers.</span>
          </h2>
          
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
      </section>

      {/* 4. What I do best (Services Grid) */}
      <section className="py-14 lg:py-20 bg-neutral-50/50 border-t border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 inline-block">
            EXPERTISE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-8">
            What I do best.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseData.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border border-neutral-200/60 rounded-3xl p-8 text-left shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-300"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} mb-6`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-sans font-bold text-lg text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Values Section */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 inline-block">
            OUR VALUES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-8">
            The values behind <br className="sm:hidden" />
            every project.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {valuesData.map((item, idx) => (
              <div 
                key={idx}
                className={`rounded-3xl p-8 border text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all ${item.color}`}
              >
                <div className="font-sans text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4">
                  Value 0{idx + 1}
                </div>
                <h4 className="font-sans font-bold text-base mb-3 leading-snug">
                  {item.title}
                </h4>
                <p className="font-sans text-xs leading-relaxed opacity-80">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bangladesh / Global Reach */}
      <section className="py-20 lg:py-28 bg-neutral-50/50 border-t border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 inline-block">
            GLOBAL REACH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight mb-12">
            Based in Bangladesh. <br />Serving the world.
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {countriesData.map((country) => (
              <div 
                key={country.id}
                className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center"
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
                <h4 className="font-sans font-bold text-sm text-neutral-800 mb-0.5">
                  {country.name}
                </h4>
                <p className="font-sans text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  {country.specialtyTag}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Tools I use every day */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4 inline-block">
            TOOLS & STACK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight mb-12">
            Tools I use every day.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto text-left">
            {toolsList.map((tool) => (
              <div 
                key={tool.name} 
                className="bg-neutral-50/70 border border-neutral-100/50 rounded-2xl p-4 px-5 flex items-center gap-4 hover:shadow-sm transition-all duration-300"
              >
                <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-neutral-100/50 p-2 relative">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-800">
                    {tool.name}
                  </h4>
                  <p className="font-sans text-[10px] sm:text-xs text-neutral-400">
                    {tool.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. One expert. All services. Real results. (CTA) */}
      <section className="py-20 lg:py-28 border-t border-neutral-100 bg-transparent">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 inline-block">
            CONTACT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight mb-12">
            One expert. <br />All services. Real results.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bottomCtaServices.map((svc, idx) => (
              <Link 
                key={idx}
                href={svc.link}
                className="group bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-sm hover:shadow-premium hover:border-primary/20 text-left transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                    <svc.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-900 mb-2">
                    {svc.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>
                <div className="font-sans text-[10px] font-bold text-primary hover:text-primary-hover flex items-center gap-1 mt-auto">
                  Learn More <Icons.ArrowUpRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </article>
  );
}
