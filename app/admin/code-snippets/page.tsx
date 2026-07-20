"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";

interface CodeSnippet {
  id: string;
  name: string;
  location: "header" | "body_open" | "footer";
  code: string;
  isActive: boolean;
}

export default function AdminCodeSnippetsPage() {
  const [gaMeasurementId, setGaMeasurementId] = useState("");
  const [gtmContainerId, setGtmContainerId] = useState("");
  const [metaPixelId, setMetaPixelId] = useState("");
  const [googleSiteVerification, setGoogleSiteVerification] = useState("");

  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "header" | "body_open" | "footer">("all");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/code-snippets");
      if (res.ok) {
        const data = await res.json();
        setGaMeasurementId(data.gaMeasurementId || "");
        setGtmContainerId(data.gtmContainerId || "");
        setMetaPixelId(data.metaPixelId || "");
        setGoogleSiteVerification(data.googleSiteVerification || "");
        setSnippets(Array.isArray(data.snippets) ? data.snippets : []);
      }
    } catch (err) {
      console.error("Fetch code snippets failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleAddSnippet = () => {
    const newLocation = selectedFilter === "all" ? "header" : selectedFilter;
    const newSnippet: CodeSnippet = {
      id: `snip-${Date.now()}`,
      name: "Custom Script / Pixel",
      location: newLocation,
      code: "<!-- Injected HTML / JS / CSS Code -->\n<script>\n  // Your custom JavaScript or tracking script here\n</script>",
      isActive: true,
    };
    setSnippets([newSnippet, ...snippets]);
  };

  const handleRemoveSnippet = (id: string) => {
    setSnippets(snippets.filter((s) => s.id !== id));
  };

  const handleSnippetChange = (
    id: string,
    field: keyof CodeSnippet,
    value: string | boolean | CodeSnippet["location"]
  ) => {
    setSnippets(
      snippets.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setIsSaving(true);
    setFeedbackMessage("");
    setFeedbackError("");

    try {
      const response = await fetch("/api/admin/code-snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gaMeasurementId,
          gtmContainerId,
          metaPixelId,
          googleSiteVerification,
          snippets,
        }),
      });

      if (response.ok) {
        setFeedbackMessage("Header & Footer scripts updated & applied live!");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => setFeedbackMessage(""), 4000);
      } else {
        const errorData = await response.json();
        setFeedbackError(errorData.error || "Failed to save script settings");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      setFeedbackError("An error occurred while saving script settings.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredSnippets = snippets.filter((s) => {
    if (selectedFilter === "all") return true;
    return s.location === selectedFilter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
            Custom Code & Scripts Manager (WPCode)
          </h1>
          <p className="font-sans text-sm text-neutral-500">
            Easily connect Google Analytics, Google Tag Manager, Search Console, Meta Pixel, and inject header/footer scripts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddSnippet}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Icons.Plus className="h-4 w-4" />
            Add Custom Code Snippet
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-8">
        {/* Feedback Messages */}
        {feedbackMessage && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-600 font-semibold animate-fade-in shadow-xs">
            <Icons.CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-500" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {feedbackError && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-4 text-xs text-red-600 font-semibold animate-fade-in shadow-xs">
            <Icons.AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-500" />
            <span>{feedbackError}</span>
          </div>
        )}

        {/* Section 1: Quick Integration Services */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
          <h3 className="font-sans font-bold text-base text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
            <Icons.Radio className="h-5 w-5 text-primary" />
            Quick Connect Tools (Google & Meta integrations)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GA4 */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-50/50 border border-neutral-100">
              <label className="text-xs font-bold text-neutral-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Google Analytics 4 (GA4)
              </label>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Enter your GA4 Measurement ID (e.g. <code className="bg-white px-1 py-0.5 rounded border border-neutral-200 text-neutral-700">G-XXXXXXXXXX</code>)
              </p>
              <input
                type="text"
                value={gaMeasurementId}
                onChange={(e) => setGaMeasurementId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="mt-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10 font-mono"
              />
            </div>

            {/* GTM */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-50/50 border border-neutral-100">
              <label className="text-xs font-bold text-neutral-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Google Tag Manager (GTM)
              </label>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Enter your GTM Container ID (e.g. <code className="bg-white px-1 py-0.5 rounded border border-neutral-200 text-neutral-700">GTM-XXXXXXX</code>)
              </p>
              <input
                type="text"
                value={gtmContainerId}
                onChange={(e) => setGtmContainerId(e.target.value)}
                placeholder="GTM-XXXXXXX"
                className="mt-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10 font-mono"
              />
            </div>

            {/* Meta Pixel */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-50/50 border border-neutral-100">
              <label className="text-xs font-bold text-neutral-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Meta (Facebook) Pixel
              </label>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Enter your Meta Pixel ID (e.g. <code className="bg-white px-1 py-0.5 rounded border border-neutral-200 text-neutral-700">123456789012345</code>)
              </p>
              <input
                type="text"
                value={metaPixelId}
                onChange={(e) => setMetaPixelId(e.target.value)}
                placeholder="123456789012345"
                className="mt-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10 font-mono"
              />
            </div>

            {/* Google Search Console */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-50/50 border border-neutral-100">
              <label className="text-xs font-bold text-neutral-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Google Search Console Verification
              </label>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Enter verification token or full meta tag (e.g. <code className="bg-white px-1 py-0.5 rounded border border-neutral-200 text-neutral-700">google-site-verification</code> content)
              </p>
              <input
                type="text"
                value={googleSiteVerification}
                onChange={(e) => setGoogleSiteVerification(e.target.value)}
                placeholder='google-site-verification content string or full tag'
                className="mt-1 rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Custom Code Snippet Builder (WPCode style) */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
            <h3 className="font-sans font-bold text-base text-neutral-800 flex items-center gap-2">
              <Icons.Code2 className="h-5 w-5 text-primary" />
              Custom Header & Footer Code Snippets (WPCode)
            </h3>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border-0 ${
                  selectedFilter === "all"
                    ? "bg-primary text-white"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500"
                }`}
              >
                All Snippets ({snippets.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("header")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border-0 ${
                  selectedFilter === "header"
                    ? "bg-primary text-white"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500"
                }`}
              >
                Header (&lt;head&gt;)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("body_open")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border-0 ${
                  selectedFilter === "body_open"
                    ? "bg-primary text-white"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500"
                }`}
              >
                Body Start (&lt;body&gt;)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("footer")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border-0 ${
                  selectedFilter === "footer"
                    ? "bg-primary text-white"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500"
                }`}
              >
                Footer (&lt;/body&gt;)
              </button>
            </div>
          </div>

          {/* Snippets List */}
          <div className="flex flex-col gap-6">
            {filteredSnippets.length > 0 ? (
              filteredSnippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className={`border rounded-2xl p-5 flex flex-col gap-4 transition-all ${
                    snippet.isActive
                      ? "bg-white border-neutral-200 shadow-xs"
                      : "bg-neutral-50/70 border-neutral-200/60 opacity-75"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="text"
                        value={snippet.name}
                        onChange={(e) => handleSnippetChange(snippet.id, "name", e.target.value)}
                        placeholder="Snippet Name (e.g. TikTok Pixel, Hotjar)..."
                        className="font-sans text-sm font-bold text-neutral-800 bg-transparent border-b border-dashed border-neutral-300 focus:border-primary outline-none py-0.5 flex-1 max-w-sm"
                      />

                      <select
                        value={snippet.location}
                        onChange={(e) =>
                          handleSnippetChange(snippet.id, "location", e.target.value as CodeSnippet["location"])
                        }
                        className="rounded-lg border border-neutral-200 bg-neutral-50 py-1 px-2.5 text-xs font-semibold text-neutral-600 outline-none focus:border-primary cursor-pointer"
                      >
                        <option value="header">Header (&lt;head&gt;)</option>
                        <option value="body_open">Body Start (&lt;body&gt;)</option>
                        <option value="footer">Footer (&lt;/body&gt;)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Active Status Toggle */}
                      <button
                        type="button"
                        onClick={() => handleSnippetChange(snippet.id, "isActive", !snippet.isActive)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border-0 ${
                          snippet.isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-neutral-200 text-neutral-500"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            snippet.isActive ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
                          }`}
                        />
                        {snippet.isActive ? "Active" : "Disabled"}
                      </button>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveSnippet(snippet.id)}
                        className="h-8 w-8 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50 text-red-500 flex items-center justify-center transition-all cursor-pointer"
                        title="Delete Snippet"
                      >
                        <Icons.Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Code Editor Area */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Code Snippet (HTML / JS / CSS / Meta Tags)
                    </label>
                    <textarea
                      rows={5}
                      value={snippet.code}
                      onChange={(e) => handleSnippetChange(snippet.id, "code", e.target.value)}
                      placeholder="<!-- Paste your code snippet here -->"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-900 text-emerald-400 p-4 text-xs font-mono outline-none focus:border-primary resize-y leading-relaxed"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-12 text-center text-neutral-400 font-medium text-sm">
                No code snippets found matching the selected filter tab. Click &quot;Add Custom Code Snippet&quot; to inject one!
              </div>
            )}
          </div>
        </div>

        {/* Sticky Save Bar */}
        <div className="sticky bottom-6 flex items-center justify-between bg-white/80 backdrop-blur-md border border-neutral-200/80 p-3.5 rounded-2xl shadow-xl z-20">
          <button
            type="button"
            onClick={handleAddSnippet}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 px-5 py-2.5 text-xs font-bold text-neutral-700 transition-all cursor-pointer"
          >
            <Icons.Plus className="h-4 w-4 text-neutral-500" />
            Add Code Snippet
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover disabled:bg-neutral-200 px-8 py-3.5 font-sans text-xs font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer border-0"
          >
            {isSaving ? (
              <>
                <Icons.Loader2 className="h-4 w-4 animate-spin" />
                Saving Scripts & Settings...
              </>
            ) : (
              <>
                <Icons.Save className="h-4 w-4" />
                Save & Apply Code Snippets
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
