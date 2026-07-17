import { ResearchCard } from "@/components/research-card";
import { getSocieties } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Societies | IEEE OUTR Student Branch",
  description: "Explore our technical societies and focus areas.",
};

export const dynamic = "force-dynamic";

export default async function SocietiesPage() {
  const societies = await getSocieties();
  return (
    <>
      {/* ── HEADER ── */}
      <section className="pt-32 pb-16 px-6 lg:px-10 border-b border-border bg-bg-secondary">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-display-lg text-text-primary mb-4">
            Research Societies
          </h1>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            Explore our specialized chapters spanning AI, circuits, signal processing, and
            everything in between. Dive into our technical domains.
          </p>
        </div>
      </section>

      {/* ── SOCIETY CARDS (IBM Grid Style) ── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h2 className="text-heading-lg text-text-primary">Our Domains</h2>
            <span className="text-mono-sm text-text-tertiary">{societies.length} SOCIETIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {societies.map((s) => (
              <ResearchCard
                key={s.abbr}
                category={s.abbr}
                title={s.name}
                description={s.description}
                accentColor={s.accentColor}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
