import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact — SKWIRREL",
  description: "Get in touch with SKWIRREL. We're based in Bhubaneswar, Odisha.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        <div className="mb-12">
          <p className="text-brand-orange text-xs tracking-widest uppercase mb-2">Get In Touch</p>
          <h1 className="font-bebas text-6xl lg:text-8xl text-brand-ivory">CONTACT</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
