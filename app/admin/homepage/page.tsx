"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { CloudHomepageData } from "@/lib/cloudSync";

export default function AdminHomepageCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<CloudHomepageData>({
    heroTagline: "FULL-SERVICE DIGITAL MARKETING AGENCY",
    heroTitle: "Rank First. Scale Faster. Own Your Market.",
    heroSubtitle: "We help ambitious brands capture high-intent search traffic, lower acquisition costs, and scale predictable revenue through SEO, PPC, web design, and content marketing.",
    heroPrimaryCtaText: "Book Strategy Call",
    heroPrimaryCtaLink: "/contact",
    heroSecondaryCtaText: "Explore Services",
    heroSecondaryCtaLink: "/services/seo",
    whyChooseUsTitle: "Why global brands trust Digital World.",
    whyChooseUsSubtitle: "We don't sell generic packages. We build custom growth engines designed specifically for your target metrics.",
    testimonialsTitle: "What our clients say.",
    testimonialsSubtitle: "Real feedback from founders, marketing directors, and e-commerce leaders worldwide.",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/homepage");
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({ ...prev, ...data }));
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
        setFeedback("Homepage content saved & updated live!");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
          Homepage CMS
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Manage Hero Banner headings, CTAs, Why Choose Us, and section copy directly on the homepage.
        </p>
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

        {/* Hero Tagline */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Hero Top Badge Tagline
          </label>
          <input
            type="text"
            value={formData.heroTagline || ""}
            onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
            className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Hero Title */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Hero Main Headline Title
          </label>
          <input
            type="text"
            required
            value={formData.heroTitle || ""}
            onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
            className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-bold"
          />
        </div>

        {/* Hero Subtitle */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Hero Subtitle Copy
          </label>
          <textarea
            rows={3}
            value={formData.heroSubtitle || ""}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
          />
        </div>

        {/* Primary CTA Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-100 pt-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Primary CTA Button Text
            </label>
            <input
              type="text"
              value={formData.heroPrimaryCtaText || ""}
              onChange={(e) => setFormData({ ...formData, heroPrimaryCtaText: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Primary CTA Link URL
            </label>
            <input
              type="text"
              value={formData.heroPrimaryCtaLink || ""}
              onChange={(e) => setFormData({ ...formData, heroPrimaryCtaLink: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary font-mono"
            />
          </div>
        </div>

        {/* Secondary CTA Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Secondary CTA Button Text
            </label>
            <input
              type="text"
              value={formData.heroSecondaryCtaText || ""}
              onChange={(e) => setFormData({ ...formData, heroSecondaryCtaText: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Secondary CTA Link URL
            </label>
            <input
              type="text"
              value={formData.heroSecondaryCtaLink || ""}
              onChange={(e) => setFormData({ ...formData, heroSecondaryCtaLink: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary font-mono"
            />
          </div>
        </div>

        {/* Why Choose Us Headers */}
        <div className="border-t border-neutral-100 pt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              &quot;Why Choose Us&quot; Section Title
            </label>
            <input
              type="text"
              value={formData.whyChooseUsTitle || ""}
              onChange={(e) => setFormData({ ...formData, whyChooseUsTitle: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              &quot;Why Choose Us&quot; Subtitle
            </label>
            <input
              type="text"
              value={formData.whyChooseUsSubtitle || ""}
              onChange={(e) => setFormData({ ...formData, whyChooseUsSubtitle: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Testimonials Headers */}
        <div className="border-t border-neutral-100 pt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Testimonials Section Title
            </label>
            <input
              type="text"
              value={formData.testimonialsTitle || ""}
              onChange={(e) => setFormData({ ...formData, testimonialsTitle: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Testimonials Section Subtitle
            </label>
            <input
              type="text"
              value={formData.testimonialsSubtitle || ""}
              onChange={(e) => setFormData({ ...formData, testimonialsSubtitle: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Submit */}
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
              "Save Homepage Content"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
