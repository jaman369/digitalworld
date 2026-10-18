"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

function getCategoryRoute(catName: string): string {
  const lower = (catName || "").toLowerCase();
  if (lower.includes("video")) return "ai-video-production";
  if (lower.includes("automation")) return "ai-automation";
  if (lower.includes("content") || lower.includes("marketing") || lower.includes("writing")) return "content-marketing";
  if (lower.includes("web") || lower.includes("design") || lower.includes("dev")) return "web-design-dev";
  if (lower.includes("ppc") || lower.includes("paid")) return "ppc";
  if (lower.includes("seo")) return "seo";
  return "seo";
}

export default function EditServicePage({ params }: PageProps) {
  const { id: slug } = use(params);
  const router = useRouter();

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("SEO");
  const [imagePath, setImagePath] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [primaryCtaText, setPrimaryCtaText] = useState("");
  const [primaryCtaLink, setPrimaryCtaLink] = useState("");
  const [secondaryCtaText, setSecondaryCtaText] = useState("");
  const [secondaryCtaLink, setSecondaryCtaLink] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadService() {
      try {
        const res = await fetch("/api/admin/services");
        if (res.ok) {
          const list = await res.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const item = list.find((s: any) => s.slug === slug);
          if (item) {
            setName(item.name || "");
            setTagline(item.tagline || "");
            setDescription(item.description || "");
            setCategoryName(item.categoryName || "SEO");
            setImagePath(item.imagePath || "");
            setImageAlt(item.imageAlt || "");
            setPrimaryCtaText(item.primaryCtaText || "Get Started");
            setPrimaryCtaLink(item.primaryCtaLink || "/contact");
            setSecondaryCtaText(item.secondaryCtaText || "");
            setSecondaryCtaLink(item.secondaryCtaLink || "");
            try {
              setBenefits(JSON.parse(item.benefits || "[]"));
            } catch {
              setBenefits([]);
            }
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

  const handleImageUpload = async (file: File) => {
    setIsUploadingImage(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setImagePath(data.url);
    } catch (err) {
      alert("Failed to upload image.");
      console.error(err);
    } finally {
      setIsUploadingImage(false);
    }
  };

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
          categoryName,
          tagline,
          description,
          benefits,
          imagePath: imagePath || null,
          imageAlt: imageAlt || null,
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
        <Icons.Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/services"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-700 transition-colors shadow-2xs"
          >
            <Icons.ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-1.5">
              Edit Service: {name}
            </h1>
            <p className="font-sans text-xs text-neutral-500">
              Modify copy blocks, showcase media, CTA links, and benefits checklist.
            </p>
          </div>
        </div>

        <Link
          href={`/services/${getCategoryRoute(categoryName)}#${slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          <Icons.ExternalLink className="h-3.5 w-3.5 text-blue-600" />
          View Live Service ↗
        </Link>
      </div>

      {message && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-700 font-bold">
          <Icons.CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-600 font-bold">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6 bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Service Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Tagline</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-800 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Description</label>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-3 px-4 text-xs text-neutral-700 leading-relaxed outline-none focus:border-blue-500 resize-none font-sans"
            />
          </div>

          {/* Showcase Image Upload */}
          <div className="flex flex-col gap-3 border-t border-neutral-100 pt-5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Showcase Image Graphic</label>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />

            {imagePath && (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePath} alt={imageAlt || name} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImagePath("")}
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  <Icons.X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={imagePath}
                onChange={(e) => setImagePath(e.target.value)}
                placeholder="URL or /images/..."
                className="flex-1 rounded-xl border border-neutral-200 bg-white py-2 px-3 text-xs outline-none focus:border-blue-500 font-mono"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImage}
                className="px-3.5 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                {isUploadingImage ? "Uploading..." : "Upload File"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-100 pt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary CTA Text</label>
              <input
                type="text"
                required
                value={primaryCtaText}
                onChange={(e) => setPrimaryCtaText(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary CTA Link</label>
              <input
                type="text"
                required
                value={primaryCtaLink}
                onChange={(e) => setPrimaryCtaLink(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Benefits Checklist */}
        <div className="lg:col-span-4 flex flex-col gap-6 bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm">
          <div>
            <h3 className="font-sans font-bold text-sm text-neutral-900 mb-1">
              Benefits List
            </h3>
            <p className="text-xs text-neutral-400">
              Key capabilities or value advantages for this service.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex gap-2 text-xs text-neutral-700 leading-relaxed">
                  <Icons.Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveBenefit(index)}
                  className="text-neutral-400 hover:text-red-600 transition-all cursor-pointer border-0 bg-transparent p-0"
                >
                  <Icons.Trash className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-neutral-100 pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add new benefit..."
                className="flex-1 rounded-xl border border-neutral-200 bg-white py-2 px-3 text-xs outline-none focus:border-blue-500"
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
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer border-0"
              >
                <Icons.Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 py-3.5 font-sans text-xs font-bold text-white shadow-2xs transition-all cursor-pointer border-0 mt-2"
          >
            {isSaving ? (
              <><Icons.Loader2 className="h-4 w-4 animate-spin" /> Saving Copy...</>
            ) : (
              "Save Service Copy"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
