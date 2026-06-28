import { Metadata } from "next";
import { CartItems } from "@/components/cart/CartItems";
import { CartSummary } from "@/components/cart/CartSummary";
import { PromoCode } from "@/components/cart/PromoCode";
import { ShippingEstimate } from "@/components/cart/ShippingEstimate";

export const metadata: Metadata = {
  title: "Cart — SKWIRREL",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <h1 className="font-bebas text-5xl lg:text-7xl text-brand-ivory mb-10 tracking-wide">
          YOUR CART
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <CartItems />
            <PromoCode />
            <ShippingEstimate />
          </div>
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
