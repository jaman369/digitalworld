import { db } from "@/lib/db";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const defaultFaqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How long does it take to see organic rankings results?",
    answer: "SEO is a compounding growth engine. Most campaigns see ranking progression and organic leads increases within 90 days, with exponential trajectory building around months 4 to 6.",
    category: "SEO & Traffic"
  },
  {
    id: "faq-2",
    question: "What is your typical onboarding process?",
    answer: "We start with a 30-minute discovery call, followed by a detailed site audit and custom campaign blueprint. Once approved, we launch execution targets with weekly updates.",
    category: "Onboarding"
  },
  {
    id: "faq-3",
    question: "Do you offer custom package deals?",
    answer: "Yes. Every client receives a custom project proposal tailored directly to their industry, tech stack, and monthly growth target budgets.",
    category: "Pricing & Plans"
  },
  {
    id: "faq-4",
    question: "Where are you based and how do we communicate?",
    answer: "We are based in Dhaka, Bangladesh. We communicate via private Slack boards, weekly email summaries, and direct Zoom strategy alignments.",
    category: "Communication"
  }
];

export async function getFaqs(): Promise<FAQItem[]> {
  try {
    const setting = await db.systemSetting.findUnique({
      where: { key: "globalFaqs" }
    });

    if (setting && setting.value) {
      const parsed = JSON.parse(setting.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    return defaultFaqs;
  } catch {
    return defaultFaqs;
  }
}
