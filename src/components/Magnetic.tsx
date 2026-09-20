import { useRef, type ReactNode, type MouseEvent } from "react";

/* Magnetic wrapper — pulls its child toward the cursor. */

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  cursorLabel?: string;
};

export default function Magnetic({
  children,
  className = "",
  strength = 0.35,
  cursorLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      className={`magnetic-btn inline-block ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={cursorLabel ? "hover" : undefined}
      data-cursor-label={cursorLabel}
    >
      {children}
    </div>
  );
}
