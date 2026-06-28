import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function RecentOrders() {
  const orders = await prisma.order.findMany({
    take: 6,
    orderBy: { created_at: "desc" },
    include: { items: { take: 1 } },
  });

  const STATUS_COLOR: Record<string, string> = {
    pending: "text-yellow-400",
    confirmed: "text-blue-400",
    shipped: "text-cyan-400",
    delivered: "text-green-400",
    cancelled: "text-red-400",
  };

  return (
    <div className="bg-[#0d0d0d] border border-white/5 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bebas text-lg tracking-wider text-brand-ivory">RECENT ORDERS</h3>
        <Link href="/admin/orders" className="text-[0.6rem] tracking-wider text-brand-orange uppercase hover:underline">
          View All
        </Link>
      </div>
      <div className="space-y-0">
        <div className="grid grid-cols-4 pb-2 border-b border-white/5">
          {["Order", "Customer", "Total", "Status"].map((h) => (
            <span key={h} className="text-[0.55rem] tracking-[0.2em] text-brand-gray uppercase">{h}</span>
          ))}
        </div>
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-4 py-3 border-b border-white/5 last:border-0 items-center">
            <span className="text-brand-ivory text-xs truncate">#{order.order_number.slice(-8)}</span>
            <span className="text-brand-gray text-xs truncate">{order.email.split("@")[0]}</span>
            <span className="font-bebas text-sm tracking-wider text-brand-orange">₹{Number(order.total).toLocaleString("en-IN")}</span>
            <span className={`text-[0.6rem] tracking-wider uppercase ${STATUS_COLOR[order.status] ?? "text-brand-gray"}`}>
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
