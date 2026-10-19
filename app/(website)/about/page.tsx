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
  const [aboutData, setAboutData] = useState<CloudAboutData>({
    name: "Kamrujjaman Mufti",
    title: "Founder of Digital World",
    bioParagraph1:
      "I'm Kamrujjaman Mufti, founder of Digital World, a digital marketing agency based in Dhaka, Bangladesh. With 5+ years of experience, I help businesses grow through SEO, AEO, GEO, paid advertising, web development, content marketing, and AI-powered solutions.",
    bioParagraph2:
      "My approach is simple: understand the business, identify the right opportunities, and build digital strategies around meaningful growth.",
    imagePath: "/images/23.png",
    timeline: [
      {
        years: "2026 – Present",
        role: "AI Automation",
        company: "Exploring AI-powered workflows, intelligent agents, and business process automation."
      },
      {
        years: "2024 – 2026",
        role: "Digital Marketing Expert",
        company: "Bringing digital marketing expertise together through KJ Digital World."
      },
      {
        years: "2022 – 2024",
        role: "SEO & Paid Ads",
        company: "Expanding into search engine optimization and paid advertising."
      },
      {
        years: "2021 – 2022",
        role: "Web Development",
        company: "Developing an understanding of websites, user experience, and website performance."
      },
      {
        years: "2020 – 2021",
        role: "The Beginning",
        company: "Building a foundation in digital marketing and learning the fundamentals of online growth."
      }
    ],
    metrics: [
      { numericValue: 150, suffix: "+", label: "Projects Completed" },
      { numericValue: 120, suffix: "+", label: "Happy Clients" },
      { numericValue: 5, suffix: "+", label: "Years of Experience" },
      { numericValue: 11, suffix: "+", label: "Countries Served" }
    ]
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setAboutData((prev) => ({ ...prev, ...data }));
        }
      } catch {}
    }
    load();
  }, []);

  const timelineData = aboutData.timeline || [
    {
      years: "2026 – Present",
      role: "AI Automation",
      company: "Exploring AI-powered workflows, intelligent agents, and business process automation."
    },
    {
      years: "2024 – 2026",
      role: "Digital Marketing Expert",
      company: "Bringing digital marketing expertise together through KJ Digital World."
    },
    {
      years: "2022 – 2024",
      role: "SEO & Paid Ads",
      company: "Expanding into search engine optimization and paid advertising."
    },
    {
      years: "2021 – 2022",
      role: "Web Development",
      company: "Developing an understanding of websites, user experience, and website performance."
    },
    {
      years: "2020 – 2021",
      role: "The Beginning",
      company: "Building a foundation in digital marketing and learning the fundamentals of online growth."
    }
  ];

  const statsMetrics = aboutData.metrics || [
    { numericValue: 150, suffix: "+", label: "Projects Completed" },
    { numericValue: 120, suffix: "+", label: "Happy Clients" },
    { numericValue: 5, suffix: "+", label: "Years of Experience" },
    { numericValue: 11, suffix: "+", label: "Countries Served" }
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

  // 7 Core Services under OUR EXPERTISE
  const expertiseServices = [
    {
      title: "Search Engine Optimization (SEO)",
      desc: "Improve your organic search visibility and help relevant customers discover your business. Our SEO expertise covers local, ecommerce, international, SaaS, video, semantic, technical, and AI-focused SEO, alongside link building.",
      icon: Icons.Search,
      link: "/services/seo",
      badge: "Organic Search",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Answer & AI Search Optimization",
      desc: "Prepare your digital presence for evolving search experiences through Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and AI-focused optimization (AIO). The focus is on clear, relevant, well-structured information that supports discovery across search engines and AI-powered platforms.",
      icon: Icons.Sparkles,
      link: "/services/aeo-geo-aio",
      badge: "AEO · GEO · AIO",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "PPC & Paid Advertising",
      desc: "Reach targeted audiences through Google Ads and paid social campaigns. We focus on campaign strategy, audience relevance, measurement, and ongoing optimization to support lead generation and business growth.",
      icon: Icons.Target,
      link: "/services/ppc",
      badge: "Paid Campaigns",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Web Design & Development",
      desc: "Create user-friendly websites and landing pages designed around your brand and business objectives. From WordPress and Shopify development to UI/UX design, speed optimization, and maintenance, the goal is to provide a reliable experience that helps visitors take action.",
      icon: Icons.Laptop,
      link: "/services/web-design-dev",
      badge: "Design & Speed",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Content Marketing & Writing",
      desc: "Communicate your value through useful, relevant content. Our content services include blog writing, website copy, product descriptions, social media copy, email copy, ad copy, sales copy, and video scripts.",
      icon: Icons.PenTool,
      link: "/services/content-marketing",
      badge: "Copywriting",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "AI Automation",
      desc: "Make everyday business processes more efficient with AI-powered workflows and integrations. Solutions can include lead automation, CRM automation, WhatsApp automation, AI voice agents, customer support workflows, MCP integrations, and RAG knowledge bases.",
      icon: Icons.Cpu,
      link: "/services/ai-automation",
      badge: "Intelligent Agents",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "AI Video Production",
      desc: "Create AI-assisted video content for product promotions, explainers, UGC-style videos, avatar videos, short-form content, multilingual dubbing, property videos, and video repurposing.",
      icon: Icons.Video,
      link: "/services/ai-video-production",
      badge: "AI Media",
      color: "bg-rose-50 text-rose-600"
    }
  ];

  // How We Work: 4-Step Process
  const howWeWorkSteps = [
    {
      step: "01",
      title: "Understand Your Business",
      desc: "We start by understanding your business model, target audience, current challenges, and growth priorities.",
      icon: Icons.Compass
    },
    {
      step: "02",
      title: "Identify the Right Opportunities",
      desc: "We assess the project requirements and identify the services and strategies most relevant to your goals.",
      icon: Icons.Lightbulb
    },
    {
      step: "03",
      title: "Plan & Execute",
      desc: "We turn the agreed priorities into a focused plan and carry out the work according to the project scope.",
      icon: Icons.CheckSquare
    },
    {
      step: "04",
      title: "Review & Improve",
      desc: "We use available performance data, feedback, and project objectives to identify areas for improvement and refine the approach.",
      icon: Icons.TrendingUp
    }
  ];

  // Our Values
  const valuesData = [
    {
      number: "01",
      title: "Data-Driven Decisions",
      desc: "Research, analysis, and available performance data help guide our decisions. We aim to understand the situation before deciding on the next step.",
      accent: "border-blue-200 bg-blue-50/40 text-blue-900"
    },
    {
      number: "02",
      title: "Transparency",
      desc: "Clear communication and honest progress updates are essential to a productive working relationship. We want clients to understand the work, priorities, and reasoning behind key decisions.",
      accent: "border-emerald-200 bg-emerald-50/40 text-emerald-900"
    },
    {
      number: "03",
      title: "Creative Solutions",
      desc: "Different businesses face different challenges. We look for practical solutions that fit the project's needs rather than applying the same formula to every situation.",
      accent: "border-amber-200 bg-amber-50/40 text-amber-900"
    },
    {
      number: "04",
      title: "Client-Focused Partnerships",
      desc: "Every project starts with understanding your goals. We treat your priorities as a central part of the strategy and work toward outcomes that support your business.",
      accent: "border-purple-200 bg-purple-50/40 text-purple-900"
    }
  ];

  // Tools & Technology Categories
  const toolGroups = [
    {
      category: "SEO & Research",
      tools: [
        { name: "Ahrefs", icon: "/Emoji/mag.png" },
        { name: "Semrush", icon: "/Emoji/bar_chart.png" },
        { name: "Screaming Frog", icon: "/Emoji/frog.png" }
      ]
    },
    {
      category: "Website & Ecommerce",
      tools: [
        { name: "WordPress", icon: "/Emoji/computer.png" },
        { name: "Shopify", icon: "/Emoji/shopping_trolley.png" }
      ]
    },
    {
      category: "Design & Creative",
      tools: [
        { name: "Figma", icon: "/Emoji/triangular_ruler.png" },
        { name: "Adobe Creative Suite", icon: "/Emoji/art.png" }
      ]
    },
    {
      category: "Advertising & Analytics",
      tools: [
        { name: "Google Ads", icon: "/Emoji/red_circle.png" },
        { name: "Meta Ads Manager", icon: "/Emoji/dart.png" },
        { name: "Google Tag Manager", icon: "/Emoji/label.png" },
        { name: "Google Analytics 4", icon: "/Emoji/chart_with_upwards_trend.png" }
      ]
    },
    {
      category: "Automation",
      tools: [
        { name: "n8n", icon: "/Emoji/gear.png" }
      ]
    }
  ];

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

              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mb-4">
                {aboutData.bioParagraph1 || "I'm Kamrujjaman Mufti, founder of Digital World, a digital marketing agency based in Dhaka, Bangladesh. With 5+ years of experience, I help businesses grow through SEO, AEO, GEO, paid advertising, web development, content marketing, and AI-powered solutions."}
              </p>
              
              {aboutData.bioParagraph2 && (
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mb-8">
                  {aboutData.bioParagraph2}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover px-7 py-3.5 font-sans text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  View My Work
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

      {/* ── 2. MY JOURNEY ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-t border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Story Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4">
                MY JOURNEY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight tracking-tight mb-6">
                From Learning How Search Works to Building Digital Growth Strategies
              </h2>
              
              <div className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                <p>
                  My journey started with one simple question: how do websites rank on Google?
                </p>
                <p>
                  That curiosity grew into a career in digital marketing, starting with the fundamentals of web development and search engine optimization. Over time, my focus expanded to paid advertising, content strategy, answer engine optimization, generative engine optimization, and AI automation.
                </p>
                <p>
                  Today, through Digital World, I bring these areas together to help businesses strengthen their online presence, reach relevant audiences, and improve how they connect with potential customers.
                </p>
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
              ABOUT DIGITAL WORLD
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              A Digital Growth Partner for Businesses Ready to Move Forward
            </h2>
            <div className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans text-left sm:text-center">
              <p>
                Digital World is a full-service digital marketing agency based in Dhaka, Bangladesh, serving businesses across international markets.
              </p>
              <p>
                We bring SEO, paid advertising, web design and development, content marketing, AI automation, and AI video production together to help businesses build a stronger digital presence.
              </p>
              <p>
                Rather than treating every channel as a separate activity, we focus on how each part can support a broader business objective—from improving search visibility and attracting relevant visitors to creating better website experiences and streamlining repetitive tasks.
              </p>
              <p className="font-semibold text-neutral-800">
                Every business has different needs. Our goal is to understand yours and develop a practical strategy around your priorities.
              </p>
            </div>
          </div>

          {/* Mission & Philosophy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <div className="bg-white border border-neutral-200/70 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                  <Icons.Target className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                  OUR PURPOSE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mb-4">
                  Our Mission
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  To help businesses make better use of digital opportunities through thoughtful strategy, effective execution, and solutions aligned with their goals.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center gap-2 text-primary text-xs font-bold">
                <Icons.CheckCircle2 className="h-4 w-4" /> Aligned with your business goals
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="bg-white border border-neutral-200/70 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-6">
                  <Icons.Lightbulb className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                  CORE BELIEF
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mb-4">
                  Our Philosophy
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3">
                  More traffic does not automatically mean more growth. The right audience, a useful website experience, relevant content, and a clear path to conversion all matter.
                </p>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  We focus on connecting digital marketing activities with the needs of your business and customers.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center gap-2 text-amber-700 text-xs font-bold">
                <Icons.CheckCircle2 className="h-4 w-4" /> Meaningful impact over vanity metrics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. OUR EXPERTISE ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 inline-block">
              OUR EXPERTISE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              Digital Services Built Around Your Business Goals
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Each service is selected according to the project&apos;s needs, goals, and scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {expertiseServices.map((svc, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200/70 rounded-3xl p-7 shadow-sm hover:shadow-premium hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${svc.color}`}>
                      <svc.icon className="h-5 w-5" />
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
                  href={svc.link}
                  className="font-sans text-xs font-bold text-primary hover:text-primary-hover inline-flex items-center gap-1.5 transition-colors pt-4 border-t border-neutral-100 mt-auto"
                >
                  Explore Service <Icons.ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
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
              HOW WE WORK
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              A Clear Process. A Strategy Built Around You.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Our aim is to keep the process practical, communication clear, and decisions connected to the goals that matter to your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
            {howWeWorkSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200/70 rounded-3xl p-7 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-2xl font-bold text-primary/70">
                    {step.step}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="font-sans font-bold text-base text-neutral-900 mb-2.5 leading-snug">
                  {step.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
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
            OUR VALUES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-12">
            The Principles Behind Every Project
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
            {valuesData.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-7 sm:p-8 border shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${item.accent}`}
              >
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider opacity-60 mb-3">
                    Principle {item.number}
                  </div>
                  <h3 className="font-sans font-bold text-base sm:text-lg mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-90">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TOOLS & TECHNOLOGY ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 inline-block">
            TOOLS & TECHNOLOGY
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
            The Tools Behind the Work
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            The right tools help us research opportunities, implement strategies, build digital experiences, and evaluate performance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left mb-10">
            {toolGroups.map((group, idx) => (
              <div
                key={idx}
                className="bg-neutral-50/60 border border-neutral-100 rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all"
              >
                <h3 className="font-sans text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-col gap-3">
                  {group.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="bg-white border border-neutral-100 rounded-xl p-3 px-4 flex items-center gap-3 shadow-2xs"
                    >
                      <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
                        <Image
                          src={tool.icon}
                          alt={tool.name}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-sans font-bold text-xs sm:text-sm text-neutral-800">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-100 text-center max-w-3xl mx-auto">
            <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Tools are chosen based on the needs of each project. The priority is to use technology purposefully—not simply to add more tools to the process.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. LET'S TALK ABOUT YOUR NEXT PROJECT (CTA) ───────────── */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-neutral-50/50 to-white relative overflow-hidden">
        <div className="container mx-auto max-w-5xl px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-4 py-1 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">
            LET&apos;S CONNECT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
            One Digital Partner. Connected Solutions. <br className="hidden sm:inline" />
            <span className="text-primary italic font-serif">A Focus on Growth.</span>
          </h2>
          <div className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans mb-10">
            <p className="mb-3">
              Whether you want to improve your search visibility, generate leads through paid advertising, build a better website, strengthen your content, or explore AI automation, let&apos;s discuss what your business needs.
            </p>
            <p className="font-medium text-neutral-800">
              We&apos;ll start with your goals and identify a practical next step.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Me
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 px-8 py-4 font-sans text-xs sm:text-sm font-bold text-neutral-800 shadow-sm transition-all hover:border-neutral-400"
            >
              <Icons.Calendar className="h-4 w-4 text-primary" />
              Book a Free 30-Minute Strategy Consultation
            </Link>
          </div>
        </div>
      </section>

    </article>
  );
}
