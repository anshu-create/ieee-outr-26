import { getEventById, getEvents } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const event = await getEventById(parseInt(resolvedParams.id));
  if (!event) return { title: "Event Not Found" };
  return {
    title: `${event.title} | IEEE OUTR`,
    description: event.description.substring(0, 160),
  };
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ id: e.id.toString() }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = await getEventById(parseInt(resolvedParams.id));
  
  if (!event) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 px-6 lg:px-10 min-h-screen bg-bg-secondary">
      <div className="max-w-4xl mx-auto">
        <Link href="/events" className="inline-flex items-center text-ibm-blue hover:underline mb-8 text-sm font-medium transition-all hover:-translate-x-1">
          &larr; Back to Events
        </Link>
        
        <div className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-border">
          {event.imageUrl && (
            <div className="w-full relative bg-bg-primary flex justify-center py-6 border-b border-border">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="max-w-full max-h-[500px] object-contain" 
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-mono-sm font-semibold text-ibm-blue bg-ibm-blue/10 px-3 py-1.5 rounded-md tracking-wider uppercase">
                {event.type}
              </span>
              <span className={`text-mono-sm font-semibold px-3 py-1.5 rounded-md tracking-wider uppercase ${
                event.status === "Registration Open" ? "text-green-500 bg-green-500/10" : 
                event.status === "Archived" ? "text-text-tertiary bg-bg-secondary" : 
                "text-yellow-500 bg-yellow-500/10"
              }`}>
                {event.status === "Registration Open" ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Open
                  </span>
                ) : event.status}
              </span>
            </div>

            <h1 className="text-display-md text-text-primary mb-6 leading-tight">{event.title}</h1>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 py-6 border-y border-border">
              {event.date && (
                <div className="flex items-center gap-2.5 text-text-secondary">
                  <svg className="w-5 h-5 text-ibm-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-body-md">{event.date}</span>
                </div>
              )}
              {event.time && (
                <div className="flex items-center gap-2.5 text-text-secondary">
                  <svg className="w-5 h-5 text-ibm-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-body-md">{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-text-secondary">
                <svg className="w-5 h-5 text-ibm-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-body-md">{event.location}</span>
              </div>
              {event.speaker && (
                <div className="flex items-center gap-2.5 text-text-secondary">
                  <svg className="w-5 h-5 text-ibm-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-body-md font-medium">{event.speaker}</span>
                </div>
              )}
            </div>

            <div className="prose prose-invert max-w-none text-text-secondary text-body-lg mb-12 whitespace-pre-line leading-relaxed">
              {event.description}
            </div>

            {event.link && (
              <div className="pt-8 border-t border-border flex justify-center sm:justify-start">
                <a 
                  href={event.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-3.5 bg-ibm-blue hover:bg-ibm-blue-hover text-white rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  {event.status === "Registration Open" ? "Register Now" : "Event Link"}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
