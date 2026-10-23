import { BlogPost } from "../types";

export const blogData: BlogPost[] = [
  {
    id: "post-dw-1",
    slug: "what-is-a-digital-marketing-agency",
    title: "What Is a Digital Marketing Agency and What Does It Do?",
    excerpt: "A comprehensive breakdown of how full-service digital agencies drive revenue through integrated search, paid ads, web design, and AI automation.",
    content: `
      <p>A digital marketing agency plans and executes online growth strategies that turn search visibility into qualified pipeline and revenue. Rather than treating SEO, PPC, and web development as separate silos, full-service agencies unify them under a single, accountable strategy.</p>
      <h3>Core Responsibilities of a Modern Digital Marketing Agency</h3>
      <p>Today's competitive landscape demands an omni-channel acquisition funnel. An experienced agency analyzes target audiences, optimizes search intent across traditional and generative engines (GEO/AEO), launches targeted paid advertising campaigns, and automates CRM workflows to scale customer acquisition efficiently.</p>
      <h3>Why Businesses Partner With Full-Service Agencies</h3>
      <p>Working with a dedicated agency provides immediate access to senior strategists, eliminates overhead costs of hiring multiple in-house specialists, and ensures every marketing dollar directly supports revenue growth.</p>
    `,
    category: "Digital Strategy",
    publishedAt: "October 20, 2026",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-dw-2",
    slug: "how-much-do-seo-services-cost-in-2026",
    title: "How Much Do SEO Services Cost in 2026?",
    excerpt: "Understand realistic SEO pricing models in 2026, from monthly retainers to technical audits, and how to evaluate return on investment.",
    content: `
      <p>SEO pricing in 2026 varies based on competition, domain authority, technical complexity, and target market scale. Businesses generally invest between $1,500 and $7,500 monthly for full-service organic search optimization that produces compounding revenue growth.</p>
      <h3>Common SEO Pricing Models</h3>
      <p>1. <strong>Monthly Retainers:</strong> Comprehensive ongoing execution covering technical fixes, content clustering, link building, and Generative Engine Optimization.</p>
      <p>2. <strong>Project-Based Audits:</strong> In-depth technical and architectural audits identifying crawl budget leaks, indexing errors, and structured data gaps.</p>
      <h3>Evaluating SEO ROI</h3>
      <p>Unlike paid advertising where traffic stops the moment budget pauses, high-authority organic rankings deliver compounding returns over quarters and years, resulting in significantly lower Customer Acquisition Costs (CAC).</p>
    `,
    category: "SEO",
    publishedAt: "October 18, 2026",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-dw-3",
    slug: "geo-vs-seo-how-to-get-cited-by-chatgpt-and-perplexity",
    title: "GEO vs SEO: How to Get Cited by ChatGPT and Perplexity",
    excerpt: "Discover the differences between traditional SEO and Generative Engine Optimization (GEO), and learn how to position your brand for AI search citations.",
    content: `
      <p>Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) represent the biggest shift in search since Google's launch. AI tools like ChatGPT, Perplexity, and Google AI Overviews synthesize direct answers rather than simply listing 10 blue links.</p>
      <h3>Key Differences Between SEO and GEO</h3>
      <p>While traditional SEO focuses on keyword density and backlink volume, GEO prioritizes semantic entity clarity, quotation authority, statistical data density, and direct problem-solving definitions.</p>
      <h3>How to Earn Citations in AI Search Engines</h3>
      <p>1. <strong>Publish Original Statistics & Benchmarks:</strong> LLMs cite primary research and quantified performance metrics frequently.</p>
      <p>2. <strong>Implement Structured Schema Markup:</strong> Help AI crawlers parse key entity relationships and author expertise instantly.</p>
      <p>3. <strong>Clear Direct Answer Blocks:</strong> Provide concise, factual answers at the top of informational articles before expanding into depth.</p>
    `,
    category: "AI SEO",
    publishedAt: "October 15, 2026",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-1",
    slug: "how-to-increase-your-roi-through-scientific-sem",
    title: "How to Increase Your ROI Through scientific SEM?",
    excerpt: "A real client, a real strategy, and real results. We break down exactly how we took an e-commerce store from 12,000 monthly visitors to 25,000 — without a single paid ad.",
    content: `
      <p>Dominating localized search queries requires more than setting up Google Business Profiles. If you manage a multi-location brand, search engine algorithm updates mean entity relevance and page speed are highly prioritized.</p>
      <h3>1. Clean Up Google Business Profile (GBP) Entities</h3>
      <p>Ensure naming consistency across all properties. Eliminate duplicate profiles and link each location directly to a specialized local landing page rather than the main homepage.</p>
      <h3>2. Structured Schema Markup</h3>
      <p>Inject complete LocalBusiness and PostalAddress JSON-LD scripts inside the HTML metadata header of each location page. This allows crawl engines to index your service zones instantly.</p>
      <h3>3. Localized Backlinks and Reviews</h3>
      <p>Target regional directory databases and capture customer reviews consistently to boost local prominence indexes.</p>
    `,
    category: "SEM / SEO",
    publishedAt: "August 2, 2025",
    readingTime: "9 min read",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-2",
    slug: "simple-ways-to-optimize-your-website-for-seo",
    title: "Simple Ways To Optimize Your Website For SEO",
    excerpt: "Google's algorithm has fundamentally shifted. Here's how to build topical authority and stop chasing individual keywords with clean structure.",
    content: `
      <p>A fast frontend directly influences conversions and search engines rankings. Under Google's Core Web Vitals index, LCP and CLS scores represent critical benchmarks.</p>
      <h3>1. Image Dimension Offsets</h3>
      <p>Always utilize the Next.js Image component with defined width/height ratios or fill styles. This reserves DOM layout spacing and prevents sudden layouts movement (CLS).</p>
      <h3>2. Script Load Deferrals</h3>
      <p>Position tracking scripts like GTM or Meta Pixels inside Next.js Script tags with the strategy set to 'afterInteractive' or 'lazyOnload' to free up main thread processing resources.</p>
    `,
    category: "SEO",
    publishedAt: "August 1, 2025",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  },
  {
    id: "post-3",
    slug: "the-basics-of-blogging-search-optimization",
    title: "The Basics of Blogging Search Optimization",
    excerpt: "Most blog posts waste 15-30% of their organic reach potential. We diagnose the 7 most common leaks and show you exactly how to optimize.",
    content: `
      <p>Paid ad budgets can dissolve quickly without structural precision. To lower your overall Cost Per Acquisition (CPA), you must audit search term triggers and separate broad vs exact matching targets.</p>
      <h3>1. Separate Bidding Intent Campaigns</h3>
      <p>Do not blend high-intent conversion terms with informational terms. Build distinct search campaigns mapping each customer stage.</p>
    `,
    category: "Blogging",
    publishedAt: "August 1, 2025",
    readingTime: "10 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
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
    publishedAt: "July 20, 2025",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1556742049-0a67daf64f22?q=80&w=800&auto=format&fit=crop",
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
    publishedAt: "July 15, 2025",
    readingTime: "12 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
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
    publishedAt: "July 05, 2025",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Kamrujjaman Mufti",
      role: "Founder - Digital World"
    }
  }
];
