import type { Metadata } from "next";
import { getPublications } from "@/lib/db";

export const metadata: Metadata = {
  title: "Publications | IEEE OUTR Student Branch",
  description: "Browse our latest research papers, journals, and conference publications.",
};

// Next.js config to ensure page is dynamically rendered when DB changes locally
export const dynamic = "force-dynamic";

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <>
      {/* ── HEADER ── */}
      <section className="pt-32 pb-16 px-6 lg:px-10 border-b border-border bg-bg-secondary">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-display-lg text-text-primary mb-4">Publications</h1>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            Browse the latest peer-reviewed research papers, journals, and conference 
            proceedings authored by the IEEE OUTR student and faculty community.
          </p>
        </div>
      </section>

      {/* ── PUBLICATIONS LIST (IBM Research Style) ── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto space-y-8">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h2 className="text-heading-lg text-text-primary">Featured Research</h2>
            <span className="text-mono-sm text-text-tertiary">{publications.length} PAPERS</span>
          </div>

          {publications.map((pub) => (
            <div 
              key={pub.id} 
              className="bg-surface border border-border rounded-xl p-8 pt-10 hover:shadow-card hover:border-border-hover transition-all relative overflow-hidden group"
            >
              {/* Top Accent Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transition-transform origin-left scale-x-0 group-hover:scale-x-100 duration-300 ease-out"
                style={{ backgroundColor: pub.color }}
              />

              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Content Side */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <span className="text-mono-sm uppercase tracking-wider" style={{ color: pub.color }}>
                      {pub.type}
                    </span>
                    <span className="hidden md:block text-border">•</span>
                    <span className="text-body-sm text-text-tertiary">
                      {pub.venue}
                    </span>
                    <span className="hidden md:block text-border">•</span>
                    <span className="text-body-sm text-text-tertiary font-mono">
                      {pub.year}
                    </span>
                  </div>

                  <h3 className="text-heading-md text-text-primary mb-3">
                    {pub.title}
                  </h3>
                  
                  <p className="text-body-sm text-text-primary font-medium mb-4">
                    Authors: <span className="text-text-secondary font-normal">{pub.authors}</span>
                  </p>

                  <p className="text-body-md text-text-secondary mb-6 leading-relaxed">
                    {pub.abstract}
                  </p>

                  <a 
                    href={pub.link} 
                    className="inline-flex items-center text-body-sm font-semibold transition-colors"
                    style={{ color: pub.color }}
                  >
                    Read Paper 
                    <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                {/* Optional Image Side */}
                {pub.imageUrl && (
                  <div className="w-full lg:w-[300px] shrink-0 rounded-lg overflow-hidden border border-border">
                    <img 
                      src={pub.imageUrl} 
                      alt={pub.title}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {publications.length === 0 && (
            <p className="text-text-secondary">No publications found.</p>
          )}

        </div>
      </section>
    </>
  );
}
