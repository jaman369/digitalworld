import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ScriptInjector from "@/components/layout/ScriptInjector";
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

export const metadata: Metadata = {
  title: "Digital World - Grow your business beyond borders",
  description: "Full-Service Digital Marketing Agency & SEO Expert helping brands worldwide grow organic traffic, leads, and sales.",
};

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
      <head>
        <ScriptInjector />
      </head>
      <body className="text-neutral-900 font-sans min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
