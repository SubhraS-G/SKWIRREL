"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

export function ShippingEstimate() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<{ days: string; free: boolean } | null>(null);

  const estimate = () => {
    if (pincode.length !== 6) return;
    // Simplified: Odisha pincodes start with 75 or 76 = 2-3 days, others = 4-7
    const isOdisha = pincode.startsWith("75") || pincode.startsWith("76");
    setResult({ days: isOdisha ? "2–3 business days" : "4–7 business days", free: false });
  };

  return (
    <div className="bg-[#0d0d0d] border border-white/5 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Truck size={14} className="text-brand-orange" />
        <span className="text-[0.65rem] tracking-[0.25em] text-brand-gray uppercase">Estimate Shipping</span>
      </div>
      <div className="flex gap-2">
        <input
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="Enter PIN code"
          className="flex-1 bg-transparent border border-white/10 text-brand-ivory px-3 py-2.5 text-xs outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40"
          maxLength={6}
        />
        <button
          onClick={estimate}
          className="border border-white/10 text-brand-gray px-4 py-2.5 text-xs tracking-wider hover:border-brand-orange hover:text-brand-orange transition-all"
        >
          Check
        </button>
      </div>
      {result && (
        <p className="text-brand-gray text-xs mt-2">
          Estimated delivery: <span className="text-brand-ivory">{result.days}</span>
        </p>
      )}
    </div>
  );
}
