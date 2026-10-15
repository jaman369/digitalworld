"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { CloudHomepageData } from "@/types";

export default function AdminHomepageCMS() {
  const [activeTab, setActiveTab] = useState<
    | "hero"
    | "stats"
    | "painPoints"
    | "services"
    | "ecosystem"
    | "why"
    | "process"
    | "metrics"
    | "industries"
    | "testimonials"
    | "tools"
    | "cta"
    | "seo"
  >("hero");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const ogInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CloudHomepageData>({
    // Hero
    heroTagline: "Available for new projects · Based in Dhaka, Bangladesh",
    heroTitle: "Grow your business beyond borders.",
    heroSubtitle:
      "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti.",
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
    painPointsSubtitle:
      "Most digital agencies focus on vanity clicks. We diagnose and eliminate the core friction points in your revenue engine.",
    painPointsCards: [
      { id: "01", title: "Stagnant Organic Traffic", description: "Stuck on page 2 or 3 for key terms while competitors capture high-intent buyers daily.", tag: "SEO Bottleneck", iconName: "TrendingDown" },
      { id: "02", title: "Escalating Ad Costs (CAC)", description: "Paid ad campaigns burning budget with diminishing ROI and rising cost per acquisition.", tag: "Ad Inefficiency", iconName: "DollarSign" },
      { id: "03", title: "Low Website Conversions", description: "Getting website visits but failing to convert visitors into qualified leads or paying customers.", tag: "UX Bottleneck", iconName: "UserX" },
      { id: "04", title: "Manual Lead Handling", description: "Slower follow-up times letting warm leads go cold before your sales team reaches out.", tag: "Workflow Friction", iconName: "AlertCircle" },
      { id: "05", title: "Fragmented Tech Stack", description: "Using 10 different tools that don't sync, creating data silos and wasted subscription costs.", tag: "Tool Chaos", iconName: "Cpu" },
      { id: "06", title: "Unclear ROI Reporting", description: "Vague agency reports showing vanity metrics instead of actual pipeline revenue generated.", tag: "Lack of Clarity", iconName: "BarChart2" },
    ],

    // Services Header
    servicesEyebrow: "What We Do",
    servicesTitle: "Services built to scale.",
    servicesSubtitle:
      "A comprehensive suite of growth services designed to expand your visibility, drive qualified leads, and maximize return on investment.",
    servicesCards: [
      { id: "svc-cat-1", slug: "seo", title: "Search Engine Optimization (SEO)", description: "Rank #1 on Google for high-intent search terms driving sustainable organic revenue.", iconName: "Search", popularTag: "Most Popular", subItems: ["Local SEO", "Ecommerce SEO", "International SEO", "SaaS SEO", "Semantic SEO", "Ai SEO", "Link Building", "Technical SEO"] },
      { id: "svc-cat-2", slug: "ppc", title: "PPC & Paid Search Advertising", description: "Data-driven ad campaigns targeting bottom-of-funnel buyers with maximum ROI.", iconName: "TrendingUp", popularTag: "High ROI", subItems: ["Google Search & Shopping Ads", "Meta (Facebook & IG) Ads", "LinkedIn B2B Advertising", "TikTok & Video Ads", "Retargeting & Remarketing", "Conversion Rate Optimization (CRO)"] },
      { id: "svc-cat-3", slug: "web-design-dev", title: "Web Design & Custom Development", description: "High-converting, ultra-fast websites built for speed, SEO, and lead capture.", iconName: "Code2", popularTag: "Turnkey", subItems: ["WordPress Development", "Shopify & Ecommerce Stores", "Custom Web Application Dev", "Landing Page CRO", "Website Speed Optimization", "UI/UX Redesign"] },
      { id: "svc-cat-4", slug: "content-marketing", title: "Content Marketing & Authority Strategy", description: "Engaging, SEO-optimized content that positions your brand as an industry leader.", iconName: "FileText", popularTag: "Authority", subItems: ["SEO Blog & Article Writing", "Thought Leadership Content", "Copywriting & Sales Pages", "Infographics & Visual Content", "Content Audit & Strategy", "Ebooks & Whitepapers"] },
      { id: "svc-cat-5", slug: "ai-automation", title: "AI & Workflow Automation", description: "Custom AI agents and automated workflows to streamline operations and lead follow-up.", iconName: "Cpu", popularTag: "AI Powered", subItems: ["AI Lead Qualification Agents", "CRM & Sales Pipeline Automation", "Chatbot & Voice Agent Setup", "Marketing Automation", "Custom AI Integrations", "Data & Analytics Automation"] },
      { id: "svc-cat-6", slug: "ai-video-production", title: "AI Video Production & Visual Media", description: "Studio-quality explainer videos, product ads, UGC content, and AI avatars produced in hours.", iconName: "Video", popularTag: "High ROI", subItems: ["AI Explainer & Promo Videos", "AI Product Ads", "AI UGC-Style Videos", "AI Avatar & Spokesperson Videos", "AI Short-Form Content", "AI Voiceover & Dubbing"] },
    ],

    // Marketing Ecosystem
    ecosystemEyebrow: "07 — MARKETING ECOSYSTEM",
    ecosystemTitle: "Our Connected Growth Ecosystem",
    ecosystemSubtitle:
      "We don't build isolated channels. We build an interconnected revenue flywheel where every stage feeds the next.",

    // Why Choose Us
    whyUsEyebrow: "Why Us",
    whyUsTitle: "Why choose Digital World",
    whyUsSubtitle:
      "We partner with brands to build robust organic funnels that consistently generate revenue, not just vanity clicks.",
    whyUsCards: [
      {
        title: "Data-driven strategies",
        description:
          "No assumptions. We build our growth campaigns based on hard competitor analytics and real user intent metrics.",
        iconName: "BarChart3",
      },
      {
        title: "5+ years of experience",
        description:
          "Having navigated through search engine algorithm core updates, we know what drives sustainable ranking gains.",
        iconName: "Trophy",
      },
      {
        title: "High ROI campaigns",
        description:
          "Every dollar you invest is optimized to target buyers at the bottom of the funnel, minimizing waste.",
        iconName: "TrendingUp",
      },
      {
        title: "Custom solutions",
        description:
          "We don't do pre-packaged cookie-cutter services. Every site is analyzed to get a bespoke roadmap.",
        iconName: "Settings",
      },
      {
        title: "24/7 dedicated support",
        description:
          "Clear, direct communication channels. We act as an extension of your team, responding within hours.",
        iconName: "MessageSquare",
      },
      {
        title: "Transparent reporting",
        description:
          "Understand exactly what you are paying for with simplified keyword progression and traffic conversion dashboards.",
        iconName: "FileText",
      },
    ],

    // Process
    processEyebrow: "Process",
    processTitle: "Our simple 4-step onboarding process",
    processSubtitle:
      "We structure your customer acquisition funnel from initial audit to scaled delivery with absolute clarity.",
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
    industriesSubtitle:
      "We deliver tailored keyword targeting strategies and customized backend logic across multiple industry verticals.",

    // Testimonials Header
    testimonialsEyebrow: "Reviews",
    testimonialsTitle: "Client Success Stories",
    testimonialsSubtitle:
      "See how we help businesses globally increase organic traffic footprint, lower acquisition cost metrics, and scale stores.",

    // Tools
    toolsEyebrow: "14 — Technology / Tools",
    toolsTitle: "Powered by Enterprise Marketing Tech",
    toolsSubtitle:
      "We leverage industry-leading software and custom AI automation to execute high-precision growth campaigns.",

    // Final CTA
    ctaEyebrow: "Get Started",
    ctaTitle: "Let's build something great together.",
    ctaSubtitle:
      "Get in touch for a free 30-minute strategy call to audit your current search presence, examine paid bidding efficiencies, and identify growth bottlenecks.",
    ctaButtonText: "Book Your Strategy Call",
    ctaButtonLink: "/contact",

    // SEO
    seoTitle: "Digital World - Full Service Digital Marketing Agency",
    seoDescription:
      "Full-service digital marketing agency specializing in SEO, PPC, Web Design, Content Marketing, and AI Automation.",
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

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
        setFeedback("Homepage CMS successfully updated & live on website!");
        setTimeout(() => setFeedback(""), 4000);
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

  // Upload OG Image
  const handleOgImageUpload = async (file: File) => {
    setUploadingOg(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setFormData((prev) => ({ ...prev, ogImage: data.url }));
    } catch (err) {
      alert("Failed to upload image.");
      console.error(err);
    } finally {
      setUploadingOg(false);
    }
  };

  // Stats Helpers
  const addStat = () => {
    const current = formData.stats || [];
    setFormData({
      ...formData,
      stats: [...current, { id: `stat-${Date.now()}`, value: "100+", label: "New Stat Metric" }],
    });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const current = [...(formData.stats || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, stats: current });
  };

  const removeStat = (index: number) => {
    const current = [...(formData.stats || [])];
    current.splice(index, 1);
    setFormData({ ...formData, stats: current });
  };

  // Process Step Helpers
  const addProcessStep = () => {
    const current = formData.processSteps || [];
    setFormData({
      ...formData,
      processSteps: [
        ...current,
        { stepNumber: current.length + 1, title: "New Step", description: "Step description details..." },
      ],
    });
  };

  const updateProcessStep = (index: number, field: string, value: string | number) => {
    const current = [...(formData.processSteps || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, processSteps: current });
  };

  const removeProcessStep = (index: number) => {
    const current = [...(formData.processSteps || [])];
    current.splice(index, 1);
    // Re-index step numbers
    const reindexed = current.map((item, idx) => ({ ...item, stepNumber: idx + 1 }));
    setFormData({ ...formData, processSteps: reindexed });
  };

  // Why Us Card Helpers
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

  // Pain Points Card Helpers
  const addPainPointCard = () => {
    const current = formData.painPointsCards || [];
    const nextNum = current.length + 1;
    const formattedId = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
    setFormData({
      ...formData,
      painPointsCards: [
        ...current,
        { id: formattedId, title: "New Bottleneck", description: "Describe the friction point...", tag: "Growth Bottleneck", iconName: "AlertCircle" },
      ],
    });
  };

  const updatePainPointCard = (index: number, field: string, value: string) => {
    const current = [...(formData.painPointsCards || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, painPointsCards: current });
  };

  const removePainPointCard = (index: number) => {
    const current = [...(formData.painPointsCards || [])];
    current.splice(index, 1);
    setFormData({ ...formData, painPointsCards: current });
  };

  // Service Category Card Helpers
  const addServiceCard = () => {
    const current = formData.servicesCards || [];
    setFormData({
      ...formData,
      servicesCards: [
        ...current,
        { id: `svc-cat-${Date.now()}`, slug: "seo", title: "New Service Category", description: "Describe this service offering...", iconName: "Layers", popularTag: "New", subItems: ["Sub Service Item 1", "Sub Service Item 2"] },
      ],
    });
  };

  const updateServiceCard = (index: number, field: string, value: unknown) => {
    const current = [...(formData.servicesCards || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, servicesCards: current });
  };

  const removeServiceCard = (index: number) => {
    const current = [...(formData.servicesCards || [])];
    current.splice(index, 1);
    setFormData({ ...formData, servicesCards: current });
  };

  const updateServiceCardSubItem = (cardIndex: number, subIndex: number, value: string) => {
    const current = [...(formData.servicesCards || [])];
    const subItems = [...(current[cardIndex].subItems || [])];
    subItems[subIndex] = value;
    current[cardIndex] = { ...current[cardIndex], subItems };
    setFormData({ ...formData, servicesCards: current });
  };

  const addServiceCardSubItem = (cardIndex: number) => {
    const current = [...(formData.servicesCards || [])];
    const subItems = [...(current[cardIndex].subItems || []), "New Sub-Service Item"];
    current[cardIndex] = { ...current[cardIndex], subItems };
    setFormData({ ...formData, servicesCards: current });
  };

  const removeServiceCardSubItem = (cardIndex: number, subIndex: number) => {
    const current = [...(formData.servicesCards || [])];
    const subItems = [...(current[cardIndex].subItems || [])];
    subItems.splice(subIndex, 1);
    current[cardIndex] = { ...current[cardIndex], subItems };
    setFormData({ ...formData, servicesCards: current });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  const navTabs = [
    { id: "hero", label: "Hero Banner", icon: Icons.Sparkles },
    { id: "stats", label: "Stats Bar", icon: Icons.BarChart3 },
    { id: "painPoints", label: "Pain Points", icon: Icons.AlertCircle },
    { id: "services", label: "Services Header", icon: Icons.Layers },
    { id: "ecosystem", label: "Ecosystem", icon: Icons.Activity },
    { id: "process", label: "Process / Steps", icon: Icons.ListOrdered },
    { id: "metrics", label: "Results / Metrics", icon: Icons.TrendingUp },
    { id: "industries", label: "Industries", icon: Icons.Building2 },
    { id: "why", label: "Why Choose Us", icon: Icons.CheckCircle2 },
    { id: "testimonials", label: "Testimonials", icon: Icons.MessageSquare },
    { id: "tools", label: "Tech & Tools", icon: Icons.Cpu },
    { id: "cta", label: "Final CTA", icon: Icons.Megaphone },
    { id: "seo", label: "Homepage SEO", icon: Icons.Globe },
  ] as const;

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Top Header with Sticky Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-1.5">
            Homepage Content Management
          </h1>
          <p className="font-sans text-xs text-neutral-500">
            Edit text headlines, subtitles, stat counters, feature cards, process steps, and SEO meta tags across all 13 sections.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
          >
            <Icons.ExternalLink className="h-3.5 w-3.5 text-blue-600" />
            View Live Website ↗
          </Link>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
          >
            {saving ? (
              <><Icons.Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
            ) : (
              <><Icons.Save className="h-4 w-4" /> Save Changes</>
            )}
          </button>
        </div>
      </div>

      {feedback && (
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-700 shadow-2xs">
          <div className="flex items-center gap-2">
            <Icons.CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{feedback}</span>
          </div>
          <Link href="/" target="_blank" className="underline text-emerald-800 hover:text-emerald-950">
            Preview Homepage ↗
          </Link>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-red-600">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 bg-neutral-100/70 p-1.5 rounded-2xl border border-neutral-200/80">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-blue-600 shadow-2xs border border-neutral-200/60"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-white/50"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-600" : "text-neutral-400"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main CMS Form Card */}
      <form onSubmit={handleSave} className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">

        {/* 1. HERO TAB */}
        {activeTab === "hero" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.Sparkles className="h-5 w-5 text-blue-600" /> Hero Banner Settings
              </h2>
              <span className="text-xs text-neutral-400">Section 01 of Homepage</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Top Eyebrow Badge Text</label>
              <input
                type="text"
                value={formData.heroTagline || ""}
                onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Main Headline Title</label>
              <input
                type="text"
                value={formData.heroTitle || ""}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-3 px-4 text-base font-serif font-bold text-neutral-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={4}
                value={formData.heroSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-3 px-4 text-sm text-neutral-700 leading-relaxed outline-none focus:border-blue-500 resize-none font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary Button Text</label>
                <input
                  type="text"
                  value={formData.heroPrimaryCtaText || ""}
                  onChange={(e) => setFormData({ ...formData, heroPrimaryCtaText: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary Button Link</label>
                <input
                  type="text"
                  value={formData.heroPrimaryCtaLink || ""}
                  onChange={(e) => setFormData({ ...formData, heroPrimaryCtaLink: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-mono text-xs outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Secondary Button Text</label>
                <input
                  type="text"
                  value={formData.heroSecondaryCtaText || ""}
                  onChange={(e) => setFormData({ ...formData, heroSecondaryCtaText: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Secondary Button Link</label>
                <input
                  type="text"
                  value={formData.heroSecondaryCtaLink || ""}
                  onChange={(e) => setFormData({ ...formData, heroSecondaryCtaLink: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-mono text-xs outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. STATS TAB */}
        {activeTab === "stats" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.BarChart3 className="h-5 w-5 text-indigo-600" /> Stats Bar Metrics
              </h2>
              <button
                type="button"
                onClick={addStat}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <Icons.Plus className="h-4 w-4" /> Add Stat Metric
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Eyebrow Title</label>
              <input
                type="text"
                value={formData.statsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, statsEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {(formData.stats || []).map((stat, idx) => (
                <div key={idx} className="p-4 border border-neutral-200/80 rounded-xl bg-neutral-50/50 flex flex-col gap-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Stat Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeStat(idx)}
                      className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                      title="Remove Stat"
                    >
                      <Icons.Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Value (e.g. 150+)"
                      value={stat.value}
                      onChange={(e) => updateStat(idx, "value", e.target.value)}
                      className="w-1/3 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-blue-600 outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Projects Delivered)"
                      value={stat.label}
                      onChange={(e) => updateStat(idx, "label", e.target.value)}
                      className="w-2/3 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs text-neutral-700 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. PAIN POINTS TAB */}
        {activeTab === "painPoints" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.AlertCircle className="h-5 w-5 text-red-500" /> Pain Points & Bottlenecks Section
              </h2>
              <button
                type="button"
                onClick={addPainPointCard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <Icons.Plus className="h-4 w-4" /> Add Pain Point Card
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.painPointsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, painPointsEyebrow: e.target.value })}
                placeholder="04 — Problem / Pain Points"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.painPointsTitle || ""}
                onChange={(e) => setFormData({ ...formData, painPointsTitle: e.target.value })}
                placeholder="Are these bottlenecks holding your growth back?"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.painPointsSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, painPointsSubtitle: e.target.value })}
                placeholder="Most digital agencies focus on vanity clicks..."
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-700 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Pain Points Cards List */}
            <div className="flex flex-col gap-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Individual Pain Point Cards ({(formData.painPointsCards || []).length})
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {(formData.painPointsCards || []).map((card, idx) => (
                  <div
                    key={idx}
                    className="p-5 border border-neutral-200 rounded-2xl bg-neutral-50/60 flex flex-col gap-4 relative group hover:border-rose-300 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-100 text-rose-700 text-xs font-mono font-bold">
                          {card.id || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`)}
                        </span>
                        <span className="text-xs font-bold text-neutral-800">
                          Pain Point Item #{idx + 1}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePainPointCard(idx)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-rose-50"
                        title="Remove Card"
                      >
                        <Icons.Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      {/* Card ID / Number */}
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-neutral-400 uppercase">Number</label>
                        <input
                          type="text"
                          value={card.id || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`)}
                          onChange={(e) => updatePainPointCard(idx, "id", e.target.value)}
                          placeholder="01"
                          className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-mono font-bold text-neutral-800 outline-none focus:border-rose-500"
                        />
                      </div>

                      {/* Card Title */}
                      <div className="sm:col-span-5 flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-neutral-400 uppercase">Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => updatePainPointCard(idx, "title", e.target.value)}
                          placeholder="Card Title (e.g. Stagnant Traffic)"
                          className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-neutral-900 outline-none focus:border-rose-500"
                        />
                      </div>

                      {/* Card Tag */}
                      <div className="sm:col-span-3 flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-neutral-400 uppercase">Badge / Tag</label>
                        <input
                          type="text"
                          value={card.tag || ""}
                          onChange={(e) => updatePainPointCard(idx, "tag", e.target.value)}
                          placeholder="Tag (e.g. SEO Bottleneck)"
                          className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-semibold text-rose-600 outline-none focus:border-rose-500"
                        />
                      </div>

                      {/* Card Icon */}
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-neutral-400 uppercase">Icon</label>
                        <select
                          value={card.iconName || "AlertCircle"}
                          onChange={(e) => updatePainPointCard(idx, "iconName", e.target.value)}
                          className="rounded-lg border border-neutral-200 bg-white py-2 px-2 text-xs font-medium text-neutral-700 outline-none focus:border-rose-500 cursor-pointer"
                        >
                          <option value="TrendingDown">TrendingDown</option>
                          <option value="DollarSign">DollarSign</option>
                          <option value="UserX">UserX</option>
                          <option value="AlertCircle">AlertCircle</option>
                          <option value="Cpu">Cpu</option>
                          <option value="BarChart2">BarChart2</option>
                          <option value="Zap">Zap</option>
                          <option value="Target">Target</option>
                          <option value="ShieldAlert">ShieldAlert</option>
                          <option value="PieChart">PieChart</option>
                          <option value="Activity">Activity</option>
                          <option value="Sparkles">Sparkles</option>
                          <option value="Clock">Clock</option>
                          <option value="Search">Search</option>
                          <option value="Lock">Lock</option>
                          <option value="Scale">Scale</option>
                        </select>
                      </div>
                    </div>

                    {/* Card Description */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-neutral-400 uppercase">Description</label>
                      <textarea
                        rows={2}
                        value={card.description}
                        onChange={(e) => updatePainPointCard(idx, "description", e.target.value)}
                        placeholder="Description of this bottleneck..."
                        className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs text-neutral-700 leading-relaxed outline-none focus:border-rose-500 resize-none font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. SERVICES HEADER & CARDS TAB */}
        {activeTab === "services" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.Layers className="h-5 w-5 text-emerald-600" /> Services Grid & Category Cards
              </h2>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/services"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
                >
                  <Icons.SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" /> Manage 50+ Detailed Sub-Services ↗
                </Link>
                <button
                  type="button"
                  onClick={addServiceCard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Icons.Plus className="h-4 w-4" /> Add Service Category Card
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.servicesEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, servicesEyebrow: e.target.value })}
                placeholder="What We Do"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.servicesTitle || ""}
                onChange={(e) => setFormData({ ...formData, servicesTitle: e.target.value })}
                placeholder="Services built to scale."
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.servicesSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, servicesSubtitle: e.target.value })}
                placeholder="A comprehensive suite of growth services designed to expand your visibility..."
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-700 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Service Category Cards List */}
            <div className="flex flex-col gap-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Service Category Cards ({(formData.servicesCards || []).length})
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {(formData.servicesCards || []).map((card, cardIdx) => (
                  <div
                    key={cardIdx}
                    className="p-5 border border-neutral-200 rounded-2xl bg-neutral-50/60 flex flex-col gap-4 relative group hover:border-emerald-300 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 text-xs font-mono font-bold">
                          {cardIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-neutral-800">
                          {card.title || `Service Category #${cardIdx + 1}`}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeServiceCard(cardIdx)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                        title="Remove Category Card"
                      >
                        <Icons.Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      {/* Category Title */}
                      <div className="sm:col-span-5 flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-neutral-400 uppercase">Category Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => updateServiceCard(cardIdx, "title", e.target.value)}
                          placeholder="Category Name (e.g. SEO Services)"
                          className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-neutral-900 outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* Route Slug */}
                      <div className="sm:col-span-3 flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-neutral-400 uppercase">Route Slug</label>
                        <select
                          value={card.slug || "seo"}
                          onChange={(e) => updateServiceCard(cardIdx, "slug", e.target.value)}
                          className="rounded-lg border border-neutral-200 bg-white py-2 px-2 text-xs font-mono text-neutral-800 outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          <option value="seo">seo</option>
                          <option value="ppc">ppc</option>
                          <option value="web-design-dev">web-design-dev</option>
                          <option value="content-marketing">content-marketing</option>
                          <option value="ai-automation">ai-automation</option>
                          <option value="ai-video-production">ai-video-production</option>
                        </select>
                      </div>

                      {/* Icon */}
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-neutral-400 uppercase">Icon</label>
                        <select
                          value={card.iconName || "Search"}
                          onChange={(e) => updateServiceCard(cardIdx, "iconName", e.target.value)}
                          className="rounded-lg border border-neutral-200 bg-white py-2 px-2 text-xs font-medium text-neutral-700 outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          <option value="Search">Search</option>
                          <option value="TrendingUp">TrendingUp</option>
                          <option value="Code2">Code2</option>
                          <option value="FileText">FileText</option>
                          <option value="Cpu">Cpu</option>
                          <option value="Globe">Globe</option>
                          <option value="Layers">Layers</option>
                          <option value="Zap">Zap</option>
                          <option value="BarChart3">BarChart3</option>
                          <option value="Sparkles">Sparkles</option>
                          <option value="Settings">Settings</option>
                        </select>
                      </div>

                      {/* Badge / Tag */}
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-neutral-400 uppercase">Tag Badge</label>
                        <input
                          type="text"
                          value={card.popularTag || ""}
                          onChange={(e) => updateServiceCard(cardIdx, "popularTag", e.target.value)}
                          placeholder="Popular"
                          className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-semibold text-emerald-600 outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Category Description */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-neutral-400 uppercase">Description</label>
                      <textarea
                        rows={2}
                        value={card.description}
                        onChange={(e) => updateServiceCard(cardIdx, "description", e.target.value)}
                        placeholder="Description of this service category..."
                        className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs text-neutral-700 leading-relaxed outline-none focus:border-emerald-500 resize-none font-sans"
                      />
                    </div>

                    {/* Sub-Items / Bullet Features List */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-neutral-200/60">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                          Sub-Service Bullet Items ({(card.subItems || []).length})
                        </label>
                        <button
                          type="button"
                          onClick={() => addServiceCardSubItem(cardIdx)}
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Icons.Plus className="h-3 w-3" /> Add Bullet Item
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(card.subItems || []).map((subItem, subIdx) => (
                          <div key={subIdx} className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={subItem}
                              onChange={(e) => updateServiceCardSubItem(cardIdx, subIdx, e.target.value)}
                              placeholder={`Bullet ${subIdx + 1}`}
                              className="flex-1 rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs text-neutral-800 outline-none focus:border-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={() => removeServiceCardSubItem(cardIdx, subIdx)}
                              className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                              title="Remove item"
                            >
                              <Icons.X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. ECOSYSTEM TAB */}
        {activeTab === "ecosystem" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.Activity className="h-5 w-5 text-purple-600" /> Connected Marketing Ecosystem
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.ecosystemEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, ecosystemEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.ecosystemTitle || ""}
                onChange={(e) => setFormData({ ...formData, ecosystemTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.ecosystemSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, ecosystemSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-700 outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* 6. PROCESS TAB */}
        {activeTab === "process" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.ListOrdered className="h-5 w-5 text-blue-600" /> Onboarding Process Steps
              </h2>
              <button
                type="button"
                onClick={addProcessStep}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <Icons.Plus className="h-4 w-4" /> Add Step
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
                <input
                  type="text"
                  value={formData.processEyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, processEyebrow: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  value={formData.processTitle || ""}
                  onChange={(e) => setFormData({ ...formData, processTitle: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <input
                type="text"
                value={formData.processSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, processSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {(formData.processSteps || []).map((step, idx) => (
                <div key={idx} className="p-4 border border-neutral-200/80 rounded-xl bg-white flex flex-col gap-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="h-6 w-6 rounded-full bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center border border-blue-200">
                      0{step.stepNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeProcessStep(idx)}
                      className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Icons.Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateProcessStep(idx, "title", e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-neutral-800 outline-none focus:border-blue-500"
                  />
                  <textarea
                    rows={2}
                    value={step.description}
                    onChange={(e) => updateProcessStep(idx, "description", e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs text-neutral-600 outline-none focus:border-blue-500 resize-none font-sans"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. METRICS TAB */}
        {activeTab === "metrics" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.TrendingUp className="h-5 w-5 text-emerald-600" /> Results & Impact Metrics Header
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.metricsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, metricsEyebrow: e.target.value })}
                placeholder="10 — Results / Metrics"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.metricsTitle || ""}
                onChange={(e) => setFormData({ ...formData, metricsTitle: e.target.value })}
                placeholder="Measurable Impact by the Numbers"
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* 8. INDUSTRIES TAB */}
        {activeTab === "industries" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.Building2 className="h-5 w-5 text-amber-600" /> Industry Verticals Header
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.industriesEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, industriesEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.industriesTitle || ""}
                onChange={(e) => setFormData({ ...formData, industriesTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.industriesSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, industriesSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-700 outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* 9. WHY CHOOSE US TAB */}
        {activeTab === "why" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.CheckCircle2 className="h-5 w-5 text-blue-600" /> Why Choose Us Feature Cards
              </h2>
              <button
                type="button"
                onClick={addWhyUsCard}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <Icons.Plus className="h-4 w-4" /> Add Feature Card
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
                <input
                  type="text"
                  value={formData.whyUsEyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, whyUsEyebrow: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  value={formData.whyUsTitle || ""}
                  onChange={(e) => setFormData({ ...formData, whyUsTitle: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle</label>
              <input
                type="text"
                value={formData.whyUsSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, whyUsSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {(formData.whyUsCards || []).map((card, idx) => (
                <div key={idx} className="p-4 border border-neutral-200/80 rounded-xl bg-white flex flex-col gap-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Card #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeWhyUsCard(idx)}
                      className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Icons.Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateWhyUsCard(idx, "title", e.target.value)}
                    placeholder="Card Title"
                    className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-neutral-800 outline-none focus:border-blue-500"
                  />
                  <textarea
                    rows={2}
                    value={card.description}
                    onChange={(e) => updateWhyUsCard(idx, "description", e.target.value)}
                    placeholder="Card Description..."
                    className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs text-neutral-600 outline-none focus:border-blue-500 resize-none font-sans"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. TESTIMONIALS TAB */}
        {activeTab === "testimonials" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.MessageSquare className="h-5 w-5 text-indigo-600" /> Testimonials Header
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.testimonialsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, testimonialsEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.testimonialsTitle || ""}
                onChange={(e) => setFormData({ ...formData, testimonialsTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.testimonialsSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, testimonialsSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-700 outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* 11. TOOLS TAB */}
        {activeTab === "tools" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.Cpu className="h-5 w-5 text-blue-600" /> Technology & Tools Stack
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.toolsEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, toolsEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
              <input
                type="text"
                value={formData.toolsTitle || ""}
                onChange={(e) => setFormData({ ...formData, toolsTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={formData.toolsSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, toolsSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-700 outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* 12. FINAL CTA TAB */}
        {activeTab === "cta" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.Megaphone className="h-5 w-5 text-amber-500" /> Final CTA Banner
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
              <input
                type="text"
                value={formData.ctaEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, ctaEyebrow: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Headline Title</label>
              <input
                type="text"
                value={formData.ctaTitle || ""}
                onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle Description</label>
              <textarea
                rows={3}
                value={formData.ctaSubtitle || ""}
                onChange={(e) => setFormData({ ...formData, ctaSubtitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-700 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Button Text</label>
                <input
                  type="text"
                  value={formData.ctaButtonText || ""}
                  onChange={(e) => setFormData({ ...formData, ctaButtonText: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Button Link</label>
                <input
                  type="text"
                  value={formData.ctaButtonLink || ""}
                  onChange={(e) => setFormData({ ...formData, ctaButtonLink: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-mono text-xs outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 13. SEO TAB */}
        {activeTab === "seo" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
                <Icons.Globe className="h-5 w-5 text-blue-600" /> Homepage SEO & Social Graph Meta
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">SEO Meta Title</label>
              <input
                type="text"
                value={formData.seoTitle || ""}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-bold outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">SEO Meta Description</label>
              <textarea
                rows={3}
                value={formData.seoDescription || ""}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-700 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Canonical URL</label>
                <input
                  type="text"
                  value={formData.canonicalUrl || ""}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 font-mono text-xs outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Social OG Image</label>
                <input
                  ref={ogInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleOgImageUpload(file);
                  }}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.ogImage || ""}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    className="flex-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs font-mono text-neutral-800 outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => ogInputRef.current?.click()}
                    disabled={uploadingOg}
                    className="px-3.5 py-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    {uploadingOg ? "Uploading..." : "Upload File"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Footer */}
        <div className="border-t border-neutral-100 pt-6 flex items-center justify-between">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-bold text-neutral-500 hover:text-blue-600 transition-colors"
          >
            ← View Front-end Homepage
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 px-8 py-3 font-sans text-xs font-bold text-white shadow-sm transition-all cursor-pointer border-0"
          >
            {saving ? (
              <>
                <Icons.Loader2 className="h-4 w-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Icons.Save className="h-4 w-4" /> Save Homepage CMS
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
