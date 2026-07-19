"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPortfolioProjectPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

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
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch("/api/admin/portfolio");
        if (res.ok) {
          const list = await res.json();
          const item = list.find((p: { id: string }) => p.id === id);
          if (item) {
            setTitle(item.title);
            setSlug(item.slug);
            setClientName(item.clientName);
            setIndustry(item.industry);
            setResultsLabel(item.resultsLabel);
            setCaseStudy(item.caseStudy);
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

  const handleAddService = () => {
    if (newService.trim()) {
      setServicesUsed([...servicesUsed, newService.trim()]);
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
    if (!window.confirm("Are you sure you want to delete this case study?")) {
      return;
    }

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
        <Icons.Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/portfolio"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-700 transition-colors shadow-sm"
          >
            <Icons.ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
              Edit Project: {clientName}
            </h1>
            <p className="font-sans text-sm text-neutral-500">
              Modify summaries, results achievements, and tag specs.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 hover:bg-red-100 px-5 py-2.5 font-sans text-xs font-bold text-red-600 shadow-sm transition-all hover:scale-[1.01] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-0"
        >
          <Icons.Trash className="h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete Study"}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-3.5 text-xs text-red-600 font-semibold">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6 bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)]">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Project URL Slug</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Client Name</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Industry</label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Case Study Summary</label>
            <textarea
              required
              rows={8}
              value={caseStudy}
              onChange={(e) => setCaseStudy(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none font-sans"
            />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)]">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Results Metric Label</label>
            <input
              type="text"
              required
              value={resultsLabel}
              onChange={(e) => setResultsLabel(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Showcase Image URL</label>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary text-xs"
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-neutral-100 pt-5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Services Applied</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {servicesUsed.map((svc, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 bg-neutral-50 text-neutral-600 text-xs px-2.5 py-1 rounded-full border border-neutral-200"
                >
                  {svc}
                  <button
                    type="button"
                    onClick={() => handleRemoveService(idx)}
                    className="text-neutral-400 hover:text-red-500 cursor-pointer border-0 bg-transparent p-0"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="e.g. E-Commerce SEO"
                className="flex-1 rounded-xl border border-neutral-200 bg-white py-2 px-3 text-xs outline-none focus:border-primary"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddService();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddService}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white border-0 cursor-pointer"
              >
                <Icons.Plus className="h-3.5 w-3.5" />
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
              "Save Project"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
