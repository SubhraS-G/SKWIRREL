import { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";
import Link from "next/link";

export const metadata: Metadata = { title: "Create Account — SKWIRREL" };

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-md py-16">
        <div className="text-center mb-10">
          <Link href="/" className="font-bebas text-3xl tracking-widest text-brand-ivory">
            SK<span className="text-brand-orange">W</span>IRREL
          </Link>
          <h1 className="font-bebas text-4xl text-brand-ivory mt-4">JOIN THE MOVEMENT</h1>
          <p className="text-brand-gray text-sm mt-2">Create your SKWIRREL account</p>
        </div>
        <SignupForm />
        <p className="text-center text-brand-gray text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-orange hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
