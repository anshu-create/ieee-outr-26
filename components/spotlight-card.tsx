"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface SpotlightCardProps {
  title: string;
  description: string;
  variant?: "magenta" | "orange";
  badge?: string;
  metadata?: string;
  children?: React.ReactNode;
}

export function SpotlightCard({
  title,
  description,
  variant = "magenta",
  badge,
  metadata,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const gradientColor =
    variant === "magenta"
      ? "rgba(212, 77, 240, 0.12)"
      : "rgba(255, 122, 61, 0.12)";

  const accentColor = variant === "magenta" ? "#d44df0" : "#ff7a3d";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-xl border border-border bg-surface-1 p-8 cursor-default group"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Spotlight glare that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColor}, transparent 40%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {badge && (
          <span
            className="inline-block text-label-md rounded-pill px-3.5 py-1.5 mb-5 border"
            style={{
              color: accentColor,
              borderColor: `${accentColor}30`,
              background: `${accentColor}08`,
            }}
          >
            {badge}
          </span>
        )}

        <h3 className="text-heading-md text-text-primary mb-2 group-hover:text-white transition-colors">
          {title}
        </h3>

        {metadata && (
          <p className="text-body-sm text-text-tertiary mb-3 font-mono">
            {metadata}
          </p>
        )}

        <p className="text-body-md text-text-secondary">{description}</p>
      </div>
    </motion.div>
  );
}
