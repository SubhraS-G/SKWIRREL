"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-md py-16">
        <div className="text-center mb-10">
          <Link href="/" className="font-bebas text-3xl tracking-widest text-brand-ivory">
            SK<span className="text-brand-orange">W</span>IRREL
          </Link>
          <h1 className="font-bebas text-4xl text-brand-ivory mt-4">RESET PASSWORD</h1>
          <p className="text-brand-gray text-sm mt-2">Enter your email and we'll send a reset link.</p>
        </div>

        {sent ? (
          <div className="bg-brand-orange/10 border border-brand-orange/30 p-6 text-center">
            <p className="text-brand-orange font-bebas text-xl tracking-wider mb-2">CHECK YOUR INBOX</p>
            <p className="text-brand-gray text-sm">If an account exists for {email}, you'll receive a password reset link shortly.</p>
            <Link href="/login" className="text-brand-orange text-xs tracking-wider uppercase mt-4 block hover:underline">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory px-4 py-3.5 text-sm outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40"
                placeholder="you@email.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange text-brand-ivory py-4 font-bebas text-xl tracking-widest hover:bg-brand-orange-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <p className="text-center">
              <Link href="/login" className="text-brand-gray text-xs hover:text-brand-orange transition-colors">
                Back to login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
