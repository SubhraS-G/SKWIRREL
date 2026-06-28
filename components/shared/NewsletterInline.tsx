"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setEmail("");
      toast.success("Subscribed!");
    } catch (err: any) {
      toast.error(err.message ?? "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-0 mt-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-white/5 border border-white/10 text-brand-ivory px-3 py-2 text-xs outline-none focus:border-brand-orange transition-colors placeholder:text-white/20"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-brand-orange text-brand-ivory px-4 py-2 text-xs hover:bg-brand-orange-dark transition-colors disabled:opacity-50"
      >
        {loading ? "..." : "Join"}
      </button>
    </form>
  );
}
