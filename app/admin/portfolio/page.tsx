import * as Icons from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const projects = await db.portfolioProject.findMany({
    orderBy: { createdAt: "desc" }
  }).catch(() => []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
            Portfolio Projects
          </h1>
          <p className="font-sans text-sm text-neutral-500">
            Publish client case studies, result summaries, galleries, and related schemas.
          </p>
        </div>
        <Link 
          href="/admin/portfolio/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary-hover px-5 py-2.5 font-sans text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] self-start"
        >
          <Icons.Plus className="h-4 w-4" /> Add Project
        </Link>
      </div>

      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Client Project</th>
                <th className="pb-3 font-semibold">Slug</th>
                <th className="pb-3 font-semibold">Results Achieved</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id} className="border-b border-neutral-100/50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4">
                      <span className="font-bold text-neutral-800 block leading-tight">{project.title}</span>
                      <span className="text-xs text-neutral-400 block">{project.clientName} · {project.industry}</span>
                    </td>
                    <td className="py-4 text-neutral-500 font-mono text-xs">
                      /portfolio/{project.slug}
                    </td>
                    <td className="py-4 text-emerald-600 font-semibold text-xs">
                      {project.resultsLabel}
                    </td>
                    <td className="py-4 text-right">
                      <Link 
                        href={`/admin/portfolio/edit/${project.id}`}
                        className="text-xs font-bold text-primary hover:text-primary-hover px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-primary/20 transition-all"
                      >
                        Edit Study
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-neutral-400 font-medium">
                    No case studies found in database. Add client work to showcase.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
