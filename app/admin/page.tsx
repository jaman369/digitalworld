import Link from "next/link";
import * as Icons from "lucide-react";
import { db } from "@/lib/db";
import { servicesData } from "@/data/services";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Query operational metrics safely
  const [leadsCount, postsCount, portfolioCount, redirectsCount] = await Promise.all([
    db.lead.count().catch(() => 0),
    db.blogPost.count().catch(() => 0),
    db.portfolioProject.count().catch(() => 0),
    db.redirect.count().catch(() => 0),
  ]);

  const servicesCount = servicesData.length;

  const kpis = [
    { name: "Active Leads", value: leadsCount, label: "Total inquiries", icon: Icons.Inbox, color: "text-blue-600 bg-blue-50 border-blue-100", href: "/admin/leads" },
    { name: "Blog Articles", value: postsCount, label: "Published & drafts", icon: Icons.FileText, color: "text-indigo-600 bg-indigo-50 border-indigo-100", href: "/admin/blog" },
    { name: "Portfolio Studies", value: portfolioCount, label: "Client achievements", icon: Icons.Briefcase, color: "text-amber-600 bg-amber-50 border-amber-100", href: "/admin/portfolio" },
    { name: "Service Pages", value: servicesCount, label: "Active categories", icon: Icons.Layers, color: "text-emerald-600 bg-emerald-50 border-emerald-100", href: "/admin/services" },
    { name: "SEO Redirects", value: redirectsCount, label: "Active 301 paths", icon: Icons.Compass, color: "text-purple-600 bg-purple-50 border-purple-100", href: "/admin/settings" },
  ];

  // Fetch recent data in parallel
  const [recentLeads, recentPosts, recentProjects] = await Promise.all([
    db.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }).catch(() => []),
    db.blogPost.findMany({ take: 4, orderBy: { createdAt: "desc" }, include: { category: true } }).catch(() => []),
    db.portfolioProject.findMany({ take: 4, orderBy: { createdAt: "desc" } }).catch(() => []),
  ]);

  return (
    <div className="flex flex-col gap-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none">
              Control Center Overview
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              System Live
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-neutral-500">
            Real-time management dashboard for content, inquiries, case studies, and SEO configurations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
          >
            <Icons.ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
            Live Website ↗
          </Link>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-2xs transition-colors"
          >
            <Icons.Plus className="h-3.5 w-3.5" />
            Add Article
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={idx}
              href={kpi.href}
              className="bg-white border border-neutral-200/80 p-5 rounded-2xl shadow-2xs flex items-center justify-between hover:border-blue-200 hover:shadow-xs transition-all group"
            >
              <div>
                <span className="font-sans text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                  {kpi.name}
                </span>
                <span className="font-serif text-3xl font-bold text-neutral-900 block mb-1 group-hover:text-blue-600 transition-colors">
                  {kpi.value}
                </span>
                <span className="font-sans text-xs text-neutral-400 font-medium">
                  {kpi.label}
                </span>
              </div>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${kpi.color} group-hover:scale-105 transition-transform`}>
                <Icon className="h-6 w-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Split Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Recent Inquiries & Quick CMS Modules */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Recent Contact Inquiries */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-2xs flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h3 className="font-sans font-bold text-base text-neutral-800 flex items-center gap-2">
                <Icons.Inbox className="h-5 w-5 text-blue-600" />
                Recent Contact Inquiries
              </h3>
              <Link
                href="/admin/leads"
                className="font-sans text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                View All Leads →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Contact</th>
                    <th className="pb-3 font-semibold">Message</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.length > 0 ? (
                    recentLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-neutral-100/50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                        <td className="py-3.5">
                          <span className="font-bold text-neutral-800 block leading-tight">{lead.name || "Anonymous"}</span>
                          <span className="text-xs text-neutral-400 block">{lead.email}</span>
                        </td>
                        <td className="py-3.5 max-w-[220px] truncate text-neutral-600">
                          {lead.message || "No message provided."}
                        </td>
                        <td className="py-3.5">
                          <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 border border-blue-100 capitalize">
                            {lead.status.toLowerCase()}
                          </span>
                        </td>
                        <td className="py-3.5 text-right text-neutral-400 text-xs font-medium">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-10 text-center text-neutral-400 font-medium">
                        No contact inquiries received yet. Inquiries from the contact form will appear here live.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Articles & Portfolio Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recent Articles */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h4 className="font-bold text-sm text-neutral-800 flex items-center gap-2">
                  <Icons.FileText className="h-4 w-4 text-indigo-600" />
                  Recent Articles
                </h4>
                <Link href="/admin/blog" className="text-xs font-bold text-blue-600 hover:underline">
                  All Articles →
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/40 hover:bg-neutral-50 transition-colors">
                      <div className="min-w-0 flex-1 pr-2">
                        <Link href={`/admin/blog/edit/${post.id}`} className="text-xs font-bold text-neutral-800 truncate block hover:text-blue-600">
                          {post.title}
                        </Link>
                        <span className="text-[10px] text-neutral-400 block">
                          {post.category?.name || "General"} · {post.isDraft ? "Draft" : "Published"}
                        </span>
                      </div>
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-neutral-200 text-neutral-500 hover:text-blue-600 transition-colors shrink-0"
                      >
                        <Icons.Edit3 className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-400 py-4 text-center">No blog articles created yet.</p>
                )}
              </div>
            </div>

            {/* Recent Portfolio Projects */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h4 className="font-bold text-sm text-neutral-800 flex items-center gap-2">
                  <Icons.Briefcase className="h-4 w-4 text-amber-600" />
                  Portfolio Projects
                </h4>
                <Link href="/admin/portfolio" className="text-xs font-bold text-blue-600 hover:underline">
                  All Case Studies →
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {recentProjects.length > 0 ? (
                  recentProjects.map((proj) => (
                    <div key={proj.id} className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/40 hover:bg-neutral-50 transition-colors">
                      <div className="min-w-0 flex-1 pr-2">
                        <Link href={`/admin/portfolio/edit/${proj.id}`} className="text-xs font-bold text-neutral-800 truncate block hover:text-blue-600">
                          {proj.clientName} ({proj.industry})
                        </Link>
                        <span className="text-[10px] text-emerald-600 font-semibold block">
                          {proj.resultsLabel || "Active Study"}
                        </span>
                      </div>
                      <Link
                        href={`/admin/portfolio/edit/${proj.id}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-neutral-200 text-neutral-500 hover:text-blue-600 transition-colors shrink-0"
                      >
                        <Icons.Edit3 className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-400 py-4 text-center">No portfolio projects created yet.</p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column (4 cols): Quick Operations & Control Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
            <h3 className="font-sans font-bold text-base text-neutral-800 flex items-center gap-2 border-b border-neutral-100 pb-3">
              <Icons.Zap className="h-5 w-5 text-amber-500" />
              Quick Operations
            </h3>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/admin/blog/new"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-blue-50/40 hover:border-blue-200 text-neutral-700 hover:text-blue-600 transition-all text-xs font-bold group"
              >
                <span className="flex items-center gap-2.5">
                  <Icons.PlusCircle className="h-4 w-4 text-blue-600" /> Create Blog Post
                </span>
                <Icons.ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/portfolio/new"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-amber-50/40 hover:border-amber-200 text-neutral-700 hover:text-amber-600 transition-all text-xs font-bold group"
              >
                <span className="flex items-center gap-2.5">
                  <Icons.Briefcase className="h-4 w-4 text-amber-600" /> Add Portfolio Study
                </span>
                <Icons.ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/homepage"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-purple-50/40 hover:border-purple-200 text-neutral-700 hover:text-purple-600 transition-all text-xs font-bold group"
              >
                <span className="flex items-center gap-2.5">
                  <Icons.Layout className="h-4 w-4 text-purple-600" /> Edit Homepage CMS
                </span>
                <Icons.ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/services"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-emerald-50/40 hover:border-emerald-200 text-neutral-700 hover:text-emerald-600 transition-all text-xs font-bold group"
              >
                <span className="flex items-center gap-2.5">
                  <Icons.Layers className="h-4 w-4 text-emerald-600" /> Edit Service Pages
                </span>
                <Icons.ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 transition-all text-xs font-bold group"
              >
                <span className="flex items-center gap-2.5">
                  <Icons.Settings className="h-4 w-4 text-neutral-500" /> Site Settings & Info
                </span>
                <Icons.ChevronRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Help & System Info Card */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Icons.ShieldCheck className="h-4 w-4" /> Agency Control System
            </div>
            <h4 className="font-serif text-lg font-bold text-white">Digital World Admin V2</h4>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              All engine optimization (AEO, GEO, LLMO, VEO, CEO, BEO, MSEO) and content APIs are live and operational.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
