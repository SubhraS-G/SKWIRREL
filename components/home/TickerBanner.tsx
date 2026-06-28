export function TickerBanner() {
  const items = [
    "Born From Odisha",
    "✦",
    "Wear Your Culture With Pride",
    "✦",
    "Made For The World",
    "✦",
    "Culture Is Clothing",
    "✦",
    "Sustainable · Authentic · Bold",
    "✦",
    "From Nature. Made To Wear.",
    "✦",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="bg-brand-orange py-3 overflow-hidden">
      <div className="flex gap-8 whitespace-nowrap animate-ticker">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`font-bebas text-sm tracking-[0.18em] flex-shrink-0 ${
              item === "✦" ? "text-brand-ivory/50" : "text-brand-ivory"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
