"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

interface ServiceExtraSectionsProps {
  categorySlug?: string;
}

/* ── PER-CATEGORY DATA MAPS FOR SECTIONS 06 - 13 ── */

// 06 — WHY CHOOSE US DATA MAP
const whyUsCardsMap: Record<string, { icon: string; title: string; desc: string }[]> = {
  seo: [
    { icon: "📊", title: "Results, Not Reports", desc: "We obsess over revenue growth. Every action is tied to measurable organic leads and ROI — not vanity metrics." },
    { icon: "🚀", title: "No Long-Term Contracts", desc: "Month-to-month flexibility. We earn your trust with ranking and revenue performance." },
    { icon: "🌍", title: "Global Search Reach", desc: "Rankings optimized across 11 countries, multi-region search engines, and localized user intents." },
    { icon: "🤝", title: "Direct Lead Strategist", desc: "Direct access to senior SEO directors with over 5+ years of scaling enterprise organic search." },
    { icon: "🔍", title: "100% Process Transparency", desc: "Full ownership of all audit technical data, backlink outreach, and keyword mapping spreadsheets." },
    { icon: "⚡", title: "Fast Communication", desc: "Dedicated communication channels via WhatsApp, Email & Slack with guaranteed response times." },
  ],
  ppc: [
    { icon: "💰", title: "ROAS-First Bidding", desc: "We eliminate ad spend waste and direct bids strictly to high-converting commercial intent searchers." },
    { icon: "🎯", title: "Omni-Channel Coverage", desc: "Google Search, Meta, TikTok & LinkedIn ads synchronized to nurture buyers at every touchpoint." },
    { icon: "⚡", title: "Bot & Fraud Exclusion", desc: "Real-time IP exclusion and invalid click filtering configured to protect your media budget." },
    { icon: "📈", title: "Weekly A/B Ad Testing", desc: "Continuous iteration of headlines, hooks, and video creatives to keep acquisition costs low." },
    { icon: "🤝", title: "Senior Media Buyer", desc: "Worked directly by proven ad strategists who have scaled multi-million dollar ad budgets." },
    { icon: "📊", title: "Live CPA Dashboard", desc: "Real-time metric reporting on Cost-Per-Acquisition, ROAS, and net profit margins." },
  ],
  "web-design-dev": [
    { icon: "⚡", title: "100/100 Core Web Vitals", desc: "Engineered on modern Next.js/React framework for instant load times and zero bloatware." },
    { icon: "🎨", title: "Bespoke Figma UI/UX", desc: "Every section custom-designed from scratch to match your unique brand identity." },
    { icon: "🎯", title: "Conversion Engineered", desc: "Psychology-backed layout architecture designed to convert visitors into active leads." },
    { icon: "📱", title: "100% Mobile Responsive", desc: "Seamless rendering across smartphones, tablets, laptops, and 4K displays." },
    { icon: "⚙️", title: "Easy Headless CMS", desc: "Empower your marketing team to update content, blogs, and landing pages without coding." },
    { icon: "🛡️", title: "Enterprise Hardening", desc: "Bank-level SSL security, automated daily cloud backups, and DDOS protection included." },
  ],
  "content-marketing": [
    { icon: "✍️", title: "Buyer-Intent Copywriting", desc: "Long-form content written to solve user queries, build brand authority, and close sales." },
    { icon: "🧠", title: "Topical Authority Mapping", desc: "Comprehensive pillar page and cluster content architecture to dominate search queries." },
    { icon: "🔗", title: "Editorial Media Outreach", desc: "Digital PR campaigns securing backlinks from top authority news publications." },
    { icon: "📧", title: "Automated Email Sequences", desc: "Nurturing email workflows that turn cold subscribers into high-paying clients." },
    { icon: "📊", title: "Attribution Tracking", desc: "Clear reporting showing exact revenue generated from published content assets." },
    { icon: "⚡", title: "Consistent Publishing", desc: "Strict editorial calendar management ensuring regular, high-impact content delivery." },
  ],
  "ai-automation": [
    { icon: "🤖", title: "Custom Fine-Tuned AI", desc: "AI models trained exclusively on your business documentation, knowledge bases, and FAQs." },
    { icon: "⚡", title: "24/7 Automated Execution", desc: "Zero-delay instant customer support replies and lead qualification around the clock." },
    { icon: "🔄", title: "Seamless App Integrations", desc: "Connect Make.com, Zapier, HubSpot, Salesforce, and custom webhooks seamlessly." },
    { icon: "🛡️", title: "Private Vector Nodes", desc: "100% encrypted data privacy. Your data is never shared or trained on public models." },
    { icon: "🧠", title: "Multi-Agent Logic", desc: "Complex autonomous agents that perform research, draft replies, and route qualified leads." },
    { icon: "📈", title: "80%+ Cost Reduction", desc: "Eliminate repetitive manual data entry tasks with scalable AI workflows." },
  ],
  "china-sourcing": [
    { icon: "🏭", title: "Direct Factory Vetting", desc: "On-site visits and license verification across Ningbo, Yiwu, Shenzhen & Guangzhou hubs." },
    { icon: "💰", title: "Mandarin Price Negotiation", desc: "Bilingual sourcing agents negotiating directly with factory owners for lowest unit rates." },
    { icon: "🔬", title: "Strict AQL Quality Control", desc: "Pre-shipment inspections ensuring zero defective products leave the factory floor." },
    { icon: "🚢", title: "Freight Rate Savings", desc: "Discounted container and air express shipping rates negotiated with Tier-1 carriers." },
    { icon: "📜", title: "Customs & Duty Prep", desc: "Accurate HS code classification and import paperwork for hassle-free customs clearance." },
    { icon: "🛡️", title: "Escrow Payment Safety", desc: "Milestone-based payment protection ensuring funds are only released upon quality approval." },
  ],
};

