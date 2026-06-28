"use client";

import { useState } from "react";
import { ShoppingBag, Heart, Share2, Ruler } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { useWishlistStore } from "@/hooks/useWishlistStore";
import { ProductWithDetails } from "@/types";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: ProductWithDetails;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();
  const isWishlisted = has(product.id);

  const price = Number(product.price);
  const comparePrice = product.compare_price ? Number(product.compare_price) : null;
  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  const sizes = [...new Set(product.variants.map((v) => v.size).filter(Boolean))];
  const colors = [...new Map(product.variants.filter((v) => v.color).map((v) => [v.color, { color: v.color, hex: v.color_hex }])).values()];

  const selectedVariant = product.variants.find(
    (v) => (!selectedSize || v.size === selectedSize) && (!selectedColor || v.color === selectedColor)
  );
  const inStock = selectedVariant ? selectedVariant.stock > 0 : product.variants.some((v) => v.stock > 0);

  const avgRating = product.reviews.length
    ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
    : null;

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const variant = selectedVariant ?? product.variants.find((v) => v.stock > 0);
    if (!variant) { toast.error("Out of stock"); return; }

    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price,
      comparePrice: comparePrice ?? undefined,
      size: variant.size ?? undefined,
      color: variant.color ?? undefined,
      colorHex: variant.color_hex ?? undefined,
      quantity,
      maxStock: variant.stock,
    });
    toast.success("Added to cart!");
  };

  return (
    <div className="sticky top-24">
      {/* Category + badges */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[0.6rem] tracking-[0.3em] text-brand-orange uppercase">
          {product.category?.name}
        </span>
        {product.tags?.includes("bestseller") && (
          <span className="text-[0.55rem] tracking-wider border border-brand-orange/40 text-brand-orange px-2 py-0.5 uppercase">
            Bestseller
          </span>
        )}
      </div>

      <h1 className="font-playfair text-3xl lg:text-4xl text-brand-ivory mb-2 leading-tight">
        {product.name}
      </h1>

      {avgRating && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`text-sm ${Number(avgRating) >= star ? "text-brand-orange" : "text-brand-gray"}`}>★</span>
            ))}
          </div>
          <span className="text-xs text-brand-gray">({product.reviews.length} reviews)</span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="font-bebas text-3xl tracking-wider text-brand-orange">
          ₹{price.toLocaleString("en-IN")}
        </span>
        {comparePrice && (
          <>
            <span className="text-brand-gray text-base line-through">
              ₹{comparePrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[0.65rem] bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-2 py-0.5 tracking-wider">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Colors */}
      {colors.length > 0 && (
        <div className="mb-5">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-gray mb-2">
            Color: <span className="text-brand-ivory">{selectedColor ?? "Select"}</span>
          </p>
          <div className="flex gap-2">
            {colors.map(({ color, hex }) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color!)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? "border-brand-orange scale-110" : "border-transparent hover:border-brand-gray"}`}
                style={{ backgroundColor: hex ?? "#000" }}
                title={color ?? ""}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {sizes.length > 0 && (
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-gray">
              Size: <span className="text-brand-ivory">{selectedSize ?? "Select"}</span>
            </p>
            <button
              onClick={() => setSizeChartOpen(true)}
              className="flex items-center gap-1 text-[0.6rem] tracking-wider text-brand-orange uppercase hover:underline"
            >
              <Ruler size={10} /> Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const variantForSize = product.variants.find((v) => v.size === size && (!selectedColor || v.color === selectedColor));
              const outOfStock = variantForSize ? variantForSize.stock === 0 : true;
              return (
                <button
                  key={size}
                  onClick={() => !outOfStock && setSelectedSize(size!)}
                  disabled={outOfStock}
                  className={`w-10 h-10 text-xs font-medium border transition-all ${
                    selectedSize === size
                      ? "border-brand-orange bg-brand-orange text-brand-ivory"
                      : outOfStock
                      ? "border-brand-gray/20 text-brand-gray/30 cursor-not-allowed line-through"
                      : "border-brand-gray/30 text-brand-ivory hover:border-brand-orange"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-gray mb-2">Quantity</p>
        <div className="flex items-center border border-brand-gray/20 w-fit">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-brand-gray hover:text-brand-ivory transition-colors">−</button>
          <span className="w-10 h-10 flex items-center justify-center text-brand-ivory font-medium">{quantity}</span>
          <button onClick={() => setQuantity(Math.min(selectedVariant?.stock ?? 10, quantity + 1))} className="w-10 h-10 flex items-center justify-center text-brand-gray hover:text-brand-ivory transition-colors">+</button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="w-full bg-brand-orange text-brand-ivory py-4 text-[0.75rem] tracking-[0.25em] uppercase flex items-center justify-center gap-2 hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingBag size={15} />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
        <button
          onClick={() => toggle({ productId: product.id, name: product.name, slug: product.slug, image: product.images[0], price })}
          className={`w-full border py-4 text-[0.75rem] tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-colors ${isWishlisted ? "border-brand-orange text-brand-orange" : "border-brand-gray/30 text-brand-gray hover:border-brand-ivory hover:text-brand-ivory"}`}
        >
          <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
          {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
        </button>
      </div>

      {/* Quick info */}
      <div className="border-t border-brand-gray/10 pt-4 space-y-2">
        {product.material && (
          <p className="text-xs text-brand-gray">
            <span className="text-brand-ivory">Material:</span> {product.material}
          </p>
        )}
        <p className="text-xs text-brand-gray">
          <span className="text-brand-ivory">Free shipping</span> on orders above ₹999
        </p>
        <p className="text-xs text-brand-gray">
          <span className="text-brand-ivory">Easy returns</span> within 7 days
        </p>
      </div>
    </div>
  );
}
