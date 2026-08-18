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
        tagline: "Dominate your local market on Google.",
        description: "When someone searches for your service near them, you need to be the first name they see — on Maps, in local packs, and in organic results. We build the full local SEO foundation that puts you there and keeps you there.",
        benefits: [
          "Google Business Profile optimisation & management",
          "Local citation building (60+ high-authority directories)",
          "Review generation strategy & reputation management",
          "Localised on-page SEO & geo-targeted landing pages",
          "Competitor gap analysis & local keyword research",
          "NAP consistency audit across all platforms"
        ],
        primaryCtaText: "Get Local SEO Quote",
        primaryCtaLink: "/contact?service=local-seo",
        secondaryCtaText: "View Case Studies",
        secondaryCtaLink: "/portfolio?service=local-seo"
      },
      {
        name: "Ecommerce SEO",
        slug: "ecommerce-seo",
        tagline: "Turn searchers into repeat customers.",
        description: "Ranking product and category pages requires unique technical architecture and authority. We help Shopify, WooCommerce, and custom ecommerce stores build organic search traffic that consistently buys.",
        benefits: [
          "Site architecture optimization & facet/filter index management",
          "Structured data setup (Product, Review & Offer schema)",
          "Keyword research targeting transactional & commercial intent",
          "Optimized category & product descriptions that sell",
          "Core Web Vitals & mobile commerce optimization",
          "Ecom link building & digital PR placements"
        ],
        primaryCtaText: "Grow Store Traffic",
        primaryCtaLink: "/contact?service=ecommerce-seo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=ecommerce-seo"
      },
      {
        name: "International SEO",
        slug: "international-seo",
        tagline: "Rank in every market you want to enter.",
        description: "Selling across borders means competing in different languages, different search behaviours, and different Google indices. We've helped businesses rank in the USA, UK, Canada, Australia, UAE, Germany, and beyond — with the right strategy for each market.",
        benefits: [
          "hreflang implementation & international site architecture",
          "Market-specific keyword research in 10+ languages",
          "Country/language targeting via Google Search Console",
          "Multi-market competitor analysis & gap mapping",
          "Local domain strategy (ccTLD vs subfolder vs subdomain)",
          "International link building & digital PR"
        ],
        primaryCtaText: "Expand Globally",
        primaryCtaLink: "/contact?service=international-seo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=international-seo"
      },
      {
        name: "Link Building",
        slug: "link-building",
        tagline: "High-authority backlinks that drive search rankings & domain trust.",
        description: "High-quality, white-hat backlinks are one of Google's top ranking signals. We execute targeted outreach, digital PR campaigns, and niche placement strategies to build real domain authority and sustainably increase your search rankings.",
        benefits: [
          "Manual white-hat blogger outreach & niche editorial placements",
          "High DR / DA domain target vetting (zero spam networks)",
          "Digital PR campaigns & data-driven story pitching",
          "Broken link building & competitor backlink gap replication",
          "Anchor text diversity optimization & penalty-safe profiles",
          "Transparent monthly backlink placement & referral traffic reporting"
        ],
        primaryCtaText: "Build Backlinks",
        primaryCtaLink: "/contact?service=link-building",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=link-building"
      },
      {
        name: "SaaS SEO",
        slug: "saas-seo",
        tagline: "Drive signups with organic search.",
        description: "SaaS SEO is about capturing users at every stage of the funnel — from awareness through comparison to decision. We build topical authority, rank for high-intent product keywords, and create content that turns readers into trial users.",
        benefits: [
          "Full-funnel keyword strategy (TOFU, MOFU, BOFU)",
          "Competitor & alternative page optimisation",
          "Integration & use-case landing page SEO",
          "Product-led content strategy & editorial calendar",
          "Programmatic SEO for scalable page creation",
          "B2B link building & SaaS review site management"
        ],
        primaryCtaText: "Grow My SaaS",
        primaryCtaLink: "/contact?service=saas-seo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=saas-seo"
      },
      {
        name: "Semantic SEO",
        slug: "semantic-seo",
        tagline: "Build topical authority. Outrank everyone.",
        description: "Google doesn't just rank pages — it ranks trusted topical authorities. Semantic SEO is about building a deep, interconnected content ecosystem that signals expertise, authority, and trustworthiness across your entire niche. This is the future of SEO, and we're already doing it.",
        benefits: [
          "Topical authority mapping & content cluster architecture",
          "Entity SEO & Knowledge Graph optimisation",
          "Semantic keyword research (NLP & LSI-based)",
          "Pillar page + content cluster creation strategy",
          "Internal linking architecture for authority flow",
          "E-E-A-T signals & author authority building"
        ],
        primaryCtaText: "Build My Authority",
        primaryCtaLink: "/contact?service=semantic-seo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=semantic-seo"
      },
      {
        name: "AEO",
        slug: "aeo",
        tagline: "Be the direct answer on ChatGPT, Perplexity & Siri.",
        description: "Answer Engine Optimization positions your brand as the single authoritative source for conversational AI engines like ChatGPT, Perplexity, Claude, and Voice Search. We format and structure your content so AI assistants cite your business first when users ask direct questions.",
        benefits: [
          "ChatGPT, Perplexity & Claude citation optimization",
          "Direct answer snippet & Q&A content structuring",
          "Conversational search intent & prompt targeting",
          "Knowledge Graph & brand entity validation",
          "Voice search & assistant response optimization",
          "AI citation tracking & response monitoring"
        ],
        primaryCtaText: "Optimize for AEO",
        primaryCtaLink: "/contact?service=aeo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=aeo"
      },
      {
        name: "GEO",
        slug: "geo",
        tagline: "Dominate AI Overviews & Generative Search Results.",
        description: "Generative Engine Optimization ensures your content is selected, summarized, and recommended inside Google AI Overviews and generative search engines. We combine authoritative data points, expert quotes, and structured facts to secure top placement in generative responses.",
        benefits: [
          "Google AI Overviews (SGE) recommendation strategy",
          "Generative engine citation & source placement",
          "Authoritative statistical data & expert quote integration",
          "Multi-modal content & vector search optimization",
          "Fluency & semantic clarity engineering for AI parsers",
          "Generative visibility & impression analytics"
        ],
        primaryCtaText: "Optimize for GEO",
        primaryCtaLink: "/contact?service=geo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=geo"
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
        tagline: "Be first when buyers search for you.",
        description: "Google Search Ads put your business at the very top of results when high-intent customers are actively searching. We don't just run ads — we build full-funnel keyword architecture, precision match-type strategies, and relentlessly optimised ad copy that converts browsers into buyers.",
        benefits: [
          "Deep keyword research & negative keyword strategy",
          "Compelling ad copy with A/B split testing",
          "Smart bidding setup (Target ROAS, tCPA, Maximize Conversions)",
          "Landing page alignment & Quality Score optimisation",
          "Conversion tracking via Google Tag Manager",
          "Weekly performance reporting & budget recommendations"
        ],
        primaryCtaText: "Get Search Ads Quote",
        primaryCtaLink: "/contact?service=google-search-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=google-search-ads"
      },
      {
        name: "Google Shopping Ads",
        slug: "google-shopping-ads",
        tagline: "Put your products in front of ready-to-buy shoppers.",
        description: "Google Shopping Ads show your product image, price, and brand before a user even clicks — the highest-intent placement in e-commerce. We build bulletproof product feed architecture, optimize titles and attributes, and structure campaigns for maximum Shopping ROAS.",
        benefits: [
          "Google Merchant Center setup & feed optimisation",
          "Product title & attribute optimisation for CTR",
          "Custom label strategy for bidding segmentation",
          "Competitor price & impression share monitoring",
          "Shopping campaign restructuring & priority bidding",
          "Feed health audits & policy violation fixes"
        ],
        primaryCtaText: "Grow Store Sales",
        primaryCtaLink: "/contact?service=google-shopping-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=google-shopping-ads"
      },
      {
        name: "Performance Max",
        slug: "performance-max",
        tagline: "AI-powered campaigns. Every Google channel.",
        description: "Performance Max lets Google's AI place your ads across Search, Shopping, Display, YouTube, Gmail, and Maps — all from a single campaign. But without the right asset strategy and audience signals, PMax wastes the budget fast. We set it up correctly from day one and continuously refine signals for outsized returns.",
        benefits: [
          "Asset group architecture & creative strategy",
          "First-party audience signals & customer list uploads",
          "Brand vs non-brand campaign segmentation",
          "Search term insights & negative keyword feeds",
          "Creative performance analysis & refresh schedule",
          "PMax + Standard Search hybrid strategy"
        ],
        primaryCtaText: "Configure PMax",
        primaryCtaLink: "/contact?service=performance-max",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=performance-max"
      },
      {
        name: "YouTube Ads",
        slug: "youtube-ads",
        tagline: "Video ads that stop the scroll — and sell.",
        description: "YouTube reaches over 2 billion users monthly. With the right creative and targeting, you can capture demand before it reaches Search. We handle everything from audience strategy and format selection to creative briefs and campaign optimisation — whether you're building brand awareness or driving direct response.",
        benefits: [
          "In-stream, in-feed, bumper & masthead format strategy",
          "Audience targeting: affinity, intent, remarketing, lookalikes",
          "Creative brief & video ad script consultation",
          "Brand lift & view-through conversion tracking",
          "YouTube + Search funnel integration",
          "Competitor ad library analysis & creative benchmarking"
        ],
        primaryCtaText: "Launch Video Ads",
        primaryCtaLink: "/contact?service=youtube-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=youtube-ads"
      },
      {
        name: "Remarketing",
        slug: "remarketing-ads",
        tagline: "Win back the visitors who almost converted.",
        description: "97% of first-time visitors don't convert. Remarketing puts your brand back in front of warm audiences across Google Display, YouTube, and social platforms — keeping you top-of-mind until they're ready to buy. We build sequenced, audience-segmented remarketing funnels that close the loop on lost revenue.",
        benefits: [
          "Google Ads & Meta pixel setup & audience segmentation",
          "Dynamic remarketing with personalised product ads",
          "Sequential ad storytelling for multi-touchpoint journeys",
          "Cart abandonment & checkout recovery campaigns",
          "Customer list-based remarketing (email upload)",
          "Frequency capping to avoid ad fatigue"
        ],
        primaryCtaText: "Set Up Remarketing",
        primaryCtaLink: "/contact?service=remarketing-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=remarketing-ads"
      },
      {
        name: "Facebook Ads",
        slug: "facebook-ads",
        tagline: "3 billion people. Your exact customer.",
        description: "Facebook's ad platform remains the most powerful social advertising tool ever built — when used correctly. We combine precise interest stacking, lookalike audience engineering, and high-converting creative formats to consistently deliver profitable campaigns for e-commerce, lead gen, and service businesses alike.",
        benefits: [
          "Campaign structure: Awareness / Consideration / Conversion",
          "Interest, behaviour & lookalike audience targeting",
          "Advantage+ Shopping Campaigns (ASC) setup & scaling",
          "Ad creative strategy: static, carousel, video & UGC",
          "Meta Pixel & Conversions API (CAPI) implementation",
          "Scaling frameworks: horizontal & vertical budget scaling"
        ],
        primaryCtaText: "Scale Meta Ads",
        primaryCtaLink: "/contact?service=facebook-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=facebook-ads"
      },
      {
        name: "Instagram Ads",
        slug: "instagram-ads",
        tagline: "Visual-first ads for a visual-first generation.",
        description: "Instagram is where discovery happens — and where purchasing decisions are shaped before people even realise it. With 2 billion monthly actives and some of the highest engagement rates in social media, Instagram Ads are a goldmine for lifestyle brands, fashion, food, beauty, fitness, and e-commerce. We make your brand impossible to scroll past.",
        benefits: [
          "Reels, Stories, feed & Explore placement strategy",
          "Creative direction: UGC-style, branded, influencer-adjacent",
          "Instagram Shopping catalogue integration",
          "Audience targeting by demographics, interests & behaviours",
          "A/B testing: hook angles, CTAs, visual formats",
          "Story-to-link swipe-up & DM automation flows"
        ],
        primaryCtaText: "Launch Instagram Ads",
        primaryCtaLink: "/contact?service=instagram-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=instagram-ads"
      },
      {
        name: "TikTok & LinkedIn Ads",
        slug: "tiktok-linkedin-ads",
        tagline: "Where the next generation buys — and B2B decides.",
        description: "TikTok reaches Gen Z and Millennial audiences with viral-native ad formats at dramatically lower CPMs than Meta. LinkedIn is the only platform where you can target by job title, company, and industry — making it the undisputed channel for B2B lead generation. We run both with platform-specific creative that actually performs.",
        benefits: [
          "In-feed video ads, TopView & Branded Hashtag Challenges",
          "Spark Ads (boosting organic creator content)",
          "TikTok Pixel setup & purchase event tracking",
          "LinkedIn sponsored content, message ads & lead gen forms",
          "B2B decision-maker targeting (company size, seniority, titles)",
          "Creative briefs: hooks, trends, B2B lead Magnets"
        ],
        primaryCtaText: "Launch B2B / Viral Ads",
        primaryCtaLink: "/contact?service=tiktok-linkedin-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=tiktok-linkedin-ads"
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
        tagline: "Form follows function, but first it converts.",
        description: "User-centered design that balances aesthetics with functionality. We create intuitive interfaces that guide visitors toward conversion while delivering a delightful experience.",
        benefits: [
          "Custom responsive web design",
          "Wireframing & prototyping",
          "User journey mapping",
          "Conversion-optimized layouts",
          "Interactive prototypes",
          "Design systems & UI kits"
        ],
        primaryCtaText: "Get UI/UX Quote →",
        primaryCtaLink: "/contact?service=ui-ux",
        secondaryCtaText: "📁 View Case Studies",
        secondaryCtaLink: "/portfolio?service=ui-ux"
      },
      {
        name: "WordPress Development",
        slug: "wordpress-development",
        tagline: "Prevent WordPress from bulk or bloat.",
        description: "Custom WordPress themes and plugins, optimized for speed, security, and SEO. We build sites that are easy to manage and grow with your business.",
        benefits: [
          "Custom theme development",
          "Plugin development & customization",
          "WooCommerce integration",
          "Speed & security optimization",
          "Headless WordPress setups",
          "Easy content editor configuration"
        ],
        primaryCtaText: "Create WordPress Site →",
        primaryCtaLink: "/contact?service=wordpress",
        secondaryCtaText: "📁 View Case Studies",
        secondaryCtaLink: "/portfolio?service=wordpress"
      },
      {
        name: "Shopify Development",
        slug: "shopify-development",
        tagline: "Shopify stores built to sell from day one.",
        description: "We build Shopify stores that are fast, beautiful, and conversion-optimised. From custom theme development to complex app integrations — we've helped brands in the UK, USA, and Australia increase conversions by up to 180% within 60 days of launch.",
        benefits: [
          "Custom Shopify theme development & design",
          "Product page & checkout optimisation",
          "Shopify app integration & custom Liquid coding",
          "International markets & multi-currency setup",
          "Shopify migration from WooCommerce or other platforms",
          "Core Web Vitals & mobile performance tuning"
        ],
        primaryCtaText: "Build My Shopify Store →",
        primaryCtaLink: "/contact?service=shopify",
        secondaryCtaText: "📁 See Store Examples",
        secondaryCtaLink: "/portfolio?service=shopify"
      },
      {
        name: "Landing Page Design",
        slug: "landing-page-design",
        tagline: "Landing pages engineered to convert visitors into buyers.",
        description: "High-converting landing pages designed with psychological triggers, compelling copy, and clear CTAs that turn visitors into leads and customers.",
        benefits: [
          "A/B tested page layouts",
          "Conversion-focused copywriting",
          "Lead capture form integration",
          "Analytics & tracking setup",
          "Rapid deployment pages",
          "Multi-variant testing setup"
        ],
        primaryCtaText: "Design Landing Page →",
        primaryCtaLink: "/contact?service=landing-page",
        secondaryCtaText: "📁 View Case Studies",
        secondaryCtaLink: "/portfolio?service=landing-page"
      },
      {
        name: "Website Speed Optimization",
        slug: "website-speed-optimization",
        tagline: "Every millisecond counts for your bottom line.",
        description: "Core Web Vitals optimization, image compression, code minification, and caching strategies that make your site blazing fast and Google-approved.",
        benefits: [
          "Core Web Vitals optimization",
          "Image & asset compression",
          "CDN & caching setup",
          "Code minification & lazy loading",
          "Database optimization",
          "Server response time optimization"
        ],
        primaryCtaText: "Optimize Speed →",
        primaryCtaLink: "/contact?service=speed-opt",
        secondaryCtaText: "📁 View Case Studies",
        secondaryCtaLink: "/portfolio?service=speed-opt"
      },
      {
        name: "Website Maintenance",
        slug: "website-maintenance",
        tagline: "Keep your site secure, updated & always running.",
        description: "Ongoing maintenance, security monitoring, plugin updates, and performance monitoring to ensure your website runs smoothly 24/7.",
        benefits: [
          "Regular security updates",
          "Plugin & theme updates",
          "Daily backups & monitoring",
          "Performance reporting",
          "Priority support & edits",
          "Downtime emergency fix"
        ],
        primaryCtaText: "Get Maintenance →",
        primaryCtaLink: "/contact?service=maintenance",
        secondaryCtaText: "📁 View Case Studies",
        secondaryCtaLink: "/portfolio?service=maintenance"
      },
      {
        name: "Website Migration",
        slug: "website-migration",
        tagline: "Seamless site migration with zero ranking loss.",
        description: "Moving websites can be risky. We ensure a seamless transition of your domain, database, CMS, and link structure with zero downtime and preserved search rankings.",
        benefits: [
          "CMS platform transitions (e.g. WordPress to Shopify)",
          "Full database, user registry & asset transfer",
          "301 redirect mapping & server-level configuration",
          "Pre and post-migration SEO ranking audits",
          "Broken link verification & redirect mapping",
          "Secure domain name server (DNS) transfers"
        ],
        primaryCtaText: "Migrate Website →",
        primaryCtaLink: "/contact?service=migration",
        secondaryCtaText: "📁 View Case Studies",
        secondaryCtaLink: "/portfolio?service=migration"
      },
      {
        name: "CMS Setup",
        slug: "cms-setup",
        tagline: "CMS setup configured exactly for your team.",
        description: "We configure, customize, and optimize your chosen CMS platform to give you a powerful, flexible, and easy-to-use editor interface.",
        benefits: [
          "CMS platform recommendations (WordPress, Shopify, Webflow, etc.)",
          "Standard theme installation & base configuration",
          "Setup of essential security, SEO & speed plugins/apps",
          "Custom fields & content architecture modeling",
          "Role-based user permissions & approval flows",
          "Dashboard cleanups & administrative documentation"
        ],
        primaryCtaText: "Setup CMS →",
        primaryCtaLink: "/contact?service=cms-setup",
        secondaryCtaText: "📁 View Case Studies",
        secondaryCtaLink: "/portfolio?service=cms-setup"
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