// 07 — SERVICE PROCESS DATA MAP
const processMap: Record<string, { step: string; title: string; desc: string }[]> = {
  seo: [
    { step: "01", title: "Audit & Keyword Mapping", desc: "Technical site audit and high-intent buyer keyword research." },
    { step: "02", title: "On-Page Optimization", desc: "Metadata, site speed, and semantic content structure overhaul." },
    { step: "03", title: "Technical & Schema Tuning", desc: "Schema markup, indexation fixes, and mobile Core Web Vitals." },
    { step: "04", title: "Authority Link Building", desc: "Editorial outreach and high-DA backlink acquisition." },
    { step: "05", title: "Revenue & Rank Tracking", desc: "Continuous ranking monitoring and revenue attribution reporting." },
  ],
  ppc: [
    { step: "01", title: "Account & Competitor Audit", desc: "Analyzing historical ad data, audience gaps, and competitor bids." },
    { step: "02", title: "Campaign Architecture", desc: "Building high-intent search, Performance Max, and retargeting funnels." },
    { step: "03", title: "Ad Copy & Creative Testing", desc: "Designing high-converting ad variations, thumbnails, and headlines." },
    { step: "04", title: "Bid & Fraud Optimization", desc: "Configuring click-fraud shielding and dynamic automated bidding." },
    { step: "05", title: "Scale & ROAS Expansion", desc: "Scaling winning ad sets to maximize total account revenue." },
  ],
  "web-design-dev": [
    { step: "01", title: "Discovery & Wireframing", desc: "Mapping user journeys, site architecture, and conversion funnels." },
    { step: "02", title: "Custom Figma UI/UX Design", desc: "Designing pixel-perfect desktop and mobile prototype screens." },
    { step: "03", title: "Next.js & React Build", desc: "Clean, component-driven development with 100/100 speed optimization." },
    { step: "04", title: "CMS & API Integration", desc: "Connecting database endpoints, lead forms, and CMS editing controls." },
    { step: "05", title: "QA Testing & Launch", desc: "Cross-browser testing, SSL setup, domain migration, and launch." },
  ],
  "content-marketing": [
    { step: "01", title: "Audience & Intent Research", desc: "Identifying buyer questions, commercial keywords, and content gaps." },
    { step: "02", title: "Topical Cluster Planning", desc: "Structuring pillar content and supporting article roadmaps." },
    { step: "03", title: "High-Authority Writing", desc: "Crafting engaging, search-optimized articles and lead magnets." },
    { step: "04", title: "Digital PR & Backlink Distribution", desc: "Promoting content to media outlets and industry publications." },
    { step: "05", title: "Conversion Optimization", desc: "Adding CRO elements to convert article readers into active buyers." },
  ],
  "ai-automation": [
    { step: "01", title: "Workflow Bottleneck Audit", desc: "Mapping manual tasks, data entry bottlenecks, and API opportunities." },
    { step: "02", title: "Knowledge Base Vectorization", desc: "Indexing company docs, FAQs, and product sheets into private AI vector nodes." },
    { step: "03", title: "Prompt & Agent Engineering", desc: "Building fine-tuned LLM prompts and multi-step autonomous agent logic." },
    { step: "04", title: "CRM & Tool Integration", desc: "Connecting Make.com, Zapier, HubSpot, Slack, and webhooks." },
    { step: "05", title: "Deployment & Automated Monitoring", desc: "Rolling out automation with 24/7 error monitoring and prompt tuning." },
  ],
  "china-sourcing": [
    { step: "01", title: "Supplier Matching", desc: "Identifying verified factories in Ningbo, Yiwu, and Shenzhen hubs." },
    { step: "02", title: "Mandarin Price Negotiation", desc: "Bespoke price benchmarking to secure factory-direct unit rates." },
    { step: "03", title: "Sample Verification", desc: "Inspecting product samples against design specs before bulk production." },
    { step: "04", title: "Pre-Shipment AQL Quality Inspection", desc: "On-site quality control checks during production runs." },
    { step: "05", title: "Freight & Customs Clearance", desc: "Managing ocean/air freight logistics and customs paperwork for delivery." },
  ],
};

