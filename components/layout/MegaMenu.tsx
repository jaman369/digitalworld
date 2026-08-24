"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 top-[80px] z-40 bg-black/10 backdrop-blur-xs" 
            onClick={onClose}
          />
          
          {/* Menu Drawer Container - Fits all laptop monitor resolutions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-50 w-full border-b border-neutral-200/90 bg-white shadow-2xl max-h-[calc(100vh-90px)] overflow-y-auto"
            onMouseLeave={onClose}
          >
            <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 py-6">
              {/* 6-Column Grid Layout for Perfect Laptop Monitor Display */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 xl:gap-5 items-start">
                {servicesData.map((category) => {
                  // Get Lucide Icon dynamically
                  const Icon = (Icons[category.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;

                  return (
                    <div 
                      key={category.id} 
                      className="group flex flex-col gap-2.5 rounded-xl p-3.5 transition-colors bg-neutral-50/60 hover:bg-blue-50/40 border border-neutral-200/60 hover:border-blue-200/80 h-full"
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-200/60">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100/80 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link 
                            href={`/services/${category.slug}`}
                            className="font-sans font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-blue-600 truncate block leading-tight"
                            onClick={onClose}
                          >
                            {category.title}
                          </Link>
                          <span className="text-[10px] text-neutral-400 font-medium block truncate">
                            {category.subItems.length} tracks
                          </span>
                        </div>
                      </div>

                      {/* Sub Items List */}
                      <ul className="flex flex-col gap-1.5 pt-1">
                        {category.subItems.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/services/${category.slug}#${sub.slug}`}
                              className="font-sans text-[11px] sm:text-xs font-medium text-neutral-600 hover:text-blue-600 flex items-center gap-1 transition-colors leading-snug py-0.5 group/item"
                              onClick={onClose}
                            >
                              <Icons.ChevronRight className="h-3 w-3 text-neutral-400 group-hover/item:text-blue-600 shrink-0 transition-transform group-hover/item:translate-x-0.5" />
                              <span className="truncate">{sub.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Bar */}
              <div className="mt-5 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-neutral-500 font-medium">
                  Need a custom agency solution? We build tailored strategies across all 6 core categories.
                </span>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Book Free Strategy Consultation <Icons.ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
