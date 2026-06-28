import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-brand-orange/10 border border-brand-orange/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-brand-orange" />
        </div>
        <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Order Confirmed</p>
        <h1 className="font-bebas text-5xl lg:text-6xl text-brand-ivory mb-4">THANK YOU!</h1>
        <p className="text-brand-gray text-sm leading-relaxed mb-2">
          Your order has been placed successfully. A confirmation email is on its way to your inbox.
        </p>
        <p className="text-brand-gray text-sm leading-relaxed mb-10">
          Born from Odisha. Heading your way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/track-order"
            className="bg-brand-orange text-brand-ivory px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-brand-orange-dark transition-colors"
          >
            Track Order
          </Link>
          <Link
            href="/shop"
            className="border border-white/10 text-brand-gray px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:border-brand-ivory hover:text-brand-ivory transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
