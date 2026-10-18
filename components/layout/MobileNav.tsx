"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Default open "services" so service categories are immediately visible
  const [activeAccordion, setActiveAccordion] = useState<string | null>("services");
  const [categories, setCategories] = useState(servicesData);

  useEffect(() => {
    let isMounted = true;
    async function loadServices() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            setCategories(data);
          }
        }
      } catch (err) {
        console.warn("Failed to load dynamic services for MobileNav", err);
      }
    }
    loadServices();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-premium outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <Link href="/" className="flex items-center gap-3 font-sans font-bold text-neutral-900" onClick={onClose}>
                <div className="relative h-10 w-9 shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Kj Digital World Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <span className="font-serif font-bold text-neutral-900 text-xl">Digital World</span>
              </Link>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 transition-colors"
                aria-label="Close menu"
              >
                <Icons.X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 overflow-y-auto py-6" aria-label="Mobile Main Nav">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-base font-semibold text-neutral-800 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    Home
                  </Link>
                </li>
                
                {/* Services Accordion */}
                <li>
                  <div className="flex flex-col">
                    <div className="flex w-full items-center justify-between">
                      <button
                        onClick={() => toggleAccordion("services")}
                        className="flex w-full items-center justify-between py-1 text-base font-semibold text-neutral-800 hover:text-primary transition-colors"
                        aria-expanded={activeAccordion === "services"}
                      >
                        <span className="text-primary">Services</span>
                        <Icons.ChevronDown
                          className={`h-4.5 w-4.5 text-neutral-400 transition-transform duration-200 ${
                            activeAccordion === "services" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {activeAccordion === "services" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-3 flex flex-col gap-2 pl-4 border-l-2 border-neutral-100">
                            {categories.map((category) => (
                              <li key={category.id}>
                                <div className="flex flex-col">
                                  {/* Direct clickable category link + Chevron toggle button */}
                                  <div className="flex w-full items-center justify-between py-1.5 group">
                                    <Link
                                      href={`/services/${category.slug}`}
                                      className="flex-1 text-sm font-semibold text-neutral-700 hover:text-primary transition-colors"
                                      onClick={onClose}
                                    >
                                      {category.title}
                                    </Link>
                                    
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleAccordion(category.id);
                                      }}
                                      className="p-1 text-neutral-400 hover:text-primary transition-colors"
                                      aria-label={`Toggle sub-services for ${category.title}`}
                                      aria-expanded={activeAccordion === category.id}
                                    >
                                      <Icons.ChevronDown
                                        className={`h-4 w-4 transition-transform duration-200 ${
                                          activeAccordion === category.id ? "rotate-180" : ""
                                        }`}
                                      />
                                    </button>
                                  </div>

                                  {/* Sub-items list */}
                                  {activeAccordion === category.id && (
                                    <ul className="mt-1 flex flex-col gap-1.5 pl-4 pb-2 border-l border-neutral-100">
                                      {category.subItems.map((sub) => (
                                        <li key={sub.slug}>
                                          <Link
                                            href={`/services/${category.slug}#${sub.slug}`}
                                            className="block py-1 text-xs font-medium text-neutral-500 hover:text-primary transition-colors"
                                            onClick={() => {
                                              onClose();
                                              if (typeof window !== "undefined" && window.location.pathname === `/services/${category.slug}`) {
                                                const el = document.getElementById(sub.slug);
                                                if (el) {
                                                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                                                }
                                              }
                                            }}
                                          >
                                            {sub.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>

                <li>
                  <Link
                    href="/portfolio"
                    className="flex items-center gap-2 text-base font-semibold text-neutral-800 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 text-base font-semibold text-neutral-800 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 text-base font-semibold text-neutral-800 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 text-base font-semibold text-neutral-800 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Bottom CTA */}
            <div className="border-t border-neutral-100 pt-4">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-hover hover:scale-[1.01] active:scale-[0.99] transition-all"
                onClick={onClose}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
