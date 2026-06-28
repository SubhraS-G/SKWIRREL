"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validations";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export function LoginForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Welcome back!");
      router.push("/account");
      router.refresh();
    }
  };

  const handleGoogle = () => signIn("google", { callbackUrl: "/account" });

  const inputClass = "w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory px-4 py-3.5 text-sm outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40";

  return (
    <div className="space-y-4">
      <button
        onClick={handleGoogle}
        className="w-full border border-white/10 text-brand-ivory py-3.5 text-sm flex items-center justify-center gap-3 hover:border-brand-gray/30 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/><path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/></svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-brand-gray text-xs">or</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5">Email</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="you@email.com" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase">Password</label>
            <Link href="/forgot-password" className="text-[0.6rem] text-brand-orange hover:underline">Forgot?</Link>
          </div>
          <div className="relative">
            <input {...register("password")} type={showPass ? "text" : "password"} className={`${inputClass} pr-11`} placeholder="••••••••" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-ivory transition-colors">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-orange text-brand-ivory py-4 font-bebas text-xl tracking-widest hover:bg-brand-orange-dark transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
