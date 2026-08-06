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

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface CloudAboutData {
  name?: string;
  title?: string;
  bioParagraph1?: string;
  bioParagraph2?: string;
  imagePath?: string;
  timeline?: Array<{ years: string; role: string; company: string }>;
  metrics?: Array<{ numericValue: number; suffix: string; label: string }>;
}
