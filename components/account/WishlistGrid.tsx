"use client";

import { useWishlistStore } from "@/hooks/useWishlistStore";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { Heart } from "lucide-react";

export function WishlistGrid() {
  const { items } = useWishlistStore();

  if (!items.length) {
    return (
      <div className="bg-[#0d0d0d] border border-white/5 p-12 text-center">
        <Heart size={36} className="text-brand-gray/30 mx-auto mb-4" />
        <p className="text-brand-gray text-sm mb-4">Your wishlist is empty.</p>
        <Link href="/shop" className="text-brand-orange text-xs tracking-wider uppercase hover:underline">
          Browse Collection →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-brand-gray text-sm mb-6">
        <span className="text-brand-ivory">{items.length}</span> saved item{items.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <Link key={item.productId} href={`/shop/${item.slug}`} className="group block">
            <div className="aspect-[3/4] bg-[#111] mb-3 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-gray/20">
                <span className="font-bebas text-4xl">SKW</span>
              </div>
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-all" />
            </div>
            <p className="font-playfair text-sm text-brand-ivory group-hover:text-brand-orange transition-colors truncate">{item.name}</p>
            <p className="font-bebas text-base tracking-wider text-brand-orange mt-1">₹{item.price.toLocaleString("en-IN")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
