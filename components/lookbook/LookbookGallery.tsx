"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LookbookImage {
  id: string;
  url: string;
  alt?: string | null;
  category?: string | null;
}

export function LookbookGallery({ images }: { images: LookbookImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % images.length : null));

  if (!images.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-brand-gray text-sm">Lookbook images coming soon.</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2 mt-8">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="break-inside-avoid overflow-hidden cursor-pointer group"
            onClick={() => setLightbox(i)}
          >
            <div className="relative bg-[#111] overflow-hidden">
              <Image
                src={img.url}
                alt={img.alt ?? "SKWIRREL Lookbook"}
                width={600}
                height={800}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/30 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 text-brand-ivory hover:text-brand-orange transition-colors z-10" onClick={() => setLightbox(null)}>
              <X size={26} />
            </button>
            <button className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-ivory hover:text-brand-orange transition-colors z-10" onClick={(e) => { e.stopPropagation(); prev(); }}>
              <ChevronLeft size={32} />
            </button>
            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-ivory hover:text-brand-orange transition-colors z-10" onClick={(e) => { e.stopPropagation(); next(); }}>
              <ChevronRight size={32} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-h-[85vh] max-w-2xl w-full px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox].url}
                alt={images[lightbox].alt ?? ""}
                width={800}
                height={1000}
                className="w-full h-full object-contain max-h-[85vh]"
              />
              <p className="text-center text-brand-gray text-xs mt-3">
                {lightbox + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