// 08 — TOOLS / TECHNOLOGY DATA MAP
const toolsMap: Record<string, { name: string; category: string }[]> = {
  seo: [
    { name: "Ahrefs Enterprise", category: "Backlinks & Intent" },
    { name: "Semrush Pro", category: "Competitor Analytics" },
    { name: "Google Search Console", category: "Indexation & Performance" },
    { name: "Screaming Frog", category: "Technical SEO Audits" },
    { name: "Surfer SEO", category: "Topical Content Tuning" },
    { name: "Google Analytics 4", category: "Revenue Attribution" },
  ],
  ppc: [
    { name: "Google Ads Engine", category: "Search & PMax Ads" },
    { name: "Meta Ads Manager", category: "Facebook & Instagram Ads" },
    { name: "TikTok Ads Manager", category: "Short-form Video Ads" },
    { name: "LinkedIn Campaign Manager", category: "B2B Decision Maker Ads" },
    { name: "ClickCease", category: "Click Fraud Prevention" },
    { name: "Unbounce", category: "Landing Page CRO Testing" },
  ],
  "web-design-dev": [
    { name: "Next.js 15 & React", category: "Modern Frontend Stack" },
    { name: "Tailwind CSS", category: "Responsive Styling" },
    { name: "TypeScript", category: "Type-Safe Architecture" },
    { name: "Figma", category: "UI/UX Prototype Design" },
    { name: "Prisma & PostgreSQL", category: "Database Infrastructure" },
    { name: "Vercel Cloud", category: "Global Edge Hosting" },
  ],
  "content-marketing": [
    { name: "Clearscope", category: "Content Grading" },
    { name: "Klaviyo & HubSpot", category: "Email Automation" },
    { name: "Grammarly Business", category: "Editorial Quality" },
    { name: "Canva Pro", category: "Custom Visual Infographics" },
    { name: "BuzzSumo", category: "Viral Content Trends" },
    { name: "Google Docs & Notion", category: "Collaborative Editorial" },
  ],
  "ai-automation": [
    { name: "OpenAI GPT-4o API", category: "Generative Reasoning" },
    { name: "Pinecone VectorDB", category: "Knowledge Base RAG" },
    { name: "Make.com & Zapier", category: "Workflow Orchestration" },
    { name: "LangChain", category: "Multi-Agent Framework" },
    { name: "HubSpot & Salesforce", category: "CRM Integration" },
    { name: "Slack & Webhooks", category: "Real-time Notification Node" },
  ],
  "china-sourcing": [
    { name: "1688 & Alibaba Enterprise", category: "Factory Sourcing Engine" },
    { name: "WeChat Pay & Escrow", category: "Secure Payment Portal" },
    { name: "Flexport & Freightos", category: "Global Freight Booking" },
    { name: "Customs Duty Calculator", category: "Tariff & HS Code Tool" },
    { name: "AQL Inspection System", category: "Quality Audit Protocol" },
    { name: "SGS Certification", category: "Compliance & Safety Standard" },
  ],
};

