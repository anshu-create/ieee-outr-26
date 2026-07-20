"use client";

import { useState, useEffect } from "react";
import { Member } from "@/lib/db";
import { addMemberAction, updateMemberAction, deleteMemberAction, getMembersAction } from "./actions";
import { showToast } from "@/components/admin-toast";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState<"executive board" | "student board">("student board");
  const [photoUrl, setPhotoUrl] = useState("");
  const [scholarLink, setScholarLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const loadMembers = async () => {
    const data = await getMembersAction();
    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const resetForm = () => {
    setName("");
    setRole("");
    setCategory("student board");
    setPhotoUrl("");
    setScholarLink("");
    setLinkedinLink("");
    setGithubLink("");
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (member: Member) => {
    setName(member.name);
    setRole(member.role || "");
    // Map legacy categories to new board categories
    if (member.category === "executive") setCategory("executive board");
    else if (member.category === "team" || member.category === "faculty") setCategory("student board");
    else setCategory(member.category as "executive board" | "student board");
    setPhotoUrl(member.photoUrl || "");
    setScholarLink(member.scholarLink || "");
    setLinkedinLink(member.linkedinLink || "");
    setGithubLink(member.githubLink || "");
    setEditingId(member.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this member?")) {
      await deleteMemberAction(id);
      await loadMembers();
      showToast("Member deleted successfully");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, role, category, photoUrl, scholarLink, linkedinLink, githubLink };
    if (isEditing && editingId !== null) {
      await updateMemberAction(editingId, data);
      showToast("Member updated successfully");
    } else {
      await addMemberAction(data);
      showToast("Member added successfully");
    }
    await loadMembers();
    resetForm();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      // Upload to the existing uploads route or media route
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const result = await res.json();
        setPhotoUrl(result.url);
      }
    } catch (err) {
      console.error("Failed to upload image", err);
    }
  };

  return (
    <div>
      <h1 className="text-heading-lg text-text-primary mb-2">Members Management</h1>
      <p className="text-body-md text-text-secondary mb-8">Add or update members for the society.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border p-6 rounded-lg sticky top-24">
            <h2 className="text-heading-sm mb-4">{isEditing ? "Edit Member" : "Add New Member"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-bg-secondary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Role/Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-bg-secondary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
                  placeholder="e.g. Branch Chair, Web Lead"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-bg-secondary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
                >
                  <option value="executive board">Executive Board</option>
                  <option value="student board">Student Board</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Photo</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="/api/media/name.jpg"
                    className="flex-1 bg-bg-secondary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
                  />
                  <label className="cursor-pointer bg-bg-secondary border border-border px-3 py-2 rounded hover:bg-surface flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
                {photoUrl && (
                  <div className="mt-2 flex items-start gap-4">
                    <div className="w-20 h-20 rounded bg-bg-secondary overflow-hidden border border-border">
                      <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setPhotoUrl("")}
                      className="text-sm text-red-500 hover:text-red-400 hover:underline px-2 py-1 mt-1"
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Google Scholar (Optional)</label>
                <input
                  type="url"
                  value={scholarLink}
                  onChange={(e) => setScholarLink(e.target.value)}
                  className="w-full bg-bg-secondary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">LinkedIn (Optional)</label>
                <input
                  type="url"
                  value={linkedinLink}
                  onChange={(e) => setLinkedinLink(e.target.value)}
                  className="w-full bg-bg-secondary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">GitHub (Optional)</label>
                <input
                  type="url"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  className="w-full bg-bg-secondary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-ibm-blue"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-ibm-blue text-white px-4 py-2 rounded hover:bg-ibm-blue-hover transition-colors font-medium"
                >
                  {isEditing ? "Update" : "Add Member"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-bg-secondary text-text-secondary rounded hover:text-text-primary transition-colors font-medium border border-border"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bg-secondary border-b border-border text-xs uppercase tracking-wider text-text-secondary">
                    <th className="px-6 py-4 font-medium">Member</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-bg-secondary/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-bg-secondary overflow-hidden shrink-0 border border-border">
                            {member.photoUrl ? (
                              <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{member.name}</p>
                            {member.role && <p className="text-xs text-text-secondary mt-0.5">{member.role}</p>}
                            <div className="flex gap-2 mt-1">
                              {member.scholarLink && <a href={member.scholarLink} target="_blank" rel="noreferrer" className="text-ibm-blue hover:underline text-xs">Scholar</a>}
                              {member.linkedinLink && <a href={member.linkedinLink} target="_blank" rel="noreferrer" className="text-ibm-blue hover:underline text-xs">LinkedIn</a>}
                              {member.githubLink && <a href={member.githubLink} target="_blank" rel="noreferrer" className="text-ibm-blue hover:underline text-xs">GitHub</a>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 rounded bg-bg-primary border border-border uppercase tracking-wider text-text-secondary">
                          {member.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="p-2 text-text-secondary hover:text-ibm-blue hover:bg-ibm-blue/10 rounded transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {members.length === 0 && (
                <div className="text-center py-12 text-text-secondary">
                  No members found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
