"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ODIA_WORDS = [
  { word: "ଜୀବନ", roman: "Jiban", meaning: "Life" },
  { word: "ସ୍ବପ୍ନ", roman: "Swapna", meaning: "Dream" },
  { word: "ଶ୍ରେଷ୍ଠ", roman: "Shretha", meaning: "Excellence" },
  { word: "ଆକାଶ", roman: "Akash", meaning: "Sky" },
  { word: "ମାଟି", roman: "Maati", meaning: "Soil / Earth" },
  { word: "ଭୂମି", roman: "Bhoomi", meaning: "Land" },
];

export function MusicLanguage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0d0d0d] py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Language */}
          <div ref={ref}>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Language</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-bebas text-4xl lg:text-5xl text-brand-ivory leading-none mb-5">
              ODIA — THE LANGUAGE<br /><span className="text-brand-orange">ON OUR SKIN</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
              className="text-brand-gray text-sm leading-relaxed mb-8">
              Odia is one of India's classical languages — with a rich literary tradition spanning over a thousand years. Its script is fluid, circular, and unmistakable. We bring Odia onto fabric — because language is identity made visible.
            </motion.p>

            <div className="grid grid-cols-2 gap-3">
              {ODIA_WORDS.map((w, i) => (
                <motion.div key={w.roman}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className="bg-brand-black border border-white/5 p-4 hover:border-brand-orange/30 transition-colors"
                >
                  <p className="font-bebas text-2xl text-brand-orange mb-0.5">{w.word}</p>
                  <p className="text-brand-ivory text-xs">{w.roman}</p>
                  <p className="text-brand-gray text-[0.6rem] tracking-wider uppercase">{w.meaning}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Music */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Music</p>
            <h2 className="font-bebas text-4xl lg:text-5xl text-brand-ivory leading-none mb-5">
              THE SOUND OF<br /><span className="text-brand-orange">ODISHA</span>
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed mb-8">
              From the devotional Odissi music of temple corridors to the folk beats of Sambalpuri Dalkhai, from the soulful Odia pop of today to the tribal rhythms of the Eastern Ghats — Odisha's music is as layered as its culture.
            </p>

            <div className="space-y-3">
              {[
                { genre: "Odissi Classical", desc: "Ancient devotional music tied to temple worship and classical dance" },
                { genre: "Sambalpuri Folk", desc: "Energetic folk music from western Odisha, driving Dalkhai and Karma dances" },
                { genre: "Jhoomar", desc: "Soulful, slow-tempo music from the Sonepur belt, often sung at harvest time" },
                { genre: "Modern Odia Pop", desc: "Contemporary artists fusing traditional Odia melodies with modern production" },
              ].map((item, i) => (
                <motion.div key={item.genre}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex gap-4 items-start border-b border-white/5 pb-3 last:border-0"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-brand-ivory text-sm">{item.genre}</p>
                    <p className="text-brand-gray text-xs mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
