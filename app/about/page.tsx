"use client";

import Link from "next/link";
import Image from "next/image";
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
    { title: "Search Engine Optimization", icon: Icons.Search, desc: "Optimize GBP mappings, crawl budgets, and entity relevance architectures.", color: "bg-blue-50 text-blue-600" },
    { title: "Pay Per Click Campaigns", icon: Icons.Target, desc: "Scale acquisitions predictably across Google Search, Shopping, and Smart Bidding campaigns.", color: "bg-orange-50 text-orange-600" },
    { title: "Social Media Advertising", icon: Icons.Smartphone, desc: "Configure custom Meta Pixels, lookalike loops, and creative hooks.", color: "bg-purple-50 text-purple-600" },
    { title: "Web Development", icon: Icons.Laptop, desc: "Stunning custom-coded Next.js/Vite visual frontends optimized for transaction speeds.", color: "bg-blue-50 text-blue-600" },
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
    { name: "Ahrefs", desc: "SEO Research", icon: "/Emoji/mag.png", hoverBg: "hover:bg-[#E8F2FF]", hoverBorder: "hover:border-blue-200/60" },
    { name: "SEMrush", desc: "Competitor Analysis", icon: "/Emoji/bar_chart.png", hoverBg: "hover:bg-[#EDFBF3]", hoverBorder: "hover:border-green-200/60" },
    { name: "WordPress", desc: "Web Development", icon: "/Emoji/computer.png", hoverBg: "hover:bg-[#E8F2FF]", hoverBorder: "hover:border-blue-200/60" },
    { name: "Shopify", desc: "E-Commerce", icon: "/Emoji/shopping_trolley.png", hoverBg: "hover:bg-[#EDFBF3]", hoverBorder: "hover:border-green-200/60" },
    { name: "Figma", desc: "UI/UX Design", icon: "/Emoji/triangular_ruler.png", hoverBg: "hover:bg-[#F0EBFF]", hoverBorder: "hover:border-purple-200/60" },
    { name: "Meta Ads Manager", desc: "Performance Ads", icon: "/Emoji/dart.png", hoverBg: "hover:bg-[#F0EBFF]", hoverBorder: "hover:border-purple-200/60" },
    { name: "Google Ads", desc: "Search & Display", icon: "/Emoji/red_circle.png", hoverBg: "hover:bg-[#FFF8EB]", hoverBorder: "hover:border-orange-200/60" },
    { name: "Google Tag Manager", desc: "Tracking & Analytics", icon: "/Emoji/label.png", hoverBg: "hover:bg-[#E6FBFD]", hoverBorder: "hover:border-cyan-200/60" },
    { name: "Google Analytics 4", desc: "Performance Tracking", icon: "/Emoji/chart_with_upwards_trend.png", hoverBg: "hover:bg-[#FFF8EB]", hoverBorder: "hover:border-orange-200/60" },
    { name: "n8n", desc: "Automation", icon: "/Emoji/gear.png", hoverBg: "hover:bg-[#FFF8EB]", hoverBorder: "hover:border-orange-200/60" },
    { name: "Adobe Suite", desc: "Graphic Design", icon: "/Emoji/art.png", hoverBg: "hover:bg-[#FFF8EB]", hoverBorder: "hover:border-orange-200/60" },
    { name: "Screaming Frog", desc: "Technical SEO", icon: "/Emoji/frog.png", hoverBg: "hover:bg-[#EDFBF3]", hoverBorder: "hover:border-green-200/60" }
  ];

  const bottomCtaServices = [
    { title: "SEO Agency", desc: "Grow search footprint and capture high-intent buyers.", link: "/services/seo", icon: Icons.Search },
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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.03)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Biography Text */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4">
                INTRODUCING
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
                Hi, I&apos;m <br className="sm:hidden" />
                Kamrujjaman <br />
                <span className="text-primary italic font-serif">Mufti.</span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl mb-8">
                Full-service digital marketing expert with 5 years of hands-on experience helping businesses of all sizes grow through SEO, web development, paid ads, and content marketing.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
                <Link
                  href="/contact"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.99]"
                >
                  Book Call <Icons.ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-8 py-4 font-sans text-xs font-bold text-neutral-700 shadow-sm transition-all"
                >
                  Contact Me
                </Link>
              </div>

              {/* Badges list */}
              <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-6 w-full">
                {["Digital", "SEO", "PPC", "Web", "Sourcing", "AI"].map((tag) => (
                  <span key={tag} className="bg-neutral-50 border border-neutral-200/60 text-neutral-500 text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Image Frame */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-neutral-100">
                <Image
                  src="/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg"
                  alt="Kamrujjaman Mufti"
                  fill
                  className="object-cover"
                  priority
                />
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
              <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4">
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
                  {/* Timeline indicator circle (mockup radio style) */}
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
                className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-premium transition-all duration-300 flex flex-col items-center justify-center"
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

      {/* 4. What I do best (Services Grid) */}
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
                className={`group bg-neutral-50/70 border border-neutral-100/50 rounded-2xl p-4 px-5 flex items-center gap-4 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md active:scale-[0.99] ${tool.hoverBg} ${tool.hoverBorder}`}
              >
                <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-neutral-100/50 p-2 relative overflow-hidden">
                  <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
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
      <section className="py-20 lg:py-28 border-t border-neutral-100 bg-neutral-50/30">
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
