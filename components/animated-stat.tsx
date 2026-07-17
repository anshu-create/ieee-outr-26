"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
}

export function AnimatedStat({ value, suffix = "", label }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Spring config for a premium, smooth counting effect
  const spring = useSpring(0, {
    stiffness: 40,
    damping: 15,
    mass: 1,
  });

  const displayValue = useTransform(spring, (current) =>
    Math.round(current).toString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <div className="flex items-baseline text-display-lg text-text-primary font-mono tracking-tight">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-body-md text-text-secondary mt-1">{label}</p>
    </div>
  );
}
