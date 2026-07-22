/**
 * Cloud Sync — persistent JSON storage for Vercel serverless.
 *
 * Uses jsonblob.com REST API which reliably persists GET/PUT operations.
 * This is the SINGLE SOURCE OF TRUTH for all CMS data since SQLite
 * on Vercel is ephemeral (lost on cold starts).
 *
 * All admin modules save here: services, settings, FAQ, blog, portfolio.
 */
const BIN_URL = "https://jsonblob.com/api/jsonBlob/019f82d8-da7f-7324-a73b-f5ef41a31206";

/* ── Type Definitions ────────────────────────────────────── */

export interface CloudServiceRecord {
  id?: string;
  name?: string;
  slug?: string;
  categoryName?: string;
  sortOrder?: number;
  tagline?: string;
  description?: string;
  benefits?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string | null;
  secondaryCtaLink?: string | null;
  imagePath?: string | null;
  imageAlt?: string | null;
  faqItems?: string;
}

export interface CloudFaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface CloudBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  imageAltText: string;
  categoryName: string;
  isDraft: boolean;
  publishedAt: string | null;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CloudPortfolioProject {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  servicesUsed: string;
  resultsLabel: string;
  gallery: string;
  caseStudy: string;
  seoTitle?: string;
  seoDesc?: string;
  createdAt?: string;
}

export interface CloudSettingsData {
  email?: string;
  phone?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}

export interface CloudPayload {
  services?: Record<string, CloudServiceRecord>;
  faqs?: CloudFaqItem[];
  settings?: CloudSettingsData;
  scripts?: Record<string, unknown>;
  blog?: Record<string, CloudBlogPost>;
  portfolio?: Record<string, CloudPortfolioProject>;
}

/* ── Cache ───────────────────────────────────────────────── */

let memoryCache: CloudPayload | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 1000;

/* ── GET (read) ──────────────────────────────────────────── */

export async function getCloudData(): Promise<CloudPayload> {
  const now = Date.now();
  if (memoryCache && now - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    const res = await fetch(BIN_URL, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    if (res.ok) {
      const data = (await res.json()) as CloudPayload;
      memoryCache = data || {};
      lastFetchTime = Date.now();
      return memoryCache!;
    }
  } catch (err) {
    console.error("Cloud fetch error:", err);
  }

  return memoryCache || {};
}

/* ── PUT (write) ─────────────────────────────────────────── */

export async function saveCloudData(update: Partial<CloudPayload>): Promise<boolean> {
  try {
    const current = await getCloudData();
    const updatedPayload: CloudPayload = {
      ...current,
      ...update,
    };

    memoryCache = updatedPayload;
    lastFetchTime = Date.now();

    const res = await fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(updatedPayload),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Cloud save failed with status:", res.status);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Cloud save error:", err);
    return false;
  }
}
