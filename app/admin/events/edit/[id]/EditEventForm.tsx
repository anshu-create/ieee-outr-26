"use client";

import Link from "next/link";
import { useState } from "react";
import { updateEventAction } from "../../actions";
import { Event } from "@/lib/db";

export function EditEventForm({ event }: { event: Event }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(event.imageUrl || null);

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
    let uploadedImageUrl = event.imageUrl || "";

    // If a new image was selected, upload it
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
    await updateEventAction(event.id, formData, uploadedImageUrl);
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={event.title}
            className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
            placeholder="e.g. HackOUTR 2026"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
              Event Type
            </label>
            <input
              type="text"
              name="type"
              list="eventTypes"
              defaultValue={event.type}
              required
              className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
              placeholder="e.g. HACKATHON, WORKSHOP, or custom"
            />
            <datalist id="eventTypes">
              <option value="HACKATHON" />
              <option value="WORKSHOP" />
              <option value="GUEST LECTURE" />
              <option value="SUMMIT" />
              <option value="BOOTCAMP" />
            </datalist>
          </div>

          <div>
            <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
              Status
            </label>
            <select
              name="status"
              defaultValue={event.status}
              className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
            >
              <option value="Registration Open">Registration Open</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="Archived">Archived (Past Event)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
              Date (Optional)
            </label>
            <input
              type="date"
              name="date"
              defaultValue={
                event.date 
                  ? (() => {
                      const d = new Date(event.date);
                      return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
                    })() 
                  : ""
              }
              className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
              Time (Optional)
            </label>
            <input
              type="text"
              name="time"
              defaultValue={event.time || ""}
              className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
              placeholder="e.g. 10:00 AM - 12:00 PM"
            />
          </div>

          <div>
            <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
              Location / Venue
            </label>
            <input
              type="text"
              name="location"
              required
              defaultValue={event.location}
              className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
              placeholder="e.g. Main Campus Hub or Virtual (WebEx)"
            />
          </div>
        </div>

        <div>
          <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={event.description}
            className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
            placeholder="Provide a detailed description of the event, itinerary, or targets..."
          />
        </div>

        <div>
          <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
            Event Link (Optional)
          </label>
          <input
            type="url"
            name="link"
            defaultValue={event.link || ""}
            className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
            Speaker / Lecturer (Optional)
          </label>
          <input
            type="text"
            name="speaker"
            defaultValue={event.speaker || ""}
            className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
            placeholder="e.g. Dr. Jane Doe"
          />
        </div>

        <div>
          <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
            Event Image (Optional)
          </label>
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

        <div className="flex justify-end gap-4 pt-4 border-t border-border">
          <Link
            href="/admin/events"
            className="px-5 py-2.5 border border-border rounded-lg text-body-md font-semibold text-text-secondary hover:bg-bg-secondary transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-ibm-blue hover:bg-ibm-blue-hover text-white rounded-lg text-body-md font-semibold transition-colors shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
