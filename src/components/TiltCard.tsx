import {
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* 3D tilt wrapper with cursor-following glare. Mouse-only, inert on touch. */

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
};

export default function TiltCard({
  children,
  className = "",
  maxTilt = 9,
  glare = true,
  scale = 1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 220, damping: 20 });
  const smy = useSpring(my, { stiffness: 220, damping: 20 });
  const rotateX = useTransform(smy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smx, [0, 1], [-maxTilt, maxTilt]);
  const gx = useTransform(smx, [0, 1], [0, 100]);
  const gy = useTransform(smy, [0, 1], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(197,224,28,0.16), transparent 55%)`;

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    const pt = (e as unknown as ReactPointerEvent).pointerType;
    if (!el || pt === "touch") return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900, scale }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
