import { Mail, ShoppingBag, TrendingUp } from "lucide-react";

interface AdminAnalyticsProps {
  ordersByStatus: { status: string; _count: { status: number } }[];
  newsletterCount: number;
}

export function AdminAnalytics({ ordersByStatus, newsletterCount }: AdminAnalyticsProps) {
  const STATUS_COLORS: Record<string, string> = {
    delivered: "bg-green-500",
    shipped: "bg-cyan-500",
    confirmed: "bg-blue-500",
    processing: "bg-purple-500",
    pending: "bg-yellow-500",
    cancelled: "bg-red-500",
    payment_failed: "bg-red-700",
  };

  const totalOrders = ordersByStatus.reduce((s, o) => s + o._count.status, 0);

  return (
    <div className="space-y-6">
      {/* Newsletter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0d0d0d] border border-white/5 p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center">
            <Mail size={18} className="text-brand-orange" />
          </div>
          <div>
            <p className="font-bebas text-2xl text-brand-ivory">{newsletterCount.toLocaleString()}</p>
            <p className="text-[0.6rem] tracking-[0.15em] text-brand-gray uppercase">Newsletter Subscribers</p>
          </div>
        </div>
        <div className="bg-[#0d0d0d] border border-white/5 p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-400/10 flex items-center justify-center">
            <ShoppingBag size={18} className="text-blue-400" />
          </div>
          <div>
            <p className="font-bebas text-2xl text-brand-ivory">{totalOrders.toLocaleString()}</p>
            <p className="text-[0.6rem] tracking-[0.15em] text-brand-gray uppercase">Total Orders</p>
          </div>
        </div>
        <div className="bg-[#0d0d0d] border border-white/5 p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-400/10 flex items-center justify-center">
            <TrendingUp size={18} className="text-green-400" />
          </div>
          <div>
            <p className="font-bebas text-2xl text-brand-ivory">
              {ordersByStatus.find((o) => o.status === "delivered")?._count.status ?? 0}
            </p>
            <p className="text-[0.6rem] tracking-[0.15em] text-brand-gray uppercase">Delivered</p>
          </div>
        </div>
      </div>

      {/* Orders by Status Breakdown */}
      <div className="bg-[#0d0d0d] border border-white/5 p-6">
        <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mb-5">ORDERS BY STATUS</h3>
        <div className="space-y-3">
          {ordersByStatus.map((item) => {
            const pct = totalOrders > 0 ? Math.round((item._count.status / totalOrders) * 100) : 0;
            return (
              <div key={item.status}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-brand-ivory capitalize">{item.status.replace("_", " ")}</span>
                  <span className="text-brand-gray">{item._count.status} ({pct}%)</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${STATUS_COLORS[item.status] ?? "bg-brand-gray"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note about full analytics */}
      <div className="bg-brand-orange/5 border border-brand-orange/20 p-5">
        <p className="text-brand-orange text-xs tracking-wider mb-1">💡 Full Analytics</p>
        <p className="text-brand-gray text-xs leading-relaxed">
          For detailed revenue charts, conversion funnels, and customer cohort analysis, integrate{" "}
          <span className="text-brand-ivory">Google Analytics 4</span> or{" "}
          <span className="text-brand-ivory">Mixpanel</span> using your{" "}
          <code className="bg-white/5 px-1 py-0.5 text-brand-orange">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> environment variable.
        </p>
      </div>
    </div>
  );
}
