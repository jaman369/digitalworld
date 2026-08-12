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

/* ──────── MAIN COMPONENT RENDER ──────── */
export default function ServiceExtraSections({ categorySlug = "seo" }: ServiceExtraSectionsProps) {
  const whyUsCards = whyUsCardsMap[categorySlug] || whyUsCardsMap["seo"];
  const steps = processMap[categorySlug] || processMap["seo"];
  const tools = toolsMap[categorySlug] || toolsMap["seo"];
  const caseStudies = caseStudiesMap[categorySlug] || caseStudiesMap["seo"];
  const metrics = metricsMap[categorySlug] || metricsMap["seo"];
  const faqs = faqMap[categorySlug] || faqMap["seo"];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#090A0C] text-white">
      
      {/* ── 06 — WHY CHOOSE US SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-900 relative overflow-hidden bg-[#0A0C10]">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 px-4 py-1.5 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">
              06 — Why Choose Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Why clients trust our strategy.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whyUsCards.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#12141A]/90 border border-neutral-800/80 rounded-2xl p-8 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 shadow-md flex flex-col group"
              >
                <div className="h-12 w-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-2xl mb-6 group-hover:scale-105 transition-transform">
                  <span>{item.icon}</span>
                </div>
                <h3 className="font-sans text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 — SERVICE PROCESS SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-900 relative overflow-hidden bg-[#08090D]">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/40 px-4 py-1.5 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">
              07 — Service Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Our 5-step execution workflow.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
            {steps.map((st) => (
              <div key={st.step} className="bg-[#101218] border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-400 block mb-3">
                    STEP {st.step}
                  </span>
                  <h4 className="font-sans text-base font-bold text-white mb-2">
                    {st.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 — TOOLS / TECHNOLOGY SECTION ── */}
      <section className="py-16 lg:py-24 border-t border-neutral-900 bg-[#0A0C10]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 px-4 py-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">
              08 — Tools & Technology
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Enterprise Technology Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((t, idx) => (
              <div key={idx} className="bg-[#12141A] border border-neutral-800/80 rounded-xl p-4 text-center flex flex-col items-center justify-center hover:border-cyan-500/40 transition-colors">
                <span className="text-xs font-bold text-white mb-1 block">
                  {t.name}
                </span>
                <span className="text-[10px] text-neutral-400">
                  {t.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 09 — FEATURED CASE STUDIES SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-900 bg-[#08090C]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 px-4 py-1.5 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">
              09 — Featured Case Studies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Proven Case Study Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="bg-[#12141A] border border-neutral-800/80 rounded-2xl p-8 flex flex-col justify-between hover:border-blue-500/40 transition-all">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
                    {cs.metric}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {cs.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                    {cs.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 — RESULTS / METRICS SECTION ── */}
      <section className="py-16 lg:py-24 border-t border-neutral-900 bg-[#0A0C10]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 px-4 py-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
              10 — Results & Metrics
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Quantified Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-[#12141A] border border-neutral-800/80 rounded-2xl p-6 text-center flex flex-col items-center">
                <span className="font-serif text-4xl font-bold text-emerald-400 mb-2">
                  {m.value}
                </span>
                <h4 className="font-sans text-sm font-bold text-white mb-1">
                  {m.label}
                </h4>
                <p className="font-sans text-xs text-neutral-400">
                  {m.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 — INDUSTRIES / USE CASES SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-900 bg-[#08090C]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 px-4 py-1.5 text-xs font-bold text-purple-400 uppercase tracking-widest mb-4">
              11 — Industries / Use Cases
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Industries We Accelerate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industriesList.map((ind, idx) => (
              <div key={idx} className="bg-[#12141A] border border-neutral-800/80 rounded-2xl p-6 flex items-start gap-4 hover:border-purple-500/40 transition-colors">
                <span className="text-3xl shrink-0 p-2 bg-neutral-900 rounded-xl border border-neutral-800">
                  {ind.icon}
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold text-white mb-1">
                    {ind.name}
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12 — FAQ ACCORDION SECTION ── */}
      <section className="py-20 lg:py-28 border-t border-neutral-900 bg-[#0A0C10]">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 px-4 py-1.5 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">
              12 — FAQ
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-[#12141A] border border-neutral-800/80 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left font-sans text-base font-bold text-white flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <Icons.ChevronDown className={`w-5 h-5 text-blue-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/50 mt-2">
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
      <section className="py-20 lg:py-28 border-t border-neutral-900 bg-gradient-to-b from-[#08090C] to-[#0D111A] text-center relative overflow-hidden">
        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/20 border border-blue-500/40 px-4 py-1.5 text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">
            13 — Final Call to Action
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Ready to scale your business?
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Get a tailored growth blueprint designed specifically for your goals. No long-term lock-ins, 100% transparent execution.
          </p>
          <Link
            href={`/contact?service=${categorySlug}`}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
          >
            Get Free Proposal & Audit →
          </Link>
        </div>
      </section>

    </div>
  );
}
