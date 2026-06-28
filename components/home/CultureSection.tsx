"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ITEMS = [
  {
    num: "01",
    title: "Rath Yatra — The Chariot Festival",
    desc: "One of the world's greatest gatherings. We carry its spirit of movement, devotion, and togetherness into every stitch.",
  },
  {
    num: "02",
    title: "Sambalpuri Weaves",
    desc: "Ikat patterns born in the looms of western Odisha. Ancient geometry reinterpreted for contemporary streetwear.",
  },
  {
    num: "03",
    title: "Odissi Dance",
    desc: "The sculptural grace of one of India's oldest classical dance forms. Fluidity and strength woven into our design language.",
  },
  {
    num: "04",
    title: "Coastal Heritage",
    desc: "Puri's shores, Chilika's waters, and the fishermen's boats — the rhythms of coastal life shape our palette and patterns.",
  },
];

export function CultureSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[#0d0d0d] py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div ref={ref}>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-[0.65rem] tracking-[0.4em] text-brand-orange uppercase mb-3"
            >
              Rooted In
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none mb-10"
            >
              THE SOUL<br />OF <span className="text-brand-orange">ODISHA</span>
            </motion.h2>

            <div className="space-y-0">
              {ITEMS.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex gap-5 py-5 border-b border-white/5 cursor-default transition-all duration-300 ${hovered === i ? "pl-2" : "pl-0"}`}
                >
                  <span className={`font-bebas text-base mt-0.5 min-w-[30px] transition-colors duration-300 ${hovered === i ? "text-brand-orange" : "text-white/15"}`}>
                    {item.num}
                  </span>
                  <div>
                    <p className="font-playfair text-brand-ivory text-sm mb-1 leading-snug">{item.title}</p>
                    <p className="text-brand-gray text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map visual */}
          <div className="hidden lg:block sticky top-24">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#0f1a0f] to-[#1a2d1a] relative overflow-hidden flex items-center justify-center">
              <span className="font-bebas text-[9rem] text-brand-orange/5 select-none leading-none tracking-widest">ODISHA</span>
              {/* SVG map outline */}
              <svg
                viewBox="0 0 200 260"
                className="absolute inset-0 w-full h-full p-8 opacity-20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 20 C130 20 160 40 170 75 C182 110 175 145 162 168 C150 190 136 210 118 222 C108 230 100 234 90 228 C74 218 58 202 48 180 C37 155 33 124 38 94 C43 62 65 38 100 20 Z"
                  stroke="#E85A1C"
                  strokeWidth="1.5"
                />
                {/* City dots */}
                <circle cx="100" cy="148" r="5" fill="#E85A1C" />
                <text x="108" y="152" fontSize="8" fill="#E85A1C" fontFamily="Arial">Bhubaneswar</text>
                <circle cx="112" cy="118" r="3" fill="rgba(232,90,28,0.5)" />
                <text x="118" y="122" fontSize="7" fill="rgba(232,90,28,0.5)" fontFamily="Arial">Cuttack</text>
                <circle cx="82" cy="172" r="3" fill="rgba(232,90,28,0.5)" />
                <text x="88" y="176" fontSize="7" fill="rgba(232,90,28,0.5)" fontFamily="Arial">Puri</text>
                <circle cx="72" cy="90" r="3" fill="rgba(232,90,28,0.5)" />
                <text x="78" y="94" fontSize="7" fill="rgba(232,90,28,0.5)" fontFamily="Arial">Sambalpur</text>
              </svg>
              {/* Label */}
              <div className="absolute bottom-6 left-6">
                <p className="font-bebas text-4xl tracking-[0.3em] text-brand-orange/20">ଓଡ଼ିଶା</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
