import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = { title: "Login — SKWIRREL" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-md py-16">
        <div className="text-center mb-10">
          <Link href="/" className="font-bebas text-3xl tracking-widest text-brand-ivory">
            SK<span className="text-brand-orange">W</span>IRREL
          </Link>
          <h1 className="font-bebas text-4xl text-brand-ivory mt-4">WELCOME BACK</h1>
          <p className="text-brand-gray text-sm mt-2">Sign in to your account</p>
        </div>
        <LoginForm />
        <p className="text-center text-brand-gray text-sm mt-6">
          No account?{" "}
          <Link href="/signup" className="text-brand-orange hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
