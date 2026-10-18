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
        tagline: "Dominate your local market on Google & Maps.",
        description: "When someone searches for your service near them, you need to be the first name they see — on Maps, in local packs, and in organic results. We build the full local SEO foundation that puts you there and keeps you there.",
        benefits: [
          "Google Business Profile optimisation & weekly management",
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
        tagline: "Turn high-intent searchers into repeat customers.",
        description: "Ranking product and category pages requires unique technical architecture, faceted navigation control, and transactional search intent optimization. We help Shopify, WooCommerce, and custom ecommerce stores build organic search traffic that consistently buys.",
        benefits: [
          "Site architecture optimization & facet/filter index management",
          "Structured data setup (Product, Review & Offer schema)",
          "Keyword research targeting transactional & commercial intent",
          "Optimized category & product descriptions that sell",
          "Core Web Vitals & mobile commerce checkout speed optimization",
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
        tagline: "Rank in every global market you want to enter.",
        description: "Selling across borders means competing in different languages, regional search behaviours, and localized Google indices. We've helped businesses rank in the USA, UK, Canada, Australia, UAE, Germany, and beyond — with the right multi-regional strategy for each target country.",
        benefits: [
          "Flawless hreflang implementation & international site architecture",
          "Market-specific keyword research & cultural intent in 10+ languages",
          "Country/language targeting via Google Search Console & Bing Webmaster",
          "Multi-market competitor analysis & global backlink gap mapping",
          "Local domain strategy guidance (ccTLD vs subfolder vs subdomain)",
          "International link building & localized digital PR outreach"
        ],
        primaryCtaText: "Expand Globally",
        primaryCtaLink: "/contact?service=international-seo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=international-seo"
      },
      {
        name: "SaaS SEO",
        slug: "saas-seo",
        tagline: "Drive high-intent trial signups and demo bookings.",
        description: "SaaS SEO is about capturing software buyers across the entire funnel — from awareness problem-solving through comparison to buying decisions. We build topical authority, rank for high-intent product keywords, and create content that turns readers into trial users.",
        benefits: [
          "Full-funnel SaaS keyword strategy (TOFU problem guides to BOFU alternatives)",
          "High-converting competitor 'vs' and alternative landing page optimization",
          "Integration directory & software use-case landing page SEO",
          "Product-led content strategy & editorial calendar execution",
          "Programmatic SEO for scalable feature & template page creation",
          "High-authority B2B link building & software review directory management"
        ],
        primaryCtaText: "Grow My SaaS",
        primaryCtaLink: "/contact?service=saas-seo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=saas-seo"
      },
      {
        name: "Semantic SEO",
        slug: "semantic-seo",
        tagline: "Build unshakeable topical authority that Google trusts.",
        description: "Google doesn't just rank keywords — it evaluates entity relationships, topical depth, and comprehensive subject coverage. Semantic SEO builds a deep, interconnected content ecosystem that signals undisputed expertise, authority, and trust across your entire niche.",
        benefits: [
          "Topical authority mapping & hub-and-spoke content cluster architecture",
          "Entity SEO, Knowledge Graph alignment & semantic disambiguation",
          "Semantic keyword research powered by NLP & LSI vector embeddings",
          "Pillar page creation & internal linking architecture for authority flow",
          "Advanced Schema.org markup (about, mentions, sameAs entity definitions)",
          "E-E-A-T signals, expert author schema & trust authority building"
        ],
        primaryCtaText: "Build My Authority",
        primaryCtaLink: "/contact?service=semantic-seo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=semantic-seo"
      },
      {
        name: "Ai SEO",
        slug: "ai-seo",
        tagline: "Future-proof search visibility for AI Overviews & LLMs.",
        description: "AI is reshaping search through Google AI Overviews (SGE), ChatGPT, Perplexity, Claude, and Gemini. We optimize your brand to be cited as the primary authoritative source in conversational answers and generative AI search results.",
        benefits: [
          "Generative Engine Optimization (GEO) for Google AI Overviews & SGE citations",
          "Answer Engine Optimization (AEO) for ChatGPT, Perplexity & Claude citations",
          "Conversational search intent modeling & direct answer snippet structuring",
          "Entity citation indexing & brand validation across AI training corpuses",
          "AI content quality engineering with high information gain and factual accuracy",
          "AI citation tracking, response sentiment & generative share-of-voice monitoring"
        ],
        primaryCtaText: "Optimize for AI SEO",
        primaryCtaLink: "/contact?service=ai-seo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=ai-seo"
      },
      {
        name: "Link Building",
        slug: "link-building",
        tagline: "High-authority backlinks that drive search rankings & domain trust.",
        description: "High-quality, white-hat backlinks remain one of Google's top core ranking signals. We execute targeted manual outreach, digital PR campaigns, and niche placement strategies to build real domain authority and sustainably increase your search rankings.",
        benefits: [
          "100% manual white-hat blogger outreach & niche editorial placements",
          "Strict domain target vetting (high DR/DA, real traffic, zero spam networks)",
          "Digital PR campaigns & newsworthy data-driven story pitching to journalists",
          "Broken link building, unlinked brand mentions & competitor backlink gap replication",
          "Anchor text diversity optimization & penalty-safe link profiles",
          "Transparent monthly backlink placement & referral traffic reporting"
        ],
        primaryCtaText: "Build Backlinks",
        primaryCtaLink: "/contact?service=link-building",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=link-building"
      },
      {
        name: "Technical SEO",
        slug: "technical-seo",
        tagline: "Flawless site architecture, crawlability, and speed.",
        description: "Search engines cannot rank what they cannot efficiently crawl, render, and index. We resolve crawl budget bottlenecks, indexation blockers, Core Web Vitals issues, and code-level errors so your site performs at maximum ranking efficiency.",
        benefits: [
          "Deep technical crawl audits using Screaming Frog, Sitebulb & Google Search Console",
          "Core Web Vitals acceleration (LCP, INP, CLS) & mobile performance optimization",
          "Crawl budget optimization, XML sitemap architecture & robots.txt directives",
          "JavaScript SEO, client-side rendering & dynamic hydration troubleshooting",
          "Canonicalization, pagination, duplicate content & redirect chain resolution",
          "Comprehensive JSON-LD structured data architecture & rich snippet setup"
        ],
        primaryCtaText: "Get Technical SEO Audit",
        primaryCtaLink: "/contact?service=technical-seo",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=technical-seo"
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
        name: "Google Ads",
        slug: "google-ads",
        tagline: "Capture high-intent buyers the exact moment they search.",
        description: "Google Ads delivers immediate market dominance across Search, Shopping, Performance Max, Display, and Maps. We engineer full-funnel keyword architectures, negative match-type filters, high-converting ad copy, and smart Target ROAS bidding that turns active searches into profitable sales.",
        benefits: [
          "High-intent Search, Shopping, and Performance Max campaign architecture",
          "Precision keyword segmentation, exact/phrase match & extensive negative lists",
          "A/B split-tested ad copy, headlines, and sitelink extensions for higher CTR",
          "Google Tag Manager conversion tracking & server-side GA4 data streams",
          "Smart bidding optimization (Target ROAS, Target CPA, Maximize Conversions)",
          "Continuous search term pruning, Quality Score scaling & click-fraud shielding"
        ],
        primaryCtaText: "Get Google Ads Quote",
        primaryCtaLink: "/contact?service=google-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=google-ads"
      },
      {
        name: "Facebook Ads",
        slug: "facebook-ads",
        tagline: "Turn 3 billion monthly users into loyal paying customers.",
        description: "Facebook's ad ecosystem remains an unmatched revenue generator for e-commerce, lead gen, and service brands. We combine Advantage+ shopping frameworks, laser-focused custom and lookalike audiences, and high-converting video and carousel creatives to consistently scale your ROAS.",
        benefits: [
          "Advantage+ Shopping Campaigns (ASC) & dynamic catalog ad setup",
          "Laser-targeted interest, custom audience & high-value lookalike modeling",
          "High-converting creative testing: static, carousel, video & UGC angles",
          "Meta Conversions API (CAPI) & pixel integration with 100% event matching",
          "Full-funnel campaign structure (TOFU awareness to BOFU direct-response retargeting)",
          "Systematic horizontal and vertical budget scaling without ad fatigue"
        ],
        primaryCtaText: "Scale Facebook Ads",
        primaryCtaLink: "/contact?service=facebook-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=facebook-ads"
      },
      {
        name: "Instagram Ads",
        slug: "instagram-ads",
        tagline: "Visual-first advertising engineered to stop the scroll and sell.",
        description: "Instagram is where brand discovery happens and modern purchasing decisions are made. We design stunning, native-style Reels, Story swipe-ups, and Explore feed ads tailored for lifestyle, e-commerce, beauty, and consumer brands that demand high engagement and immediate conversion.",
        benefits: [
          "Reels, Stories, Feed, and Explore placement-native creative optimization",
          "High-converting UGC-style, creator-adjacent & micro-influencer ad formats",
          "Instagram Shopping product catalog integration with seamless in-app tags",
          "Direct-to-DM automated lead flows & interactive sticker story campaigns",
          "Hyper-targeted demographic, interest, and lifestyle behavioral segmentation",
          "Continuous creative fatigue monitoring with weekly visual refreshed assets"
        ],
        primaryCtaText: "Launch Instagram Ads",
        primaryCtaLink: "/contact?service=instagram-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=instagram-ads"
      },
      {
        name: "Youtube Ads",
        slug: "youtube-ads",
        tagline: "Engage 2 billion buyers with high-converting video ads.",
        description: "YouTube combines the visual persuasion of video with pinpoint audience targeting and real-time measurability. We build high-impact In-Stream, Shorts, and Bumper ads that hook viewers in the first 5 seconds and drive qualified traffic straight to your offer.",
        benefits: [
          "Skippable In-Stream, Non-Skippable, Shorts & Bumper video ad formats",
          "Laser audience targeting: custom intent keywords, affinity, and competitor in-market",
          "Scriptwriting and creative hooks engineered using the ABCD conversion framework",
          "Brand lift, view-through attribution, and cross-device conversion tracking",
          "Integration with Google Search funnels to capture remarketing demand",
          "Placement exclusions and brand-safety filters to protect media investment"
        ],
        primaryCtaText: "Launch YouTube Ads",
        primaryCtaLink: "/contact?service=youtube-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=youtube-ads"
      },
      {
        name: "TikTok Ads",
        slug: "tiktok-ads",
        tagline: "Tap into viral algorithms with native short-form video ads.",
        description: "TikTok reaches Gen Z, Millennials, and high-spending consumers with unbeatable algorithmic reach and lower CPMs than legacy platforms. We craft trend-responsive Spark Ads, In-Feed videos, and UGC creatives that feel 100% organic while generating massive commercial returns.",
        benefits: [
          "In-Feed video ads, Spark Ads (boosting creator posts), and TopView campaigns",
          "TikTok Pixel and Events API implementation with advanced identity matching",
          "Trend-driven hooks, sound sync, and rapid creator UGC creative workflows",
          "Behavioral targeting based on video interactions, creator follows, and hashtags",
          "TikTok Shop ad integration and direct in-feed catalog checkout funnels",
          "Aggressive ROAS scaling with automated creative refresh cycles"
        ],
        primaryCtaText: "Scale TikTok Ads",
        primaryCtaLink: "/contact?service=tiktok-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=tiktok-ads"
      },
      {
        name: "Linkedin Ads",
        slug: "linkedin-ads",
        tagline: "Target verified decision-makers, executives, and enterprise buyers.",
        description: "LinkedIn is the premier B2B growth engine for high-ticket services, SaaS platforms, and enterprise solutions. We pinpoint verified C-suite executives, directors, and purchasing managers by job title, industry, and company size to generate pre-qualified sales calls and enterprise deals.",
        benefits: [
          "Precision B2B targeting by exact job title, company seniority, industry & revenue",
          "High-converting LinkedIn Lead Gen Forms with zero landing page friction",
          "Sponsored Content, Document Carousel Ads, and Thought Leader ad boosts",
          "Account-Based Marketing (ABM) targeting specific high-value client lists",
          "LinkedIn Insight Tag setup with website visitor demographic intelligence",
          "Retargeting sequences that nurture decision-makers across the B2B sales cycle"
        ],
        primaryCtaText: "Generate B2B Leads",
        primaryCtaLink: "/contact?service=linkedin-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=linkedin-ads"
      },
      {
        name: "Pinterest Ads",
        slug: "pinterest-ads",
        tagline: "Reach shoppers actively planning their next purchase.",
        description: "Pinterest users visit with exceptionally high commercial intent, actively looking for products, home decor, fashion, and services to buy. We run visual Promoted Pins, Carousel ads, and Idea ads that capture high-intent buyers months before they purchase anywhere else.",
        benefits: [
          "Promoted Pins, Video Pins, Carousel Ads, and Collections catalog setups",
          "Search intent keyword targeting + interest-based visual discovery mapping",
          "Pinterest Tag integration with verified checkout and add-to-cart tracking",
          "Long attribution shelf-life: pins continue driving organic sales after ad spend",
          "Rich Product Pins synced with Shopify, WooCommerce, or custom product feeds",
          "Remarketing to pin engagers, site visitors, and shopping cart abandoners"
        ],
        primaryCtaText: "Launch Pinterest Ads",
        primaryCtaLink: "/contact?service=pinterest-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=pinterest-ads"
      },
      {
        name: "X Ads",
        slug: "x-ads",
        tagline: "Inject your message directly into real-time global conversations.",
        description: "X (formerly Twitter) provides unparalleled real-time engagement for tech, crypto, finance, media, events, and viral announcements. We launch Promoted Posts, Trend takeovers, and Video Ads targeting active conversations, follower lookalikes, and trending niche topics.",
        benefits: [
          "Promoted Posts, Video Ads, and Trend Takeover campaign deployment",
          "Follower lookalike targeting: display ads to followers of key competitor accounts",
          "Conversation & keyword targeting matching real-time hashtags and phrases",
          "X Pixel & Conversions API integration for granular attribution reporting",
          "Direct-response lead generation and app install conversion optimization",
          "High-tempo A/B testing of punchy copy, bold visuals, and urgent CTAs"
        ],
        primaryCtaText: "Scale on X Ads",
        primaryCtaLink: "/contact?service=x-ads",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=x-ads"
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
    title: "Content Writing",
    description: "Authoritative content and persuasive copy that rank and convert.",
    iconName: "PenTool",
    subItems: [
      {
        name: "Blog Writing",
        slug: "blog-writing",
        tagline: "SEO-driven blog posts and long-form articles that rank on Google and convert.",
        description: "High-impact blog articles engineered to capture high-intent organic search queries, establish deep topical authority, and educate readers into paying customers. Every article is backed by thorough competitor analysis, semantic keyword clustering, and clear conversion pathways.",
        benefits: [
          "Deep competitor SERP intent analysis and keyword clustering",
          "SEO-optimized heading structures, title tags, and meta descriptions",
          "Engaging, authoritative long-form writing with expert industry insights",
          "Internal linking architecture to pass topical authority across your site",
          "Compelling in-content lead magnets, CTAs, and banner placements",
          "100% human-crafted, fact-checked, and plagiarism-free editorial quality"
        ],
        primaryCtaText: "Start Blog Writing",
        primaryCtaLink: "/contact?service=blog-writing",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=blog-writing"
      },
      {
        name: "Website Copy",
        slug: "website-copy",
        tagline: "Engaging, high-converting copy that turns website visitors into buyers.",
        description: "Your website is your 24/7 digital salesperson. We craft clear, persuasive homepage, about page, and service page copy designed around buyer psychology, clear value propositions, and frictionless calls-to-action that maximize conversion rates.",
        benefits: [
          "Irresistible above-the-fold hero messaging and value propositions",
          "Customer pain-point agitation paired with clear solution frameworks",
          "Feature-to-benefit translation that speaks directly to buyer desires",
          "Social proof, trust badges, and credibility element positioning",
          "Frictionless UX micro-copy for buttons, forms, and navigation",
          "Conversion-rate-optimized (CRO) layout structure and readability flow"
        ],
        primaryCtaText: "Get Website Copy",
        primaryCtaLink: "/contact?service=website-copy",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=website-copy"
      },
      {
        name: "Product Descriptions",
        slug: "product-descriptions",
        tagline: "Persuasive e-commerce copy that sparks desire and drives add-to-cart clicks.",
        description: "Turn browsing shoppers into eager buyers with sensory, benefit-driven product descriptions. We combine e-commerce search optimization with emotional storytelling and clear feature breakdowns to increase add-to-cart rates and lower return rates.",
        benefits: [
          "Sensory, benefit-led descriptions that overcome buyer hesitation",
          "E-commerce SEO keyword integration for Google Shopping and search rank",
          "Key feature bullet points engineered for rapid scannability",
          "Technical specifications, sizing, and material clarity to reduce returns",
          "Urgency and scarcity triggers that motivate immediate purchasing",
          "Scalable batch writing for Shopify, WooCommerce, and Amazon catalogs"
        ],
        primaryCtaText: "Order Product Descriptions",
        primaryCtaLink: "/contact?service=product-descriptions",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=product-descriptions"
      },
      {
        name: "Social Media Copy",
        slug: "social-media-copy",
        tagline: "Scroll-stopping captions and posts that build community and drive engagement.",
        description: "Cut through the social feed noise with punchy, platform-native copy. We write captivating hooks, storytelling captions, and engaging calls-to-action tailored for LinkedIn, Instagram, Facebook, and X to spark conversations and build loyal followers.",
        benefits: [
          "High-retention scroll-stopping opening hooks that halt the feed",
          "Platform-native formatting tailored for LinkedIn, Instagram, X & Facebook",
          "Storytelling narratives that humanize your brand and build authority",
          "Strategic call-to-actions designed to maximize comments, shares, and saves",
          "Curated hashtag clusters and profile bio optimization",
          "Consistent brand voice guidelines across all daily social publishing"
        ],
        primaryCtaText: "Boost Social Copy",
        primaryCtaLink: "/contact?service=social-media-copy",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=social-media-copy"
      },
      {
        name: "Email Copy",
        slug: "email-copy",
        tagline: "High-converting email sequences and newsletters that nurture and close.",
        description: "Generate predictable revenue from your subscriber list. We craft curiosity-inducing subject lines, personalized nurture sequences, promotional launch emails, and automated abandoned-cart flows that land in the primary inbox and convert.",
        benefits: [
          "High-open subject lines and preview text engineered to beat spam filters",
          "Automated welcome series and onboarding nurture drip campaigns",
          "High-converting abandoned cart and browse abandonment recovery copy",
          "Promotional product launch and seasonal sales blast sequences",
          "Value-packed weekly newsletters that build long-term subscriber loyalty",
          "A/B split testing of subject lines, hooks, and call-to-action buttons"
        ],
        primaryCtaText: "Write Email Copy",
        primaryCtaLink: "/contact?service=email-copy",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=email-copy"
      },
      {
        name: "Ad Copy",
        slug: "ad-copy",
        tagline: "Direct-response ad copy for Google, Meta & TikTok that slashes CPA.",
        description: "High-performing paid ads require copy that hooks attention in microseconds and compels action. We engineer high-converting headlines, primary text, and creative hooks for Google Search, Facebook, Instagram, TikTok, and LinkedIn ad campaigns.",
        benefits: [
          "Proven direct-response formulas: AIDA, PAS, and Hook-Story-Offer",
          "Multiple creative hook angles for rapid testing and audience segmentation",
          "Google Ads responsive search headlines and description variations",
          "Meta & TikTok feed-native primary text that feels organic and authentic",
          "Clear, friction-free calls-to-action aligned with landing page messaging",
          "Systematic ad copy refreshes to permanently eliminate creative fatigue"
        ],
        primaryCtaText: "Get High-ROAS Ad Copy",
        primaryCtaLink: "/contact?service=ad-copy",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=ad-copy"
      },
      {
        name: "Sales Copy",
        slug: "sales-copy",
        tagline: "Psychology-backed sales letters, VSLs, and landing pages that close deals.",
        description: "For high-ticket offers, courses, and SaaS products, ordinary copy won't cut it. We craft deep-dive sales pages, pitch decks, and long-form sales letters using proven conversion psychology to dismantle objections and make buying the only logical choice.",
        benefits: [
          "Deep prospect psychological profiling and pain-point amplification",
          "Irresistible offer structuring, stack presentation, and risk reversal",
          "Comprehensive objection handling addressing price, timing, and trust",
          "Compelling case study storytelling and social proof integration",
          "Strategic multi-tiered CTA placements and urgency/guarantee frameworks",
          "Long-form landing pages and Video Sales Letter (VSL) written scripts"
        ],
        primaryCtaText: "Order Sales Copy",
        primaryCtaLink: "/contact?service=sales-copy",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=sales-copy"
      },
      {
        name: "Video Scripts",
        slug: "video-scripts",
        tagline: "Engaging scripts for YouTube, TikTok, explainers, and video sales letters.",
        description: "Video content lives or dies by its script. We write compelling, well-paced scripts for YouTube videos, viral TikTok/Reels, company explainer videos, and commercial ads with visual cues, retention-maximizing hooks, and seamless CTA transitions.",
        benefits: [
          "Attention-grabbing 3-second visual and audio hooks that prevent drop-off",
          "Dual-column script formatting with exact spoken audio and on-screen visuals",
          "Pacing calibrated for viewer watch-time and algorithm optimization",
          "Storyboards and sound design cues integrated directly into the script",
          "Scripts tailored for YouTube long-form, Shorts, TikTok & commercial ads"
        ],
        primaryCtaText: "Get Video Scripts",
        primaryCtaLink: "/contact?service=video-scripts",
        secondaryCtaText: "Case Study",
        secondaryCtaLink: "/portfolio?service=video-scripts"
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
    id: "ai-video-production",
    slug: "ai-video-production",
    title: "AI Video Production",
    description: "Studio-quality AI-generated videos for ads, explainers, UGC, and social content — at a fraction of traditional production costs.",
    iconName: "Video",
    subItems: [
      {
        name: "AI Explainer & Promo Videos",
        slug: "ai-explainer-promo-videos",
        tagline: "Explain anything. Sell everything. In minutes.",
        description: "Transform complex products, services, or concepts into compelling AI-generated explainer and promo videos. We use cutting-edge AI video tools to produce professional-grade animated and live-action style videos that educate viewers and drive conversions — without a film crew or studio.",
        benefits: [
          "AI-scripted storyboards tailored to your brand voice & audience intent",
          "Animated explainer videos (2D motion, kinetic typography, product walkthroughs)",
          "Promotional videos for product launches, events & brand campaigns",
          "Platform-optimized aspect ratios (16:9 for YouTube, 9:16 for Reels/TikTok)",
          "AI voiceover in 30+ languages with human-level naturalness",
          "Custom brand colors, logo integration & CTA overlays"
        ],
        primaryCtaText: "Create AI Explainer Video",
        primaryCtaLink: "/contact?service=ai-explainer-promo-videos",
        secondaryCtaText: "View Portfolio",
        secondaryCtaLink: "/portfolio?service=ai-video"
      },
      {
        name: "AI Product Ads",
        slug: "ai-product-ads",
        tagline: "High-converting product ads. Zero production budget.",
        description: "Launch scroll-stopping product ad videos powered by AI — faster than a traditional shoot and at a fraction of the cost. Our AI product ad service transforms your product photos and specs into dynamic video ads optimized for Google, Meta, TikTok, and Amazon ad platforms.",
        benefits: [
          "AI product animation from static product images (360° spins, zoom-ins, overlays)",
          "Conversion-optimized video scripts based on buyer psychology & ad frameworks",
          "Multiple ad variations (A/B test-ready creatives in same production run)",
          "Platform-specific ad specs: Facebook Feed, TikTok In-Feed, YouTube Pre-Roll, Amazon DSP",
          "Dynamic text overlays: price callouts, USP badges, urgency triggers",
          "AI-generated background scenes, lifestyle contexts & product staging"
        ],
        primaryCtaText: "Create AI Product Ads",
        primaryCtaLink: "/contact?service=ai-product-ads",
        secondaryCtaText: "View Portfolio",
        secondaryCtaLink: "/portfolio?service=ai-video"
      },
      {
        name: "AI UGC-Style Videos",
        slug: "ai-ugc-style-videos",
        tagline: "Authentic UGC at infinite scale — no creators needed.",
        description: "User-Generated Content (UGC) is the highest-converting ad format on Meta and TikTok. We produce AI-generated UGC-style videos that look and feel like real customer testimonials and reviews — enabling you to run unlimited authentic-looking ad creatives without hiring influencers or managing shoots.",
        benefits: [
          "AI avatar-based UGC ads with realistic facial expressions & natural delivery",
          "Multiple AI personas (demographics, ages, ethnicities, styles) for A/B testing",
          "Hook variations: pain-point hooks, transformation hooks, question hooks",
          "Product unboxing, before/after, testimonial & review video formats",
          "Platform-native captions, trending audio sync & in-video text overlays",
          "Rapid production: 10–50 UGC ad variations delivered in 48–72 hours"
        ],
        primaryCtaText: "Scale UGC Ads with AI",
        primaryCtaLink: "/contact?service=ai-ugc-style-videos",
        secondaryCtaText: "View Portfolio",
        secondaryCtaLink: "/portfolio?service=ai-video"
      },
      {
        name: "AI Avatar & Spokesperson Videos",
        slug: "ai-avatar-spokesperson-videos",
        tagline: "Your brand. Your AI spokesperson. Always on.",
        description: "Deploy a professional AI avatar spokesperson to represent your brand in training videos, product demos, investor pitches, and marketing campaigns — in any language, any time, without scheduling a single shoot. Our AI avatars deliver your scripts with photorealistic human-like delivery.",
        benefits: [
          "Photorealistic AI human avatars (choose from 100+ diverse presenter styles)",
          "Custom AI avatar creation from your own likeness (executive spokesperson cloning)",
          "Script-to-video in under 24 hours — perfect for time-sensitive campaigns",
          "Multilingual delivery: same avatar speaks in 40+ languages for global markets",
          "Use cases: brand videos, onboarding training, sales demos, investor pitches, FAQ videos",
          "Seamless b-roll integration, branded lower-thirds & professional background scenes"
        ],
        primaryCtaText: "Create AI Spokesperson Video",
        primaryCtaLink: "/contact?service=ai-avatar-spokesperson-videos",
        secondaryCtaText: "View Portfolio",
        secondaryCtaLink: "/portfolio?service=ai-video"
      },
      {
        name: "AI Short-Form Content",
        slug: "ai-short-form-content",
        tagline: "Go viral. On every platform. Every week.",
        description: "Short-form video is the most powerful organic growth engine in 2025 and beyond. We produce a consistent pipeline of AI-generated Reels, TikToks, and YouTube Shorts designed with platform-native hooks, trending formats, and SEO-optimized captions that drive follows, views, and sales.",
        benefits: [
          "AI-scripted hooks calibrated to platform algorithm patterns (TikTok, Instagram, YouTube)",
          "Trend-matched content formats: talking-head style, text-on-screen, montage, transitions",
          "AI B-roll generation & stock footage enhancement for visual storytelling",
          "Auto-captioning with animated text overlays for silent-viewing optimization",
          "Hashtag strategy, posting schedule & thumbnail/cover frame optimization",
          "Batch production: 30–90 days of content delivered in a single production sprint"
        ],
        primaryCtaText: "Produce AI Short-Form Content",
        primaryCtaLink: "/contact?service=ai-short-form-content",
        secondaryCtaText: "View Portfolio",
        secondaryCtaLink: "/portfolio?service=ai-video"
      },
      {
        name: "AI Voiceover & Multilingual Dubbing",
        slug: "ai-voiceover-multilingual-dubbing",
        tagline: "One video. Every language. Global reach unlocked.",
        description: "Break language barriers and expand your brand to global markets with AI voiceover and multilingual dubbing. We convert your existing videos or new AI-produced content into natural, human-sounding voiceovers in 40+ languages — with perfect lip-sync dubbing for presenter-style videos.",
        benefits: [
          "AI voiceover in 40+ languages with regional accent options (US, UK, AU, AE, BD, CA)",
          "Lip-sync AI dubbing for talking-head and presenter videos (frame-accurate mouth movement)",
          "Voice cloning: replicate your exact voice or a custom branded voice across all content",
          "Human-quality emotional range: confident, warm, authoritative, conversational tones",
          "Localization services: culturally adapted scripts, idioms & regional references",
          "24-hour turnaround for standard voiceover projects up to 10 minutes"
        ],
        primaryCtaText: "Get AI Voiceover & Dubbing",
        primaryCtaLink: "/contact?service=ai-voiceover-multilingual-dubbing",
        secondaryCtaText: "View Portfolio",
        secondaryCtaLink: "/portfolio?service=ai-video"
      },
      {
        name: "AI Real Estate & Property Videos",
        slug: "ai-real-estate-property-videos",
        tagline: "Sell properties faster with AI-powered visual storytelling.",
        description: "Real estate buyers form first impressions in seconds — and AI video is the fastest way to make yours unforgettable. We produce AI-generated property videos, virtual staging walkthroughs, neighborhood highlight reels, and branded listing videos that help realtors and developers sell faster at higher prices.",
        benefits: [
          "AI virtual staging: transform empty rooms into furnished, styled interiors instantly",
          "AI property walkthrough videos from floor plans, photos & drone footage",
          "Neighborhood highlight reels: schools, restaurants, commute times, lifestyle features",
          "Branded listing videos with agent spokesperson integration",
          "AI sky replacement, exterior enhancement & seasonal transformations",
          "Multi-format delivery: MLS listing video, social media Reels, YouTube property tours"
        ],
        primaryCtaText: "Create Property Video",
        primaryCtaLink: "/contact?service=ai-real-estate-property-videos",
        secondaryCtaText: "View Portfolio",
        secondaryCtaLink: "/portfolio?service=ai-video"
      },
      {
        name: "AI Video Repurposing",
        slug: "ai-video-repurposing",
        tagline: "One long video. Infinite content assets.",
        description: "Stop letting long-form content sit idle. Our AI video repurposing service transforms your podcasts, webinars, interviews, and YouTube videos into dozens of high-impact short clips, quote cards, blog posts, and social captions — maximizing every minute of content you've already created.",
        benefits: [
          "AI-powered clip extraction: automatically identifies best moments from long-form video",
          "Podcast-to-Reels: convert audio podcasts into animated short-form video clips",
          "Webinar-to-YouTube: restructure webinar recordings into polished YouTube tutorials",
          "Auto-generated subtitles, captions & transcript export for blog repurposing",
          "Content calendar: 30-day social posting plan built from a single source video",
          "Cross-platform formatting: YouTube Shorts, Instagram Reels, TikTok, LinkedIn Video"
        ],
        primaryCtaText: "Repurpose My Videos with AI",
        primaryCtaLink: "/contact?service=ai-video-repurposing",
        secondaryCtaText: "View Portfolio",
        secondaryCtaLink: "/portfolio?service=ai-video"
      }
    ]
  }
];
