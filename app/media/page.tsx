import type { Metadata } from "next";
import { v2 as cloudinary } from "cloudinary";

export const metadata: Metadata = {
  title: "Media Gallery | IEEE OUTR Student Branch",
  description: "Glimpses from our recent events, workshops, and community gatherings.",
};

export const dynamic = "force-dynamic";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getMediaFiles() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "media-",
      max_results: 100,
    });
    return result.resources.map((res: any) => ({
      filename: res.public_id,
      url: res.secure_url,
    }));
  } catch (error) {
    console.error("Error fetching media from Cloudinary:", error);
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
            {mediaFiles.map((file: { filename: string; url: string }) => (
              <div 
                key={file.filename} 
                className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-bg-secondary shadow-sm hover:shadow-md transition-all"
              >
                <img 
                  src={file.url}
                  alt={file.filename}
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
