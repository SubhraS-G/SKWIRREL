"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/lib/validations";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export function SignupForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      await signIn("credentials", { email: data.email, password: data.password, redirect: false });
      toast.success("Welcome to SKWIRREL!");
      router.push("/account");
    } catch (err: any) {
      toast.error(err.message ?? "Registration failed");
    }
  };

  const inputClass = "w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory px-4 py-3.5 text-sm outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5">Full Name</label>
        <input {...register("name")} className={inputClass} placeholder="Your name" />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5">Email</label>
        <input {...register("email")} type="email" className={inputClass} placeholder="you@email.com" />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5">Password</label>
        <div className="relative">
          <input {...register("password")} type={showPass ? "text" : "password"} className={`${inputClass} pr-11`} placeholder="Min 8 chars, 1 uppercase, 1 number" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-ivory transition-colors">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
      </div>
      <div>
        <label className="block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5">Confirm Password</label>
        <input {...register("confirmPassword")} type="password" className={inputClass} placeholder="Repeat password" />
        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>
      <p className="text-brand-gray text-[0.6rem] leading-relaxed">
        By creating an account you agree to our{" "}
        <a href="/terms" className="text-brand-orange hover:underline">Terms</a> and{" "}
        <a href="/privacy-policy" className="text-brand-orange hover:underline">Privacy Policy</a>.
      </p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-orange text-brand-ivory py-4 font-bebas text-xl tracking-widest hover:bg-brand-orange-dark transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
