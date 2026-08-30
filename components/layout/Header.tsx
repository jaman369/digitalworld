"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";
import * as Icons from "lucide-react";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileNavOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-100"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3.5 group py-1">
              <div className="relative h-13 w-11 sm:h-15 sm:w-13 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Kj Digital World Logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-neutral-900 text-xl sm:text-2xl leading-none group-hover:text-primary transition-colors tracking-tight">
                  Digital World
                </span>
                <span className="font-sans text-[11px] font-bold text-neutral-400 tracking-widest uppercase mt-0.5">
                  Agency
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Desktop Navigation">
              <Link
                href="/"
                className={`font-sans text-sm font-medium transition-colors ${
                  isActive("/") ? "text-primary" : "text-neutral-500 hover:text-primary"
                }`}
              >
                Home
              </Link>
              
              {/* Services hover dropdown trigger */}
              <div 
                className="relative py-2"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
              >
                <button
                  className={`flex items-center gap-1 font-sans text-sm font-medium transition-colors outline-none ${
                    isActive("/services") ? "text-primary" : "text-neutral-500 hover:text-primary"
                  }`}
                  aria-expanded={isMegaMenuOpen}
                  aria-haspopup="true"
                >
                  Services
                  <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              <Link
                href="/portfolio"
                className={`font-sans text-sm font-medium transition-colors ${
                  isActive("/portfolio") ? "text-primary" : "text-neutral-500 hover:text-primary"
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className={`font-sans text-sm font-medium transition-colors ${
                  isActive("/about") ? "text-primary" : "text-neutral-500 hover:text-primary"
                }`}
              >
                About
              </Link>
              <Link
                href="/blog"
                className={`font-sans text-sm font-medium transition-colors ${
                  isActive("/blog") ? "text-primary" : "text-neutral-500 hover:text-primary"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={`font-sans text-sm font-medium transition-colors ${
                  isActive("/contact") ? "text-primary" : "text-neutral-500 hover:text-primary"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Buttons / Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover px-6 py-2.5 font-sans text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden transition-colors"
                aria-label="Open navigation menu"
              >
                <Icons.Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* MegaMenu Dropdown (Desktop) */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </header>

      {/* Mobile Sidebar Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
}
