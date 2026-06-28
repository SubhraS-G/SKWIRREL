"use client";

import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";
import { ShieldCheck, Truck } from "lucide-react";

export function CartSummary() {
  const { subtotal, discount, shipping, total, coupon } = useCartStore();

  return (
    <div className="bg-[#0d0d0d] border border-white/5 p-6 sticky top-24">
      <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mb-5">ORDER SUMMARY</h3>

      <div className="space-y-3 mb-5">
        <div className="flex justify-between text-sm text-brand-gray">
          <span>Subtotal</span>
          <span className="text-brand-ivory">₹{subtotal().toLocaleString("en-IN")}</span>
        </div>
        {discount() > 0 && (
          <div className="flex justify-between text-sm text-green-400">
            <span>Discount {coupon ? `(${coupon.code})` : ""}</span>
            <span>−₹{discount().toLocaleString("en-IN")}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-brand-gray">
          <span>Shipping</span>
          {shipping() === 0 ? (
            <span className="text-green-400">Free</span>
          ) : (
            <span className="text-brand-ivory">₹{shipping()}</span>
          )}
        </div>
        <div className="flex justify-between pt-3 border-t border-white/5">
          <span className="text-brand-ivory font-medium">Total</span>
          <span className="font-bebas text-2xl tracking-wider text-brand-orange">
            ₹{total().toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="block w-full bg-brand-orange text-brand-ivory text-center py-4 font-bebas text-xl tracking-widest hover:bg-brand-orange-dark transition-colors"
      >
        Proceed to Checkout
      </Link>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-brand-gray">
          <ShieldCheck size={13} className="text-brand-orange flex-shrink-0" />
          <span className="text-xs">Secure SSL checkout</span>
        </div>
        <div className="flex items-center gap-2 text-brand-gray">
          <Truck size={13} className="text-brand-orange flex-shrink-0" />
          <span className="text-xs">Free shipping over ₹999</span>
        </div>
      </div>

      {shipping() > 0 && (
        <p className="text-[0.6rem] text-brand-gray/60 mt-3">
          Add ₹{(999 - subtotal()).toLocaleString("en-IN")} more for free shipping
        </p>
      )}
    </div>
  );
}
