"use client";

import Link from "next/link";
import { useState } from "react";
import { createPublicationAction } from "../actions";

export default function NewPublicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    let uploadedImageUrl = "";

    // If an image was selected, upload it first
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const data = await res.json();
        if (data.url) {
          uploadedImageUrl = data.url;
        }
      } catch (err) {
        console.error("Image upload failed", err);
        alert("Failed to upload image.");
        setIsSubmitting(false);
        return;
      }
    }

    // Pass the image URL to our server action
    await createPublicationAction(formData, uploadedImageUrl);
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/publications" className="text-text-tertiary hover:text-text-primary transition-colors">
          ← Back
        </Link>
        <h1 className="text-heading-lg text-text-primary">Create New Publication</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface border border-border p-8 rounded-xl shadow-sm space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-body-sm text-text-secondary font-medium mb-2">Title</label>
          <input 
            required type="text" name="title" 
            placeholder="e.g. Quantum Error Mitigation Techniques..."
            className="w-full bg-bg-primary border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
          />
        </div>

        {/* Authors */}
        <div>
          <label className="block text-body-sm text-text-secondary font-medium mb-2">Authors</label>
          <input 
            required type="text" name="authors" 
            placeholder="e.g. Aryan Patel, Dr. Rajesh Tripathy"
            className="w-full bg-bg-primary border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
          />
        </div>

        {/* Grid for Venue, Year, Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-body-sm text-text-secondary font-medium mb-2">Venue / Journal</label>
            <input 
              required type="text" name="venue" 
              placeholder="e.g. IEEE ICQC"
              className="w-full bg-bg-primary border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
            />
          </div>
          <div>
            <label className="block text-body-sm text-text-secondary font-medium mb-2">Year</label>
            <input 
              required type="text" name="year" 
              placeholder="2025"
              className="w-full bg-bg-primary border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:border-ibm-blue font-mono"
            />
          </div>
          <div>
            <label className="block text-body-sm text-text-secondary font-medium mb-2">Type</label>
            <select 
              name="type"
              className="w-full bg-bg-primary border border-border rounded-md px-4 py-2.5 text-text-primary focus:outline-none focus:border-ibm-blue text-sm uppercase"
            >
              <option value="CONFERENCE PAPER">Conference Paper</option>
              <option value="JOURNAL ARTICLE">Journal Article</option>
              <option value="WHITE PAPER">White Paper</option>
            </select>
          </div>
        </div>

        {/* Color Accent */}
        <div>
          <label className="block text-body-sm text-text-secondary font-medium mb-2">Accent Color</label>
          <select 
            name="color"
            className="w-full bg-bg-primary border border-border rounded-md px-4 py-2.5 text-text-primary focus:outline-none focus:border-ibm-blue text-sm"
          >
            <option value="var(--color-ibm-blue)">IBM Blue</option>
            <option value="var(--color-ibm-purple)">IBM Purple</option>
            <option value="var(--color-ibm-teal)">IBM Teal</option>
            <option value="var(--color-ibm-magenta)">IBM Magenta</option>
          </select>
        </div>

        {/* Abstract */}
        <div>
          <label className="block text-body-sm text-text-secondary font-medium mb-2">Abstract</label>
          <textarea 
            required name="abstract" rows={4}
            placeholder="A brief summary of the research..."
            className="w-full bg-bg-primary border border-border rounded-md px-4 py-3 text-text-primary focus:outline-none focus:border-ibm-blue resize-none"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-body-sm text-text-secondary font-medium mb-2">Publication Link (Optional)</label>
          <input 
            type="url" name="link" 
            placeholder="https://..."
            className="w-full bg-bg-primary border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-body-sm text-text-secondary font-medium mb-2">Cover Image (Optional)</label>
          <div className="flex items-center gap-6">
            <label className="cursor-pointer bg-bg-secondary border border-border hover:border-ibm-blue transition-colors px-4 py-2 rounded-md text-body-sm text-text-primary font-medium">
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="h-16 w-auto rounded-md border border-border object-cover" />
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-border flex justify-end">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-ibm-blue text-white px-6 py-2.5 rounded-md text-button-sm font-bold hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
