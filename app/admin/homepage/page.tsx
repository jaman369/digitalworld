"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { CloudHomepageData } from "@/types";

export default function AdminHomepageCMS() {
  const [activeTab, setActiveTab] = useState<"hero" | "stats" | "painPoints" | "services" | "ecosystem" | "why" | "process" | "metrics" | "industries" | "testimonials" | "tools" | "cta" | "seo">("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<CloudHomepageData>({
    // Hero
    heroTagline: "Available for new projects · Based in Dhaka, Bangladesh",
    heroTitle: "Grow your business beyond borders.",
    heroSubtitle: "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti.",
    heroPrimaryCtaText: "Start a Project",
    heroPrimaryCtaLink: "/contact",
    heroSecondaryCtaText: "Explore Services",
    heroSecondaryCtaLink: "#services",

    // Stats
    statsEyebrow: "PROVEN TRACK RECORD",
    stats: [
      { id: "projects", value: "150", label: "Projects Delivered" },
      { id: "clients", value: "120", label: "Happy Clients Worldwide" },
      { id: "experience", value: "5", label: "Years Hands-on Experience" },
      { id: "countries", value: "11", label: "Countries Served" },
    ],

    // Pain Points
    painPointsEyebrow: "04 — Problem / Pain Points",
    painPointsTitle: "Are these bottlenecks holding your growth back?",
    painPointsSubtitle: "Most digital agencies focus on vanity clicks. We diagnose and eliminate the core friction points in your revenue engine.",

    // Services Header
    servicesEyebrow: "What We Do",
    servicesTitle: "Services built to scale.",
    servicesSubtitle: "A comprehensive suite of growth services designed to expand your visibility, drive qualified leads, and maximize return on investment.",

    // Marketing Ecosystem
    ecosystemEyebrow: "07 — MARKETING ECOSYSTEM",
    ecosystemTitle: "Our Connected Growth Ecosystem",
    ecosystemSubtitle: "We don't build isolated channels. We build an interconnected revenue flywheel where every stage feeds the next.",

    // Why Choose Us
    whyUsEyebrow: "Why Us",
    whyUsTitle: "Why choose Digital World",
    whyUsSubtitle: "We partner with brands to build robust organic funnels that consistently generate revenue, not just vanity clicks.",
    whyUsCards: [
      { title: "Data-driven strategies", description: "No assumptions. We build our growth campaigns based on hard competitor analytics and real user intent metrics.", iconName: "BarChart3" },
      { title: "5+ years of experience", description: "Having navigated through search engine algorithm core updates, we know what drives sustainable ranking gains.", iconName: "Trophy" },
      { title: "High ROI campaigns", description: "Every dollar you invest is optimized to target buyers at the bottom of the funnel, minimizing waste.", iconName: "TrendingUp" },
      { title: "Custom solutions", description: "We don't do pre-packaged cookie-cutter services. Every site is analyzed to get a bespoke roadmap.", iconName: "Settings" },
      { title: "24/7 dedicated support", description: "Clear, direct communication channels. We act as an extension of your team, responding within hours.", iconName: "MessageSquare" },
      { title: "Transparent reporting", description: "Understand exactly what you are paying for with simplified keyword progression and traffic conversion dashboards.", iconName: "FileText" },
    ],

    // Process
    processEyebrow: "Process",
    processTitle: "Our simple 4-step onboarding process",
    processSubtitle: "We structure your customer acquisition funnel from initial audit to scaled delivery with absolute clarity.",
    processSteps: [
      { stepNumber: 1, title: "Discovery & Audit", description: "30-minute alignment call + deep technical audit of your domain." },
      { stepNumber: 2, title: "Custom Blueprint", description: "Tailored execution roadmap matching target keywords and acquisition budgets." },
      { stepNumber: 3, title: "Execution & Optimization", description: "On-page overhaul, technical tuning, and weekly conversion tracking." },
      { stepNumber: 4, title: "Scale & Growth", description: "Iterative split testing, backlink acceleration, and recurring performance reports." },
    ],

    // Metrics
    metricsEyebrow: "10 — Results / Metrics",
    metricsTitle: "Measurable Impact by the Numbers",

    // Industries
    industriesEyebrow: "Industries",
    industriesTitle: "Sectors we serve",
    industriesSubtitle: "We deliver tailored keyword targeting strategies and customized backend logic across multiple industry verticals.",

    // Testimonials Header
    testimonialsEyebrow: "Reviews",
    testimonialsTitle: "Client Success Stories",
    testimonialsSubtitle: "See how we help businesses globally increase organic traffic footprint, lower acquisition cost metrics, and scale stores.",

    // Tools
    toolsEyebrow: "14 — Technology / Tools",
    toolsTitle: "Powered by Enterprise Marketing Tech",
    toolsSubtitle: "We leverage industry-leading software and custom AI automation to execute high-precision growth campaigns.",

    // Final CTA
    ctaEyebrow: "Get Started",
    ctaTitle: "Let's build something great together.",
    ctaSubtitle: "Get in touch for a free 30-minute strategy call to audit your current search presence, examine paid bidding efficiencies, and identify growth bottlenecks.",
    ctaButtonText: "Book Your Strategy Call",
    ctaButtonLink: "/contact",

    // SEO
    seoTitle: "Digital World - Full Service Digital Marketing Agency",
    seoDescription: "Full-service digital marketing agency specializing in SEO, PPC, Web Design, Content Marketing, and AI Automation.",
    canonicalUrl: "https://digitalworld-beige.vercel.app/",
    ogImage: "https://digitalworld-beige.vercel.app/Kamrujjaman%20Mufti%20Image/kamrujjaman-mufti.jpg",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/homepage");
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setFormData((prev) => ({ ...prev, ...data }));
          }
        }
      } catch (err) {
        console.error("Failed to load homepage CMS:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback("");
    setError("");

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFeedback("Homepage CMS updated & live on website!");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save homepage content.");
      }
    } catch {
      setError("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Card helpers for Why Us
  const addWhyUsCard = () => {
    const current = formData.whyUsCards || [];
    setFormData({
      ...formData,
      whyUsCards: [...current, { title: "New Feature", description: "Feature description...", iconName: "Sparkles" }],
    });
  };

  const updateWhyUsCard = (index: number, field: string, value: string) => {
    const current = [...(formData.whyUsCards || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, whyUsCards: current });
  };

  const removeWhyUsCard = (index: number) => {
    const current = [...(formData.whyUsCards || [])];
    current.splice(index, 1);
    setFormData({ ...formData, whyUsCards: current });
  };

  // Step helpers for Process
  const updateProcessStep = (index: number, field: string, value: string | number) => {
    const current = [...(formData.processSteps || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, processSteps: current });
  };

  // Stat helpers
  const updateStat = (index: number, field: string, value: string) => {
    const current = [...(formData.stats || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, stats: current });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const navTabs = [
    { id: "hero", label: "Hero Banner", icon: Icons.Sparkles },
    { id: "stats", label: "Stats Bar", icon: Icons.BarChart3 },
    { id: "painPoints", label: "Pain Points", icon: Icons.AlertCircle },
    { id: "services", label: "Services Header", icon: Icons.Layers },
    { id: "ecosystem", label: "Marketing Ecosystem", icon: Icons.Activity },
    { id: "process", label: "Process / Steps", icon: Icons.ListOrdered },
    { id: "metrics", label: "Results / Metrics", icon: Icons.TrendingUp },
    { id: "industries", label: "Industries", icon: Icons.Building2 },
    { id: "why", label: "Why Choose Us", icon: Icons.CheckCircle2 },
    { id: "testimonials", label: "Testimonials Header", icon: Icons.MessageSquare },
    { id: "tools", label: "Tech & Tools", icon: Icons.Cpu },
    { id: "cta", label: "Final CTA", icon: Icons.Megaphone },
    { id: "seo", label: "Homepage SEO", icon: Icons.Globe },
  ] as const;

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
          Homepage Full CMS
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Control all text, section titles, feature cards, process steps, CTA buttons, and SEO meta tags for the homepage.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="bg-white border border-neutral-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
        {feedback && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs font-bold text-emerald-600">
            <Icons.CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-4 text-xs font-bold text-red-600">
            <Icons.AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. HERO TAB */}
        {activeTab === "hero" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Hero Banner Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Top Eyebrow Badge Text</label>
              <input
                type="text"
                value={formData.heroTagline || ""}
                onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Main Headline Title</label>
              <input
                type="text"
                value={formData.heroTitle || ""}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-bold outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.heroSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary Button Text</label>
                <input
                  type="text"
                  value={formData.heroPrimaryCtaText || ""}
                  onChange={(e) => setFormData({ ...formData, heroPrimaryCtaText: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary Button Link</label>
                <input
                  type="text"
                  value={formData.heroPrimaryCtaLink || ""}
                  onChange={(e) => setFormData({ ...formData, heroPrimaryCtaLink: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-mono outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Secondary Button Text</label>
                <input
                  type="text"
                  value={formData.heroSecondaryCtaText || ""}
                  onChange={(e) => setFormData({ ...formData, heroSecondaryCtaText: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Secondary Button Link</label>
                <input
                  type="text"
                  value={formData.heroSecondaryCtaLink || ""}
                  onChange={(e) => setFormData({ ...formData, heroSecondaryCtaLink: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-mono outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. STATS TAB */}
        {activeTab === "stats" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Stats Bar Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Eyebrow Title</label>
              <input
                type="text"
                value={formData.statsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, statsEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {(formData.stats || []).map((stat, idx) => (
                <div key={idx} className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50 flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Stat #{idx + 1}</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Value (e.g. 150)"
                      value={stat.value}
                      onChange={(e) => updateStat(idx, "value", e.target.value)}
                      className="w-1/3 rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Projects Delivered)"
                      value={stat.label}
                      onChange={(e) => updateStat(idx, "label", e.target.value)}
                      className="w-2/3 rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAIN POINTS TAB */}
        {activeTab === "painPoints" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Pain Points / Bottlenecks Section Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.painPointsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, painPointsEyebrow: e.target.value })}
                placeholder="04 — Problem / Pain Points"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.painPointsTitle || ""}
                onChange={(e) => setFormData({ ...formData, painPointsTitle: e.target.value })}
                placeholder="Are these bottlenecks holding your growth back?"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary font-bold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.painPointsSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, painPointsSubtitle: e.target.value })}
                placeholder="Most digital agencies focus on vanity clicks..."
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        )}

        {/* 3. SERVICES HEADER TAB */}
        {activeTab === "services" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Services Grid Header Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.servicesEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, servicesEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.servicesTitle || ""}
                onChange={(e) => setFormData({ ...formData, servicesTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-800 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.servicesSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, servicesSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        )}

        {/* ECOSYSTEM TAB */}
        {activeTab === "ecosystem" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Marketing Ecosystem Section Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.ecosystemEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, ecosystemEyebrow: e.target.value })}
                placeholder="07 — MARKETING ECOSYSTEM"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.ecosystemTitle || ""}
                onChange={(e) => setFormData({ ...formData, ecosystemTitle: e.target.value })}
                placeholder="Our Connected Growth Ecosystem"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary font-bold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.ecosystemSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, ecosystemSubtitle: e.target.value })}
                placeholder="We don't build isolated channels..."
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        )}

        {/* 4. WHY CHOOSE US TAB */}
        {activeTab === "why" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Why Choose Us Section Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
                <input
                  type="text"
                  value={formData.whyUsEyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, whyUsEyebrow: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  value={formData.whyUsTitle || ""}
                  onChange={(e) => setFormData({ ...formData, whyUsTitle: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-800 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle</label>
              <input
                type="text"
                value={formData.whyUsSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, whyUsSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
              />
            </div>

            {/* Feature Cards CRUD */}
            <div className="flex items-center justify-between border-t border-neutral-100 pt-6">
              <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Feature Cards ({formData.whyUsCards?.length || 0})</h3>
              <button
                type="button"
                onClick={addWhyUsCard}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover cursor-pointer"
              >
                <Icons.Plus className="h-4 w-4" /> Add Card
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(formData.whyUsCards || []).map((card, idx) => (
                <div key={idx} className="p-4 border border-neutral-200 rounded-xl bg-white flex flex-col gap-3 relative group">
                  <button
                    type="button"
                    onClick={() => removeWhyUsCard(idx)}
                    className="absolute top-3 right-3 text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    <Icons.Trash2 className="h-4 w-4" />
                  </button>

                  <div className="flex flex-col gap-1 pr-6">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase">Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => updateWhyUsCard(idx, "title", e.target.value)}
                      className="rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase">Description</label>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => updateWhyUsCard(idx, "description", e.target.value)}
                      className="rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PROCESS TAB */}
        {activeTab === "process" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Process / How We Work Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
                <input
                  type="text"
                  value={formData.processEyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, processEyebrow: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  value={formData.processTitle || ""}
                  onChange={(e) => setFormData({ ...formData, processTitle: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-800 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle</label>
              <input
                type="text"
                value={formData.processSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, processSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
              />
            </div>

            <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider border-t border-neutral-100 pt-6">4 Process Steps</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(formData.processSteps || []).map((step, idx) => (
                <div key={idx} className="p-4 border border-neutral-200 rounded-xl bg-white flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                      0{step.stepNumber}
                    </span>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateProcessStep(idx, "title", e.target.value)}
                      className="flex-1 rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs font-bold"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={step.description}
                    onChange={(e) => updateProcessStep(idx, "description", e.target.value)}
                    className="rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* METRICS TAB */}
        {activeTab === "metrics" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Results & Metrics Section Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.metricsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, metricsEyebrow: e.target.value })}
                placeholder="10 — Results / Metrics"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.metricsTitle || ""}
                onChange={(e) => setFormData({ ...formData, metricsTitle: e.target.value })}
                placeholder="Measurable Impact by the Numbers"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary font-bold"
              />
            </div>
          </div>
        )}

        {/* INDUSTRIES TAB */}
        {activeTab === "industries" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Industries / Sectors Section Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.industriesEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, industriesEyebrow: e.target.value })}
                placeholder="Industries"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.industriesTitle || ""}
                onChange={(e) => setFormData({ ...formData, industriesTitle: e.target.value })}
                placeholder="Sectors we serve"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary font-bold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.industriesSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, industriesSubtitle: e.target.value })}
                placeholder="We deliver tailored keyword targeting strategies..."
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        )}

        {/* TOOLS TAB */}
        {activeTab === "tools" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Technology & Tools Section Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.toolsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, toolsEyebrow: e.target.value })}
                placeholder="14 — Technology / Tools"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.toolsTitle || ""}
                onChange={(e) => setFormData({ ...formData, toolsTitle: e.target.value })}
                placeholder="Powered by Enterprise Marketing Tech"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary font-bold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.toolsSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, toolsSubtitle: e.target.value })}
                placeholder="We leverage industry-leading software..."
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        )}

        {/* 6. TESTIMONIALS HEADER TAB */}
        {activeTab === "testimonials" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Testimonials Section Header
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.testimonialsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, testimonialsEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.testimonialsTitle || ""}
                onChange={(e) => setFormData({ ...formData, testimonialsTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-800 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.testimonialsSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, testimonialsSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* 7. FINAL CTA TAB */}
        {activeTab === "cta" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Final CTA Banner Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.ctaEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, ctaEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Headline Title</label>
              <input
                type="text"
                value={formData.ctaTitle || ""}
                onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-800 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Description</label>
              <textarea
                rows={3}
                value={formData.ctaSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, ctaSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Button Text</label>
                <input
                  type="text"
                  value={formData.ctaButtonText || ""}
                  onChange={(e) => setFormData({ ...formData, ctaButtonText: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Button Link</label>
                <input
                  type="text"
                  value={formData.ctaButtonLink || ""}
                  onChange={(e) => setFormData({ ...formData, ctaButtonLink: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-mono outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 8. SEO TAB */}
        {activeTab === "seo" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3">
              Homepage SEO & Meta Settings
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Meta Title</label>
              <input
                type="text"
                value={formData.seoTitle || ""}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none font-bold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Meta Description</label>
              <textarea
                rows={3}
                value={formData.seoDescription || ""}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Canonical URL</label>
                <input
                  type="text"
                  value={formData.canonicalUrl || ""}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-mono outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">OG Image URL</label>
                <input
                  type="text"
                  value={formData.ogImage || ""}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-mono outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="border-t border-neutral-100 pt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover disabled:bg-neutral-300 px-8 py-3 font-sans text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
          >
            {saving ? (
              <>
                <Icons.Loader2 className="h-4 w-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              "Save Homepage CMS"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
