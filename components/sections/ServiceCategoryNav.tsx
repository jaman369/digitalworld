"use client";

import Link from "next/link";
import { Search, Target, Layout, PenTool, Cpu, Video } from "lucide-react";

interface ServiceCategoryNavProps {
  currentCategorySlug: string;
}

const serviceCategories = [
  { slug: "seo", label: "SEO Services", icon: Search },
  { slug: "ppc", label: "PPC & Paid Ads", icon: Target },
  { slug: "web-design-dev", label: "Web Design & Dev", icon: Layout },
  { slug: "content-marketing", label: "Content Marketing", icon: PenTool },
  { slug: "ai-automation", label: "AI Automation", icon: Cpu },
  { slug: "ai-video-production", label: "AI Video Production", icon: Video },
];

export default function ServiceCategoryNav({ currentCategorySlug }: ServiceCategoryNavProps) {
  return (
    <section className="py-6 bg-white/95 border-y border-neutral-200/80 relative z-20 sticky top-16 backdrop-blur-md shadow-xs">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar py-1">
          {serviceCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.slug === currentCategorySlug;

            return (
              <Link
                key={cat.slug}
                href={`/services/${cat.slug}`}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-xs font-bold transition-all duration-300 shrink-0 border ${
                  isActive
                    ? "bg-[#0076FF] text-white border-[#0076FF] shadow-md shadow-blue-500/20 scale-105"
                    : "bg-neutral-100/90 text-neutral-700 border-neutral-200/90 hover:bg-neutral-200/80 hover:text-neutral-900"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-neutral-500"}`} />
                <span>{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
