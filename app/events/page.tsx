import { getEvents } from "@/lib/db";
import type { Metadata } from "next";
import { EventsClient } from "@/components/events-client";

export const metadata: Metadata = {
  title: "Events | IEEE OUTR Student Branch",
  description: "Upcoming hackathons, workshops, and past initiatives.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getEvents();
  
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

      {/* ── CLIENT EVENTS LIST WITH FILTERS ── */}
      <EventsClient events={events} />
    </>
  );
}
