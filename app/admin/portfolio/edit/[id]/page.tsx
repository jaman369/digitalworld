"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPortfolioProjectPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── State ──
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [clientName, setClientName] = useState("");
  const [industry, setIndustry] = useState("");
  const [resultsLabel, setResultsLabel] = useState("");
  const [caseStudy, setCaseStudy] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [servicesUsed, setServicesUsed] = useState<string[]>([]);
  const [newService, setNewService] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch("/api/admin/portfolio");
        if (res.ok) {
          const list = await res.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const item = list.find((p: any) => p.id === id);
          if (item) {
            setTitle(item.title || "");
            setSlug(item.slug || "");
            setClientName(item.clientName || "");
            setIndustry(item.industry || "");
            setResultsLabel(item.resultsLabel || "");
            setCaseStudy(item.caseStudy || "");
            setServicesUsed(JSON.parse(item.servicesUsed || "[]"));
            const parsedGallery = JSON.parse(item.gallery || "[]");
            setFeaturedImage(parsedGallery[0] || "");
          } else {
            setError("Portfolio project not found");
          }
        }
      } catch (err) {
        console.error("Load project error:", err);
        setError("Failed to load portfolio project details");
      } finally {
        setIsLoading(false);
      }
    }
    loadProject();
  }, [id]);

  const handleUploadImage = async (file: File) => {
    setIsUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Image upload failed");
      const data = await res.json();
      setFeaturedImage(data.url);
    } catch (err) {
      alert("Failed to upload image.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddService = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newService.trim()) {
      const trimmed = newService.trim();
      if (!servicesUsed.includes(trimmed)) {
        setServicesUsed([...servicesUsed, trimmed]);
      }
      setNewService("");
    }
  };

  const handleRemoveService = (index: number) => {
    setServicesUsed(servicesUsed.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title,
          slug,
          clientName,
          industry,
          resultsLabel,
          caseStudy,
          gallery: [featuredImage || "https://picsum.photos/600/400?random=11"],
          servicesUsed,
        }),
      });

      if (res.ok) {
        router.push("/admin/portfolio");
        router.refresh();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to update project");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;
    setIsDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/portfolio");
        router.refresh();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete project");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsDeleting(false);
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
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/portfolio"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-700 transition-colors shadow-sm"
          >
            <Icons.ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-1.5">
              Edit Project: {clientName || title}
            </h1>
            <p className="font-sans text-xs text-neutral-400">
              Modify case study details, showcase media, and result metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Icons.Eye className="h-4 w-4 text-blue-600" />
            Live Preview
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 font-sans text-xs font-bold text-red-600 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            <Icons.Trash className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-3.5 text-xs text-red-600 font-semibold">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6 bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-3 px-4 text-sm font-semibold outline-none text-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Project URL Slug</label>
            <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs font-mono text-neutral-600">
              <span className="text-neutral-400 mr-1">/portfolio/</span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-transparent outline-none flex-1 text-neutral-800 font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Client Name</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Industry</label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Case Study Summary</label>
            <textarea
              required
              rows={10}
              value={caseStudy}
              onChange={(e) => setCaseStudy(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-3 px-4 text-sm leading-relaxed outline-none text-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 resize-none font-sans"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6 bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Results Metric Label</label>
            <input
              type="text"
              required
              value={resultsLabel}
              onChange={(e) => setResultsLabel(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm font-bold text-blue-600 outline-none focus:border-blue-500"
            />
          </div>

          {/* Showcase Image */}
          <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Showcase Image</label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUploadImage(file);
              }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
            >
              {isUploading ? (
                <><Icons.Loader2 className="h-4 w-4 animate-spin text-blue-600" /> Uploading Image...</>
              ) : (
                <><Icons.UploadCloud className="h-4 w-4 text-blue-600" /> Upload Image from Computer</>
              )}
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-neutral-200"></div>
              <span className="flex-shrink mx-2 text-[10px] uppercase tracking-wider text-neutral-400 font-bold">OR PASTE URL</span>
              <div className="flex-grow border-t border-neutral-200"></div>
            </div>

            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://..."
              className="rounded-xl border border-neutral-200 bg-white py-2 px-3 text-xs outline-none focus:border-blue-500 font-mono"
            />

            {featuredImage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-2xs mt-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featuredImage} alt="Showcase Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFeaturedImage("")}
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  <Icons.X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Services Applied */}
          <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Services Applied</label>
            <div className="flex flex-wrap gap-1.5 min-h-[32px]">
              {servicesUsed.map((svc, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200/60"
                >
                  {svc}
                  <button
                    type="button"
                    onClick={() => handleRemoveService(idx)}
                    className="text-blue-400 hover:text-red-600 cursor-pointer border-0 bg-transparent p-0"
                  >
                    <Icons.X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddService();
                  }
                }}
                placeholder="e.g. E-Commerce SEO"
                className="flex-1 rounded-xl border border-neutral-200 bg-white py-2 px-3 text-xs outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddService}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white border-0 hover:bg-blue-700 cursor-pointer"
              >
                <Icons.Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-200 py-3.5 font-sans text-xs font-bold text-white shadow-sm transition-all cursor-pointer border-0 mt-2"
          >
            {isSaving ? (
              <>
                <Icons.Loader2 className="h-4 w-4 animate-spin" />
                Updating Project...
              </>
            ) : (
              "Update Project"
            )}
          </button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <Icons.Eye className="h-4 w-4" /> Case Study Live Preview
              </span>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors"
              >
                <Icons.X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {featuredImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featuredImage} alt={title || "Project"} className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {industry || "Industry"}
                  </span>
                  {resultsLabel && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      {resultsLabel}
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                  {title || "Project Title"}
                </h2>

                <p className="text-xs font-semibold text-neutral-500">
                  Client: <strong className="text-neutral-800">{clientName || "Client Name"}</strong>
                </p>
              </div>

              {servicesUsed.length > 0 && (
                <div className="flex flex-wrap gap-2 border-t border-b border-neutral-100 py-3">
                  {servicesUsed.map((svc, i) => (
                    <span key={i} className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                      {svc}
                    </span>
                  ))}
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Case Study Summary</h4>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                  {caseStudy || "Case study content..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
