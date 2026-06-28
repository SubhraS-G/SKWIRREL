"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/validations";
import toast from "react-hot-toast";
import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      reset();
      toast.success("Message sent!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start justify-center h-full">
        <div className="bg-brand-orange/10 border border-brand-orange/30 p-8">
          <p className="font-bebas text-3xl tracking-wider text-brand-orange mb-2">MESSAGE RECEIVED!</p>
          <p className="text-brand-gray text-sm">We'll get back to you within 24 hours.</p>
          <button onClick={() => setSent(false)} className="text-brand-orange text-xs tracking-wider uppercase mt-4 hover:underline">
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory px-4 py-3.5 text-sm outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40";
  const labelClass = "block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>Name</label>
        <input {...register("name")} className={inputClass} placeholder="Your name" />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message as string}</p>}
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input {...register("email")} type="email" className={inputClass} placeholder="your@email.com" />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message as string}</p>}
      </div>
      <div>
        <label className={labelClass}>Subject (optional)</label>
        <input {...register("subject")} className={inputClass} placeholder="Order inquiry, collab..." />
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea {...register("message")} rows={6} className={`${inputClass} resize-none`} placeholder="Tell us what's on your mind..." />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message as string}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center gap-2 bg-brand-orange text-brand-ivory px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-brand-orange-dark transition-colors disabled:opacity-50"
      >
        <Send size={14} />
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
