import * as Icons from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
          Global Settings
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Configure general configurations, API keys, brand options, and local contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
          <h3 className="font-sans font-bold text-base text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
            <Icons.Globe className="h-5 w-5 text-neutral-400" />
            General Branding Details
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Website Title</label>
              <input type="text" readOnly value="Digital World" className="rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-sm outline-none text-neutral-500" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Primary Phone</label>
              <input type="text" readOnly value="+880 1798-667820" className="rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-sm outline-none text-neutral-500" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Email</label>
              <input type="text" readOnly value="kj.jaman369@gmail.com" className="rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-sm outline-none text-neutral-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
          <h3 className="font-sans font-bold text-base text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
            <Icons.Key className="h-5 w-5 text-neutral-400" />
            System Credentials
          </h3>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-blue-50/50 border border-blue-100/50 p-4 text-xs text-neutral-600 leading-relaxed">
              <p className="font-bold text-neutral-800 mb-1">Seeded Admin User:</p>
              <p>Email: <span className="font-mono font-bold text-primary">admin@digitalworld.com</span></p>
              <p>Password: <span className="font-mono font-bold text-primary">admin-digital-world</span></p>
              <p className="mt-2 text-[10px] text-neutral-400 font-medium">Use these details to access the Control Center locally or on production.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
