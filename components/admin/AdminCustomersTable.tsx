"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

interface AdminCustomersTableProps {
  customers: any[];
  total: number;
  page: number;
  pages: number;
  query?: string;
}

export function AdminCustomersTable({ customers, total, page, pages, query }: AdminCustomersTableProps) {
  const router = useRouter();
  const [q, setQ] = useState(query ?? "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/customers?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email..."
            className="w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory pl-9 pr-4 py-2.5 text-sm outline-none focus:border-brand-orange transition-colors" />
        </div>
        <button type="submit" className="bg-brand-orange text-brand-ivory px-5 py-2.5 text-xs tracking-widest uppercase">Go</button>
        {query && (
          <button type="button" onClick={() => router.push("/admin/customers")}
            className="border border-white/10 text-brand-gray px-4 py-2.5 text-xs hover:border-brand-orange hover:text-brand-orange transition-all">Clear</button>
        )}
      </form>

      <div className="bg-[#0d0d0d] border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Name", "Email", "Joined", "Orders", "Loyalty Pts"].map((h) => (
                <th key={h} className="text-left text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase px-4 py-3 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-brand-gray text-sm">No customers found.</td></tr>
            )}
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-brand-orange/10 border border-brand-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bebas text-xs text-brand-orange">{(c.name ?? c.email).charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-brand-ivory text-xs">{c.name ?? "—"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-brand-gray text-xs">{c.email}</td>
                <td className="px-4 py-3 text-brand-gray text-xs whitespace-nowrap">
                  {new Date(c.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                </td>
                <td className="px-4 py-3">
                  <span className="font-bebas text-sm tracking-wider text-brand-orange">{c._count?.orders ?? 0}</span>
                </td>
                <td className="px-4 py-3 text-brand-gray text-xs">{c.loyaltyPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex justify-end gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => router.push(`/admin/customers?page=${p}${query ? `&q=${query}` : ""}`)}
              className={`w-8 h-8 text-xs border transition-all ${p === page ? "border-brand-orange bg-brand-orange text-brand-ivory" : "border-white/10 text-brand-gray hover:border-brand-orange"}`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
