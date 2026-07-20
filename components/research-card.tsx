"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ResearchCardProps {
  category: string;
  title: string;
  description: string;
  image?: string;
  href?: string;
  accentColor?: string;
  featured?: boolean;
}

export function ResearchCard({
  category,
  title,
  description,
  image,
  href = "#",
  accentColor = "var(--color-ibm-blue)",
  featured = false,
}: ResearchCardProps) {
  const isExternal = href.startsWith('http');
  const CardWrapper = isExternal ? 'a' : Link;

  const getCardBg = (colorStr: string) => {
    if (colorStr.includes('blue')) return 'var(--card-bg-blue)';
    if (colorStr.includes('purple')) return 'var(--card-bg-purple)';
    if (colorStr.includes('teal')) return 'var(--card-bg-green)';
    if (colorStr.includes('magenta')) return 'var(--card-bg-red)';
    return 'var(--card-bg-gray)';
  };

  return (
    <CardWrapper href={href} className="group block h-full" {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <motion.div
        className={`flex flex-col h-full border-t border-r border-b border-l border-border transition-all duration-300 relative hover:border-ibm-blue hover:shadow-card rounded-xl overflow-hidden ${featured ? 'md:flex-row' : ''}`}
        style={{ backgroundColor: getCardBg(accentColor) }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Image Section */}
        {image && (
          <div className={`relative overflow-hidden bg-bg-secondary ${featured ? 'w-full md:w-1/2 aspect-video md:aspect-auto' : 'w-full aspect-[4/3]'}`}>
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content Section */}
        <div className={`flex flex-col flex-grow p-6 md:p-8 ${featured ? 'md:w-1/2 justify-center' : ''}`}>
          <div className="mb-4">
            <span 
              className="text-mono-sm uppercase tracking-wider font-semibold" 
              style={{ color: accentColor }}
            >
              {category}
            </span>
          </div>
          
          <h3 className={`${featured ? 'text-heading-lg mb-6 line-clamp-3' : 'text-heading-md mb-4 line-clamp-2'} text-text-primary group-hover:text-ibm-blue transition-colors relative z-10 font-sans tracking-tight`} title={title}>
            {title}
          </h3>
          
          <p className="text-body-md text-text-secondary flex-grow relative z-10 font-sans line-clamp-4">
            {description}
          </p>

          <div className="mt-8 flex items-center text-body-sm font-semibold transition-colors relative z-10 text-ibm-blue">
            Read Publication 
            <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </motion.div>
    </CardWrapper>
  );
}
