import { servicesData } from "@/data/services";

export default function AdminServicesPage() {
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
                <th className="pb-3 font-semibold">Slug Path</th>
                <th className="pb-3 font-semibold">Sub-services Count</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {servicesData.map((category) => (
                <tr key={category.id} className="border-b border-neutral-100/50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4">
                    <span className="font-bold text-neutral-800 block leading-tight">{category.title}</span>
                    <span className="text-xs text-neutral-400 block">{category.description}</span>
                  </td>
                  <td className="py-4 text-neutral-500 font-mono text-xs">
                    /services/{category.slug}
                  </td>
                  <td className="py-4 text-neutral-500 font-medium">
                    {category.subItems.length} items
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-xs font-bold text-primary hover:text-primary-hover px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-primary/20 transition-all cursor-pointer">
                      Edit Copy Block
                    </button>
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
