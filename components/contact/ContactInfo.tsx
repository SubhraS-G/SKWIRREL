import { MapPin, Mail, Phone, Instagram, Clock } from "lucide-react";

export function ContactInfo() {
  const INFO = [
    { icon: MapPin, label: "Address", value: "Bhubaneswar, Odisha 751001, India" },
    { icon: Mail, label: "Email", value: "hello@skwirrel.in", href: "mailto:hello@skwirrel.in" },
    { icon: Phone, label: "WhatsApp", value: "+91 XXXXX XXXXX", href: "https://wa.me/91XXXXXXXXXX" },
    { icon: Clock, label: "Response Time", value: "Within 24 hours" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-3">Get In Touch</p>
        <h2 className="font-bebas text-4xl text-brand-ivory mb-4">WE'D LOVE TO<br />HEAR FROM YOU.</h2>
        <p className="text-brand-gray text-sm leading-relaxed">
          Have a question about an order, a collaboration idea, or just want to share your SKWIRREL story? We're all ears.
        </p>
      </div>

      <div className="space-y-4">
        {INFO.map(({ icon: Icon, label, value, href }: any) => (
          <div key={label} className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
              <Icon size={15} className="text-brand-orange" />
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase mb-0.5">{label}</p>
              {href ? (
                <a href={href} className="text-brand-ivory text-sm hover:text-brand-orange transition-colors">{value}</a>
              ) : (
                <p className="text-brand-ivory text-sm">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Map embed placeholder */}
      <div className="aspect-video bg-[#0d0d0d] border border-white/5 flex items-center justify-center">
        <div className="text-center">
          <MapPin size={28} className="text-brand-orange mx-auto mb-2" />
          <p className="text-brand-gray text-xs">Bhubaneswar, Odisha</p>
          <a
            href="https://maps.google.com/?q=Bhubaneswar+Odisha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-orange text-xs tracking-wider uppercase hover:underline mt-2 block"
          >
            Open in Maps →
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <a
          href="https://instagram.com/skwirrelindia"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-brand-gray text-xs hover:text-brand-orange transition-colors"
        >
          <Instagram size={15} />
          @skwirrelindia
        </a>
      </div>
    </div>
  );
}
