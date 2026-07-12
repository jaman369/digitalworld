import { BlogPost } from "../types";

export const blogData: BlogPost[] = [
  {
    id: "post-1",
    slug: "how-we-doubled-organic-traffic-4-months-seo-case-study",
    title: "How We Doubled Organic Traffic in 4 Months: A Step-by-Step SEO Case Study",
    excerpt: "A real client, a real strategy, and real results. We break down exactly how we took an e-commerce store from 12,000 monthly visitors to 25,000 — without a single paid ad. Includes the full keyword map, content plans, and backlink strategy we used.",
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
    publishedAt: "May 5, 2025",
    readingTime: "9 min read",
    image: "https://picsum.photos/800/500?random=204",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-2",
    slug: "semantic-seo-2025-topical-authority-vs-keyword-density",
    title: "Semantic SEO in 2025: How Topical Authority Beats Keyword Density",
    excerpt: "Google's algorithm has fundamentally shifted. Here's how to build topical authority and stop chasing individual keywords.",
    content: `
      <p>A fast frontend directly influences conversions and search engines rankings. Under Google's Core Web Vitals index, LCP and CLS scores represent critical benchmarks.</p>
      <h3>1. Image Dimension Offsets</h3>
      <p>Always utilize the Next.js Image component with defined width/height ratios or fill styles. This reserves DOM layout spacing and prevents sudden layouts movement (CLS).</p>
      <h3>2. Script Load Deferrals</h3>
      <p>Position tracking scripts like GTM or Meta Pixels inside Next.js Script tags with the strategy set to 'afterInteractive' or 'lazyOnload' to free up main thread processing resources.</p>
    `,
    category: "SEO",
    publishedAt: "Apr 28, 2025",
    readingTime: "7 min read",
    image: "https://picsum.photos/800/500?random=205",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-3",
    slug: "why-google-ads-roas-is-low-fix-fast",
    title: "Why Your Google Ads ROAS is Low (And How to Fix It Fast)",
    excerpt: "Most ad accounts waste 15-30% of budget. We diagnose the 7 most common leaks and show you exactly how to plug the holes.",
    content: `
      <p>Paid ad budgets can dissolve quickly without structural precision. To lower your overall Cost Per Acquisition (CPA), you must audit search term triggers and separate broad vs exact matching targets.</p>
      <h3>1. Separate Bidding Intent Campaigns</h3>
      <p>Do not blend high-intent conversion terms with informational terms. Build distinct search campaigns mapping each customer stage.</p>
    `,
    category: "Google Ads",
    publishedAt: "Apr 15, 2025",
    readingTime: "10 min read",
    image: "https://picsum.photos/800/500?random=206",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-4",
    slug: "shopify-vs-wordpress-2025-conversion-comparison",
    title: "Shopify vs WordPress in 2025: Which Platform Actually Converts Better?",
    excerpt: "We run the same conversions test platform for 60 days. The results surprised us. A side-by-side comparison with real conversion numbers.",
    content: `
      <p>Choosing the right store manager engine is crucial. In this test, we evaluate conversion metrics, loading speeds, and checkout drop-off rates across platforms.</p>
      <h3>1. Checkout Flow Comparison</h3>
      <p>Shopify's single-page checkout out-of-the-box handles transactions 10-15% faster, leading to higher overall sales thresholds.</p>
    `,
    category: "Web Dev",
    publishedAt: "Apr 10, 2025",
    readingTime: "8 min read",
    image: "https://picsum.photos/800/500?random=207",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-5",
    slug: "content-cluster-strategy-ranks-500-keywords",
    title: "The Content Cluster Strategy That Ranks for 500+ Keywords",
    excerpt: "Stop writing and praying. This pillar cluster content model is how we consistently rank for high-intent keywords in competitive niches.",
    content: `
      <p>Creating dynamic keyword models requires strategic organization. Learn how to construct high-authority parent pillars and child posts.</p>
      <h3>1. Map Parent Pillars</h3>
      <p>Establish highly comprehensive guides that introduce broader concepts and direct readers to specific subtopics.</p>
    `,
    category: "Content Marketing",
    publishedAt: "Mar 30, 2025",
    readingTime: "12 min read",
    image: "https://picsum.photos/800/500?random=208",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-6",
    slug: "shopify-store-conversion-rate-improvement-cro",
    title: "How We Improved a Shopify Store's Conversion Rate by 150% in 60 Days",
    excerpt: "A deep dive into the CRO techniques we used, from checkout designs to checkout flows optimization — that tripled revenue for a UK retail brand.",
    content: `
      <p>Lifting cart values requires optimized layouts. We identify how reducing steps and refining product descriptions boosted overall yields.</p>
      <h3>1. Reduce Layout Friction</h3>
      <p>Simplify cart screens to display direct shipping estimates and trust metrics instantly on item selection.</p>
    `,
    category: "E-commerce",
    publishedAt: "Mar 20, 2025",
    readingTime: "7 min read",
    image: "https://picsum.photos/800/500?random=209",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-7",
    slug: "three-email-sequence-generates-revenue",
    title: "The 3-email Sequence That Generates 20% of Our Clients' Revenue",
    excerpt: "Most businesses send too many or too few emails. This welcome sequence framework nurtures leads on autopilot and converts the checkouts.",
    content: `
      <p>Email remain a high-value direct outreach platform. We draft the welcome and purchase sequences to automatically convert browser dropoffs.</p>
      <h3>1. The Value Pitch Draft</h3>
      <p>Deliver helpful technical guidance and immediate value insights to establish authority before driving any sales pitch.</p>
    `,
    category: "Email Marketing",
    publishedAt: "Mar 12, 2025",
    readingTime: "8 min read",
    image: "https://picsum.photos/800/500?random=210",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-8",
    slug: "local-seo-2025-complete-checklist",
    title: "Local SEO in 2025: The Complete Checklist for Small Businesses",
    excerpt: "From Google Business Profile optimization to local citations and schema strategy — everything you need to dominate local search results.",
    content: `
      <p>Localized discovery is the lifeblood of nearby services. Optimize map visibility, citation directories, and localized technical schema details.</p>
      <h3>1. Local GBP Configurations</h3>
      <p>Complete product catalogues and photo schedules inside business profiles to keep maps relevance scores high.</p>
    `,
    category: "SEO",
    publishedAt: "Feb 15, 2025",
    readingTime: "15 min read",
    image: "https://picsum.photos/800/500?random=211",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-9",
    slug: "facebook-ads-2025-whats-working-now",
    title: "Facebook Ads in 2025: What's Working Right Now (With Examples)",
    excerpt: "The algorithm has changed. Static images are back, broad targeting wins. Here's our up-to-date playbook for Meta ad campaigns that actually convert.",
    content: `
      <p>Paid social campaigns require programmatic creatives. We structure dynamic ads groupings to optimize CPA conversion rates.</p>
      <h3>1. Creative Hook Formulas</h3>
      <p>Use short visual guides that address direct industry painpoints inside the first three seconds of video displays.</p>
    `,
    category: "Social Media",
    publishedAt: "Jan 22, 2025",
    readingTime: "10 min read",
    image: "https://picsum.photos/800/500?random=212",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  }
];
