import Link from "next/link";
import { getPublications } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditPublicationForm } from "./EditPublicationForm";

export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const publications = await getPublications();
  const publication = publications.find(p => p.id === parseInt(id));

  if (!publication) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/publications" className="text-text-tertiary hover:text-text-primary transition-colors">
          ← Back
        </Link>
        <h1 className="text-heading-lg text-text-primary">Edit Publication</h1>
      </div>

      <EditPublicationForm publication={publication} />
    </div>
  );
}
