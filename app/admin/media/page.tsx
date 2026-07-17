"use client";

import { useState, useEffect } from "react";
import { showToast } from "@/components/admin-toast";

interface MediaFile {
  filename: string;
  url: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error("Failed to fetch media", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    setError(null);
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      
      await fetchFiles();
      showToast("Image uploaded successfully");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      // clear input
      e.target.value = '';
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;
    
    try {
      const res = await fetch(`/api/media/${filename}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Delete failed");
      
      await fetchFiles();
      showToast("Image deleted successfully");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-heading-lg text-text-primary mb-2">Media Management</h1>
          <p className="text-body-md text-text-secondary">
            Upload and manage images in the assets/media folder.
          </p>
        </div>
        <div>
          <label className="cursor-pointer bg-ibm-blue text-white px-4 py-2 rounded hover:bg-ibm-blue-hover transition-colors inline-block text-sm font-medium">
            {isUploading ? "Uploading..." : "Upload Image"}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload} 
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {files.map((file) => (
          <div key={file.filename} className="relative group bg-surface border border-border rounded-lg overflow-hidden aspect-square flex flex-col">
            <div className="flex-1 relative overflow-hidden bg-bg-secondary">
              <img 
                src={file.url} 
                alt={file.filename} 
                className="w-full h-full object-cover" 
              />
              <button
                onClick={() => handleDelete(file.filename)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <div className="p-2 border-t border-border bg-bg-primary">
              <p className="text-xs text-text-secondary truncate" title={file.filename}>
                {file.filename}
              </p>
            </div>
          </div>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border rounded-lg text-text-secondary">
          No media files found. Upload an image to get started.
        </div>
      )}
    </div>
  );
}
