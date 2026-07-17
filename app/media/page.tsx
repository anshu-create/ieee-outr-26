import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Media Gallery | IEEE OUTR Student Branch",
  description: "Glimpses from our recent events, workshops, and community gatherings.",
};

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

export default async function MediaPage() {
  const mediaFiles = await getMediaFiles();

  return (
    <>
      {/* ── HEADER ── */}
      <section className="pt-32 pb-16 px-6 lg:px-10 border-b border-border bg-bg-secondary">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-display-lg text-text-primary mb-4">Media Gallery</h1>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            A visual journey through our hackathons, workshops, and community events.
          </p>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h2 className="text-heading-lg text-text-primary">All Images</h2>
            <span className="text-mono-sm text-text-tertiary">{mediaFiles.length} ITEMS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaFiles.map((filename) => (
              <div 
                key={filename} 
                className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-bg-secondary shadow-sm hover:shadow-md transition-all"
              >
                <img 
                  src={`/api/media/${filename}`}
                  alt={filename}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
            
            {mediaFiles.length === 0 && (
              <p className="text-text-secondary col-span-full">No media found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
