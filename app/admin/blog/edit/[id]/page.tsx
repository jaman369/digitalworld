"use client";

import { useEffect, useState, useRef, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

interface FaqItem { question: string; answer: string; }
interface CitationItem { source: string; url: string; claim: string; }
interface StatItem { stat: string; source: string; url: string; }
interface QuoteItem { quote: string; expert: string; title: string; }
interface VeoImage { url: string; alt: string; caption: string; }
interface DefinitionItem { term: string; definition: string; }

function safeParseArray<T>(json: string | null | undefined, fallback: T[]): T[] {
  if (!json) return fallback;
  try { const parsed = JSON.parse(json); return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback; } catch { return fallback; }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPostPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);
  const featuredFileInputRef = useRef<HTMLInputElement>(null);

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

  // ── SEO ──
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [robotsSettings, setRobotsSettings] = useState("index, follow");

  // ── Optimization fields ──
  const [aeoTargetQuestion, setAeoTargetQuestion] = useState("");
  const [aeoDirectAnswer, setAeoDirectAnswer] = useState("");
  const [aeoFaqItems, setAeoFaqItems] = useState<FaqItem[]>([{ question: "", answer: "" }]);
  const [paaItems, setPaaItems] = useState<string[]>([""]);

  const [geoStats, setGeoStats] = useState<StatItem[]>([{ stat: "", source: "", url: "" }]);
  const [geoCitations, setGeoCitations] = useState<CitationItem[]>([{ source: "", url: "", claim: "" }]);
  const [geoQuotes, setGeoQuotes] = useState<QuoteItem[]>([{ quote: "", expert: "", title: "" }]);

  const [llmoEntityName, setLlmoEntityName] = useState("");
  const [llmoTopicCluster, setLlmoTopicCluster] = useState("");
  const [llmoRelated, setLlmoRelated] = useState<string[]>([""]);
  const [llmoContentDepth, setLlmoContentDepth] = useState("comprehensive");

  const [veoImages, setVeoImages] = useState<VeoImage[]>([{ url: "", alt: "", caption: "" }]);
  const [veoVideoUrl, setVeoVideoUrl] = useState("");
  const [veoVideoTitle, setVeoVideoTitle] = useState("");
  const [veoInfographicUrl, setVeoInfographicUrl] = useState("");

  const [ceoSummary, setCeoSummary] = useState("");
  const [ceoTakeaway, setCeoTakeaway] = useState("");
  const [ceoSteps, setCeoSteps] = useState<string[]>([""]);

  const [beoCredentials, setBeoCredentials] = useState("");
  const [beoCompanyMention, setBeoCompanyMention] = useState("");
  const [beoBrandKw, setBeoBrandKw] = useState<string[]>([""]);
  const [beoTrust, setBeoTrust] = useState<string[]>([""]);

  const [mseoFormat, setMseoFormat] = useState("text");
  const [mseoDefinitions, setMseoDefinitions] = useState<DefinitionItem[]>([{ term: "", definition: "" }]);

  // ── UI state ──
  const [activeOptTab, setActiveOptTab] = useState<OptTab>("seo");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // ── Load post data ──
  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch("/api/admin/blog");
        if (res.ok) {
          const list = await res.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const item = list.find((p: any) => p.id === id);
          if (item) {
            setTitle(item.title || "");
            setSlug(item.slug || "");
            setExcerpt(item.excerpt || "");
            setContent(item.content || "");
            setFeaturedImage(item.featuredImage || "");
            setImageAltText(item.imageAltText || "");
            setCategoryName(item.category?.name || item.categoryName || "SEO");
            setIsDraft(item.isDraft);
            setTags(item.tags || []);
            // SEO
            setSeoTitle(item.seoTitle || "");
            setSeoDescription(item.seoDescription || "");
            setCanonicalUrl(item.canonicalUrl || "");
            setRobotsSettings(item.robotsSettings || "index, follow");
            // AEO
            setAeoTargetQuestion(item.aeoTargetQuestion || "");
            setAeoDirectAnswer(item.aeoDirectAnswer || "");
            setAeoFaqItems(safeParseArray(item.aeoFaqItems, [{ question: "", answer: "" }]));
            setPaaItems(safeParseArray(item.aeoPaaQuestions, [""]));
            // GEO
            setGeoStats(safeParseArray(item.geoStatistics, [{ stat: "", source: "", url: "" }]));
            setGeoCitations(safeParseArray(item.geoCitations, [{ source: "", url: "", claim: "" }]));
            setGeoQuotes(safeParseArray(item.geoExpertQuotes, [{ quote: "", expert: "", title: "" }]));
            // LLMO
            setLlmoEntityName(item.llmoEntityName || "");
            setLlmoTopicCluster(item.llmoTopicCluster || "");
            setLlmoRelated(safeParseArray(item.llmoRelatedEntities, [""]));
            setLlmoContentDepth(item.llmoContentDepth || "comprehensive");
            // VEO
            setVeoImages(safeParseArray(item.veoImages, [{ url: "", alt: "", caption: "" }]));
            setVeoVideoUrl(item.veoVideoUrl || "");
            setVeoVideoTitle(item.veoVideoTitle || "");
            setVeoInfographicUrl(item.veoInfographicUrl || "");
            // CEO
            setCeoSummary(item.ceoConversationalSummary || "");
            setCeoTakeaway(item.ceoPrimaryKeyTakeaway || "");
            setCeoSteps(safeParseArray(item.ceoActionableSteps, [""]));
            // BEO
            setBeoCredentials(item.beoAuthorCredentials || "");
            setBeoCompanyMention(item.beoCompanyMention || "");
            setBeoBrandKw(safeParseArray(item.beoBrandKeywords, [""]));
            setBeoTrust(safeParseArray(item.beoTrustSignals, [""]));
            // MSEO
            setMseoFormat(item.mseoContentFormat || "text");
            setMseoDefinitions(safeParseArray(item.mseoKeyDefinitions, [{ term: "", definition: "" }]));
            
            const text = (item.content || "").replace(/<[^>]*>/g, "");
            setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
          } else {
            setError("Blog post not found");
          }
        }
      } catch (err) {
        console.error("Load post error:", err);
        setError("Failed to load blog post");
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [id]);

  useEffect(() => {
    if (!isLoading && editorRef.current && content && editorMode === "visual") {
      editorRef.current.innerHTML = content;
    }
  }, [isLoading, content, editorMode]);

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
    setWordCount(val.replace(/<[^>]*>/g, "").trim() ? val.replace(/<[^>]*>/g, "").trim().split(/\s+/).length : 0);
  };

  const switchToVisual = () => {
    setEditorMode("visual");
    setTimeout(() => { if (editorRef.current) editorRef.current.innerHTML = content; }, 0);
  };

  const switchToText = () => {
    if (editorRef.current) setContent(editorRef.current.innerHTML);
    setEditorMode("text");
  };

  // ── IMAGE UPLOAD HANDLERS ──
  const handleUploadContentImage = async (file: File) => {
    setIsUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      insertImageIntoEditor(data.url, mediaAltInput || file.name);
      setShowMediaModal(false);
      setMediaUrlInput("");
      setMediaAltInput("");
    } catch (err) {
      alert("Failed to upload image.");
      console.error(err);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleUploadFeaturedImage = async (file: File) => {
    setIsUploadingFeatured(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
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

  const insertImageIntoEditor = (url: string, altText: string) => {
    if (editorMode === "visual") {
      execCmd("insertImage", url);
    } else {
      const imgHtml = `<img src="${url}" alt="${altText || 'Image'}" class="w-full rounded-xl my-4" />`;
      setContent(prev => prev + "\n" + imgHtml);
    }
  };

  const handleAddNewCategory = () => {
    const newCat = prompt("Enter new Category Name:");
    if (newCat && newCat.trim()) {
      const trimmed = newCat.trim();
      if (!categoriesList.includes(trimmed)) setCategoriesList(prev => [...prev, trimmed]);
      setCategoryName(trimmed);
    }
  };

  const handleAddTag = (e?: React.KeyboardEvent) => {
    if (e && e.key !== "Enter" && e.key !== ",") return;
    if (e) e.preventDefault();
    if (tagInputText.trim()) {
      const newTag = tagInputText.trim().replace(/^,|,$/g, "");
      if (newTag && !tags.includes(newTag)) setTags([...tags, newTag]);
      setTagInputText("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => setTags(tags.filter(t => t !== tagToRemove));

  const calcScore = () => {
    let filled = 0, total = 0;
    total += 4; if (seoTitle) filled++; if (seoDescription) filled++; if (canonicalUrl) filled++; if (imageAltText) filled++;
    total += 3; if (aeoTargetQuestion) filled++; if (aeoDirectAnswer) filled++; if (aeoFaqItems.some(f => f.question && f.answer)) filled++;
    total += 2; if (geoStats.some(s => s.stat)) filled++; if (geoCitations.some(c => c.source)) filled++;
    total += 3; if (llmoEntityName) filled++; if (llmoTopicCluster) filled++; if (llmoRelated.some(r => r)) filled++;
    total += 2; if (veoImages.some(i => i.url)) filled++; if (veoVideoUrl || veoInfographicUrl) filled++;
    total += 3; if (ceoSummary) filled++; if (ceoTakeaway) filled++; if (ceoSteps.some(s => s)) filled++;
    total += 2; if (beoCredentials) filled++; if (beoCompanyMention) filled++;
    total += 2; if (mseoFormat !== "text") filled++; if (mseoDefinitions.some(d => d.term)) filled++;
    return Math.round((filled / total) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    let finalContent = content;
    if (editorMode === "visual" && editorRef.current) finalContent = editorRef.current.innerHTML;

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id, title, slug, excerpt, content: finalContent,
          featuredImage, imageAltText, categoryName, isDraft, tags,
          seoTitle, seoDescription, canonicalUrl, robotsSettings,
          aeoTargetQuestion, aeoDirectAnswer,
          aeoFaqItems: JSON.stringify(aeoFaqItems.filter(f => f.question)),
          aeoPaaQuestions: JSON.stringify(paaItems.filter(Boolean)),
          geoStatistics: JSON.stringify(geoStats.filter(s => s.stat)),
          geoCitations: JSON.stringify(geoCitations.filter(c => c.source)),
          geoExpertQuotes: JSON.stringify(geoQuotes.filter(q => q.quote)),
          llmoEntityName, llmoTopicCluster,
          llmoRelatedEntities: JSON.stringify(llmoRelated.filter(Boolean)),
          llmoContentDepth,
          veoImages: JSON.stringify(veoImages.filter(img => img.url)),
          veoVideoUrl, veoVideoTitle, veoInfographicUrl,
          ceoConversationalSummary: ceoSummary,
          ceoPrimaryKeyTakeaway: ceoTakeaway,
          ceoActionableSteps: JSON.stringify(ceoSteps.filter(Boolean)),
          beoAuthorCredentials: beoCredentials, beoCompanyMention,
          beoBrandKeywords: JSON.stringify(beoBrandKw.filter(Boolean)),
          beoTrustSignals: JSON.stringify(beoTrust.filter(Boolean)),
          mseoContentFormat: mseoFormat, mseoTableData: "[]",
          mseoKeyDefinitions: JSON.stringify(mseoDefinitions.filter(d => d.term)),
        }),
      });
      if (res.ok) { router.push("/admin/blog"); router.refresh(); }
      else { const data = await res.json(); throw new Error(data.error || "Failed to update"); }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      if (res.ok) { router.push("/admin/blog"); router.refresh(); }
      else { const data = await res.json(); throw new Error(data.error || "Failed to delete"); }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsDeleting(false);
    }
  };

  const inputCls = "w-full rounded-lg border border-neutral-200 bg-white py-2 px-3 text-sm outline-none text-neutral-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all";
  const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5";
  const cardCls = "bg-white border border-neutral-200 rounded-lg shadow-sm";

  const ToolBtn = ({ cmd, icon: Icon, title: t, val }: { cmd: string; icon: React.ComponentType<{className?:string}>; title: string; val?: string }) => (
    <button type="button" onClick={() => execCmd(cmd, val)} title={t}
      className="flex h-7 w-7 items-center justify-center rounded hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors">
      <Icon className="h-3.5 w-3.5" />
    </button>
  );

  const score = calcScore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-700 transition-colors shadow-sm">
            <Icons.ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-neutral-900 tracking-tight leading-none mb-1">Edit Article</h1>
            <p className="font-sans text-xs text-neutral-400">{title || "Loading..."}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setShowPreviewModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-xs cursor-pointer">
            <Icons.Eye className="h-3.5 w-3.5 text-neutral-500" /> Preview
          </button>
          <button type="button" onClick={handleDelete} disabled={isDeleting}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 font-sans text-xs font-bold text-red-600 shadow-xs transition-all cursor-pointer disabled:opacity-50">
            <Icons.Trash className="h-3.5 w-3.5" /> {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-semibold">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" /><span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 flex flex-col gap-5">
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Enter title here"
            className="w-full rounded-lg border border-neutral-200 bg-white py-3 px-4 text-xl font-serif font-bold outline-none text-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 placeholder:text-neutral-300" />

          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="font-semibold">Permalink:</span>
            <span className="text-neutral-400">/blog/</span>
            <input type="text" required value={slug} onChange={e => setSlug(e.target.value)}
              className="border-b border-dashed border-neutral-300 bg-transparent py-0.5 px-1 text-xs font-mono text-neutral-700 outline-none focus:border-blue-500 min-w-[200px]" />
          </div>

          <div className={cardCls}>
            <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-2 bg-neutral-50/50">
              <button type="button" onClick={() => setShowMediaModal(true)}
                className="inline-flex items-center gap-1.5 rounded border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 shadow-2xs transition-colors cursor-pointer">
                <Icons.ImagePlus className="h-4 w-4 text-blue-600" /> Add Media
              </button>

              <div className="flex border border-neutral-200 rounded overflow-hidden text-xs font-semibold">
                <button type="button" onClick={switchToVisual}
                  className={`px-3.5 py-1.5 transition-colors cursor-pointer ${editorMode === "visual" ? "bg-white text-neutral-800 shadow-2xs font-bold" : "bg-neutral-100 text-neutral-500"}`}>Visual</button>
                <button type="button" onClick={switchToText}
                  className={`px-3.5 py-1.5 transition-colors cursor-pointer ${editorMode === "text" ? "bg-white text-neutral-800 shadow-2xs font-bold" : "bg-neutral-100 text-neutral-500"}`}>Text</button>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-1.5 bg-white">
              <div className="flex items-center gap-0.5 flex-wrap">
                <ToolBtn cmd="bold" icon={Icons.Bold} title="Bold" />
                <ToolBtn cmd="italic" icon={Icons.Italic} title="Italic" />
                <ToolBtn cmd="strikeThrough" icon={Icons.Strikethrough} title="Strikethrough" />
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <ToolBtn cmd="insertUnorderedList" icon={Icons.List} title="Bullet list" />
                <ToolBtn cmd="insertOrderedList" icon={Icons.ListOrdered} title="Numbered list" />
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <button type="button" onClick={() => execCmd("formatBlock", "<blockquote>")} title="Blockquote"
                  className="flex h-7 w-7 items-center justify-center rounded hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900"><Icons.Quote className="h-3.5 w-3.5" /></button>
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <ToolBtn cmd="justifyLeft" icon={Icons.AlignLeft} title="Left" />
                <ToolBtn cmd="justifyCenter" icon={Icons.AlignCenter} title="Center" />
                <ToolBtn cmd="justifyRight" icon={Icons.AlignRight} title="Right" />
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <button type="button" onClick={() => { const url = prompt("Enter link URL:"); if (url) execCmd("createLink", url); }} title="Link"
                  className="flex h-7 w-7 items-center justify-center rounded hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900"><Icons.Link className="h-3.5 w-3.5" /></button>
                <ToolBtn cmd="unlink" icon={Icons.Unlink} title="Unlink" />
                <div className="w-px h-5 bg-neutral-200 mx-1" />
                <select onChange={e => execCmd("formatBlock", e.target.value)}
                  className="text-xs border border-neutral-200 rounded px-1.5 py-1 text-neutral-600 bg-white outline-none cursor-pointer" defaultValue="">
                  <option value="" disabled>Heading</option>
                  <option value="<p>">Paragraph</option>
                  <option value="<h2>">Heading 2</option>
                  <option value="<h3>">Heading 3</option>
                  <option value="<h4>">Heading 4</option>
                </select>
              </div>
            </div>

            {editorMode === "visual" ? (
              <div ref={editorRef} contentEditable onInput={handleEditorInput}
                className="min-h-[400px] px-4 py-3 text-sm text-neutral-700 leading-relaxed outline-none font-sans prose prose-sm max-w-none
                  [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2
                  [&_blockquote]:border-l-4 [&_blockquote]:border-blue-300 [&_blockquote]:pl-4 [&_blockquote]:italic
                  [&_a]:text-blue-600 [&_a]:underline [&_img]:max-w-full [&_img]:rounded-xl [&_img]:my-4"
                suppressContentEditableWarning />
            ) : (
              <textarea value={content} onChange={e => handleTextareaChange(e.target.value)}
                className="w-full min-h-[400px] px-4 py-3 text-xs font-mono text-neutral-700 leading-relaxed outline-none resize-y border-0" />
            )}
            <div className="flex items-center justify-between border-t border-neutral-200 px-3 py-1.5 text-[11px] text-neutral-400">
              <span>Path: p</span>
              <span>Word count: {wordCount}</span>
            </div>
          </div>

          <div className={cardCls}>
            <button type="button" onClick={() => setExcerptExpanded(!excerptExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer">
              <span>Excerpt</span>
              <Icons.ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${excerptExpanded ? "rotate-180" : ""}`} />
            </button>
            {excerptExpanded && (
              <div className="px-4 pb-4 border-t border-neutral-100 pt-3">
                <textarea rows={3} value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Brief summary..." className={`${inputCls} resize-none`} />
              </div>
            )}
          </div>

          <div className={cardCls}>
            <div className="border-b border-neutral-200 px-4 py-3">
              <h3 className="text-sm font-bold text-neutral-800 flex items-center gap-2">
                <Icons.Zap className="h-4 w-4 text-amber-500" /> Engine Optimization
                <span className={`ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full ${score >= 70 ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : score >= 40 ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-red-50 text-red-600 border border-red-200"}`}>{score}%</span>
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 px-4 py-3 border-b border-neutral-100">
              {OPT_TABS.map(tab => {
                const TabIcon = tab.icon;
                return (
                  <button key={tab.key} type="button" onClick={() => setActiveOptTab(tab.key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${activeOptTab === tab.key ? tab.color : "bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50"}`}>
                    <TabIcon className="h-3 w-3" />{tab.label}
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-4 flex flex-col gap-4">
              {activeOptTab === "seo" && (<>
                <div><label className={labelCls}>SEO Title</label><input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>Meta Description</label><textarea rows={2} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} className={`${inputCls} resize-none`} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>Canonical URL</label><input type="text" value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Robots</label><select value={robotsSettings} onChange={e => setRobotsSettings(e.target.value)} className={inputCls}><option>index, follow</option><option>noindex, follow</option><option>index, nofollow</option><option>noindex, nofollow</option></select></div>
                </div>
              </>)}
              {activeOptTab === "aeo" && (<>
                <div><label className={labelCls}>Target Question</label><input type="text" value={aeoTargetQuestion} onChange={e => setAeoTargetQuestion(e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>Direct Answer</label><textarea rows={3} value={aeoDirectAnswer} onChange={e => setAeoDirectAnswer(e.target.value)} className={`${inputCls} resize-none`} /></div>
                <div>
                  <label className={labelCls}>FAQ Items</label>
                  {aeoFaqItems.map((faq, i) => (<div key={i} className="flex flex-col gap-2 mb-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                    <input type="text" value={faq.question} onChange={e => { const c = [...aeoFaqItems]; c[i].question = e.target.value; setAeoFaqItems(c); }} placeholder={`Q${i+1}`} className={inputCls} />
                    <textarea rows={2} value={faq.answer} onChange={e => { const c = [...aeoFaqItems]; c[i].answer = e.target.value; setAeoFaqItems(c); }} placeholder="Answer" className={`${inputCls} resize-none`} />
                    {aeoFaqItems.length > 1 && <button type="button" onClick={() => setAeoFaqItems(aeoFaqItems.filter((_,idx)=>idx!==i))} className="self-end text-xs text-red-500 font-semibold cursor-pointer">Remove</button>}
                  </div>))}
                  <button type="button" onClick={() => setAeoFaqItems([...aeoFaqItems, {question:"",answer:""}])} className="text-xs text-blue-600 font-semibold flex items-center gap-1 cursor-pointer"><Icons.Plus className="h-3 w-3" /> Add FAQ</button>
                </div>
              </>)}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800">Publish</h3></div>
            <div className="px-4 py-3 flex flex-col gap-3">
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsDraft(true)} className="flex-1 py-2 px-3 text-xs font-semibold border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 cursor-pointer">Save Draft</button>
                <button type="button" onClick={() => setShowPreviewModal(true)} className="flex-1 py-2 px-3 text-xs font-semibold border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 cursor-pointer">Preview</button>
              </div>
              <div className="flex flex-col gap-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2"><Icons.Key className="h-3.5 w-3.5 text-neutral-400"/><span>Status: <strong>{isDraft?"Draft":"Published"}</strong></span></div>
                <div className="flex items-center gap-2"><Icons.Eye className="h-3.5 w-3.5 text-neutral-400"/><span>Visibility: <strong>Public</strong></span></div>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                <button type="button" onClick={handleDelete} className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer">Move to Trash</button>
                <button type="submit" disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-200 px-5 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer border-0">
                  {isSaving ? <><Icons.Loader2 className="h-3.5 w-3.5 animate-spin"/>Saving...</> : "Update"}
                </button>
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800">Format</h3></div>
            <div className="px-4 py-3 flex flex-col gap-1.5">
              {[
                { value: "standard", label: "Standard", icon: Icons.Pin },
                { value: "image", label: "Image", icon: Icons.Image },
                { value: "video", label: "Video", icon: Icons.Video },
                { value: "quote", label: "Quote", icon: Icons.Quote },
                { value: "link", label: "Link", icon: Icons.Link },
              ].map(f => (
                <label key={f.value} className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer py-0.5">
                  <input type="radio" name="format" value={f.value} checked={postFormat === f.value} onChange={() => setPostFormat(f.value)} className="accent-blue-600" />
                  <f.icon className="h-3.5 w-3.5 text-neutral-400" />
                  {f.label}
                </label>
              ))}
            </div>
          </div>

          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800">Categories</h3></div>
            <div className="px-4 py-3">
              <div className="flex flex-col gap-1.5 max-h-44 overflow-y-auto mb-3">
                {categoriesList.map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer py-0.5">
                    <input type="radio" name="category" value={cat} checked={categoryName === cat} onChange={() => setCategoryName(cat)} className="accent-blue-600" />
                    {cat}
                  </label>
                ))}
              </div>
              <button type="button" onClick={handleAddNewCategory} className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                <Icons.Plus className="h-3 w-3" /> Add New Category
              </button>
            </div>
          </div>

          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800">Tags</h3></div>
            <div className="px-4 py-3">
              <div className="flex gap-2 mb-2">
                <input type="text" value={tagInputText} onChange={e => setTagInputText(e.target.value)} onKeyDown={handleAddTag} placeholder="Add tags" className={`${inputCls} flex-1`} />
                <button type="button" onClick={() => handleAddTag()} className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold cursor-pointer">Add</button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
                      {t}
                      <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-red-600 cursor-pointer"><Icons.X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800">Featured Image</h3></div>
            <div className="px-4 py-3 flex flex-col gap-3">
              <input ref={featuredFileInputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadFeaturedImage(f); }} />
              <button type="button" onClick={() => featuredFileInputRef.current?.click()} disabled={isUploadingFeatured}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer">
                {isUploadingFeatured ? <><Icons.Loader2 className="h-4 w-4 animate-spin" /> Uploading...</> : <><Icons.UploadCloud className="h-4 w-4 text-blue-600" /> Upload Image from Computer</>}
              </button>
              <input type="text" value={featuredImage} onChange={e=>setFeaturedImage(e.target.value)} placeholder="Image URL" className={inputCls}/>
              <input type="text" value={imageAltText} onChange={e=>setImageAltText(e.target.value)} placeholder="Alt text" className={inputCls}/>
              {featuredImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featuredImage} alt={imageAltText||"Preview"} className="w-full h-full object-cover"/>
                  <button type="button" onClick={() => setFeaturedImage("")} className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black">
                    <Icons.X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* MEDIA MODAL */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-neutral-100">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <Icons.ImagePlus className="h-5 w-5 text-blue-600" /> Add Media to Content
              </h3>
              <button type="button" onClick={() => setShowMediaModal(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500"><Icons.X className="h-4 w-4" /></button>
            </div>
            <div className="flex border-b border-neutral-200 mb-5">
              <button type="button" onClick={() => setMediaTab("upload")} className={`pb-2.5 px-4 text-xs font-bold border-b-2 ${mediaTab === "upload" ? "border-blue-600 text-blue-600" : "text-neutral-400"}`}>Upload Files from Computer</button>
              <button type="button" onClick={() => setMediaTab("url")} className={`pb-2.5 px-4 text-xs font-bold border-b-2 ${mediaTab === "url" ? "border-blue-600 text-blue-600" : "text-neutral-400"}`}>Insert from URL</button>
            </div>
            {mediaTab === "upload" && (
              <div className="flex flex-col gap-4">
                <input ref={mediaFileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadContentImage(f); }} />
                <div onClick={() => mediaFileInputRef.current?.click()} className="border-2 border-dashed border-neutral-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-neutral-50/50 cursor-pointer">
                  <Icons.UploadCloud className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-neutral-800">{isUploadingMedia ? "Uploading image..." : "Click to select image file from computer"}</h4>
                </div>
              </div>
            )}
            {mediaTab === "url" && (
              <div className="flex flex-col gap-4">
                <input type="text" value={mediaUrlInput} onChange={e=>setMediaUrlInput(e.target.value)} placeholder="https://..." className={inputCls} />
                <button type="button" onClick={() => { if (mediaUrlInput.trim()) { insertImageIntoEditor(mediaUrlInput.trim(), mediaAltInput); setShowMediaModal(false); } }} className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-xs font-bold">Insert into Post</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <Icons.Eye className="h-4 w-4" /> Live Website Preview
              </span>
              <button type="button" onClick={() => setShowPreviewModal(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500">
                <Icons.X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-w-3xl mx-auto">
              <h1 className="font-serif text-3xl font-bold text-neutral-900 mb-6">{title || "Untitled Article"}</h1>
              {featuredImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 mb-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featuredImage} alt={imageAltText || title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="prose prose-neutral max-w-none text-sm text-neutral-700 leading-relaxed space-y-4 mb-10" dangerouslySetInnerHTML={{ __html: content || "<p>Preview content...</p>" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
