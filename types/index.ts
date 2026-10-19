export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

export interface Service {
  name: string;
  slug: string;
  description: string;
  benefits?: string[];
  tagline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image?: string;
  imagePath?: string;
  imageAlt?: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  subItems: Service[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  flagPath: string;
  content: string;
  rating: number;
}

export interface PortfolioItem {
  id: string;
  client: string;
  industry: string;
  serviceType: string;
  description: string;
  resultStat: string;
  image: string;
  tags?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Country {
  id: string;
  name: string;
  flagCode: string;
  flagPath: string;
  specialtyTag?: string;
}

export interface Industry {
  id: string;
  name: string;
  iconName: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export interface ServiceCategoryCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  popularTag?: string;
  subItems?: string[];
}

export interface CloudHomepageData {
  heroTagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryCtaText?: string;
  heroPrimaryCtaLink?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaLink?: string;

  statsEyebrow?: string;
  stats?: Array<{ id: string; value: string; label: string }>;

  servicesEyebrow?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  servicesCards?: ServiceCategoryCard[];

  whyUsEyebrow?: string;
  whyUsTitle?: string;
  whyUsSubtitle?: string;
  whyUsCards?: Array<{ title: string; description: string; iconName?: string }>;

  processEyebrow?: string;
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: Array<{ stepNumber: number; title: string; description: string }>;

  testimonialsEyebrow?: string;
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;

  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;

  painPointsEyebrow?: string;
  painPointsTitle?: string;
  painPointsSubtitle?: string;
  painPointsCards?: Array<{ id: string; title: string; description: string; tag: string; iconName?: string }>;

  ecosystemEyebrow?: string;
  ecosystemTitle?: string;
  ecosystemSubtitle?: string;

  metricsEyebrow?: string;
  metricsTitle?: string;

  industriesEyebrow?: string;
  industriesTitle?: string;
  industriesSubtitle?: string;

  toolsEyebrow?: string;
  toolsTitle?: string;
  toolsSubtitle?: string;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface AboutHeroData {
  badge?: string;
  greeting?: string;
  name?: string;
  title?: string;
  bioParagraph1?: string;
  bioParagraph2?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imagePath?: string;
}

export interface AboutMetricItem {
  numericValue: number;
  suffix: string;
  label: string;
}

export interface AboutTimelineItem {
  years: string;
  role: string;
  company: string;
}

export interface AboutJourneyData {
  eyebrow?: string;
  title?: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  timeline?: AboutTimelineItem[];
}

export interface AboutWhyUsCard {
  title: string;
  desc: string;
  badge: string;
}

export interface AboutWhyUsData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards?: AboutWhyUsCard[];
}

export interface AboutExpertiseItem {
  title: string;
  desc: string;
  badge: string;
  link: string;
}

export interface AboutExpertiseData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: AboutExpertiseItem[];
}

export interface AboutProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface AboutProcessData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: AboutProcessStep[];
}

export interface AboutValueCard {
  number: string;
  title: string;
  desc: string;
}

export interface AboutValuesData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards?: AboutValueCard[];
}

export interface AboutToolItem {
  name: string;
  desc: string;
  icon: string;
}

export interface AboutToolsData {
  eyebrow?: string;
  title?: string;
  tools?: AboutToolItem[];
}

export interface AboutCtaData {
  eyebrow?: string;
  title?: string;
  paragraph1?: string;
  paragraph2?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface CloudAboutData {
  // Legacy top-level compatibility
  name?: string;
  title?: string;
  bioParagraph1?: string;
  bioParagraph2?: string;
  imagePath?: string;
  timeline?: AboutTimelineItem[];
  metrics?: AboutMetricItem[];

  // 9 Complete Step-by-Step Sections
  hero?: AboutHeroData;
  metricsList?: AboutMetricItem[];
  journey?: AboutJourneyData;
  whyUs?: AboutWhyUsData;
  expertise?: AboutExpertiseData;
  process?: AboutProcessData;
  values?: AboutValuesData;
  tools?: AboutToolsData;
  cta?: AboutCtaData;
}

