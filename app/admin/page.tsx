import Link from "next/link";
import * as Icons from "lucide-react";
import { db } from "@/lib/db";
import { servicesData } from "@/data/services";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Query data counts safely
  const [leadsCount, postsCount, redirectsCount] = await Promise.all([
    db.lead.count().catch(() => 0),
    db.blogPost.count().catch(() => 0),
    db.redirect.count().catch(() => 0),
  ]);

  const servicesCount = servicesData.length;

  const kpis = [
    { name: "Active Leads", value: leadsCount, label: "Total inquiries", icon: Icons.Inbox, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { name: "Blog Posts", value: postsCount, label: "Published articles", icon: Icons.FileText, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { name: "Service Pages", value: servicesCount, label: "Active categories", icon: Icons.Layers, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { name: "SEO Redirects", value: redirectsCount, label: "Active paths", icon: Icons.Compass, color: "text-amber-600 bg-amber-50 border-amber-100" },
  ];

  // Fetch recent leads
  const recentLeads = await db.lead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
          Dashboard Overview
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Welcome back to the Control Center. Here is your website’s operational metrics report.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex items-center justify-between"
            >
              <div>
                <span className="font-sans text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                  {kpi.name}
                </span>
                <span className="font-serif text-3xl font-bold text-neutral-900 block mb-1">
                  {kpi.value}
                </span>
                <span className="font-sans text-xs text-neutral-400 font-medium">
                  {kpi.label}
                </span>
              </div>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${kpi.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Section split row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inquiries List (8/12) */}
        <div className="lg:col-span-8 bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <h3 className="font-sans font-bold text-base text-neutral-800 flex items-center gap-2">
              <Icons.Inbox className="h-5 w-5 text-neutral-400" />
              Recent Contact Inquiries
            </h3>
            <Link
              href="/admin/leads"
              className="font-sans text-xs font-bold text-primary hover:text-primary-hover transition-colors"
            >
              View All Leads →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
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
                      <td className="py-4">
                        <span className="font-bold text-neutral-800 block leading-tight">{lead.name || "Anonymous"}</span>
                        <span className="text-xs text-neutral-400 block">{lead.email}</span>
                      </td>
                      <td className="py-4 max-w-[240px] truncate text-neutral-500">
                        {lead.message || "No message content."}
                      </td>
                      <td className="py-4">
                        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 border border-blue-100 capitalize">
                          {lead.status.toLowerCase()}
                        </span>
                      </td>
                      <td className="py-4 text-right text-neutral-400 text-xs font-medium">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-neutral-400 font-medium">
                      No inquiries received yet. Setup contact forms to begin collecting leads.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Operations panel (4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-4">
            <h3 className="font-sans font-bold text-base text-neutral-800 flex items-center gap-2 border-b border-neutral-100 pb-4">
              <Icons.Zap className="h-5 w-5 text-neutral-400" />
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/admin/services"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-neutral-200 hover:border-primary/20 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 transition-all font-sans text-xs font-bold"
              >
                <Icons.Layers className="h-4 w-4" /> Edit Services Pages
              </Link>
              <Link
                href="/admin/blog"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-neutral-200 hover:border-primary/20 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 transition-all font-sans text-xs font-bold"
              >
                <Icons.Plus className="h-4 w-4" /> Create New Blog Post
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-neutral-200 hover:border-primary/20 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 transition-all font-sans text-xs font-bold"
              >
                <Icons.Settings className="h-4 w-4" /> Update Contact Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
