"use client";

import { useState } from "react";

interface ProductDescriptionProps {
  product: {
    description: string;
    material?: string | null;
    care_instructions?: string | null;
    sustainability_info?: string | null;
  };
}

const TABS = [
  { id: "description", label: "Description" },
  { id: "material", label: "Material & Care" },
  { id: "sustainability", label: "Sustainability" },
];

export function ProductDescription({ product }: ProductDescriptionProps) {
  const [active, setActive] = useState("description");

  return (
    <section className="py-14 border-t border-white/5 mt-14">
      {/* Tabs */}
      <div className="flex gap-0 border-b border-white/5 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-6 py-3 text-[0.65rem] tracking-[0.2em] uppercase transition-all border-b-2 -mb-px ${
              active === tab.id
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-brand-gray hover:text-brand-ivory"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {active === "description" && (
          <p className="text-brand-gray text-sm leading-relaxed">{product.description}</p>
        )}

        {active === "material" && (
          <div className="space-y-5">
            {product.material && (
              <div>
                <p className="text-[0.6rem] tracking-[0.25em] text-brand-orange uppercase mb-2">Fabric</p>
                <p className="text-brand-gray text-sm">{product.material}</p>
              </div>
            )}
            {product.care_instructions && (
              <div>
                <p className="text-[0.6rem] tracking-[0.25em] text-brand-orange uppercase mb-2">Care Instructions</p>
                <p className="text-brand-gray text-sm leading-relaxed">{product.care_instructions}</p>
              </div>
            )}
            {!product.material && !product.care_instructions && (
              <p className="text-brand-gray text-sm">Material details coming soon.</p>
            )}
          </div>
        )}

        {active === "sustainability" && (
          <div className="space-y-4">
            {product.sustainability_info ? (
              <p className="text-brand-gray text-sm leading-relaxed">{product.sustainability_info}</p>
            ) : (
              <p className="text-brand-gray text-sm leading-relaxed">
                Every SKWIRREL product is made with sustainability in mind — from GOTS-certified organic cotton
                to water-based inks and responsible packaging. We're committed to reducing our environmental
                footprint while delivering premium quality.
              </p>
            )}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { label: "Organic Cotton", icon: "🌿" },
                { label: "Water-Based Inks", icon: "💧" },
                { label: "Ethical Production", icon: "🤝" },
              ].map((badge) => (
                <div key={badge.label} className="bg-[#0d0d0d] border border-white/5 p-3 text-center">
                  <span className="text-lg block mb-1">{badge.icon}</span>
                  <span className="text-[0.55rem] tracking-wider text-brand-gray uppercase">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
