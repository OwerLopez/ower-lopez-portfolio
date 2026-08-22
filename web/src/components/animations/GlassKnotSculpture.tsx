"use client";

import { useEffect, useRef } from "react";

const VS_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FS_SRC = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 v_uv;

// 2D rotation matrix
mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

// Torus distance function
float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

// 3D Liquid Glass Tensor Knot (Crafter Sculpture)
float sdLiquidKnot(vec3 p) {
  // Smooth idle float & rotation + responsive cursor parallax
  p.y += sin(u_time * 1.2) * 0.06;
  p.yz *= rot(u_mouse.y * 0.9 + sin(u_time * 0.4) * 0.2);
  p.xz *= rot(u_mouse.x * 1.1 + u_time * 0.55);

  // Subtle fluid surface ripple modulation
  float wave = sin(p.x * 5.0 + u_time * 2.0) * cos(p.y * 5.0 + u_time * 1.5) * 0.018;

  // Intertwined 4-lobed liquid tensor loops
  vec3 p1 = p;
  p1.xy *= rot(p1.z * 0.75 + 0.3);
  float d1 = sdTorus(p1, vec2(0.82, 0.24)) + wave;

  vec3 p2 = p;
  p2.yz *= rot(1.5707);
  p2.xz *= rot(p2.y * 0.75 + 0.3);
  float d2 = sdTorus(p2, vec2(0.82, 0.24)) + wave;

  // Smooth liquid blend between loops
  float k = 0.28;
  float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) - k * h * (1.0 - h);
}

// Normal vector calculation via tetrahedron gradient
vec3 calcNormal(vec3 p) {
  const float h = 0.0008;
  const vec2 k = vec2(1.0, -1.0);
  return normalize(
    k.xyy * sdLiquidKnot(p + k.xyy * h) +
    k.yyx * sdLiquidKnot(p + k.yyx * h) +
    k.yxy * sdLiquidKnot(p + k.yxy * h) +
    k.xxx * sdLiquidKnot(p + k.xxx * h)
  );
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // Camera ray setup (generous distance so the knot NEVER clips the canvas boundary)
  vec3 ro = vec3(0.0, 0.0, 3.6);
  vec3 rd = normalize(vec3(p, -1.35));

  // Raymarching loop
  float t = 0.0;
  float d = 0.0;
  for (int i = 0; i < 54; i++) {
    vec3 pos = ro + rd * t;
    d = sdLiquidKnot(pos);
    if (d < 0.0015 || t > 6.0) break;
    t += d * 0.7;
  }

  if (t < 6.0) {
    vec3 pos = ro + rd * t;
    vec3 nor = calcNormal(pos);
    vec3 ref = reflect(rd, nor);

    // Fresnel Rim Glow (Water / Glass edge illumination)
    float NdotV = max(0.0, dot(-rd, nor));
    float fresnel = pow(1.0 - NdotV, 2.8);

    // Dynamic Multi-Point Specular Lights
    vec3 lightDir1 = normalize(vec3(1.8, 2.5, 2.0));
    vec3 lightDir2 = normalize(vec3(-2.2, -1.2, 1.8));
    vec3 lightDir3 = normalize(vec3(0.0, -2.5, -1.0));

    // Specular glints (crisp chrome & liquid reflections)
    float spec1 = pow(max(0.0, dot(ref, lightDir1)), 65.0) * 2.4;
    float spec2 = pow(max(0.0, dot(ref, lightDir2)), 45.0) * 1.6;
    float spec3 = pow(max(0.0, dot(ref, lightDir3)), 30.0) * 0.8;

    // Subsurface liquid glass scattering
    vec3 deepGlass = vec3(0.06, 0.12, 0.24);
    vec3 cyanRefract = vec3(0.1, 0.65, 1.0) * fresnel * 1.8;
    vec3 whiteHighlights = vec3(1.0, 1.0, 1.0) * spec1 + vec3(0.4, 0.85, 1.0) * spec2;
    vec3 ambientRim = vec3(0.2, 0.5, 0.9) * pow(fresnel, 1.8);

    vec3 finalColor = deepGlass + cyanRefract + whiteHighlights + ambientRim;
    float alpha = clamp(fresnel * 0.95 + spec1 * 0.9 + spec2 * 0.6 + 0.35, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, alpha);
  } else {
    // Transparent outside object
    gl_FragColor = vec4(0.0);
  }
}
`;

function createShader(gl: WebGLRenderingContext | WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

/**
 * 3D Liquid Glass Monogram / Tensor Knot Sculpture
 * Standalone, prominently visible WebGL Raymarching sculpture.
 * Features realistic optical refraction, fluid wave modulation,
 * gleaming specular highlights, and zero bounding-box clipping.
 */
export function GlassKnotSculpture({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.className = "w-full h-full block";
    container.appendChild(canvas);

    const gl = (canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      depth: false,
      preserveDrawingBuffer: false,
    }) ||
      canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        depth: false,
        preserveDrawingBuffer: false,
      })) as (WebGLRenderingContext | WebGL2RenderingContext) | null;

    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VS_SRC);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FS_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "a_position");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = Math.floor(container.clientWidth * dpr);
    let height = Math.floor(container.clientHeight * dpr);
    canvas.width = width;
    canvas.height = height;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width * 0.5)) / (rect.width * 0.5);
      const y = (e.clientY - (rect.top + rect.height * 0.5)) / (rect.height * 0.5);
      targetMouseX = Math.max(-1.8, Math.min(1.8, x));
      targetMouseY = Math.max(-1.8, Math.min(1.8, -y));
    };

    const handlePointerLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    const handleResize = () => {
      if (!container) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(container.clientWidth * dpr));
      height = Math.max(1, Math.floor(container.clientHeight * dpr));
      canvas.width = width;
      canvas.height = height;
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    let animationId: number;
    const render = (time: number) => {
      if (!gl) return;

      // Smooth spring interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      gl.viewport(0, 0, width, height);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, time * 0.001);
      gl.uniform2f(uMouse, currentMouseX, currentMouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(quadBuffer);
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  );
}
