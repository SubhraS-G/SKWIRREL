"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import toast from "react-hot-toast";

export function AdminCouponsManager({ initialCoupons }: { initialCoupons: any[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "", type: "percentage", value: "", min_order: "", usage_limit: "", expires_at: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          code: form.code.toUpperCase(),
          value: Number(form.value),
          min_order: form.min_order ? Number(form.min_order) : undefined,
          usage_limit: form.usage_limit ? Number(form.usage_limit) : undefined,
          expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Coupon created!");
      setShowForm(false);
      setForm({ code: "", type: "percentage", value: "", min_order: "", usage_limit: "", expires_at: "" });
      router.refresh();
    } catch {
      toast.error("Failed to create coupon");
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Delete coupon "${code}"?`)) return;
    try {
      await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      toast.success("Coupon deleted");
      router.refresh();
    } catch {
      toast.error("Failed");
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/coupons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !current }),
      });
      router.refresh();
    } catch {
      toast.error("Failed");
    }
  };

  const inputClass = "w-full bg-[#111] border border-white/10 text-brand-ivory px-3 py-2.5 text-xs outline-none focus:border-brand-orange transition-colors";
  const labelClass = "block text-[0.55rem] tracking-[0.2em] text-brand-gray uppercase mb-1";

  return (
    <div className="space-y-4">
      {/* Create form */}
      {showForm ? (
        <form onSubmit={handleCreate} className="bg-[#0d0d0d] border border-white/5 p-6">
          <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mb-5">NEW COUPON</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelClass}>Code *</label>
              <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                className={inputClass} placeholder="SAVE20" required />
            </div>
            <div>
              <label className={labelClass}>Type *</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass}>
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Value *</label>
              <input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })}
                className={inputClass} placeholder={form.type === "percentage" ? "10" : "100"} type="number" min="1" required />
            </div>
            <div>
              <label className={labelClass}>Min Order (₹)</label>
              <input value={form.min_order} onChange={(e) => setForm({ ...form, min_order: e.target.value })}
                className={inputClass} placeholder="500" type="number" />
            </div>
            <div>
              <label className={labelClass}>Usage Limit</label>
              <input value={form.usage_limit} onChange={(e) => setForm({ ...form, usage_limit: e.target.value })}
                className={inputClass} placeholder="100" type="number" />
            </div>
            <div>
              <label className={labelClass}>Expires At</label>
              <input value={form.expires_at} onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                className={inputClass} type="date" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-brand-orange text-brand-ivory px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-brand-orange-dark transition-colors">
              Create Coupon
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="text-brand-gray text-xs tracking-wider uppercase hover:text-brand-ivory transition-colors">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-brand-orange text-brand-ivory px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-brand-orange-dark transition-colors">
          <Plus size={14} /> Create Coupon
        </button>
      )}

      {/* Table */}
      <div className="bg-[#0d0d0d] border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Code", "Type", "Value", "Min Order", "Used", "Limit", "Expires", "Active", ""].map((h) => (
                <th key={h} className="text-left text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase px-4 py-3 font-normal whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {initialCoupons.length === 0 && (
              <tr><td colSpan={9} className="px-4 py-8 text-center text-brand-gray text-sm">No coupons yet.</td></tr>
            )}
            {initialCoupons.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-bebas text-sm tracking-wider text-brand-orange">{c.code}</span>
                </td>
                <td className="px-4 py-3 text-brand-gray text-xs capitalize">{c.type}</td>
                <td className="px-4 py-3 text-brand-ivory text-xs">
                  {c.type === "percentage" ? `${c.value}%` : `₹${Number(c.value).toLocaleString("en-IN")}`}
                </td>
                <td className="px-4 py-3 text-brand-gray text-xs">
                  {c.min_order ? `₹${Number(c.min_order).toLocaleString("en-IN")}` : "—"}
                </td>
                <td className="px-4 py-3 text-brand-gray text-xs">{c.used_count}</td>
                <td className="px-4 py-3 text-brand-gray text-xs">{c.usage_limit ?? "∞"}</td>
                <td className="px-4 py-3 text-brand-gray text-xs whitespace-nowrap">
                  {c.expires_at ? new Date(c.expires_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" }) : "—"}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleToggle(c.id, c.is_active)}>
                    {c.is_active ? <ToggleRight size={18} className="text-green-400" /> : <ToggleLeft size={18} className="text-brand-gray" />}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(c.id, c.code)} className="text-brand-gray hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
