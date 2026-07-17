import Link from "next/link";
import { getSocieties, deleteSociety } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AdminSocietiesPage() {
  const societies = await getSocieties();

  async function handleDelete(formData: FormData) {
    "use server";
    const abbr = formData.get("abbr") as string;
    if (abbr) {
      await deleteSociety(abbr);
      revalidatePath("/admin/societies");
      revalidatePath("/societies");
      redirect("/admin/societies?success=Society+deleted+successfully");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-display-md text-text-primary mb-2">Technical Societies</h1>
          <p className="text-body-md text-text-secondary">Manage IEEE technical chapters and domains.</p>
        </div>
        <Link 
          href="/admin/societies/new" 
          className="bg-ibm-blue text-white px-5 py-2.5 rounded-md text-button-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          + Add New
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-secondary border-b border-border">
                <th className="p-4 text-mono-sm text-text-secondary font-medium">SOCIETY NAME</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium">ABBREVIATION</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium">ACCENT COLOR</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {societies.map((soc) => (
                <tr key={soc.abbr} className="border-b border-border hover:bg-bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <p className="text-body-md text-text-primary font-semibold">
                      {soc.name}
                    </p>
                    <p className="text-body-sm text-text-secondary line-clamp-1 max-w-[400px]">
                      {soc.description}
                    </p>
                  </td>
                  <td className="p-4 text-body-sm text-text-secondary font-mono font-bold">
                    {soc.abbr}
                  </td>
                  <td className="p-4 text-body-sm">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-black/10" 
                        style={{ backgroundColor: soc.accentColor }} 
                      />
                      <span className="font-mono text-xs text-text-tertiary">{soc.accentColor}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/societies/edit/${soc.abbr}`}
                        className="text-ibm-blue hover:text-blue-600 text-body-sm font-medium px-3 py-1 bg-ibm-blue/10 rounded-md transition-colors"
                      >
                        Edit
                      </Link>
                      <form action={handleDelete}>
                        <input type="hidden" name="abbr" value={soc.abbr} />
                        <button 
                          type="submit"
                          className="text-red-500 hover:text-red-600 text-body-sm font-medium px-3 py-1 bg-red-500/10 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              
              {societies.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-text-secondary">
                    No societies found. Create one above!
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
