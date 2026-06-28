import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service — SKWIRREL" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
        <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-2">Legal</p>
        <h1 className="font-bebas text-5xl text-brand-ivory mb-10">TERMS OF SERVICE</h1>
        <div className="space-y-8">
          {[
            { title: "Acceptance of Terms", body: "By accessing and using the SKWIRREL website, you accept and agree to be bound by these terms. If you do not agree, please do not use our site." },
            { title: "Products & Pricing", body: "All prices are in Indian Rupees (INR) and inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time without notice." },
            { title: "Orders & Payment", body: "By placing an order, you confirm that all information provided is accurate. We accept payment via UPI, credit/debit cards, netbanking, and international cards. Orders are confirmed only after successful payment." },
            { title: "Shipping & Delivery", body: "We ship across India. Estimated delivery times are 2-7 business days depending on location. Free shipping on orders above ₹999. International shipping available on request." },
            { title: "Returns & Exchanges", body: "We accept returns within 7 days of delivery for unworn, unwashed items with original tags. Exchange requests are processed within 5 business days. Contact hello@skwirrel.in to initiate a return." },
            { title: "Intellectual Property", body: "All content on this site — including logos, text, graphics, and designs — is the property of SKWIRREL and protected by copyright law. Unauthorized use is strictly prohibited." },
            { title: "Limitation of Liability", body: "SKWIRREL is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website." },
            { title: "Governing Law", body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bhubaneswar, Odisha." },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="font-bebas text-2xl tracking-wider text-brand-orange mb-2">{section.title}</h2>
              <p className="text-brand-gray text-sm leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
