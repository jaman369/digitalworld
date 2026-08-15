"use client";

import { useEffect, useState } from "react";
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
  "Content & Marketing",
  "AI Automation",
  "China Sourcing Services"
];

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

  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

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

    // Format benefits array back into lines
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

    // Split benefits text box back into clean string list
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
        // Update local list state
        setServices((prev) =>
          prev.map((s) => (s.slug === updated.slug || s.id === updated.id ? updated : s))
        );
        setFeedbackMessage("Service changes saved & applied live!");
        setTimeout(() => {
          setIsEditing(false);
          setActiveService(null);
        }, 1400);
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

  // Filter and sort services dynamically
  const filteredServices = services
    .filter((svc) => {
      const matchesSearch =
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab =
        selectedTab === "All" ||
        svc.categoryName.toLowerCase().trim() === selectedTab.toLowerCase().trim();

      return matchesSearch && matchesTab;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 relative min-h-screen">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
            Service Content CMS
          </h1>
          <p className="font-sans text-sm text-neutral-500">
            Easily update titles, copy blocks, image links, alt tags, and CTAs across all 51 logical service tracks.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
        
        {/* Search & Tabs control grid */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
              <Icons.Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search services by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-neutral-700"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedTab(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border-0 ${
                  selectedTab === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {cat === "PPC / Paid Ads" ? "PPC & Ads" : cat === "Web Design & Development" ? "Web Dev" : cat === "China Sourcing Services" ? "Sourcing" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Services Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-3 w-16 text-center font-semibold">Order</th>
                <th className="pb-3 font-semibold pl-4">Service Track Details</th>
                <th className="pb-3 font-semibold">Category Group</th>
                <th className="pb-3 font-semibold">Image Alt Info</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((svc) => (
                  <tr
                    key={svc.id}
                    className="border-b border-neutral-100/50 last:border-0 hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="py-4 text-center">
                      <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-neutral-100 text-neutral-700 font-mono text-xs font-bold border border-neutral-200">
                        {svc.sortOrder}
                      </span>
                    </td>
                    <td className="py-4 pl-4">
                      <span className="font-bold text-neutral-800 block leading-tight">{svc.name}</span>
                      <span className="text-[11px] text-neutral-400 block max-w-sm truncate mt-0.5">
                        {svc.tagline || svc.description}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex rounded-full bg-neutral-50 px-2.5 py-0.5 text-xs font-semibold text-neutral-500 border border-neutral-200 capitalize">
                        {svc.categoryName === "PPC / Paid Ads" ? "PPC Ads" : svc.categoryName === "Web Design & Development" ? "Web Dev" : svc.categoryName}
                      </span>
                    </td>
                    <td className="py-4 text-xs text-neutral-500 font-mono">
                      {svc.imageAlt ? (
                        <span className="text-neutral-600 font-sans italic">&quot;{svc.imageAlt}&quot;</span>
                      ) : (
                        <span className="text-neutral-300 italic">None</span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleEditClick(svc)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover px-3.5 py-2 rounded-xl border border-neutral-200 hover:border-primary/20 bg-white shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <Icons.Edit3 className="h-3.5 w-3.5" />
                        Edit Page
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-400 font-medium">
                    No services found matching search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slider Slide-over Drawer Editor Panel */}
      {isEditing && activeService && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop blur overlay */}
          <div
            onClick={() => setIsEditing(false)}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity"
          />

          {/* Slider body drawer */}
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in-right">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-neutral-100 bg-neutral-50">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20">
                  {activeService.sortOrder}
                </span>
                <div>
                  <h3 className="font-sans font-bold text-neutral-800 text-sm">
                    Configure Service Details
                  </h3>
                  <span className="text-[10px] text-neutral-400 font-mono block">
                    /{activeService.categoryName.toLowerCase().replace(/[^a-z]+/g, "")}/{activeService.slug}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-neutral-200/50 text-neutral-400 hover:text-neutral-600 transition-colors border-0 bg-transparent cursor-pointer"
              >
                <Icons.X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable editor form contents */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
              
              {feedbackMessage && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-3.5 text-xs text-emerald-600 font-semibold animate-pulse">
                  <Icons.CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {feedbackError && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-3.5 text-xs text-red-600 font-semibold">
                  <Icons.AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{feedbackError}</span>
                </div>
              )}

              {/* Service Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Service Title</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Tagline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Tagline</label>
                <input
                  type="text"
                  value={editTagline}
                  onChange={(e) => setEditTagline(e.target.value)}
                  placeholder="Short tagline showing value proposition..."
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Image Path URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Showcase Image Path (URL)</label>
                <input
                  type="text"
                  value={editImagePath}
                  onChange={(e) => setEditImagePath(e.target.value)}
                  placeholder="e.g. /images/services/seo.jpg or https://picsum.photos/600/400"
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10 text-xs font-mono"
                />
              </div>

              {/* Image Alt Tag */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Image Alt Tag Description</label>
                <input
                  type="text"
                  value={editImageAlt}
                  onChange={(e) => setEditImageAlt(e.target.value)}
                  placeholder="Accessibility alt description of the service graphic..."
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Description Body */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Content Body Description</label>
                <textarea
                  required
                  rows={6}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Detailed description copy showing your strategy..."
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none font-sans"
                />
              </div>

              {/* Primary CTA config grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Primary CTA Text</label>
                  <input
                    type="text"
                    value={editPrimaryCtaText}
                    onChange={(e) => setEditPrimaryCtaText(e.target.value)}
                    className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Primary CTA Link</label>
                  <input
                    type="text"
                    value={editPrimaryCtaLink}
                    onChange={(e) => setEditPrimaryCtaLink(e.target.value)}
                    className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary font-mono"
                  />
                </div>
              </div>

              {/* Secondary CTA config grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Secondary CTA Text</label>
                  <input
                    type="text"
                    value={editSecondaryCtaText}
                    onChange={(e) => setEditSecondaryCtaText(e.target.value)}
                    className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Secondary CTA Link</label>
                  <input
                    type="text"
                    value={editSecondaryCtaLink}
                    onChange={(e) => setEditSecondaryCtaLink(e.target.value)}
                    className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary font-mono"
                  />
                </div>
              </div>

              {/* Benefits list (checklist array) */}
              <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-4">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Key Benefits (one per line)</label>
                <textarea
                  rows={4}
                  value={editBenefits}
                  onChange={(e) => setEditBenefits(e.target.value)}
                  placeholder="Benefit list point 1&#10;Benefit list point 2&#10;Benefit list point 3..."
                  className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary resize-none font-sans"
                />
              </div>

              {/* Save footer */}
              <div className="mt-4 pt-4 border-t border-neutral-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 text-xs font-bold text-neutral-500 hover:text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border-0 rounded-full cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSave(e)}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-primary hover:bg-primary-hover disabled:bg-neutral-200 border-0 rounded-full cursor-pointer transition-all shadow-sm"
                >
                  {isSaving ? (
                    <>
                      <Icons.Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Saving changes...
                    </>
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
