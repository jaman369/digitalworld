"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

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
              <span className="flex items-center gap-2 font-sans font-bold text-neutral-900">
                <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-r from-primary to-primary-hover" />
                Digital World
              </span>
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
                
                {/* Services Accordion Trigger */}
                <li>
                  <div className="flex flex-col">
                    <button
                      onClick={() => toggleAccordion("services")}
                      className="flex w-full items-center justify-between text-base font-semibold text-neutral-800 hover:text-primary transition-colors"
                      aria-expanded={activeAccordion === "services"}
                    >
                      Services
                      <Icons.ChevronDown
                        className={`h-4.5 w-4.5 text-neutral-400 transition-transform ${
                          activeAccordion === "services" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

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
                            {servicesData.map((category) => (
                              <li key={category.id}>
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => toggleAccordion(category.id)}
                                    className="flex w-full items-center justify-between py-1 text-sm font-medium text-neutral-600 hover:text-primary"
                                    aria-expanded={activeAccordion === category.id}
                                  >
                                    {category.title}
                                    <Icons.ChevronDown
                                      className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${
                                        activeAccordion === category.id ? "rotate-180" : ""
                                      }`}
                                    />
                                  </button>

                                  {activeAccordion === category.id && (
                                    <ul className="mt-1 flex flex-col gap-1.5 pl-4 pb-2">
                                      {category.subItems.map((sub) => (
                                        <li key={sub.slug}>
                                          <Link
                                            href={`/services/${category.slug}#${sub.slug}`}
                                            className="block py-1 text-xs text-neutral-500 hover:text-primary"
                                            onClick={onClose}
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
