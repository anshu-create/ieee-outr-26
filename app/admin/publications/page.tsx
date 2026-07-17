import Link from "next/link";
import { getPublications, deletePublication } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AdminPublicationsPage() {
  const publications = await getPublications();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    if (id) {
      await deletePublication(id);
      revalidatePath("/admin/publications");
      revalidatePath("/publications");
      redirect("/admin/publications?success=Publication+deleted+successfully");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-display-md text-text-primary mb-2">Publications</h1>
          <p className="text-body-md text-text-secondary">Manage research papers and articles.</p>
        </div>
        <Link 
          href="/admin/publications/new" 
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
                <th className="p-4 text-mono-sm text-text-secondary font-medium">TITLE</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium hidden md:table-cell">AUTHORS</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium">YEAR</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((pub) => (
                <tr key={pub.id} className="border-b border-border hover:bg-bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <p className="text-body-md text-text-primary font-semibold truncate max-w-[300px]">
                      {pub.title}
                    </p>
                    <span className="text-caption text-text-tertiary">{pub.type}</span>
                  </td>
                  <td className="p-4 hidden md:table-cell text-body-sm text-text-secondary">
                    {pub.authors}
                  </td>
                  <td className="p-4 text-body-sm text-text-secondary font-mono">
                    {pub.year}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/publications/edit/${pub.id}`}
                        className="text-ibm-blue hover:text-blue-600 text-body-sm font-medium px-3 py-1 bg-ibm-blue/10 rounded-md transition-colors"
                      >
                        Edit
                      </Link>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={pub.id} />
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
              
              {publications.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-text-secondary">
                    No publications found. Create one above!
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
