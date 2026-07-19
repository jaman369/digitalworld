-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServicePage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL DEFAULT 'SEO',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "primaryCtaText" TEXT NOT NULL,
    "primaryCtaLink" TEXT NOT NULL,
    "secondaryCtaText" TEXT,
    "secondaryCtaLink" TEXT,
    "imagePath" TEXT,
    "imageAlt" TEXT,
    "pricingPlan" TEXT,
    "faqItems" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "schemaSettings" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ServicePage" ("benefits", "createdAt", "description", "faqItems", "id", "imagePath", "name", "pricingPlan", "primaryCtaLink", "primaryCtaText", "schemaSettings", "secondaryCtaLink", "secondaryCtaText", "seoDescription", "seoTitle", "slug", "tagline", "updatedAt") SELECT "benefits", "createdAt", "description", "faqItems", "id", "imagePath", "name", "pricingPlan", "primaryCtaLink", "primaryCtaText", "schemaSettings", "secondaryCtaLink", "secondaryCtaText", "seoDescription", "seoTitle", "slug", "tagline", "updatedAt" FROM "ServicePage";
DROP TABLE "ServicePage";
ALTER TABLE "new_ServicePage" RENAME TO "ServicePage";
CREATE UNIQUE INDEX "ServicePage_name_key" ON "ServicePage"("name");
CREATE UNIQUE INDEX "ServicePage_slug_key" ON "ServicePage"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
