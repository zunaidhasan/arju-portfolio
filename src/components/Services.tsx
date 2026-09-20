import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";
import TiltCard from "./TiltCard";
import { services } from "../data/portfolio";

export default function Services() {
  return (
    <section id="services" aria-label="Services" className="section-pad relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-acid uppercase">
            What I Do
          </p>
          <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">
            Services engineered for{" "}
            <em className="font-script text-acid font-medium italic">impact</em>
          </h2>
          <p className="mt-4 max-w-xl text-fog">
            Seven crafts, one standard: work that looks premium and performs
            even better.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.07} className="h-full">
              <TiltCard maxTilt={10} className="h-full rounded-3xl">
                <Magnetic
                  strength={0.06}
                  className="block h-full w-full"
                >
                  <article
                    data-cursor="hover"
                    className="card-dark group flex h-full min-h-[240px] flex-col rounded-3xl p-6 transition-colors duration-300 hover:border-acid/50"
                  >
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-acid/30 bg-acid/10 text-acid transition group-hover:bg-acid group-hover:text-ink">
                      <ServiceIcon icon={s.icon} />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">
                      {s.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-cream/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </Magnetic>
              </TiltCard>
            </Reveal>
          ))}

          {/* 8th tile — CTA to complete the grid */}
          <Reveal delay={0.21} className="h-full">
            <TiltCard maxTilt={10} className="h-full rounded-3xl">
              <a
                href="#contact"
                data-cursor="hover"
                data-cursor-label="Go"
                className="flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl bg-acid p-6 text-ink transition hover:bg-acid-bright"
              >
                <span className="text-4xl" aria-hidden>
                  ✦
                </span>
                <span>
                  <span className="block text-xl font-extrabold tracking-tight">
                    Need something custom?
                  </span>
                  <span className="mt-2 block text-sm font-medium opacity-80">
                    Tell me about your project — let's make it iconic.
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                    Let's talk <span aria-hidden>→</span>
                  </span>
                </span>
              </a>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
