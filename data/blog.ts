import { BlogPost } from "../types";

export const blogData: BlogPost[] = [
  {
    id: "post-1",
    slug: "local-seo-checklist-multi-location-brands-2026",
    title: "Local SEO checklist for multi-location brands in 2026",
    excerpt: "Discover the step-by-step framework to audit GBP entities, map localized landing pages, and capture geo-targeted search intent.",
    content: `
      <p>Dominating localized search queries requires more than setting up Google Business Profiles. If you manage a multi-location brand, search engine algorithm updates mean entity relevance and page speed are highly prioritized.</p>
      
      <h3>1. Clean Up Google Business Profile (GBP) Entities</h3>
      <p>Ensure naming consistency across all properties. Eliminate duplicate profiles and link each location directly to a specialized local landing page rather than the main homepage.</p>
      
      <h3>2. Structured Schema Markup</h3>
      <p>Inject complete LocalBusiness and PostalAddress JSON-LD scripts inside the HTML metadata header of each location page. This allows crawl engines to index your service zones instantly.</p>
      
      <h3>3. Localized Backlinks and Reviews</h3>
      <p>Target regional directory databases and capture customer reviews consistently to boost local prominence indexes.</p>
    `,
    category: "SEO",
    publishedAt: "July 08, 2026",
    readingTime: "5 min read",
    image: "https://picsum.photos/800/500?random=201",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder & Lead Architect"
    }
  },
  {
    id: "post-2",
    slug: "lowering-google-ads-cpa-matching-match-types",
    title: "Lowering Google Ads CPA: matching match types & queries",
    excerpt: "Audit search term query logs and structure bidding hierarchies to limit click spend waste on non-converting clicks.",
    content: `
      <p>Paid ad budgets can dissolve quickly without structural precision. To lower your overall Cost Per Acquisition (CPA), you must audit search term triggers and separate broad vs exact matching targets.</p>
      
      <h3>1. Separate Bidding Intent Campaigns</h3>
      <p>Do not blend high-intent conversion terms with informational terms. Build distinct search campaigns mapping each customer stage.</p>
      
      <h3>2. Negative Keyword Routines</h3>
      <p>Audit query logs weekly. Add non-converting, off-brand, or irrelevant search terms directly to your negative keyword list database.</p>
      
      <h3>3. Leverage Smart Bidding Correctly</h3>
      <p>Wait until you have compiled at least 30 monthly conversion triggers before giving control of bid caps to automated smart algorithms.</p>
    `,
    category: "PPC",
    publishedAt: "June 25, 2026",
    readingTime: "4 min read",
    image: "https://picsum.photos/800/500?random=202",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder & Lead Architect"
    }
  },
  {
    id: "post-3",
    slug: "pass-core-web-vitals-nextjs-script-optimizations",
    title: "Pass Core Web Vitals: Next.js script optimizations",
    excerpt: "Optimize Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) using Next.js font and image modules.",
    content: `
      <p>A fast frontend directly influences conversions and search engines rankings. Under Google's Core Web Vitals index, LCP and CLS scores represent critical benchmarks.</p>
      
      <h3>1. Image Dimension Offsets</h3>
      <p>Always utilize the Next.js Image component with defined width/height ratios or fill styles. This reserves DOM layout spacing and prevents sudden layouts movement (CLS).</p>
      
      <h3>2. Script Load Deferrals</h3>
      <p>Position tracking scripts like GTM or Meta Pixels inside Next.js Script tags with the strategy set to 'afterInteractive' or 'lazyOnload' to free up main thread processing resources.</p>
      
      <h3>3. Server Pre-render and Caching</h3>
      <p>Leverage Static Site Generation (SSG) for all standard landing and blog pages, ensuring users fetch HTML instantly from CDN edges.</p>
    `,
    category: "Web Dev",
    publishedAt: "May 14, 2026",
    readingTime: "6 min read",
    image: "https://picsum.photos/800/500?random=203",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder & Lead Architect"
    }
  }
];
