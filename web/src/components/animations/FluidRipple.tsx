"use client";

import { useEffect, useRef } from "react";

export function FluidRipple({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // 1. Vertex Shader (Full-screen quad)
    const vsSource = `
      attribute vec2 position;
      varying vec2 v_uv;
      void main() {
        v_uv = position * 0.5 + 0.5;
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // 2. Master GLSL Fragment Shader — Chromatic Aberration, FBM noise, Fresnel Reflections
    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;

      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_mouse_speed;

      // Noise generation helpers
      float hash(vec2 p) {
        p = fract(p * vec2(127.1, 311.7));
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      // Fractional Brownian Motion (3 Octaves) for realistic fluid current noise
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 3; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      // Interactive Concentric Wave equation
      float wave(vec2 uv, vec2 center, float time, float speed) {
        float dist = distance(uv, center);
        float delay = dist * 3.5;
        if (time < delay) return 0.0;
        
        float activeTime = time - delay;
        float amplitude = exp(-activeTime * 1.5) * u_mouse_speed * 0.16;
        return sin(dist * 16.0 - activeTime * 8.0) * amplitude;
      }

      // Renders a grid line pattern
      float drawGrid(vec2 uv) {
        vec2 grid_uv = uv * vec2(24.0, 12.0); // 24x12 Grid Cells
        vec2 line = smoothstep(0.0, 0.04, abs(fract(grid_uv - 0.5) - 0.5));
        return 1.0 - min(line.x, line.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 aspect_uv = uv;
        aspect_uv.x *= u_resolution.x / u_resolution.y;

        vec2 mouse_aspect = u_mouse;
        mouse_aspect.x *= u_resolution.x / u_resolution.y;

        // Calculate wave heights
        float height = wave(aspect_uv, mouse_aspect, u_time, u_mouse_speed);
        
        // Fluid current noise mapping
        vec2 flow_uv = aspect_uv * 2.5 + vec2(u_time * 0.06, u_time * 0.04);
        height += fbm(flow_uv) * 0.015;

        // Normal estimation using finite difference
        float eps = 0.03;
        float h_right = wave(aspect_uv + vec2(eps, 0.0), mouse_aspect, u_time, u_mouse_speed) + fbm(flow_uv + vec2(eps, 0.0)) * 0.015;
        float h_up = wave(aspect_uv + vec2(0.0, eps), mouse_aspect, u_time, u_mouse_speed) + fbm(flow_uv + vec2(0.0, eps)) * 0.015;

        vec3 normal = normalize(vec3(
          (height - h_right) / eps,
          (height - h_up) / eps,
          1.6 // Z depth weight
        ));

        // 3. Chromatic Aberration in Screen-Space Refraction
        // Refract R, G, B channels with minor offset coefficients to produce prism split edges
        vec2 refracted_uv_R = uv + normal.xy * 0.034;
        vec2 refracted_uv_G = uv + normal.xy * 0.037;
        vec2 refracted_uv_B = uv + normal.xy * 0.040;

        // Sample warped grid values
        float grid_R = drawGrid(refracted_uv_R);
        float grid_G = drawGrid(refracted_uv_G);
        float grid_B = drawGrid(refracted_uv_B);

        // 4. Physical Specular & Fresnel Reflections
        vec3 light_dir = normalize(vec3(0.35, 0.45, 1.6));
        vec3 view_dir = vec3(0.0, 0.0, 1.0);
        vec3 half_dir = normalize(light_dir + view_dir);

        float diff = max(dot(normal, light_dir), 0.0);
        float spec = pow(max(dot(normal, half_dir), 0.0), 48.0); // Liquid sheen highlight
        
        // Fresnel factor (reflection strength at glancing angles)
        float fresnel = pow(1.0 - max(dot(normal, view_dir), 0.0), 3.0) * 0.25;

        // Dark obsidian base color
        vec3 base_color = vec3(0.01, 0.01, 0.015);
        
        // Render refracted grid with chromatic splitting
        vec3 grid_color = vec3(
          grid_R * 0.16,
          grid_G * 0.16,
          grid_B * 0.22
        );

        // Soft chromatic glare reflection overlays
        vec3 specular_color = vec3(1.0, 0.7, 0.0) * spec * 0.25; // Warm gold specular sheen
        vec3 refraction_color = vec3(0.0, 0.85, 1.0) * (grid_color.z * 0.25 + spec * 0.35); // Cool cyan chromatic glow


        // Composite render
        vec3 final_color = base_color + grid_color + specular_color + refraction_color + vec3(fresnel);

        // Vignette
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.4), 0.0, 1.0);
        final_color *= vignette;

        // Adaptive alpha output
        gl_FragColor = vec4(final_color, clamp(final_color.r * 0.7 + final_color.g * 0.5 + spec * 0.4 + fresnel, 0.0, 0.65));
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad position vertices
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const mouseSpeedLoc = gl.getUniformLocation(program, "u_mouse_speed");

    let mouseX = 0.5;
    let mouseY = 0.5;
    let speed = 0.0;
    let lastMouseX = 0.5;
    let lastMouseY = 0.5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      speed = Math.min(2.0, Math.sqrt(dx * dx + dy * dy) * 15.0);

      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let startTime = performance.now();
    let animId = 0;

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000.0;

      speed *= 0.95; // Smooth decay

      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseX, mouseY);
      gl.uniform1f(mouseSpeedLoc, Math.max(0.01, speed));

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (gl) {
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 mix-blend-screen opacity-65 ${className}`}
    />
  );
}
