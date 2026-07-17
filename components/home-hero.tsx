"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const heroWords = [
  { text: "Research", bg: "bg-blue-600 dark:bg-ibm-blue/20", textCol: "text-white font-bold dark:text-blue-300 dark:font-semibold", dot: "bg-white dark:bg-ibm-blue" },
  { text: "Build", bg: "bg-amber-400 dark:bg-amber-500/20", textCol: "text-[#121212] font-bold dark:text-amber-300 dark:font-semibold", dot: "bg-[#121212] dark:bg-amber-400" },
  { text: "Publish", bg: "bg-purple-600 dark:bg-ibm-purple/20", textCol: "text-white font-bold dark:text-purple-300 dark:font-semibold", dot: "bg-white dark:bg-ibm-purple" },
  { text: "Learn", bg: "bg-green-600 dark:bg-green-500/20", textCol: "text-white font-bold dark:text-green-300 dark:font-semibold", dot: "bg-white dark:bg-green-500" },
  { text: "Create", bg: "bg-teal-600 dark:bg-ibm-teal/20", textCol: "text-white font-bold dark:text-teal-300 dark:font-semibold", dot: "bg-white dark:bg-ibm-teal" },
  { text: "Innovate", bg: "bg-pink-600 dark:bg-ibm-magenta/20", textCol: "text-white font-bold dark:text-pink-300 dark:font-semibold", dot: "bg-white dark:bg-ibm-magenta" },
];

export function HomeHero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentWord = heroWords[wordIndex];

  return (
    <section className="relative pt-32 pb-16 px-6 lg:px-10 flex flex-col items-center justify-center text-center min-h-[90vh]">
      <motion.div 
        className="mb-10 inline-flex items-center gap-3 bg-surface border border-border px-5 py-2 rounded-full shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-2 h-2 rounded-full bg-ibm-blue animate-pulse" />
        <span className="font-mono text-sm tracking-widest text-text-primary uppercase font-semibold">
          IEEE <span className="text-text-tertiary mx-1">|</span> OUTR CHAPTER
        </span>
        <span className="w-2 h-2 rounded-full bg-ibm-magenta animate-pulse" style={{ animationDelay: '0.5s' }} />
      </motion.div>

      <div className="relative z-10 max-w-[1000px] mx-auto w-full mb-6">
        <motion.h1
          className="text-[clamp(48px,8vw,96px)] font-bold text-text-primary leading-[1.05] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Where engineers and <br className="hidden md:block"/>
          innovators
          
          <span className="block md:inline-block my-2 md:my-0 md:mx-4 align-middle">
            <motion.span 
              layout
              className={`inline-flex items-center justify-center px-4 py-1 md:px-6 md:py-2 rounded-full shadow-sm transition-colors duration-500 overflow-hidden ${currentWord.bg} ${currentWord.textCol}`}
            >
              <span className={`w-5 h-5 md:w-6 md:h-6 rounded-full mr-1.5 md:mr-2 transition-colors duration-500 shrink-0 ${currentWord.dot}`} />
              <span className="relative flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={currentWord.text}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="block whitespace-nowrap leading-none"
                  >
                    {currentWord.text}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          </span>
          
          together.
        </motion.h1>
      </div>

      <motion.p 
        className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        Research, build, and innovate with the premier engineering community at OUTR.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Link href="/societies" className="bg-[#0f62fe] text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-[#0043ce] transition-colors shadow-sm">
          Join IEEE OUTR
        </Link>
        <Link href="/publications" className="bg-surface border border-border text-text-primary px-8 py-3 rounded-lg font-medium text-lg hover:bg-bg-secondary transition-colors shadow-sm">
          Publications
        </Link>
      </motion.div>

      <motion.div 
        className="absolute left-[5%] bottom-[20%] hidden lg:block"
        initial={{ opacity: 0, x: -20, rotate: -15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="w-24 h-24 bg-[#ffeaa7] rounded-full flex items-center justify-center shadow-lg border-2 border-[#121212] transform -rotate-12">
          <svg className="w-12 h-12 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </motion.div>

      <motion.div 
        className="absolute right-[5%] bottom-[25%] hidden lg:block"
        initial={{ opacity: 0, x: 20, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="w-20 h-20 bg-[#a29bfe] rounded-full flex items-center justify-center shadow-lg border-2 border-[#121212] transform rotate-12">
           <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
      </motion.div>
    </section>
  );
}
