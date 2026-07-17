import Link from "next/link";
import { getEvents } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditEventForm } from "./EditEventForm";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const events = await getEvents();
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/admin/events" className="text-body-sm text-ibm-blue hover:underline mb-2 block">
          ← Back to Events
        </Link>
        <h1 className="text-display-md text-text-primary">Edit Event</h1>
      </div>

      <EditEventForm event={event} />
    </div>
  );
}
