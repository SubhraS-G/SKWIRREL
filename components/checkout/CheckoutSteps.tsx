"use client";

import { usePathname } from "next/navigation";

const STEPS = [
  { label: "Cart", path: "/cart" },
  { label: "Checkout", path: "/checkout" },
  { label: "Confirmation", path: "/checkout/success" },
];

export function CheckoutSteps() {
  const pathname = usePathname();
  const current = STEPS.findIndex((s) => pathname.startsWith(s.path));

  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((step, i) => (
        <div key={step.path} className="flex items-center">
          <div className={`flex items-center gap-2 ${i <= current ? "text-brand-orange" : "text-brand-gray/30"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[0.6rem] font-bold border ${i <= current ? "border-brand-orange bg-brand-orange text-brand-ivory" : "border-white/10"}`}>
              {i + 1}
            </div>
            <span className="text-[0.6rem] tracking-[0.2em] uppercase hidden sm:block">{step.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 lg:w-16 h-px mx-2 lg:mx-3 ${i < current ? "bg-brand-orange" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
