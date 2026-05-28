"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.,0.)), c = hash(i + vec2(0.,1.)), d = hash(i + vec2(1.,1.));
  vec2 u = f * f * (3. - 2. * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1. - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p){
  float v = 0., a = 0.5;
  for (int i = 0; i < 6; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p  = uv * 3.0;
  float t = u_time * 0.08;

  vec2 q = vec2(fbm(p + t), fbm(p - t + 5.2));
  vec2 r = vec2(fbm(p + q * 2.0 + vec2(1.7, 9.2) + t * 0.7),
                fbm(p + q * 2.0 + vec2(8.3, 2.8) - t * 0.6));
  float f = fbm(p + r * 2.2);

  float ridge = pow(abs(sin((f + r.x * 1.5) * 6.2831)), 6.0);

  // Brighter palette to match reference: warm orange → vivid orange → pale yellow
  vec3 deep = vec3(0.98, 0.45, 0.08);   // warm orange (no rust)
  vec3 mid  = vec3(1.00, 0.66, 0.16);   // vivid mid orange
  vec3 hi   = vec3(1.00, 0.88, 0.38);   // golden yellow highlight

  vec3 col = mix(deep, mid, smoothstep(0.2, 0.8, f));
  col = mix(col, hi, ridge * 0.9);
  col = mix(col, hi, smoothstep(0.85, 1.0, r.y) * 0.5);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroSilkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden className="hero-silk-bg">
      <canvas ref={canvasRef} />
      <div className="hero-silk-glass" />
    </div>
  );
}
