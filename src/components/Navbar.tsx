import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "./Magnetic";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <nav
          aria-label="Primary"
          className="section-pad mx-auto flex max-w-7xl items-center justify-between"
        >
          <a
            href="#top"
            data-cursor="hover"
            className="font-display flex items-center gap-2.5 text-lg font-bold tracking-tight"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-acid text-sm font-black text-ink shadow-[0_0_24px_rgba(197,224,28,0.45)]">
              A
            </span>
            Arju<span className="-ml-1.5 text-acid">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  className="rounded-full px-4 py-2 text-sm font-medium text-cream/70 transition hover:bg-white/5 hover:text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <span className="flex items-center gap-2 text-xs font-medium text-cream/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-acid opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-acid" />
              </span>
              Open to work
            </span>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                data-cursor="hover"
                data-cursor-label="Go"
                className="premium-button rounded-full bg-acid px-5 py-2.5 text-sm font-bold text-ink shadow-[0_0_28px_rgba(197,224,28,0.35)] transition hover:bg-acid-bright"
              >
                Start a Project
              </a>
            </Magnetic>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="hover"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card md:hidden"
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-cream transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-cream transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-cream transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-ink/95 backdrop-blur-2xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="rounded-xl px-6 py-3 text-4xl font-extrabold tracking-tight hover:text-acid"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-6 rounded-full bg-acid px-8 py-3.5 font-bold text-ink"
            >
              Start a Project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
