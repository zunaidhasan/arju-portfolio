import { marqueeItems } from "../data/portfolio";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <section
      aria-label="Services ticker"
      className="relative overflow-hidden border-y border-line bg-coal py-5"
    >
      <div className="marquee-track items-center gap-10">
        {items.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="text-2xl font-extrabold tracking-tight whitespace-nowrap text-cream/85 md:text-3xl">
              {item}
            </span>
            <span aria-hidden className="text-xl text-acid">
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
