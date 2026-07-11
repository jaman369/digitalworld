import { notFound } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = servicesData.find((c) => c.slug === categorySlug);
  if (!category) return {};

  return {
    title: `${category.title} Services - Digital World`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = servicesData.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const CategoryIcon = (Icons[category.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;

  return (
    <article className="min-h-screen bg-white">
      {/* Category Hero Banner */}
      <section className="relative overflow-hidden bg-neutral-900 py-20 lg:py-28 text-white">
        {/* Background glow overlay */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(0,118,255,0.15)_0%,transparent_60%)]" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-3xl">
            <Link 
              href="/#services" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-white uppercase tracking-wider mb-8 transition-colors"
            >
              <Icons.ArrowLeft className="h-3.5 w-3.5" /> Back to Services
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30">
                <CategoryIcon className="h-6 w-6" />
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
                {category.title}
              </h1>
            </div>
            
            <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Sub-items Anchor List */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-16 lg:gap-20">
            {category.subItems.map((sub, idx) => {
              return (
                <div 
                  key={sub.slug}
                  id={sub.slug}
                  className="scroll-mt-28 group relative rounded-2xl border border-neutral-200 bg-white p-8 lg:p-12 shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    {/* Content Block */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">
                          Service 0{idx + 1}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-neutral-300" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {category.title}
                        </span>
                      </div>
                      
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-neutral-900 mb-4">
                        {sub.name}
                      </h2>
                      
                      <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed mb-6">
                        {sub.description}
                      </p>

                      {/* Benefits bullets list */}
                      {sub.benefits && sub.benefits.length > 0 && (
                        <div className="mb-8">
                          <h4 className="font-sans text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
                            Key Deliverables & Benefits
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {sub.benefits.map((benefit, bidx) => (
                              <li key={bidx} className="flex items-start gap-2.5 text-sm text-neutral-600">
                                <Icons.CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Action Block */}
                    <div className="shrink-0 flex flex-col justify-between h-full md:border-l md:border-neutral-100 md:pl-8">
                      <div className="mb-6 md:mb-0">
                        <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                          Timeline
                        </span>
                        <span className="text-sm font-semibold text-neutral-800">
                          Usually 2-4 weeks
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <Link
                          href={`/contact?service=${sub.slug}`}
                          className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-6 py-3.5 font-sans text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                          Get Started <Icons.ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