// 09 — FEATURED CASE STUDIES DATA MAP
const caseStudiesMap: Record<string, { title: string; metric: string; desc: string }[]> = {
  seo: [
    { title: "SaaS Platform Organic Scale", metric: "+340% Traffic", desc: "Ranked page 1 for 45 commercial intent terms in 6 months." },
    { title: "E-Commerce Localized SEO", metric: "4.2x ROI", desc: "Expanded organic revenue across 8 international regions." },
    { title: "Healthcare Local Maps SEO", metric: "#1 Google Ranking", desc: "Secured top 3 positions for high-value patient search queries." },
  ],
  ppc: [
    { title: "B2B Software Ad Campaign", metric: "5.8x ROAS", desc: "Optimized Performance Max bids to cut lead acquisition costs." },
    { title: "Direct-to-Consumer Fashion", metric: "+220% Revenue", desc: "Scaled Meta ad budgets profitably without ad fatigue." },
    { title: "Home Services Search Ads", metric: "-45% CPA Reduction", desc: "Filtered out spam clicks and targeted high-intent callers." },
  ],
  "web-design-dev": [
    { title: "Fintech Platform Redesign", metric: "100/100 Speed Score", desc: "Rebuilt legacy WordPress site into lightning-fast Next.js." },
    { title: "Global Logistics Portal", metric: "+42% Conversion Boost", desc: "Designed frictionless lead intake forms and custom UI." },
    { title: "E-Commerce Storefront", metric: "$1.2M Sales Scaled", desc: "Created custom Shopify Headless experience for peak traffic." },
  ],
  "content-marketing": [
    { title: "Enterprise Blog Strategy", metric: "50+ Leads / Mo", desc: "Published targeted pillar content converting search visitors." },
    { title: "HARO Digital PR Placement", metric: "DA 24 to 58", desc: "Secured high-authority media coverage in Forbes & TechCrunch." },
    { title: "Email Nurture Automation", metric: "+22% Revenue Spike", desc: "Built lifecycle email sequences engaging repeat buyers." },
  ],
  "ai-automation": [
    { title: "Customer Support AI Bot", metric: "78% Tickets Solved", desc: "Deployed custom RAG chatbot resolving tickets 24/7." },
    { title: "Automated Lead Router", metric: "< 5s Routing Speed", desc: "Routed qualified leads into sales Slack channels instantly." },
    { title: "CRM Data Enrichment AI", metric: "30 Hrs Saved / Wk", desc: "Automated prospect research and CRM profile creation." },
  ],
  "china-sourcing": [
    { title: "Bulk Manufacturing Run", metric: "$14,000 Saved", desc: "Negotiated factory-direct unit pricing in Ningbo hub." },
    { title: "Electronics Pre-Shipment QC", metric: "0 Defects Shipped", desc: "Caught packaging defects prior to ocean container loading." },
    { title: "Global Import Logistics", metric: "5 Days Faster Delivery", desc: "Streamlined customs clearance paperwork and port handling." },
  ],
};

// 10 — RESULTS / METRICS DATA MAP
const metricsMap: Record<string, { value: string; label: string; sub: string }[]> = {
  seo: [
    { value: "10M+", label: "Organic Impressions", sub: "Generated across client websites" },
    { value: "#1", label: "Page 1 Keyword Rankings", sub: "Achieved for competitive terms" },
    { value: "98.4%", label: "Client Retention Rate", sub: "Based on multi-year retainers" },
    { value: "4.2x", label: "Average Organic ROI", sub: "Measured over 12-month periods" },
  ],
  ppc: [
    { value: "5.8x", label: "Average Campaign ROAS", sub: "Across Google & Meta ad accounts" },
    { value: "-45%", label: "Lower Cost Per Lead", sub: "Achieved via bid optimization" },
    { value: "$12M+", label: "Ad Spend Managed", sub: "Engineered for maximum return" },
    { value: "24/7", label: "Click Fraud Shield", sub: "Protecting client ad budgets" },
  ],
  "web-design-dev": [
    { value: "100/100", label: "PageSpeed Score", sub: "Achieved on Google Core Web Vitals" },
    { value: "+42%", label: "Average Conversion Lift", sub: "Post-redesign performance" },
    { value: "0ms", label: "Downtime Record", sub: "High-availability cloud hosting" },
    { value: "100%", label: "Mobile Responsive", sub: "Optimized for all device displays" },
  ],
  "content-marketing": [
    { value: "500+", label: "Pillar Articles Written", sub: "Targeting high-intent buyer intent" },
    { value: "DA 50+", label: "Media Backlinks Secured", sub: "Via editorial PR outreach" },
    { value: "+22%", label: "Email Revenue Growth", sub: "Generated from nurture sequences" },
    { value: "100%", label: "Original Content", sub: "Researched and human-vetted" },
  ],
  "ai-automation": [
    { value: "78%", label: "Support Tickets Resolved", sub: "By automated RAG AI chatbots" },
    { value: "< 5s", label: "Lead Response Time", sub: "Instant CRM & Slack routing" },
    { value: "30+ Hrs", label: "Saved Per Week", sub: "Eliminating manual task friction" },
    { value: "100%", label: "Private Data Vectoring", sub: "Zero public model data leaks" },
  ],
  "china-sourcing": [
    { value: "$14k+", label: "Avg Cost Savings", sub: "Per bulk factory production run" },
    { value: "AQL 2.5", label: "Strict Inspection", sub: "Pre-shipment quality standards" },
    { value: "100%", label: "Factory Vetted", sub: "Direct license & facility checks" },
    { value: "0 Defects", label: "Guarantee", sub: "Escrow payment capital safety" },
  ],
};

