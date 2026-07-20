import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ScriptInjector from "@/components/layout/ScriptInjector";
import { getScriptSettings } from "@/lib/codeSnippets";
import "./globals.css";

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getScriptSettings().catch(() => null);

  let googleVerification: string | undefined = undefined;
  if (settings?.googleSiteVerification) {
    const raw = settings.googleSiteVerification;
    if (raw.includes("content=")) {
      const match = raw.match(/content=["']([^"']+)["']/i);
      googleVerification = match ? match[1] : raw;
    } else {
      googleVerification = raw.replace(/<[^>]*>/g, "").trim();
    }
  }

  return {
    title: "Digital World - Grow your business beyond borders",
    description: "Full-Service Digital Marketing Agency & SEO Expert helping brands worldwide grow organic traffic, leads, and sales.",
    verification: googleVerification
      ? {
          google: googleVerification,
        }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} antialiased`}
    >
      <body className="text-neutral-900 font-sans min-h-screen flex flex-col">
        <ScriptInjector />
        {children}
      </body>
    </html>
  );
}
