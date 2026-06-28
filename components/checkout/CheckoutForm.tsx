"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/lib/validations";
import { useCartStore } from "@/hooks/useCartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreditCard, Smartphone, Truck } from "lucide-react";

type PaymentMethod = "razorpay" | "stripe" | "cod";

export function CheckoutForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
    },
  });

  const PAYMENT_OPTIONS = [
    { id: "razorpay" as const, label: "UPI / Cards / Netbanking", sub: "Powered by Razorpay", icon: Smartphone },
    { id: "stripe" as const, label: "International Card", sub: "Visa, Mastercard", icon: CreditCard },
    { id: "cod" as const, label: "Cash on Delivery", sub: "Pay when delivered", icon: Truck },
  ];

  const onSubmit = async (formData: any) => {
    if (!items.length) { toast.error("Your cart is empty"); return; }
    setLoading(true);
    try {
      const payload = {
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
        })),
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          line1: formData.line1,
          line2: formData.line2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: "India",
        },
        email: formData.email,
        userId: session?.user?.id,
        total: total(),
        paymentMethod,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (paymentMethod === "stripe" && data.url) {
        window.location.href = data.url;
      } else if (paymentMethod === "razorpay" && data.orderId) {
        const rzp = new (window as any).Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: data.orderId,
          amount: data.amount,
          currency: data.currency,
          name: "SKWIRREL",
          description: "Your cultural fashion order",
          handler: () => {
            clearCart();
            router.push("/checkout/success");
          },
          prefill: { name: formData.name, email: formData.email, contact: formData.phone },
          theme: { color: "#E85A1C" },
        });
        rzp.open();
      } else if (paymentMethod === "cod") {
        clearCart();
        router.push("/checkout/success");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Contact */}
      <div>
        <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mb-4">CONTACT INFO</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" error={errors.name?.message as string}>
            <input {...register("name", { required: "Name is required" })} className={inputClass} placeholder="John Doe" />
          </Field>
          <Field label="Email" error={errors.email?.message as string}>
            <input {...register("email", { required: "Email is required" })} type="email" className={inputClass} placeholder="you@email.com" />
          </Field>
          <Field label="Phone" error={errors.phone?.message as string} className="sm:col-span-2">
            <input {...register("phone", { required: "Phone is required" })} className={inputClass} placeholder="9876543210" />
          </Field>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mb-4">SHIPPING ADDRESS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Address Line 1" error={errors.line1?.message as string} className="sm:col-span-2">
            <input {...register("line1", { required: "Address is required" })} className={inputClass} placeholder="Flat / House No., Street" />
          </Field>
          <Field label="Address Line 2 (optional)" className="sm:col-span-2">
            <input {...register("line2")} className={inputClass} placeholder="Landmark, Area" />
          </Field>
          <Field label="City" error={errors.city?.message as string}>
            <input {...register("city", { required: "City is required" })} className={inputClass} placeholder="Bhubaneswar" />
          </Field>
          <Field label="State" error={errors.state?.message as string}>
            <input {...register("state", { required: "State is required" })} className={inputClass} placeholder="Odisha" />
          </Field>
          <Field label="PIN Code" error={errors.pincode?.message as string}>
            <input {...register("pincode", { required: "PIN is required", pattern: { value: /^\d{6}$/, message: "Invalid PIN" } })} className={inputClass} placeholder="751001" maxLength={6} />
          </Field>
        </div>
      </div>

      {/* Payment */}
      <div>
        <h3 className="font-bebas text-xl tracking-wider text-brand-ivory mb-4">PAYMENT METHOD</h3>
        <div className="space-y-3">
          {PAYMENT_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
                paymentMethod === opt.id ? "border-brand-orange bg-brand-orange/5" : "border-white/10 hover:border-brand-gray/30"
              }`}
            >
              <input type="radio" name="payment" value={opt.id} checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id)} className="sr-only" />
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${paymentMethod === opt.id ? "border-brand-orange" : "border-brand-gray/30"}`}>
                {paymentMethod === opt.id && <div className="w-2 h-2 rounded-full bg-brand-orange" />}
              </div>
              <opt.icon size={18} className={paymentMethod === opt.id ? "text-brand-orange" : "text-brand-gray"} />
              <div>
                <p className="text-brand-ivory text-sm">{opt.label}</p>
                <p className="text-brand-gray text-xs">{opt.sub}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-orange text-brand-ivory py-4 font-bebas text-xl tracking-widest hover:bg-brand-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : `Pay ₹${total().toLocaleString("en-IN")}`}
      </button>
    </form>
  );
}

const inputClass = "w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory px-4 py-3 text-sm outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40";

function Field({ label, error, children, className }: {
  label: string; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
