"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { countriesData } from "@/data/countries";

export default function AboutPage() {
  const timelineData = [
    { years: "2024 - Present", role: "Digital Marketing Expert", company: "KJ Digital World" },
    { years: "2022 - 2024", role: "SEO & Paid Ads Specialist", company: "Freelance / Agency Partner" },
    { years: "2021 - 2022", role: "Web Developer", company: "Building fast, optimized websites" },
    { years: "2020 - 2021", role: "The Beginning", company: "Mastering the fundamentals of digital marketing" }
  ];

  const statsMetrics = [
    { value: "150+", label: "Projects Delivered" },
    { value: "120+", label: "Happy Clients" },
    { value: "5", label: "Years Experience" },
    { value: "11", label: "Countries Served" }
  ];

  const expertiseData = [
    { title: "Search Engine Optimization", icon: Icons.Search, desc: "Optimize GBP mappings, crawl budgets, and entity relevance architectures.", iconColor: "text-blue-600 bg-blue-50", barColor: "bg-blue-500" },
    { title: "Pay Per Click Campaigns", icon: Icons.Target, desc: "Scale acquisitions predictably across Google Search, Shopping, and Smart Bidding campaigns.", iconColor: "text-sky-600 bg-sky-50", barColor: "bg-sky-400" },
    { title: "Social Media Advertising", icon: Icons.Smartphone, desc: "Configure custom Meta Pixels, lookalike loops, and creative hooks.", iconColor: "text-purple-600 bg-purple-50", barColor: "bg-purple-500" },
    { title: "Web Development", icon: Icons.Laptop, desc: "Stunning custom-coded Next.js/Vite visual frontends optimized for transaction speeds.", iconColor: "text-indigo-600 bg-indigo-50", barColor: "bg-indigo-500" },
    { title: "Sourcing Services", icon: Icons.Truck, desc: "Verify manufacturing licenses, factory compliance reports, and cargo routes.", iconColor: "text-amber-600 bg-amber-50", barColor: "bg-amber-500" },
    { title: "Content Marketing", icon: Icons.PenTool, desc: "Draft high-converting copy frameworks, editorial briefs, and syndication strategies.", iconColor: "text-emerald-600 bg-emerald-50", barColor: "bg-emerald-500" }
  ];

  const valuesData = [
    { title: "Data-Driven Decisions", desc: "Analyze patterns before making moves.", color: "bg-blue-50/50 border-blue-100/60 text-blue-900" },
    { title: "Absolute Transparency", desc: "Direct communication and honest progress.", color: "bg-emerald-50/50 border-emerald-100/60 text-emerald-900" },
    { title: "Creative Solutions", desc: "Unique hooks and custom-designed funnels.", color: "bg-amber-50/50 border-amber-100/60 text-amber-900" },
    { title: "Client Focused", desc: "Your growth is our target. Full alignment.", color: "bg-violet-50/50 border-violet-100/60 text-violet-900" }
  ];

  const originalSpecialties: Record<string, string> = {
    us: "Organic Traffic Hub",
    uk: "Lead Gen Core",
    ca: "B2B Optimization",
    au: "Ecommerce Scale",
    ie: "SaaS Strategy",
    ae: "High ROI Ads",
    za: "Conversion Lift",
    de: "Technical Search",
    nl: "SEO Entities",
    nz: "Paid Scale",
    bd: "Home Operations"
  };

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
    { title: "Search Engine Optimization", desc: "Grow search footprint and capture high-intent buyers.", link: "/services/seo", icon: Icons.Search },
    { title: "PPC & Paid Ads", desc: "Accelerate conversions through targeted search bidding.", link: "/services/ppc", icon: Icons.Target },
    { title: "Web Design & Dev", desc: "Custom visual frontends optimized for speed and UX.", link: "/services/web-design-dev", icon: Icons.Laptop },
    { title: "Content & Strategy", desc: "Build authority and lists that drive stable acquisitions.", link: "/services/content-marketing", icon: Icons.PenTool },
    { title: "AI Automation", desc: "Integrate custom intelligent agents and workflows.", link: "/services/ai-automation", icon: Icons.Cpu },
    { title: "China Sourcing", desc: "End-to-end supply chain sourcing and global logistics.", link: "/services/china-sourcing", icon: Icons.Truck }
  ];

  return (
    <article className="min-h-screen bg-white">
      
      {/* 1. About Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.02)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Biography Text */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-[10px] sm:text-xs font-bold text-sky-500 uppercase tracking-[0.25em] mb-4">
                ABOUT KAMRUJJAMAN MUFTI
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
                Hi, I&apos;m <br className="sm:hidden" />
                Kamrujjaman <br />
                <span className="text-primary italic font-serif">Mufti.</span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl mb-8">
                A results-driven SEO specialist & full-stack web developer dedicated to helping brands bypass standard digital bottlenecks. I build search authority and custom CRM pipelines that scale operations.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
                <Link
                  href="/contact"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.99]"
                >
                  Get in Touch <Icons.ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-8 py-4 font-sans text-xs font-bold text-neutral-700 shadow-sm transition-all"
                >
                  View Portfolio
                </Link>
              </div>

              {/* Badges list */}
              <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-6 w-full max-w-xl">
                {["Google Ads", "SEO", "Full Stack", "WordPress", "Shopify"].map((tag) => (
                  <span key={tag} className="bg-neutral-50 border border-neutral-200/60 text-neutral-500 text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Profile Card (Redesigned matching screenshot) */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Radial light glow backplate */}
              <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_60%)] -z-10 pointer-events-none" />
              
              <div className="relative w-full max-w-[380px] rounded-[2rem] bg-white border border-neutral-200/80 p-8 shadow-[0_15px_35px_rgba(0,0,0,0.03)] flex flex-col items-center text-center">
                {/* Avatar with cyan border ring */}
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 ring-4 ring-sky-100/50">
                  <Image
                    src="/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg"
                    alt="Kamrujjaman Mufti"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Name & Role */}
                <h3 className="font-sans font-bold text-lg text-neutral-900 mb-1">
                  Kamrujjaman Mufti
                </h3>
                <p className="font-sans text-xs text-neutral-400 font-medium mb-6">
                  SEO Expert & Full-Stack Developer
                </p>

                {/* Mini stats cards grid */}
                <div className="grid grid-cols-3 gap-3.5 w-full border-t border-neutral-100 pt-6">
                  <div className="bg-neutral-50 border border-neutral-200/50 rounded-xl p-2.5 flex flex-col items-center justify-center">
                    <span className="font-serif text-base font-bold text-neutral-800">5+</span>
                    <span className="font-sans text-[8px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5 text-center leading-none">Years Exp</span>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-200/50 rounded-xl p-2.5 flex flex-col items-center justify-center">
                    <span className="font-serif text-base font-bold text-neutral-800">150+</span>
                    <span className="font-sans text-[8px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5 text-center leading-none">Projects</span>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-200/50 rounded-xl p-2.5 flex flex-col items-center justify-center">
                    <span className="font-serif text-base font-bold text-neutral-800">120+</span>
                    <span className="font-sans text-[8px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5 text-center leading-none">Clients</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Timeline / Results Section */}
      <section className="py-20 lg:py-28 bg-white border-t border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Timeline Copy */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-bold text-sky-500 uppercase tracking-[0.25em] mb-4">
                MY JOURNEY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 leading-tight tracking-tight mb-6">
                From curiosity to <br />5 years of results.
              </h2>
              <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed mb-6">
                It all started with a simple question: How do websites rank on Google? That curiosity turned into a passion for digital marketing.
              </p>
              <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed mb-6">
                Over the past 5 years, I&apos;ve had the privilege of working with amazing teams and clients, helping them build their online presence, increase visibility, and achieve sustainable growth.
              </p>
              <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
                Every project I take on is treated as a partnership, where your success is my success.
              </p>
            </div>

            {/* Right Timeline Milestones */}
            <div className="lg:col-span-6 flex flex-col justify-center gap-8 pl-0 lg:pl-10">
              {timelineData.map((item, idx) => (
                <div key={idx} className="flex gap-6 relative group">
                  {/* Timeline vertical bar connector */}
                  {idx < timelineData.length - 1 && (
                    <div className="absolute left-2.5 top-6 bottom-[-2.5rem] w-0.5 bg-neutral-200" />
                  )}
                  {/* Timeline indicator circle */}
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white relative z-10 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  {/* Milestone info */}
                  <div>
                    <span className="inline-block bg-blue-50 border border-blue-100 text-primary text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-2">
                      {item.years}
                    </span>
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 inline-block">
            METRICS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight mb-12">
            5 years of work, <br className="sm:hidden" />
            in <span className="text-primary italic font-serif font-medium">4 numbers.</span>
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {statsMetrics.map((stat) => (
              <div 
                key={stat.label} 
                className="bg-white border border-neutral-150/80 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-premium transition-all duration-300 flex flex-col items-center justify-center"
              >
                <span className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="font-sans text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What I do best (Services Grid - Redesigned matching screenshot) */}
      <section className="py-20 lg:py-28 bg-neutral-50/50 border-t border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 inline-block">
            EXPERTISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight mb-12">
            What I do best.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseData.map((item, idx) => (
              <div 
                key={idx}
                className="relative overflow-hidden bg-white border border-neutral-200/60 rounded-3xl p-8 text-left shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-300"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconColor} mb-6`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-sans font-bold text-lg text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed mb-4">
                  {item.desc}
                </p>
                {/* Accent line at the bottom matching screenshot */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${item.barColor}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Values Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 inline-block">
            OUR VALUES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight mb-12">
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
                <p className="font-sans text-xs leading-relaxed opacity-85">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bangladesh / Global Reach */}
      <section className="py-20 lg:py-28 bg-[#FAFBFD] border-t border-b border-neutral-100">
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
                className="bg-white border border-neutral-200/50 rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center"
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
                  {country.flagCode}
                </h4>
                <p className="font-sans text-[9px] font-semibold text-neutral-400 uppercase tracking-wider text-center">
                  {originalSpecialties[country.id] || country.specialtyTag}
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

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto text-left"
          >
            {toolsList.map((tool) => (
              <motion.div 
                key={tool.name} 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  boxShadow: "0 10px 30px -10px rgba(0, 118, 255, 0.08)",
                  borderColor: "rgba(0, 118, 255, 0.15)"
                }}
                className="group bg-neutral-50/70 border border-neutral-100/50 rounded-2xl p-4 px-5 flex items-center gap-4 cursor-default transition-all duration-300"
              >
                <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-neutral-100/50 p-2 relative transition-transform duration-300 group-hover:scale-105">
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. One expert. All services. Real results. (CTA Redesigned matching screenshot) */}
      <section className="py-20 lg:py-28 border-t border-neutral-100 bg-[#FAFBFD]/50">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 inline-block">
            SERVICES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight mb-12">
            One expert. <br />All services. Real results.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bottomCtaServices.map((svc, idx) => (
              <div 
                key={idx}
                className="group bg-white border border-neutral-200/60 rounded-3xl p-7 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary mb-5 transition-colors group-hover:bg-primary group-hover:text-white">
                    <svc.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-900 mb-2">
                    {svc.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-[13px] text-neutral-500 leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>
                <Link 
                  href={svc.link}
                  className="font-sans text-xs font-bold text-primary hover:text-primary-hover inline-flex items-center gap-1.5 mt-auto self-start"
                >
                  Learn More <Icons.ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Dark Footer CTA Section (New section matching screenshot) */}
      <section className="relative overflow-hidden bg-[#0A0D14] py-24 lg:py-32 text-white text-center border-t border-neutral-900">
        {/* Radial light glow backplate */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="container mx-auto max-w-4xl px-6 relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
            KICKSTART YOUR PROJECT
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2] mb-6">
            Let&apos;s build <br />
            something great.
          </h2>

          <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mb-10">
            Get in touch for a free audit, consultation, or custom proposal tailored to your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="flex w-full sm:w-auto items-center justify-center rounded-full bg-white hover:bg-neutral-100 px-8 py-4 font-sans text-xs font-bold text-neutral-900 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/contact"
              className="flex w-full sm:w-auto items-center justify-center rounded-full border border-neutral-700 hover:bg-neutral-800 px-8 py-4 font-sans text-xs font-bold text-white shadow-sm transition-all"
            >
              Contact Agent
            </Link>
          </div>
        </div>
      </section>

    </article>
  );
}
