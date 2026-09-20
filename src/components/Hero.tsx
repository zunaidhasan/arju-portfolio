import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import ServiceIcon from "./ServiceIcon";
import { heroStats, profile } from "../data/portfolio";
import type { MouseState } from "../hooks/useMousePosition";
import type { Service } from "../data/portfolio";

/* Floating badges orbiting the hero card — each reacts at its own depth */
const orbitBadges: Array<{
  icon: Service["icon"];
  label: string;
  className: string;
  depth: number;
  delay: string;
}> = [
  {
    icon: "pen",
    label: "Logo",
    className: "-top-5 -left-4 md:-left-8",
    depth: 26,
    delay: "0s",
  },
  {
    icon: "layers",
    label: "UI/UX",
    className: "top-1/3 -right-3 md:-right-7",
    depth: 40,
    delay: "0.8s",
  },
  {
    icon: "share",
    label: "Social",
    className: "-bottom-5 left-8",
    depth: 30,
    delay: "1.6s",
  },
  {
    icon: "play",
    label: "Video",
    className: "top-6 right-10 hidden sm:flex",
    depth: 18,
    delay: "2.2s",
  },
];

function PhotoSlot() {
  /* ★★★ PHOTO SLOT — to use the real portrait:
     1. Save photo as `public/images/arju-portrait.jpg`
     2. Set PHOTO_SRC in src/data/portfolio.ts to "/images/arju-portrait.jpg"
     The <img> below renders automatically once PHOTO_SRC is set. */
  const src = profile.PHOTO_SRC;
  if (src) {
    return (
      <img
        src={src}
        alt={`${profile.name} — ${profile.role}`}
        className="h-full w-full rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-acid via-acid-deep to-[#4a5a08] text-4xl font-black tracking-tight text-ink"
    >
      {profile.initials}
    </span>
  );
}

export default function Hero({ mouse }: { mouse: MouseState }) {
  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-line/60 pt-28 pb-10"
    >
      {/* lime aura behind hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 42% at 78% 30%, rgba(197,224,28,0.13), transparent 60%), radial-gradient(ellipse 40% 32% at 12% 78%, rgba(197,224,28,0.07), transparent 60%)",
        }}
      />

      <div className="section-pad relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* ------- copy ------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-card/80 px-4 py-2 text-xs font-medium tracking-wide text-cream/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-acid opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-acid" />
            </span>
            {profile.location} · {profile.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display max-w-3xl text-[clamp(2.5rem,6.5vw,4.9rem)] leading-[1.02] font-bold tracking-[-0.055em]"
            style={{
              transform: `translate3d(${mouse.nx * 8}px, ${mouse.ny * 6}px, 0)`,
            }}
          >
            Level up your brand
            <br />
            with <span className="text-white">CREATIVE</span>{" "}
            <em className="font-script text-acid-glow font-medium italic">
              Designs
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-fog md:text-lg"
          >
            Hi, I'm{" "}
            <strong className="font-semibold text-cream">
              {profile.shortName}
            </strong>{" "}
            — {profile.role} & {profile.role2}. {profile.heroBio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                data-cursor="hover"
                data-cursor-label="Go"
                className="premium-button inline-flex items-center gap-2 rounded-full bg-acid px-8 py-4 text-sm font-bold text-ink shadow-[0_0_36px_rgba(197,224,28,0.35)] transition hover:bg-acid-bright"
              >
                Start a Project
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#work"
                data-cursor="hover"
                data-cursor-label="View"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-8 py-4 text-sm font-bold text-cream transition hover:border-acid/60 hover:text-acid"
              >
                View Work
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* ------- 3D floating card ------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
          style={{
            transform: `translate3d(${mouse.nx * -12}px, ${mouse.ny * -10}px, 0)`,
          }}
        >
          {/* lime glow */}
          <div
            aria-hidden
            className="animate-pulse-acid absolute -inset-5 rounded-[2.2rem] bg-acid/15 blur-3xl"
          />

          <TiltCard maxTilt={16} className="rounded-[1.75rem]">
            <div className="card-dark relative overflow-hidden rounded-[1.75rem] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:p-7">
              {/* top sheen */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-acid/15 to-transparent"
              />
              <div className="relative mb-5 flex items-center justify-between">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-acid" />
                </div>
                <span className="rounded-full border border-acid/30 bg-acid/10 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-acid uppercase">
                  Designer
                </span>
              </div>

              <div className="relative flex items-center gap-5">
                {/* ★ PHOTO: circular portrait w/ lime ring + glow */}
                <div className="relative h-28 w-28 shrink-0 md:h-32 md:w-32">
                  <div
                    aria-hidden
                    className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-acid via-acid-deep to-transparent blur-[6px]"
                  />
                  <div className="relative h-full w-full rounded-full border-[3px] border-acid bg-coal p-1 shadow-[0_0_36px_rgba(197,224,28,0.4)]">
                    <PhotoSlot />
                  </div>
                  <span
                    aria-hidden
                    className="absolute right-1 bottom-1 h-5 w-5 rounded-full border-[3px] border-card bg-acid"
                  />
                </div>
                <div>
                  <p className="text-xl font-extrabold tracking-tight md:text-2xl">
                    {profile.shortName}
                  </p>
                  <p className="mt-1 text-sm text-acid">{profile.role}</p>
                  <p className="text-xs text-fog">{profile.role2}</p>
                </div>
              </div>

              <div className="relative mt-6 flex flex-wrap gap-2">
                {["Figma", "Branding", "UI/UX", "WordPress", "Video"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-ink/60 px-3 py-1.5 text-xs font-medium text-cream/75"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>

              <div className="relative mt-6 flex items-center justify-between rounded-2xl border border-line bg-ink/60 px-4 py-3">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-fog uppercase">
                    Response time
                  </p>
                  <p className="text-sm font-bold text-cream">
                    ~1 hour <span className="text-acid">●</span>
                  </p>
                </div>
                <a
                  href="#contact"
                  data-cursor="hover"
                  data-cursor-label="Hire"
                  className="rounded-full bg-acid px-5 py-2.5 text-xs font-bold text-ink transition hover:bg-acid-bright"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </TiltCard>

          {/* floating service badges reacting to cursor at different depths */}
          {orbitBadges.map((b) => (
            <div
              key={b.label}
              aria-hidden
              className={`animate-float absolute ${b.className} items-center gap-2 rounded-2xl border border-line bg-card/90 px-3.5 py-2.5 text-xs font-bold shadow-xl backdrop-blur`}
              style={{
                animationDelay: b.delay,
                transform: `translate3d(${mouse.nx * b.depth}px, ${mouse.ny * b.depth * 0.7}px, 0)`,
              }}
            >
              <span className="text-acid">
                <ServiceIcon icon={b.icon} className="h-5 w-5" />
              </span>
              {b.label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ------- live stats bar ------- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="section-pad relative z-10 mx-auto mt-14 w-full max-w-7xl"
      >
        <dl className="card-dark grid grid-cols-2 divide-line overflow-hidden rounded-3xl sm:grid-cols-4 sm:divide-x">
          {heroStats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-1 px-4 py-5 md:py-6 ${
                i >= 2 ? "border-t border-line sm:border-t-0" : ""
              } ${i === 2 ? "border-l-0" : ""}`}
            >
              <dd className="text-3xl font-black tracking-tight text-acid md:text-4xl">
                {s.value}
              </dd>
              <dt className="text-[11px] font-semibold tracking-[0.16em] text-fog uppercase">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
