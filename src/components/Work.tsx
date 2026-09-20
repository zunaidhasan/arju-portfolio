import { useState } from "react";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { LINKS, projects, type Project } from "../data/portfolio";

export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" aria-label="Selected work" className="section-pad relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-bold tracking-[0.25em] text-acid uppercase">
                Selected Work
              </p>
              <h2 className="max-w-xl text-4xl font-extrabold tracking-tight md:text-5xl">
                Projects that{" "}
                <em className="font-script text-acid font-medium italic">
                  speak visually
                </em>
              </h2>
            </div>
            <a
              href={LINKS.behance}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="text-sm font-medium text-fog underline-offset-4 transition hover:text-acid hover:underline"
            >
              View full Behance gallery →
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08} className="h-full">
              <TiltCard maxTilt={7} className="h-full rounded-3xl">
                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  data-cursor="view"
                  data-cursor-label="Open"
                  aria-haspopup="dialog"
                  className="project-card card-dark group block h-full w-full overflow-hidden rounded-3xl text-left transition-colors hover:border-acid/50"
                >
                  <div
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{
                      background: `linear-gradient(140deg, ${p.gradient[0]} 0%, ${p.gradient[1]} 85%)`,
                    }}
                  >
                    {/* real Behance cover — gradient above acts as loading/fallback backdrop */}
                    {p.cover && (
                      <img
                        src={p.cover}
                        alt={`${p.title} — cover`}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}
                    <span
                      aria-hidden
                      className="project-img absolute -right-2 -bottom-8 text-[8.5rem] leading-none font-black text-white/12 select-none"
                    >
                      {p.mark}
                    </span>
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-60"
                      style={{
                        background:
                          "radial-gradient(circle at 75% 25%, rgba(197,224,28,0.22), transparent 45%)",
                      }}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold backdrop-blur">
                        {p.category}
                      </span>
                    </div>
                    <span className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-acid text-lg font-bold text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                      ↗
                    </span>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold tracking-tight md:text-xl">
                        {p.title}
                      </h3>
                      <span className="shrink-0 text-xs font-semibold text-fog">
                        {p.year}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-fog">{p.blurb}</p>
                  </div>
                </button>
              </TiltCard>
            </Reveal>
          ))}

        </div>

        {/* full-width Behance band with real profile stats */}
        <Reveal delay={0.1}>
          <a
            href={LINKS.behance}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            data-cursor-label="Open"
            className="card-dark group mt-4 flex flex-col items-start justify-between gap-5 rounded-3xl p-7 transition hover:border-acid/50 sm:flex-row sm:items-center md:p-8"
          >
            <div className="flex items-center gap-5">
              <span
                aria-hidden
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-acid text-xl font-black text-ink shadow-[0_0_28px_rgba(197,224,28,0.35)]"
              >
                Bē
              </span>
              <div>
                <span className="block text-xl font-extrabold tracking-tight md:text-2xl">
                  12 case studies & more on Behance
                </span>
                <span className="mt-1 block text-sm text-fog">
                  1.2K+ views · 70+ appreciations · follow along for new work
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3 text-sm font-bold text-ink transition group-hover:bg-acid-bright">
              Explore the gallery <span aria-hidden>→</span>
            </span>
          </a>
        </Reveal>
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
