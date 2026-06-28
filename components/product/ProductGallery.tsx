"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  if (!images.length) return null;

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div className="relative aspect-[4/5] bg-[#111] overflow-hidden group">
          <Image
            src={images[active]}
            alt={`${name} — ${active + 1}`}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <button
            onClick={() => setZoomed(true)}
            className="absolute top-4 right-4 w-9 h-9 bg-brand-black/60 backdrop-blur-sm flex items-center justify-center text-brand-ivory opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-orange"
          >
            <ZoomIn size={14} />
          </button>
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-black/60 backdrop-blur-sm flex items-center justify-center text-brand-ivory opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-orange">
                <ChevronLeft size={16} />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-black/60 backdrop-blur-sm flex items-center justify-center text-brand-ivory opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-orange">
                <ChevronRight size={16} />
              </button>
            </>
          )}
          {/* Index */}
          <div className="absolute bottom-3 right-3 text-[0.6rem] text-brand-ivory/50 bg-brand-black/40 px-2 py-1 backdrop-blur-sm">
            {active + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative aspect-square bg-[#111] overflow-hidden border-2 transition-all ${active === i ? "border-brand-orange" : "border-transparent hover:border-brand-gray/30"}`}
              >
                <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setZoomed(false)}
          >
            <button className="absolute top-5 right-5 text-brand-ivory hover:text-brand-orange transition-colors z-10">
              <X size={26} />
            </button>
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative w-full max-w-2xl aspect-[4/5]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={name}
                fill
                className="object-contain"
                sizes="800px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
