import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CursorLight from "@/components/CursorLight";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital World — Full-Service Digital Marketing Agency",
  description:
    "Digital World is a full-service digital marketing agency specializing in SEO, PPC, web design, and content marketing to drive your business growth.",
  openGraph: {
    type: "website",
    title: "Digital World — Full-Service Digital Marketing Agency",
    description:
      "Digital World is a full-service digital marketing agency specializing in SEO, PPC, web design, and content marketing to drive your business growth.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body className="font-[var(--font-body)] bg-black text-[#1d1d1f] overflow-x-hidden">
        <CursorLight />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScrollToTop />
        <ScrollReveal />
      </body>
    </html>
  );
}