// 11 — INDUSTRIES DATA MAP
const industriesList = [
  { name: "SaaS & Tech Platforms", icon: "💻", desc: "Scaling MRR with organic buyer acquisition and PPC ad funnels." },
  { name: "E-Commerce & Retail Brands", icon: "🛒", desc: "Driving high ROAS catalog ads and international search rankings." },
  { name: "B2B Professional Services", icon: "🏢", desc: "Generating high-ticket qualified inbound sales calls." },
  { name: "Healthcare & Local Services", icon: "🏥", desc: "Dominating local Google Maps and local service search queries." },
  { name: "Logistics & Supply Chain", icon: "🚢", desc: "Streamlining international lead flow and global sourcing." },
  { name: "Fintech & Financial Services", icon: "💳", desc: "Building trust, search authority, and compliant lead engines." },
];

// 12 — FAQ DATA MAP
const faqMap: Record<string, { q: string; a: string }[]> = {
  seo: [
    { q: "How long does it take to see SEO results?", a: "Initial technical and indexation improvements show results in 30-60 days. Significant ranking gains and organic revenue scale typically build over 3 to 6 months." },
    { q: "Do you guarantee #1 rankings on Google?", a: "No ethical agency can guarantee #1 rankings due to search algorithm updates. However, our data-driven process consistently places 90%+ of target keywords on Page 1." },
    { q: "What is included in your monthly SEO retainer?", a: "Full technical audits, on-page optimization, content cluster creation, high-DA backlink outreach, schema markup, and transparent bi-weekly analytics calls." },
    { q: "Can you help with international or local SEO?", a: "Yes! We specialize in both multi-region international hreflang SEO across 11 countries and hyper-local Google Business Profile optimization." },
  ],
  ppc: [
    { q: "What ad budget do I need to get started?", a: "We recommend a minimum media spend of $1,000 - $3,000/month to allow sufficient data collection and rapid A/B testing." },
    { q: "Which platforms do you manage?", a: "We manage Google Search, Performance Max, Meta (Facebook & Instagram), TikTok, and LinkedIn ad campaigns." },
    { q: "How do you prevent ad budget click fraud?", a: "We configure real-time fraud monitoring scripts like ClickCease to block bot IPs and competitor click waste out-of-the-box." },
    { q: "How quickly can my paid ads launch?", a: "Once account access and landing pages are verified, campaign builds typically launch within 3 to 5 business days." },
  ],
  "web-design-dev": [
    { q: "Why build with Next.js instead of WordPress?", a: "Next.js offers unmatched 100/100 Core Web Vitals speed scores, superior security, zero plugin bloat, and top-tier SEO rankings compared to traditional WordPress sites." },
    { q: "Will I be able to edit text and images myself?", a: "Yes! We integrate user-friendly Headless CMS controls (like Sanity, Strapi, or Headless WP) so your team can publish blogs and edit pages without touching code." },
    { q: "Is mobile responsiveness included?", a: "Absolutely. Every custom build is designed mobile-first and tested rigorously across iOS, Android, tablets, and desktop displays." },
    { q: "How long does a custom website build take?", a: "Standard 5-10 page custom websites take 3 to 4 weeks from Figma wireframes to live domain launch." },
  ],
  "content-marketing": [
    { q: "Who writes the content for our site?", a: "Our team of experienced native writers and SEO strategists craft all articles, whitepapers, and email copy tailored specifically to your industry." },
    { q: "How do you ensure the content ranks on Google?", a: "We use content grading tools like Clearscope and Surfer SEO to map search intent, keyword density, and topical cluster authority before publishing." },
    { q: "What is Digital PR and HARO outreach?", a: "We pitch your brand as an expert source to journalists at top publications (like Forbes, TechCrunch, Business Insider) to earn high-DA editorial backlinks." },
    { q: "Do you create email marketing newsletters?", a: "Yes! We design automated welcome, nurture, and promotional email sequences to convert article readers into active clients." },
  ],
  "ai-automation": [
    { q: "Is our proprietary business data kept private?", a: "Yes 100%. We deploy private vector database nodes with enterprise encryption. Your data is never trained on public AI models." },
    { q: "What tasks can custom AI agents automate?", a: "Customer support replies, instant lead qualification, automated CRM enrichment, competitor price scraping, and automated Slack/Email alerts." },
    { q: "How does the AI chatbot integrate with our site?", a: "We install a lightweight JavaScript snippet on your website that renders a sleek custom chatbot UI connected to your AI vector node." },
    { q: "How long does AI workflow setup take?", a: "Basic AI chatbots launch in 3 to 5 days. Complex multi-agent CRM automation pipelines take 2 to 3 weeks." },
  ],
  "china-sourcing": [
    { q: "Where are your sourcing agents located?", a: "Our bilingual sourcing staff operate directly in key manufacturing hubs: Ningbo, Yiwu, Shenzhen, and Guangzhou, China." },
    { q: "How do you ensure product quality before shipping?", a: "We conduct pre-shipment AQL 2.5 inspections on-site at the factory, sending you detailed photo and video audit reports before final payment release." },
    { q: "Can you help negotiate lower unit prices?", a: "Yes! Our agents negotiate directly with factory managers in native Mandarin to secure factory-direct pricing without intermediary markup." },
    { q: "Do you handle customs clearance and shipping?", a: "Yes, we handle complete door-to-door logistics including ocean container shipping, air express, customs duties, and tariffs." },
  ],
};

