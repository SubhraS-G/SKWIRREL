"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const COUNTERS = [
  { target: 24, suffix: "", label: "Cultural Stories" },
  { target: 1200, suffix: "+", label: "Happy Wearers" },
  { target: 18, suffix: "", label: "Artisan Partners" },
];

function Counter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <div ref={ref} className="border-l-2 border-brand-orange pl-4">
      <div className="font-bebas text-3xl text-brand-orange tracking-wider">{count}{suffix}</div>
      <div className="text-[0.6rem] tracking-[0.15em] text-brand-gray uppercase mt-0.5">{label}</div>
    </div>
  );
}

export function BrandStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0d0d0d] py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        {/* Visual */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] bg-gradient-to-br from-[#1a1208] via-[#2d1e0f] to-[#3d2810] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <span className="font-bebas text-[12rem] text-brand-orange leading-none select-none">SK</span>
            </div>
            {/* Year badge */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-brand-orange flex flex-col items-center justify-center">
              <span className="font-bebas text-3xl text-brand-ivory leading-none">25</span>
              <span className="text-[0.4rem] tracking-widest text-brand-ivory/70 uppercase">Est.</span>
            </div>
          </div>
          {/* Accent box */}
          <div className="absolute bottom-[-2rem] right-[-2rem] w-[55%] aspect-square bg-gradient-to-br from-[#2d1e0f] to-brand-orange/10 border-2 border-brand-orange hidden lg:block" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Our Story</p>
          <h2 className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none mb-6">
            CULTURE<br />BECOMES<br /><span className="text-brand-orange">CLOTHING.</span>
          </h2>
          <p className="text-brand-gray text-sm leading-relaxed mb-3">
            We grew up watching the{" "}
            <span className="text-brand-ivory">Rath Yatra processions</span>, hearing the beat of dhol at village fairs, tracing our fingers over{" "}
            <span className="text-brand-ivory">Sambalpuri weaves</span> on our grandmothers' sarees. That identity — vivid, proud, deeply rooted — had no place in mainstream fashion.
          </p>
          <p className="text-brand-gray text-sm leading-relaxed mb-8">
            So we made one.{" "}
            <span className="text-brand-ivory">SKWIRREL was born</span> to transform Odisha's culture, language, music, and memory into wearable fashion. Every piece tells a story you can carry with you.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {COUNTERS.map((c) => (
              <Counter key={c.label} {...c} />
            ))}
          </div>

          <Link
            href="/about"
            className="relative overflow-hidden inline-flex items-center gap-2 bg-brand-orange text-brand-ivory px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase group"
          >
            <span className="relative z-10">Discover Our Story</span>
            <span className="absolute inset-0 bg-brand-orange-dark -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
