"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const SIMULATION_SHADER_SRC = `
precision highp float;
uniform sampler2D u_prevTexture;
uniform vec2 u_mouse;
uniform vec2 u_prevMouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform int u_frame;
uniform float u_dropStrength;
uniform vec2 u_dropPos;
varying vec2 v_uv;

const float delta = 1.25;

// Distance from point p to line segment (a -> b) for silky continuous pointer trails
float distToSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.000001), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 uv = v_uv;
  if (u_frame == 0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec4 data = texture2D(u_prevTexture, uv);
  float pressure = data.x;
  float pVel = data.y;

  vec2 texelSize = 1.0 / u_resolution;
  float p_right = texture2D(u_prevTexture, uv + vec2(texelSize.x, 0.0)).x;
  float p_left  = texture2D(u_prevTexture, uv + vec2(-texelSize.x, 0.0)).x;
  float p_up    = texture2D(u_prevTexture, uv + vec2(0.0, texelSize.y)).x;
  float p_down  = texture2D(u_prevTexture, uv + vec2(0.0, -texelSize.y)).x;

  // Boundary reflection damping
  if (uv.x <= texelSize.x) p_left = p_right;
  if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
  if (uv.y <= texelSize.y) p_down = p_up;
  if (uv.y >= 1.0 - texelSize.y) p_up = p_down;

  // Wave equation propagation
  pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
  pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;
  pressure += delta * pVel;

  // Natural viscous friction and smooth dissipation (lasts longer, fading out gradually)
  pVel -= 0.003 * delta * pressure;
  pVel *= 0.993;
  pressure *= 0.994;

  // Sleek, slightly larger pointer trail from the cursor tip
  const float tipRadius = 0.022;
  if (u_mouse.x > 0.0 && u_prevMouse.x > 0.0) {
    vec2 m1 = u_mouse / u_resolution;
    vec2 m2 = u_prevMouse / u_resolution;
    float dist = distToSegment(uv, m1, m2);
    if (dist <= tipRadius) {
      float factor = 1.0 - dist / tipRadius;
      pressure += 2.1 * (factor * factor);
    }
  } else if (u_mouse.x > 0.0) {
    vec2 mouseUV = u_mouse / u_resolution;
    float dist = distance(uv, mouseUV);
    if (dist <= tipRadius) {
      float factor = 1.0 - dist / tipRadius;
      pressure += 2.1 * (factor * factor);
    }
  }

  // Droplet pulse
  if (u_dropStrength > 0.0) {
    float dropDist = distance(uv, u_dropPos);
    if (dropDist <= 0.03) {
      float dropFactor = 1.0 - dropDist / 0.03;
      pressure += u_dropStrength * (dropFactor * dropFactor);
    }
  }

  gl_FragColor = vec4(
    pressure,
    pVel,
    (p_right - p_left) * 0.5,
    (p_up - p_down) * 0.5
  );
}
`;

const RENDER_SHADER_SRC = `
precision highp float;
uniform sampler2D u_simTexture;
uniform sampler2D u_bgTexture;
varying vec2 v_uv;

