import React from "react";
import { getPublications, getEvents, getSocieties } from "@/lib/db";

export default async function AdminOverviewPage() {
  const [pubs, events, societies] = await Promise.all([
    getPublications(),
    getEvents(),
    getSocieties(),
  ]);

  return (
    <div>
      <h1 className="text-display-md text-text-primary mb-2">Welcome, Admin</h1>
      <p className="text-body-lg text-text-secondary mb-10">
        Manage the content of the IEEE OUTR Student Branch website.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-heading-sm text-text-secondary mb-2">Total Publications</h3>
          <p className="text-display-lg text-ibm-blue">{pubs.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-heading-sm text-text-secondary mb-2">Total Events</h3>
          <p className="text-display-lg text-ibm-purple">{events.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-heading-sm text-text-secondary mb-2">Active Societies</h3>
          <p className="text-display-lg text-ibm-teal">{societies.length}</p>
        </div>
      </div>
    </div>
  );
}
