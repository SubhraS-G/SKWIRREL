"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function ShopHeader({ total }: { total: number }) {
  return (
    <div className="border-b border-white/5 px-6 lg:px-12 py-10">
      <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-2">Collection</p>
      <h1 className="font-bebas text-6xl lg:text-8xl text-brand-ivory leading-none">SHOP</h1>
    </div>
  );
}

export function ShopSearch() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = fd.get("q") as string;
    if (q.trim()) router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative mb-2">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" />
      <input
        name="q"
        type="text"
        placeholder="Search products..."
        className="w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory pl-11 pr-4 py-3 text-sm placeholder:text-brand-gray/50 outline-none focus:border-brand-orange transition-colors"
      />
    </form>
  );
}
