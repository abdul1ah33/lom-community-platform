import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ParticleFieldProps {
  /** Particles per 10,000 px² of viewport. */
  density?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: "brass" | "crimson" | "fog";
  phase: number;
}

const COLORS = {
  brass: "226,192,126",
  crimson: "240,68,92",
  fog: "207,200,222",
} as const;

const GLOW_RADIUS = { brass: 7, crimson: 7, fog: 3 } as const;

/** Paints a soft glow once, so each frame can stamp it instead of blurring every particle. */
function createGlowSprite(rgb: string) {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, `rgba(${rgb},0.22)`);
    gradient.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return sprite;
}

/**
 * Rising embers and dust motes on a canvas. Particles drift upward, twinkle,
 * and part gently around the cursor. Freezes when motion is reduced and
 * pauses while the tab is hidden.
 */
export function ParticleField({ density = 0.9, className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    const pointer = { x: -9999, y: -9999 };
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const sprites = {
      brass: createGlowSprite(COLORS.brass),
      crimson: createGlowSprite(COLORS.crimson),
      fog: createGlowSprite(COLORS.fog),
    };

    const spawn = (anywhere: boolean): Particle => {
      const roll = Math.random();
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : height + 10,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.35 + 0.08),
        hue: roll < 0.55 ? "fog" : roll < 0.85 ? "brass" : "crimson",
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      // A phone's address bar changes the height while scrolling. Rebuilding here
      // would stall the scroll and make every particle jump to a new spot.
      if (isTouch && width > 0 && canvas.clientWidth === width) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((width * height) / 10_000) * density);
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reducedMotion) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0) {
            const push = (1 - dist / 120) * 0.9;
            p.x += (dx / dist) * push;
            p.y += (dy / dist) * push;
          }
          p.x += p.vx + Math.sin(time / 2400 + p.phase) * 0.12;
          p.y += p.vy;
          if (p.y < -10 || p.x < -10 || p.x > width + 10) Object.assign(p, spawn(false));
        }

        const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(time / 900 + p.phase));
        const glow = p.r + GLOW_RADIUS[p.hue];
        ctx.globalAlpha = 0.75 * twinkle;
        ctx.drawImage(sprites[p.hue], p.x - glow, p.y - glow, glow * 2, glow * 2);
        ctx.beginPath();
        ctx.fillStyle = `rgb(${COLORS[p.hue]})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
    />
  );
}
