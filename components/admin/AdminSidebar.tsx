"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Package, Users,
  FileText, Tag, BarChart3, Settings, LogOut, Image
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/lookbook", label: "Lookbook", icon: Image },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#050505] border-r border-white/5 flex flex-col z-40 hidden lg:flex">
      <div className="p-6 border-b border-white/5">
        <span className="font-bebas text-xl tracking-widest text-brand-ivory">
          SK<span className="text-brand-orange">W</span>IRREL
        </span>
        <p className="text-[0.55rem] tracking-[0.3em] text-brand-gray uppercase mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs tracking-wider transition-all ${
                active
                  ? "bg-brand-orange/10 text-brand-orange border-l-2 border-brand-orange pl-[10px]"
                  : "text-brand-gray hover:text-brand-ivory hover:bg-white/5"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-0.5">
        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-xs tracking-wider text-brand-gray hover:text-brand-ivory transition-colors">
          <Settings size={15} /> Settings
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 text-xs tracking-wider text-brand-gray hover:text-red-400 transition-colors w-full text-left"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
