import { NextRequest, NextResponse } from "next/server";

const MASTER_PROMPT = `Act as an expert Technical SEO Consultant with 15+ years of experience auditing websites for ranking performance, technical health, and content quality.

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
- One-paragraph executive summary for a non-technical reader`;

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid URL is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API key is not configured. Please add ANTHROPIC_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const prompt = `${MASTER_PROMPT}\n\nWebsite URL to audit: ${url}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
        tools: [{ type: "web_search_20250305", name: "web_search" }],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Anthropic API error:", response.status, errBody);
      return NextResponse.json(
        { error: `Anthropic API returned status ${response.status}.` },
        { status: 502 }
      );
    }

    const data = await response.json();

    const text = (data.content || [])
      .filter((block: { type: string }) => block.type === "text")
      .map((block: { text: string }) => block.text)
      .join("\n\n");

    if (!text.trim()) {
      return NextResponse.json(
        { error: "No report content was returned from the API." },
        { status: 502 }
      );
    }

    return NextResponse.json({ report: text });
  } catch (err) {
    console.error("SEO Audit API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
