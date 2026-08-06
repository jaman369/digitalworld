"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { CloudAboutData } from "@/types";

export default function AdminAboutCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<CloudAboutData>({
    name: "Kamrujjaman Mufti",
    title: "Digital Marketing Expert & Web Developer",
    bioParagraph1: "Full-service digital marketing expert with 5 years of hands-on experience helping businesses of all sizes grow through SEO, web development, paid ads, and content marketing.",
    bioParagraph2: "Every project I take on is treated as a partnership, where your success is my success.",
    imagePath: "/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg",
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setFeedback("About page content saved & updated live!");
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
          About Page CMS
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Edit your founder biography, personal title, headshot image, and intro copy on the About page.
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

        {/* Founder Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Founder / Author Name
            </label>
            <input
              type="text"
              required
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary font-bold"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Professional Role / Title
            </label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Headshot Image URL */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Headshot / Profile Image Path (URL)
          </label>
          <input
            type="text"
            value={formData.imagePath || ""}
            onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
            placeholder="/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg"
            className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary font-mono text-xs"
          />
        </div>

        {/* Bio Paragraph 1 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Biography Paragraph 1
          </label>
          <textarea
            rows={4}
            value={formData.bioParagraph1 || ""}
            onChange={(e) => setFormData({ ...formData, bioParagraph1: e.target.value })}
            className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Bio Paragraph 2 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Biography Paragraph 2
          </label>
          <textarea
            rows={3}
            value={formData.bioParagraph2 || ""}
            onChange={(e) => setFormData({ ...formData, bioParagraph2: e.target.value })}
            className="rounded-xl border border-neutral-200 bg-white py-2.5 px-4 text-sm text-neutral-800 outline-none focus:border-primary resize-none"
          />
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
              "Save About Page Content"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
