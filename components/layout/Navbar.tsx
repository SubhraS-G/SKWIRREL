"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { MiniCart } from "@/components/cart/MiniCart";
import { SearchOverlay } from "@/components/shared/SearchOverlay";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/our-roots", label: "Our Roots" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Stories" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-brand-black/90 backdrop-blur-xl border-b border-brand-orange/10"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-bebas text-xl lg:text-2xl tracking-widest text-brand-ivory hover:text-brand-orange transition-colors"
        >
          SK<span className="text-brand-orange">W</span>IRREL
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[0.7rem] tracking-[0.2em] uppercase transition-colors ${
                  pathname === link.href
                    ? "text-brand-orange"
                    : "text-brand-gray hover:text-brand-ivory"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-brand-gray hover:text-brand-ivory transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <Link
            href="/account/wishlist"
            className="text-brand-gray hover:text-brand-ivory transition-colors hidden sm:block"
            aria-label="Wishlist"
          >
            <Heart size={18} />
          </Link>
          <Link
            href="/account"
            className="text-brand-gray hover:text-brand-ivory transition-colors hidden sm:block"
            aria-label="Account"
          >
            <User size={18} />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-brand-gray hover:text-brand-ivory transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-orange text-brand-ivory text-[0.55rem] font-semibold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="lg:hidden text-brand-gray hover:text-brand-ivory transition-colors ml-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-50 bg-brand-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-bebas text-2xl tracking-widest text-brand-ivory">
                SK<span className="text-brand-orange">W</span>IRREL
              </span>
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} className="text-brand-gray" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-bebas text-4xl tracking-wider text-brand-ivory hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex gap-6">
              <Link href="/account" onClick={() => setMobileOpen(false)} className="text-brand-gray"><User size={20} /></Link>
              <Link href="/account/wishlist" onClick={() => setMobileOpen(false)} className="text-brand-gray"><Heart size={20} /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Cart Drawer */}
      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
