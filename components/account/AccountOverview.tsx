import Link from "next/link";
import { ShoppingBag, Heart, MapPin, ArrowRight } from "lucide-react";

interface AccountOverviewProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function AccountOverview({ user }: AccountOverviewProps) {
  const QUICK_LINKS = [
    { href: "/account/orders", label: "My Orders", desc: "Track and manage your orders", icon: ShoppingBag },
    { href: "/account/wishlist", label: "Wishlist", desc: "Items you've saved for later", icon: Heart },
    { href: "/account/addresses", label: "Addresses", desc: "Manage delivery addresses", icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-[#0d0d0d] border border-white/5 p-6">
        <p className="text-brand-orange text-[0.6rem] tracking-[0.3em] uppercase mb-1">Hello</p>
        <h2 className="font-bebas text-3xl text-brand-ivory">{user.name ?? "Customer"}</h2>
        <p className="text-brand-gray text-xs mt-1">{user.email}</p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {QUICK_LINKS.map(({ href, label, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="bg-[#0d0d0d] border border-white/5 p-5 hover:border-brand-orange/30 transition-all group"
          >
            <Icon size={20} className="text-brand-orange mb-3" />
            <p className="text-brand-ivory text-sm font-medium mb-1">{label}</p>
            <p className="text-brand-gray text-xs leading-snug">{desc}</p>
            <ArrowRight size={13} className="text-brand-gray mt-3 group-hover:text-brand-orange transition-colors" />
          </Link>
        ))}
      </div>

      {/* Recent order placeholder */}
      <div className="bg-[#0d0d0d] border border-white/5 p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[0.65rem] tracking-[0.25em] text-brand-orange uppercase">Recent Orders</p>
          <Link href="/account/orders" className="text-[0.6rem] tracking-wider text-brand-gray hover:text-brand-ivory transition-colors">
            View All →
          </Link>
        </div>
        <p className="text-brand-gray text-sm">No orders yet. Time to shop!</p>
        <Link
          href="/shop"
          className="inline-block mt-3 text-[0.65rem] tracking-[0.2em] text-brand-orange uppercase border-b border-brand-orange pb-0.5 hover:opacity-70 transition-opacity"
        >
          Browse Collection
        </Link>
      </div>
    </div>
  );
}
