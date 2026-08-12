"use client";

import Link from "next/link";
import { Search, Target, Layout, PenTool, Cpu, PackageCheck } from "lucide-react";

interface ServiceCategoryNavProps {
  currentCategorySlug: string;
}

const serviceCategories = [
  { slug: "seo", label: "SEO Services", icon: Search },
  { slug: "ppc", label: "PPC & Paid Ads", icon: Target },
  { slug: "web-design-dev", label: "Web Design & Dev", icon: Layout },
  { slug: "content-marketing", label: "Content Marketing", icon: PenTool },
  { slug: "ai-automation", label: "AI Automation", icon: Cpu },
  { slug: "china-sourcing", label: "China Sourcing", icon: PackageCheck },
];

export default function ServiceCategoryNav({ currentCategorySlug }: ServiceCategoryNavProps) {
  return (
    <section className="py-6 bg-[#0B0F19] border-y border-neutral-800 relative z-20 sticky top-16 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mr-2 shrink-0 hidden lg:inline-block">
            03 — Categories:
          </span>
          {serviceCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.slug === currentCategorySlug;

            return (
              <Link
                key={cat.slug}
                href={`/services/${cat.slug}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs font-bold transition-all duration-300 shrink-0 border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20 scale-105"
                    : "bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white hover:border-neutral-700"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-neutral-400"}`} />
                <span>{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
