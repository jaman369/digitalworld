"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";

interface DbLead {
  id: string;
  formType: string;
  name: string | null;
  email: string;
  phone: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  ipAddress: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<DbLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeads() {
      try {
        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch (err) {
        console.error("Load leads failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setLeads(
          leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error("Update lead status failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead inquiry?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLeads(leads.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Delete lead failed:", err);
    }
  };

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
                <th className="pb-3 font-semibold">Inquiry & Notes</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
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
                      <span className="text-[9px] text-neutral-300 block font-mono mt-1">IP: {lead.ipAddress}</span>
                    </td>
                    <td className="py-4 max-w-sm">
                      <p className="text-xs text-neutral-600 font-sans leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                      {lead.notes && (
                        <div className="mt-2 p-2 rounded-lg bg-neutral-50 border border-neutral-100 text-[10px] text-neutral-400 font-mono leading-tight whitespace-pre-wrap">
                          {lead.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-4 text-xs text-neutral-400 uppercase font-semibold">
                      {lead.formType}
                    </td>
                    <td className="py-4">
                      <select
                        disabled={updatingId === lead.id}
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`rounded-xl border border-neutral-200 bg-white py-1 px-2.5 text-xs font-semibold outline-none cursor-pointer ${
                          lead.status === "NEW" 
                            ? "text-blue-600 bg-blue-50/30 border-blue-100" 
                            : lead.status === "SPAM" 
                              ? "text-red-500 bg-red-50/30 border-red-100" 
                              : "text-emerald-600 bg-emerald-50/30 border-emerald-100"
                        }`}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="QUALIFIED">Qualified</option>
                        <option value="PROPOSAL_SENT">Proposal Sent</option>
                        <option value="CLOSED">Closed</option>
                        <option value="SPAM">Spam</option>
                      </select>
                    </td>
                    <td className="py-4 text-right text-neutral-400 text-xs">
                      <div className="flex flex-col gap-2 items-end">
                        <span className="font-semibold text-[10px]">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(lead.id)}
                          className="text-[10px] text-neutral-400 hover:text-red-500 font-bold border-0 bg-transparent cursor-pointer p-0"
                        >
                          Delete
                        </button>
                      </div>
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
