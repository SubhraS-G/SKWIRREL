"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  confirmed: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  processing: "text-purple-400 border-purple-400/30 bg-purple-400/5",
  shipped: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
  delivered: "text-green-400 border-green-400/30 bg-green-400/5",
  cancelled: "text-red-400 border-red-400/30 bg-red-400/5",
  payment_failed: "text-red-400 border-red-400/30 bg-red-400/5",
};

interface AdminOrdersTableProps {
  orders: any[];
  total: number;
  page: number;
  pages: number;
  activeStatus?: string;
}

export function AdminOrdersTable({ orders, total, page, pages, activeStatus }: AdminOrdersTableProps) {
  const router = useRouter();

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      toast.success("Status updated");
      router.refresh();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-4">
      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => router.push("/admin/orders")}
          className={`px-4 py-2 text-[0.6rem] tracking-widest uppercase border transition-all ${!activeStatus ? "border-brand-orange bg-brand-orange text-brand-ivory" : "border-white/10 text-brand-gray hover:border-brand-orange"}`}
        >
          All ({total})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => router.push(`/admin/orders?status=${s}`)}
            className={`px-4 py-2 text-[0.6rem] tracking-widest uppercase border transition-all ${activeStatus === s ? "border-brand-orange bg-brand-orange text-brand-ivory" : "border-white/10 text-brand-gray hover:border-brand-orange"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0d0d0d] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Order #", "Customer", "Date", "Items", "Total", "Payment", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase px-4 py-3 font-normal whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-brand-gray text-sm">No orders found.</td></tr>
              )}
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-brand-ivory text-xs font-medium">#{order.order_number.slice(-8)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-brand-ivory text-xs truncate max-w-[130px]">{order.email}</p>
                  </td>
                  <td className="px-4 py-3 text-brand-gray text-xs whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                  </td>
                  <td className="px-4 py-3 text-brand-gray text-xs">{order.items?.length ?? 0}</td>
                  <td className="px-4 py-3">
                    <span className="font-bebas text-sm tracking-wider text-brand-orange">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[0.6rem] tracking-wider uppercase ${order.payment_status === "paid" ? "text-green-400" : "text-yellow-400"}`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[0.6rem] tracking-wider border px-2 py-0.5 uppercase ${STATUS_COLORS[order.status] ?? "text-brand-gray border-white/10"}`}>
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="bg-[#111] border border-white/10 text-brand-gray text-[0.6rem] px-2 py-1 outline-none focus:border-brand-orange"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-end gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => router.push(`/admin/orders?page=${p}${activeStatus ? `&status=${activeStatus}` : ""}`)}
              className={`w-8 h-8 text-xs border transition-all ${p === page ? "border-brand-orange bg-brand-orange text-brand-ivory" : "border-white/10 text-brand-gray hover:border-brand-orange"}`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
