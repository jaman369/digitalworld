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
            className="fixed inset-0 top-[80px] z-40 bg-black/5 backdrop-blur-[2px]" 
            onClick={onClose}
          />
          
          {/* Menu Drawer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-50 w-full border-b border-neutral-200 bg-white shadow-premium"
            onMouseLeave={onClose}
          >
            <div className="container mx-auto max-w-7xl px-6 py-8">
              <div className="grid grid-cols-3 gap-8">
                {servicesData.map((category) => {
                  // Get Lucide Icon dynamically
                  const Icon = (Icons[category.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;

                  return (
                    <div key={category.id} className="group flex flex-col gap-3 rounded-xl p-4 transition-colors hover:bg-neutral-50">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <Link 
                            href={`/services/${category.slug}`}
                            className="font-sans font-semibold text-neutral-900 group-hover:text-primary"
                            onClick={onClose}
                          >
                            {category.title}
                          </Link>
                          <p className="font-sans text-xs text-neutral-400 mt-0.5 leading-snug">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Sub Items */}
                      <ul className="flex flex-col gap-2 pl-[52px]">
                        {category.subItems.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/services/${category.slug}#${sub.slug}`}
                              className="font-sans text-sm text-neutral-500 hover:text-primary flex items-center gap-1.5 transition-colors"
                              onClick={onClose}
                            >
                              <Icons.ChevronRight className="h-3.5 w-3.5 text-neutral-300 group-hover:text-primary/50" />
                              {sub.name}
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
