import * as Icons from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" }
  }).catch(() => []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
            Blog Posts
          </h1>
          <p className="font-sans text-sm text-neutral-500">
            Publish, edit, and organize articles. Add tags, categories, and SEO schemas.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary-hover px-5 py-2.5 font-sans text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] self-start cursor-pointer">
          <Icons.Plus className="h-4 w-4" /> New Article
        </button>
      </div>

      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Title</th>
                <th className="pb-3 font-semibold">Slug</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="border-b border-neutral-100/50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4">
                      <span className="font-bold text-neutral-800 block leading-tight">{post.title}</span>
                    </td>
                    <td className="py-4 text-neutral-500 font-mono text-xs">
                      /blog/{post.slug}
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                        post.isDraft 
                          ? "bg-amber-50 text-amber-600 border-amber-100" 
                          : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}>
                        {post.isDraft ? "Draft" : "Published"}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-xs font-bold text-primary hover:text-primary-hover px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-primary/20 transition-all cursor-pointer">
                        Edit Settings
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-neutral-400 font-medium">
                    No articles found in database. Create your first post.
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
