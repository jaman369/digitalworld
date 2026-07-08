"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const serviceMenu = [
  {
    title: "🔍 SEO",
    links: [
      { label: "Local SEO", href: "/services/seo#svc-local" },
      { label: "Ecommerce SEO", href: "/services/seo#svc-ecom" },
      { label: "International SEO", href: "/services/seo#svc-intl" },
      { label: "Youtube / Video SEO", href: "/services/seo#svc-yt" },
      { label: "SaaS SEO", href: "/services/seo#svc-saas" },
      { label: "Semantic SEO", href: "/services/seo#svc-semantic" },
      { label: "AI SEO", href: "/services/seo#svc-ai" },
    ],
  },
  {
    title: "🎯 PPC / Paid Ads",
    links: [
      { label: "Google Search Ads", href: "/services/ppc#svc-search" },
      { label: "Google Shopping Ads", href: "/services/ppc#svc-shopping" },
      { label: "Performance Max", href: "/services/ppc#svc-pmax" },
      { label: "YouTube Ads", href: "/services/ppc#svc-youtube" },
      { label: "Remarketing", href: "/services/ppc#svc-remarketing" },
      { label: "Facebook Ads", href: "/services/ppc#svc-facebook" },
      { label: "Instagram Ads", href: "/services/ppc#svc-instagram" },
      { label: "TikTok / LinkedIn Ads", href: "/services/ppc#svc-tiktok" },
    ],
  },
  {
    title: "🌐 Web Design & Dev",
    links: [
      { label: "Website Design (UI/UX)", href: "/services/web#svc-uiux" },
      { label: "WordPress Development", href: "/services/web#svc-wordpress" },
      { label: "Shopify Development", href: "/services/web#svc-shopify" },
      { label: "Landing Page Design", href: "/services/web#svc-landing" },
      { label: "Website Speed Optimization", href: "/services/web#svc-speed" },
      { label: "Website Maintenance", href: "/services/web#svc-maintenance" },
      { label: "Website Migration", href: "/services/web#svc-migration" },
      { label: "CMS Setup", href: "/services/web#svc-cms" },
    ],
  },
  {
    title: "✍️ Content & More",
    links: [
      { label: "Blog Writing & Management", href: "/services/content#svc-blog" },
      { label: "Email Marketing", href: "/services/content#svc-email" },
      { label: "Content Marketing", href: "/services/content#svc-content" },
      { label: "CRO Audit & Testing", href: "/services/content#svc-cro" },
      { label: "Backlink Building", href: "/services/content#svc-backlink" },
      { label: "Digital PR & HARO", href: "/services/content#svc-pr" },
      { label: "Social Media Content", href: "/services/content#svc-social" },
      { label: "Press Releases & PR", href: "/services/content#svc-press" },
    ],
  },
];