interface CategoryHoverTheme {
  badgeHover: string;
  titleHover: string;
  pillBadge: string;
  pillDot: string;
  headerAccent: string;
}

const processThemeMap: Record<string, CategoryHoverTheme> = {
  seo: {
    badgeHover: "group-hover:bg-[#0076FF] group-hover:text-white group-hover:border-[#0076FF] group-hover:shadow-lg group-hover:shadow-blue-500/30",
    titleHover: "group-hover:text-[#0076FF]",
    pillBadge: "bg-blue-50 border-blue-200 text-[#0076FF]",
    pillDot: "bg-[#0076FF]",
    headerAccent: "text-[#0076FF]",
  },
  ppc: {
    badgeHover: "group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-lg group-hover:shadow-orange-500/30",
    titleHover: "group-hover:text-orange-600",
    pillBadge: "bg-orange-50 border-orange-200 text-orange-600",
    pillDot: "bg-orange-500",
    headerAccent: "text-orange-600",
  },
  "web-design-dev": {
    badgeHover: "group-hover:bg-[#6366F1] group-hover:text-white group-hover:border-[#6366F1] group-hover:shadow-lg group-hover:shadow-indigo-500/30",
    titleHover: "group-hover:text-[#6366F1]",
    pillBadge: "bg-indigo-50 border-indigo-200 text-indigo-600",
    pillDot: "bg-[#6366F1]",
    headerAccent: "text-indigo-600",
  },
  "content-marketing": {
    badgeHover: "group-hover:bg-[#D97706] group-hover:text-white group-hover:border-[#D97706] group-hover:shadow-lg group-hover:shadow-amber-500/30",
    titleHover: "group-hover:text-[#D97706]",
    pillBadge: "bg-amber-50 border-amber-200 text-amber-700",
    pillDot: "bg-[#D97706]",
    headerAccent: "text-[#D97706]",
  },
  "ai-automation": {
    badgeHover: "group-hover:bg-[#9333EA] group-hover:text-white group-hover:border-[#9333EA] group-hover:shadow-lg group-hover:shadow-purple-500/30",
    titleHover: "group-hover:text-[#9333EA]",
    pillBadge: "bg-purple-50 border-purple-200 text-purple-700",
    pillDot: "bg-[#9333EA]",
    headerAccent: "text-[#9333EA]",
  },
  "china-sourcing": {
    badgeHover: "group-hover:bg-[#E11D48] group-hover:text-white group-hover:border-[#E11D48] group-hover:shadow-lg group-hover:shadow-rose-500/30",
    titleHover: "group-hover:text-[#E11D48]",
    pillBadge: "bg-rose-50 border-rose-200 text-rose-700",
    pillDot: "bg-[#E11D48]",
    headerAccent: "text-[#E11D48]",
  },
};

