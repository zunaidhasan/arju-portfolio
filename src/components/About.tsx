import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { LINKS, heroStats, profile, skills } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" aria-label="About" className="section-rule section-pad relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 42% 36% at 12% 60%, rgba(197,224,28,0.07), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* portrait + quick facts */}
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-acid uppercase">
              About Me
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Visual storyteller,{" "}
              <em className="font-script text-acid font-medium italic">
                human-centered
              </em>{" "}
              maker
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex items-center gap-5">
              <div className="relative h-20 w-20 shrink-0">
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-full bg-acid/40 blur-md"
                />
                {/* ★ Same PHOTO_SRC slot as hero — uses real photo once set */}
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-acid bg-coal">
                  {profile.PHOTO_SRC ? (
                    <img
                      src={profile.PHOTO_SRC}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-acid to-acid-deep text-xl font-black text-ink"
                    >
                      {profile.initials}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="font-bold">{profile.name}</p>
                <p className="text-sm text-fog">
                  {profile.role} · {profile.location}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-acid">
                  <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                  {profile.availability}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 leading-relaxed text-cream/75 md:text-lg">
              {profile.aboutBio}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <a
                  href={LINKS.upwork}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  data-cursor-label="Hire"
                  className="inline-block rounded-full bg-acid px-7 py-3.5 text-sm font-bold text-ink transition hover:bg-acid-bright"
                >
                  Hire on Upwork
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={LINKS.behance}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  data-cursor-label="View"
                  className="inline-block rounded-full border border-line bg-card px-7 py-3.5 text-sm font-bold transition hover:border-acid/60 hover:text-acid"
                >
                  View Behance
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* skills + stats */}
        <div>
          <Reveal>
            <p className="text-xs font-bold tracking-[0.25em] text-fog uppercase">
              Toolbox
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  data-cursor="hover"
                  className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-cream/80 transition hover:border-acid/60 hover:text-acid"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {heroStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <TiltCard maxTilt={12} className="rounded-3xl">
                  <div
                    data-cursor="hover"
                    className="card-dark rounded-3xl p-6 text-center md:p-8"
                  >
                    <p className="text-4xl font-black tracking-tight text-acid md:text-5xl">
                      {s.value}
                    </p>
                    <p className="mt-2 text-[11px] font-bold tracking-[0.18em] text-fog uppercase">
                      {s.label}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="card-dark mt-4 rounded-3xl p-6 md:p-7">
              <p className="font-script text-xl text-cream/90 italic md:text-2xl">
                "Design is the silent ambassador of your brand — I make sure it
                speaks loudly."
              </p>
              <p className="mt-3 text-sm font-semibold text-acid">
                — {profile.shortName}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
