import { useEffect, useRef, useState } from "react";

export type MouseState = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  vx: number;
  vy: number;
};

const initial: MouseState = {
  x: 0,
  y: 0,
  nx: 0,
  ny: 0,
  vx: 0,
  vy: 0,
};

export function useMousePosition() {
  const [mouse, setMouse] = useState<MouseState>(initial);
  const prev = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (raf.current == null) {
        raf.current = requestAnimationFrame(() => {
          const { x, y } = target.current;
          const w = window.innerWidth || 1;
          const h = window.innerHeight || 1;
          const vx = x - prev.current.x;
          const vy = y - prev.current.y;
          prev.current = { x, y };
          setMouse({
            x,
            y,
            nx: (x / w) * 2 - 1,
            ny: (y / h) * 2 - 1,
            vx,
            vy,
          });
          raf.current = null;
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return mouse;
}

export function useSmoothMouse(lerp = 0.12) {
  const raw = useMousePosition();
  const [smooth, setSmooth] = useState<MouseState>(initial);
  const current = useRef<MouseState>(initial);

  useEffect(() => {
    let frame: number;
    const tick = () => {
      const c = current.current;
      c.x += (raw.x - c.x) * lerp;
      c.y += (raw.y - c.y) * lerp;
      c.nx += (raw.nx - c.nx) * lerp;
      c.ny += (raw.ny - c.ny) * lerp;
      c.vx = raw.vx;
      c.vy = raw.vy;
      setSmooth({ ...c });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [raw, lerp]);

  return smooth;
}
