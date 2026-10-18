"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
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
        console.warn("Failed to load dynamic services for MegaMenu", err);
      }
    }
    loadServices();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 top-[80px] z-40 bg-black/10 backdrop-blur-xs" 
            onClick={onClose}
          />
          
          {/* Menu Drawer Container - Automatically adjusts to any monitor or laptop screen height */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-50 w-full border-b border-neutral-200 bg-white shadow-2xl max-h-[calc(100vh-85px)] overflow-y-auto scrollbar-thin"
            onMouseLeave={onClose}
          >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-5 sm:py-6">
              {/* Original First Menu Design (3 Columns with Category Icon, Title, Description & Vertical Sub-Items List) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
                {categories.map((category) => {
                  // Get Lucide Icon dynamically
                  const Icon = (Icons[category.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;

                  return (
                    <div 
                      key={category.id} 
                      className="group flex flex-col gap-2.5 rounded-2xl p-4 transition-colors hover:bg-neutral-50 border border-neutral-100"
                    >
                      {/* Category Header (Icon, Title & Description Copy) */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white mt-0.5">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <Link 
                            href={`/services/${category.slug}`}
                            className="font-sans font-bold text-sm text-neutral-900 group-hover:text-blue-600 transition-colors block leading-snug"
                            onClick={onClose}
                          >
                            {category.title}
                          </Link>
                          <p className="font-sans text-xs text-neutral-400 mt-0.5 leading-snug">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Single Vertical Sub-Items List (First Menu Design) */}
                      <ul className="flex flex-col gap-1.5 pl-12 pt-0.5">
                        {category.subItems.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/services/${category.slug}#${sub.slug}`}
                              className="font-sans text-xs font-medium text-neutral-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors py-0.5 group/item"
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
                              <Icons.ChevronRight className="h-3 w-3 text-neutral-300 group-hover/item:text-blue-600 shrink-0 transition-transform group-hover/item:translate-x-0.5" />
                              <span className="truncate">{sub.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
