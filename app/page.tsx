import { AnimatedStat } from "@/components/animated-stat";
import { ResearchCard } from "@/components/research-card";
import { EventCard } from "@/components/event-card";
import { HomeHero } from "@/components/home-hero";
import Link from "next/link";
import { getPublications, getEvents } from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

async function getMediaFiles() {
  try {
    const mediaDir = path.join(process.cwd(), "assets", "media");
    await fs.mkdir(mediaDir, { recursive: true });
    const files = await fs.readdir(mediaDir);
    return files.filter(file => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file));
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const publications = await getPublications();
  
  // Get top events: ongoing/upcoming prioritized, limit to 4
  const events = await getEvents();
  const upcomingOngoing = events.filter(e => e.status !== "Archived");
  const archived = events.filter(e => e.status === "Archived");
  const topEvents = [...upcomingOngoing, ...archived].slice(0, 4);

  // Get media files
  const mediaFiles = await getMediaFiles();
  const topMedia = mediaFiles.slice(0, 6); // show up to 6 media on home page

  return (
    <>
      <HomeHero />

      {/* ── SECTION 2: ANIMATED STATS (IBM STYLE) ── */}
      <section className="px-6 lg:px-10 border-t border-border bg-bg-primary">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border border-b border-x border-border">
          <div className="py-12 px-8 flex flex-col justify-center bg-surface">
            <AnimatedStat value={14} label="Technical Societies" />
          </div>
          <div className="py-12 px-8 flex flex-col justify-center bg-surface">
            <AnimatedStat value={250} suffix="+" label="Active Members" />
          </div>
          <div className="py-12 px-8 flex flex-col justify-center bg-surface">
            <AnimatedStat value={50} suffix="+" label="Annual Events" />
          </div>
          <div className="py-12 px-8 flex flex-col justify-center bg-surface">
            <AnimatedStat value={3} suffix="M+" label="Lines of Code" />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: LATEST PUBLICATIONS ── */}
      <section className="py-24 px-6 lg:px-10 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-border pb-8">
            <div>
              <h2 className="text-display-lg text-text-primary mb-2 font-bold tracking-tight">
                Latest Publications
              </h2>
              <p className="text-body-lg text-text-secondary max-w-2xl font-sans">
                Explore recent peer-reviewed articles, whitepapers, and findings from our student researchers across emerging domains.
              </p>
            </div>
            <Link href="/publications" className="text-ibm-blue font-semibold hover:text-ibm-blue-hover transition-colors whitespace-nowrap mb-2 flex items-center group">
              View all publications 
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-l border-border">
            {publications.slice(0, 4).map((pub, index) => {
              const isFeatured = index === 0;
              const spanClass = isFeatured ? 'lg:col-span-8' : (index === 1 ? 'lg:col-span-4' : 'lg:col-span-6');
              
              return (
                <div key={pub.id} className={`${spanClass} border-b border-r border-border flex`}>
                  <ResearchCard
                    category={pub.type}
                    title={pub.title}
                    description={pub.abstract}
                    href={pub.link || "#"}
                    image={pub.imageUrl}
                    accentColor={pub.color}
                    featured={isFeatured}
                  />
                </div>
              );
            })}
            
            {publications.length === 0 && (
              <div className="lg:col-span-12 p-8 border-b border-r border-border">
                <p className="text-text-secondary">No publications found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TOP EVENTS ── */}
      <section className="py-24 px-6 lg:px-10 bg-bg-secondary border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-border pb-8">
            <div>
              <h2 className="text-display-lg text-text-primary mb-2 font-bold tracking-tight">
                Upcoming & Ongoing Events
              </h2>
              <p className="text-body-lg text-text-secondary max-w-2xl font-sans">
                Join our workshops, hackathons, and global technical sessions.
              </p>
            </div>
            <Link href="/events" className="text-ibm-blue font-semibold hover:text-ibm-blue-hover transition-colors whitespace-nowrap mb-2 flex items-center group">
              View all events 
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {topEvents.length === 0 && (
              <p className="text-text-secondary col-span-full">No events found.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MEDIA GALLERY ── */}
      <section className="py-24 px-6 lg:px-10 bg-bg-primary border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-border pb-8">
            <div>
              <h2 className="text-display-lg text-text-primary mb-2 font-bold tracking-tight">
                Media Gallery
              </h2>
              <p className="text-body-lg text-text-secondary max-w-2xl font-sans">
                Glimpses from our recent events, workshops, and community gatherings.
              </p>
            </div>
            <Link href="/media" className="text-ibm-blue font-semibold hover:text-ibm-blue-hover transition-colors whitespace-nowrap mb-2 flex items-center group">
              View full gallery 
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMedia.map((filename) => (
              <div key={filename} className="relative aspect-video rounded-xl overflow-hidden border border-border group bg-bg-secondary">
                <img 
                  src={`/api/media/${filename}`}
                  alt={filename}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
            {topMedia.length === 0 && (
              <p className="text-text-secondary col-span-full">No media found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
