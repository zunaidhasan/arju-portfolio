import { LINKS, profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="section-pad relative border-t border-line bg-coal/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-acid text-xs font-black text-ink">
            A
          </span>
          <span className="font-extrabold tracking-tight">
            Arju<span className="text-acid">.</span>
          </span>
          <span className="ml-2 text-sm text-fog">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-6 text-sm text-fog">
          <a
            href={LINKS.upwork}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="transition hover:text-acid"
          >
            Upwork
          </a>
          <a
            href={LINKS.behance}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="transition hover:text-acid"
          >
            Behance
          </a>
          <a href="#top" data-cursor="hover" className="transition hover:text-acid">
            Back to top ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}
