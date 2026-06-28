"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#1a0f08] to-[#0d0804]" />

      {/* Video (when available) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E85A1C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Orange glow orb */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-brand-orange/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb-pulse" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-brand-orange text-[0.65rem] tracking-[0.5em] uppercase mb-6"
        >
          Bhubaneswar, Odisha — Est. 2025
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 flex flex-col items-center"
        >
          {/* Logo mark */}
          <svg width="70" height="70" viewBox="0 0 80 80" className="mb-4 opacity-90">
            <path
              d="M40 8 C28 8 18 16 14 27 C10 24 6 26 5 31 C4 36 8 40 13 39 C12 43 12 47 14 51 C10 53 8 58 11 62 C14 66 20 66 23 63 C27 67 33 70 40 70 C55 70 66 59 66 45 C66 40 64 35 61 31 C65 27 66 21 63 17 C60 13 54 12 50 15 C47 11 44 8 40 8 Z"
              fill="#E85A1C"
            />
            <circle cx="32" cy="35" r="3" fill="#0A0A0A" />
          </svg>
          <span className="font-bebas text-4xl tracking-[0.35em] text-brand-ivory">SKWIRREL</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-bebas text-[clamp(3rem,10vw,7.5rem)] leading-[0.88] tracking-tight text-brand-ivory mb-6"
        >
          BORN FROM
          <br />
          <span className="text-brand-orange">ODISHA.</span>
          <br />
          MADE FOR
          <br />
          THE WORLD.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="w-14 h-[2px] bg-brand-orange mx-auto my-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-brand-gray text-sm tracking-wider max-w-md mx-auto leading-relaxed mb-10"
        >
          More than clothing. It's memory, music, streets, language, and pride.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/shop"
            className="relative overflow-hidden bg-brand-orange text-brand-ivory px-10 py-4 text-[0.7rem] tracking-[0.25em] uppercase font-medium group"
          >
            <span className="relative z-10">Shop Now</span>
            <span className="absolute inset-0 bg-brand-orange-dark transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
          </Link>
          <Link
            href="/our-roots"
            className="border border-brand-ivory/30 text-brand-ivory px-10 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:border-brand-orange hover:text-brand-orange transition-all"
          >
            Explore Our Roots
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.55rem] tracking-[0.35em] text-brand-gray uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-brand-orange to-transparent animate-scroll-drop" />
      </motion.div>
    </section>
  );
}
