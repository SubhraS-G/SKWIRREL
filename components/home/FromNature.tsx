"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CARDS = [
  {
    title: "Wood Pulp",
    icon: (
      <svg viewBox="0 0 50 50" fill="none" className="w-10 h-10">
        <path d="M25 5L25 45M15 15Q25 10 35 15M10 25Q25 18 40 25M12 35Q25 28 38 35" stroke="#E85A1C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    body: "Renewable. Responsibly sourced. Naturally strong. Certified forestry partners ensure every fibre is harvested with respect.",
    bg: "bg-brand-beige",
    textColor: "text-[#1a1208]",
  },
  {
    title: "Cotton",
    icon: (
      <svg viewBox="0 0 50 50" fill="none" className="w-10 h-10">
        <circle cx="25" cy="20" r="12" stroke="#E85A1C" strokeWidth="2" />
        <path d="M18 32Q25 42 32 32" stroke="#E85A1C" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 38Q25 48 36 38" stroke="#E85A1C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    body: "Natural. Breathable. Timeless comfort. Ethically sourced from Indian farmers who share our commitment to quality.",
    bg: "bg-[#ddd5c8]",
    textColor: "text-[#1a1208]",
  },
  {
    title: "Our Promise",
    icon: (
      <svg viewBox="0 0 50 50" fill="none" className="w-10 h-10">
        <path d="M10 40L25 10L40 40Z" stroke="#E85A1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 28L25 15L32 28" stroke="#E85A1C" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    body: "Lower impact. Thoughtful process. Made to last. Made with care. This isn't just fabric — this is our next step.",
    bg: "bg-brand-black",
    textColor: "text-brand-ivory",
    dark: true,
  },
];

export function FromNature() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-brand-ivory py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[0.65rem] tracking-[0.4em] text-brand-orange-dark uppercase mb-3"
          >
            Sustainability
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bebas text-5xl lg:text-7xl text-brand-black leading-none"
          >
            FROM NATURE.<br />
            <span className="text-brand-orange">MADE TO WEAR.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-brand-gray text-sm max-w-md mt-4 leading-relaxed"
          >
            We're developing a fabric made from wood pulp and cotton — a smarter, cleaner, more mindful way to create what you wear.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className={`${card.bg} p-8 lg:p-10 relative group overflow-hidden`}
            >
              <span className="absolute top-5 right-5 text-brand-orange text-xl select-none">✦</span>
              <div className="mb-5">{card.icon}</div>
              <h3 className={`font-bebas text-2xl lg:text-3xl tracking-wider mb-4 ${card.dark ? "text-brand-orange" : "text-[#1a1208]"}`}>
                {card.title}
              </h3>
              <p className={`text-sm leading-relaxed ${card.dark ? "text-brand-ivory/60" : "text-brand-gray"}`}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 font-playfair italic text-lg text-brand-black"
        >
          This isn't just fabric.{" "}
          <span className="text-brand-orange not-italic font-semibold">This is our next step.</span>
        </motion.p>

        <div className="text-center mt-6">
          <Link
            href="/sustainability"
            className="text-[0.65rem] tracking-[0.3em] text-brand-orange-dark uppercase border-b border-brand-orange pb-0.5 hover:opacity-70 transition-opacity"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
}
