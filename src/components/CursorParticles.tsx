import { useEffect, useRef } from "react";

/* Lightweight 2D canvas: lime sparkles drift toward & follow the mouse.
   Skipped entirely on touch devices / prefers-reduced-motion. */

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

export default function CursorParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const parts: P[] = [];
    const mouse = { x: -999, y: -999 };
    let raf = 0;
    let lastSpawn = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const now = performance.now();
      if (now - lastSpawn > 40 && parts.length < 90) {
        lastSpawn = now;
        parts.push({
          x: e.clientX + (Math.random() - 0.5) * 24,
          y: e.clientY + (Math.random() - 0.5) * 24,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.3,
          life: 0,
          maxLife: 50 + Math.random() * 40,
          size: 1 + Math.random() * 2.2,
        });
      }
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        // gentle attraction toward cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 220) {
          p.vx += (dx / d) * 0.012;
          p.vy += (dy / d) * 0.012;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = Math.max(0, 1 - p.life / p.maxLife) * 0.7;
        if (alpha <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,224,28,${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}
