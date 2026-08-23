"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";

// ── Optimization tab definitions ──
const OPT_TABS = [
  { key: "seo", label: "SEO & Meta", icon: Icons.Search, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { key: "aeo", label: "AEO", icon: Icons.MessageCircleQuestion, color: "text-violet-600 bg-violet-50 border-violet-200" },
  { key: "geo", label: "GEO", icon: Icons.Globe, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { key: "llmo", label: "LLMO", icon: Icons.Brain, color: "text-pink-600 bg-pink-50 border-pink-200" },
  { key: "veo", label: "VEO", icon: Icons.Image, color: "text-orange-600 bg-orange-50 border-orange-200" },
  { key: "ceo", label: "CEO", icon: Icons.MessageSquare, color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
  { key: "beo", label: "BEO", icon: Icons.Award, color: "text-amber-600 bg-amber-50 border-amber-200" },
  { key: "mseo", label: "MSEO", icon: Icons.Layers, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
] as const;

type OptTab = typeof OPT_TABS[number]["key"];

function useJsonArray(initial: string[] = [""]) {
  const [items, setItems] = useState(initial);
  const add = () => setItems([...items, ""]);
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const update = (i: number, val: string) => {
    const copy = [...items];
    copy[i] = val;
    setItems(copy);
  };
  return { items, setItems, add, remove, update };
}

interface FaqItem { question: string; answer: string; }
interface CitationItem { source: string; url: string; claim: string; }
interface StatItem { stat: string; source: string; url: string; }
interface QuoteItem { quote: string; expert: string; title: string; }
interface VeoImage { url: string; alt: string; caption: string; }
interface DefinitionItem { term: string; definition: string; }

export default function NewBlogPostPage() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);
  const featuredFileInputRef = useRef<HTMLInputElement>(null);

  // ── Mode & Modals ──
  const [editorMode, setEditorMode] = useState<"visual" | "text">("visual");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [excerptExpanded, setExcerptExpanded] = useState(true);

  // Media Modal state
  const [mediaTab, setMediaTab] = useState<"upload" | "url">("upload");
  const [mediaUrlInput, setMediaUrlInput] = useState("");
  const [mediaAltInput, setMediaAltInput] = useState("");
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isUploadingFeatured, setIsUploadingFeatured] = useState(false);

  // ── Core fields ──
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [imageAltText, setImageAltText] = useState("");
  const [postFormat, setPostFormat] = useState("standard");
  const [categoryName, setCategoryName] = useState("SEO");
  const [categoriesList, setCategoriesList] = useState<string[]>([
    "SEO", "Google Ads", "Web Dev", "Content Marketing", "Email Marketing", "Social Media", "E-commerce", "AI & Automation"
  ]);
  const [isDraft, setIsDraft] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputText, setTagInputText] = useState("");

  // ── SEO fields ──
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [robotsSettings, setRobotsSettings] = useState("index, follow");

  // ── Optimization fields ──
  const [aeoTargetQuestion, setAeoTargetQuestion] = useState("");
  const [aeoDirectAnswer, setAeoDirectAnswer] = useState("");
  const [aeoFaqItems, setAeoFaqItems] = useState<FaqItem[]>([{ question: "", answer: "" }]);
  const paaQuestions = useJsonArray([""]);

  const [geoStats, setGeoStats] = useState<StatItem[]>([{ stat: "", source: "", url: "" }]);
  const [geoCitations, setGeoCitations] = useState<CitationItem[]>([{ source: "", url: "", claim: "" }]);
  const [geoQuotes, setGeoQuotes] = useState<QuoteItem[]>([{ quote: "", expert: "", title: "" }]);

  const [llmoEntityName, setLlmoEntityName] = useState("");
  const [llmoTopicCluster, setLlmoTopicCluster] = useState("");
  const llmoRelated = useJsonArray([""]);
  const [llmoContentDepth, setLlmoContentDepth] = useState("comprehensive");

  const [veoImages, setVeoImages] = useState<VeoImage[]>([{ url: "", alt: "", caption: "" }]);
  const [veoVideoUrl, setVeoVideoUrl] = useState("");
  const [veoVideoTitle, setVeoVideoTitle] = useState("");
  const [veoInfographicUrl, setVeoInfographicUrl] = useState("");

  const [ceoSummary, setCeoSummary] = useState("");
  const [ceoTakeaway, setCeoTakeaway] = useState("");
  const ceoSteps = useJsonArray([""]);

  const [beoCredentials, setBeoCredentials] = useState("");
  const [beoCompanyMention, setBeoCompanyMention] = useState("");
  const beoBrandKw = useJsonArray([""]);
  const beoTrust = useJsonArray([""]);

  const [mseoFormat, setMseoFormat] = useState("text");
  const [mseoDefinitions, setMseoDefinitions] = useState<DefinitionItem[]>([{ term: "", definition: "" }]);

  // ── UI state ──
  const [activeOptTab, setActiveOptTab] = useState<OptTab>("seo");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  // ── Rich text toolbar ──
  const execCmd = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  }, []);

  const handleEditorInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setContent(html);
      const text = editorRef.current.innerText || "";
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    }
  };

  const handleTextareaChange = (val: string) => {
    setContent(val);
    const plainText = val.replace(/<[^>]*>/g, "");
    setWordCount(plainText.trim() ? plainText.trim().split(/\s+/).length : 0);
  };

  const switchToVisual = () => {
    setEditorMode("visual");
    setTimeout(() => {
      if (editorRef.current) editorRef.current.innerHTML = content;
    }, 0);
  };

  const switchToText = () => {
    if (editorRef.current) setContent(editorRef.current.innerHTML);
    setEditorMode("text");
  };

  // ── IMAGE UPLOAD HANDLERS ──

  // 1. Upload image file from computer for Editor Content (Add Media)
  const handleUploadContentImage = async (file: File) => {
    setIsUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      insertImageIntoEditor(data.url, mediaAltInput || file.name);
      setShowMediaModal(false);
      setMediaUrlInput("");
      setMediaAltInput("");
    } catch (err) {
      alert("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  // 2. Upload image file for Featured Image
  const handleUploadFeaturedImage = async (file: File) => {
    setIsUploadingFeatured(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      setFeaturedImage(data.url);
      if (!imageAltText) setImageAltText(file.name.replace(/\.[^/.]+$/, ""));
    } catch (err) {
      alert("Failed to upload featured image");
      console.error(err);
    } finally {
      setIsUploadingFeatured(false);
    }
  };

  // Insert Image into Editor
  const insertImageIntoEditor = (url: string, altText: string) => {
    if (editorMode === "visual") {
      execCmd("insertImage", url);
    } else {
      const imgHtml = `<img src="${url}" alt="${altText || 'Image'}" class="w-full rounded-xl my-4" />`;
      setContent(prev => prev + "\n" + imgHtml);
    }
  };

  const handleInsertMediaFromUrl = () => {
    if (mediaUrlInput.trim()) {
      insertImageIntoEditor(mediaUrlInput.trim(), mediaAltInput);
      setShowMediaModal(false);
      setMediaUrlInput("");
      setMediaAltInput("");
    }
  };

  // Category addition
  const handleAddNewCategory = () => {
    const newCat = prompt("Enter new Category Name:");
    if (newCat && newCat.trim()) {
      const trimmed = newCat.trim();
      if (!categoriesList.includes(trimmed)) {
        setCategoriesList(prev => [...prev, trimmed]);
      }
      setCategoryName(trimmed);
    }
  };

  // Tags Management
  const handleAddTag = (e?: React.KeyboardEvent) => {
    if (e && e.key !== "Enter" && e.key !== ",") return;
    if (e) e.preventDefault();
    if (tagInputText.trim()) {
      const newTag = tagInputText.trim().replace(/^,|,$/g, "");
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInputText("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Score Calculator
  const calcScore = () => {
    let filled = 0;
    let total = 0;
    total += 4; if (seoTitle) filled++; if (seoDescription) filled++; if (canonicalUrl) filled++; if (imageAltText) filled++;
    total += 3; if (aeoTargetQuestion) filled++; if (aeoDirectAnswer) filled++; if (aeoFaqItems.some(f => f.question && f.answer)) filled++;
    total += 2; if (geoStats.some(s => s.stat)) filled++; if (geoCitations.some(c => c.source)) filled++;
    total += 3; if (llmoEntityName) filled++; if (llmoTopicCluster) filled++; if (llmoRelated.items.some(r => r)) filled++;
    total += 2; if (veoImages.some(i => i.url)) filled++; if (veoVideoUrl || veoInfographicUrl) filled++;
    total += 3; if (ceoSummary) filled++; if (ceoTakeaway) filled++; if (ceoSteps.items.some(s => s)) filled++;
    total += 2; if (beoCredentials) filled++; if (beoCompanyMention) filled++;
    total += 2; if (mseoFormat !== "text") filled++; if (mseoDefinitions.some(d => d.term)) filled++;
    return Math.round((filled / total) * 100);
  };

  // Submit Handler
  const savePost = async (draftState: boolean) => {
    setIsSaving(true);
    setError("");

    let finalContent = content;
    if (editorMode === "visual" && editorRef.current) {
      finalContent = editorRef.current.innerHTML;
    }

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || "Untitled Article",
          slug: slug || `article-${Date.now()}`,
          excerpt,
          content: finalContent || "<p>Content coming soon...</p>",
          featuredImage,
          imageAltText,
          categoryName,
          isDraft: draftState,
          tags,
          // SEO
          seoTitle, seoDescription, canonicalUrl, robotsSettings,
          // AEO
          aeoTargetQuestion, aeoDirectAnswer,
          aeoFaqItems: JSON.stringify(aeoFaqItems.filter(f => f.question)),
          aeoPaaQuestions: JSON.stringify(paaQuestions.items.filter(Boolean)),
          // GEO
          geoStatistics: JSON.stringify(geoStats.filter(s => s.stat)),
          geoCitations: JSON.stringify(geoCitations.filter(c => c.source)),
          geoExpertQuotes: JSON.stringify(geoQuotes.filter(q => q.quote)),
          // LLMO
          llmoEntityName, llmoTopicCluster,
          llmoRelatedEntities: JSON.stringify(llmoRelated.items.filter(Boolean)),
          llmoContentDepth,
          // VEO
          veoImages: JSON.stringify(veoImages.filter(img => img.url)),
          veoVideoUrl, veoVideoTitle, veoInfographicUrl,
          // CEO
          ceoConversationalSummary: ceoSummary,
          ceoPrimaryKeyTakeaway: ceoTakeaway,
          ceoActionableSteps: JSON.stringify(ceoSteps.items.filter(Boolean)),
          // BEO
          beoAuthorCredentials: beoCredentials,
          beoCompanyMention,
          beoBrandKeywords: JSON.stringify(beoBrandKw.items.filter(Boolean)),
          beoTrustSignals: JSON.stringify(beoTrust.items.filter(Boolean)),
          // MSEO
          mseoContentFormat: mseoFormat,
          mseoTableData: "[]",
          mseoKeyDefinitions: JSON.stringify(mseoDefinitions.filter(d => d.term)),
        }),
      });

      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save blog post");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePost(isDraft);
  };

  const handleMoveToTrash = () => {
    if (confirm("Are you sure you want to discard this draft?")) {
      router.push("/admin/blog");
    }
  };

  const inputCls = "w-full rounded-lg border border-neutral-200 bg-white py-2 px-3 text-sm outline-none text-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all";
  const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5";
  const helpCls = "text-[11px] text-neutral-400 mt-1";
  const cardCls = "bg-white border border-neutral-200 rounded-lg shadow-sm";

  const ToolBtn = ({ cmd, icon: Icon, title: t, val }: { cmd: string; icon: React.ComponentType<{className?:string}>; title: string; val?: string }) => (
    <button type="button" onClick={() => execCmd(cmd, val)} title={t}
      className="flex h-7 w-7 items-center justify-center rounded hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors">
      <Icon className="h-3.5 w-3.5" />
    </button>
  );

  const score = calcScore();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-700 transition-colors shadow-sm">
            <Icons.ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-neutral-900 tracking-tight leading-none mb-1">
              Add New Post
            </h1>
            <p className="font-sans text-xs text-neutral-400">
              WordPress-style blog builder with media upload & AI engine optimization.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-xs cursor-pointer"
          >
            <Icons.Eye className="h-3.5 w-3.5 text-neutral-500" />
            Live Preview
          </button>
          <button
            type="button"
            onClick={() => { setIsDraft(true); savePost(true); }}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-xs cursor-pointer"
          >
            Save Draft
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-semibold">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ════════════════════════════════════════════════ */}
        {/* LEFT COLUMN: Main Editor                         */}
        {/* ════════════════════════════════════════════════ */}
        <div className="lg:col-span-8 flex flex-col gap-5">

          {/* ── Title ── */}
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter title here"
            className="w-full rounded-lg border border-neutral-200 bg-white py-3 px-4 text-xl font-serif font-bold outline-none text-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 placeholder:text-neutral-300 transition-all"
          />

          {/* ── Slug ── */}
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="font-semibold">Permalink:</span>
            <span className="text-neutral-400">/blog/</span>
            <input
              type="text" required value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="border-b border-dashed border-neutral-300 bg-transparent py-0.5 px-1 text-xs font-mono text-neutral-700 outline-none focus:border-blue-500 min-w-[200px]"
            />
          </div>

          {/* ── WordPress-Style Content Editor ── */}
          <div className={cardCls}>
            {/* Top Add Media bar (WordPress Replica) */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-2 bg-neutral-50/50">
              <button
                type="button"
                onClick={() => setShowMediaModal(true)}
                className="inline-flex items-center gap-1.5 rounded border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400 shadow-2xs transition-colors cursor-pointer"
              >
                <Icons.ImagePlus className="h-4 w-4 text-blue-600" />
                Add Media
              </button>

              {/* Right: Visual / Text mode toggle */}
              <div className="flex border border-neutral-200 rounded overflow-hidden text-xs font-semibold">
                <button type="button" onClick={switchToVisual}
                  className={`px-3.5 py-1.5 transition-colors cursor-pointer ${editorMode === "visual" ? "bg-white text-neutral-800 shadow-2xs font-bold" : "bg-neutral-100 text-neutral-500 hover:text-neutral-700"}`}>
                  Visual
                </button>
                <button type="button" onClick={switchToText}
                  className={`px-3.5 py-1.5 transition-colors cursor-pointer ${editorMode === "text" ? "bg-white text-neutral-800 shadow-2xs font-bold" : "bg-neutral-100 text-neutral-500 hover:text-neutral-700"}`}>
                  Text
                </button>
              </div>
            </div>

            {/* Formatting Toolbar */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-1.5 bg-white">
              <div className="flex items-center gap-0.5 flex-wrap">
                <ToolBtn cmd="bold" icon={Icons.Bold} title="Bold (Ctrl+B)" />
                <ToolBtn cmd="italic" icon={Icons.Italic} title="Italic (Ctrl+I)" />
                <ToolBtn cmd="strikeThrough" icon={Icons.Strikethrough} title="Strikethrough" />
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <ToolBtn cmd="insertUnorderedList" icon={Icons.List} title="Bullet list" />
                <ToolBtn cmd="insertOrderedList" icon={Icons.ListOrdered} title="Numbered list" />
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <button type="button" onClick={() => execCmd("formatBlock", "<blockquote>")} title="Blockquote"
                  className="flex h-7 w-7 items-center justify-center rounded hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors">
                  <Icons.Quote className="h-3.5 w-3.5" />
                </button>
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <ToolBtn cmd="justifyLeft" icon={Icons.AlignLeft} title="Align left" />
                <ToolBtn cmd="justifyCenter" icon={Icons.AlignCenter} title="Align center" />
                <ToolBtn cmd="justifyRight" icon={Icons.AlignRight} title="Align right" />
                <ToolBtn cmd="justifyFull" icon={Icons.AlignJustify} title="Justify" />
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <button type="button" onClick={() => {
                  const url = prompt("Enter link URL:");
                  if (url) execCmd("createLink", url);
                }} title="Insert Link"
                  className="flex h-7 w-7 items-center justify-center rounded hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors">
                  <Icons.Link className="h-3.5 w-3.5" />
                </button>
                <ToolBtn cmd="unlink" icon={Icons.Unlink} title="Remove link" />
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <select
                  onChange={(e) => execCmd("formatBlock", e.target.value)}
                  className="text-xs border border-neutral-200 rounded px-1.5 py-1 text-neutral-600 bg-white outline-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>Heading</option>
                  <option value="<p>">Paragraph</option>
                  <option value="<h2>">Heading 2</option>
                  <option value="<h3>">Heading 3</option>
                  <option value="<h4>">Heading 4</option>
                  <option value="<h5>">Heading 5</option>
                </select>
              </div>
            </div>

            {/* Editor Text Area */}
            {editorMode === "visual" ? (
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                className="min-h-[400px] px-4 py-3 text-sm text-neutral-700 leading-relaxed outline-none font-sans prose prose-sm max-w-none
                  [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
                  [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2
                  [&_blockquote]:border-l-4 [&_blockquote]:border-blue-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-500
                  [&_a]:text-blue-600 [&_a]:underline
                  [&_img]:max-w-full [&_img]:rounded-xl [&_img]:my-4
                  [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5"
                suppressContentEditableWarning
              />
            ) : (
              <textarea
                value={content}
                onChange={(e) => handleTextareaChange(e.target.value)}
                className="w-full min-h-[400px] px-4 py-3 text-xs font-mono text-neutral-700 leading-relaxed outline-none resize-y border-0"
                placeholder="<p>Write or paste HTML code here...</p>"
              />
            )}

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-neutral-200 px-3 py-1.5 text-[11px] text-neutral-400">
              <span>Path: p</span>
              <span>Word count: {wordCount}</span>
            </div>
          </div>

          {/* ── Excerpt ── */}
          <div className={cardCls}>
            <button
              type="button"
              onClick={() => setExcerptExpanded(!excerptExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <span>Excerpt</span>
              <Icons.ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${excerptExpanded ? "rotate-180" : ""}`} />
            </button>
            {excerptExpanded && (
              <div className="px-4 pb-4 border-t border-neutral-100 pt-3">
                <textarea
                  rows={3} value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Write a brief summary for blog index cards..."
                  className={`${inputCls} resize-none font-sans`}
                />
                <p className={helpCls}>Excerpts are optional hand-crafted summaries that appear on blog index cards.</p>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════════════════ */}
          {/* OPTIMIZATION PANELS (Below Editor, Tabbed Layout) */}
          {/* ══════════════════════════════════════════════════ */}
          <div className={cardCls}>
            <div className="border-b border-neutral-200 px-4 py-3">
              <h3 className="text-sm font-bold text-neutral-800 flex items-center gap-2">
                <Icons.Zap className="h-4 w-4 text-amber-500" />
                Engine Optimization
                <span className={`ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  score >= 70 ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                  score >= 40 ? "bg-amber-50 text-amber-600 border border-amber-200" :
                  "bg-red-50 text-red-600 border border-red-200"
                }`}>{score}%</span>
              </h3>
            </div>

            {/* Tab pills */}
            <div className="flex flex-wrap gap-1.5 px-4 py-3 border-b border-neutral-100">
              {OPT_TABS.map(tab => {
                const TabIcon = tab.icon;
                const isActive = activeOptTab === tab.key;
                return (
                  <button key={tab.key} type="button" onClick={() => setActiveOptTab(tab.key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      isActive ? tab.color : "bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                    }`}>
                    <TabIcon className="h-3 w-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="px-4 py-4 flex flex-col gap-4">

              {/* ── SEO & Meta ── */}
              {activeOptTab === "seo" && (
                <>
                  <div>
                    <label className={labelCls}>SEO Title</label>
                    <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)}
                      placeholder="Custom title for search engines (50-60 chars)" className={inputCls} />
                    <p className={helpCls}>{seoTitle.length}/60 characters</p>
                  </div>
                  <div>
                    <label className={labelCls}>Meta Description</label>
                    <textarea rows={2} value={seoDescription} onChange={e => setSeoDescription(e.target.value)}
                      placeholder="Compelling description for SERPs (150-160 chars)" className={`${inputCls} resize-none`} />
                    <p className={helpCls}>{seoDescription.length}/160 characters</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Canonical URL</label>
                      <input type="text" value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)}
                        placeholder="https://..." className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Robots</label>
                      <select value={robotsSettings} onChange={e => setRobotsSettings(e.target.value)} className={inputCls}>
                        <option value="index, follow">index, follow</option>
                        <option value="noindex, follow">noindex, follow</option>
                        <option value="index, nofollow">index, nofollow</option>
                        <option value="noindex, nofollow">noindex, nofollow</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* ── AEO ── */}
              {activeOptTab === "aeo" && (
                <>
                  <p className="text-xs text-neutral-500 bg-violet-50/50 rounded-lg px-3 py-2 border border-violet-100">
                    <strong>Answer Engine Optimization</strong> — Featured snippets, Google SGE, and voice search.
                  </p>
                  <div>
                    <label className={labelCls}>Target Question</label>
                    <input type="text" value={aeoTargetQuestion} onChange={e => setAeoTargetQuestion(e.target.value)}
                      placeholder="e.g. What is the best SEO strategy for 2025?" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Direct Answer (40-60 words)</label>
                    <textarea rows={3} value={aeoDirectAnswer} onChange={e => setAeoDirectAnswer(e.target.value)}
                      placeholder="Write a concise, direct answer that can be featured as a snippet..."
                      className={`${inputCls} resize-none`} />
                  </div>
                  <div>
                    <label className={labelCls}>FAQ Items (for FAQ Schema)</label>
                    {aeoFaqItems.map((faq, i) => (
                      <div key={i} className="flex flex-col gap-2 mb-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                        <input type="text" value={faq.question}
                          onChange={e => { const copy = [...aeoFaqItems]; copy[i].question = e.target.value; setAeoFaqItems(copy); }}
                          placeholder={`Question ${i + 1}`} className={inputCls} />
                        <textarea rows={2} value={faq.answer}
                          onChange={e => { const copy = [...aeoFaqItems]; copy[i].answer = e.target.value; setAeoFaqItems(copy); }}
                          placeholder="Answer..." className={`${inputCls} resize-none`} />
                        {aeoFaqItems.length > 1 && (
                          <button type="button" onClick={() => setAeoFaqItems(aeoFaqItems.filter((_, idx) => idx !== i))}
                            className="self-end text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer">Remove</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => setAeoFaqItems([...aeoFaqItems, { question: "", answer: "" }])}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add FAQ
                    </button>
                  </div>
                  <div>
                    <label className={labelCls}>People Also Ask Questions</label>
                    {paaQuestions.items.map((q, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input type="text" value={q} onChange={e => paaQuestions.update(i, e.target.value)}
                          placeholder={`PAA question ${i + 1}`} className={`${inputCls} flex-1`} />
                        {paaQuestions.items.length > 1 && (
                          <button type="button" onClick={() => paaQuestions.remove(i)}
                            className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={paaQuestions.add}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add PAA Question
                    </button>
                  </div>
                </>
              )}

              {/* ── GEO ── */}
              {activeOptTab === "geo" && (
                <>
                  <p className="text-xs text-neutral-500 bg-emerald-50/50 rounded-lg px-3 py-2 border border-emerald-100">
                    <strong>Generative Engine Optimization</strong> — Statistics, citations, expert quotes for AI overviews.
                  </p>
                  <div>
                    <label className={labelCls}>Statistics with Sources</label>
                    {geoStats.map((s, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                        <input type="text" value={s.stat} onChange={e => { const c = [...geoStats]; c[i].stat = e.target.value; setGeoStats(c); }}
                          placeholder="Statistic" className={inputCls} />
                        <input type="text" value={s.source} onChange={e => { const c = [...geoStats]; c[i].source = e.target.value; setGeoStats(c); }}
                          placeholder="Source name" className={inputCls} />
                        <div className="flex gap-1">
                          <input type="text" value={s.url} onChange={e => { const c = [...geoStats]; c[i].url = e.target.value; setGeoStats(c); }}
                            placeholder="Source URL" className={`${inputCls} flex-1`} />
                          {geoStats.length > 1 && <button type="button" onClick={() => setGeoStats(geoStats.filter((_, idx) => idx !== i))}
                            className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>}
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => setGeoStats([...geoStats, { stat: "", source: "", url: "" }])}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add Statistic
                    </button>
                  </div>
                  <div>
                    <label className={labelCls}>Authoritative Citations</label>
                    {geoCitations.map((c, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                        <input type="text" value={c.source} onChange={e => { const copy = [...geoCitations]; copy[i].source = e.target.value; setGeoCitations(copy); }}
                          placeholder="Source" className={inputCls} />
                        <input type="text" value={c.url} onChange={e => { const copy = [...geoCitations]; copy[i].url = e.target.value; setGeoCitations(copy); }}
                          placeholder="URL" className={inputCls} />
                        <div className="flex gap-1">
                          <input type="text" value={c.claim} onChange={e => { const copy = [...geoCitations]; copy[i].claim = e.target.value; setGeoCitations(copy); }}
                            placeholder="Claim" className={`${inputCls} flex-1`} />
                          {geoCitations.length > 1 && <button type="button" onClick={() => setGeoCitations(geoCitations.filter((_, idx) => idx !== i))}
                            className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>}
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => setGeoCitations([...geoCitations, { source: "", url: "", claim: "" }])}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add Citation
                    </button>
                  </div>
                  <div>
                    <label className={labelCls}>Expert Quotes</label>
                    {geoQuotes.map((q, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                        <input type="text" value={q.quote} onChange={e => { const c = [...geoQuotes]; c[i].quote = e.target.value; setGeoQuotes(c); }}
                          placeholder="Quote text" className={inputCls} />
                        <input type="text" value={q.expert} onChange={e => { const c = [...geoQuotes]; c[i].expert = e.target.value; setGeoQuotes(c); }}
                          placeholder="Expert name" className={inputCls} />
                        <div className="flex gap-1">
                          <input type="text" value={q.title} onChange={e => { const c = [...geoQuotes]; c[i].title = e.target.value; setGeoQuotes(c); }}
                            placeholder="Title/role" className={`${inputCls} flex-1`} />
                          {geoQuotes.length > 1 && <button type="button" onClick={() => setGeoQuotes(geoQuotes.filter((_, idx) => idx !== i))}
                            className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>}
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => setGeoQuotes([...geoQuotes, { quote: "", expert: "", title: "" }])}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add Quote
                    </button>
                  </div>
                </>
              )}

              {/* ── LLMO ── */}
              {activeOptTab === "llmo" && (
                <>
                  <p className="text-xs text-neutral-500 bg-pink-50/50 rounded-lg px-3 py-2 border border-pink-100">
                    <strong>LLM Optimization</strong> — Entity authority and topic clustering.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Primary Entity Name</label>
                      <input type="text" value={llmoEntityName} onChange={e => setLlmoEntityName(e.target.value)}
                        placeholder="e.g. Local SEO" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Topic Cluster</label>
                      <input type="text" value={llmoTopicCluster} onChange={e => setLlmoTopicCluster(e.target.value)}
                        placeholder="e.g. SEO Strategy" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Content Depth</label>
                    <select value={llmoContentDepth} onChange={e => setLlmoContentDepth(e.target.value)} className={inputCls}>
                      <option value="comprehensive">Comprehensive Guide</option>
                      <option value="overview">Overview / Summary</option>
                      <option value="deep-dive">Deep Dive / Technical</option>
                      <option value="comparison">Comparison / Versus</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Related Entities</label>
                    {llmoRelated.items.map((r, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input type="text" value={r} onChange={e => llmoRelated.update(i, e.target.value)}
                          placeholder={`Related entity ${i + 1}`} className={`${inputCls} flex-1`} />
                        {llmoRelated.items.length > 1 && <button type="button" onClick={() => llmoRelated.remove(i)}
                          className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>}
                      </div>
                    ))}
                    <button type="button" onClick={llmoRelated.add}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add Entity
                    </button>
                  </div>
                </>
              )}

              {/* ── VEO ── */}
              {activeOptTab === "veo" && (
                <>
                  <p className="text-xs text-neutral-500 bg-orange-50/50 rounded-lg px-3 py-2 border border-orange-100">
                    <strong>Visual Engine Optimization</strong> — Images, videos, infographics.
                  </p>
                  <div>
                    <label className={labelCls}>Content Images</label>
                    {veoImages.map((img, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                        <input type="text" value={img.url} onChange={e => { const c = [...veoImages]; c[i].url = e.target.value; setVeoImages(c); }}
                          placeholder="Image URL" className={inputCls} />
                        <input type="text" value={img.alt} onChange={e => { const c = [...veoImages]; c[i].alt = e.target.value; setVeoImages(c); }}
                          placeholder="Alt text" className={inputCls} />
                        <div className="flex gap-1">
                          <input type="text" value={img.caption} onChange={e => { const c = [...veoImages]; c[i].caption = e.target.value; setVeoImages(c); }}
                            placeholder="Caption" className={`${inputCls} flex-1`} />
                          {veoImages.length > 1 && <button type="button" onClick={() => setVeoImages(veoImages.filter((_, idx) => idx !== i))}
                            className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>}
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => setVeoImages([...veoImages, { url: "", alt: "", caption: "" }])}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add Image
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Video URL</label>
                      <input type="text" value={veoVideoUrl} onChange={e => setVeoVideoUrl(e.target.value)}
                        placeholder="YouTube/Vimeo embed URL" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Video Title</label>
                      <input type="text" value={veoVideoTitle} onChange={e => setVeoVideoTitle(e.target.value)}
                        placeholder="Video title for schema" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Infographic URL</label>
                    <input type="text" value={veoInfographicUrl} onChange={e => setVeoInfographicUrl(e.target.value)}
                      placeholder="URL of an infographic image" className={inputCls} />
                  </div>
                </>
              )}

              {/* ── CEO ── */}
              {activeOptTab === "ceo" && (
                <>
                  <p className="text-xs text-neutral-500 bg-cyan-50/50 rounded-lg px-3 py-2 border border-cyan-100">
                    <strong>ChatGPT Engine Optimization</strong> — Summaries and actionable steps for ChatGPT citations.
                  </p>
                  <div>
                    <label className={labelCls}>Conversational Summary</label>
                    <textarea rows={3} value={ceoSummary} onChange={e => setCeoSummary(e.target.value)}
                      placeholder="Write a brief, conversational summary..." className={`${inputCls} resize-none`} />
                  </div>
                  <div>
                    <label className={labelCls}>Key Takeaway</label>
                    <input type="text" value={ceoTakeaway} onChange={e => setCeoTakeaway(e.target.value)}
                      placeholder="Single most important sentence" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Actionable Steps</label>
                    {ceoSteps.items.map((s, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold border border-cyan-200">
                          {i + 1}
                        </span>
                        <input type="text" value={s} onChange={e => ceoSteps.update(i, e.target.value)}
                          placeholder={`Step ${i + 1}`} className={`${inputCls} flex-1`} />
                        {ceoSteps.items.length > 1 && <button type="button" onClick={() => ceoSteps.remove(i)}
                          className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>}
                      </div>
                    ))}
                    <button type="button" onClick={ceoSteps.add}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add Step
                    </button>
                  </div>
                </>
              )}

              {/* ── BEO ── */}
              {activeOptTab === "beo" && (
                <>
                  <p className="text-xs text-neutral-500 bg-amber-50/50 rounded-lg px-3 py-2 border border-amber-100">
                    <strong>Brand Engine Optimization</strong> — E-E-A-T credentials and brand signals.
                  </p>
                  <div>
                    <label className={labelCls}>Author Credentials</label>
                    <textarea rows={2} value={beoCredentials} onChange={e => setBeoCredentials(e.target.value)}
                      placeholder="e.g. 5+ years in digital marketing, certified specialist..." className={`${inputCls} resize-none`} />
                  </div>
                  <div>
                    <label className={labelCls}>Brand Mention Format</label>
                    <input type="text" value={beoCompanyMention} onChange={e => setBeoCompanyMention(e.target.value)}
                      placeholder="e.g. Digital World, a full-service agency" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Brand Keywords</label>
                    {beoBrandKw.items.map((k, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input type="text" value={k} onChange={e => beoBrandKw.update(i, e.target.value)}
                          placeholder={`Brand keyword ${i + 1}`} className={`${inputCls} flex-1`} />
                        {beoBrandKw.items.length > 1 && <button type="button" onClick={() => beoBrandKw.remove(i)}
                          className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>}
                      </div>
                    ))}
                    <button type="button" onClick={beoBrandKw.add}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add Keyword
                    </button>
                  </div>
                  <div>
                    <label className={labelCls}>Trust Signals</label>
                    {beoTrust.items.map((t, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input type="text" value={t} onChange={e => beoTrust.update(i, e.target.value)}
                          placeholder={`e.g. "5 years experience", "200+ clients"`} className={`${inputCls} flex-1`} />
                        {beoTrust.items.length > 1 && <button type="button" onClick={() => beoTrust.remove(i)}
                          className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>}
                      </div>
                    ))}
                    <button type="button" onClick={beoTrust.add}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add Trust Signal
                    </button>
                  </div>
                </>
              )}

              {/* ── MSEO ── */}
              {activeOptTab === "mseo" && (
                <>
                  <p className="text-xs text-neutral-500 bg-indigo-50/50 rounded-lg px-3 py-2 border border-indigo-100">
                    <strong>Multimodal SEO</strong> — Tables, definitions, format signals.
                  </p>
                  <div>
                    <label className={labelCls}>Content Format</label>
                    <select value={mseoFormat} onChange={e => setMseoFormat(e.target.value)} className={inputCls}>
                      <option value="text">Text Only</option>
                      <option value="text+video">Text + Video</option>
                      <option value="text+infographic">Text + Infographic</option>
                      <option value="text+audio">Text + Audio</option>
                      <option value="all">All Formats</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Key Definitions</label>
                    {mseoDefinitions.map((d, i) => (
                      <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                        <input type="text" value={d.term} onChange={e => { const c = [...mseoDefinitions]; c[i].term = e.target.value; setMseoDefinitions(c); }}
                          placeholder="Term" className={inputCls} />
                        <div className="flex gap-1">
                          <input type="text" value={d.definition} onChange={e => { const c = [...mseoDefinitions]; c[i].definition = e.target.value; setMseoDefinitions(c); }}
                            placeholder="Definition" className={`${inputCls} flex-1`} />
                          {mseoDefinitions.length > 1 && <button type="button" onClick={() => setMseoDefinitions(mseoDefinitions.filter((_, idx) => idx !== i))}
                            className="text-red-400 hover:text-red-600 cursor-pointer"><Icons.X className="h-4 w-4" /></button>}
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => setMseoDefinitions([...mseoDefinitions, { term: "", definition: "" }])}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Icons.Plus className="h-3 w-3" /> Add Definition
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════ */}
        {/* RIGHT COLUMN: Sidebar                            */}
        {/* ════════════════════════════════════════════════ */}
        <div className="lg:col-span-4 flex flex-col gap-5">

          {/* ── Publish Box ── */}
          <div className={cardCls}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-800">Publish</h3>
            </div>
            <div className="px-4 py-3 flex flex-col gap-3">
              {/* Save Draft / Preview */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setIsDraft(true); savePost(true); }}
                  disabled={isSaving}
                  className="flex-1 py-2 px-3 text-xs font-semibold border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="flex-1 py-2 px-3 text-xs font-semibold border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Preview
                </button>
              </div>

              <div className="flex flex-col gap-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Icons.Key className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Status: <strong>{isDraft ? "Draft" : "Published"}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Eye className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Visibility: <strong>Public</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Calendar className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Publish: <strong>Immediately</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                <button
                  type="button"
                  onClick={handleMoveToTrash}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                >
                  Move to Trash
                </button>
                <button
                  type="button"
                  onClick={() => { setIsDraft(false); savePost(false); }}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-200 px-5 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer border-0"
                >
                  {isSaving ? <><Icons.Loader2 className="h-3.5 w-3.5 animate-spin" /> Publishing...</> : "Publish"}
                </button>
              </div>
            </div>
          </div>

          {/* ── Format ── */}
          <div className={cardCls}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-800">Format</h3>
            </div>
            <div className="px-4 py-3 flex flex-col gap-1.5">
              {[
                { value: "standard", label: "Standard", icon: Icons.Pin },
                { value: "image", label: "Image", icon: Icons.Image },
                { value: "video", label: "Video", icon: Icons.Video },
                { value: "quote", label: "Quote", icon: Icons.Quote },
                { value: "link", label: "Link", icon: Icons.Link },
              ].map(f => (
                <label key={f.value} className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer py-0.5">
                  <input
                    type="radio"
                    name="format"
                    value={f.value}
                    checked={postFormat === f.value}
                    onChange={() => setPostFormat(f.value)}
                    className="accent-blue-600"
                  />
                  <f.icon className="h-3.5 w-3.5 text-neutral-400" />
                  {f.label}
                </label>
              ))}
            </div>
          </div>

          {/* ── Categories ── */}
          <div className={cardCls}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-800">Categories</h3>
            </div>
            <div className="px-4 py-3">
              <div className="flex flex-col gap-1.5 max-h-44 overflow-y-auto mb-3">
                {categoriesList.map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer py-0.5">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={categoryName === cat}
                      onChange={() => setCategoryName(cat)}
                      className="accent-blue-600"
                    />
                    {cat}
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddNewCategory}
                className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <Icons.Plus className="h-3 w-3" /> Add New Category
              </button>
            </div>
          </div>

          {/* ── Tags ── */}
          <div className={cardCls}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-800">Tags</h3>
            </div>
            <div className="px-4 py-3">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInputText}
                  onChange={e => setTagInputText(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tags (press Enter or comma)"
                  className={`${inputCls} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold cursor-pointer"
                >
                  Add
                </button>
              </div>
              <p className={helpCls}>Separate tags with commas or press Enter.</p>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-600 cursor-pointer"
                      >
                        <Icons.X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Featured Image (WITH FILE UPLOAD) ── */}
          <div className={cardCls}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-800">Featured Image</h3>
            </div>
            <div className="px-4 py-3 flex flex-col gap-3">
              {/* File Upload Button */}
              <input
                ref={featuredFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadFeaturedImage(file);
                }}
              />
              
              <button
                type="button"
                onClick={() => featuredFileInputRef.current?.click()}
                disabled={isUploadingFeatured}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
              >
                {isUploadingFeatured ? (
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
                onChange={e => setFeaturedImage(e.target.value)}
                placeholder="Image URL (e.g. https://...)"
                className={inputCls}
              />
              <input
                type="text"
                value={imageAltText}
                onChange={e => setImageAltText(e.target.value)}
                placeholder="Alt text (SEO description of image)"
                className={inputCls}
              />

              {featuredImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featuredImage} alt={imageAltText || "Preview"} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage("")}
                    className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                    title="Remove Featured Image"
                  >
                    <Icons.X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Optimization Score ── */}
          <div className={cardCls}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                <Icons.BarChart3 className="h-4 w-4 text-blue-500" />
                Optimization Score
              </h3>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-center mb-4">
                <div className={`relative flex items-center justify-center h-20 w-20 rounded-full border-4 ${
                  score >= 70 ? "border-emerald-400" : score >= 40 ? "border-amber-400" : "border-red-400"
                }`}>
                  <span className={`text-2xl font-bold ${
                    score >= 70 ? "text-emerald-600" : score >= 40 ? "text-amber-600" : "text-red-600"
                  }`}>{score}%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: "SEO", filled: [seoTitle, seoDescription, canonicalUrl, imageAltText].filter(Boolean).length, total: 4, color: "bg-blue-500" },
                  { label: "AEO", filled: [aeoTargetQuestion, aeoDirectAnswer, aeoFaqItems.some(f => f.question && f.answer)].filter(Boolean).length, total: 3, color: "bg-violet-500" },
                  { label: "GEO", filled: [geoStats.some(s => s.stat), geoCitations.some(c => c.source)].filter(Boolean).length, total: 2, color: "bg-emerald-500" },
                  { label: "LLMO", filled: [llmoEntityName, llmoTopicCluster, llmoRelated.items.some(r => r)].filter(Boolean).length, total: 3, color: "bg-pink-500" },
                  { label: "VEO", filled: [veoImages.some(i => i.url), veoVideoUrl || veoInfographicUrl].filter(Boolean).length, total: 2, color: "bg-orange-500" },
                  { label: "CEO", filled: [ceoSummary, ceoTakeaway, ceoSteps.items.some(s => s)].filter(Boolean).length, total: 3, color: "bg-cyan-500" },
                  { label: "BEO", filled: [beoCredentials, beoCompanyMention].filter(Boolean).length, total: 2, color: "bg-amber-500" },
                  { label: "MSEO", filled: [mseoFormat !== "text", mseoDefinitions.some(d => d.term)].filter(Boolean).length, total: 2, color: "bg-indigo-500" },
                ].map(cat => (
                  <div key={cat.label} className="flex items-center gap-2 text-xs">
                    <span className="w-10 font-semibold text-neutral-500">{cat.label}</span>
                    <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.color} rounded-full transition-all duration-300`}
                        style={{ width: `${(cat.filled / cat.total) * 100}%` }} />
                    </div>
                    <span className="w-7 text-right text-neutral-400">{cat.filled}/{cat.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </form>

      {/* ══════════════════════════════════════════════════ */}
      {/* WORDPRESS MEDIA MODAL (FILE UPLOAD + URL)          */}
      {/* ══════════════════════════════════════════════════ */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-neutral-100">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <Icons.ImagePlus className="h-5 w-5 text-blue-600" />
                Add Media to Content
              </h3>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors"
              >
                <Icons.X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-neutral-200 mb-5">
              <button
                type="button"
                onClick={() => setMediaTab("upload")}
                className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  mediaTab === "upload" ? "border-blue-600 text-blue-600" : "border-transparent text-neutral-400 hover:text-neutral-600"
                }`}
              >
                Upload Files from Computer
              </button>
              <button
                type="button"
                onClick={() => setMediaTab("url")}
                className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  mediaTab === "url" ? "border-blue-600 text-blue-600" : "border-transparent text-neutral-400 hover:text-neutral-600"
                }`}
              >
                Insert from URL
              </button>
            </div>

            {/* Tab 1: Upload Files */}
            {mediaTab === "upload" && (
              <div className="flex flex-col gap-4">
                <input
                  ref={mediaFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadContentImage(file);
                  }}
                />

                <div
                  onClick={() => mediaFileInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-neutral-50/50 hover:bg-blue-50/20 transition-all cursor-pointer group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Icons.UploadCloud className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-sm text-neutral-800 mb-1">
                    {isUploadingMedia ? "Uploading image file..." : "Click to select image file from computer"}
                  </h4>
                  <p className="text-xs text-neutral-400">Supports PNG, JPG, WebP, GIF, SVG</p>
                </div>

                <div>
                  <label className={labelCls}>Alt Text / Description (Optional)</label>
                  <input
                    type="text"
                    value={mediaAltInput}
                    onChange={e => setMediaAltInput(e.target.value)}
                    placeholder="Describe the image..."
                    className={inputCls}
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Insert from URL */}
            {mediaTab === "url" && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelCls}>Image URL</label>
                  <input
                    type="text"
                    value={mediaUrlInput}
                    onChange={e => setMediaUrlInput(e.target.value)}
                    placeholder="https://..."
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Alt Text / Description</label>
                  <input
                    type="text"
                    value={mediaAltInput}
                    onChange={e => setMediaAltInput(e.target.value)}
                    placeholder="Describe the image..."
                    className={inputCls}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleInsertMediaFromUrl}
                  disabled={!mediaUrlInput.trim()}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-200 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  Insert into Post
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════ */}
      {/* LIVE PREVIEW MODAL                                */}
      {/* ══════════════════════════════════════════════════ */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <Icons.Eye className="h-4 w-4" /> Live Website Preview
              </span>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors"
              >
                <Icons.X className="h-4 w-4" />
              </button>
            </div>

            {/* Preview Post Body */}
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {categoryName}
                </span>
                <span className="text-xs text-neutral-400">
                  Preview Mode · {wordCount > 0 ? `${Math.max(1, Math.round(wordCount / 200))} min read` : "1 min read"}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                {title || "Untitled Article Title"}
              </h1>

              <div className="flex items-center gap-3 pt-3 border-t border-neutral-100 mb-8">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-neutral-200">
                  <Image src="/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg" alt="Author" fill className="object-cover" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">Kamrujjaman Mufti</div>
                  <div className="text-[11px] text-neutral-400">Founder & Digital Marketing Expert</div>
                </div>
              </div>

              {aeoDirectAnswer && (
                <div className="mb-8 rounded-xl bg-blue-50 border border-blue-100 p-5">
                  <div className="text-xs font-bold text-blue-700 mb-1 flex items-center gap-1.5">
                    <Icons.Zap className="h-3.5 w-3.5 text-amber-500" />
                    Quick Answer: {aeoTargetQuestion || title}
                  </div>
                  <p className="text-sm text-neutral-800 leading-relaxed font-medium">{aeoDirectAnswer}</p>
                </div>
              )}

              {featuredImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 mb-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featuredImage} alt={imageAltText || title} className="w-full h-full object-cover" />
                </div>
              )}

              {excerpt && (
                <p className="text-base font-medium text-neutral-600 mb-6 italic border-l-4 border-blue-600 pl-4 py-1">
                  {excerpt}
                </p>
              )}

              <div
                className="prose prose-neutral max-w-none text-sm text-neutral-700 leading-relaxed space-y-4 mb-10"
                dangerouslySetInnerHTML={{ __html: content || "<p>Type your article body to preview it live here...</p>" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
