import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — SKWIRREL" };

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
        <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-2">Legal</p>
        <h1 className="font-bebas text-5xl text-brand-ivory mb-10">PRIVACY POLICY</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-8">
          {[
            { title: "Information We Collect", body: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes name, email address, phone number, shipping address, and payment information." },
            { title: "How We Use Your Information", body: "We use the information we collect to process orders, send order confirmations and shipping updates, respond to customer service requests, and send marketing communications (with your consent)." },
            { title: "Information Sharing", body: "We do not sell, trade, or otherwise transfer your personal information to outside parties except to provide services (e.g., payment processors, shipping partners) or as required by law." },
            { title: "Data Security", body: "We implement appropriate security measures to protect your personal information. All payments are processed via secure, encrypted channels through Stripe and Razorpay." },
            { title: "Cookies", body: "We use cookies to enhance your browsing experience, remember your cart, and analyze site traffic. You can disable cookies in your browser settings." },
            { title: "Your Rights", body: "You have the right to access, update, or delete your personal data. Contact us at hello@skwirrel.in to exercise these rights." },
            { title: "Contact", body: "For any privacy-related questions, contact us at hello@skwirrel.in or write to SKWIRREL, Bhubaneswar, Odisha 751001, India." },
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
