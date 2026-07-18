import Link from "next/link";
import { Event } from "@/lib/db";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const cardContent = (
    <div className="group flex flex-col bg-surface border border-border rounded-xl hover:shadow-card hover:border-border-hover hover:-translate-y-1 transition-all h-full overflow-hidden">
      {event.imageUrl && (
        <div className="w-full h-48 bg-bg-secondary relative overflow-hidden border-b border-border shrink-0">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-6">
          <span className="text-mono-sm text-ibm-blue bg-ibm-blue/10 px-2 py-1 rounded">
            {event.type}
          </span>
          {event.status === "Registration Open" ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Open
            </span>
          ) : (
            <span className="text-xs font-semibold text-text-tertiary bg-bg-secondary px-2 py-1 rounded">
              {event.status === "Archived" ? "Archived" : "Soon"}
            </span>
          )}
        </div>

        <div className="mb-4">
          <p className="text-body-sm text-text-secondary mb-1">{event.date}</p>
          <h3 className="text-heading-sm text-text-primary group-hover:text-ibm-blue transition-colors line-clamp-2">
            {event.title}
          </h3>
          {event.speaker && (
            <p className="text-body-sm font-medium text-text-secondary mt-2 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-ibm-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{event.speaker}</span>
            </p>
          )}
        </div>

        <p className="text-body-sm text-text-secondary flex-grow mb-6 line-clamp-4">
          {event.description}
        </p>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <span className="text-body-sm text-text-secondary flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate max-w-[150px]" title={event.location}>{event.location}</span>
          </span>
          <span className="text-ibm-blue font-semibold text-sm group-hover:underline">
            View Details &rarr;
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Link href={`/events/${event.id}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
