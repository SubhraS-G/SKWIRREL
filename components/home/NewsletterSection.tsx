"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema } from "@/lib/validations";
import toast from "react-hot-toast";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSubmitted(true);
      toast.success("Welcome to the movement!");
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    }
  };

  return (
    <section className="bg-brand-orange py-20 px-6 lg:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-bebas text-5xl lg:text-7xl text-brand-ivory leading-none mb-2">
          JOIN THE MOVEMENT.
        </h2>
        <p className="text-brand-ivory/70 text-sm tracking-wider mb-10">
          Wear your culture with pride. Be first for new drops, culture stories, and exclusive events.
        </p>

        {submitted ? (
          <div className="bg-brand-ivory/10 border border-brand-ivory/20 p-6">
            <p className="font-bebas text-2xl tracking-wider text-brand-ivory">Welcome to the family!</p>
            <p className="text-brand-ivory/70 text-sm mt-1">Check your inbox for a welcome gift.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className="flex-1 bg-brand-ivory/15 border border-brand-ivory/30 text-brand-ivory placeholder:text-brand-ivory/40 px-5 py-4 text-sm outline-none focus:bg-brand-ivory/20 transition-colors"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-black text-brand-ivory px-8 py-4 font-bebas text-lg tracking-wider hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </button>
          </form>
        )}
        {errors.email && (
          <p className="text-brand-ivory/60 text-xs mt-2">{errors.email.message as string}</p>
        )}
        <p className="text-brand-ivory/40 text-[0.6rem] tracking-wider mt-4 uppercase">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
