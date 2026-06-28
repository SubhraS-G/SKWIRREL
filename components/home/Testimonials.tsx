const REVIEWS = [
  { quote: "Finally a brand that gets us. I wore the Temple Gate tee to a cultural event in Berlin and people couldn't stop asking about it.", author: "Priya Mohapatra", city: "Berlin, Germany" },
  { quote: "The quality is insane. Soft, premium feel and the Sambalpuri pattern print is so beautiful. Proud to wear Odisha everywhere I go.", author: "Rohan Das", city: "Bhubaneswar, Odisha" },
  { quote: "My grandmother cried when she saw the weave pattern on my hoodie. She said it reminded her of her old sarees. That's how powerful this is.", author: "Ananya Pattnaik", city: "Mumbai, India" },
  { quote: "The sustainability angle is real — you can feel the quality. This isn't fast fashion, it's something that lasts and means something.", author: "Subhranshu Behera", city: "Cuttack, Odisha" },
  { quote: "Every piece feels like it carries a story. Wearing SKWIRREL is like carrying a piece of Odisha with me to every city I visit.", author: "Deepika Nayak", city: "Bangalore, India" },
  { quote: "Got compliments all day at work. People thought it was some high-end European brand. Told them — nope, it's from Odisha.", author: "Amrit Jena", city: "Hyderabad, India" },
];

export function Testimonials() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section className="bg-brand-black py-20 overflow-hidden">
      <div className="px-6 lg:px-12 mb-10">
        <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-2">Community</p>
        <h2 className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none">
          WORN WITH <span className="text-brand-orange">PRIDE</span>
        </h2>
      </div>

      <div className="relative">
        <div
          className="flex gap-4 animate-test-scroll hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {doubled.map((r, i) => (
            <div
              key={i}
              className="w-72 lg:w-80 flex-shrink-0 bg-[#0d0d0d] border-l-2 border-brand-orange p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="text-brand-orange text-xs">★</span>
                ))}
              </div>
              <p className="font-playfair italic text-brand-ivory text-sm leading-relaxed mb-5">
                "{r.quote}"
              </p>
              <p className="text-[0.6rem] tracking-[0.2em] text-brand-orange uppercase">{r.author}</p>
              <p className="text-[0.6rem] text-brand-gray mt-0.5">{r.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
