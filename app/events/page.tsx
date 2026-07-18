import { getEvents } from "@/lib/db";
import type { Metadata } from "next";
import { EventCard } from "@/components/event-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events | IEEE OUTR Student Branch",
  description: "Upcoming hackathons, workshops, and past initiatives.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getEvents();
  const upcomingEvents = events.filter(e => e.status !== "Archived");
  const archivedEvents = events.filter(e => e.status === "Archived");
  return (
    <>
      {/* ── HEADER ── */}
      <section className="pt-32 pb-16 px-6 lg:px-10 border-b border-border bg-bg-secondary">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-display-lg text-text-primary mb-4">Events &amp; Summits</h1>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            Where research meets application. Join our hackathons, workshops, and global technical sessions.
          </p>
        </div>
      </section>

      {/* ── UPCOMING EVENTS (IBM Research Table/Card Style) ── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h2 className="text-heading-lg text-text-primary">Upcoming</h2>
            <span className="text-mono-sm text-text-tertiary">{upcomingEvents.length} EVENTS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHIVE (Structured List) ── */}
      <section className="py-24 px-6 lg:px-10 bg-bg-secondary border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 pb-4 border-b border-border">
            <h2 className="text-heading-lg text-text-primary">Research Archive</h2>
          </div>

          <div className="space-y-4">
            {archivedEvents.map((archive) => (
              <Link 
                href={`/events/${archive.id}`} 
                key={archive.id} 
                className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg hover:border-ibm-blue transition-colors cursor-pointer group block"
              >
                <div className="flex items-center gap-4">
                  <span className="text-mono-sm text-text-tertiary w-12">{archive.date?.split(",").pop()?.trim() || "TBA"}</span>
                  <h3 className="text-body-md font-medium text-text-primary group-hover:text-ibm-blue">{archive.title}</h3>
                </div>
                <span className="hidden md:inline-block text-mono-sm text-text-secondary">{archive.type}</span>
              </Link>
            ))}
            {archivedEvents.length === 0 && (
              <p className="text-text-secondary">No archived events found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
