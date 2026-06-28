"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ITEMS = [
  { label: "SS 2025 Collection", aspect: "tall", bg: "from-[#1a1208] to-[#3d2010]" },
  { label: "Konark Series", aspect: "short", bg: "from-[#0d1a1a] to-[#0f2a2a]" },
  { label: "Odissi Movement", aspect: "short", bg: "from-[#1e1208] to-[#2d1e0f]" },
  { label: "Sambalpuri Edit", aspect: "short", bg: "from-[#141414] to-[#2a1a0a]" },
  { label: "Root Stories", aspect: "short", bg: "from-[#1a0d08] to-[#2d1208]" },
];

export function LookbookPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <section className="bg-brand-black py-20 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <div ref={ref} className="flex justify-between items-end mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-2">Visual Stories</p>
            <h2 className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none">
              THE <span className="text-brand-orange">LOOKBOOK</span>
            </h2>
          </motion.div>
          <Link href="/lookbook" className="text-[0.65rem] tracking-[0.25em] text-brand-orange uppercase border-b border-brand-orange pb-0.5 hover:opacity-70 transition-opacity hidden sm:block">
            View All →
          </Link>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-1.5">
          {/* First item spans 2 rows */}
          <div
            className="lg:row-span-2 overflow-hidden group cursor-pointer relative"
            onClick={() => setActiveModal(0)}
          >
            <div className={`w-full h-full min-h-[300px] lg:min-h-[500px] bg-gradient-to-br ${ITEMS[0].bg} flex items-end transition-transform duration-700 group-hover:scale-[1.02]`}>
              <span className="text-[0.6rem] tracking-[0.2em] text-brand-ivory/40 uppercase p-4 group-hover:text-brand-orange transition-colors">
                {ITEMS[0].label}
              </span>
            </div>
          </div>

          {ITEMS.slice(1).map((item, i) => (
            <div
              key={i}
              className="overflow-hidden group cursor-pointer relative"
              onClick={() => setActiveModal(i + 1)}
            >
              <div className={`w-full h-full min-h-[140px] lg:min-h-[245px] bg-gradient-to-br ${item.bg} flex items-end transition-transform duration-700 group-hover:scale-[1.03]`}>
                <span className="text-[0.6rem] tracking-[0.2em] text-brand-ivory/40 uppercase p-3 group-hover:text-brand-orange transition-colors">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setActiveModal(null)}
          >
            <button className="absolute top-6 right-6 text-brand-ivory hover:text-brand-orange transition-colors">
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`w-full max-w-lg aspect-[3/4] bg-gradient-to-br ${ITEMS[activeModal].bg}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <p className="text-[0.6rem] tracking-[0.3em] text-brand-orange uppercase">{ITEMS[activeModal].label}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
