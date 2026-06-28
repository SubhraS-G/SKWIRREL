"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function FounderStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0d0d0d] py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="relative"
          >
            {/* Founder image placeholder */}
            <div className="aspect-[4/5] bg-gradient-to-br from-[#1a1208] to-[#2d1e0f] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="font-bebas text-[10rem] text-brand-orange leading-none">S</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-black to-transparent">
                <p className="font-bebas text-xl tracking-wider text-brand-ivory">Founder</p>
                <p className="text-brand-orange text-xs tracking-wider">SKWIRREL</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-orange flex items-center justify-center">
              <p className="font-bebas text-brand-ivory text-center text-xs leading-tight tracking-wider px-2">BORN<br />IN<br />ODISHA</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Founder</p>
            <h2 className="font-bebas text-5xl text-brand-ivory leading-none mb-6">
              THE PERSON<br />BEHIND THE<br /><span className="text-brand-orange">BRAND</span>
            </h2>
            <div className="space-y-4 text-brand-gray text-sm leading-relaxed">
              <p>Growing up in Bhubaneswar, I watched Odisha's incredible culture get overlooked by mainstream fashion. The Sambalpuri weaves my grandmother cherished, the Rath Yatra devotion I felt every year, the Odia words that carry meaning no translation can capture — none of it existed in the clothes I could buy.</p>
              <p>So I decided to change that. <span className="text-brand-ivory">SKWIRREL started as a question:</span> what if the richness of Odisha could be worn? What if every piece of clothing told a story rooted in this land?</p>
              <p>Today, SKWIRREL is that answer — premium streetwear that carries the culture, the language, the festivals, and the pride of Odisha into every city in the world.</p>
            </div>
            <div className="mt-8 border-l-2 border-brand-orange pl-4">
              <p className="font-playfair italic text-brand-ivory">"Wear your culture with pride."</p>
              <p className="text-brand-orange text-xs tracking-wider uppercase mt-2">Founder, SKWIRREL</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
