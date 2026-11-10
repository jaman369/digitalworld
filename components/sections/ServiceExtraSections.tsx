"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

import Image from "next/image";

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
    { icon: "✍️", title: "Conversion-First Copywriting", desc: "Every word is engineered to hook readers, eliminate friction, and drive high-intent commercial action." },
    { icon: "🧠", title: "Topical Authority & SEO", desc: "In-depth blog articles and guides structured to rank on Google and capture qualified organic search traffic." },
    { icon: "🎯", title: "Platform-Native Ad Copy", desc: "Scroll-stopping hooks, high-converting ad angles, and direct-response formulas built to lower CPA." },
    { icon: "📧", title: "High-ROI Email Sequences", desc: "Automated onboarding, nurture, and sales email copy that converts subscribers into repeat buyers." },
    { icon: "📦", title: "Persuasive Product Copy", desc: "Compelling e-commerce descriptions that highlight key benefits and accelerate purchase decisions." },
    { icon: "⚡", title: "Fast Turnaround & Quality", desc: "Strict editorial standards, 100% human-crafted copy, and fast turnaround with transparent revisions." },
  ],
  "ai-automation": [
    { icon: "🤖", title: "Custom Fine-Tuned AI", desc: "AI models trained exclusively on your business documentation, knowledge bases, and FAQs." },
    { icon: "⚡", title: "24/7 Automated Execution", desc: "Zero-delay instant customer support replies and lead qualification around the clock." },
    { icon: "🔄", title: "Seamless App Integrations", desc: "Connect Make.com, Zapier, HubSpot, Salesforce, and custom webhooks seamlessly." },
    { icon: "🛡️", title: "Private Vector Nodes", desc: "100% encrypted data privacy. Your data is never shared or trained on public models." },
    { icon: "🧠", title: "Multi-Agent Logic", desc: "Complex autonomous agents that perform research, draft replies, and route qualified leads." },
    { icon: "📈", title: "80%+ Cost Reduction", desc: "Eliminate repetitive manual data entry tasks with scalable AI workflows." },
  ],
  "ai-video-production": [
    { icon: "🎬", title: "AI at Speed of Thought", desc: "From script to final video in 24–48 hours. We eliminate the weeks-long production timelines of traditional video agencies." },
    { icon: "💸", title: "80% Lower Production Cost", desc: "No film crews, no studio rentals, no actor fees. AI video production costs a fraction of traditional video — with equal or superior quality." },
    { icon: "🌍", title: "40+ Language Delivery", desc: "One video, every market. We produce multilingual voiceovers and lip-sync dubbing so your content reaches every global audience." },
    { icon: "🔁", title: "Unlimited Creative Variations", desc: "A/B test 10, 20, or 50 creative variations simultaneously. AI lets us iterate rapidly to find the highest-converting version." },
    { icon: "🎯", title: "Platform-Native Optimization", desc: "Every video is engineered for its target platform — TikTok hooks, YouTube thumbnails, Meta ad specs, and LinkedIn formats." },
    { icon: "📊", title: "Performance-Backed Creative", desc: "Our video scripts are built on buyer psychology, ad frameworks (AIDA, PAS, Hook-Story-Offer), and conversion data from real campaigns." },
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
    { step: "01", title: "Strategy & Audience Brief", desc: "Analyzing customer pain points, search intent, and brand voice guidelines." },
    { step: "02", title: "Outline & Hook Structuring", desc: "Mapping irresistible hooks, clear value props, and conversion triggers." },
    { step: "03", title: "Expert Copy & Content Writing", desc: "Drafting persuasive, SEO-optimized copy tailored for each platform and format." },
    { step: "04", title: "Editorial Review & Polish", desc: "Grammar, clarity, flow, fact-checking, and conversion optimization checks." },
    { step: "05", title: "Delivery & Performance Review", desc: "Delivering finalized copy with layout cues, meta tags, and A/B test angles." },
  ],
  "ai-automation": [
    { step: "01", title: "Workflow Bottleneck Audit", desc: "Mapping manual tasks, data entry bottlenecks, and API opportunities." },
    { step: "02", title: "Knowledge Base Vectorization", desc: "Indexing company docs, FAQs, and product sheets into private AI vector nodes." },
    { step: "03", title: "Prompt & Agent Engineering", desc: "Building fine-tuned LLM prompts and multi-step autonomous agent logic." },
    { step: "04", title: "CRM & Tool Integration", desc: "Connecting Make.com, Zapier, HubSpot, Slack, and webhooks." },
    { step: "05", title: "Deployment & Automated Monitoring", desc: "Rolling out automation with 24/7 error monitoring and prompt tuning." },
  ],
  "ai-video-production": [
    { step: "01", title: "Strategy & Script Briefing", desc: "We define the video goal, target audience, platform, messaging framework, and script outline." },
    { step: "02", title: "AI Script & Storyboard", desc: "Our team writes the full conversion-optimized video script and maps each scene with AI storyboards." },
    { step: "03", title: "AI Video Generation", desc: "We produce the video using AI tools: avatars, voiceovers, B-roll, animations, and motion graphics." },
    { step: "04", title: "Editing, Branding & Captions", desc: "Color grading, logo integration, animated captions, CTA overlays, and platform-specific formatting." },
    { step: "05", title: "Delivery & Performance Review", desc: "Final video delivery with ad account upload support, A/B variant sets, and performance review." },
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
    { name: "Clearscope & Surfer", category: "Content & SEO Tuning" },
    { name: "Grammarly Business", category: "Editorial Quality" },
    { name: "Hemingway Editor", category: "Clarity & Readability" },
    { name: "Google Search Console", category: "Search Intent Research" },
    { name: "Notion & Google Docs", category: "Collaborative Editorial" },
    { name: "Klaviyo & Mailchimp", category: "Email Formatting" },
  ],
  "ai-automation": [
    { name: "OpenAI GPT-4o API", category: "Generative Reasoning" },
    { name: "Pinecone VectorDB", category: "Knowledge Base RAG" },
    { name: "Make.com & Zapier", category: "Workflow Orchestration" },
    { name: "LangChain", category: "Multi-Agent Framework" },
    { name: "HubSpot & Salesforce", category: "CRM Integration" },
    { name: "Slack & Webhooks", category: "Real-time Notification Node" },
  ],
  "ai-video-production": [
    { name: "HeyGen AI Avatar", category: "AI Spokesperson & UGC Videos" },
    { name: "Runway Gen-3 Alpha", category: "AI Video Generation" },
    { name: "ElevenLabs Voice AI", category: "Voiceover & Multilingual Dubbing" },
    { name: "Sora by OpenAI", category: "Generative Video Creation" },
    { name: "CapCut & Adobe Premiere", category: "Pro Video Editing & Post" },
    { name: "Midjourney & DALL-E 3", category: "AI Visual & Scene Generation" },
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
    { title: "SaaS Blog Writing Program", metric: "+320% Organic Leads", desc: "Published 24 high-intent buyer articles ranking Page 1 in 6 months." },
    { title: "E-Commerce Product Copy Redesign", metric: "+45% Cart Conversion", desc: "Rewrote 85 product descriptions focusing on benefits and emotional triggers." },
    { title: "B2B Sales Email Sequence", metric: "41% Open & 3.8x Pipeline", desc: "Crafted automated 6-part cold-to-call email nurture sequence." },
  ],
  "ai-automation": [
    { title: "Customer Support AI Bot", metric: "78% Tickets Solved", desc: "Deployed custom RAG chatbot resolving tickets 24/7." },
    { title: "Automated Lead Router", metric: "< 5s Routing Speed", desc: "Routed qualified leads into sales Slack channels instantly." },
    { title: "CRM Data Enrichment AI", metric: "30 Hrs Saved / Wk", desc: "Automated prospect research and CRM profile creation." },
  ],
  "ai-video-production": [
    { title: "E-Commerce AI Product Ad Campaign", metric: "3.8x ROAS", desc: "AI-generated product ads outperformed static creatives across Meta & TikTok within 14 days." },
    { title: "SaaS AI Explainer Video", metric: "+62% Trial Signups", desc: "AI explainer on landing page increased free trial signup rates by 62% within 30 days." },
    { title: "Real Estate AI Video Series", metric: "2x Faster Sales", desc: "AI property walkthroughs cut average days-on-market in half for a UAE property developer." },
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
    { value: "1,200+", label: "Articles & Assets Written", sub: "Covering blogs, web, ads, and email" },
    { value: "+45%", label: "Average Conversion Lift", sub: "From website & landing page rewrites" },
    { value: "100%", label: "Human-Crafted & Vetted", sub: "Plagiarism-free, verified writing" },
    { value: "41%", label: "Average Email Open Rate", sub: "Across custom nurture campaigns" },
  ],
  "ai-automation": [
    { value: "78%", label: "Support Tickets Resolved", sub: "By automated RAG AI chatbots" },
    { value: "< 5s", label: "Lead Response Time", sub: "Instant CRM & Slack routing" },
    { value: "30+ Hrs", label: "Saved Per Week", sub: "Eliminating manual task friction" },
    { value: "100%", label: "Private Data Vectoring", sub: "Zero public model data leaks" },
  ],
  "ai-video-production": [
    { value: "48 Hrs", label: "Avg Production Time", sub: "Script to final delivered video" },
    { value: "80%", label: "Lower Cost vs Traditional", sub: "Versus film crew production" },
    { value: "40+", label: "Languages Supported", sub: "AI voiceover & lip-sync dubbing" },
    { value: "3.8x", label: "Average ROAS on AI Ads", sub: "AI product ads vs static creatives" },
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
    { q: "Which platforms do you manage?", a: "We manage Google Ads, Facebook Ads, Instagram Ads, YouTube Ads, TikTok Ads, LinkedIn Ads, Pinterest Ads, and X Ads." },
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
    { q: "Who writes the content and copy for our brand?", a: "Our team of specialized native copywriters and SEO editors crafts all articles, website copy, product descriptions, and email sequences tailored to your niche." },
    { q: "How do you ensure blog articles rank on Google?", a: "We analyze competitor rankings, user search intent, and topical keyword clusters with tools like Clearscope and Surfer SEO before drafting, guaranteeing depth and search relevance." },
    { q: "Can you adopt our company's unique brand voice?", a: "Yes. Before writing, we analyze your current assets, brand guidelines, and target customer psychology to ensure every line matches your tone and persona." },
    { q: "What types of writing do you deliver?", a: "We provide blog writing, website copy, product descriptions, social media copy, email sequences, paid ad copy, sales pages, and video scripts." },
  ],
  "ai-automation": [
    { q: "Is our proprietary business data kept private?", a: "Yes 100%. We deploy private vector database nodes with enterprise encryption. Your data is never trained on public AI models." },
    { q: "What tasks can custom AI agents automate?", a: "Customer support replies, instant lead qualification, automated CRM enrichment, competitor price scraping, and automated Slack/Email alerts." },
    { q: "How does the AI chatbot integrate with our site?", a: "We install a lightweight JavaScript snippet on your website that renders a sleek custom chatbot UI connected to your AI vector node." },
    { q: "How long does AI workflow setup take?", a: "Basic AI chatbots launch in 3 to 5 days. Complex multi-agent CRM automation pipelines take 2 to 3 weeks." },
  ],
  "ai-video-production": [
    { q: "How quickly can you produce an AI video?", a: "Most AI explainer, product ad, and UGC-style videos are delivered within 24–72 hours of script approval. Complex multi-scene productions or full short-form content batches take 5–7 business days." },
    { q: "Will the AI videos look professional or generic?", a: "Our AI videos are produced using the latest generation tools (HeyGen, Runway Gen-3, ElevenLabs) combined with expert human direction on scripting, pacing, and brand alignment. The results are indistinguishable from high-budget production." },
    { q: "Can you match our brand identity in the videos?", a: "Yes. Every video is fully branded with your logo, colors, fonts, and brand voice. We create a brand style guide for your video content before production begins." },
    { q: "Do you support multilingual videos for international markets?", a: "Absolutely. We produce AI voiceovers in 40+ languages and offer lip-sync dubbing for avatar and spokesperson videos — making your content native to every target market." },
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
  "ai-video-production": {
    badgeHover: "group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-fuchsia-500 group-hover:text-white group-hover:border-violet-500 group-hover:shadow-lg group-hover:shadow-violet-500/30",
    titleHover: "group-hover:text-violet-600",
    pillBadge: "bg-violet-50 border-violet-200 text-violet-700",
    pillDot: "bg-[#8B5CF6]",
    headerAccent: "text-violet-600",
  },
};

