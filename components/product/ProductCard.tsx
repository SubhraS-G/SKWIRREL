"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/hooks/useCartStore";
import { useWishlistStore } from "@/hooks/useWishlistStore";
import { ProductWithVariants } from "@/types";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: ProductWithVariants;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();
  const isWishlisted = has(product.id);

  const defaultVariant = product.variants.find((v) => v.stock > 0);
  const price = Number(product.price);
  const comparePrice = product.compare_price ? Number(product.compare_price) : null;
  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!defaultVariant) {
      toast.error("Out of stock");
      return;
    }
    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0] ?? "",
      price,
      comparePrice: comparePrice ?? undefined,
      size: defaultVariant.size ?? undefined,
      color: defaultVariant.color ?? undefined,
      colorHex: defaultVariant.color_hex ?? undefined,
      maxStock: defaultVariant.stock,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle({ productId: product.id, name: product.name, slug: product.slug, image: product.images[0] ?? "", price });
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        <div
          className="relative overflow-hidden bg-[#111] aspect-[3/4]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Images */}
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-all duration-700 ${hovered && product.images[1] ? "opacity-0" : "opacity-100"}`}
            />
          )}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alt`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-all duration-700 ${hovered ? "opacity-100 scale-105" : "opacity-0"}`}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="bg-brand-orange text-brand-ivory text-[0.55rem] tracking-wider px-2 py-0.5 uppercase">
                -{discount}%
              </span>
            )}
            {product.tags?.includes("new") && (
              <span className="bg-brand-ivory text-brand-black text-[0.55rem] tracking-wider px-2 py-0.5 uppercase">
                New
              </span>
            )}
            {product.tags?.includes("bestseller") && (
              <span className="bg-[#111] text-brand-orange text-[0.55rem] tracking-wider px-2 py-0.5 uppercase border border-brand-orange/30">
                Bestseller
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleWishlist}
              className="w-8 h-8 bg-brand-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-orange"
              aria-label="Wishlist"
            >
              <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-brand-orange" : "text-brand-ivory"} />
            </button>
            <Link
              href={`/shop/${product.slug}`}
              className="w-8 h-8 bg-brand-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-orange"
              onClick={(e) => e.stopPropagation()}
              aria-label="Quick view"
            >
              <Eye size={14} className="text-brand-ivory" />
            </Link>
          </div>

          {/* Quick Add */}
          <div className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ${hovered ? "translate-y-0" : "translate-y-full"}`}>
            <button
              onClick={handleQuickAdd}
              className="w-full bg-brand-orange text-brand-ivory py-3 text-[0.65rem] tracking-[0.25em] uppercase flex items-center justify-center gap-2 hover:bg-brand-orange-dark transition-colors"
            >
              <ShoppingBag size={13} />
              Quick Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 pb-1">
          <p className="text-[0.6rem] tracking-[0.2em] text-brand-orange uppercase mb-0.5">
            {product.category?.name}
          </p>
          <h3 className="font-playfair text-sm text-brand-ivory leading-snug group-hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-bebas text-base tracking-wider text-brand-orange">
              ₹{price.toLocaleString("en-IN")}
            </span>
            {comparePrice && (
              <span className="text-brand-gray text-xs line-through">
                ₹{comparePrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
