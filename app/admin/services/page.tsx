"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

interface DbService {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  benefits: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string | null;
  secondaryCtaLink: string | null;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<DbService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/admin/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (err) {
        console.error("Fetch services failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
          Service Management
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Manage your website&apos;s service offerings, copy blocks, benefits checklist, and CTA configurations.
        </p>
      </div>

      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Service Name</th>
                <th className="pb-3 font-semibold">Slug / Anchor</th>
                <th className="pb-3 font-semibold">Tagline</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id} className="border-b border-neutral-100/50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4">
                    <span className="font-bold text-neutral-800 block leading-tight">{svc.name}</span>
                    <span className="text-xs text-neutral-400 block max-w-md truncate">{svc.description}</span>
                  </td>
                  <td className="py-4 text-neutral-500 font-mono text-xs">
                    #{svc.slug}
                  </td>
                  <td className="py-4 text-neutral-500 text-xs max-w-xs truncate">
                    {svc.tagline}
                  </td>
                  <td className="py-4 text-right">
                    <Link
                      href={`/admin/services/edit/${svc.slug}`}
                      className="inline-flex text-xs font-bold text-primary hover:text-primary-hover px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-primary/20 transition-all"
                    >
                      Edit Copy Block
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
