import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | IEEE OUTR Student Branch",
  description: "Learn about the mission, vision, and institutional alignment.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── SECTION 1: PAGE HEADER ── */}
      <section className="pt-32 pb-16 px-6 lg:px-10 border-b border-border bg-bg-secondary">
        <div className="max-w-[1000px] mx-auto text-center">
          <h1 className="text-display-lg text-text-primary mb-6">
            Advancing technology <br className="hidden md:block"/>for humanity.
          </h1>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto font-serif text-xl italic">
            &quot;The function of good software is to make the complex appear to be simple.&quot; — Grady Booch
          </p>
        </div>
      </section>

      {/* ── SECTION 2: MISSION & VISION (Structured Content) ── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-4 sticky top-32">
            <h2 className="text-heading-lg text-text-primary mb-2">Our Purpose</h2>
            <p className="text-body-md text-text-secondary">
              Why we exist and where we are heading as an organization.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="bg-surface p-8 rounded-xl border border-border shadow-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-ibm-blue" />
              <h3 className="text-heading-md text-text-primary mb-4 mt-2">Our Mission</h3>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                To foster a culture of technological innovation and academic rigor. 
                We provide hands-on experiences, enabling students to transform theoretical 
                knowledge into real-world impact through the global IEEE network.
              </p>
            </div>

            <div className="bg-surface p-8 rounded-xl border border-border shadow-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-ibm-purple" />
              <h3 className="text-heading-md text-text-primary mb-4 mt-2">Our Vision</h3>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                To be the premier student technical community in eastern India, driving interdisciplinary research, empowering students to tackle complex global challenges, and shaping the future of technology leadership in hardware, software, and systems engineering.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 3: INSTITUTIONAL ALIGNMENT (IBM Grid Style) ── */}
      <section className="py-24 px-6 lg:px-10 bg-bg-secondary border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16">
            <h2 className="text-heading-lg text-text-primary mb-2">
              Institutional Alignment
            </h2>
            <p className="text-body-md text-text-secondary max-w-2xl">
              Backed by global standards and robust regional infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface border border-border p-8 rounded-xl flex flex-col">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-ibm-blue font-bold text-xl">I</span>
              </div>
              <h3 className="text-heading-sm text-text-primary mb-3">
                IEEE Global Network
              </h3>
              <p className="text-body-md text-text-secondary flex-grow">
                The Institute of Electrical and Electronics Engineers (IEEE) is the world&apos;s largest technical professional organization dedicated to advancing technology for the benefit of humanity. With over 400,000 members in more than 160 countries, it inspires a global community through highly-cited publications, conferences, and standards.
              </p>
            </div>

            <div className="bg-surface border border-border p-8 rounded-xl flex flex-col">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-ibm-purple font-bold text-xl">O</span>
              </div>
              <h3 className="text-heading-sm text-text-primary mb-3">
                OUTR Bhubaneswar
              </h3>
              <p className="text-body-md text-text-secondary flex-grow">
                Formerly known as the College of Engineering and Technology (CET), the Odisha University of Technology and Research (OUTR) is a public unitary technical university run by the Government of Odisha in Bhubaneswar. It is one of the most prestigious technical institutions in the state, recognized for its rigorous academic programs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
