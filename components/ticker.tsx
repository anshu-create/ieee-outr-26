"use client";

import { motion } from "framer-motion";

interface TickerProps {
  text?: string;
  speed?: number;
}

export function Ticker({
  text = "• IEEE OUTR STUDENT BRANCH •",
  speed = 20,
}: TickerProps) {
  const repeatedText = Array(12).fill(text).join("   ");

  return (
    <div className="w-full overflow-hidden border-y border-border bg-surface-1 py-4 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <span className="font-mono text-sm text-text-tertiary tracking-wider px-4">
          {repeatedText}
        </span>
        <span className="font-mono text-sm text-text-tertiary tracking-wider px-4">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}
