"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditServicePage({ params }: PageProps) {
  const { id: slug } = use(params);
  const router = useRouter();

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [primaryCtaText, setPrimaryCtaText] = useState("");
  const [primaryCtaLink, setPrimaryCtaLink] = useState("");
  const [secondaryCtaText, setSecondaryCtaText] = useState("");
  const [secondaryCtaLink, setSecondaryCtaLink] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadService() {
      try {
        const res = await fetch("/api/admin/services");
        if (res.ok) {
          const list = await res.json();
          const item = list.find((s: { slug: string }) => s.slug === slug);
          if (item) {
            setName(item.name);
            setTagline(item.tagline);
            setDescription(item.description);
            setPrimaryCtaText(item.primaryCtaText);
            setPrimaryCtaLink(item.primaryCtaLink);
            setSecondaryCtaText(item.secondaryCtaText || "");
            setSecondaryCtaLink(item.secondaryCtaLink || "");
            setBenefits(JSON.parse(item.benefits || "[]"));
          } else {
            setError("Service page not found");
          }
        }
      } catch (err) {
        console.error("Load service error:", err);
        setError("Failed to load service details");
      } finally {
        setIsLoading(false);
      }
    }
    loadService();
  }, [slug]);

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefits(benefits.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          tagline,
          description,
          benefits,
          primaryCtaText,
          primaryCtaLink,
          secondaryCtaText,
          secondaryCtaLink,
        }),
      });

      if (res.ok) {
        setMessage("Service details saved successfully!");
        router.refresh();
      } else {
        throw new Error("Failed to save service details");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update service details");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/services"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-700 transition-colors shadow-sm"
        >
          <Icons.ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
            Edit Service Copy: {name}
          </h1>
          <p className="font-sans text-sm text-neutral-500">
            Modify text blocks, CTA parameters, and bullet lists.
          </p>
        </div>
      </div>

      {message && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-3.5 text-xs text-emerald-600 font-semibold">
          <Icons.CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-3.5 text-xs text-red-600 font-semibold">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6 bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)]">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Service Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Tagline</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-100 pt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Primary CTA Text</label>
              <input
                type="text"
                required
                value={primaryCtaText}
                onChange={(e) => setPrimaryCtaText(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Primary CTA Link</label>
              <input
                type="text"
                required
                value={primaryCtaLink}
                onChange={(e) => setPrimaryCtaLink(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Secondary CTA Text (Optional)</label>
              <input
                type="text"
                value={secondaryCtaText}
                onChange={(e) => setSecondaryCtaText(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Secondary CTA Link (Optional)</label>
              <input
                type="text"
                value={secondaryCtaLink}
                onChange={(e) => setSecondaryCtaLink(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)]">
          <div>
            <h3 className="font-sans font-bold text-base text-neutral-800 mb-1">
              Benefits List
            </h3>
            <p className="text-xs text-neutral-400 leading-normal">
              List the core features or advantages of this service offering.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex gap-2.5 text-xs text-neutral-600 leading-relaxed">
                  <Icons.Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveBenefit(index)}
                  className="text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-transparent border-0"
                >
                  <Icons.Trash className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-neutral-100 pt-5">
            <div className="flex gap-2">
              <input
                type="text"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add new benefit..."
                className="flex-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none focus:border-primary"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBenefit();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary hover:bg-primary-hover text-white transition-all cursor-pointer border-0"
              >
                <Icons.Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover disabled:bg-neutral-200 py-3.5 font-sans text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer border-0"
          >
            {isSaving ? (
              <>
                <Icons.Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Service Copy"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
