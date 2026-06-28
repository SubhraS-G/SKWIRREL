"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Eye, Search, ToggleLeft, ToggleRight } from "lucide-react";
import toast from "react-hot-toast";

interface AdminProductsTableProps {
  products: any[];
  total: number;
  page: number;
  pages: number;
  query?: string;
}

export function AdminProductsTable({ products, total, page, pages, query }: AdminProductsTableProps) {
  const router = useRouter();
  const [q, setQ] = useState(query ?? "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/products?q=${encodeURIComponent(q)}`);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Product deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !current }),
      });
      router.refresh();
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory pl-9 pr-4 py-2.5 text-sm outline-none focus:border-brand-orange transition-colors"
          />
        </div>
        <button type="submit" className="bg-brand-orange text-brand-ivory px-5 py-2.5 text-xs tracking-widest uppercase">
          Search
        </button>
        {query && (
          <button type="button" onClick={() => router.push("/admin/products")}
            className="border border-white/10 text-brand-gray px-4 py-2.5 text-xs hover:border-brand-orange hover:text-brand-orange transition-all">
            Clear
          </button>
        )}
      </form>

      {/* Table */}
      <div className="bg-[#0d0d0d] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase px-4 py-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-brand-gray text-sm">
                    No products found.
                  </td>
                </tr>
              )}
              {products.map((p) => {
                const totalStock = p.variants.reduce((s: number, v: any) => s + v.stock, 0);
                return (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-12 bg-[#1a1a1a] flex-shrink-0">
                          {p.images[0] && (
                            <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="text-brand-ivory text-xs font-medium truncate max-w-[160px]">{p.name}</p>
                          <p className="text-brand-gray text-[0.6rem] mt-0.5">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-brand-gray text-xs">{p.category?.name}</td>
                    <td className="px-4 py-3">
                      <span className="font-bebas text-sm tracking-wider text-brand-orange">
                        ₹{Number(p.price).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs ${totalStock === 0 ? "text-red-400" : totalStock < 10 ? "text-yellow-400" : "text-green-400"}`}>
                        {totalStock} units
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggle(p.id, p.is_active)} className="transition-colors">
                        {p.is_active
                          ? <ToggleRight size={20} className="text-green-400" />
                          : <ToggleLeft size={20} className="text-brand-gray" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/shop/${p.slug}`} target="_blank"
                          className="text-brand-gray hover:text-brand-ivory transition-colors">
                          <Eye size={14} />
                        </Link>
                        <Link href={`/admin/products/${p.id}/edit`}
                          className="text-brand-gray hover:text-brand-orange transition-colors">
                          <Pencil size={14} />
                        </Link>
                        <button onClick={() => handleDelete(p.id, p.name)}
                          className="text-brand-gray hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-end gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => router.push(`/admin/products?page=${p}${query ? `&q=${query}` : ""}`)}
              className={`w-8 h-8 text-xs border transition-all ${p === page ? "border-brand-orange bg-brand-orange text-brand-ivory" : "border-white/10 text-brand-gray hover:border-brand-orange"}`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
