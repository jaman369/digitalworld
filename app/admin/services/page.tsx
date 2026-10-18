"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";

interface DbService {
  id: string;
  name: string;
  slug: string;
  categoryName: string;
  sortOrder: number;
  tagline: string;
  description: string;
  benefits: string; // JSON array string
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string | null;
  secondaryCtaLink: string | null;
  imagePath: string | null;
  imageAlt: string | null;
}

const CATEGORIES = [
  "All",
  "SEO",
  "PPC / Paid Ads",
  "Web Design & Development",
  "Content Writing",
  "AI Automation",
  "AI Video Production"
];

// Helper to map category name to website route slug
function getCategoryRoute(catName: string): string {
  const lower = catName.toLowerCase();
  if (lower.includes("seo")) return "seo";
  if (lower.includes("ppc") || lower.includes("paid")) return "ppc";
  if (lower.includes("web") || lower.includes("design")) return "web-design-dev";
  if (lower.includes("content") || lower.includes("marketing") || lower.includes("writing")) return "content-marketing";
  if (lower.includes("video")) return "ai-video-production";
  if (lower.includes("ai") || lower.includes("automation")) return "ai-automation";
  return "seo";
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<DbService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");

  // Drawer Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [activeService, setActiveService] = useState<DbService | null>(null);
  const [editName, setEditName] = useState("");
  const [editTagline, setEditTagline] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImagePath, setEditImagePath] = useState("");
  const [editImageAlt, setEditImageAlt] = useState("");
  const [editPrimaryCtaText, setEditPrimaryCtaText] = useState("");
  const [editPrimaryCtaLink, setEditPrimaryCtaLink] = useState("");
  const [editSecondaryCtaText, setEditSecondaryCtaText] = useState("");
  const [editSecondaryCtaLink, setEditSecondaryCtaLink] = useState("");
  const [editBenefits, setEditBenefits] = useState("");

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
          return;
        }
      }
    } catch (err) {
      console.error("Fetch services failed:", err);
    } finally {
      setIsLoading(false);
    }

    // Fallback: Populate initial 51 tracks from static servicesData if DB empty
    let orderIdx = 1;
    const initialList: DbService[] = [];
    for (const cat of servicesData) {
      for (const sub of cat.subItems) {
        initialList.push({
          id: `svc-${sub.slug}`,
          name: sub.name,
          slug: sub.slug,
          categoryName: cat.title,
          sortOrder: orderIdx++,
          tagline: sub.tagline || "",
          description: sub.description || "",
          benefits: JSON.stringify(sub.benefits || []),
          primaryCtaText: sub.primaryCtaText || "Get Started",
          primaryCtaLink: sub.primaryCtaLink || `/contact?service=${sub.slug}`,
          secondaryCtaText: sub.secondaryCtaText || null,
          secondaryCtaLink: sub.secondaryCtaLink || null,
          imagePath: null,
          imageAlt: null,
        });
      }
    }
    setServices(initialList);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEditClick = (svc: DbService) => {
    setActiveService(svc);
    setEditName(svc.name);
    setEditTagline(svc.tagline);
    setEditDescription(svc.description);
    setEditImagePath(svc.imagePath || "");
    setEditImageAlt(svc.imageAlt || "");
    setEditPrimaryCtaText(svc.primaryCtaText || "Get Started");
    setEditPrimaryCtaLink(svc.primaryCtaLink || "/contact");
    setEditSecondaryCtaText(svc.secondaryCtaText || "");
    setEditSecondaryCtaLink(svc.secondaryCtaLink || "");

    try {
      const arr = JSON.parse(svc.benefits);
      setEditBenefits(Array.isArray(arr) ? arr.join("\n") : "");
    } catch {
      setEditBenefits("");
    }

    setFeedbackMessage("");
    setFeedbackError("");
    setIsEditing(true);
  };

  const handleImageUpload = async (file: File) => {
    setIsUploadingImage(true);
    setFeedbackError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setEditImagePath(data.url);
    } catch (err) {
      alert("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeService) return;

    if (!editName.trim()) {
      setFeedbackError("Service Title is required.");
      return;
    }

    setIsSaving(true);
    setFeedbackMessage("");
    setFeedbackError("");

    const benefitsList = editBenefits
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: activeService.slug,
          name: editName,
          categoryName: activeService.categoryName,
          sortOrder: activeService.sortOrder,
          tagline: editTagline,
          description: editDescription,
          benefits: benefitsList,
          primaryCtaText: editPrimaryCtaText,
          primaryCtaLink: editPrimaryCtaLink,
          secondaryCtaText: editSecondaryCtaText || null,
          secondaryCtaLink: editSecondaryCtaLink || null,
          imagePath: editImagePath || null,
          imageAlt: editImageAlt || null,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setServices((prev) =>
          prev.map((s) => (s.slug === updated.slug || s.id === updated.id ? updated : s))
        );
        setFeedbackMessage("Service changes saved & applied live!");
        setTimeout(() => {
          setIsEditing(false);
          setActiveService(null);
        }, 1200);
      } else {
        const errorData = await response.json();
        setFeedbackError(errorData.error || "Failed to update service");
      }
    } catch (err) {
      console.error(err);
      setFeedbackError("An error occurred while saving the service.");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredServices = services
    .filter((svc) => {
      const matchesSearch =
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.slug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab =
        selectedTab === "All" ||
        svc.categoryName.toLowerCase().trim().includes(selectedTab.toLowerCase().trim()) ||
        (selectedTab === "SEO" && svc.categoryName.toLowerCase().includes("seo")) ||
        (selectedTab === "PPC / Paid Ads" && svc.categoryName.toLowerCase().includes("ppc")) ||
        (selectedTab === "Web Design & Development" && svc.categoryName.toLowerCase().includes("web")) ||
        (selectedTab === "Content Writing" && (svc.categoryName.toLowerCase().includes("content") || svc.categoryName.toLowerCase().includes("writing"))) ||
        (selectedTab === "AI Automation" && svc.categoryName.toLowerCase().includes("automation")) ||
        (selectedTab === "AI Video Production" && (svc.categoryName.toLowerCase().includes("video") || svc.categoryName.toLowerCase().includes("production")));

      return matchesSearch && matchesTab;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 relative min-h-screen">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-1.5">
            Service Content CMS
          </h1>
          <p className="font-sans text-xs text-neutral-500">
            Easily update titles, copy blocks, image links, alt tags, benefits, and CTAs across all 51 service tracks.
          </p>
        </div>

        <Link
          href="/services/seo"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs shrink-0"
        >
          <Icons.ExternalLink className="h-3.5 w-3.5 text-blue-600" />
          View Live Services Page ↗
        </Link>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        
        {/* Search & Tabs control grid */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
              <Icons.Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search services by keyword or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-neutral-800"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedTab(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border-0 ${
                  selectedTab === cat
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-neutral-100/70 hover:bg-neutral-200/60 text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {cat === "PPC / Paid Ads" ? "PPC & Ads" : cat === "Web Design & Development" ? "Web Dev" : cat === "AI Video Production" ? "AI Video" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Services Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-3 w-14 text-center font-semibold">#</th>
                <th className="pb-3 font-semibold pl-3">Service Track Details</th>
                <th className="pb-3 font-semibold">Category Group</th>
                <th className="pb-3 font-semibold">Showcase Media</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((svc) => {
                  const catRoute = getCategoryRoute(svc.categoryName);
                  return (
                    <tr
                      key={svc.id}
                      className="border-b border-neutral-100/60 last:border-0 hover:bg-neutral-50/60 transition-colors"
                    >
                      <td className="py-4 text-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-neutral-100 text-neutral-700 font-mono text-[11px] font-bold border border-neutral-200">
                          {svc.sortOrder}
                        </span>
                      </td>
                      <td className="py-4 pl-3">
                        <span className="font-bold text-neutral-900 block leading-tight">{svc.name}</span>
                        <span className="text-[11px] text-neutral-400 font-mono block max-w-sm truncate mt-0.5">
                          /services/{catRoute}#{svc.slug}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100 capitalize">
                          {svc.categoryName === "PPC / Paid Ads" ? "PPC Ads" : svc.categoryName === "Web Design & Development" ? "Web Dev" : svc.categoryName}
                        </span>
                      </td>
                      <td className="py-4 text-xs">
                        {svc.imagePath ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                            <Icons.CheckCircle2 className="h-3 w-3" /> Image Set
                          </span>
                        ) : (
                          <span className="text-neutral-400 italic text-[11px]">Default Icon</span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/services/${catRoute}#${svc.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-500 hover:text-blue-600 px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
                          >
                            <Icons.ExternalLink className="h-3 w-3" />
                            View Live
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleEditClick(svc)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 px-3.5 py-1.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                          >
                            <Icons.Edit3 className="h-3.5 w-3.5" />
                            Edit Page
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-400 font-medium">
                    No services found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Editor Panel */}
      {isEditing && activeService && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setIsEditing(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center h-7 w-7 rounded-lg bg-blue-100 text-blue-700 font-mono text-xs font-bold border border-blue-200">
                  {activeService.sortOrder}
                </span>
                <div>
                  <h3 className="font-sans font-bold text-neutral-900 text-sm">
                    Configure Service Track
                  </h3>
                  <span className="text-[11px] text-neutral-400 font-mono block">
                    /{getCategoryRoute(activeService.categoryName)}#{activeService.slug}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-neutral-200 text-neutral-500 transition-colors border-0 bg-transparent cursor-pointer"
              >
                <Icons.X className="h-4 w-4" />
              </button>
            </div>

            {/* Form contents */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
              
              {feedbackMessage && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-700 font-bold">
                  <Icons.CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {feedbackError && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-600 font-bold">
                  <Icons.AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{feedbackError}</span>
                </div>
              )}

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

              {/* Service Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Service Title</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm font-bold text-neutral-900 outline-none focus:border-blue-500"
                />
              </div>

              {/* Tagline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Tagline</label>
                <input
                  type="text"
                  value={editTagline}
                  onChange={(e) => setEditTagline(e.target.value)}
                  placeholder="Short tagline showing value proposition..."
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-800 focus:border-blue-500"
                />
              </div>

              {/* Showcase Image Upload */}
              <div className="flex flex-col gap-2.5 border-t border-neutral-100 pt-4">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Showcase Image Graphic</label>
                
                {editImagePath && (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editImagePath} alt={editImageAlt || "Showcase"} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setEditImagePath("")}
                      className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                    >
                      <Icons.X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editImagePath}
                    onChange={(e) => setEditImagePath(e.target.value)}
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

              {/* Image Alt Tag */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Image Alt Description</label>
                <input
                  type="text"
                  value={editImageAlt}
                  onChange={(e) => setEditImageAlt(e.target.value)}
                  placeholder="Accessibility alt description..."
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none focus:border-blue-500"
                />
              </div>

              {/* Description Body */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Content Body Description</label>
                <textarea
                  required
                  rows={5}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Detailed description copy showing your strategy..."
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs text-neutral-700 leading-relaxed outline-none focus:border-blue-500 resize-none font-sans"
                />
              </div>

              {/* Primary CTA config grid */}
              <div className="grid grid-cols-2 gap-3 border-t border-neutral-100 pt-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary CTA Text</label>
                  <input
                    type="text"
                    value={editPrimaryCtaText}
                    onChange={(e) => setEditPrimaryCtaText(e.target.value)}
                    className="rounded-xl border border-neutral-200 bg-white py-2 px-3 text-xs outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Primary CTA Link</label>
                  <input
                    type="text"
                    value={editPrimaryCtaLink}
                    onChange={(e) => setEditPrimaryCtaLink(e.target.value)}
                    className="rounded-xl border border-neutral-200 bg-white py-2 px-3 text-xs outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Benefits checklist */}
              <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-4">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Key Benefits (one per line)</label>
                <textarea
                  rows={4}
                  value={editBenefits}
                  onChange={(e) => setEditBenefits(e.target.value)}
                  placeholder="Benefit point 1&#10;Benefit point 2&#10;Benefit point 3..."
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs text-neutral-700 outline-none focus:border-blue-500 resize-none font-sans"
                />
              </div>

              {/* Save footer */}
              <div className="mt-4 pt-4 border-t border-neutral-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 text-xs font-bold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl cursor-pointer transition-all border-0"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSave(e)}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 rounded-xl cursor-pointer transition-all border-0 shadow-2xs"
                >
                  {isSaving ? (
                    <><Icons.Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                  ) : (
                    "Save & Apply"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
