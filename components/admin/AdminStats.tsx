import { ShoppingBag, Package, Users, IndianRupee, Clock } from "lucide-react";

interface AdminStatsProps {
  stats: {
    totalOrders: number;
    totalRevenue: any;
    totalProducts: number;
    totalCustomers: number;
    pendingOrders: number;
  };
}

export function AdminStats({ stats }: AdminStatsProps) {
  const cards = [
    {
      label: "Total Revenue",
      value: `₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-brand-orange",
      bg: "bg-brand-orange/10",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Products",
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Customers",
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders.toLocaleString(),
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-[#0d0d0d] border border-white/5 p-5">
          <div className={`w-10 h-10 ${card.bg} flex items-center justify-center mb-3`}>
            <card.icon size={18} className={card.color} />
          </div>
          <p className="font-bebas text-2xl tracking-wider text-brand-ivory">{card.value}</p>
          <p className="text-[0.6rem] tracking-[0.15em] text-brand-gray uppercase mt-0.5">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
