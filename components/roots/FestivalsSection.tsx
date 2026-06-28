"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const FESTIVALS = [
  {
    name: "Rath Yatra",
    subtitle: "The Chariot of the Lord",
    desc: "Every year in Puri, millions gather to pull the massive chariots of Lord Jagannath through the streets. It is one of the largest human gatherings on earth — an act of devotion, community, and movement. We carry that spirit of motion forward.",
    color: "#E85A1C",
    tag: "June–July",
  },
  {
    name: "Durga Puja",
    subtitle: "The Victory of Light",
    desc: "Odisha's Durga Puja is celebrated with elaborate pandals, handcrafted idols, and a sense of collective joy that unites entire neighbourhoods. The craftsmanship in idol-making directly inspires our visual language.",
    color: "#c87941",
    tag: "October",
  },
  {
    name: "Raja Parba",
    subtitle: "Celebration of the Earth",
    desc: "A three-day festival honouring the earth's femininity and fertility. Women and girls swing on decorated jhulas, wear new clothes, and celebrate with traditional songs. A festival that connects land, culture, and identity.",
    color: "#8B6914",
    tag: "June",
  },
  {
    name: "Nuakhai",
    subtitle: "First Harvest",
    desc: "Western Odisha's most important festival — a thanksgiving for the new harvest. Communities come together, share the season's first rice, and reaffirm bonds of family and land. Humility and gratitude made into ritual.",
    color: "#5a8b14",
    tag: "August–September",
  },
];

export function FestivalsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section className="bg-brand-black py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="mb-12">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Festivals</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none">
            THE CALENDAR<br /><span className="text-brand-orange">OF JOY</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Tab buttons */}
          <div className="space-y-0">
            {FESTIVALS.map((f, i) => (
              <motion.button key={f.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => setActive(i)}
                className={`w-full text-left p-6 border-b border-white/5 transition-all group ${active === i ? "bg-brand-orange/5 border-l-2 border-l-brand-orange pl-5" : "hover:bg-white/3"}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-bebas text-xl tracking-wider transition-colors ${active === i ? "text-brand-orange" : "text-brand-ivory"}`}>{f.name}</p>
                    <p className="text-brand-gray text-xs mt-0.5">{f.subtitle}</p>
                  </div>
                  <span className="text-[0.55rem] tracking-wider text-brand-gray border border-white/10 px-2 py-1 flex-shrink-0">{f.tag}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Content panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 lg:p-12 bg-[#0d0d0d] flex flex-col justify-center"
          >
            <div className="w-12 h-[2px] mb-6" style={{ backgroundColor: FESTIVALS[active].color }} />
            <h3 className="font-bebas text-4xl text-brand-ivory mb-2">{FESTIVALS[active].name}</h3>
            <p className="font-playfair italic text-base mb-5" style={{ color: FESTIVALS[active].color }}>
              {FESTIVALS[active].subtitle}
            </p>
            <p className="text-brand-gray text-sm leading-relaxed">{FESTIVALS[active].desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
