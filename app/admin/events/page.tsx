import Link from "next/link";
import { getEvents, deleteEvent } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AdminEventsPage() {
  const events = await getEvents();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    if (id) {
      await deleteEvent(id);
      revalidatePath("/admin/events");
      revalidatePath("/events");
      redirect("/admin/events?success=Event+deleted+successfully");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-display-md text-text-primary mb-2">Events & Summits</h1>
          <p className="text-body-md text-text-secondary">Manage hackathons, workshops, and lectures.</p>
        </div>
        <Link 
          href="/admin/events/new" 
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
                <th className="p-4 text-mono-sm text-text-secondary font-medium">EVENT DETAILS</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium">TYPE</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium">DATE</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium">STATUS</th>
                <th className="p-4 text-mono-sm text-text-secondary font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-border hover:bg-bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <p className="text-body-md text-text-primary font-semibold truncate max-w-[250px]">
                      {event.title}
                    </p>
                    <span className="text-xs text-text-tertiary">{event.location}</span>
                  </td>
                  <td className="p-4 text-body-sm text-text-secondary">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-ibm-blue/10 text-ibm-blue">
                      {event.type}
                    </span>
                  </td>
                  <td className="p-4 text-body-sm text-text-secondary font-mono">
                    {event.date}
                  </td>
                  <td className="p-4 text-body-sm">
                    {event.status === "Registration Open" ? (
                      <span className="text-green-500 font-medium">Open</span>
                    ) : event.status === "Archived" ? (
                      <span className="text-text-tertiary">Archived</span>
                    ) : (
                      <span className="text-amber-500 font-medium">{event.status}</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/events/edit/${event.id}`}
                        className="text-ibm-blue hover:text-blue-600 text-body-sm font-medium px-3 py-1 bg-ibm-blue/10 rounded-md transition-colors"
                      >
                        Edit
                      </Link>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={event.id} />
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
              
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-secondary">
                    No events found. Create one above!
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
