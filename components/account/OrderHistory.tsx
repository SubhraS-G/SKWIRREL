import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400 border-yellow-400/30",
  confirmed: "text-blue-400 border-blue-400/30",
  processing: "text-purple-400 border-purple-400/30",
  shipped: "text-cyan-400 border-cyan-400/30",
  delivered: "text-green-400 border-green-400/30",
  cancelled: "text-red-400 border-red-400/30",
  payment_failed: "text-red-400 border-red-400/30",
};

interface OrderHistoryProps {
  orders: any[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (!orders.length) {
    return (
      <div className="bg-[#0d0d0d] border border-white/5 p-12 text-center">
        <Package size={36} className="text-brand-gray/30 mx-auto mb-4" />
        <p className="text-brand-gray text-sm mb-4">No orders yet.</p>
        <Link href="/shop" className="text-brand-orange text-xs tracking-wider uppercase hover:underline">
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-[#0d0d0d] border border-white/5 p-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 pb-4 border-b border-white/5">
            <div>
              <p className="text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase mb-0.5">Order</p>
              <p className="font-bebas text-lg tracking-wider text-brand-ivory">#{order.order_number}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[0.6rem] tracking-wider border px-2.5 py-1 uppercase ${STATUS_COLORS[order.status] ?? "text-brand-gray border-white/10"}`}>
                {order.status.replace("_", " ")}
              </span>
              <span className="font-bebas text-lg tracking-wider text-brand-orange">
                ₹{Number(order.total).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {order.items?.slice(0, 4).map((item: any) => (
              <div key={item.id} className="relative w-14 h-16 bg-[#1a1a1a] flex-shrink-0">
                {item.product?.images?.[0] && (
                  <Image src={item.product.images[0]} alt={item.name} fill className="object-cover" />
                )}
              </div>
            ))}
            {order.items?.length > 4 && (
              <div className="w-14 h-16 bg-[#1a1a1a] flex-shrink-0 flex items-center justify-center">
                <span className="text-brand-gray text-xs">+{order.items.length - 4}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <p className="text-brand-gray text-xs">
              {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
            <Link
              href={`/track-order?orderNumber=${order.order_number}`}
              className="text-[0.6rem] tracking-wider text-brand-orange uppercase hover:underline"
            >
              Track Order →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