/* ──────── MAIN COMPONENT RENDER ──────── */
export default function ServiceExtraSections({ categorySlug = "seo" }: ServiceExtraSectionsProps) {
  const currentSlug = categorySlug === "content-writing" ? "content-marketing" : categorySlug;
  const whyUsCards = whyUsCardsMap[currentSlug] || whyUsCardsMap["seo"];
  const steps = processMap[currentSlug] || processMap["seo"];
  const tools = toolsMap[currentSlug] || toolsMap["seo"];
  const caseStudies = caseStudiesMap[currentSlug] || caseStudiesMap["seo"];
  const metrics = metricsMap[currentSlug] || metricsMap["seo"];
  const faqs = faqMap[currentSlug] || faqMap["seo"];
  const processTheme = processThemeMap[currentSlug] || processThemeMap["seo"];

  /* ── Per-service highlight content (user-provided exact copy) ── */
  const highlightContentMap: Record<string, {
    title: string;
    description: string;
    subtitle: string;
    points: { emoji: string; text: string }[];
    ctaText: string;
    imagePath: string;
  }> = {
    seo: {
      title: "Get Found by the Right Customers—On Search & AI",
      description: "Grow your visibility with strategic SEO built around how customers search today. From local SEO and ecommerce SEO to semantic SEO, SaaS SEO, and AI SEO, we build sustainable organic growth that brings qualified traffic and conversions.",
      subtitle: "We optimize and manage your:",
      points: [
        { emoji: "🔍", text: "Local & Ecommerce SEO optimization" },
        { emoji: "🌎", text: "International & SaaS SEO growth" },
        { emoji: "🧠", text: "Semantic SEO & Authority Link Building" },
        { emoji: "🤖", text: "Ai SEO & Technical SEO architecture" },
      ],
      ctaText: "Grow My Organic Traffic",
      imagePath: "/images/11.png",
    },
    ppc: {
      title: "Turn Your Ad Spend Into Predictable Growth",
      description: "Reach high-intent customers with performance-focused paid advertising. We create, manage, and optimize campaigns across Google Search Ads, Google Shopping Ads, Performance Max, YouTube Ads, and remarketing to improve conversions and ROAS.",
      subtitle: "We optimize and manage your:",
      points: [
        { emoji: "🎯", text: "Google Search & Shopping Ads" },
        { emoji: "📈", text: "Performance Max & conversion optimization" },
        { emoji: "▶️", text: "YouTube Ads & audience targeting" },
        { emoji: "🔄", text: "Remarketing, retargeting & campaign scaling" },
      ],
      ctaText: "Scale My Ads",
      imagePath: "/images/21.png",
    },
    "web-design-dev": {
      title: "Build a Website That Looks Great—and Converts",
      description: "Your website should do more than look professional—it should generate results. We build responsive, mobile-first websites, landing pages, WordPress and Shopify solutions designed for speed, usability, SEO, and conversions.",
      subtitle: "We build and optimize your:",
      points: [
        { emoji: "🎨", text: "UI/UX & responsive web design" },
        { emoji: "⚡", text: "Website speed & Core Web Vitals" },
        { emoji: "🛍️", text: "WordPress, Shopify & ecommerce websites" },
        { emoji: "🚀", text: "High-converting landing pages for paid ads" },
      ],
      ctaText: "Build My Website",
      imagePath: "/images/15.png",
    },
    "web-design": {
      title: "Build a Website That Looks Great—and Converts",
      description: "Your website should do more than look professional—it should generate results. We build responsive, mobile-first websites, landing pages, WordPress and Shopify solutions designed for speed, usability, SEO, and conversions.",
      subtitle: "We build and optimize your:",
      points: [
        { emoji: "🎨", text: "UI/UX & responsive web design" },
        { emoji: "⚡", text: "Website speed & Core Web Vitals" },
        { emoji: "🛍️", text: "WordPress, Shopify & ecommerce websites" },
        { emoji: "🚀", text: "High-converting landing pages for paid ads" },
      ],
      ctaText: "Build My Website",
      imagePath: "/images/15.png",
    },
    "content-marketing": {
      title: "Content Writing That Ranks, Engages & Converts",
      description: "Turn ideas into compelling copy and authoritative content that attracts search traffic and moves customers toward purchase. From blog posts and website copy to product descriptions, email sequences, and high-impact ad copy, we craft words that sell.",
      subtitle: "We write and optimize your:",
      points: [
        { emoji: "✍️", text: "SEO blog writing & in-depth article guides" },
        { emoji: "🌐", text: "High-converting website copy & landing pages" },
        { emoji: "📦", text: "Persuasive product descriptions & e-commerce copy" },
        { emoji: "📧", text: "Email sequences, ad copy, sales copy & video scripts" },
      ],
      ctaText: "Get Content Writing Quote",
      imagePath: "/images/13.png",
    },
    "content-writing": {
      title: "Content Writing That Ranks, Engages & Converts",
      description: "Turn ideas into compelling copy and authoritative content that attracts search traffic and moves customers toward purchase. From blog posts and website copy to product descriptions, email sequences, and high-impact ad copy, we craft words that sell.",
      subtitle: "We write and optimize your:",
      points: [
        { emoji: "✍️", text: "SEO blog writing & in-depth article guides" },
        { emoji: "🌐", text: "High-converting website copy & landing pages" },
        { emoji: "📦", text: "Persuasive product descriptions & e-commerce copy" },
        { emoji: "📧", text: "Email sequences, ad copy, sales copy & video scripts" },
      ],
      ctaText: "Get Content Writing Quote",
      imagePath: "/images/13.png",
    },
    "ai-automation": {
      title: "Automate Repetitive Work & Accelerate Your Growth",
      description: "Replace repetitive manual tasks with intelligent systems that work around the clock. From AI voice agents, YouTube automation, and CRM pipelines to MCP integrations and RAG knowledge bases, we connect your tools into one autonomous growth engine.",
      subtitle: "We automate your:",
      points: [
        { emoji: "🎯", text: "AI lead automation & real-time enrichment" },
        { emoji: "🔄", text: "CRM & multi-step workflow automation" },
        { emoji: "▶️", text: "YouTube automation & AI voice agents" },
        { emoji: "🧠", text: "MCP integrations & RAG knowledge bases" },
      ],
      ctaText: "Automate My Business",
      imagePath: "/images/22.png",
    },
    "ai-video-production": {
      title: "AI Video That Sells, Educates & Goes Viral",
      description: "From AI explainer videos and UGC-style product ads to AI avatar spokespersons, multilingual dubbing, real estate walkthroughs, and short-form Reels — we produce every type of video content with AI, faster and at dramatically lower cost than traditional production.",
      subtitle: "We create AI videos for:",
      points: [
        { emoji: "🎬", text: "Explainer, promo & product ad videos" },
        { emoji: "🤖", text: "AI avatar, UGC-style & spokesperson videos" },
        { emoji: "🌍", text: "Multilingual voiceover & lip-sync dubbing" },
        { emoji: "📱", text: "Short-form Reels, TikToks & YouTube Shorts" },
      ],
      ctaText: "Start My AI Video Project",
      imagePath: "/images/16.png",
    },
  };

  const highlight = highlightContentMap[currentSlug] || highlightContentMap["seo"];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-white text-neutral-900">
      
      {/* ── SERVICE HIGHLIGHT SECTION (Image Left, Text + Checklist Right) ── */}
      <section className="py-14 lg:py-20 bg-white border-t border-neutral-200/80 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Transparent Cutout Image (Without Frame or Box) */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-md flex items-center justify-center p-2">
                <Image
                  src={highlight.imagePath}
                  alt={highlight.title}
                  width={420}
                  height={420}
                  className="w-full h-auto max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-xl select-none hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: Text Content, Checklist & CTA */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-[1.18] mb-4">
                {highlight.title}
              </h2>
              
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                {highlight.description}
              </p>

              {/* Optimization Points List */}
              <div className="w-full mb-8 space-y-3">
                <p className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  {highlight.subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlight.points.map((point, idx) => (
                    <div key={idx} className="bg-[#F8FAFC] border border-neutral-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:border-blue-200 transition-colors">
                      <span className="text-lg shrink-0 select-none">{point.emoji}</span>
                      <span className="font-sans text-xs font-semibold text-neutral-800 leading-snug">
                        {point.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={`/contact?service=${categorySlug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#0076FF]/40 bg-[#0076FF] hover:bg-blue-600 text-white px-8 py-4 text-xs font-extrabold uppercase tracking-widest transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{highlight.ctaText} →</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* ── 06 — WHY CHOOSE US SECTION ── */}
      <section className="py-14 lg:py-20 border-t border-neutral-200/80 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-4">
              06 — Why Choose Us
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
              Why clients trust our strategy.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whyUsCards.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] border border-neutral-200/80 rounded-2xl p-5 lg:p-6 hover:border-[#0076FF]/60 hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-xs flex flex-col group"
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
      <section className="py-16 lg:py-20 border-t border-neutral-200/80 bg-[#F9FAFB] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 ${processTheme.pillBadge}`}>
              <span className={`h-2 w-2 rounded-full ${processTheme.pillDot}`} />
              HOW IT WORKS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-tight mb-3">
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
      <section className="py-14 lg:py-20 border-t border-neutral-200/80 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-4">
              09 — Featured Case Studies
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
              Proven Case Study Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="bg-white border border-neutral-200/80 rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-xs hover:border-[#0076FF]/60 transition-all">
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

      {/* ── 10 — RESULTS / METRICS SECTION (With 27.png Graph Showcase & Metric Grid) ── */}
      <section className="py-16 lg:py-24 border-t border-neutral-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">
              10 — Results & Metrics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Quantified Performance
            </h2>
          </div>

          {/* 2-Column Split: Graph Design Left + Metric Grid Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Image 27.png 3D Pie Chart Graph Showcase (Border-Free Floating Card) */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md lg:max-w-none flex items-center justify-center p-6 sm:p-8 rounded-3xl bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-md group">
                {/* Background ambient radial glow */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-indigo-500/10 blur-2xl -z-10 group-hover:scale-110 transition-transform duration-700" />

                {/* Graph Image 27.png */}
                <Image
                  src="/images/27.png"
                  alt="Quantified Performance Graph Chart"
                  width={460}
                  height={460}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 460px"
                  className="w-full h-auto max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-[1.03]"
                />

                {/* Floating Badge 1: Top Right */}
                <div className="absolute top-4 right-2 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 shadow-md flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-sans text-xs font-bold text-neutral-800">75% Market Share</span>
                </div>

                {/* Floating Badge 2: Bottom Left */}
                <div className="absolute bottom-4 left-2 sm:left-4 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 shadow-md flex items-center gap-2">
                  <Icons.TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="font-sans text-xs font-bold text-neutral-800">Data-Driven ROI</span>
                </div>
              </div>
            </div>

            {/* Right Column: 2x2 Metric Cards Grid with Border-Free Floating Design */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {metrics.map((m, idx) => {
                const metricIcons = [Icons.TrendingUp, Icons.Award, Icons.ShieldCheck, Icons.BarChart3];
                const IconComp = metricIcons[idx % metricIcons.length];
                const themes = [
                  "text-emerald-600 bg-emerald-50/80",
                  "text-blue-600 bg-blue-50/80",
                  "text-teal-600 bg-teal-50/80",
                  "text-indigo-600 bg-indigo-50/80",
                ];
                const theme = themes[idx % themes.length];

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${theme}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-300 group-hover:text-emerald-600 transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 block mb-1 tracking-tight">
                        {m.value}
                      </span>
                      <h4 className="font-sans text-sm sm:text-base font-bold text-neutral-900 mb-1">
                        {m.label}
                      </h4>
                      <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                        {m.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── 11 — INDUSTRIES / USE CASES SECTION ── */}
      <section className="py-14 lg:py-20 border-t border-neutral-200/80 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200 px-4 py-1.5 text-xs font-bold text-purple-700 uppercase tracking-widest mb-4">
              11 — Industries / Use Cases
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
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
      <section className="py-14 lg:py-20 border-t border-neutral-200/80 bg-white">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-4">
              12 — FAQ
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
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
      <section className="py-14 lg:py-20 border-t border-neutral-200/80 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white text-center relative overflow-hidden">
        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 px-4 py-1.5 text-xs font-bold text-blue-300 uppercase tracking-widest mb-6">
            13 — Final Call to Action
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
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
