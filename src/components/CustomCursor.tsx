import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* Dual cursor: small lime dot + trailing ring that expands on [data-cursor] */

type CursorMode = "default" | "hover" | "view";

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 550, damping: 35, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 550, damping: 35, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.6 });
  const coarse = useRef(false);

  useEffect(() => {
    coarse.current =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (coarse.current) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      if (t) {
        setMode((t.dataset.cursor as CursorMode) || "hover");
        setLabel(t.dataset.cursorLabel || "");
      } else {
        const interactive = (e.target as HTMLElement)?.closest?.(
          "a, button, select, input, textarea",
        );
        setMode(interactive ? "hover" : "default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const active = mode !== "default";
  const ringSize = label ? 92 : active ? 60 : 38;

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[100]">
      {/* dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-acid"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: active ? 6 : 8,
          height: active ? 6 : 8,
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 16px rgba(197,224,28,0.8)",
        }}
      />
      {/* ring */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          border: "1.5px solid rgba(197,224,28,0.75)",
          background: label
            ? "rgba(197,224,28,0.92)"
            : active
              ? "rgba(197,224,28,0.08)"
              : "transparent",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {label && (
          <span className="text-[10px] font-bold tracking-[0.2em] text-ink uppercase">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
