import { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";

export const metadata: Metadata = {
  title: "Checkout — SKWIRREL",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <h1 className="font-bebas text-4xl lg:text-6xl text-brand-ivory mb-8 tracking-wide">
          CHECKOUT
        </h1>
        <CheckoutSteps />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-10">
          <div className="lg:col-span-3">
            <CheckoutForm />
          </div>
          <div className="lg:col-span-2">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
