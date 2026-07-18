"use client";

import { useState, useMemo } from "react";
import { EventCard } from "./event-card";
import { Event } from "@/lib/db";

interface EventsClientProps {
  events: Event[];
}

export function EventsClient({ events }: EventsClientProps) {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const statuses = ["All", ...Array.from(new Set(events.map(e => e.status)))];
  const types = ["All", ...Array.from(new Set(events.map(e => e.type)))];

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchStatus = statusFilter === "All" || e.status === statusFilter;
      const matchType = typeFilter === "All" || e.type === typeFilter;
      return matchStatus && matchType;
    });
  }, [events, statusFilter, typeFilter]);

  return (
    <section className="py-24 px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 pb-6 border-b border-border">
          <div className="flex-1">
            <h2 className="text-heading-lg text-text-primary mb-4">All Events</h2>
            <p className="text-body-md text-text-secondary">
              Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="text-mono-sm text-text-tertiary uppercase font-medium">Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue text-sm min-w-[160px]"
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="text-mono-sm text-text-tertiary uppercase font-medium">Event Type</label>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue text-sm min-w-[160px]"
              >
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-body-lg text-text-secondary">No events found matching your filters.</p>
            <button 
              onClick={() => { setStatusFilter("All"); setTypeFilter("All"); }}
              className="mt-4 text-ibm-blue font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
