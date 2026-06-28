"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VALUES = [
  { icon: "◈", title: "Authenticity", desc: "Every design is rooted in real Odishan culture — not a caricature of it. We work from lived experience, not imagination." },
  { icon: "◉", title: "Premium Quality", desc: "We refuse to compromise. From fabric to print to finish, every detail is held to the standard of a brand built to last." },
  { icon: "▲", title: "Sustainability", desc: "We are developing wood pulp and cotton blends, using water-based inks, and building a supply chain we can be proud of." },
  { icon: "◎", title: "Cultural Pride", desc: "We want every person who wears SKWIRREL to feel proud. Of where they come from. Of who they are." },
  { icon: "✦", title: "Community First", desc: "We build with Odisha's artisan communities, not around them. Their craft is our foundation." },
  { icon: "⬡", title: "Bold Minimalism", desc: "Maximum meaning, minimum clutter. We let culture speak — through typography, symbol, and restraint." },
];

export function BrandPhilosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-brand-black py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="text-center mb-14">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Philosophy</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none">
            WHAT WE <span className="text-brand-orange">BELIEVE</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {VALUES.map((v, i) => (
            <motion.div key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-brand-black p-8 hover:bg-[#0d0d0d] transition-colors group"
            >
              <span className="text-2xl text-brand-orange group-hover:scale-110 inline-block transition-transform mb-4">{v.icon}</span>
              <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mb-2">{v.title}</h3>
              <p className="text-brand-gray text-xs leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
