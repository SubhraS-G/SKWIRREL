import { Metadata } from "next";
import { TrackOrderForm } from "@/components/account/TrackOrderForm";

export const metadata: Metadata = {
  title: "Track Order — SKWIRREL",
};

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20 flex items-center justify-center">
      <div className="w-full max-w-lg px-6 py-16">
        <p className="text-brand-orange text-xs tracking-widest uppercase mb-3">Shipment</p>
        <h1 className="font-bebas text-5xl text-brand-ivory mb-2">TRACK YOUR ORDER</h1>
        <p className="text-brand-gray text-sm mb-10">
          Enter your order number and email to see real-time tracking updates.
        </p>
        <TrackOrderForm />
      </div>
    </div>
  );
}
