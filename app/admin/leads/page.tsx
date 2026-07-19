import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" }
  }).catch(() => []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
          Leads & Inquiries
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Monitor incoming submissions, contact entries, and status details.
        </p>
      </div>

      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Contact Info</th>
                <th className="pb-3 font-semibold">Message Submission</th>
                <th className="pb-3 font-semibold">Inquiry Type</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-neutral-100/50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4">
                      <span className="font-bold text-neutral-800 block leading-tight">{lead.name || "Anonymous"}</span>
                      <span className="text-xs text-neutral-400 block">{lead.email}</span>
                      {lead.phone && <span className="text-[10px] text-neutral-400 block">{lead.phone}</span>}
                    </td>
                    <td className="py-4 max-w-[280px] text-neutral-500">
                      {lead.message || "No content."}
                    </td>
                    <td className="py-4 text-xs text-neutral-400 uppercase font-semibold">
                      {lead.formType}
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
                  <td colSpan={5} className="py-12 text-center text-neutral-400 font-medium">
                    No leads or inquiries collected in database yet.
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
