"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-black via-[#1a1208] to-brand-black">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-orange/8 blur-[100px] top-1/2 right-1/4 -translate-y-1/2" />
      <div className="relative z-10 px-6 lg:px-12 max-w-screen-xl mx-auto w-full">
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-brand-orange text-[0.65rem] tracking-[0.5em] uppercase mb-4">Our Story</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-bebas text-[clamp(4rem,12vw,9rem)] leading-none text-brand-ivory max-w-2xl">
          ABOUT<br /><span className="text-brand-orange">SKWIRREL</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-brand-gray text-sm leading-relaxed max-w-lg mt-6">
          Born from Odisha, built for the world. This is the story of a brand that transforms culture into clothing.
        </motion.p>
      </div>
    </section>
  );
}
