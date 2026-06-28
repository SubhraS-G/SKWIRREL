"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

const STATUS_STEPS = [
  { key: "pending", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

export function TrackOrderForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/track?orderNumber=${orderNumber}&email=${email}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order not found");
      setOrder(data.order);
    } catch (err: any) {
      setError(err.message);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order
    ? STATUS_STEPS.findIndex((s) => s.key === order.status)
    : -1;

  const inputClass = "w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory px-4 py-3.5 text-sm outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40";

  return (
    <div>
      <form onSubmit={handleTrack} className="space-y-4 mb-8">
        <div>
          <label className="block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5">Order Number</label>
          <input
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className={inputClass}
            placeholder="SKW-XXXXXXXXXX"
            required
          />
        </div>
        <div>
          <label className="block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={inputClass}
            placeholder="your@email.com"
            required
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 w-full justify-center bg-brand-orange text-brand-ivory py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-brand-orange-dark transition-colors disabled:opacity-50"
        >
          <Search size={14} />
          {loading ? "Tracking..." : "Track Order"}
        </button>
      </form>

      {order && (
        <div className="bg-[#0d0d0d] border border-white/5 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[0.6rem] tracking-[0.25em] text-brand-orange uppercase mb-1">Order</p>
              <p className="font-bebas text-xl tracking-wider text-brand-ivory">#{order.order_number}</p>
            </div>
            <span className={`text-[0.6rem] tracking-wider px-3 py-1 uppercase border ${
              order.status === "delivered" ? "border-green-400/30 text-green-400"
              : order.status === "shipped" ? "border-blue-400/30 text-blue-400"
              : "border-brand-orange/30 text-brand-orange"
            }`}>
              {order.status}
            </span>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {STATUS_STEPS.filter((s) => !["cancelled", "refunded", "payment_failed"].includes(s.key)).map((step, i) => {
              const done = i <= currentStep;
              const active = i === currentStep;
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex gap-4 pb-5 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-brand-orange" : "bg-white/5 border border-white/10"}`}>
                      <Icon size={14} className={done ? "text-brand-ivory" : "text-brand-gray"} />
                    </div>
                    {i < STATUS_STEPS.length - 2 && (
                      <div className={`w-[1px] flex-1 mt-1 ${done ? "bg-brand-orange" : "bg-white/10"}`} style={{ minHeight: "20px" }} />
                    )}
                  </div>
                  <div className="pt-1">
                    <p className={`text-sm ${active ? "text-brand-orange font-medium" : done ? "text-brand-ivory" : "text-brand-gray"}`}>
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {order.tracking_number && (
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-[0.6rem] tracking-wider text-brand-gray uppercase">Tracking Number</p>
              <p className="text-brand-ivory text-sm mt-1 font-medium">{order.tracking_number}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
