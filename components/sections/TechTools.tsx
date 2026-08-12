"use client";

import { motion } from "framer-motion";
import { Search, Database, Cpu, BarChart3, Globe, Shield } from "lucide-react";

const tools = [
  {
    id: "01",
    name: "Google Analytics 4 & BigQuery",
    category: "Data & Attribution",
    description: "Server-side tracking & multi-touch revenue attribution modeling.",
    icon: BarChart3,
  },
  {
    id: "02",
    name: "Ahrefs & Semrush Enterprise",
    category: "SEO & Intent Intelligence",
    description: "Deep keyword gap analysis, backlink audits, and SERP rank tracking.",
    icon: Search,
  },
  {
    id: "03",
    name: "HubSpot & Salesforce CRM",
    category: "Pipeline Automation",
    description: "Automated lead distribution, deal stage tracking, and lifecycle marketing.",
    icon: Database,
  },
  {
    id: "04",
    name: "OpenAI & Custom AI Agents",
    category: "Generative Workflows",
    description: "AI-assisted content optimization, automated lead qualification chatbots.",
    icon: Cpu,
  },
  {
    id: "05",
    name: "Meta & Google Ads Engine",
    category: "Paid Acquisition",
    description: "Performance Max bidding, retargeting funnels, and dynamic ad creatives.",
    icon: Globe,
  },
  {
    id: "06",
    name: "Prisma & PostgreSQL Infrastructure",
    category: "Custom Web Applications",
    description: "Enterprise-grade database models and high-performance API endpoints.",
    icon: Shield,
  },
];

export default function TechTools() {
  return (
    <section className="py-20 lg:py-28 bg-[#fafbfe] relative z-10 border-b border-neutral-100 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-100 px-4 py-1.5 text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-6">
            14 — Technology / Tools
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            Powered by Enterprise Marketing Tech
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            We leverage industry-leading software and custom AI automation to execute high-precision growth campaigns.
          </p>
        </div>

        {/* 6 Tool Stack Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-neutral-200/80 p-8 shadow-xs hover:shadow-lg hover:border-cyan-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">
                      {tool.category}
                    </span>
                    <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-sans text-lg font-bold text-neutral-900 mb-2">
                    {tool.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
