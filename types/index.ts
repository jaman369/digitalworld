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
