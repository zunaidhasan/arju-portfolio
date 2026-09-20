import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LINKS, type Project } from "../data/portfolio";

/* Full-screen case-study modal with GSAP open/close + Esc + focus handling */

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const animateClose = () => {
    if (closing.current) return;
    closing.current = true;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      onClose();
      return;
    }
    gsap.to(panelRef.current, {
      y: 60,
      opacity: 0,
      scale: 0.97,
      duration: 0.35,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduced) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { y: 70, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.08,
        },
      );
    }
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) animateClose();
      }}
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div
        ref={panelRef}
        className="card-dark relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[1.75rem] sm:rounded-[1.75rem]"
      >
        {/* hero visual */}
        <div
          className="relative flex min-h-56 flex-col justify-end overflow-hidden p-7 sm:min-h-64 md:p-10"
          style={{
            background: `linear-gradient(140deg, ${project.gradient[0]} 0%, ${project.gradient[1]} 85%)`,
          }}
        >
          {/* real Behance cover — gradient above acts as loading/fallback backdrop */}
          {project.cover && (
            <img
              src={project.cover}
              alt={`${project.title} — cover`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* legibility scrim behind text */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
          />
          <span
            aria-hidden
            className="absolute -top-6 right-4 text-[9rem] leading-none font-black text-white/10 select-none md:text-[12rem]"
          >
            {project.mark}
          </span>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(197,224,28,0.25), transparent 50%)",
            }}
          />
          <div className="relative flex flex-wrap gap-2">
            <span className="rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-bold tracking-widest uppercase backdrop-blur">
              {project.category}
            </span>
            <span className="rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-bold tracking-widest text-white/70 uppercase backdrop-blur">
              {project.year}
            </span>
          </div>
          <h3 className="relative mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
            {project.title}
          </h3>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={animateClose}
          data-cursor="hover"
          aria-label="Close case study"
          className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-lg backdrop-blur transition hover:rotate-90 hover:border-acid hover:text-acid"
        >
          ✕
        </button>

        <div className="p-7 md:p-10">
          <p className="text-xs font-bold tracking-[0.25em] text-acid uppercase">
            Case Study
          </p>
          <p className="mt-3 leading-relaxed text-cream/80">
            {project.caseStudy}
          </p>

          <p className="mt-8 text-xs font-bold tracking-[0.25em] text-fog uppercase">
            Tools used
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-ink px-4 py-1.5 text-sm font-medium text-cream/80"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={project.url ?? LINKS.behance}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              data-cursor-label="Open"
              className="rounded-full bg-acid px-7 py-3.5 text-sm font-bold text-ink transition hover:bg-acid-bright"
            >
              View on Behance ↗
            </a>
            <button
              type="button"
              onClick={animateClose}
              data-cursor="hover"
              className="rounded-full border border-line px-7 py-3.5 text-sm font-bold text-cream transition hover:border-acid/60"
            >
              Back to work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
