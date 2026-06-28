"use client";

import { motion } from "framer-motion";

export function RootsHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-black via-[#1a1208] to-[#0d0804]">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80H0z' fill='none'/%3E%3Cpath d='M40 0L80 40L40 80L0 40z' fill='%23E85A1C' fill-opacity='0.3'/%3E%3C/svg%3E")` }}
      />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange/8 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-brand-orange text-[0.65rem] tracking-[0.5em] uppercase mb-4">
          Where We Come From
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-bebas text-[clamp(3.5rem,10vw,8rem)] leading-none text-brand-ivory mb-6">
          OUR <span className="text-brand-orange">ROOTS</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="w-16 h-[2px] bg-brand-orange mx-auto mb-6" />
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="text-brand-gray text-sm leading-relaxed max-w-xl mx-auto">
          Every thread we weave carries the memory of a land ancient, proud, and deeply alive.
          This is the story of Odisha — and how it became our language.
        </motion.p>
      </div>
      {/* Odia script decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-bebas text-5xl text-brand-orange/10 tracking-widest select-none">
        ଓଡ଼ିଶା
      </div>
    </section>
  );
}
