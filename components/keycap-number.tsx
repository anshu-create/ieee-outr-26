"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface KeycapNumberProps {
  value: string | number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function KeycapNumber({ value, label, size = "md" }: KeycapNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const sizeClasses = {
    sm: "text-xl px-2.5 py-1.5 min-w-[36px]",
    md: "text-3xl px-4 py-2.5 min-w-[52px]",
    lg: "text-5xl px-5 py-3 min-w-[72px]",
  };

  return (
    <div ref={ref} className="inline-flex flex-col items-center gap-2">
      <motion.span
        className={`inline-flex items-center justify-center font-mono font-bold text-text-primary rounded-[4px] border border-border ${sizeClasses[size]}`}
        style={{
          background: "linear-gradient(180deg, #121212 0%, #0d0d0d 100%)",
          boxShadow: "0 1px 0 0 #23252a, inset 0 1px 0 0 rgba(255,255,255,0.04)",
        }}
        initial={{ scale: 0.7, opacity: 0, y: 12 }}
        animate={
          isInView
            ? { scale: 1, opacity: 1, y: 0 }
            : { scale: 0.7, opacity: 0, y: 12 }
        }
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
          mass: 0.8,
        }}
      >
        {value}
      </motion.span>
      {label && (
        <span className="text-label-md text-text-tertiary">{label}</span>
      )}
    </div>
  );
}
