"use client";

import { useEffect, useRef } from "react";

/**
 * The closing wordmark, drawn as a field of points.
 *
 * "UNIIX" is rasterised once in the display face and sampled into a grid of
 * dots. Near the pointer the dots scatter and warm to brand orange, then
 * spring home — the brand literally holds its shape. The loop only runs while
 * the footer is on screen and something is moving; at rest it costs nothing.
 *
 * Reduced motion: drawn once, static. The canvas is decorative (aria-hidden);
 * the footer carries the studio name as real text.
 */
export default function Wordmark({ text = "UNIIX" }: { text?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fontRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let step = 6;
    let px = new Float32Array(0); // x, y, ox, oy, vx, vy per point
    let count = 0;
    let raf = 0;
    let visible = false;
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      W = Math.round(rect.width);
      H = Math.round(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      if (!W || !H) return;

      const family = fontRef.current ? getComputedStyle(fontRef.current).fontFamily : "sans-serif";
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d");
      if (!o) return;
      let size = H * 1.05;
      o.font = `500 ${size}px ${family}`;
      const measured = o.measureText(text).width;
      size = Math.min(size, (size * W * 0.995) / measured);
      o.font = `500 ${size}px ${family}`;
      o.textBaseline = "alphabetic";
      o.fillStyle = "#fff";
      const m = o.measureText(text);
      const textH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
      o.fillText(text, (W - m.width) / 2, (H + textH) / 2 - m.actualBoundingBoxDescent);

      step = Math.max(4, Math.round(W / 220));
      const data = o.getImageData(0, 0, W, H).data;
      const pts: number[] = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 128) pts.push(x, y, x, y, 0, 0);
        }
      }
      px = new Float32Array(pts);
      count = pts.length / 6;
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const s = step * 0.62;
      const R = Math.max(90, W * 0.09);
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      for (let i = 0; i < count; i++) {
        const k = i * 6;
        const dx = px[k] - pointer.x;
        const dy = px[k + 1] - pointer.y;
        if (pointer.active && dx * dx + dy * dy < R * R) continue;
        ctx.fillRect(px[k], px[k + 1], s, s);
      }
      if (pointer.active) {
        ctx.fillStyle = "#F5A623";
        for (let i = 0; i < count; i++) {
          const k = i * 6;
          const dx = px[k] - pointer.x;
          const dy = px[k + 1] - pointer.y;
          if (dx * dx + dy * dy < R * R) ctx.fillRect(px[k], px[k + 1], s, s);
        }
      }
    };

    const tick = () => {
      raf = 0;
      const R = Math.max(90, W * 0.09);
      let moving = false;
      for (let i = 0; i < count; i++) {
        const k = i * 6;
        let vx = px[k + 4];
        let vy = px[k + 5];
        if (pointer.active) {
          const dx = px[k] - pointer.x;
          const dy = px[k + 1] - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / R) * 6;
            vx += (dx / d) * f;
            vy += (dy / d) * f;
          }
        }
        vx += (px[k + 2] - px[k]) * 0.08;
        vy += (px[k + 3] - px[k + 1]) * 0.08;
        vx *= 0.82;
        vy *= 0.82;
        px[k] += vx;
        px[k + 1] += vy;
        px[k + 4] = vx;
        px[k + 5] = vy;
        if (!moving && (Math.abs(vx) > 0.02 || Math.abs(vy) > 0.02 || Math.abs(px[k + 2] - px[k]) > 0.3)) moving = true;
      }
      draw();
      if (visible && (moving || pointer.active)) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!reduce && visible && !raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
      kick();
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
      kick();
    };

    let ro: ResizeObserver | undefined;
    let io: IntersectionObserver | undefined;
    let cancelled = false;

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled) return;
      build();
      draw();
      ro = new ResizeObserver(() => {
        build();
        draw();
      });
      ro.observe(wrap);
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) kick();
      });
      io.observe(wrap);
      if (!reduce) {
        wrap.addEventListener("pointermove", onMove);
        wrap.addEventListener("pointerleave", onLeave);
        wrap.addEventListener("pointercancel", onLeave);
        wrap.addEventListener("pointerup", (e) => e.pointerType !== "mouse" && onLeave());
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointercancel", onLeave);
    };
  }, [text]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="relative aspect-[3.6/1] w-full touch-pan-y select-none">
      <span ref={fontRef} className="invisible absolute font-display">
        {text}
      </span>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
