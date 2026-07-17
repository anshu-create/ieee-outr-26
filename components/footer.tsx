"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/societies", label: "Societies" },
  { href: "/publications", label: "Publications" },
  { href: "/members", label: "Members" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-bg-secondary border-t border-border mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo_outr_ieee.svg" alt="IEEE OUTR Logo" className="h-12 md:h-14 w-auto" />
              <span className="text-heading-sm font-bold text-text-primary">
                IEEE OUTR
              </span>
            </div>
            <p className="text-body-sm text-text-secondary max-w-sm mb-6">
              The Institute of Electrical and Electronics Engineers Student Branch 
              at Odisha University of Technology and Research, Bhubaneswar.
              Advancing Technology for Humanity.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="text-mono-sm text-text-primary mb-4 uppercase">Explore</h3>
            <ul className="space-y-3">
              {navLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm text-text-secondary hover:text-ibm-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="text-mono-sm text-text-primary mb-4 uppercase">Connect</h3>
            <ul className="space-y-3">
              {navLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm text-text-secondary hover:text-ibm-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-body-sm text-text-secondary hover:text-ibm-blue transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-text-tertiary">
            © {new Date().getFullYear()} IEEE OUTR Student Branch. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-body-sm text-text-tertiary hover:text-text-primary">Privacy</Link>
            <Link href="/terms" className="text-body-sm text-text-tertiary hover:text-text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
