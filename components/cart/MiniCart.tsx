"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";

interface MiniCartProps {
  open: boolean;
  onClose: () => void;
}

export function MiniCart({ open, onClose }: MiniCartProps) {
  const { items, removeItem, updateQuantity, subtotal, total, shipping } = useCartStore();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d0d0d] z-50 flex flex-col border-l border-white/5"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-brand-orange" />
                <span className="font-bebas text-xl tracking-wider text-brand-ivory">
                  CART ({items.length})
                </span>
              </div>
              <button onClick={onClose} className="text-brand-gray hover:text-brand-ivory">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-brand-gray/30 mb-4" />
                  <p className="text-brand-gray text-sm">Your cart is empty</p>
                  <button onClick={onClose} className="mt-4 text-brand-orange text-xs tracking-wider uppercase underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-24 bg-[#1a1a1a] flex-shrink-0">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-brand-ivory font-medium leading-snug mb-1 truncate">{item.name}</p>
                      {(item.size || item.color) && (
                        <p className="text-[0.6rem] text-brand-gray mb-2">
                          {[item.size, item.color].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-white/10">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-brand-gray hover:text-brand-ivory text-sm">−</button>
                          <span className="w-7 h-7 flex items-center justify-center text-brand-ivory text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-brand-gray hover:text-brand-ivory text-sm">+</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(item.id)} className="text-brand-gray hover:text-brand-orange transition-colors">
                        <Trash2 size={13} />
                      </button>
                      <span className="font-bebas text-base tracking-wider text-brand-orange">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-3">
                <div className="flex justify-between text-xs text-brand-gray">
                  <span>Subtotal</span>
                  <span className="text-brand-ivory">₹{subtotal().toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-gray">
                  <span>Shipping</span>
                  <span className={shipping() === 0 ? "text-green-400" : "text-brand-ivory"}>
                    {shipping() === 0 ? "Free" : `₹${shipping()}`}
                  </span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t border-white/5">
                  <span className="text-brand-ivory text-sm">Total</span>
                  <span className="font-bebas text-xl tracking-wider text-brand-orange">
                    ₹{total().toLocaleString("en-IN")}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full bg-brand-orange text-brand-ivory text-center py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-brand-orange-dark transition-colors mt-4"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="block w-full border border-brand-gray/30 text-brand-gray text-center py-3 text-[0.65rem] tracking-[0.2em] uppercase hover:border-brand-ivory hover:text-brand-ivory transition-colors"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
