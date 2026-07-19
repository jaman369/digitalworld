import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { servicesData } from "../data/services";
import { blogData } from "../data/blog";
import { portfolioData } from "../data/portfolio";

const prisma = new PrismaClient();

async function main() {
  const email = "kj.jaman369@gmail.com";
  const passwordHash = await bcrypt.hash("kj-jaman#^(", 10);

  // 1. Seed Admin User
  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name: "Kamrujjaman Mufti",
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      email,
      name: "Kamrujjaman Mufti",
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("Seeded admin user successfully.");

  // 2. Seed Default Settings
  const settings = [
    { key: "email", value: "kj.jaman369@gmail.com" },
    { key: "phone", value: "+880 1798-667820" },
    { key: "facebookUrl", value: "https://www.facebook.com/digitalworld1988" },
    { key: "linkedinUrl", value: "https://www.linkedin.com/in/kamrujjaman-mufti/" },
  ];

  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }
  console.log("Seeded system settings successfully.");

  // 3. Seed Service Pages from static list
  for (const cat of servicesData) {
    for (const sub of cat.subItems) {
      await prisma.servicePage.upsert({
        where: { slug: sub.slug },
        update: {
          name: sub.name,
          tagline: sub.tagline || "",
          description: sub.description || "",
          benefits: JSON.stringify(sub.benefits || []),
          primaryCtaText: sub.primaryCtaText || "Get Started",
          primaryCtaLink: sub.primaryCtaLink || "/contact",
          secondaryCtaText: sub.secondaryCtaText || "",
          secondaryCtaLink: sub.secondaryCtaLink || "",
        },
        create: {
          slug: sub.slug,
          name: sub.name,
          tagline: sub.tagline || "",
          description: sub.description || "",
          benefits: JSON.stringify(sub.benefits || []),
          primaryCtaText: sub.primaryCtaText || "Get Started",
          primaryCtaLink: sub.primaryCtaLink || "/contact",
          secondaryCtaText: sub.secondaryCtaText || "",
          secondaryCtaLink: sub.secondaryCtaLink || "",
        },
      });
    }
  }
  console.log("Seeded service pages successfully.");

  // 4. Seed Blog categories and posts
  for (const post of blogData) {
    const categorySlug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    const category = await prisma.blogCategory.upsert({
      where: { slug: categorySlug },
      update: { name: post.category },
      create: { name: post.category, slug: categorySlug },
    });

    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.image,
        imageAltText: post.title,
        authorId: admin.id,
        categoryId: category.id,
        publishedAt: new Date(post.publishedAt || Date.now()),
        isDraft: false,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.image,
        imageAltText: post.title,
        authorId: admin.id,
        categoryId: category.id,
        publishedAt: new Date(post.publishedAt || Date.now()),
        isDraft: false,
      },
    });
  }
  console.log("Seeded blogs successfully.");

  // 5. Seed Portfolio projects
  for (const item of portfolioData) {
    const projectSlug = `${item.client.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${item.serviceType.toLowerCase()}`;
    await prisma.portfolioProject.upsert({
      where: { slug: projectSlug },
      update: {
        title: `${item.client} - ${item.serviceType} Project`,
        clientName: item.client,
        industry: item.industry,
        servicesUsed: JSON.stringify(item.tags || []),
        resultsLabel: item.resultStat,
        gallery: JSON.stringify([item.image]),
        caseStudy: item.description,
      },
      create: {
        slug: projectSlug,
        title: `${item.client} - ${item.serviceType} Project`,
        clientName: item.client,
        industry: item.industry,
        servicesUsed: JSON.stringify(item.tags || []),
        resultsLabel: item.resultStat,
        gallery: JSON.stringify([item.image]),
        caseStudy: item.description,
      },
    });
  }
  console.log("Seeded portfolio projects successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
