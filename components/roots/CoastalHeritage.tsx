"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export function CoastalHeritage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-brand-black py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Coastal Life</p>
            <h2 className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none mb-6">
              WHERE THE<br />LAND MEETS<br /><span className="text-brand-orange">THE SEA</span>
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed mb-5">
              Odisha's 485km coastline is not just geography — it is culture, livelihood, and identity. The fishing communities of Puri and Konark, the sacred Chilika Lake home to the largest coastal lagoon in Asia, the ancient trading port of Manikpatna — all carry a distinct way of life that breathes into our designs.
            </p>
            <p className="text-brand-gray text-sm leading-relaxed mb-8">
              The colours of the coast — terracotta sails at dusk, the silver flash of Chilika waters, the red earth of the coastal forests — these are the hues of SKWIRREL.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { num: "485km", label: "Coastline" },
                { num: "1,100km²", label: "Chilika Lake" },
                { num: "6M+", label: "Fishing Communities" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-brand-orange pl-3">
                  <p className="font-bebas text-2xl text-brand-orange">{s.num}</p>
                  <p className="text-[0.6rem] tracking-wider text-brand-gray uppercase">{s.label}</p>
                </div>
              ))}
            </div>

            <Link href="/shop"
              className="inline-block bg-brand-orange text-brand-ivory px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-brand-orange-dark transition-colors">
              Shop the Collection
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { label: "Puri Beach", bg: "from-[#1a2d3d] to-[#0d1a28]", h: "h-64" },
              { label: "Chilika Lake", bg: "from-[#0d1a2d] to-[#0a1520]", h: "h-40" },
              { label: "Konark Coast", bg: "from-[#2d1e0f] to-[#1a1208]", h: "h-40" },
              { label: "Simlipal Forest", bg: "from-[#0d1a0d] to-[#0a1a0d]", h: "h-64" },
            ].map((item) => (
              <div key={item.label} className={`${item.h} bg-gradient-to-br ${item.bg} flex items-end p-3`}>
                <span className="text-[0.6rem] tracking-[0.2em] text-brand-ivory/30 uppercase">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
