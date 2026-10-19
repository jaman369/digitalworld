"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { CloudAboutData } from "@/types";
import { defaultAboutData } from "@/data/aboutDefaultData";

const SECTIONS = [
  { id: 1, title: "Hero & Founder", icon: Icons.User, badge: "Step 1" },
  { id: 2, title: "Key Metrics", icon: Icons.BarChart3, badge: "Step 2" },
  { id: 3, title: "Journey & Milestones", icon: Icons.Clock, badge: "Step 3" },
  { id: 4, title: "Why Work With Us", icon: Icons.ShieldCheck, badge: "Step 4" },
  { id: 5, title: "Our Expertise", icon: Icons.Sparkles, badge: "Step 5" },
  { id: 6, title: "How We Work", icon: Icons.Layers, badge: "Step 6" },
  { id: 7, title: "Philosophy & Values", icon: Icons.Compass, badge: "Step 7" },
  { id: 8, title: "Tools & Stack", icon: Icons.Wrench, badge: "Step 8" },
  { id: 9, title: "CTA / Let's Connect", icon: Icons.Send, badge: "Step 9" },
];

export default function AdminAboutCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [showAllSteps, setShowAllSteps] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CloudAboutData>(defaultAboutData);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/about");
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            ...data,
            hero: { ...prev.hero, ...(data.hero || {}) },
            journey: { ...prev.journey, ...(data.journey || {}) },
            whyUs: { ...prev.whyUs, ...(data.whyUs || {}) },
            expertise: { ...prev.expertise, ...(data.expertise || {}) },
            process: { ...prev.process, ...(data.process || {}) },
            values: { ...prev.values, ...(data.values || {}) },
            tools: { ...prev.tools, ...(data.tools || {}) },
            cta: { ...prev.cta, ...(data.cta || {}) },
          }));
        }
      } catch (err) {
        console.error("Failed to load about CMS:", err);
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
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFeedback("About page saved successfully & updated live across the website!");
        setTimeout(() => setFeedback(""), 5000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save about content.");
      }
    } catch {
      setError("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        imagePath: data.url,
        hero: { ...(prev.hero || {}), imagePath: data.url },
      }));
    } catch (err) {
      alert("Failed to upload image.");
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Timeline Helpers
  const addTimelineMilestone = () => {
    const current = formData.journey?.timeline || formData.timeline || [];
    const updated = [...current, { years: "2026 – Present", role: "New Milestone", company: "Company / Achievements" }];
    setFormData({
      ...formData,
      timeline: updated,
      journey: { ...(formData.journey || {}), timeline: updated },
    });
  };

  const updateTimelineMilestone = (index: number, field: string, value: string) => {
    const current = [...(formData.journey?.timeline || formData.timeline || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({
      ...formData,
      timeline: current,
      journey: { ...(formData.journey || {}), timeline: current },
    });
  };

  const removeTimelineMilestone = (index: number) => {
    const current = [...(formData.journey?.timeline || formData.timeline || [])];
    current.splice(index, 1);
    setFormData({
      ...formData,
      timeline: current,
      journey: { ...(formData.journey || {}), timeline: current },
    });
  };

  // Metrics Helpers
  const updateMetric = (index: number, field: string, value: string | number) => {
    const current = [...(formData.metricsList || formData.metrics || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({
      ...formData,
      metrics: current,
      metricsList: current,
    });
  };

  // Tools Helpers
  const addTool = () => {
    const current = formData.tools?.tools || [];
    const updated = [...current, { name: "New Tool", desc: "Category / Function", icon: "/Emoji/computer.png" }];
    setFormData({
      ...formData,
      tools: { ...(formData.tools || {}), tools: updated },
    });
  };

  const updateTool = (index: number, field: string, value: string) => {
    const current = [...(formData.tools?.tools || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({
      ...formData,
      tools: { ...(formData.tools || {}), tools: current },
    });
  };

  const removeTool = (index: number) => {
    const current = [...(formData.tools?.tools || [])];
    current.splice(index, 1);
    setFormData({
      ...formData,
      tools: { ...(formData.tools || {}), tools: current },
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Icons.Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        <p className="text-xs text-neutral-500 font-medium">Loading About Page CMS...</p>
      </div>
    );
  }

  const hero = formData.hero || defaultAboutData.hero;
  const journey = formData.journey || defaultAboutData.journey;
  const whyUs = formData.whyUs || defaultAboutData.whyUs;
  const expertise = formData.expertise || defaultAboutData.expertise;
  const process = formData.process || defaultAboutData.process;
  const values = formData.values || defaultAboutData.values;
  const tools = formData.tools || defaultAboutData.tools;
  const cta = formData.cta || defaultAboutData.cta;
  const metricsList = formData.metricsList || formData.metrics || defaultAboutData.metricsList || [];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-neutral-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Step-by-Step CMS
            </span>
            <span className="text-xs text-neutral-400">9 Active Sections</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-1.5">
            About Page CMS
          </h1>
          <p className="font-sans text-xs text-neutral-500">
            Edit all 9 sections of the About page step-by-step. Everything syncs live to the website & Supabase.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
          >
            <Icons.ExternalLink className="h-3.5 w-3.5 text-blue-600" />
            View Live Page ↗
          </Link>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
          >
            {saving ? (
              <><Icons.Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
            ) : (
              <><Icons.Save className="h-4 w-4" /> Save All Content</>
            )}
          </button>
        </div>
      </div>

      {feedback && (
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 shadow-2xs">
          <div className="flex items-center gap-2">
            <Icons.CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{feedback}</span>
          </div>
          <Link href="/about" target="_blank" className="underline text-emerald-800 hover:text-emerald-950">
            Preview Page ↗
          </Link>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-red-600">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step Navigator Bar */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-3 shadow-2xs flex flex-col gap-2">
        <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-neutral-100 text-xs">
          <span className="font-bold text-neutral-700">Choose Section to Edit:</span>
          <button
            type="button"
            onClick={() => setShowAllSteps(!showAllSteps)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1"
          >
            {showAllSteps ? <><Icons.EyeOff className="h-3.5 w-3.5" /> Show Step-by-Step Mode</> : <><Icons.Eye className="h-3.5 w-3.5" /> Show All 9 Sections</>}
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeStep === sec.id && !showAllSteps;

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => {
                  setActiveStep(sec.id);
                  if (showAllSteps) setShowAllSteps(false);
                }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-center transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white font-bold shadow-xs scale-102"
                    : "bg-neutral-50/80 hover:bg-neutral-100/80 text-neutral-700 font-medium border border-neutral-100"
                }`}
              >
                <Icon className={`h-4 w-4 mb-1 ${isActive ? "text-white" : "text-neutral-500"}`} />
                <span className={`text-[10px] leading-tight line-clamp-1 ${isActive ? "text-blue-100" : "text-neutral-400"}`}>
                  {sec.badge}
                </span>
                <span className="text-[11px] leading-tight line-clamp-1 mt-0.5">
                  {sec.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">

        {/* ── STEP 1: HERO & FOUNDER ── */}
        {(showAllSteps || activeStep === 1) && (
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icons.User className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">Step 1 of 9</span>
                  <h2 className="font-sans font-bold text-lg text-neutral-900">Hero & Founder Identity</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow Badge</label>
                <input
                  type="text"
                  value={hero?.badge || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, hero: { ...hero, badge: e.target.value } })
                  }
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs text-neutral-800 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Greeting Prefix</label>
                <input
                  type="text"
                  value={hero?.greeting || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, hero: { ...hero, greeting: e.target.value } })
                  }
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs text-neutral-800 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Founder Name</label>
                <input
                  type="text"
                  required
                  value={hero?.name || formData.name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      hero: { ...hero, name: e.target.value },
                    })
                  }
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs text-neutral-900 font-bold outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Founder Title / Role</label>
                <input
                  type="text"
                  value={hero?.title || formData.title || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      hero: { ...hero, title: e.target.value },
                    })
                  }
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs text-neutral-800 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Headshot Image</label>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {(hero?.imagePath || formData.imagePath) && (
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 shrink-0 shadow-2xs">
                    <Image
                      src={hero?.imagePath || formData.imagePath || "/images/23.png"}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex gap-2 flex-1 w-full">
                  <input
                    type="text"
                    value={hero?.imagePath || formData.imagePath || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        imagePath: e.target.value,
                        hero: { ...hero, imagePath: e.target.value },
                      })
                    }
                    className="flex-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs text-neutral-800 outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                  >
                    {uploadingImage ? <Icons.Loader2 className="h-4 w-4 animate-spin" /> : <Icons.UploadCloud className="h-4 w-4" />}
                    Upload Image
                  </button>
                </div>
              </div>
            </div>

            {/* Biographies */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Bio Paragraph 1</label>
                <textarea
                  rows={3}
                  value={hero?.bioParagraph1 || formData.bioParagraph1 || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bioParagraph1: e.target.value,
                      hero: { ...hero, bioParagraph1: e.target.value },
                    })
                  }
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs text-neutral-700 leading-relaxed outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Bio Paragraph 2 (Approach)</label>
                <textarea
                  rows={2}
                  value={hero?.bioParagraph2 || formData.bioParagraph2 || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bioParagraph2: e.target.value,
                      hero: { ...hero, bioParagraph2: e.target.value },
                    })
                  }
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs text-neutral-700 leading-relaxed outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary Button</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Text"
                    value={hero?.primaryCtaText || ""}
                    onChange={(e) => setFormData({ ...formData, hero: { ...hero, primaryCtaText: e.target.value } })}
                    className="rounded-lg border border-neutral-200 py-2 px-3 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={hero?.primaryCtaLink || ""}
                    onChange={(e) => setFormData({ ...formData, hero: { ...hero, primaryCtaLink: e.target.value } })}
                    className="rounded-lg border border-neutral-200 py-2 px-3 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Secondary Button</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Text"
                    value={hero?.secondaryCtaText || ""}
                    onChange={(e) => setFormData({ ...formData, hero: { ...hero, secondaryCtaText: e.target.value } })}
                    className="rounded-lg border border-neutral-200 py-2 px-3 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={hero?.secondaryCtaLink || ""}
                    onChange={(e) => setFormData({ ...formData, hero: { ...hero, secondaryCtaLink: e.target.value } })}
                    className="rounded-lg border border-neutral-200 py-2 px-3 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: KEY METRICS ── */}
        {(showAllSteps || activeStep === 2) && (
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Icons.BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block">Step 2 of 9</span>
                  <h2 className="font-sans font-bold text-lg text-neutral-900">Key Animated Metrics (4 Stats)</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metricsList.map((metric, idx) => (
                <div key={idx} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/40 flex flex-col gap-2.5">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Stat #{idx + 1}</span>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={metric.numericValue}
                      onChange={(e) => updateMetric(idx, "numericValue", Number(e.target.value))}
                      className="w-1/2 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-neutral-900"
                    />
                    <input
                      type="text"
                      placeholder="Suffix (+)"
                      value={metric.suffix}
                      onChange={(e) => updateMetric(idx, "suffix", e.target.value)}
                      className="w-1/2 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-blue-600"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Label"
                    value={metric.label}
                    onChange={(e) => updateMetric(idx, "label", e.target.value)}
                    className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs text-neutral-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3: JOURNEY & MILESTONES ── */}
        {(showAllSteps || activeStep === 3) && (
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Icons.Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Step 3 of 9</span>
                  <h2 className="font-sans font-bold text-lg text-neutral-900">Career Journey & Timeline</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow</label>
                <input
                  type="text"
                  value={journey?.eyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, journey: { ...journey, eyebrow: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-blue-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  value={journey?.title || ""}
                  onChange={(e) => setFormData({ ...formData, journey: { ...journey, title: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-neutral-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Story Narrative Paragraphs</label>
              <textarea
                rows={2}
                placeholder="Paragraph 1"
                value={journey?.paragraph1 || ""}
                onChange={(e) => setFormData({ ...formData, journey: { ...journey, paragraph1: e.target.value } })}
                className="rounded-xl border border-neutral-200 p-3 text-xs leading-relaxed"
              />
              <textarea
                rows={2}
                placeholder="Paragraph 2"
                value={journey?.paragraph2 || ""}
                onChange={(e) => setFormData({ ...formData, journey: { ...journey, paragraph2: e.target.value } })}
                className="rounded-xl border border-neutral-200 p-3 text-xs leading-relaxed"
              />
              <textarea
                rows={2}
                placeholder="Paragraph 3"
                value={journey?.paragraph3 || ""}
                onChange={(e) => setFormData({ ...formData, journey: { ...journey, paragraph3: e.target.value } })}
                className="rounded-xl border border-neutral-200 p-3 text-xs leading-relaxed"
              />
            </div>

            {/* Timeline Milestones List */}
            <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-700">Timeline Milestones</h3>
                <button
                  type="button"
                  onClick={addTimelineMilestone}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <Icons.Plus className="h-4 w-4" /> Add Milestone
                </button>
              </div>

              {(journey?.timeline || formData.timeline || []).map((item, idx) => (
                <div key={idx} className="p-3 border border-neutral-200 rounded-xl bg-neutral-50/50 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                  <input
                    type="text"
                    placeholder="Years"
                    value={item.years}
                    onChange={(e) => updateTimelineMilestone(idx, "years", e.target.value)}
                    className="w-full sm:w-36 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-blue-600"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={item.role}
                    onChange={(e) => updateTimelineMilestone(idx, "role", e.target.value)}
                    className="w-full sm:w-52 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-neutral-800"
                  />
                  <input
                    type="text"
                    placeholder="Company / Highlights"
                    value={item.company}
                    onChange={(e) => updateTimelineMilestone(idx, "company", e.target.value)}
                    className="w-full sm:flex-1 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs text-neutral-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeTimelineMilestone(idx)}
                    className="text-neutral-400 hover:text-red-600 p-1"
                  >
                    <Icons.Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 4: WHY WORK WITH US ── */}
        {(showAllSteps || activeStep === 4) && (
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icons.ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Step 4 of 9</span>
                  <h2 className="font-sans font-bold text-lg text-neutral-900">Why Work With Us / What Sets Us Apart</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow</label>
                <input
                  type="text"
                  value={whyUs?.eyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, whyUs: { ...whyUs, eyebrow: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-blue-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={whyUs?.title || ""}
                  onChange={(e) => setFormData({ ...formData, whyUs: { ...whyUs, title: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-neutral-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle</label>
              <input
                type="text"
                value={whyUs?.subtitle || ""}
                onChange={(e) => setFormData({ ...formData, whyUs: { ...whyUs, subtitle: e.target.value } })}
                className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs text-neutral-700"
              />
            </div>

            {/* 3 Highlight Cards */}
            <div className="flex flex-col gap-4 border-t border-neutral-100 pt-4">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">3 Highlight Cards</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(whyUs?.cards || []).map((card, idx) => (
                  <div key={idx} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Card #{idx + 1}</span>
                    <input
                      type="text"
                      placeholder="Badge"
                      value={card.badge}
                      onChange={(e) => {
                        const updated = [...(whyUs?.cards || [])];
                        updated[idx] = { ...updated[idx], badge: e.target.value };
                        setFormData({ ...formData, whyUs: { ...whyUs, cards: updated } });
                      }}
                      className="rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs font-bold text-blue-600"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={card.title}
                      onChange={(e) => {
                        const updated = [...(whyUs?.cards || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setFormData({ ...formData, whyUs: { ...whyUs, cards: updated } });
                      }}
                      className="rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs font-bold text-neutral-900"
                    />
                    <textarea
                      rows={3}
                      placeholder="Description"
                      value={card.desc}
                      onChange={(e) => {
                        const updated = [...(whyUs?.cards || [])];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setFormData({ ...formData, whyUs: { ...whyUs, cards: updated } });
                      }}
                      className="rounded-lg border border-neutral-200 bg-white p-2.5 text-xs text-neutral-600 leading-relaxed resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 5: OUR EXPERTISE ── */}
        {(showAllSteps || activeStep === 5) && (
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icons.Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">Step 5 of 9</span>
                  <h2 className="font-sans font-bold text-lg text-neutral-900">Our Expertise (7 Service Tracks)</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow</label>
                <input
                  type="text"
                  value={expertise?.eyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, expertise: { ...expertise, eyebrow: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-blue-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={expertise?.title || ""}
                  onChange={(e) => setFormData({ ...formData, expertise: { ...expertise, title: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-neutral-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle</label>
              <textarea
                rows={2}
                value={expertise?.subtitle || ""}
                onChange={(e) => setFormData({ ...formData, expertise: { ...expertise, subtitle: e.target.value } })}
                className="rounded-xl border border-neutral-200 p-3 text-xs leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">7 Service Track Items</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(expertise?.items || []).map((item, idx) => (
                  <div key={idx} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase">Track #{idx + 1}</span>
                      <input
                        type="text"
                        placeholder="Badge"
                        value={item.badge}
                        onChange={(e) => {
                          const updated = [...(expertise?.items || [])];
                          updated[idx] = { ...updated[idx], badge: e.target.value };
                          setFormData({ ...formData, expertise: { ...expertise, items: updated } });
                        }}
                        className="rounded-md border border-neutral-200 bg-white py-1 px-2 text-[10px] font-bold text-blue-600 w-32"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...(expertise?.items || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setFormData({ ...formData, expertise: { ...expertise, items: updated } });
                      }}
                      className="rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs font-bold text-neutral-900"
                    />
                    <textarea
                      rows={3}
                      placeholder="Description"
                      value={item.desc}
                      onChange={(e) => {
                        const updated = [...(expertise?.items || [])];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setFormData({ ...formData, expertise: { ...expertise, items: updated } });
                      }}
                      className="rounded-lg border border-neutral-200 bg-white p-2.5 text-xs text-neutral-600 leading-relaxed resize-none"
                    />
                    <input
                      type="text"
                      placeholder="Link (e.g. /services/seo)"
                      value={item.link}
                      onChange={(e) => {
                        const updated = [...(expertise?.items || [])];
                        updated[idx] = { ...updated[idx], link: e.target.value };
                        setFormData({ ...formData, expertise: { ...expertise, items: updated } });
                      }}
                      className="rounded-lg border border-neutral-200 bg-white py-1.5 px-3 text-xs font-mono text-neutral-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 6: HOW WE WORK ── */}
        {(showAllSteps || activeStep === 6) && (
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icons.Layers className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">Step 6 of 9</span>
                  <h2 className="font-sans font-bold text-lg text-neutral-900">How We Work (4 Process Steps)</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow</label>
                <input
                  type="text"
                  value={process?.eyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, process: { ...process, eyebrow: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-blue-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={process?.title || ""}
                  onChange={(e) => setFormData({ ...formData, process: { ...process, title: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-neutral-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Subtitle</label>
              <input
                type="text"
                value={process?.subtitle || ""}
                onChange={(e) => setFormData({ ...formData, process: { ...process, subtitle: e.target.value } })}
                className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs text-neutral-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-neutral-100 pt-4">
              {(process?.steps || []).map((step, idx) => (
                <div key={idx} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={step.step}
                      onChange={(e) => {
                        const updated = [...(process?.steps || [])];
                        updated[idx] = { ...updated[idx], step: e.target.value };
                        setFormData({ ...formData, process: { ...process, steps: updated } });
                      }}
                      className="w-14 rounded-md border border-neutral-200 bg-white py-1 px-2 text-xs font-bold text-blue-600 text-center"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...(process?.steps || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setFormData({ ...formData, process: { ...process, steps: updated } });
                      }}
                      className="flex-1 rounded-md border border-neutral-200 bg-white py-1 px-2 text-xs font-bold text-neutral-900"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Description"
                    value={step.desc}
                    onChange={(e) => {
                      const updated = [...(process?.steps || [])];
                      updated[idx] = { ...updated[idx], desc: e.target.value };
                      setFormData({ ...formData, process: { ...process, steps: updated } });
                    }}
                    className="rounded-md border border-neutral-200 bg-white p-2 text-xs text-neutral-600 leading-relaxed resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 7: PHILOSOPHY & VALUES ── */}
        {(showAllSteps || activeStep === 7) && (
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Icons.Compass className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Step 7 of 9</span>
                  <h2 className="font-sans font-bold text-lg text-neutral-900">Philosophy & Values (4 Principles)</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow</label>
                <input
                  type="text"
                  value={values?.eyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, values: { ...values, eyebrow: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-blue-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={values?.title || ""}
                  onChange={(e) => setFormData({ ...formData, values: { ...values, title: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-neutral-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-neutral-100 pt-4">
              {(values?.cards || []).map((card, idx) => (
                <div key={idx} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={card.number}
                      onChange={(e) => {
                        const updated = [...(values?.cards || [])];
                        updated[idx] = { ...updated[idx], number: e.target.value };
                        setFormData({ ...formData, values: { ...values, cards: updated } });
                      }}
                      className="w-14 rounded-md border border-neutral-200 bg-white py-1 px-2 text-xs font-bold text-blue-600 text-center"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={card.title}
                      onChange={(e) => {
                        const updated = [...(values?.cards || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setFormData({ ...formData, values: { ...values, cards: updated } });
                      }}
                      className="flex-1 rounded-md border border-neutral-200 bg-white py-1 px-2 text-xs font-bold text-neutral-900"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Description"
                    value={card.desc}
                    onChange={(e) => {
                      const updated = [...(values?.cards || [])];
                      updated[idx] = { ...updated[idx], desc: e.target.value };
                      setFormData({ ...formData, values: { ...values, cards: updated } });
                    }}
                    className="rounded-md border border-neutral-200 bg-white p-2 text-xs text-neutral-600 leading-relaxed resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 8: TOOLS & STACK ── */}
        {(showAllSteps || activeStep === 8) && (
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icons.Wrench className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">Step 8 of 9</span>
                  <h2 className="font-sans font-bold text-lg text-neutral-900">Tools & Stack (4-Column Card Grid)</h2>
                </div>
              </div>
              <button
                type="button"
                onClick={addTool}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <Icons.Plus className="h-3.5 w-3.5" /> Add Tool
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow</label>
                <input
                  type="text"
                  value={tools?.eyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, tools: { ...tools, eyebrow: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-blue-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={tools?.title || ""}
                  onChange={(e) => setFormData({ ...formData, tools: { ...tools, title: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-neutral-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-neutral-100 pt-4">
              {(tools?.tools || []).map((t, idx) => (
                <div key={idx} className="p-3.5 border border-neutral-200 rounded-xl bg-neutral-50/50 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-400">Tool #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeTool(idx)}
                      className="text-neutral-400 hover:text-red-600 p-1"
                    >
                      <Icons.Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Tool Name (e.g. Ahrefs)"
                    value={t.name}
                    onChange={(e) => updateTool(idx, "name", e.target.value)}
                    className="rounded-md border border-neutral-200 bg-white py-1.5 px-2.5 text-xs font-bold text-neutral-900"
                  />
                  <input
                    type="text"
                    placeholder="Role / Tag (e.g. SEO Research)"
                    value={t.desc}
                    onChange={(e) => updateTool(idx, "desc", e.target.value)}
                    className="rounded-md border border-neutral-200 bg-white py-1.5 px-2.5 text-xs text-neutral-600"
                  />
                  <input
                    type="text"
                    placeholder="Icon Path (e.g. /Emoji/mag.png)"
                    value={t.icon}
                    onChange={(e) => updateTool(idx, "icon", e.target.value)}
                    className="rounded-md border border-neutral-200 bg-white py-1.5 px-2.5 text-xs font-mono text-neutral-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 9: CTA / LET'S CONNECT ── */}
        {(showAllSteps || activeStep === 9) && (
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Icons.Send className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest block">Step 9 of 9</span>
                  <h2 className="font-sans font-bold text-lg text-neutral-900">CTA Section (Let&apos;s Connect)</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Eyebrow</label>
                <input
                  type="text"
                  value={cta?.eyebrow || ""}
                  onChange={(e) => setFormData({ ...formData, cta: { ...cta, eyebrow: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-blue-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Heading</label>
                <input
                  type="text"
                  value={cta?.title || ""}
                  onChange={(e) => setFormData({ ...formData, cta: { ...cta, title: e.target.value } })}
                  className="rounded-xl border border-neutral-200 py-2.5 px-4 text-xs font-bold text-neutral-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Paragraphs</label>
              <textarea
                rows={2}
                placeholder="Paragraph 1"
                value={cta?.paragraph1 || ""}
                onChange={(e) => setFormData({ ...formData, cta: { ...cta, paragraph1: e.target.value } })}
                className="rounded-xl border border-neutral-200 p-3 text-xs leading-relaxed"
              />
              <textarea
                rows={2}
                placeholder="Paragraph 2"
                value={cta?.paragraph2 || ""}
                onChange={(e) => setFormData({ ...formData, cta: { ...cta, paragraph2: e.target.value } })}
                className="rounded-xl border border-neutral-200 p-3 text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary Button</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Text"
                    value={cta?.primaryCtaText || ""}
                    onChange={(e) => setFormData({ ...formData, cta: { ...cta, primaryCtaText: e.target.value } })}
                    className="rounded-lg border border-neutral-200 py-2 px-3 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={cta?.primaryCtaLink || ""}
                    onChange={(e) => setFormData({ ...formData, cta: { ...cta, primaryCtaLink: e.target.value } })}
                    className="rounded-lg border border-neutral-200 py-2 px-3 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Secondary Button</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Text"
                    value={cta?.secondaryCtaText || ""}
                    onChange={(e) => setFormData({ ...formData, cta: { ...cta, secondaryCtaText: e.target.value } })}
                    className="rounded-lg border border-neutral-200 py-2 px-3 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={cta?.secondaryCtaLink || ""}
                    onChange={(e) => setFormData({ ...formData, cta: { ...cta, secondaryCtaLink: e.target.value } })}
                    className="rounded-lg border border-neutral-200 py-2 px-3 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation & Save Bar */}
        <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {!showAllSteps && (
              <>
                <button
                  type="button"
                  disabled={activeStep <= 1}
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-40 text-xs font-bold text-neutral-700 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Icons.ArrowLeft className="h-3.5 w-3.5" /> Previous Step
                </button>
                <button
                  type="button"
                  disabled={activeStep >= 9}
                  onClick={() => setActiveStep((prev) => Math.min(9, prev + 1))}
                  className="px-4 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-40 text-xs font-bold text-neutral-700 transition-colors cursor-pointer flex items-center gap-1"
                >
                  Next Step <Icons.ArrowRight className="h-3.5 w-3.5" />
                </button>
                <span className="text-xs font-bold text-neutral-400 ml-2">
                  Step {activeStep} of 9
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/about"
              target="_blank"
              className="text-xs font-bold text-neutral-500 hover:text-blue-600 transition-colors"
            >
              View Live About Page ↗
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 px-7 py-2.5 font-sans text-xs font-bold text-white shadow-sm transition-all cursor-pointer border-0"
            >
              {saving ? (
                <><Icons.Loader2 className="h-4 w-4 animate-spin" /> Saving Changes...</>
              ) : (
                <><Icons.Save className="h-4 w-4" /> Save All Content</>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
