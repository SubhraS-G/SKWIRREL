"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FACTS = [
  { year: "3rd C BCE", title: "Kalinga — Heart of an Empire", body: "The ancient kingdom of Kalinga, centred in what is now Odisha, was one of the most powerful states in South Asia. The Battle of Kalinga in 261 BCE transformed Emperor Ashoka and shaped the moral compass of an entire civilization." },
  { year: "7th–13th C", title: "The Temple Builders", body: "Odisha gave the world some of its most breathtaking sacred architecture — the Konark Sun Temple, the Jagannath Temple at Puri, and the Lingaraj Temple. Stone carved with devotion so deep it still speaks today." },
  { year: "Medieval Era", title: "Odissi — A Dance Form Is Born", body: "One of India's oldest classical dance traditions emerged from Odisha's temple precincts. Odissi's fluid movements, expressive gestures, and spiritual depth mirror the state's entire cultural philosophy." },
  { year: "Today", title: "A Culture That Refuses To Fade", body: "Despite centuries of change, Odisha's language, festivals, weaves, cuisine, and identity remain vibrantly alive — carried forward by 45 million people who wear their roots with pride." },
];

export function OdishaHistory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0d0d0d] py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">History</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none">
            A LAND THAT SHAPED<br /><span className="text-brand-orange">CIVILIZATIONS</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[80px] top-0 bottom-0 w-[1px] bg-brand-orange/15 hidden lg:block" />

          <div className="space-y-12">
            {FACTS.map((fact, i) => (
              <motion.div key={fact.year}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="lg:flex gap-10 items-start"
              >
                <div className="lg:w-24 flex-shrink-0 mb-3 lg:mb-0 relative">
                  <span className="font-bebas text-sm tracking-wider text-brand-orange/60">{fact.year}</span>
                  <div className="hidden lg:block absolute right-[-21px] top-1 w-3 h-3 border-2 border-brand-orange bg-brand-black rounded-full" />
                </div>
                <div className="lg:pl-8 flex-1">
                  <h3 className="font-playfair text-xl text-brand-ivory mb-2">{fact.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{fact.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
