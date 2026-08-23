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

  const [editorMode, setEditorMode] = useState<"visual" | "text">("visual");

  // ── Core fields ──
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [imageAltText, setImageAltText] = useState("");
  const [categoryName, setCategoryName] = useState("SEO");
  const [isDraft, setIsDraft] = useState(true);
  const [tagsInput, setTagsInput] = useState("");

  // ── SEO ──
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [robotsSettings, setRobotsSettings] = useState("index, follow");

  // ── AEO ──
  const [aeoTargetQuestion, setAeoTargetQuestion] = useState("");
  const [aeoDirectAnswer, setAeoDirectAnswer] = useState("");
  const [aeoFaqItems, setAeoFaqItems] = useState<FaqItem[]>([{ question: "", answer: "" }]);
  const [paaItems, setPaaItems] = useState<string[]>([""]);

  // ── GEO ──
  const [geoStats, setGeoStats] = useState<StatItem[]>([{ stat: "", source: "", url: "" }]);
  const [geoCitations, setGeoCitations] = useState<CitationItem[]>([{ source: "", url: "", claim: "" }]);
  const [geoQuotes, setGeoQuotes] = useState<QuoteItem[]>([{ quote: "", expert: "", title: "" }]);

  // ── LLMO ──
  const [llmoEntityName, setLlmoEntityName] = useState("");
  const [llmoTopicCluster, setLlmoTopicCluster] = useState("");
  const [llmoRelated, setLlmoRelated] = useState<string[]>([""]);
  const [llmoContentDepth, setLlmoContentDepth] = useState("comprehensive");

  // ── VEO ──
  const [veoImages, setVeoImages] = useState<VeoImage[]>([{ url: "", alt: "", caption: "" }]);
  const [veoVideoUrl, setVeoVideoUrl] = useState("");
  const [veoVideoTitle, setVeoVideoTitle] = useState("");
  const [veoInfographicUrl, setVeoInfographicUrl] = useState("");

  // ── CEO ──
  const [ceoSummary, setCeoSummary] = useState("");
  const [ceoTakeaway, setCeoTakeaway] = useState("");
  const [ceoSteps, setCeoSteps] = useState<string[]>([""]);

  // ── BEO ──
  const [beoCredentials, setBeoCredentials] = useState("");
  const [beoCompanyMention, setBeoCompanyMention] = useState("");
  const [beoBrandKw, setBeoBrandKw] = useState<string[]>([""]);
  const [beoTrust, setBeoTrust] = useState<string[]>([""]);

  // ── MSEO ──
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
            
            // Set word count
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

  // Set editor content after loading
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

  // ── Score ──
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
          featuredImage, imageAltText, categoryName, isDraft,
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
  const helpCls = "text-[11px] text-neutral-400 mt-1";
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

  // The JSX below mirrors the new page exactly, just with "Edit Article" header and delete button
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
        <button type="button" onClick={handleDelete} disabled={isDeleting}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 font-sans text-xs font-bold text-red-600 shadow-sm transition-all cursor-pointer disabled:opacity-50">
          <Icons.Trash className="h-3.5 w-3.5" />
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-semibold">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" /><span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Title */}
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Enter title here"
            className="w-full rounded-lg border border-neutral-200 bg-white py-3 px-4 text-xl font-serif font-bold outline-none text-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 placeholder:text-neutral-300" />

          {/* Slug */}
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="font-semibold">Permalink:</span>
            <span className="text-neutral-400">/blog/</span>
            <input type="text" required value={slug} onChange={e => setSlug(e.target.value)}
              className="border-b border-dashed border-neutral-300 bg-transparent py-0.5 px-1 text-xs font-mono text-neutral-700 outline-none focus:border-blue-500 min-w-[200px]" />
          </div>

          {/* Content Editor */}
          <div className={cardCls}>
            <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-1.5">
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
              <div className="flex border border-neutral-200 rounded overflow-hidden text-xs font-semibold">
                <button type="button" onClick={switchToVisual}
                  className={`px-3 py-1 transition-colors ${editorMode === "visual" ? "bg-white text-neutral-800 shadow-sm" : "bg-neutral-50 text-neutral-400"}`}>Visual</button>
                <button type="button" onClick={switchToText}
                  className={`px-3 py-1 transition-colors ${editorMode === "text" ? "bg-white text-neutral-800 shadow-sm" : "bg-neutral-50 text-neutral-400"}`}>Text</button>
              </div>
            </div>
            {editorMode === "visual" ? (
              <div ref={editorRef} contentEditable onInput={handleEditorInput}
                className="min-h-[400px] px-4 py-3 text-sm text-neutral-700 leading-relaxed outline-none font-sans prose prose-sm max-w-none
                  [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2
                  [&_blockquote]:border-l-4 [&_blockquote]:border-blue-300 [&_blockquote]:pl-4 [&_blockquote]:italic
                  [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5"
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

          {/* Excerpt */}
          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200 text-sm font-semibold text-neutral-700">Excerpt</div>
            <div className="px-4 py-3">
              <textarea rows={3} value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Brief summary..." className={`${inputCls} resize-none`} />
            </div>
          </div>

          {/* Engine Optimization Panels */}
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
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeOptTab === tab.key ? tab.color : "bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50"}`}>
                    <TabIcon className="h-3 w-3" />{tab.label}
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-4 flex flex-col gap-4">
              {/* SEO */}
              {activeOptTab === "seo" && (<>
                <div><label className={labelCls}>SEO Title</label><input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder="50-60 chars" className={inputCls} /><p className={helpCls}>{seoTitle.length}/60</p></div>
                <div><label className={labelCls}>Meta Description</label><textarea rows={2} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} placeholder="150-160 chars" className={`${inputCls} resize-none`} /><p className={helpCls}>{seoDescription.length}/160</p></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>Canonical URL</label><input type="text" value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Robots</label><select value={robotsSettings} onChange={e => setRobotsSettings(e.target.value)} className={inputCls}><option>index, follow</option><option>noindex, follow</option><option>index, nofollow</option><option>noindex, nofollow</option></select></div>
                </div>
              </>)}
              {/* AEO */}
              {activeOptTab === "aeo" && (<>
                <p className="text-xs text-neutral-500 bg-violet-50/50 rounded-lg px-3 py-2 border border-violet-100"><strong>Answer Engine Optimization</strong> — Featured snippets, SGE, voice search.</p>
                <div><label className={labelCls}>Target Question</label><input type="text" value={aeoTargetQuestion} onChange={e => setAeoTargetQuestion(e.target.value)} placeholder="e.g. What is the best SEO strategy?" className={inputCls} /></div>
                <div><label className={labelCls}>Direct Answer (40-60 words)</label><textarea rows={3} value={aeoDirectAnswer} onChange={e => setAeoDirectAnswer(e.target.value)} className={`${inputCls} resize-none`} /><p className={helpCls}>{aeoDirectAnswer.split(/\s+/).filter(Boolean).length}/60 words</p></div>
                <div>
                  <label className={labelCls}>FAQ Items</label>
                  {aeoFaqItems.map((faq, i) => (<div key={i} className="flex flex-col gap-2 mb-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                    <input type="text" value={faq.question} onChange={e => { const c = [...aeoFaqItems]; c[i].question = e.target.value; setAeoFaqItems(c); }} placeholder={`Q${i+1}`} className={inputCls} />
                    <textarea rows={2} value={faq.answer} onChange={e => { const c = [...aeoFaqItems]; c[i].answer = e.target.value; setAeoFaqItems(c); }} placeholder="Answer" className={`${inputCls} resize-none`} />
                    {aeoFaqItems.length > 1 && <button type="button" onClick={() => setAeoFaqItems(aeoFaqItems.filter((_,idx)=>idx!==i))} className="self-end text-xs text-red-500 font-semibold">Remove</button>}
                  </div>))}
                  <button type="button" onClick={() => setAeoFaqItems([...aeoFaqItems, {question:"",answer:""}])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3" /> Add FAQ</button>
                </div>
                <div>
                  <label className={labelCls}>PAA Questions</label>
                  {paaItems.map((q, i) => (<div key={i} className="flex gap-2 mb-2"><input type="text" value={q} onChange={e => { const c=[...paaItems]; c[i]=e.target.value; setPaaItems(c); }} placeholder={`PAA ${i+1}`} className={`${inputCls} flex-1`} />
                    {paaItems.length > 1 && <button type="button" onClick={() => setPaaItems(paaItems.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4" /></button>}</div>))}
                  <button type="button" onClick={() => setPaaItems([...paaItems,""])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3" /> Add</button>
                </div>
              </>)}
              {/* GEO */}
              {activeOptTab === "geo" && (<>
                <p className="text-xs text-neutral-500 bg-emerald-50/50 rounded-lg px-3 py-2 border border-emerald-100"><strong>Generative Engine Optimization</strong> — Statistics, citations, expert quotes for AI overviews.</p>
                <div><label className={labelCls}>Statistics</label>
                  {geoStats.map((s,i) => (<div key={i} className="grid grid-cols-3 gap-2 mb-2"><input type="text" value={s.stat} onChange={e=>{const c=[...geoStats];c[i].stat=e.target.value;setGeoStats(c);}} placeholder="Stat" className={inputCls}/><input type="text" value={s.source} onChange={e=>{const c=[...geoStats];c[i].source=e.target.value;setGeoStats(c);}} placeholder="Source" className={inputCls}/><div className="flex gap-1"><input type="text" value={s.url} onChange={e=>{const c=[...geoStats];c[i].url=e.target.value;setGeoStats(c);}} placeholder="URL" className={`${inputCls} flex-1`}/>{geoStats.length>1&&<button type="button" onClick={()=>setGeoStats(geoStats.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4"/></button>}</div></div>))}
                  <button type="button" onClick={()=>setGeoStats([...geoStats,{stat:"",source:"",url:""}])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3"/>Add</button>
                </div>
                <div><label className={labelCls}>Citations</label>
                  {geoCitations.map((c,i) => (<div key={i} className="grid grid-cols-3 gap-2 mb-2"><input type="text" value={c.source} onChange={e=>{const cp=[...geoCitations];cp[i].source=e.target.value;setGeoCitations(cp);}} placeholder="Source" className={inputCls}/><input type="text" value={c.url} onChange={e=>{const cp=[...geoCitations];cp[i].url=e.target.value;setGeoCitations(cp);}} placeholder="URL" className={inputCls}/><div className="flex gap-1"><input type="text" value={c.claim} onChange={e=>{const cp=[...geoCitations];cp[i].claim=e.target.value;setGeoCitations(cp);}} placeholder="Claim" className={`${inputCls} flex-1`}/>{geoCitations.length>1&&<button type="button" onClick={()=>setGeoCitations(geoCitations.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4"/></button>}</div></div>))}
                  <button type="button" onClick={()=>setGeoCitations([...geoCitations,{source:"",url:"",claim:""}])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3"/>Add</button>
                </div>
                <div><label className={labelCls}>Expert Quotes</label>
                  {geoQuotes.map((q,i) => (<div key={i} className="grid grid-cols-3 gap-2 mb-2"><input type="text" value={q.quote} onChange={e=>{const c=[...geoQuotes];c[i].quote=e.target.value;setGeoQuotes(c);}} placeholder="Quote" className={inputCls}/><input type="text" value={q.expert} onChange={e=>{const c=[...geoQuotes];c[i].expert=e.target.value;setGeoQuotes(c);}} placeholder="Expert" className={inputCls}/><div className="flex gap-1"><input type="text" value={q.title} onChange={e=>{const c=[...geoQuotes];c[i].title=e.target.value;setGeoQuotes(c);}} placeholder="Title" className={`${inputCls} flex-1`}/>{geoQuotes.length>1&&<button type="button" onClick={()=>setGeoQuotes(geoQuotes.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4"/></button>}</div></div>))}
                  <button type="button" onClick={()=>setGeoQuotes([...geoQuotes,{quote:"",expert:"",title:""}])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3"/>Add</button>
                </div>
              </>)}
              {/* LLMO */}
              {activeOptTab === "llmo" && (<>
                <p className="text-xs text-neutral-500 bg-pink-50/50 rounded-lg px-3 py-2 border border-pink-100"><strong>LLM Optimization</strong> — Entity authority and topic clustering.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>Entity Name</label><input type="text" value={llmoEntityName} onChange={e=>setLlmoEntityName(e.target.value)} className={inputCls}/></div>
                  <div><label className={labelCls}>Topic Cluster</label><input type="text" value={llmoTopicCluster} onChange={e=>setLlmoTopicCluster(e.target.value)} className={inputCls}/></div>
                </div>
                <div><label className={labelCls}>Content Depth</label><select value={llmoContentDepth} onChange={e=>setLlmoContentDepth(e.target.value)} className={inputCls}><option value="comprehensive">Comprehensive</option><option value="overview">Overview</option><option value="deep-dive">Deep Dive</option><option value="comparison">Comparison</option></select></div>
                <div><label className={labelCls}>Related Entities</label>
                  {llmoRelated.map((r,i) => (<div key={i} className="flex gap-2 mb-2"><input type="text" value={r} onChange={e=>{const c=[...llmoRelated];c[i]=e.target.value;setLlmoRelated(c);}} placeholder={`Entity ${i+1}`} className={`${inputCls} flex-1`}/>{llmoRelated.length>1&&<button type="button" onClick={()=>setLlmoRelated(llmoRelated.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4"/></button>}</div>))}
                  <button type="button" onClick={()=>setLlmoRelated([...llmoRelated,""])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3"/>Add</button>
                </div>
              </>)}
              {/* VEO */}
              {activeOptTab === "veo" && (<>
                <p className="text-xs text-neutral-500 bg-orange-50/50 rounded-lg px-3 py-2 border border-orange-100"><strong>Visual Engine Optimization</strong> — Images, videos, infographics for visual search.</p>
                <div><label className={labelCls}>Images</label>
                  {veoImages.map((img,i) => (<div key={i} className="grid grid-cols-3 gap-2 mb-2"><input type="text" value={img.url} onChange={e=>{const c=[...veoImages];c[i].url=e.target.value;setVeoImages(c);}} placeholder="URL" className={inputCls}/><input type="text" value={img.alt} onChange={e=>{const c=[...veoImages];c[i].alt=e.target.value;setVeoImages(c);}} placeholder="Alt" className={inputCls}/><div className="flex gap-1"><input type="text" value={img.caption} onChange={e=>{const c=[...veoImages];c[i].caption=e.target.value;setVeoImages(c);}} placeholder="Caption" className={`${inputCls} flex-1`}/>{veoImages.length>1&&<button type="button" onClick={()=>setVeoImages(veoImages.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4"/></button>}</div></div>))}
                  <button type="button" onClick={()=>setVeoImages([...veoImages,{url:"",alt:"",caption:""}])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3"/>Add</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>Video URL</label><input type="text" value={veoVideoUrl} onChange={e=>setVeoVideoUrl(e.target.value)} className={inputCls}/></div>
                  <div><label className={labelCls}>Video Title</label><input type="text" value={veoVideoTitle} onChange={e=>setVeoVideoTitle(e.target.value)} className={inputCls}/></div>
                </div>
                <div><label className={labelCls}>Infographic URL</label><input type="text" value={veoInfographicUrl} onChange={e=>setVeoInfographicUrl(e.target.value)} className={inputCls}/></div>
              </>)}
              {/* CEO */}
              {activeOptTab === "ceo" && (<>
                <p className="text-xs text-neutral-500 bg-cyan-50/50 rounded-lg px-3 py-2 border border-cyan-100"><strong>ChatGPT Engine Optimization</strong> — Summaries and steps for ChatGPT citations.</p>
                <div><label className={labelCls}>Conversational Summary</label><textarea rows={3} value={ceoSummary} onChange={e=>setCeoSummary(e.target.value)} className={`${inputCls} resize-none`}/></div>
                <div><label className={labelCls}>Key Takeaway</label><input type="text" value={ceoTakeaway} onChange={e=>setCeoTakeaway(e.target.value)} className={inputCls}/></div>
                <div><label className={labelCls}>Actionable Steps</label>
                  {ceoSteps.map((s,i) => (<div key={i} className="flex gap-2 mb-2"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold border border-cyan-200">{i+1}</span><input type="text" value={s} onChange={e=>{const c=[...ceoSteps];c[i]=e.target.value;setCeoSteps(c);}} placeholder={`Step ${i+1}`} className={`${inputCls} flex-1`}/>{ceoSteps.length>1&&<button type="button" onClick={()=>setCeoSteps(ceoSteps.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4"/></button>}</div>))}
                  <button type="button" onClick={()=>setCeoSteps([...ceoSteps,""])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3"/>Add</button>
                </div>
              </>)}
              {/* BEO */}
              {activeOptTab === "beo" && (<>
                <p className="text-xs text-neutral-500 bg-amber-50/50 rounded-lg px-3 py-2 border border-amber-100"><strong>Brand Engine Optimization</strong> — E-E-A-T, credentials, brand signals.</p>
                <div><label className={labelCls}>Author Credentials</label><textarea rows={2} value={beoCredentials} onChange={e=>setBeoCredentials(e.target.value)} className={`${inputCls} resize-none`}/></div>
                <div><label className={labelCls}>Brand Mention</label><input type="text" value={beoCompanyMention} onChange={e=>setBeoCompanyMention(e.target.value)} className={inputCls}/></div>
                <div><label className={labelCls}>Brand Keywords</label>
                  {beoBrandKw.map((k,i) => (<div key={i} className="flex gap-2 mb-2"><input type="text" value={k} onChange={e=>{const c=[...beoBrandKw];c[i]=e.target.value;setBeoBrandKw(c);}} className={`${inputCls} flex-1`}/>{beoBrandKw.length>1&&<button type="button" onClick={()=>setBeoBrandKw(beoBrandKw.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4"/></button>}</div>))}
                  <button type="button" onClick={()=>setBeoBrandKw([...beoBrandKw,""])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3"/>Add</button>
                </div>
                <div><label className={labelCls}>Trust Signals</label>
                  {beoTrust.map((t,i) => (<div key={i} className="flex gap-2 mb-2"><input type="text" value={t} onChange={e=>{const c=[...beoTrust];c[i]=e.target.value;setBeoTrust(c);}} className={`${inputCls} flex-1`}/>{beoTrust.length>1&&<button type="button" onClick={()=>setBeoTrust(beoTrust.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4"/></button>}</div>))}
                  <button type="button" onClick={()=>setBeoTrust([...beoTrust,""])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3"/>Add</button>
                </div>
              </>)}
              {/* MSEO */}
              {activeOptTab === "mseo" && (<>
                <p className="text-xs text-neutral-500 bg-indigo-50/50 rounded-lg px-3 py-2 border border-indigo-100"><strong>Multimodal SEO</strong> — Tables, definitions, content format signals.</p>
                <div><label className={labelCls}>Content Format</label><select value={mseoFormat} onChange={e=>setMseoFormat(e.target.value)} className={inputCls}><option value="text">Text Only</option><option value="text+video">Text + Video</option><option value="text+infographic">Text + Infographic</option><option value="text+audio">Text + Audio</option><option value="all">All Formats</option></select></div>
                <div><label className={labelCls}>Key Definitions</label>
                  {mseoDefinitions.map((d,i) => (<div key={i} className="grid grid-cols-2 gap-2 mb-2"><input type="text" value={d.term} onChange={e=>{const c=[...mseoDefinitions];c[i].term=e.target.value;setMseoDefinitions(c);}} placeholder="Term" className={inputCls}/><div className="flex gap-1"><input type="text" value={d.definition} onChange={e=>{const c=[...mseoDefinitions];c[i].definition=e.target.value;setMseoDefinitions(c);}} placeholder="Definition" className={`${inputCls} flex-1`}/>{mseoDefinitions.length>1&&<button type="button" onClick={()=>setMseoDefinitions(mseoDefinitions.filter((_,idx)=>idx!==i))} className="text-red-400"><Icons.X className="h-4 w-4"/></button>}</div></div>))}
                  <button type="button" onClick={()=>setMseoDefinitions([...mseoDefinitions,{term:"",definition:""}])} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Icons.Plus className="h-3 w-3"/>Add</button>
                </div>
              </>)}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Publish */}
          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800">Publish</h3></div>
            <div className="px-4 py-3 flex flex-col gap-3">
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsDraft(true)} className="flex-1 py-2 px-3 text-xs font-semibold border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50">Save Draft</button>
                <button type="button" className="flex-1 py-2 px-3 text-xs font-semibold border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50">Preview</button>
              </div>
              <div className="flex flex-col gap-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2"><Icons.Key className="h-3.5 w-3.5 text-neutral-400"/><span>Status: <strong>{isDraft?"Draft":"Published"}</strong></span></div>
                <div className="flex items-center gap-2"><Icons.Eye className="h-3.5 w-3.5 text-neutral-400"/><span>Visibility: <strong>Public</strong></span></div>
                <div className="flex items-center gap-2"><Icons.Calendar className="h-3.5 w-3.5 text-neutral-400"/><span>Publish: <strong>Immediately</strong></span></div>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                <button type="button" onClick={handleDelete} className="text-xs text-red-500 hover:text-red-700 font-semibold">Move to Trash</button>
                <button type="submit" disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-200 px-5 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer border-0">
                  {isSaving ? <><Icons.Loader2 className="h-3.5 w-3.5 animate-spin"/>Saving...</> : "Update"}
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800">Categories</h3></div>
            <div className="px-4 py-3">
              {["SEO","Google Ads","Web Dev","Content Marketing","Email Marketing","Social Media","E-commerce","AI & Automation"].map(cat => (
                <label key={cat} className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer py-0.5"><input type="radio" name="category" checked={categoryName===cat} onChange={()=>setCategoryName(cat)} className="accent-blue-600"/>{cat}</label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800">Tags</h3></div>
            <div className="px-4 py-3">
              <input type="text" value={tagsInput} onChange={e=>setTagsInput(e.target.value)} placeholder="Comma-separated tags" className={inputCls}/>
              {tagsInput && <div className="flex flex-wrap gap-1.5 mt-2">{tagsInput.split(",").map((t,i) => t.trim() && <span key={i} className="px-2 py-0.5 rounded-full bg-neutral-100 text-xs text-neutral-600 border border-neutral-200">{t.trim()}</span>)}</div>}
            </div>
          </div>

          {/* Featured Image */}
          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800">Featured Image</h3></div>
            <div className="px-4 py-3 flex flex-col gap-3">
              <input type="text" value={featuredImage} onChange={e=>setFeaturedImage(e.target.value)} placeholder="Image URL" className={inputCls}/>
              <input type="text" value={imageAltText} onChange={e=>setImageAltText(e.target.value)} placeholder="Alt text" className={inputCls}/>
              {featuredImage && <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featuredImage} alt={imageAltText||"Preview"} className="w-full h-full object-cover"/>
              </div>}
            </div>
          </div>

          {/* Score */}
          <div className={cardCls}>
            <div className="px-4 py-3 border-b border-neutral-200"><h3 className="text-sm font-bold text-neutral-800 flex items-center gap-1.5"><Icons.BarChart3 className="h-4 w-4 text-blue-500"/>Score</h3></div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-center mb-4">
                <div className={`relative flex items-center justify-center h-20 w-20 rounded-full border-4 ${score>=70?"border-emerald-400":score>=40?"border-amber-400":"border-red-400"}`}>
                  <span className={`text-2xl font-bold ${score>=70?"text-emerald-600":score>=40?"text-amber-600":"text-red-600"}`}>{score}%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  {label:"SEO",f:[seoTitle,seoDescription,canonicalUrl,imageAltText].filter(Boolean).length,t:4,c:"bg-blue-500"},
                  {label:"AEO",f:[aeoTargetQuestion,aeoDirectAnswer,aeoFaqItems.some(f=>f.question&&f.answer)].filter(Boolean).length,t:3,c:"bg-violet-500"},
                  {label:"GEO",f:[geoStats.some(s=>s.stat),geoCitations.some(c=>c.source)].filter(Boolean).length,t:2,c:"bg-emerald-500"},
                  {label:"LLMO",f:[llmoEntityName,llmoTopicCluster,llmoRelated.some(r=>r)].filter(Boolean).length,t:3,c:"bg-pink-500"},
                  {label:"VEO",f:[veoImages.some(i=>i.url),veoVideoUrl||veoInfographicUrl].filter(Boolean).length,t:2,c:"bg-orange-500"},
                  {label:"CEO",f:[ceoSummary,ceoTakeaway,ceoSteps.some(s=>s)].filter(Boolean).length,t:3,c:"bg-cyan-500"},
                  {label:"BEO",f:[beoCredentials,beoCompanyMention].filter(Boolean).length,t:2,c:"bg-amber-500"},
                  {label:"MSEO",f:[mseoFormat!=="text",mseoDefinitions.some(d=>d.term)].filter(Boolean).length,t:2,c:"bg-indigo-500"},
                ].map(cat => (<div key={cat.label} className="flex items-center gap-2 text-xs">
                  <span className="w-10 font-semibold text-neutral-500">{cat.label}</span>
                  <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden"><div className={`h-full ${cat.c} rounded-full transition-all`} style={{width:`${(cat.f/cat.t)*100}%`}}/></div>
                  <span className="w-7 text-right text-neutral-400">{cat.f}/{cat.t}</span>
                </div>))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
