"use client";

import { useEffect, useRef } from "react";

// WebGL1-compatible (works everywhere). No "#version 300 es", uses varying/attribute.
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

vec3 C0 = vec3(0.973, 0.784, 0.290);  // #F8C84A
vec3 C1 = vec3(0.961, 0.651, 0.137);  // #F5A623
vec3 C2 = vec3(0.941, 0.482, 0.125);  // #F07B20
vec3 C3 = vec3(0.910, 0.384, 0.102);  // #E8621A
vec3 BG = vec3(0.984, 0.980, 0.965);  // #FBFAF6 (matches body)

// Smooth circular falloff. r = radius in normalized aspect-corrected coords.
float blob(vec2 p, vec2 c, float r) {
  float d = length(p - c);
  return smoothstep(r, 0.0, d);
}

// Wrap a horizontal coordinate so blobs loop left -> right.
// Range: [-0.4, aspect + 0.4] so blobs enter from left and exit right.
float wrapX(float x, float aspect) {
  float w = aspect + 0.8;
  return mod(x + 0.4, w) - 0.4;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;
  vec2 p = uv;
  p.x *= aspect;

  float t = u_time;

  // Horizontal speed (units of aspect-corrected width per second)
  float speedA = 0.10;
  float speedB = 0.07;
  float speedC = 0.13;
  float speedD = 0.05;

  // Vertical bob amplitude — small, sinusoidal
  float bob = 0.04;

  vec2 cA = vec2(wrapX(t * speedA + 0.00, aspect), 0.25 + sin(t * 0.5 + 0.0) * bob);
  vec2 cB = vec2(wrapX(t * speedB + 0.50, aspect), 0.78 + sin(t * 0.4 + 1.7) * bob);
  vec2 cC = vec2(wrapX(t * speedC + 1.20, aspect), 0.50 + sin(t * 0.6 + 3.1) * bob);
  vec2 cD = vec2(wrapX(t * speedD + 1.80, aspect), 0.40 + sin(t * 0.45 + 0.9) * bob);

  // Slow breathing on radii
  float rA = 0.55 + 0.06 * sin(t * 0.30);
  float rB = 0.50 + 0.05 * sin(t * 0.28 + 1.2);
  float rC = 0.65 + 0.08 * sin(t * 0.22 + 2.4);
  float rD = 0.45 + 0.05 * sin(t * 0.40 + 0.7);

  float bA = blob(p, cA, rA);
  float bB = blob(p, cB, rB);
  float bC = blob(p, cC, rC);
  float bD = blob(p, cD, rD);

  vec3 col = BG;
  col = mix(col, C0, bA * 0.85);
  col = mix(col, C3, bB * 0.65);
  col = mix(col, C1, bC * 0.85);
  col = mix(col, C2, bD * 0.70);

  // Subtle film grain to avoid banding
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("[HeroGradientMesh] shader compile error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function HeroGradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false }) as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      console.error("[HeroGradientMesh] WebGL not available");
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[HeroGradientMesh] link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const W = Math.max(1, Math.floor(w * dpr * 0.85));
      const H = Math.max(1, Math.floor(h * dpr * 0.85));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        gl.viewport(0, 0, W, H);
        gl.uniform2f(uRes, W, H);
      }
    };
    resize();
    console.log("[HeroGradientMesh] init", {
      cssW: canvas.clientWidth,
      cssH: canvas.clientHeight,
      drawW: canvas.width,
      drawH: canvas.height,
      glVersion: gl.getParameter(gl.VERSION),
    });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let frameCount = 0;
    const start = performance.now();

    const renderFrame = (t: number) => {
      gl.uniform1f(uTime, (t - start) * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameCount++;
      if (frameCount === 60) console.log("[HeroGradientMesh] rendered 60 frames");
    };

    const loop = (t: number) => {
      renderFrame(t);
      if (!reduce) raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      renderFrame(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
