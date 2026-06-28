"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: { name: string };
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(query)}&limit=5`);
        const data = await res.json();
        setResults(data.products ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const TRENDING = ["Temple Gate Tee", "Konark Hoodie", "Sambalpuri Print", "Oversized Fits"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-brand-black/95 backdrop-blur-xl z-[60] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center gap-4 px-6 lg:px-12 py-6 border-b border-white/5">
            <Search size={20} className="text-brand-orange flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 bg-transparent text-brand-ivory text-lg placeholder:text-brand-gray/40 outline-none"
            />
            <button onClick={onClose} className="text-brand-gray hover:text-brand-ivory transition-colors">
              <X size={22} />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 max-w-3xl w-full mx-auto">
            {!query && (
              <div>
                <p className="text-[0.6rem] tracking-[0.3em] text-brand-orange uppercase mb-4">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      className="border border-white/10 text-brand-gray text-xs px-4 py-2 hover:border-brand-orange hover:text-brand-orange transition-all"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && query && results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-brand-gray text-sm">No results for "<span className="text-brand-ivory">{query}</span>"</p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="space-y-1">
                <p className="text-[0.6rem] tracking-[0.3em] text-brand-orange uppercase mb-4">Results</p>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 hover:bg-white/5 transition-colors group"
                  >
                    <div className="relative w-12 h-14 bg-[#1a1a1a] flex-shrink-0">
                      {product.images[0] && (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-brand-ivory text-sm group-hover:text-brand-orange transition-colors">{product.name}</p>
                      <p className="text-brand-gray text-xs">{product.category?.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bebas text-base tracking-wider text-brand-orange">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>
                      <ArrowRight size={14} className="text-brand-gray group-hover:text-brand-orange transition-colors" />
                    </div>
                  </Link>
                ))}
                {results.length >= 5 && (
                  <Link
                    href={`/shop?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="block text-center pt-4 text-xs text-brand-orange tracking-wider uppercase hover:underline"
                  >
                    View all results →
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
