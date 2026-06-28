"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";

export function CartItems() {
  const { items, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-[#0d0d0d] border border-white/5 p-12 text-center">
        <p className="text-brand-gray text-sm mb-4">Your cart is empty.</p>
        <Link href="/shop" className="text-brand-orange text-xs tracking-wider uppercase hover:underline">
          Browse Collection →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-3 border-b border-white/5">
        {["Product", "Price", "Quantity", ""].map((h) => (
          <span key={h} className="text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase">{h}</span>
        ))}
      </div>

      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center py-5 border-b border-white/5">
          {/* Product */}
          <div className="flex gap-4">
            <Link href={`/shop/${item.slug}`} className="relative w-20 h-24 bg-[#111] flex-shrink-0 hover:opacity-80 transition-opacity">
              {item.image && (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              )}
            </Link>
            <div className="flex flex-col justify-center">
              <Link href={`/shop/${item.slug}`} className="text-brand-ivory text-sm hover:text-brand-orange transition-colors">
                {item.name}
              </Link>
              <div className="flex gap-2 mt-1.5">
                {item.size && (
                  <span className="text-[0.6rem] tracking-wider text-brand-gray border border-white/10 px-2 py-0.5">
                    {item.size}
                  </span>
                )}
                {item.color && (
                  <span className="text-[0.6rem] tracking-wider text-brand-gray border border-white/10 px-2 py-0.5 flex items-center gap-1">
                    {item.colorHex && (
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.colorHex }} />
                    )}
                    {item.color}
                  </span>
                )}
              </div>
              {/* Mobile price */}
              <span className="font-bebas text-base tracking-wider text-brand-orange mt-2 sm:hidden">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Price (desktop) */}
          <span className="hidden sm:block font-bebas text-base tracking-wider text-brand-orange">
            ₹{item.price.toLocaleString("en-IN")}
          </span>

          {/* Quantity */}
          <div className="flex items-center border border-white/10 w-fit">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-brand-gray hover:text-brand-ivory transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-brand-ivory text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.maxStock}
              className="w-8 h-8 flex items-center justify-center text-brand-gray hover:text-brand-ivory transition-colors disabled:opacity-30"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.id)}
            className="text-brand-gray hover:text-brand-orange transition-colors justify-self-end"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
