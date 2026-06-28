"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WEAVES = [
  { name: "Sambalpuri Ikat", region: "Western Odisha", desc: "Ancient resist-dyeing technique where threads are tied and dyed before weaving, creating geometric patterns that seem to float on fabric. GI-tagged and internationally acclaimed.", icon: "◈" },
  { name: "Bomkai Silk", region: "Ganjam District", desc: "Rich silk weave with intricate threadwork and bold tribal motifs. The contrast between the body fabric and the border is a hallmark of Odishan textile elegance.", icon: "◉" },
  { name: "Pasapalli", region: "Sonepur, Odisha", desc: "A chess-board inspired checkerboard pattern in deep contrasting colours. One of Odisha's most distinctive and widely recognised weave patterns.", icon: "▦" },
  { name: "Khandua Silk", region: "Nuapatna, Cuttack", desc: "Sacred ikat silk traditionally offered to Lord Jagannath. Every piece is made with devotion and precision, carrying spiritual significance alongside its aesthetic beauty.", icon: "◎" },
];

export function TextileHeritage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-brand-ivory py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}>
            <p className="text-brand-orange-dark text-[0.65rem] tracking-[0.4em] uppercase mb-3">Textiles</p>
            <h2 className="font-bebas text-5xl lg:text-6xl text-brand-black leading-none mb-5">
              WOVEN INTO<br /><span className="text-brand-orange">OUR DNA</span>
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed">
              Odisha's textile traditions are among the richest in the world. For thousands of years, master weavers have encoded culture, spirituality, and identity into every thread. These weaves are not just fabric — they are living documents of who we are.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="aspect-[4/3] bg-gradient-to-br from-[#2d1e0f] to-[#1a1208] flex items-center justify-center"
          >
            <div className="grid grid-cols-4 gap-1 w-48 h-48 opacity-40">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="aspect-square" style={{ backgroundColor: (i + Math.floor(i / 8)) % 2 === 0 ? "#E85A1C" : "#2d1e0f" }} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WEAVES.map((w, i) => (
            <motion.div key={w.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-brand-beige p-6 border-t-2 border-brand-orange"
            >
              <span className="text-2xl text-brand-orange mb-3 block">{w.icon}</span>
              <h3 className="font-bebas text-xl tracking-wider text-brand-black mb-1">{w.name}</h3>
              <p className="text-[0.6rem] tracking-[0.2em] text-brand-orange uppercase mb-3">{w.region}</p>
              <p className="text-brand-gray text-xs leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
