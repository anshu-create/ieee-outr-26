"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/primary-button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* ── HEADER ── */}
      <section className="pt-32 pb-16 px-6 lg:px-10 border-b border-border bg-bg-secondary">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-display-lg text-text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            Have a research inquiry, partnership proposal, or just want to collaborate? 
            Reach out to our team.
          </p>
        </div>
      </section>

      {/* ── 2-UP SPLIT ── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT — Form */}
          <div className="lg:col-span-7">
            <h2 className="text-heading-lg text-text-primary mb-8 pb-4 border-b border-border">
              Send a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-ibm-blue focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-ibm-blue focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-body-sm font-medium text-text-primary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-ibm-blue focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-body-sm font-medium text-text-primary mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us more about your inquiry…"
                  className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-ibm-blue focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center font-medium rounded-lg bg-text-primary text-bg-primary px-8 py-3 text-body-md hover:bg-text-secondary active:scale-[0.98] transition-all duration-200"
                >
                  {submitted ? "✓ Message Sent" : "Submit Inquiry"}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT — Coordinates */}
          <div className="lg:col-span-5 space-y-10">
            <h2 className="text-heading-lg text-text-primary mb-8 pb-4 border-b border-border">
              Information
            </h2>
            
            <div>
              <p className="text-mono-sm text-text-tertiary mb-2 uppercase">Headquarters</p>
              <p className="text-body-md text-text-primary leading-relaxed">
                Odisha University of Technology and Research (OUTR)<br />
                Ghatikia, Bhubaneswar<br />
                Odisha 751029, India
              </p>
            </div>

            <div>
              <p className="text-mono-sm text-text-tertiary mb-2 uppercase">Electronic Mail</p>
              <a
                href="mailto:ieee.outr@gmail.com"
                className="text-body-md text-ibm-blue hover:underline"
              >
                ieee.outr@gmail.com
              </a>
            </div>

            <div>
              <p className="text-mono-sm text-text-tertiary mb-2 uppercase">Phone</p>
              <p className="text-body-md text-text-primary font-mono">
                +91 674 258 6000
              </p>
            </div>

            <div className="bg-bg-secondary p-6 rounded-xl border border-border mt-8">
              <h3 className="text-heading-sm text-text-primary mb-2">Office Hours</h3>
              <p className="text-body-sm text-text-secondary">
                Our lab and student office are generally open Monday through Friday, 
                from 10:00 AM to 5:00 PM IST.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
