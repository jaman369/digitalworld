import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Marketing Insights - Digital World",
  description: "Read technical audits and growth articles covering Local SEO, PPC ads optimization, and Next.js speed configurations.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
