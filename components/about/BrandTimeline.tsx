"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MILESTONES = [
  { year: "2024", title: "The Idea", desc: "Born out of frustration and pride. The question: why doesn't Odisha have a premium fashion brand?" },
  { year: "Early 2025", title: "Research & Roots", desc: "Deep dives into Odisha's textile heritage, cultural archives, and conversations with artisan communities across the state." },
  { year: "Mid 2025", title: "First Designs", desc: "The first collection takes shape — temple motifs, Sambalpuri patterns, and Odia typography on premium cotton blanks." },
  { year: "Late 2025", title: "SKWIRREL Launches", desc: "The brand goes live. First drops sell out. The Instagram community begins to grow organically." },
  { year: "2026", title: "Going National", desc: "Shipping across India. New categories added. Conversations with Odishan artisans about collaborative collections." },
  { year: "Future", title: "Made For The World", desc: "International shipping. Flagship pop-ups. Becoming the defining cultural fashion brand of Eastern India." },
];

export function BrandTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0d0d0d] py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Journey</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none">
            HOW WE GOT<br /><span className="text-brand-orange">HERE</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MILESTONES.map((m, i) => (
            <motion.div key={m.year}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="relative pl-5 border-l-2 border-brand-orange/30 hover:border-brand-orange transition-colors group"
            >
              <span className="font-bebas text-xs tracking-wider text-brand-orange">{m.year}</span>
              <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mt-1 mb-2 group-hover:text-brand-orange transition-colors">{m.title}</h3>
              <p className="text-brand-gray text-xs leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
