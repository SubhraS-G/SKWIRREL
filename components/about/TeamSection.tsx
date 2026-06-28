"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const TEAM = [
  { name: "Founder & Creative Director", role: "Vision · Design · Culture", initial: "F" },
  { name: "Head of Production", role: "Quality · Supply Chain · Materials", initial: "P" },
  { name: "Community Manager", role: "Social · Stories · Customer Love", initial: "C" },
];

export function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-brand-black py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">People</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none">
            THE PEOPLE<br /><span className="text-brand-orange">BEHIND IT</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {TEAM.map((member, i) => (
            <motion.div key={member.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/5] bg-[#111] mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bebas text-[6rem] text-brand-orange/10 group-hover:text-brand-orange/20 transition-colors">{member.initial}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
              <p className="font-playfair text-brand-ivory text-base">{member.name}</p>
              <p className="text-brand-orange text-[0.6rem] tracking-wider uppercase mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="bg-[#0d0d0d] border border-white/5 p-8 lg:p-12 text-center"
        >
          <p className="font-bebas text-3xl lg:text-4xl text-brand-ivory mb-3">WANT TO JOIN THE MOVEMENT?</p>
          <p className="text-brand-gray text-sm mb-6 max-w-md mx-auto">We're always looking for passionate people who believe culture is worth wearing.</p>
          <Link href="/contact"
            className="inline-block border border-brand-orange text-brand-orange px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-brand-orange hover:text-brand-ivory transition-all">
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
