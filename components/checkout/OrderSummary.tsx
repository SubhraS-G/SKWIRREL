"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { useState } from "react";
import toast from "react-hot-toast";

export function OrderSummary() {
  const { items, subtotal, discount, shipping, total, applyCoupon, coupon, removeCoupon } = useCartStore();
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);

  const handleApplyCoupon = async () => {
    if (!code.trim()) return;
    setApplying(true);
    try {
      const res = await fetch(`/api/coupons?code=${code.toUpperCase()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      applyCoupon({ code: data.code, discount: data.value, type: data.type });
      toast.success(`Coupon applied! ${data.type === "percentage" ? `${data.value}% off` : `₹${data.value} off`}`);
    } catch (err: any) {
      toast.error(err.message ?? "Invalid coupon");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="bg-[#0d0d0d] p-6 sticky top-24">
      <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mb-5">ORDER SUMMARY</h3>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-14 h-16 bg-[#1a1a1a] flex-shrink-0">
              {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-orange text-brand-ivory text-[0.6rem] rounded-full flex items-center justify-center font-medium">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-brand-ivory text-xs leading-snug truncate">{item.name}</p>
              {(item.size || item.color) && (
                <p className="text-brand-gray text-[0.6rem] mt-0.5">{[item.size, item.color].filter(Boolean).join(" · ")}</p>
              )}
            </div>
            <span className="text-brand-orange text-xs font-medium">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      {/* Coupon */}
      {!coupon ? (
        <div className="flex gap-2 mb-5">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Coupon code"
            className="flex-1 bg-transparent border border-white/10 text-brand-ivory px-3 py-2 text-xs outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40 uppercase tracking-wider"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={applying}
            className="bg-brand-orange/10 border border-brand-orange text-brand-orange px-3 py-2 text-xs tracking-wider hover:bg-brand-orange hover:text-brand-ivory transition-all disabled:opacity-50"
          >
            {applying ? "..." : "Apply"}
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center bg-brand-orange/10 border border-brand-orange/30 px-3 py-2 mb-5">
          <span className="text-brand-orange text-xs tracking-wider">{coupon.code} applied</span>
          <button onClick={removeCoupon} className="text-brand-gray text-xs hover:text-brand-orange transition-colors">Remove</button>
        </div>
      )}

      {/* Totals */}
      <div className="space-y-2 border-t border-white/5 pt-4">
        <div className="flex justify-between text-xs text-brand-gray">
          <span>Subtotal</span>
          <span className="text-brand-ivory">₹{subtotal().toLocaleString("en-IN")}</span>
        </div>
        {discount() > 0 && (
          <div className="flex justify-between text-xs text-green-400">
            <span>Discount</span>
            <span>−₹{discount().toLocaleString("en-IN")}</span>
          </div>
        )}
        <div className="flex justify-between text-xs text-brand-gray">
          <span>Shipping</span>
          <span className={shipping() === 0 ? "text-green-400" : "text-brand-ivory"}>
            {shipping() === 0 ? "Free" : `₹${shipping()}`}
          </span>
        </div>
        <div className="flex justify-between pt-3 border-t border-white/5">
          <span className="text-brand-ivory text-sm font-medium">Total</span>
          <span className="font-bebas text-2xl tracking-wider text-brand-orange">
            ₹{total().toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <p className="text-brand-gray text-[0.6rem] mt-4 text-center">
        🔒 Secure checkout · SSL encrypted
      </p>
    </div>
  );
}
