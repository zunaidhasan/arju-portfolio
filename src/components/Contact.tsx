import { useState, type FormEvent } from "react";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { LINKS, profile, projectTypes } from "../data/portfolio";

/* ============================================================
   ★★★ FORM ENDPOINT — choose one:
   Option A (Formspree, recommended): create a form at formspree.io,
     then set FORMSPREE_ID below (e.g. "mnqwyrzp").
     The submit handler will POST to https://formspree.io/f/<id>.
   Option B (EmailJS): install @emailjs/browser and call
     emailjs.send(...) inside handleSubmit instead.
   Demo mode (default, FORMSPREE_ID = ""): simulates a send,
     logs the payload to console and shows the success state.
   ============================================================ */
const FORMSPREE_ID = "";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("send failed");
      } else {
        // demo mode
        await new Promise((r) => setTimeout(r, 1000));
        console.log("[contact form demo] payload:", data);
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-line bg-ink/70 px-4 py-3.5 text-sm text-cream placeholder:text-fog/60 transition focus:border-acid/70 focus:outline-none";

  return (
    <section id="contact" aria-label="Contact" className="section-pad relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 85%, rgba(197,224,28,0.1), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-center text-xs font-bold tracking-[0.25em] text-acid uppercase">
            Let's Collaborate
          </p>
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-extrabold tracking-tight md:text-6xl">
            Ready to{" "}
            <em className="font-script text-acid font-medium italic">
              level up
            </em>{" "}
            your brand?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-fog">
            Tell me about your project — I usually reply within 24 hours.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] md:mt-16">
          {/* info panel */}
          <Reveal className="h-full">
            <TiltCard maxTilt={6} className="h-full rounded-[1.75rem]">
              <div className="card-dark flex h-full flex-col justify-between rounded-[1.75rem] p-7 md:p-9">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-acid">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-acid opacity-60" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-acid" />
                    </span>
                    {profile.availability}
                  </div>
                  <p className="mt-5 text-lg leading-relaxed text-cream/80">
                    Prefer hiring through a platform? Find me on Upwork, or
                    browse the full archive on Behance.
                  </p>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 font-bold text-fog">Based</dt>
                      <dd>{profile.location}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 font-bold text-fog">Focus</dt>
                      <dd>Logo · Branding · UI/UX · Social · Ads</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 font-bold text-fog">Reply</dt>
                      <dd>Within 24 hours</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Magnetic strength={0.2} className="flex-1">
                    <a
                      href={LINKS.upwork}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      data-cursor-label="Hire"
                      className="block rounded-full bg-acid px-6 py-3.5 text-center text-sm font-bold text-ink transition hover:bg-acid-bright"
                    >
                      Hire on Upwork ↗
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2} className="flex-1">
                    <a
                      href={LINKS.behance}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      data-cursor-label="View"
                      className="block rounded-full border border-line bg-ink px-6 py-3.5 text-center text-sm font-bold transition hover:border-acid/60 hover:text-acid"
                    >
                      View Behance ↗
                    </a>
                  </Magnetic>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* form panel */}
          <Reveal delay={0.1} className="h-full">
            <div className="card-dark h-full rounded-[1.75rem] p-7 md:p-9">
              {status === "sent" ? (
                <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-acid text-2xl font-black text-ink shadow-[0_0_40px_rgba(197,224,28,0.5)]">
                    ✓
                  </span>
                  <h3 className="mt-6 text-2xl font-extrabold">
                    Message sent!
                  </h3>
                  <p className="mt-2 max-w-sm text-fog">
                    Thanks for reaching out — I'll get back to you within 24
                    hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    data-cursor="hover"
                    className="mt-6 rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-acid/60 hover:text-acid"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="cf-name"
                        className="mb-1.5 block text-xs font-bold tracking-wider text-fog uppercase"
                      >
                        Name *
                      </label>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cf-email"
                        className="mb-1.5 block text-xs font-bold tracking-wider text-fog uppercase"
                      >
                        Email *
                      </label>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@email.com"
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="cf-type"
                      className="mb-1.5 block text-xs font-bold tracking-wider text-fog uppercase"
                    >
                      Project type *
                    </label>
                    <select
                      id="cf-type"
                      name="projectType"
                      required
                      defaultValue=""
                      className={`${inputCls} appearance-none`}
                    >
                      <option value="" disabled>
                        Select a service…
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-ink">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="cf-msg"
                      className="mb-1.5 block text-xs font-bold tracking-wider text-fog uppercase"
                    >
                      Message *
                    </label>
                    <textarea
                      id="cf-msg"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your goals, timeline and budget…"
                      className={`${inputCls} resize-y`}
                    />
                  </div>
                  {status === "error" && (
                    <p role="alert" className="text-sm font-medium text-red-400">
                      Something went wrong. Please try again or reach me via
                      Upwork.
                    </p>
                  )}
                  <Magnetic strength={0.12} className="block">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor="hover"
                      data-cursor-label="Send"
                      className="w-full rounded-full bg-acid px-8 py-4 text-sm font-bold text-ink shadow-[0_0_32px_rgba(197,224,28,0.3)] transition hover:bg-acid-bright disabled:cursor-wait disabled:opacity-70"
                    >
                      {status === "sending" ? "Sending…" : "Send Message →"}
                    </button>
                  </Magnetic>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
