"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { handleLogoutAction } from "./actions";

export function AdminSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getTabClass = (path: string) => {
    const baseClass = "block px-4 py-2.5 rounded-lg text-body-md font-medium transition-all ";
    const isActive = pathname === path || (path !== "/admin" && pathname.startsWith(path));
    return isActive 
      ? baseClass + "bg-ibm-blue/10 text-ibm-blue" 
      : baseClass + "text-text-secondary hover:text-text-primary hover:bg-bg-secondary";
  };

  const navLinks = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/publications", label: "Publications" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/societies", label: "Societies" },
    { href: "/admin/media", label: "Media" },
    { href: "/admin/members", label: "Members" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-surface border-b border-border p-4 shrink-0">
        <Link href="/admin" className="text-heading-md text-text-primary font-bold tracking-tight">
          IEEE OUTR <span className="text-ibm-blue">Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-full transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-text-primary"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar / Mobile Menu */}
      <aside className={`
        ${isMobileMenuOpen ? "flex" : "hidden"} 
        md:flex flex-col w-full md:w-64 bg-surface border-b md:border-b-0 md:border-r border-border p-6 justify-between shrink-0 absolute md:static z-10 top-[73px] left-0 right-0 bottom-0 md:min-h-screen
      `}>
        <div className="space-y-8">
          <div className="hidden md:block">
            <Link href="/admin" className="text-heading-md text-text-primary font-bold tracking-tight block">
              IEEE OUTR <span className="text-ibm-blue">Admin</span>
            </Link>
            <p className="text-body-sm text-text-secondary mt-1">Dashboard & CMS</p>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getTabClass(link.href)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-border mt-8 space-y-3">
          {/* Desktop Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:flex items-center gap-3 w-full px-4 py-2 rounded-md text-body-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  Dark Mode
                </>
              )}
            </button>
          )}

          <Link 
            href="/" 
            className="block px-4 py-2 rounded-md text-body-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            ← Back to Site
          </Link>
          <form action={handleLogoutAction}>
            <button 
              type="submit"
              className="w-full text-left px-4 py-2 rounded-md text-body-sm text-red-500 hover:bg-red-500/10 transition-colors font-medium"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