const mobileMenu = [
  { title: "SEO", links: serviceMenu[0].links, defaultOpen: true },
  { title: "PPC / Paid Ads", links: serviceMenu[1].links },
  { title: "Web Design & Dev", links: serviceMenu[2].links },
  { title: "Content & More", links: serviceMenu[3].links },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? "hidden" : "";
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  const toggleSection = (idx: number) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] h-[52px] border-b border-white/[0.06] transition-colors duration-300 ${
        scrolled ? "bg-[rgba(29,29,31,0.92)]" : "bg-[rgba(29,29,31,0.78)]"
      }`}
      style={{
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
      }}
    >
      <div className="max-w-[1160px] mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <div
            className="w-2 h-2 rounded-full bg-[var(--color-blue)]"
            style={{ animation: "dotPulse 2.5s ease-in-out infinite" }}
          />
          <span className="font-[var(--font-display)] text-[17px] text-white tracking-[-0.3px]">
            Digital World
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-[2px]">
          <Link
            href="/"
            className="text-white/70 text-xs font-normal px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors duration-200 tracking-[0.01em]"
          >
            Home
          </Link>

          {/* Services with Mega Menu */}
          <div className="group relative">
            <button className="text-white/70 text-xs font-normal px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors duration-200 tracking-[0.01em] flex items-center gap-1">
              Services
              <span className="inline-block w-1 h-1 border-r border-b border-current rotate-45 transition-transform duration-200 group-hover:-rotate-[135deg]" />
            </button>

            {/* Mega Dropdown */}
            <div className="fixed top-[52px] left-0 right-0 bg-[rgba(18,18,20,0.97)] border-b border-white/[0.08] py-8 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-[220ms] -translate-y-2 group-hover:translate-y-0 z-[999]"
              style={{ backdropFilter: "blur(30px)" }}
            >
              <div className="max-w-[1160px] mx-auto px-6 grid grid-cols-4 gap-8">
                {serviceMenu.map((col, i) => (
                  <div key={i}>
                    <h4 className="text-[10px] font-semibold text-white/30 tracking-[0.1em] uppercase mb-3 pb-2 border-b border-white/[0.07]">
                      {col.title}
                    </h4>
                    {col.links.map((link, j) => (
                      <Link
                        key={j}
                        href={link.href}
                        className="block text-xs text-white/55 py-[5px] hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/portfolio"
            className="text-white/70 text-xs font-normal px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors duration-200 tracking-[0.01em]"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className="text-white/70 text-xs font-normal px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors duration-200 tracking-[0.01em]"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-white/70 text-xs font-normal px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors duration-200 tracking-[0.01em]"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-white/70 text-xs font-normal px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors duration-200 tracking-[0.01em]"
          >
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/contact" className="hidden lg:block">
          <button className="bg-[var(--color-blue)] text-white text-xs font-medium px-4 py-[7px] rounded-full hover:bg-[var(--color-blue-hover)] hover:scale-[1.03] transition-all duration-200 cursor-pointer">
            Get Started
          </button>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMobile}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-[1001] relative"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-[52px] left-0 right-0 bottom-0 bg-[rgba(18,18,20,0.98)] overflow-y-auto transition-all duration-300 px-6 py-4 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        style={{ backdropFilter: "blur(30px)" }}
      >
        <Link
          href="/"
          onClick={closeMobile}
          className="block text-white/80 text-[15px] py-4 border-b border-white/[0.06]"
        >
          Home
        </Link>

        {mobileMenu.map((section, idx) => (
          <div key={idx}>
            <button
              onClick={() => toggleSection(idx)}
              className="w-full flex items-center gap-2.5 py-4 border-b border-white/[0.06] text-[14px] font-semibold text-white/90"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-blue)] shadow-[0_0_8px_rgba(0,113,227,0.5)] shrink-0" />
              {section.title}
              <span
                className={`ml-auto text-[var(--color-blue)] text-lg font-light transition-transform duration-300 ${
                  openSection === idx ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-400 ${
                openSection === idx ? "max-h-[800px]" : "max-h-0"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
            >
              {section.links.map((link, j) => (
                <Link
                  key={j}
                  href={link.href}
                  onClick={closeMobile}
                  className="block py-[11px] pl-[22px] text-[15px] text-white/60 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <Link
          href="/portfolio"
          onClick={closeMobile}
          className="block text-white/80 text-[15px] py-4 mt-3.5 border-b border-white/[0.06]"
        >
          Portfolio
        </Link>
        <Link
          href="/about"
          onClick={closeMobile}
          className="block text-white/80 text-[15px] py-4 border-b border-white/[0.06]"
        >
          About
        </Link>
        <Link
          href="/blog"
          onClick={closeMobile}
          className="block text-white/80 text-[15px] py-4 border-b border-white/[0.06]"
        >
          Blog
        </Link>
        <Link
          href="/contact"
          onClick={closeMobile}
          className="block text-white/80 text-[15px] py-4 border-b border-white/[0.06]"
        >
          Contact
        </Link>
        <Link
          href="/contact"
          onClick={closeMobile}
          className="block text-center bg-[var(--color-blue)] text-white text-[15px] font-medium py-3 mt-6 rounded-full"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
