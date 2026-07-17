"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const showToast = (message: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("admin-toast", { detail: message }));
  }
};

export function AdminToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Listen to URL params
    const successMsg = searchParams.get("success");
    if (successMsg) {
      setMessage(successMsg);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("success");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    // 2. Listen to custom event
    const handleToast = (e: CustomEvent<string>) => {
      setMessage(e.detail);
    };
    window.addEventListener("admin-toast", handleToast as EventListener);

    return () => {
      window.removeEventListener("admin-toast", handleToast as EventListener);
    };
  }, [searchParams, pathname, router]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
}