void main() {
  vec4 data = texture2D(u_simTexture, v_uv);
  
  // Optical refraction distortion
  vec2 distortion = 0.24 * data.zw;

  // Dispersion
  float r = texture2D(u_bgTexture, v_uv + distortion * 1.02).r;
  float g = texture2D(u_bgTexture, v_uv + distortion).g;
  float b = texture2D(u_bgTexture, v_uv + distortion * 0.98).b;
  vec4 color = vec4(r, g, b, 1.0);

  // Surface normals & Specular glint
  vec3 normal = normalize(vec3(-data.z * 5.0, 0.38, -data.w * 5.0));
  vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
  float specular = pow(max(0.0, dot(normal, lightDir)), 70.0) * 1.8;

  // Thin liquid edge rim
  float rim = pow(1.0 - max(0.0, normal.y), 3.0) * 0.18;

  gl_FragColor = color + vec4(specular + rim);
}
`;

function createShader(gl: WebGLRenderingContext | WebGL2RenderingContext, type: number, source: string) {
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
}

function createProgram(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/**
 * WaterBackground Component
 * Renders an interactive full-screen fluid water ripple simulation with:
 * - Natural pool physics (ripples dissipate smoothly and water returns completely to stillness)
 * - Ultra-fine, sleek wave crests tracing directly from the cursor tip
 * - Crisp specular highlights catching light across the obsidian background
 */
export function WaterBackground() {
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

    // Try WebGL2 then WebGL1
    const gl = (canvas.getContext("webgl2", {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    }) ||
      canvas.getContext("webgl", {
        alpha: false,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      })) as (WebGLRenderingContext | WebGL2RenderingContext) | null;

    if (!gl) {
      console.warn("WebGL not supported for water background.");
      return;
    }

    // Float texture extensions
    const isWebGL2 = "WebGL2RenderingContext" in window && gl instanceof WebGL2RenderingContext;
    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
    } else {
      gl.getExtension("OES_texture_float");
      gl.getExtension("OES_texture_float_linear");
      gl.getExtension("OES_texture_half_float");
      gl.getExtension("OES_texture_half_float_linear");
    }

    // Compile Shaders
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const simFs = createShader(gl, gl.FRAGMENT_SHADER, SIMULATION_SHADER_SRC);
    const renderFs = createShader(gl, gl.FRAGMENT_SHADER, RENDER_SHADER_SRC);

    if (!vs || !simFs || !renderFs) return;

    const simProgram = createProgram(gl, vs, simFs);
    const renderProgram = createProgram(gl, vs, renderFs);

    if (!simProgram || !renderProgram) return;

    // Fullscreen quad buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    // Uniform & Attrib locations
    const simAttribPos = gl.getAttribLocation(simProgram, "a_position");
    const simUniformPrevTex = gl.getUniformLocation(simProgram, "u_prevTexture");
    const simUniformMouse = gl.getUniformLocation(simProgram, "u_mouse");
    const simUniformPrevMouse = gl.getUniformLocation(simProgram, "u_prevMouse");
    const simUniformRes = gl.getUniformLocation(simProgram, "u_resolution");
    const simUniformTime = gl.getUniformLocation(simProgram, "u_time");
    const simUniformFrame = gl.getUniformLocation(simProgram, "u_frame");
    const simUniformDropStrength = gl.getUniformLocation(simProgram, "u_dropStrength");
    const simUniformDropPos = gl.getUniformLocation(simProgram, "u_dropPos");

    const renderAttribPos = gl.getAttribLocation(renderProgram, "a_position");
    const renderUniformSimTex = gl.getUniformLocation(renderProgram, "u_simTexture");
    const renderUniformBgTex = gl.getUniformLocation(renderProgram, "u_bgTexture");

    // Dynamic resolution setup - high density simulation grid for fine ripples
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const simScale = 0.85;
    let width = Math.floor(container.clientWidth * dpr);
    let height = Math.floor(container.clientHeight * dpr);
    let simWidth = Math.max(1, Math.floor(width * simScale));
    let simHeight = Math.max(1, Math.floor(height * simScale));

    // Framebuffer textures for ping-pong simulation
    function createFBOTexture(w: number, h: number) {
      if (!gl) return null;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      if (isWebGL2) {
        gl.texImage2D(gl.TEXTURE_2D, 0, (gl as WebGL2RenderingContext).RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null);
      }

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      return { texture, fbo };
    }

    let fboA = createFBOTexture(simWidth, simHeight);
    let fboB = createFBOTexture(simWidth, simHeight);

    // Background Canvas Pattern Generator
    const bgCanvas = document.createElement("canvas");
    const bgCtx = bgCanvas.getContext("2d");
    const bgTexture = gl.createTexture();

    function updateBackgroundTexture(w: number, h: number) {
      if (!bgCtx || !gl) return;
      bgCanvas.width = w;
      bgCanvas.height = h;

      // Base Obsidian canvas
      bgCtx.fillStyle = "#070709";
      bgCtx.fillRect(0, 0, w, h);

      // Ambient radial glow top-left (Electric Cyan/Blue)
      const grad1 = bgCtx.createRadialGradient(w * 0.2, h * 0.15, 0, w * 0.2, h * 0.15, Math.max(w, h) * 0.45);
      grad1.addColorStop(0, "rgba(59, 130, 246, 0.16)");
      grad1.addColorStop(0.5, "rgba(6, 182, 212, 0.06)");
      grad1.addColorStop(1, "rgba(7, 7, 9, 0)");
      bgCtx.fillStyle = grad1;
      bgCtx.fillRect(0, 0, w, h);

      // Ambient radial glow top-right (Violet / Indigo)
      const grad2 = bgCtx.createRadialGradient(w * 0.8, h * 0.25, 0, w * 0.8, h * 0.25, Math.max(w, h) * 0.4);
      grad2.addColorStop(0, "rgba(168, 85, 247, 0.12)");
      grad2.addColorStop(0.6, "rgba(59, 130, 246, 0.03)");
      grad2.addColorStop(1, "rgba(7, 7, 9, 0)");
      bgCtx.fillStyle = grad2;
      bgCtx.fillRect(0, 0, w, h);

      // Mid-page warm glow (Amber)
      const grad3 = bgCtx.createRadialGradient(w * 0.75, h * 0.65, 0, w * 0.75, h * 0.65, Math.max(w, h) * 0.35);
      grad3.addColorStop(0, "rgba(245, 158, 11, 0.08)");
      grad3.addColorStop(1, "rgba(7, 7, 9, 0)");
      bgCtx.fillStyle = grad3;
      bgCtx.fillRect(0, 0, w, h);

      // Subtle tech grid lines
      bgCtx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      bgCtx.lineWidth = 1;
      const gridSize = 44 * dpr;
      for (let x = 0; x <= w; x += gridSize) {
        bgCtx.beginPath();
        bgCtx.moveTo(x, 0);
        bgCtx.lineTo(x, h);
        bgCtx.stroke();
      }
      for (let y = 0; y <= h; y += gridSize) {
        bgCtx.beginPath();
        bgCtx.moveTo(0, y);
        bgCtx.lineTo(w, y);
        bgCtx.stroke();
      }



      // Upload to WebGL
      gl.bindTexture(gl.TEXTURE_2D, bgTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bgCanvas);
    }

    updateBackgroundTexture(width, height);

    // Mouse & Smooth wake state
    let targetMouseX = -1;
    let targetMouseY = -1;
    let currentMouseX = -1;
    let currentMouseY = -1;
    let prevMouseX = -1;
    let prevMouseY = -1;
    let isPointerActive = false;

    let dropStrength = 0;
    let dropX = 0.5;
    let dropY = 0.5;
    let frameCount = 0;
    let animationId: number;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (clientX >= 0 && clientX <= rect.width && clientY >= 0 && clientY <= rect.height) {
        targetMouseX = (clientX / rect.width) * simWidth;
        targetMouseY = (1.0 - clientY / rect.height) * simHeight;
        isPointerActive = true;
      }
    };

    const handlePointerLeave = () => {
      isPointerActive = false;
      targetMouseX = -1;
      targetMouseY = -1;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      if (clientX >= 0 && clientX <= rect.width && clientY >= 0 && clientY <= rect.height) {
        dropPosTrigger(clientX / rect.width, 1.0 - clientY / rect.height, 2.0);
      }
    };

    function dropPosTrigger(x: number, y: number, strength: number) {
      dropX = x;
      dropY = y;
      dropStrength = strength;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // Subtle gentle ripple on first page load
    dropPosTrigger(0.5, 0.6, 1.2);

    // Resize handler
    const handleResize = () => {
      if (!container || !gl) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const newWidth = Math.floor(container.clientWidth * dpr);
      const newHeight = Math.floor(container.clientHeight * dpr);

      if (newWidth === width && newHeight === height) return;

      width = Math.max(1, newWidth);
      height = Math.max(1, newHeight);
      simWidth = Math.max(1, Math.floor(width * simScale));
      simHeight = Math.max(1, Math.floor(height * simScale));

      canvas.width = width;
      canvas.height = height;

      if (fboA) {
        gl.deleteTexture(fboA.texture);
        gl.deleteFramebuffer(fboA.fbo);
      }
      if (fboB) {
        gl.deleteTexture(fboB.texture);
        gl.deleteFramebuffer(fboB.fbo);
      }

      fboA = createFBOTexture(simWidth, simHeight);
      fboB = createFBOTexture(simWidth, simHeight);
      updateBackgroundTexture(width, height);
      frameCount = 0;
    };

    canvas.width = width;
    canvas.height = height;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Render loop
    const render = (time: number) => {
      if (!gl || !fboA || !fboB) return;

      // Update pointer positions with continuous interpolation
      if (isPointerActive && targetMouseX > 0) {
        if (currentMouseX < 0) {
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
          prevMouseX = targetMouseX;
          prevMouseY = targetMouseY;
        } else {
          prevMouseX = currentMouseX;
          prevMouseY = currentMouseY;
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
        }
      } else {
        currentMouseX = -1;
        currentMouseY = -1;
        prevMouseX = -1;
        prevMouseY = -1;
      }

      // Step 1: Fluid wave simulation pass (Ping-Pong FBO)
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB.fbo);
      gl.viewport(0, 0, simWidth, simHeight);
      gl.useProgram(simProgram);

      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(simAttribPos);
      gl.vertexAttribPointer(simAttribPos, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboA.texture);
      gl.uniform1i(simUniformPrevTex, 0);

      gl.uniform2f(simUniformMouse, currentMouseX, currentMouseY);
      gl.uniform2f(simUniformPrevMouse, prevMouseX, prevMouseY);
      gl.uniform2f(simUniformRes, simWidth, simHeight);
      gl.uniform1f(simUniformTime, time * 0.001);
      gl.uniform1i(simUniformFrame, frameCount);
      gl.uniform1f(simUniformDropStrength, dropStrength);
      gl.uniform2f(simUniformDropPos, dropX, dropY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Decay drop impulse
      if (dropStrength > 0) {
        dropStrength *= 0.8;
        if (dropStrength < 0.01) dropStrength = 0;
      }

      // Step 2: Render & Refraction pass to screen canvas
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.useProgram(renderProgram);

      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(renderAttribPos);
      gl.vertexAttribPointer(renderAttribPos, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboB.texture);
      gl.uniform1i(renderUniformSimTex, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, bgTexture);
      gl.uniform1i(renderUniformBgTex, 1);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Ping-pong swap
      const temp = fboA;
      fboA = fboB;
      fboB = temp;

      frameCount++;
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);

      if (gl) {
        if (fboA) {
          gl.deleteTexture(fboA.texture);
          gl.deleteFramebuffer(fboA.fbo);
        }
        if (fboB) {
          gl.deleteTexture(fboB.texture);
          gl.deleteFramebuffer(fboB.fbo);
        }
        gl.deleteTexture(bgTexture);
        gl.deleteProgram(simProgram);
        gl.deleteProgram(renderProgram);
        gl.deleteShader(vs);
        gl.deleteShader(simFs);
        gl.deleteShader(renderFs);
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
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    />
  );
}
