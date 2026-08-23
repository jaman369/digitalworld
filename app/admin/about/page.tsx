"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { CloudAboutData } from "@/types";

export default function AdminAboutCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CloudAboutData>({
    name: "Kamrujjaman Mufti",
    title: "Digital Marketing Expert & Web Developer",
    bioParagraph1:
      "Full-service digital marketing expert with 5 years of hands-on experience helping businesses of all sizes grow through SEO, web development, paid ads, and content marketing.",
    bioParagraph2: "Every project I take on is treated as a partnership, where your success is my success.",
    imagePath: "/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg",
    timeline: [
      { years: "2026 - Present", role: "AI Automation Specialist", company: "Building custom AI workflows, intelligent agents & automated growth systems" },
      { years: "2024 - 2026", role: "Digital Marketing Expert", company: "KJ Digital World" },
      { years: "2022 - 2024", role: "SEO & Paid Ads Specialist", company: "Freelance / Agency Partner" },
      { years: "2021 - 2022", role: "Web Developer", company: "Building fast, optimized websites" },
      { years: "2020 - 2021", role: "The Beginning", company: "Mastering the fundamentals of digital marketing" }
    ],
    metrics: [
      { numericValue: 150, suffix: "+", label: "Projects Delivered" },
      { numericValue: 120, suffix: "+", label: "Happy Clients" },
      { numericValue: 5, suffix: "", label: "Years Experience" },
      { numericValue: 11, suffix: "", label: "Countries Served" }
    ]
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/about");
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({ ...prev, ...data }));
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
        setFeedback("About page content successfully saved & live on website!");
        setTimeout(() => setFeedback(""), 4000);
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
      setFormData((prev) => ({ ...prev, imagePath: data.url }));
    } catch (err) {
      alert("Failed to upload image.");
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Timeline Helpers
  const addTimelineMilestone = () => {
    const current = formData.timeline || [];
    setFormData({
      ...formData,
      timeline: [...current, { years: "2026 - Present", role: "New Milestone", company: "Company / Achievements" }],
    });
  };

  const updateTimelineMilestone = (index: number, field: string, value: string) => {
    const current = [...(formData.timeline || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, timeline: current });
  };

  const removeTimelineMilestone = (index: number) => {
    const current = [...(formData.timeline || [])];
    current.splice(index, 1);
    setFormData({ ...formData, timeline: current });
  };

  // Metrics Helpers
  const updateMetric = (index: number, field: string, value: string | number) => {
    const current = [...(formData.metrics || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, metrics: current });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-1.5">
            About Page CMS
          </h1>
          <p className="font-sans text-xs text-neutral-500">
            Edit founder biography, professional role, headshot image, journey timeline, and key metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
          >
            <Icons.ExternalLink className="h-3.5 w-3.5 text-blue-600" />
            View Live About Page ↗
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
              <><Icons.Save className="h-4 w-4" /> Save Content</>
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

      <form onSubmit={handleSave} className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
        
        {/* Section 1: Founder Identity */}
        <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6">
          <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
            <Icons.User className="h-5 w-5 text-blue-600" /> Founder Identity & Role
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Founder / Author Name
              </label>
              <input
                type="text"
                required
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-900 outline-none focus:border-blue-500 font-bold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Professional Role / Title
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Headshot Profile Image */}
        <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6">
          <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
            <Icons.Image className="h-5 w-5 text-indigo-600" /> Headshot Profile Image
          </h2>

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
            {formData.imagePath && (
              <div className="relative h-24 w-24 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 shrink-0 shadow-2xs">
                <Image
                  src={formData.imagePath}
                  alt={formData.name || "Founder Profile"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-2 flex-1 w-full">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Image Path (URL or Local Upload)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.imagePath || ""}
                  onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
                  placeholder="/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg"
                  className="flex-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-xs text-neutral-800 outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  {uploadingImage ? (
                    <><Icons.Loader2 className="h-4 w-4 animate-spin text-blue-600" /> Uploading...</>
                  ) : (
                    <><Icons.UploadCloud className="h-4 w-4 text-blue-600" /> Upload Image from Computer</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Biography Paragraphs */}
        <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6">
          <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
            <Icons.FileText className="h-5 w-5 text-emerald-600" /> Biography Story Copy
          </h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Biography Intro Paragraph 1
            </label>
            <textarea
              rows={4}
              value={formData.bioParagraph1 || ""}
              onChange={(e) => setFormData({ ...formData, bioParagraph1: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-3 px-4 text-sm text-neutral-700 leading-relaxed outline-none focus:border-blue-500 resize-none font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Biography Paragraph 2
            </label>
            <textarea
              rows={3}
              value={formData.bioParagraph2 || ""}
              onChange={(e) => setFormData({ ...formData, bioParagraph2: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-3 px-4 text-sm text-neutral-700 leading-relaxed outline-none focus:border-blue-500 resize-none font-sans"
            />
          </div>
        </div>

        {/* Section 4: Journey Timeline */}
        <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6">
          <div className="flex items-center justify-between">
            <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
              <Icons.Clock className="h-5 w-5 text-amber-500" /> Career Journey Timeline
            </h2>
            <button
              type="button"
              onClick={addTimelineMilestone}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <Icons.Plus className="h-4 w-4" /> Add Milestone
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {(formData.timeline || []).map((item, idx) => (
              <div key={idx} className="p-4 border border-neutral-200/80 rounded-xl bg-neutral-50/40 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="text"
                  placeholder="Years (e.g. 2024 - Present)"
                  value={item.years}
                  onChange={(e) => updateTimelineMilestone(idx, "years", e.target.value)}
                  className="w-full sm:w-36 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-blue-600 outline-none"
                />
                <input
                  type="text"
                  placeholder="Role (e.g. AI Automation Specialist)"
                  value={item.role}
                  onChange={(e) => updateTimelineMilestone(idx, "role", e.target.value)}
                  className="w-full sm:w-52 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-neutral-800 outline-none"
                />
                <input
                  type="text"
                  placeholder="Company / Highlights"
                  value={item.company}
                  onChange={(e) => updateTimelineMilestone(idx, "company", e.target.value)}
                  className="w-full sm:flex-1 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs text-neutral-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeTimelineMilestone(idx)}
                  className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                >
                  <Icons.Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Stats Metrics Counters */}
        <div className="flex flex-col gap-4">
          <h2 className="font-sans font-bold text-base text-neutral-900 flex items-center gap-2">
            <Icons.BarChart3 className="h-5 w-5 text-purple-600" /> Key Animated Metrics (4 Numbers)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(formData.metrics || []).map((metric, idx) => (
              <div key={idx} className="p-4 border border-neutral-200/80 rounded-xl bg-white flex flex-col gap-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Metric #{idx + 1}</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={metric.numericValue}
                    onChange={(e) => updateMetric(idx, "numericValue", Number(e.target.value))}
                    className="w-1/2 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-neutral-900 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Suffix (+)"
                    value={metric.suffix}
                    onChange={(e) => updateMetric(idx, "suffix", e.target.value)}
                    className="w-1/2 rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs font-bold text-blue-600 outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Label"
                  value={metric.label}
                  onChange={(e) => updateMetric(idx, "label", e.target.value)}
                  className="rounded-lg border border-neutral-200 bg-white py-2 px-3 text-xs text-neutral-700 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Footer */}
        <div className="border-t border-neutral-100 pt-6 flex items-center justify-between">
          <Link
            href="/about"
            target="_blank"
            className="text-xs font-bold text-neutral-500 hover:text-blue-600 transition-colors"
          >
            ← View Front-end About Page
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
                <Icons.Save className="h-4 w-4" /> Save About Page Content
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
