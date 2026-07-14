"use client";

import { useState, useRef } from "react";
import * as Icons from "lucide-react";

/* ── tiny markdown ➜ HTML ── */
function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let inList = false;
  let inTable = false;
  let tableRows: string[][] = [];

  function inline(text: string) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code class='text-blue-400 bg-slate-800 px-1 py-0.5 rounded text-xs'>$1</code>");
  }

  function flushList() {
    if (inList) { html += "</ul>"; inList = false; }
  }
  function flushTable() {
    if (inTable) {
      const [headerRow, ...bodyRows] = tableRows;
      html += '<table class="w-full border-collapse text-[13px] mb-4"><thead><tr>' +
        headerRow.map(c => `<th class="text-left text-slate-500 font-mono text-[11px] uppercase tracking-wider py-2 px-2.5 border-b border-white/10">${inline(c)}</th>`).join("") +
        "</tr></thead><tbody>" +
        bodyRows.map(r => "<tr>" + r.map(c => `<td class="py-2 px-2.5 border-b border-white/[0.06] text-slate-400">${inline(c)}</td>`).join("") + "</tr>").join("") +
        "</tbody></table>";
      inTable = false;
      tableRows = [];
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (/^\|.*\|$/.test(trimmed)) {
      if (/^\|[\s:|-]+\|$/.test(trimmed)) continue;
      flushList();
      inTable = true;
      const cells = trimmed.slice(1, -1).split("|").map(c => c.trim());
      tableRows.push(cells);
      continue;
    } else {
      flushTable();
    }

    if (trimmed === "") { flushList(); continue; }

    let m;
    if ((m = trimmed.match(/^###\s+(.*)/))) { flushList(); html += `<h3 class="text-[15px] font-bold text-blue-300 mt-5 mb-2">${inline(m[1])}</h3>`; continue; }
    if ((m = trimmed.match(/^##\s+(.*)/))) { flushList(); html += `<h2 class="text-lg font-bold text-white mt-7 mb-2.5 pt-5 border-t border-white/[0.08]">${inline(m[1])}</h2>`; continue; }
    if ((m = trimmed.match(/^#\s+(.*)/))) { flushList(); html += `<h1 class="text-2xl font-bold text-white mb-1.5">${inline(m[1])}</h1>`; continue; }
    if ((m = trimmed.match(/^[-*]\s+(.*)/))) {
      if (!inList) { html += '<ul class="mb-3.5 space-y-1">'; inList = true; }
      html += `<li class="text-[14.5px] text-slate-400 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-blue-500">${inline(m[1])}</li>`;
      continue;
    }
    if ((m = trimmed.match(/^\d+\.\s+(.*)/))) {
      if (!inList) { html += '<ul class="mb-3.5 space-y-1">'; inList = true; }
      html += `<li class="text-[14.5px] text-slate-400 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-blue-500">${inline(m[1])}</li>`;
      continue;
    }
    flushList();
    html += `<p class="text-[14.5px] text-slate-400 mb-3 leading-relaxed">${inline(trimmed)}</p>`;
  }
  flushList();
  flushTable();
  return html;
}

function extractScore(md: string): string | null {
  const m = md.match(/SEO Score[^\d]{0,15}(\d{1,3})\s*\/\s*100/i) || md.match(/(\d{1,3})\s*\/\s*100/);
  return m ? m[1] : null;
}

const MANUAL_PROMPT = `Act as an expert Technical SEO Consultant with 15+ years of experience auditing websites for ranking performance, technical health, and content quality.

I will give you a website URL. Using web search, analyze the site and produce a complete SEO audit.

Your analysis must cover:

1. Metadata — missing/duplicate titles & descriptions, length issues
2. Keyword Opportunities — gaps vs competitors, cannibalization risks
3. Competitor Comparison — 3-5 close competitors, content & backlink signals
4. Content Quality — thin/outdated pages, header structure, search intent
5. Technical SEO — page speed, Core Web Vitals, crawlability, structured data
6. Image Optimization — missing alt text, unoptimized images
7. Internal Linking — orphaned pages, broken links

Output format:
- Overall SEO Score out of 100
- Critical Issues first, ranked by impact
- Findings grouped by category above
- 30-Day SEO Action Plan (Week 1-4)
- One-paragraph executive summary for a non-technical reader

Website URL to audit: [PASTE URL HERE]`;

export default function SeoAuditTool() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ msg: string; type: "info" | "error" } | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  function normalizeUrl(raw: string): string | null {
    let v = raw.trim();
    if (!v) return null;
    if (!/^https?:\/\//i.test(v)) v = "https://" + v;
    try { new URL(v); return v; } catch { return null; }
  }

  async function runAudit() {
    const normalized = normalizeUrl(url);
    if (!normalized) {
      setStatus({ msg: "Enter a valid website URL first.", type: "error" });
      return;
    }
    setStatus({ msg: "Reading the site and researching competitors — this can take up to 90 seconds…", type: "info" });
    setIsLoading(true);
    setReport(null);

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Audit request failed.");
      }

      setReport(data.report);
      setStatus(null);

      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setStatus({ msg: `The audit could not be completed: ${message} Please try again, or use the manual prompt below.`, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  function copyReport() {
    if (!report) return;
    navigator.clipboard.writeText(report).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function copyPrompt() {
    navigator.clipboard.writeText(MANUAL_PROMPT).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1800);
    });
  }

  const score = report ? extractScore(report) : null;

  return (
    <section className="relative bg-[#0F172A] py-20 lg:py-28 border-b border-slate-800">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-[920px] px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-blue-500 font-semibold">
            Free SEO Audit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[38px] font-bold text-white tracking-tight leading-[1.1] mt-3 max-w-[600px] mx-auto">
            Run a Live <span className="text-blue-500">SEO Audit</span><br />Right Here
          </h2>
          <p className="font-sans text-[15.5px] text-slate-400 max-w-[480px] mx-auto mt-4 leading-relaxed">
            Enter a website URL below. Our AI will search the live site and generate a scored, prioritized SEO report — no copy‑pasting into a separate chat required.
          </p>
        </div>

        {/* Audit Panel */}
        <div className="bg-[#1E293B] border border-white/[0.14] rounded-[20px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setStatus(null); }}
              onKeyDown={(e) => { if (e.key === "Enter") runAudit(); }}
              placeholder="example.com or https://example.com"
              className="flex-1 min-w-0 bg-[#111827] border border-white/[0.14] text-white text-[15px] px-4 py-3.5 rounded-[10px] outline-none focus:border-blue-500 transition-colors font-sans placeholder:text-slate-600"
            />
            <button
              onClick={runAudit}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14.5px] font-semibold px-6 py-3.5 rounded-[10px] border border-transparent transition-all whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Icons.Loader2 className="h-4 w-4 animate-spin" />
                  Auditing…
                </>
              ) : (
                <>
                  <Icons.Play className="h-4 w-4 fill-current" />
                  Run Audit
                </>
              )}
            </button>
          </div>

          {/* Hint */}
          <div className="mt-2.5 flex items-center gap-2 text-[12.5px] text-slate-500">
            <Icons.Info className="h-3.5 w-3.5 shrink-0" />
            <span>Works best on public, non-password-protected sites. Takes roughly 30–90 seconds.</span>
          </div>

          {/* Status Line */}
          {status && (
            <div className={`mt-4 flex items-center gap-2.5 text-[13.5px] px-3.5 py-3 rounded-lg border ${
              status.type === "error"
                ? "text-red-300 bg-red-500/[0.12] border-red-500/25"
                : "text-blue-200 bg-blue-500/[0.12] border-blue-500/22"
            }`}>
              {status.type === "error"
                ? <Icons.AlertCircle className="h-4 w-4 shrink-0" />
                : <Icons.Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              }
              <span>{status.msg}</span>
            </div>
          )}
        </div>

        {/* Manual Prompt Toggle */}
        <div className="text-center mt-5">
          <button
            onClick={() => setShowManual(!showManual)}
            className="bg-transparent border-none text-slate-500 text-[13px] underline underline-offset-[3px] hover:text-slate-400 transition-colors font-sans"
          >
            Prefer to run this manually in your own Claude chat instead?
          </button>
        </div>

        {/* Manual Prompt Panel */}
        {showManual && (
          <div className="mt-5">
            <div className="bg-[#080D1A] rounded-[20px] overflow-hidden border border-[#1E2B45]">
              {/* Mac-style titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#131E33] border-b border-[#1E2B45]">
                <div className="flex gap-[7px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EC6A5E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#61C454]" />
                </div>
                <span className="font-mono text-[12px] text-[#8CA0C6]">seo-audit-master-prompt.txt</span>
                <button
                  onClick={copyPrompt}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white border-none px-3 py-1.5 rounded-[7px] text-[12px] font-semibold transition-colors"
                >
                  {copiedPrompt ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="px-5 py-5 max-h-[280px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-[1.68] text-[#C9D4E8] m-0">
                  {MANUAL_PROMPT}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && !report && (
          <div className="mt-7 bg-[#1E293B] border border-white/[0.08] rounded-[20px] p-8 shadow-sm">
            <div className="flex flex-col gap-3">
              {[100, 85, 92, 78, 88, 65, 95, 80].map((w, i) => (
                <div
                  key={i}
                  className="h-3.5 rounded-md animate-pulse"
                  style={{
                    width: `${w}%`,
                    background: "linear-gradient(90deg, #243043 0%, rgba(255,255,255,0.14) 50%, #243043 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.4s infinite",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Report Output */}
        {report && (
          <div ref={reportRef} className="mt-7 scroll-mt-28">
            <div className="flex items-center justify-between gap-3 mb-3.5 flex-wrap">
              <h3 className="font-sans text-xl font-bold text-white">Audit Report</h3>
              <button
                onClick={copyReport}
                className="inline-flex items-center gap-2 bg-transparent border border-white/[0.14] text-slate-400 hover:border-blue-500 hover:text-white px-4 py-2.5 rounded-[10px] text-[14px] font-semibold transition-all"
              >
                <Icons.Copy className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy report"}
              </button>
            </div>

            <div className="bg-[#1E293B] border border-white/[0.08] rounded-[20px] p-6 sm:p-8 shadow-sm">
              {/* Score Badge */}
              {score && (
                <div className="inline-flex items-center gap-2.5 bg-blue-500/[0.12] border border-blue-500/30 rounded-full px-4 py-2 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-[13px] font-bold">
                    {score}
                  </div>
                  <span className="text-[13px] text-blue-200 font-semibold">SEO Score out of 100</span>
                </div>
              )}

              {/* Report Content */}
              <div
                className="audit-report-content"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(report) }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Shimmer animation style */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
