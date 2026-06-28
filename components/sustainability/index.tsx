"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ─── SustainHero ─── */
export function SustainHero() {
  return (
    <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-brand-ivory">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='%23E85A1C' fill-opacity='0.5'/%3E%3C/svg%3E")` }} />
      <div className="relative z-10 px-6 lg:px-12 max-w-screen-xl mx-auto w-full">
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-brand-orange-dark text-[0.65rem] tracking-[0.5em] uppercase mb-4">Sustainability</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-bebas text-[clamp(3.5rem,10vw,8rem)] leading-none text-brand-black max-w-3xl">
          FROM NATURE.<br /><span className="text-brand-orange">MADE TO WEAR.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-brand-gray text-sm leading-relaxed max-w-xl mt-6">
          We're building a fashion brand that respects the earth as much as the culture it celebrates.
          This isn't greenwashing — this is a genuine commitment we make with every product we create.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── FabricSection ─── */
export function FabricSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-brand-black py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}>
            <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">The Fabric</p>
            <h2 className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none mb-6">
              WOOD PULP &<br /><span className="text-brand-orange">COTTON BLEND</span>
            </h2>
            <div className="space-y-4 text-brand-gray text-sm leading-relaxed">
              <p>We are developing a proprietary fabric blend from <span className="text-brand-ivory">wood pulp fibres (lyocell/modal)</span> and <span className="text-brand-ivory">GOTS-certified organic cotton</span>. This combination gives us the best of both worlds — the softness and drape of natural wood-derived fibres with the breathability and durability of cotton.</p>
              <p>Wood pulp fibres are produced in a <span className="text-brand-ivory">closed-loop process</span> — 99% of the chemicals used in production are recovered and recycled. The raw material comes from FSC-certified sustainably managed forests.</p>
              <p>The result is a fabric that feels premium, performs beautifully, and leaves a fraction of the environmental footprint of conventional alternatives.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 }}
            className="grid grid-cols-2 gap-4">
            {[
              { label: "Wood Pulp", stat: "99%", sub: "Chemical recovery rate in production", color: "border-brand-orange" },
              { label: "Organic Cotton", stat: "0%", sub: "Synthetic pesticides used", color: "border-green-500" },
              { label: "Water Usage", stat: "−50%", sub: "vs conventional cotton", color: "border-blue-400" },
              { label: "Carbon Footprint", stat: "−40%", sub: "vs standard polyester", color: "border-purple-400" },
            ].map((s) => (
              <div key={s.label} className={`bg-[#0d0d0d] border-t-2 ${s.color} p-5`}>
                <p className="font-bebas text-3xl text-brand-ivory">{s.stat}</p>
                <p className="text-[0.6rem] tracking-[0.2em] text-brand-orange uppercase mt-1 mb-1">{s.label}</p>
                <p className="text-brand-gray text-xs">{s.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── EthicalSourcing ─── */
export function EthicalSourcing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const STEPS = [
    { num: "01", title: "Certified Raw Materials", desc: "All fibres sourced from certified suppliers — FSC for wood pulp, GOTS for cotton." },
    { num: "02", title: "Ethical Manufacturing", desc: "Produced in verified facilities with fair wages, safe conditions, and zero child labour." },
    { num: "03", title: "Water-Based Inks", desc: "All screen printing uses water-based inks — no PVC, no phthalates, no toxic discharge." },
    { num: "04", title: "Quality Over Quantity", desc: "Small-batch production. We make less, but make it better — reducing waste at the source." },
  ];

  return (
    <section className="bg-[#0d0d0d] py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Process</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none">
            HOW WE <span className="text-brand-orange">SOURCE & MAKE</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {STEPS.map((step, i) => (
            <motion.div key={step.num}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.09 }}
              className="border border-white/5 p-8 hover:border-brand-orange/30 transition-colors"
            >
              <p className="font-bebas text-4xl text-brand-orange/20 mb-4">{step.num}</p>
              <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mb-3">{step.title}</h3>
              <p className="text-brand-gray text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PackagingSection ─── */
export function PackagingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-brand-ivory py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="aspect-[4/3] bg-brand-beige flex items-center justify-center relative overflow-hidden"
          >
            <div className="text-center p-8">
              <div className="w-32 h-40 border-2 border-brand-orange mx-auto mb-4 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-bebas text-xs tracking-widest text-brand-orange">SKWIRREL</p>
                  <p className="text-[0.5rem] text-brand-gray mt-1">Recycled · Biodegradable</p>
                </div>
              </div>
              <p className="text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase">Our Packaging</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <p className="text-brand-orange-dark text-[0.65rem] tracking-[0.4em] uppercase mb-3">Packaging</p>
            <h2 className="font-bebas text-5xl text-brand-black leading-none mb-6">
              THE BOX IS<br /><span className="text-brand-orange">PART OF IT TOO</span>
            </h2>
            <div className="space-y-4 text-brand-gray text-sm leading-relaxed mb-8">
              <p>We use <span className="text-brand-black">100% recycled and recyclable packaging</span>. Our mailers are made from post-consumer waste. Our tissue paper is FSC-certified. Our stickers use water-based adhesives.</p>
              <p>We've eliminated all single-use plastic from our packaging chain. And our packaging design is intentionally beautiful — made to be reused, not thrown away.</p>
            </div>
            <div className="space-y-3">
              {["100% recycled mailers", "FSC-certified tissue paper", "Zero plastic packaging", "Soy-based printing inks", "Carbon-neutral shipping (in progress)"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-brand-orange flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-ivory text-[0.6rem]">✓</span>
                  </div>
                  <span className="text-brand-black text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── OurPromise ─── */
export function OurPromise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-brand-orange py-24 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          ref={ref}
          className="text-brand-ivory/60 text-[0.65rem] tracking-[0.5em] uppercase mb-4">Our Promise</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          className="font-bebas text-5xl lg:text-7xl text-brand-ivory leading-none mb-6">
          THIS ISN'T JUST<br />FABRIC.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          className="text-brand-ivory/80 text-base leading-relaxed mb-3 font-playfair italic">
          "This is our next step."
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="text-brand-ivory/70 text-sm leading-relaxed max-w-xl mx-auto mb-10">
          Every season we commit to reducing our environmental impact. We publish our progress honestly — including what we haven't achieved yet. Because sustainability isn't a destination, it's a direction.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
          <Link href="/shop"
            className="inline-block bg-brand-black text-brand-ivory px-10 py-4 text-[0.7rem] tracking-[0.3em] uppercase hover:bg-[#1a1a1a] transition-colors">
            Shop Consciously
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
