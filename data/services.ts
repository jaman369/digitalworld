import { ServiceCategory } from "../types";

export const servicesData: ServiceCategory[] = [
  {
    id: "seo",
    slug: "seo",
    title: "SEO",
    description: "Grow your organic footprint and capture high-intent buyers.",
    iconName: "Search",
    subItems: [
      {
        name: "Local SEO",
        slug: "local-seo",
        description: "Optimize search footprint for localized queries.",
        benefits: ["Optimize Google Business Profile maps", "Gain high-converting regional leads", "Build localized business directory citations"]
      },
      {
        name: "Ecommerce SEO",
        slug: "ecommerce-seo",
        description: "Boost search visibility for your product lines.",
        benefits: ["Rank store categories and product pages", "Structured schema markup integrations", "Crawl budget optimizations"]
      },
      {
        name: "International SEO",
        slug: "international-seo",
        description: "Target customers globally across languages.",
        benefits: ["Hreflang tag auditing and setup", "Multi-region domain optimizations", "Geo-targeted search visibility"]
      },
      {
        name: "Youtube/Video SEO",
        slug: "youtube-video-seo",
        description: "Maximize visibility on top search directories.",
        benefits: ["Optimize video titles, tags, and description", "Increase click-through rates on thumbnails", "Improve video indexing results"]
      },
      {
        name: "SaaS SEO",
        slug: "saas-seo",
        description: "Drive recurring conversions for software systems.",
        benefits: ["Map customer journeys and product pages", "High-intent buyer keyword targeting", "Increase product trial signups"]
      },
      {
        name: "Semantic SEO",
        slug: "semantic-seo",
        description: "Build deep topical authority Google loves.",
        benefits: ["Structure comprehensive content clusters", "Entities mapping and schema additions", "Enhance keyword ranking footprint"]
      },
      {
        name: "AI SEO",
        slug: "ai-seo",
        description: "Leverage AI modules for scaled search optimizations.",
        benefits: ["Automated semantic content updates", "Fast search results auditing", "AI search engines visibility checks"]
      }
    ]
  },
  {
    id: "ppc",
    slug: "ppc",
    title: "PPC / Paid Ads",
    description: "Accelerate conversions through targeted pay-per-click bidding.",
    iconName: "TrendingUp",
    subItems: [
      {
        name: "Google Search Ads",
        slug: "google-search-ads",
        description: "Bid on immediate high-intent customer queries.",
        benefits: ["Setup conversion-focused keyword match structures", "Increase quality scores to lower bidding cost", "Direct phone/leads capture optimization"]
      },
      {
        name: "Google Shopping Ads",
        slug: "google-shopping-ads",
        description: "Showcase product lines directly in results.",
        benefits: ["Clean up merchant center product feeds", "Set up Google Smart Shopping algorithms", "Maximize ROAS on product inventories"]
      },
      {
        name: "Performance Max",
        slug: "performance-max",
        description: "Deploy automated campaigns across all Google properties.",
        benefits: ["Optimize search, maps, discover, display, youtube", "Deploy visual asset groups with copy", "Algorithm attribution checks"]
      },
      {
        name: "YouTube Ads",
        slug: "youtube-ads",
        description: "Run visual video ads to target buyers.",
        benefits: ["Configure in-stream and display video ads", "Retarget viewers based on search activities", "Build visual brand recall scales"]
      },
      {
        name: "Remarketing",
        slug: "remarketing-ads",
        description: "Re-engage past visitors and boost cart actions.",
        benefits: ["Dynamic checkout cart abandonment triggers", "Tailored banner ad displays for hot leads", "Increase standard store conversions"]
      },
      {
        name: "Facebook Ads",
        slug: "facebook-ads",
        description: "Target precise user demographics and lookalikes.",
        benefits: ["Configure custom Facebook Pixel tracking logs", "Create catalog conversion setups", "Build copy and image A/B test variations"]
      },
      {
        name: "Instagram Ads",
        slug: "instagram-ads",
        description: "Leverage high-impact visual stories and reels.",
        benefits: ["Reach dynamic visual buyer profiles", "Design interactive store link triggers", "Run micro-targeting ads campaigns"]
      },
      {
        name: "TikTok Ads",
        slug: "tiktok-ads",
        description: "Scale reach with native looking TikTok videos.",
        benefits: ["Develop trending video ad creative guides", "Target dynamic gen-z and millennial shoppers", "Optimize instant shopping templates"]
      },
      {
        name: "LinkedIn Ads",
        slug: "linkedin-ads",
        description: "B2B prospecting targeting job title metrics.",
        benefits: ["Target marketing CMOs and managers directly", "Setup instant Lead Gen form downloads", "Build pipeline authority for products"]
      }
    ]
  },
  {
    id: "web-design-dev",
    slug: "web-design-dev",
    title: "Web Design & Development",
    description: "Custom visual frontends optimized for UX and conversion metrics.",
    iconName: "Laptop",
    subItems: [
      {
        name: "Website Design (UI/UX)",
        slug: "website-design-ui-ux",
        description: "Modern, high-conversion visual mockups.",
        benefits: ["Create intuitive desktop and mobile user flows", "Figma pixel-perfect UI style setups", "Conversion rate optimization design checks"]
      },
      {
        name: "WordPress Development",
        slug: "wordpress-development",
        description: "Robust content systems and custom configurations.",
        benefits: ["Custom theme build and plugin cleanups", "Fast backend dashboard speeds", "Technical search-friendly configurations"]
      },
      {
        name: "Shopify Development",
        slug: "shopify-development",
        description: "Scalable stores optimized for transaction logs.",
        benefits: ["Configure product pages and checkout flows", "Responsive catalog page architectures", "Setup cart drawers and discounts logic"]
      },
      {
        name: "Landing Page Design",
        slug: "landing-page-design",
        description: "Vibrant custom sales pages built for ads.",
        benefits: ["Fast single-page conversion structures", "Integrate analytics and lead capture systems", "Form validation structures"]
      },
      {
        name: "Website Speed Optimization",
        slug: "website-speed-optimization",
        description: "Accelerate page loads and Core Web Vitals.",
        benefits: ["Compress image scripts and defer code load", "Clean server response and cache setups", "Pass Google PageSpeed audits"]
      },
      {
        name: "Website Maintenance",
        slug: "website-maintenance",
        description: "Security fixes and server maintenance.",
        benefits: ["Uptime checking and server debugging", "Secure daily backups and update schedules", "Priority fixes for theme bugs"]
      },
      {
        name: "Website Migration",
        slug: "website-migration",
        description: "Secure domain transfers and redirects configurations.",
        benefits: ["Zero search visibility drop migrations", "Setup redirect templates and audit paths", "Database database safe movements"]
      },
      {
        name: "CMS Setup",
        slug: "cms-setup",
        description: "Setup headless and traditional CMS engines.",
        benefits: ["Configure Sanity, Contentful, or Strapi panels", "Establish direct API fetch channels", "Train admin teams on updates"]
      }
    ]
  },
  {
    id: "content-marketing",
    slug: "content-marketing",
    title: "Content & Marketing",
    description: "Build authority and lists that drive stable acquisitions.",
    iconName: "PenTool",
    subItems: [
      {
        name: "Blog Writing",
        slug: "blog-writing",
        description: "SEO-optimized articles targeting search intent.",
        benefits: ["Thorough competitor intent checking", "Optimized heading hierarchy structures", "Direct keyword positioning edits"]
      },
      {
        name: "Email Marketing",
        slug: "email-marketing",
        description: "Nurture lists and convert checkouts automatically.",
        benefits: ["Lifecycle automation workflow setup", "High-converting copy layouts", "Continuous list cleansing and validation"]
      },
      {
        name: "Content Marketing",
        slug: "content-marketing",
        description: "Setup whitepapers, lead generation PDFs, and guides.",
        benefits: ["Authoritative brand content design", "Lead magnet acquisition setups", "Social distribution templates"]
      },
      {
        name: "CRO Audit & Testing",
        slug: "cro-audit-testing",
        description: "Identify search bottlenecks and lift sales.",
        benefits: ["Heatmap and screen recording analysis", "Run structural A/B visual tests", "Streamline cart page drop-offs"]
      },
      {
        name: "Backlink Building",
        slug: "backlink-building",
        description: "Build authority links from niche relevant sites.",
        benefits: ["Run outbound email reach campaigns", "Identify unlinked brand mentions", "Anchor text optimization configurations"]
      },
      {
        name: "Digital PR",
        slug: "digital-pr",
        description: "Earn mentions from major news and publisher sites.",
        benefits: ["Establish data-backed outreach pitches", "Pitch editors and journalists directly", "Gain high authority trust links"]
      },
      {
        name: "HARO",
        slug: "haro-services",
        description: "Pitch journalist queries for press mentions.",
        benefits: ["Monitor Help a Reporter queries daily", "Formulate expert medical/tech responses", "Earn high domain trust links"]
      },
      {
        name: "Social Media Content",
        slug: "social-media-content",
        description: "Vibrant visual schedules for social platforms.",
        benefits: ["Design graphic asset groups in Figma", "Manage regular post schedules", "Build brand profile consistency"]
      },
      {
        name: "Press Releases",
        slug: "press-releases",
        description: "Draft and distribute announcements.",
        benefits: ["Draft official press launch copies", "Distribute to wire distribution chains", "Improve syndication visibility"]
      }
    ]
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI Automation",
    description: "Integrate custom intelligent agents and workflows.",
    iconName: "Cpu",
    subItems: [
      {
        name: "AI Chatbot Development",
        slug: "ai-chatbot-development",
        description: "Conversational customer engagement solutions.",
        benefits: ["Setup RAG system mapping to site documentation", "Seamless hand-off to support teams", "Custom widget designs and brand checks"]
      },
      {
        name: "AI Agent Development",
        slug: "ai-agent-development",
        description: "Autonomous task execution engines.",
        benefits: ["Program custom task sequences", "Integrate LLM API nodes securely", "Verify logic and state transitions"]
      },
      {
        name: "Lead Generation Automation",
        slug: "lead-generation-automation",
        description: "Scrape and route new prospective client details.",
        benefits: ["Automate database collection flows", "Enrich leads with social profile stats", "Deliver details directly to team slacks"]
      },
      {
        name: "CRM Automation",
        slug: "crm-automation",
        description: "Sync client profiles across pipeline trackers.",
        benefits: ["Setup HubSpot, Salesforce, or Zoho triggers", "Auto-update pipeline deal statuses", "Sync forms submissions instantly"]
      },
      {
        name: "Workflow Automation",
        slug: "workflow-automation",
        description: "Automate repetitive administrative tasks.",
        benefits: ["Setup Make.com or Zapier blueprints", "Minimize manual data entries", "Establish secure API pipelines"]
      },
      {
        name: "AI Customer Support",
        slug: "ai-customer-support",
        description: "24/7 client response automation.",
        benefits: ["Handle ticket categorizations automatically", "Generate smart draft replies based on docs", "Reduce ticket response time by 80%"]
      },
      {
        name: "AI Content Automation",
        slug: "ai-content-automation",
        description: "Scaled content production templates.",
        benefits: ["Create programmatic outlines and posts", "Verify copy with human editors", "Configure auto-publishing integrations"]
      },
      {
        name: "AI SEO Automation",
        slug: "ai-seo-automation",
        description: "Automated ranking audits and checks.",
        benefits: ["Audit rank deviations dynamically", "Automated title tag optimization cycles", "Identify technical index shifts"]
      },
      {
        name: "Custom AI Solutions",
        slug: "custom-ai-solutions",
        description: "Custom built machine learning architectures.",
        benefits: ["Fine-tune custom model structures", "Integrate local private database nodes", "Setup security compliance parameters"]
      },
      {
        name: "AI Analytics & Reporting",
        slug: "ai-analytics-reporting",
        description: "Dynamic reporting dashboards.",
        benefits: ["Predict customer behaviors and trends", "Summarize complex conversion reports", "Setup anomaly alerts"]
      }
    ]
  },
  {
    id: "china-sourcing",
    slug: "china-sourcing",
    title: "China Sourcing Services",
    description: "End-to-end supply chain sourcing, audits, and logistics.",
    iconName: "Truck",
    subItems: [
      {
        name: "Product Sourcing",
        slug: "product-sourcing",
        description: "Find the best manufacturers for your designs.",
        benefits: ["Compare pricing from multiple factories", "Negotiate bulk production contracts", "Source quality raw materials"]
      },
      {
        name: "Supplier Verification",
        slug: "supplier-verification",
        description: "Run compliance audits and inspect factories.",
        benefits: ["Verify manufacturing license validity", "Inspect factory floor capacity and setups", "Review past production export logs"]
      },
      {
        name: "Quality Inspection",
        slug: "quality-inspection",
        description: "Inspect items pre-shipment to prevent errors.",
        benefits: ["Perform raw material validation checks", "Inspect during-production sample groups", "Verify final packaging specifications"]
      },
      {
        name: "Production Management",
        slug: "production-management",
        description: "Manage milestones and schedule deliveries.",
        benefits: ["Track weekly factory output schedules", "Prevent production lag times", "Ensure raw materials remain available"]
      },
      {
        name: "Order Management",
        slug: "order-management",
        description: "Oversee payment deposits and contracts.",
        benefits: ["Review international payment terms", "Secure escrow deposit configurations", "Manage item delivery declarations"]
      },
      {
        name: "Freight Forwarding",
        slug: "freight-forwarding",
        description: "Organize global ocean and air shipments.",
        benefits: ["Secure container space allocations", "Compare carrier rates for savings", "Manage global port transfers"]
      },
      {
        name: "Customs Clearance",
        slug: "customs-clearance",
        description: "File customs documents and tariff structures.",
        benefits: ["Classify products correctly (HS Codes)", "Calculate tariff duties, import taxes", "Prevent port storage holds"]
      },
      {
        name: "Warehousing",
        slug: "warehousing",
        description: "Store items at secure distribution points.",
        benefits: ["Provide low-cost bulk storage setups", "Fulfillment updates for eCommerce", "Inspect storage moisture levels"]
      },
      {
        name: "Door-to-Door Delivery",
        slug: "door-to-door-delivery",
        description: "Frictionless customs handling and transport.",
        benefits: ["Handle import clearance checks", "Optimize local truck dispatch coordinates", "Provide full shipping route logs"]
      }
    ]
  }
];
