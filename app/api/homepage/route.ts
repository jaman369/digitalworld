import { NextResponse } from "next/server";
import { getCloudData, CloudHomepageData } from "@/lib/cloudSync";

const defaultHomepageData: CloudHomepageData = {
  heroTagline: "FULL-SERVICE DIGITAL MARKETING AGENCY",
  heroTitle: "Rank First. Scale Faster. Own Your Market.",
  heroSubtitle: "We help ambitious brands capture high-intent search traffic, lower acquisition costs, and scale predictable revenue through SEO, PPC, web design, and content marketing.",
  heroPrimaryCtaText: "Book Strategy Call",
  heroPrimaryCtaLink: "/contact",
  heroSecondaryCtaText: "Explore Services",
  heroSecondaryCtaLink: "/services/seo",
  stats: [
    { numericValue: 150, suffix: "+", label: "Projects Delivered" },
    { numericValue: 120, suffix: "+", label: "Happy Clients" },
    { numericValue: 5, suffix: "", label: "Years Experience" },
    { numericValue: 11, suffix: "", label: "Countries Served" }
  ],
  whyChooseUsTitle: "Why global brands trust Digital World.",
  whyChooseUsSubtitle: "We don't sell generic packages. We build custom growth engines designed specifically for your target metrics.",
  testimonialsTitle: "What our clients say.",
  testimonialsSubtitle: "Real feedback from founders, marketing directors, and e-commerce leaders worldwide.",
};

export async function GET() {
  try {
    const cloudData = await getCloudData();
    const hp = cloudData.homepage || {};
    return NextResponse.json({
      ...defaultHomepageData,
      ...hp,
    });
  } catch {
    return NextResponse.json(defaultHomepageData);
  }
}
