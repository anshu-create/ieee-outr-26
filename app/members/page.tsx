import type { Metadata } from "next";
import { getMembers } from "@/lib/db";

export const metadata: Metadata = {
  title: "Members | IEEE OUTR Student Branch",
  description: "Meet the researchers, engineers, and faculty behind the branch.",
};

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const members = await getMembers();
  
  const excom = members.filter(m => m.category === "executive board" || m.category === "executive");
  const studentBoard = members.filter(m => m.category === "student board" || m.category === "team");

  return (
    <>
      {/* ── HEADER ── */}
      <section className="pt-32 pb-16 px-6 lg:px-10 border-b border-border bg-bg-secondary">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-display-lg text-text-primary mb-4">Our People</h1>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            Meet the student researchers, engineers, and faculty driving innovation at IEEE OUTR.
          </p>
        </div>
      </section>

      {/* ── EXECUTIVE COMMITTEE ── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 pb-4 border-b border-border">
            <h2 className="text-heading-lg text-text-primary">Executive Board</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {excom.map((member) => (
              <div
                key={member.id}
                className="bg-surface rounded-xl p-6 border border-border flex flex-col group hover:shadow-card hover:border-ibm-blue hover:-translate-y-1 transition-all"
              >
                <span className="text-mono-sm text-ibm-blue mb-4 uppercase tracking-wider">{member.role || "Executive"}</span>
                <div className="w-16 h-16 bg-bg-secondary rounded-full border border-border mb-4 flex items-center justify-center overflow-hidden">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-8 h-8 text-text-tertiary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 110-6 3 3 0 010 6zm9 11a1 1 0 01-2 0c0-2.336-2.86-5-7-5s-7 2.664-7 5a1 1 0 01-2 0c0-3.473 3.69-7 9-7s9 3.527 9 7z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-heading-sm text-text-primary">{member.name}</h3>
                <div className="flex gap-2 mt-2">
                  {member.scholarLink && <a href={member.scholarLink} target="_blank" rel="noreferrer" className="text-ibm-blue hover:underline text-xs">Scholar</a>}
                  {member.linkedinLink && <a href={member.linkedinLink} target="_blank" rel="noreferrer" className="text-ibm-blue hover:underline text-xs">LinkedIn</a>}
                  {member.githubLink && <a href={member.githubLink} target="_blank" rel="noreferrer" className="text-ibm-blue hover:underline text-xs">GitHub</a>}
                </div>
              </div>
            ))}
            {excom.length === 0 && <p className="text-text-secondary">No executive members found.</p>}
          </div>
        </div>
      </section>

      {/* ── STUDENT BOARD ── */}
      <section className="py-24 px-6 lg:px-10 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 pb-4 border-b border-border">
            <h2 className="text-heading-lg text-text-primary">Student Board</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentBoard.map((member) => (
              <div
                key={member.id}
                className="bg-bg-secondary rounded-xl p-6 border border-border flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border overflow-hidden shrink-0">
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-full h-full text-text-tertiary p-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 110-6 3 3 0 010 6zm9 11a1 1 0 01-2 0c0-2.336-2.86-5-7-5s-7 2.664-7 5a1 1 0 01-2 0c0-3.473 3.69-7 9-7s9 3.527 9 7z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-heading-sm text-text-primary">
                      {member.name}
                    </h3>
                    <p className="text-body-sm text-text-secondary">{member.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {member.scholarLink && <a href={member.scholarLink} target="_blank" rel="noreferrer" className="text-ibm-blue hover:underline text-xs">Scholar</a>}
                  {member.linkedinLink && <a href={member.linkedinLink} target="_blank" rel="noreferrer" className="text-ibm-blue hover:underline text-xs">LinkedIn</a>}
                  {member.githubLink && <a href={member.githubLink} target="_blank" rel="noreferrer" className="text-ibm-blue hover:underline text-xs">GitHub</a>}
                </div>
              </div>
            ))}
            {studentBoard.length === 0 && <p className="text-text-secondary">No student board members found.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
