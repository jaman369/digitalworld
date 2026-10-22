import { CloudAboutData } from "@/types";

export const defaultAboutData: CloudAboutData = {
  // Top-level legacy fields
  name: "Kamrujjaman Mufti",
  title: "Founder of Digital World",
  bioParagraph1:
    "I'm Kamrujjaman Mufti, founder of Digital World, a digital marketing agency based in Dhaka, Bangladesh. With 5+ years of experience, I help businesses grow through SEO, AEO, GEO, paid advertising, web development, content marketing, and AI-powered solutions.",
  bioParagraph2:
    "My approach is simple: understand the business, identify the right opportunities, and build digital strategies around meaningful growth.",
  imagePath: "/images/23.png",
  timeline: [
    {
      years: "2026 – Present",
      role: "AI Automation",
      company: "Exploring AI-powered workflows, intelligent agents, and business process automation."
    },
    {
      years: "2024 – 2026",
      role: "Digital Marketing Expert",
      company: "Bringing digital marketing expertise together through KJ Digital World."
    },
    {
      years: "2022 – 2024",
      role: "SEO & Paid Ads",
      company: "Expanding into search engine optimization and paid advertising."
    },
    {
      years: "2021 – 2022",
      role: "Web Development",
      company: "Developing an understanding of websites, user experience, and website performance."
    },
    {
      years: "2020 – 2021",
      role: "The Beginning",
      company: "Building a foundation in digital marketing and learning the fundamentals of online growth."
    }
  ],
  metrics: [
    { numericValue: 150, suffix: "+", label: "Projects Completed" },
    { numericValue: 120, suffix: "+", label: "Happy Clients" },
    { numericValue: 5, suffix: "+", label: "Years of Experience" },
    { numericValue: 11, suffix: "+", label: "Countries Served" }
  ],

  // 1. Hero Section
  hero: {
    badge: "ABOUT ME",
    greeting: "Hi, I'm",
    name: "Kamrujjaman Mufti",
    title: "Founder of Digital World",
    bioParagraph1:
      "I'm Kamrujjaman Mufti, founder of Digital World, a digital marketing agency based in Dhaka, Bangladesh. With 5+ years of experience, I help businesses grow through SEO, AEO, GEO, paid advertising, web development, content marketing, and AI-powered solutions.",
    bioParagraph2:
      "My approach is simple: understand the business, identify the right opportunities, and build digital strategies around meaningful growth.",
    primaryCtaText: "View My Work",
    primaryCtaLink: "/portfolio",
    secondaryCtaText: "Contact Me",
    secondaryCtaLink: "/contact",
    imagePath: "/images/23.png"
  },

  // 2. Metrics Section
  metricsList: [
    { numericValue: 150, suffix: "+", label: "Projects Completed" },
    { numericValue: 120, suffix: "+", label: "Happy Clients" },
    { numericValue: 5, suffix: "+", label: "Years of Experience" },
    { numericValue: 11, suffix: "+", label: "Countries Served" }
  ],

  // 3. Journey Section
  journey: {
    eyebrow: "MY JOURNEY",
    title: "From Learning How Search Works to Building Digital Growth Strategies",
    paragraph1: "My journey started with one simple question: how do websites rank on Google?",
    paragraph2:
      "That curiosity grew into a career in digital marketing, starting with the fundamentals of web development and search engine optimization. Over time, my focus expanded to paid advertising, content strategy, answer engine optimization, generative engine optimization, and AI automation.",
    paragraph3:
      "Today, through Digital World, I bring these areas together to help businesses grow in a clear, coordinated, and sustainable way.",
    timeline: [
      {
        years: "2026 – Present",
        role: "AI Automation",
        company: "Exploring AI-powered workflows, intelligent agents, and business process automation."
      },
      {
        years: "2024 – 2026",
        role: "Digital Marketing Expert",
        company: "Bringing digital marketing expertise together through KJ Digital World."
      },
      {
        years: "2022 – 2024",
        role: "SEO & Paid Ads",
        company: "Expanding into search engine optimization and paid advertising."
      },
      {
        years: "2021 – 2022",
        role: "Web Development",
        company: "Developing an understanding of websites, user experience, and website performance."
      },
      {
        years: "2020 – 2021",
        role: "The Beginning",
        company: "Building a foundation in digital marketing and learning the fundamentals of online growth."
      }
    ]
  },

  // 4. Why Work With Us
  whyUs: {
    eyebrow: "WHY WORK WITH US",
    title: "What Sets Digital World Apart",
    subtitle: "A thoughtful, multi-disciplinary approach to digital marketing and AI growth.",
    cards: [
      {
        badge: "Integrated Thinking",
        title: "Multiple Disciplines Under One Strategy",
        desc: "Instead of treating SEO, paid ads, web development, content, and AI as isolated tasks, we look at how they support one another to create better overall results."
      },
      {
        badge: "Honest Guidance",
        title: "Direct & Transparent Communication",
        desc: "You will always know what we are working on, why it matters, and what results to expect. No confusing jargon, no vanity metrics—just honest collaboration."
      },
      {
        badge: "Tailored Delivery",
        title: "Adaptable to Your Business Model",
        desc: "Whether you need a dedicated growth partner for the long term or specialized support for a specific project, we tailor our involvement to what your business actually needs."
      }
    ]
  },

  // 5. Our Expertise
  expertise: {
    eyebrow: "OUR EXPERTISE",
    title: "Core Services Designed for Cohesive Growth",
    subtitle:
      "Instead of treating digital marketing disciplines as separate silos, we look at how search visibility, paid campaigns, web experiences, content strategy, and AI-driven automation work together.",
    items: [
      {
        title: "Search Engine Optimization (SEO)",
        badge: "Organic Search",
        desc: "Improve your organic search visibility and help relevant customers discover your business. Our SEO expertise covers local, ecommerce, international, SaaS, video, semantic, technical, and AI-focused SEO, alongside link building.",
        link: "/services/seo"
      },
      {
        title: "Answer & AI Search Optimization",
        badge: "AEO · GEO · AIO",
        desc: "Prepare your digital presence for evolving search experiences through Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and AI-focused optimization (AIO). The focus is on clear, relevant, well-structured information that supports discovery across search engines and AI-powered platforms.",
        link: "/services/aeo-geo-aio"
      },
      {
        title: "PPC & Paid Advertising",
        badge: "Paid Campaigns",
        desc: "Reach targeted audiences through Google Ads and paid social campaigns. We focus on campaign strategy, audience relevance, measurement, and ongoing optimization to support lead generation and business growth.",
        link: "/services/ppc"
      },
      {
        title: "Web Design & Development",
        badge: "Design & Speed",
        desc: "Create user-friendly websites and landing pages designed around your brand and business objectives. From WordPress and Shopify development to UI/UX design, speed optimization, and maintenance, the goal is to provide a reliable experience that helps visitors take action.",
        link: "/services/web-design-dev"
      },
      {
        title: "Content Marketing & Writing",
        badge: "Copywriting",
        desc: "Communicate your value through useful, relevant content. Our content services include blog writing, website copy, product descriptions, social media copy, email copy, ad copy, sales copy, and video scripts.",
        link: "/services/content-marketing"
      },
      {
        title: "AI Automation",
        badge: "Intelligent Agents",
        desc: "Make everyday business processes more efficient with AI-powered workflows and integrations. Solutions can include lead automation, CRM automation, YouTube automation, AI voice agents, customer support workflows, MCP integrations, and RAG knowledge bases.",
        link: "/services/ai-automation"
      },
      {
        title: "AI Video Production",
        badge: "AI Media",
        desc: "Create AI-assisted video content for product promotions, explainers, UGC-style videos, avatar videos, short-form content, multilingual dubbing, property videos, and video repurposing.",
        link: "/services/ai-video-production"
      }
    ]
  },

  // 6. How We Work
  process: {
    eyebrow: "OUR PROCESS",
    title: "How We Work",
    subtitle: "A simple, practical approach to digital growth:",
    steps: [
      {
        step: "01",
        title: "Understand Your Business",
        desc: "We start by understanding your business model, target audience, current challenges, and growth priorities."
      },
      {
        step: "02",
        title: "Identify the Right Opportunities",
        desc: "We assess the project requirements and identify the services and strategies most relevant to your goals."
      },
      {
        step: "03",
        title: "Plan & Execute",
        desc: "We turn the agreed priorities into a focused plan and carry out the work according to the project scope."
      },
      {
        step: "04",
        title: "Review & Improve",
        desc: "We use available performance data, feedback, and project objectives to identify areas for improvement and refine the approach."
      }
    ]
  },

  // 7. Philosophy & Values
  values: {
    eyebrow: "GUIDING PRINCIPLES",
    title: "Our Philosophy & Values",
    subtitle: "What guides our work and client partnerships every day:",
    cards: [
      {
        number: "01",
        title: "Data-Driven Decisions",
        desc: "Research, analysis, and available performance data help guide our decisions. We aim to understand the situation before deciding on the next step."
      },
      {
        number: "02",
        title: "Transparency",
        desc: "Clear communication and honest progress updates are essential to a productive working relationship. We want clients to understand the work, priorities, and reasoning behind key decisions."
      },
      {
        number: "03",
        title: "Creative Solutions",
        desc: "Different businesses face different challenges. We look for practical solutions that fit the project's needs rather than applying the same formula to every situation."
      },
      {
        number: "04",
        title: "Client-Focused Partnerships",
        desc: "Every project starts with understanding your goals. We treat your priorities as a central part of the strategy and work toward outcomes that support your business."
      }
    ]
  },

  // 8. Tools & Stack
  tools: {
    eyebrow: "TOOLS & STACK",
    title: "Tools I use every day.",
    tools: [
      { name: "Ahrefs", desc: "SEO Research", icon: "/Emoji/mag.png" },
      { name: "SEMrush", desc: "Competitor Analysis", icon: "/Emoji/bar_chart.png" },
      { name: "WordPress", desc: "Web Development", icon: "/Emoji/computer.png" },
      { name: "Shopify", desc: "E-Commerce", icon: "/Emoji/shopping_trolley.png" },
      { name: "Figma", desc: "UI/UX Design", icon: "/Emoji/triangular_ruler.png" },
      { name: "Meta Ads Manager", desc: "Performance Ads", icon: "/Emoji/dart.png" },
      { name: "Google Ads", desc: "Search & Display", icon: "/Emoji/red_circle.png" },
      { name: "Google Tag Manager", desc: "Tracking & Analytics", icon: "/Emoji/label.png" },
      { name: "Google Analytics 4", desc: "Performance Tracking", icon: "/Emoji/chart_with_upwards_trend.png" },
      { name: "n8n", desc: "Automation", icon: "/Emoji/gear.png" },
      { name: "Adobe Suite", desc: "Graphic Design", icon: "/Emoji/art.png" },
      { name: "Screaming Frog", desc: "Technical SEO", icon: "/Emoji/frog.png" }
    ]
  },

  // 9. Call To Action (Let's Connect)
  cta: {
    eyebrow: "LET'S CONNECT",
    title: "One Digital Partner. Connected Solutions. A Focus on Growth.",
    paragraph1:
      "Whether you want to improve your search visibility, generate leads through paid advertising, build a better website, strengthen your content, or explore AI automation, let's discuss what your business needs.",
    paragraph2: "We'll start with your goals and identify a practical next step.",
    primaryCtaText: "Start a Conversation",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Services",
    secondaryCtaLink: "/services"
  }
};
