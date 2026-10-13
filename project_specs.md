# Project Specifications: KJ Digital World

## 1. What the App Does and Who Uses It
**Digital World** (led by Kamrujjaman Mufti) is a full-service digital marketing agency web platform catering to international clients across the USA, UK, Canada, UAE, Australia, and beyond.

- **Audience:** Business owners, marketing directors, e-commerce brands, and B2B clients seeking SEO, PPC, Web Development, and Digital Strategy services.
- **Admin Users:** Kamrujjaman and agency team members managing blog posts, portfolio projects, leads, service pages, and site content.

---

## 2. Tech Stack
- **Framework:** Next.js 15 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS, Lucide React, Framer Motion
- **Database & ORM:** PostgreSQL (hosted on Supabase) via Prisma ORM
- **Authentication & Backend Services:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`), JWT-based admin authentication
- **Hosting & Deployments:** Vercel (Production URL: `https://digitalworld-beige.vercel.app/`)
- **Version Control:** GitHub (`https://github.com/jaman369/digitalworld`)

---

## 3. Connected Links & Services
- **Live Production URL:** https://digitalworld-beige.vercel.app/
- **GitHub Repository:** https://github.com/jaman369/digitalworld
- **Vercel Project:** https://vercel.com/kamrujjaman-s-projects1/digitalworld
- **Supabase Dashboard:** https://supabase.com/dashboard/project/aqwnunzrsvedxukthrzu
- **Supabase API URL:** `https://aqwnunzrsvedxukthrzu.supabase.co`

---

## 4. Pages and User Flows
### Public Facing
- **Homepage (`/`):** Hero with interactive orbiting badges, value proposition, service categories, global coverage (11 countries), testimonials, case studies, and call-to-actions.
- **Services (`/services/[slug]`):** Dedicated landing pages for 28+ specialized services across SEO, PPC, Web Dev, and Content Marketing with structured FAQs and schema markup.
- **Portfolio (`/portfolio`):** Filterable case studies and success metrics.
- **About (`/about`):** Agency story, founder timeline (Kamrujjaman Mufti), core values, and milestones.
- **Blog (`/blog`, `/blog/[slug]`):** AEO, GEO, and LLMO-optimized content articles with author bios, related posts, and newsletter signups.
- **Contact (`/contact`):** Interactive inquiry form, direct WhatsApp/email channels, pricing consultation.

### Authenticated Admin
- **Admin Dashboard (`/admin`):** Content management system for editing homepage, about page, blog articles, service pages, portfolio items, and reviewing customer leads.

---

## 5. Data Models (Prisma / Supabase Postgres)
- `User`: Admin and writer accounts with hashed credentials and roles.
- `BlogPost`, `BlogCategory`, `BlogTag`: Full CMS with search engine & AI optimization metadata.
- `ServicePage`: Dynamic service catalog with pricing, benefits, and FAQ schemas.
- `PortfolioProject`: Client case studies and measurable results.
- `Lead`: Inbound contact and quote requests.
- `HomepageContent` & `AboutContent`: Dynamic page copy and layout configuration.
- `AuditLog` & `SystemSetting`: Operational logging and site configuration.

---

## 6. What "Done" Looks Like for Current Task
1. Repository cloned, connected to `origin/main` on GitHub, and configured on this computer.
2. Git added to system PATH for push/pull.
3. `.env.local` created with Supabase keys and configuration.
4. Node dependencies installed (`npm install`) and Prisma client generated.
5. Local development server verified running cleanly on `http://localhost:3000`.
6. Ready for full editing and development directly from Antigravity.
