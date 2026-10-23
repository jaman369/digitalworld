"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface ToolItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const toolsList: ToolItem[] = [
  { name: "Google Ads", category: "Paid Search & PPC", icon: Icons.Target, color: "text-[#4285F4]", bgColor: "bg-blue-50/80 border-blue-100" },
  { name: "Google Analytics 4", category: "Traffic & Event Analytics", icon: Icons.BarChart3, color: "text-[#F9AB00]", bgColor: "bg-amber-50/80 border-amber-100" },
  { name: "Google Search Console", category: "Indexing & Organic Health", icon: Icons.Search, color: "text-[#34A853]", bgColor: "bg-emerald-50/80 border-emerald-100" },
  { name: "Meta Ads Manager", category: "Social Advertising", icon: Icons.Share2, color: "text-[#0081FB]", bgColor: "bg-sky-50/80 border-sky-100" },
  { name: "Ahrefs", category: "Backlinks & Keywords", icon: Icons.Compass, color: "text-[#FF4A00]", bgColor: "bg-orange-50/80 border-orange-100" },
  { name: "Semrush", category: "Competitor Intelligence", icon: Icons.TrendingUp, color: "text-[#FF642D]", bgColor: "bg-rose-50/80 border-rose-100" },
  { name: "WordPress", category: "Content Management", icon: Icons.Globe, color: "text-[#21759B]", bgColor: "bg-cyan-50/80 border-cyan-100" },
  { name: "Shopify", category: "E-Commerce Core", icon: Icons.ShoppingBag, color: "text-[#96BF48]", bgColor: "bg-lime-50/80 border-lime-100" },
  { name: "Next.js", category: "Modern Web Frontend", icon: Icons.Code, color: "text-neutral-900", bgColor: "bg-neutral-100 border-neutral-200" },
  { name: "n8n", category: "Self-Hosted Automation", icon: Icons.Workflow, color: "text-[#EA4B71]", bgColor: "bg-pink-50/80 border-pink-100" },
  { name: "Make", category: "Visual Workflow Pipelines", icon: Icons.Layers, color: "text-[#6D3FF6]", bgColor: "bg-purple-50/80 border-purple-100" },
  { name: "Zapier", category: "App Integrations & APIs", icon: Icons.Zap, color: "text-[#FF4A00]", bgColor: "bg-amber-50/80 border-amber-100" },
];

export default function ToolsPlatforms() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-white relative z-10 border-b border-neutral-100 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-6">
            Stack & Infrastructure
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-5">
            The Tools Behind Our Results
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed">
            We use industry-standard platforms to plan, track and report on every campaign.
          </p>
        </div>

        {/* 12 Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {toolsList.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                className="group flex flex-col p-5 sm:p-6 rounded-2xl border border-neutral-200/80 bg-white hover:bg-neutral-50/60 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${tool.bgColor} ${tool.color} shadow-xs group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                    PRO
                  </span>
                </div>
                <h3 className="font-sans font-bold text-base text-neutral-900 mb-1 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <span className="font-sans text-xs text-neutral-500 font-medium">
                  {tool.category}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
