import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { NewsletterInline } from "@/components/shared/NewsletterInline";

const SHOP_LINKS = [
  { href: "/shop?category=t-shirts", label: "T-Shirts" },
  { href: "/shop?category=hoodies", label: "Hoodies" },
  { href: "/shop?category=oversized", label: "Oversized Fits" },
  { href: "/shop?category=cultural", label: "Cultural Editions" },
  { href: "/shop?category=sustainable", label: "Sustainable" },
  { href: "/shop?category=accessories", label: "Accessories" },
];

const EXPLORE_LINKS = [
  { href: "/our-roots", label: "Our Roots" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/blog", label: "Stories" },
  { href: "/about", label: "About Us" },
];

const HELP_LINKS = [
  { href: "/track-order", label: "Track Order" },
  { href: "/returns", label: "Returns & Exchanges" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-16 pb-8">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          {/* Brand */}
          <div>
            <Link href="/" className="font-bebas text-2xl tracking-widest text-brand-ivory">
              SK<span className="text-brand-orange">W</span>IRREL
            </Link>
            <p className="text-brand-gray text-xs leading-relaxed mt-3 max-w-[200px]">
              Born from Odisha. Made for the world. Wear your culture with pride.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: Instagram, href: "https://instagram.com/skwirrelindia" },
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-brand-gray hover:border-brand-orange hover:text-brand-orange transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-brand-gray">
                <MapPin size={12} className="text-brand-orange flex-shrink-0" />
                <span className="text-xs">Bhubaneswar, Odisha 751001</span>
              </div>
              <div className="flex items-center gap-2 text-brand-gray">
                <Mail size={12} className="text-brand-orange flex-shrink-0" />
                <a href="mailto:hello@skwirrel.in" className="text-xs hover:text-brand-ivory transition-colors">
                  hello@skwirrel.in
                </a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[0.6rem] tracking-[0.3em] text-brand-orange uppercase mb-4">Shop</p>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-brand-gray hover:text-brand-ivory transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[0.6rem] tracking-[0.3em] text-brand-orange uppercase mb-4">Explore</p>
            <ul className="space-y-2.5">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-brand-gray hover:text-brand-ivory transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-[0.6rem] tracking-[0.3em] text-brand-orange uppercase mb-4">Help</p>
            <ul className="space-y-2.5">
              {HELP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-brand-gray hover:text-brand-ivory transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
          <p className="text-[0.6rem] tracking-wider text-white/20">
            © {new Date().getFullYear()} SKWIRREL. All rights reserved. Made with pride in Bhubaneswar, Odisha.
          </p>
          <p className="font-bebas text-lg tracking-[0.4em] text-brand-orange/20">ଓଡ଼ିଶା</p>
          <div className="flex gap-4">
            {["Visa", "Mastercard", "UPI", "Razorpay"].map((m) => (
              <span key={m} className="text-[0.6rem] text-white/20 tracking-wider">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