/* ──────── MAIN COMPONENT RENDER ──────── */
export default function ServiceExtraSections({ categorySlug = "seo" }: ServiceExtraSectionsProps) {
  const whyUsCards = whyUsCardsMap[categorySlug] || whyUsCardsMap["seo"];
  const steps = processMap[categorySlug] || processMap["seo"];
  const tools = toolsMap[categorySlug] || toolsMap["seo"];
  const caseStudies = caseStudiesMap[categorySlug] || caseStudiesMap["seo"];
  const metrics = metricsMap[categorySlug] || metricsMap["seo"];
  const faqs = faqMap[categorySlug] || faqMap["seo"];
  const processTheme = processThemeMap[categorySlug] || processThemeMap["seo"];

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dynamicHeader, setDynamicHeader] = useState({
    title: "Get Found by the Right Customers—On Search & AI",
    description: "Grow your visibility with strategic SEO built around how customers search today. From local SEO and ecommerce SEO to semantic SEO, SaaS SEO, and AI SEO, we build sustainable organic growth that brings qualified traffic and conversions.",
    imagePath: "/images/11.png",
    imageAlt: "Get Found by the Right Customers—On Search & AI",
    ctaText: "Grow My Organic Traffic",
    ctaLink: `/contact?service=${categorySlug}`,
  });

  React.useEffect(() => {
    async function loadDynamicService() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const categories = await res.json();
          const foundCat = categories.find((c: { slug?: string; id?: string; subItems?: Array<{ name?: string; description?: string; imagePath?: string; imageAlt?: string; primaryCtaText?: string; primaryCtaLink?: string }> }) => c.slug === categorySlug || c.id === categorySlug);
          if (foundCat && foundCat.subItems && foundCat.subItems.length > 0) {
            const firstTrack = foundCat.subItems[0];
            setDynamicHeader({
              title: firstTrack.name || "Get Found by the Right Customers—On Search & AI",
              description: firstTrack.description || "Grow your visibility with strategic SEO built around how customers search today...",
              imagePath: firstTrack.imagePath || "/images/11.png",
              imageAlt: firstTrack.imageAlt || firstTrack.name || "Get Found by the Right Customers",
              ctaText: firstTrack.primaryCtaText || "Grow My Organic Traffic",
              ctaLink: firstTrack.primaryCtaLink || `/contact?service=${categorySlug}`,
            });
          }
        }
      } catch {}
    }
    loadDynamicService();
  }, [categorySlug]);

  return (
    <div className="bg-white text-neutral-900">
      
      {/* ── ORGANIC SEARCH GROWTH HIGHLIGHT SECTION (Clean Frameless Image Left, Text Right) ── */}
      <section className="py-20 lg:py-28 bg-white border-t border-neutral-200/80 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Transparent Cutout Image 11 (Without Frame or Box) */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-md flex items-center justify-center p-2">
                <img
                  src={dynamicHeader.imagePath || "/images/11.png"}
                  alt={dynamicHeader.imageAlt || dynamicHeader.title}
                  className="w-full h-auto max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-xl select-none hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: Text Content, Checklist & Badges */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.18] mb-6">
                {dynamicHeader.title}
              </h2>
              
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                {dynamicHeader.description}
              </p>

              {/* Optimization Points List */}
              <div className="w-full mb-8 space-y-3">
                <p className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  We optimize and manage your:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#F8FAFC] border border-neutral-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:border-blue-200 transition-colors">
                    <span className="text-lg shrink-0 select-none">🔍</span>
                    <span className="font-sans text-xs font-semibold text-neutral-800 leading-snug">
                      Local SEO & Google Business Profile optimization
                    </span>
                  </div>

                  <div className="bg-[#F8FAFC] border border-neutral-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:border-blue-200 transition-colors">
                    <span className="text-lg shrink-0 select-none">🛒</span>
                    <span className="font-sans text-xs font-semibold text-neutral-800 leading-snug">
                      Ecommerce SEO & product page optimization
                    </span>
                  </div>

                  <div className="bg-[#F8FAFC] border border-neutral-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:border-blue-200 transition-colors">
                    <span className="text-lg shrink-0 select-none">🌎</span>
                    <span className="font-sans text-xs font-semibold text-neutral-800 leading-snug">
                      International, SaaS & semantic SEO
                    </span>
                  </div>

                  <div className="bg-[#F8FAFC] border border-neutral-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:border-blue-200 transition-colors">
                    <span className="text-lg shrink-0 select-none">🤖</span>
                    <span className="font-sans text-xs font-semibold text-neutral-800 leading-snug">
                      AI SEO, AEO & Generative Engine Optimization
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={dynamicHeader.ctaLink || `/contact?service=${categorySlug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#0076FF]/40 bg-[#0076FF] hover:bg-blue-600 text-white px-8 py-4 text-xs font-extrabold uppercase tracking-widest transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{dynamicHeader.ctaText || "Grow My Organic Traffic"}</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* ── 06 — WHY CHOOSE US SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-200/80 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-4">
              06 — Why Choose Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              Why clients trust our strategy.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whyUsCards.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] border border-neutral-200/80 rounded-2xl p-8 hover:border-[#0076FF]/60 hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-xs flex flex-col group"
              >
                <div className="h-12 w-12 rounded-xl bg-white border border-neutral-200/90 flex items-center justify-center text-2xl mb-6 shadow-xs group-hover:scale-105 transition-transform">
                  <span>{item.icon}</span>
                </div>
                <h3 className="font-sans text-lg font-bold text-neutral-900 mb-2 group-hover:text-[#0076FF] transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 — SERVICE PROCESS SECTION (Connected Horizontal Timeline + Mouse Hover Theme Per Category) ── */}
      <section className="py-24 lg:py-32 border-t border-neutral-200/80 bg-[#F9FAFB] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 ${processTheme.pillBadge}`}>
              <span className={`h-2 w-2 rounded-full ${processTheme.pillDot}`} />
              HOW IT WORKS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mb-4">
              Our proven step-by-step process.
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              Transparent, execution-driven strategies mapped out for scaling success with absolute clarity.
            </p>
          </div>

          {/* Connected Step Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Horizontal Connecting Line (visible on desktop) */}
            <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-neutral-200/90 -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
              {steps.map((st, sidx) => (
                <div key={st.step || sidx} className="flex flex-col items-center text-center group cursor-pointer">
                  {/* Step Number Circle Badge (Normally black text, white text on mouse hover) */}
                  <div className={`w-14 h-14 rounded-full bg-white border border-neutral-200/90 shadow-sm flex items-center justify-center font-bold text-neutral-900 text-lg sm:text-xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${processTheme.badgeHover}`}>
                    {parseInt(st.step, 10) || sidx + 1}
                  </div>

                  {/* Step Title with Dynamic Category Hover Color */}
                  <h3 className={`font-sans font-bold text-base sm:text-lg text-neutral-900 mb-2 leading-snug transition-colors ${processTheme.titleHover}`}>
                    {st.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xs mx-auto">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 08 — TOOLS / TECHNOLOGY SECTION ── */}
      <section className="py-16 lg:py-24 border-t border-neutral-200/80 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-4 py-1.5 text-xs font-bold text-cyan-700 uppercase tracking-widest mb-3">
              08 — Tools & Technology
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Enterprise Technology Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((t, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border border-neutral-200/80 rounded-xl p-4 text-center flex flex-col items-center justify-center hover:border-cyan-500/50 hover:bg-white transition-colors shadow-xs">
                <span className="text-xs font-bold text-neutral-900 mb-1 block">
                  {t.name}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {t.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 09 — FEATURED CASE STUDIES SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-200/80 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-4">
              09 — Featured Case Studies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
              Proven Case Study Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="bg-white border border-neutral-200/80 rounded-2xl p-8 flex flex-col justify-between shadow-xs hover:border-[#0076FF]/60 transition-all">
                <div>
                  <span className="text-xs font-bold text-[#0076FF] uppercase tracking-widest block mb-2">
                    {cs.metric}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3">
                    {cs.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    {cs.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 — RESULTS / METRICS SECTION ── */}
      <section className="py-16 lg:py-24 border-t border-neutral-200/80 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">
              10 — Results & Metrics
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Quantified Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border border-neutral-200/80 rounded-2xl p-6 text-center flex flex-col items-center shadow-xs">
                <span className="font-serif text-4xl font-bold text-emerald-600 mb-2">
                  {m.value}
                </span>
                <h4 className="font-sans text-sm font-bold text-neutral-900 mb-1">
                  {m.label}
                </h4>
                <p className="font-sans text-xs text-neutral-600">
                  {m.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 — INDUSTRIES / USE CASES SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-200/80 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200 px-4 py-1.5 text-xs font-bold text-purple-700 uppercase tracking-widest mb-4">
              11 — Industries / Use Cases
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
              Industries We Accelerate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industriesList.map((ind, idx) => (
              <div key={idx} className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex items-start gap-4 hover:border-purple-400 transition-colors shadow-xs">
                <span className="text-3xl shrink-0 p-2 bg-[#F8FAFC] rounded-xl border border-neutral-200">
                  {ind.icon}
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold text-neutral-900 mb-1">
                    {ind.name}
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12 — FAQ ACCORDION SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-200/80 bg-white">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-4">
              12 — FAQ
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-[#F8FAFC] border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left font-sans text-base font-bold text-neutral-900 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <Icons.ChevronDown className={`w-5 h-5 text-[#0076FF] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 mt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 13 — FINAL CTA SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-200/80 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white text-center relative overflow-hidden">
        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 px-4 py-1.5 text-xs font-bold text-blue-300 uppercase tracking-widest mb-6">
            13 — Final Call to Action
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Ready to scale your business?
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Get a tailored growth blueprint designed specifically for your goals. No long-term lock-ins, 100% transparent execution.
          </p>
          <Link
            href={`/contact?service=${categorySlug}`}
            className="inline-flex items-center justify-center rounded-full bg-[#0076FF] hover:bg-blue-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
          >
            Get Free Proposal & Audit →
          </Link>
        </div>
      </section>

    </div>
  );
}
