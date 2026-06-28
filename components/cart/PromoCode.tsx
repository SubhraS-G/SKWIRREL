"use client";

import { useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { Tag, X } from "lucide-react";
import toast from "react-hot-toast";

export function PromoCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { coupon, applyCoupon, removeCoupon } = useCartStore();

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/coupons?code=${code.toUpperCase()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      applyCoupon({ code: data.code, discount: data.value, type: data.type });
      setCode("");
      toast.success(`${data.type === "percentage" ? `${data.value}% off` : `₹${data.value} off`} applied!`);
    } catch (err: any) {
      toast.error(err.message ?? "Invalid coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d0d0d] border border-white/5 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Tag size={14} className="text-brand-orange" />
        <span className="text-[0.65rem] tracking-[0.25em] text-brand-gray uppercase">Promo Code</span>
      </div>

      {coupon ? (
        <div className="flex justify-between items-center bg-brand-orange/5 border border-brand-orange/20 px-4 py-3">
          <div>
            <span className="text-brand-orange text-sm font-medium tracking-wider">{coupon.code}</span>
            <p className="text-brand-gray text-xs mt-0.5">
              {coupon.type === "percentage" ? `${coupon.discount}% off` : `₹${coupon.discount} off`}
            </p>
          </div>
          <button onClick={removeCoupon} className="text-brand-gray hover:text-brand-orange transition-colors">
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Enter code"
            className="flex-1 bg-transparent border border-white/10 text-brand-ivory px-3 py-2.5 text-xs outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40 uppercase tracking-widest"
          />
          <button
            onClick={handleApply}
            disabled={loading || !code.trim()}
            className="bg-brand-orange/10 border border-brand-orange text-brand-orange px-5 py-2.5 text-xs tracking-wider hover:bg-brand-orange hover:text-brand-ivory transition-all disabled:opacity-40"
          >
            {loading ? "..." : "Apply"}
          </button>
        </div>
      )}
    </div>
  );
}
