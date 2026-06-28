"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, MapPin, User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LINKS = [
  { href: "/account", label: "Overview", icon: User, exact: true },
  { href: "/account/orders", label: "Orders", icon: ShoppingBag },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:col-span-1">
      <nav className="bg-[#0d0d0d] border border-white/5">
        {LINKS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-4 text-xs tracking-wider border-b border-white/5 last:border-0 transition-all ${
                active
                  ? "text-brand-orange border-l-2 border-l-brand-orange pl-[18px]"
                  : "text-brand-gray hover:text-brand-ivory"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-5 py-4 text-xs tracking-wider text-brand-gray hover:text-red-400 transition-colors w-full text-left"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </nav>
    </aside>
  );
}
