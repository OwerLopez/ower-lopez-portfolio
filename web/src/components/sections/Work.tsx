"use client";

import { useState, useCallback, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Github,
  Play,
  Cpu,
  Sparkles,
} from "lucide-react";
import type { PortfolioContent, WorkProject, FeaturedProject } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { playTick, playHover, playSuccess, playInference } from "@/lib/audio";

/* ==========================================================================
   Unified Project Interface
   ========================================================================== */
interface UnifiedProject {
  id: string;
  category: "backend" | "data" | "mobile";
  categoryLabel: string;
  badge: string;
  title: string;
  repoName: string;
  githubUrl: string;
  description: string;
  metrics: { label: string; value: string; highlight?: boolean }[];
  tags: string[];
  year: string;
  image?: string;
  isFlagship?: boolean;
  links?: { label: string; href: string; external?: boolean }[];
}

/* ==========================================================================
   High-Fidelity Product UI Mockups (Clean, Dark Slate & Obsidian)
   ========================================================================== */

/** 0. ChurnInsight Flagship Mockup */
function ChurnInsightMockup({
  latency,
  isInferencing,
  onRunInference,
}: {
  latency: string;
  isInferencing: boolean;
  onRunInference: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="h-full w-full bg-[#080a14] p-3.5 sm:p-6 md:p-7 flex flex-col justify-between select-none font-mono text-[11px] sm:text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-3 text-zinc-400 gap-2">
        <span className="text-blue-300 font-bold flex items-center gap-2 text-xs sm:text-sm truncate">
          <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400 shrink-0" />
          <span className="truncate">CHURNINSIGHT · EMBEDDED ONNX</span>
        </span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] sm:text-xs font-bold shrink-0">
          Spring Boot 3.4
        </span>
      </div>

      <div className="my-auto grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5 py-1.5 sm:py-2">
        <div className="rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-2.5 sm:p-4 space-y-1">
          <span className="text-[10px] sm:text-xs text-zinc-500 block uppercase font-semibold">P99 In-Memory Latency:</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg sm:text-2xl md:text-3xl font-extrabold text-emerald-400 tabular-nums">{latency}</span>
            <span className="text-[10px] sm:text-xs text-zinc-400">(Zero RPC)</span>
          </div>
          <span className="text-[10px] sm:text-xs text-zinc-400 block pt-0.5">Legacy RPC: 2,000ms ➔ 100x</span>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-2.5 sm:p-4 space-y-1">
          <span className="text-[10px] sm:text-xs text-zinc-500 block uppercase font-semibold">Calidad del Modelo</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg sm:text-2xl md:text-3xl font-extrabold text-blue-300 tabular-nums">96.0% Recall</span>
          </div>
          <span className="text-[10px] sm:text-xs text-zinc-400 block pt-0.5">Random Forest · 99% Menos Costo</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between pt-2 sm:pt-3 border-t border-white/[0.08] text-[10px] sm:text-xs gap-2">
        <span className="text-zinc-500 truncate">Java 17 · ONNX Runtime · Docker</span>
        <button
          type="button"
          onClick={onRunInference}
          disabled={isInferencing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] sm:text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
        >
          <Play className="h-3 w-3 fill-white" />
          <span>{isInferencing ? "Calculando..." : "Simular ONNX"}</span>
        </button>
      </div>
    </div>
  );
}

/** 1. VisionTransit AI */
function VisionTransitMockup() {
  return (
    <div className="h-full w-full bg-[#080a14] p-3.5 sm:p-6 md:p-7 flex flex-col justify-between select-none font-mono text-[11px] sm:text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-3 text-zinc-400 gap-2">
        <span className="text-white font-bold flex items-center gap-2 text-xs sm:text-sm truncate">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate">CAM-04 · AREQUIPA SURVEILLANCE</span>
        </span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-zinc-200 text-[10px] sm:text-xs font-bold shrink-0">
          28.7 FPS (CPU)
        </span>
      </div>

      <div className="my-auto grid grid-cols-2 gap-2 sm:gap-3.5 py-1.5 sm:py-2">
        <div className="rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-2.5 sm:p-4">
          <span className="text-[10px] sm:text-xs text-zinc-500 block uppercase font-semibold">Detección YOLO11</span>
          <span className="text-emerald-400 font-bold text-sm sm:text-base mt-1 block truncate">BUS URBANO [98.4%]</span>
          <span className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 block truncate">Tracking Kalman ID #104</span>
        </div>
        <div className="rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-2.5 sm:p-4">
          <span className="text-[10px] sm:text-xs text-zinc-500 block uppercase font-semibold">Sincronización</span>
          <span className="text-cyan-300 font-bold text-sm sm:text-base mt-1 block truncate">WebSocket 60 msg/s</span>
          <span className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 block truncate">Latencia P99: 14.2 ms</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-500 pt-2 sm:pt-3 border-t border-white/[0.08]">
        <span className="truncate">FastAPI + YOLO11 ONNX</span>
        <span className="text-zinc-300 font-semibold truncate ml-2">6 Capas Desacopladas</span>
      </div>
    </div>
  );
}

/** 2. NEXIA 2026 */
function NexiaMockup() {
  return (
    <div className="h-full w-full bg-[#080a14] p-3.5 sm:p-6 md:p-7 flex flex-col justify-between select-none font-mono text-[11px] sm:text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-3 text-zinc-400 gap-2">
        <span className="text-amber-300 font-bold text-xs sm:text-sm truncate">1ER PUESTO IBM HACKATHON · BUILD WITH AI</span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-bold shrink-0">
          Sprint &lt; 48h
        </span>
      </div>

      <div className="my-auto grid grid-cols-3 gap-2 sm:gap-3 text-center py-1.5 sm:py-2">
        <div className="rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-2 sm:p-3.5">
          <div className="text-white font-bold text-xs sm:text-sm">React 19</div>
          <div className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">Tailwind v4</div>
        </div>
        <div className="rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/30 p-2 sm:p-3.5">
          <div className="text-amber-300 font-bold text-xs sm:text-sm">NestJS API</div>
          <div className="text-[10px] sm:text-xs text-amber-200/80 mt-0.5">Auth Guards</div>
        </div>
        <div className="rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-2 sm:p-3.5">
          <div className="text-cyan-300 font-bold text-xs sm:text-sm">Gen AI</div>
          <div className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">RAG Engine</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-500 pt-2 sm:pt-3 border-t border-white/[0.08]">
        <span className="truncate">Jaku UNSA &amp; GDG Arequipa</span>
        <span className="text-amber-300 font-semibold truncate ml-2">Producción Desplegada</span>
      </div>
    </div>
  );
}

/** 3. AI Life OS Mobile */
function AiLifeOsMockup() {
  return (
    <div className="h-full w-full bg-[#080a14] p-3.5 sm:p-6 md:p-7 flex flex-col justify-between select-none font-mono text-[11px] sm:text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-3 text-zinc-400 gap-2">
        <span className="text-cyan-300 font-bold text-xs sm:text-sm truncate">ANDROID 15 · KOTLIN &amp; COMPOSE</span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-bold shrink-0">
          Gemini Pro AI
        </span>
      </div>

      <div className="my-auto rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-3 sm:p-4 space-y-1 sm:space-y-1.5">
        <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
          <span className="text-white font-bold truncate">Síntesis Semántica en Dispositivo</span>
          <span className="text-emerald-400 text-[10px] sm:text-xs font-bold shrink-0">Room SQLite</span>
        </div>
        <p className="text-[11px] sm:text-xs text-zinc-300 italic leading-relaxed">
          &ldquo;Clasificación contextual de tareas y generación de resúmenes ejecutivos offline.&rdquo;
        </p>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-500 pt-2 sm:pt-3 border-t border-white/[0.08]">
        <span className="truncate">Clean Architecture + MVI</span>
        <span className="text-cyan-300 font-semibold truncate ml-2">Offline-First</span>
      </div>
    </div>
  );
}

/** 4. AI Workflow Recorder */
function WorkflowRecorderMockup() {
  return (
    <div className="h-full w-full bg-[#080a14] p-3.5 sm:p-6 md:p-7 flex flex-col justify-between select-none font-mono text-[11px] sm:text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-3 text-zinc-400 gap-2">
        <span className="text-emerald-300 font-bold text-xs sm:text-sm truncate">TELEMETRY &amp; WORKFLOW RECORDER</span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-bold shrink-0">
          Dockerized
        </span>
      </div>

      <div className="my-auto rounded-xl sm:rounded-2xl bg-black/50 border border-white/[0.08] p-3 sm:p-4 space-y-1.5 text-[11px] sm:text-xs">
        <div className="text-emerald-400 flex items-center gap-2 font-semibold truncate">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="truncate">[DOM-EVENT] Captura de mutaciones web en vivo</span>
        </div>
        <div className="text-zinc-300 truncate">
          <span>[FASTAPI] Ingesta asíncrona (200 OK · 8ms)</span>
        </div>
        <div className="text-cyan-300 truncate">
          <span>[DOCKER] Worker pool saludable (4 réplicas)</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-500 pt-2 sm:pt-3 border-t border-white/[0.08]">
        <span className="truncate">Chrome Extension + Python 3.12</span>
        <span className="text-emerald-300 font-semibold truncate ml-2">Determinista</span>
      </div>
    </div>
  );
}

/** 5. Telecom Churn ML Pipeline */
function TelecomChurnMockup() {
  return (
    <div className="h-full w-full bg-[#080a14] p-3.5 sm:p-6 md:p-7 flex flex-col justify-between select-none font-mono text-[11px] sm:text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-3 text-zinc-400 gap-2">
        <span className="text-blue-300 font-bold text-xs sm:text-sm truncate">ML CLASSIFICATION PIPELINE</span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] sm:text-xs font-bold shrink-0">
          ROC-AUC 0.94
        </span>
      </div>

      <div className="my-auto space-y-2 py-1">
        <div>
          <div className="flex justify-between text-[11px] sm:text-xs text-zinc-300 mb-1 font-semibold">
            <span>TotalCharges (Feature)</span>
            <span className="text-blue-400 font-bold">38%</span>
          </div>
          <div className="h-2 sm:h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full w-[38%]" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] sm:text-xs text-zinc-300 mb-1 font-semibold">
            <span>ContractType (Feature)</span>
            <span className="text-cyan-300 font-bold">29%</span>
          </div>
          <div className="h-2 sm:h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full w-[29%]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-500 pt-2 sm:pt-3 border-t border-white/[0.08]">
        <span className="truncate">Scikit-Learn · Pandas</span>
        <span className="text-blue-300 font-semibold truncate ml-2">Recall: 94%</span>
      </div>
    </div>
  );
}

/** 6. NovaChef Platform */
function NovaChefMockup() {
  return (
    <div className="h-full w-full bg-[#080a14] p-3.5 sm:p-6 md:p-7 flex flex-col justify-between select-none font-mono text-[11px] sm:text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-3 text-zinc-400 gap-2">
        <span className="text-purple-300 font-bold text-xs sm:text-sm truncate">PYTEST AUTOMATED QA TEST RUNNER</span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-bold shrink-0">
          48 Tests Passed
        </span>
      </div>

      <div className="my-auto rounded-xl sm:rounded-2xl bg-black/50 border border-white/[0.08] p-3 sm:p-4 space-y-1.5 text-[11px] sm:text-xs">
        <div className="flex items-center justify-between text-zinc-200 gap-2">
          <span className="truncate">✓ test_jwt_auth_security.py</span>
          <span className="text-emerald-400 font-bold shrink-0">PASSED</span>
        </div>
        <div className="flex items-center justify-between text-zinc-200 gap-2">
          <span className="truncate">✓ test_concurrency_limits.py</span>
          <span className="text-emerald-400 font-bold shrink-0">PASSED</span>
        </div>
        <div className="flex items-center justify-between text-zinc-200 gap-2">
          <span className="truncate">✓ test_sql_injection_defense.py</span>
          <span className="text-emerald-400 font-bold shrink-0">PASSED</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-500 pt-2 sm:pt-3 border-t border-white/[0.08]">
        <span className="truncate">FastAPI + PostgreSQL</span>
        <span className="text-purple-300 font-semibold truncate ml-2">100% Seguridad QA</span>
      </div>
    </div>
  );
}

/** 7. Qt Water Resources System */
function QtWaterMockup() {
  return (
    <div className="h-full w-full bg-[#080a14] p-3.5 sm:p-6 md:p-7 flex flex-col justify-between select-none font-mono text-[11px] sm:text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-3 text-zinc-400 gap-2">
        <span className="text-amber-300 font-bold text-xs sm:text-sm truncate">DESKTOP GIS &amp; HIDROINFORMÁTICA</span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-bold shrink-0">
          C++17 / Qt GUI
        </span>
      </div>

      <div className="my-auto rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-3.5 sm:p-4 text-center space-y-1.5">
        <div className="text-white font-bold text-xs sm:text-sm truncate">
          Modelado Espacial de Cuencas &amp; Presas
        </div>
        <p className="text-[11px] sm:text-xs text-zinc-400 max-w-md mx-auto line-clamp-2">
          Cálculo numérico de caudales volumétricos y topología hidrográfica en tiempo real.
        </p>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-500 pt-2 sm:pt-3 border-t border-white/[0.08]">
        <span className="truncate">C++17 Desktop Nativo</span>
        <span className="text-amber-300 font-semibold truncate ml-2">Cero Overhead</span>
      </div>
    </div>
  );
}

/** 8. Gestor Tareas Pro */
function GestorTareasMockup() {
  return (
    <div className="h-full w-full bg-[#080a14] p-3.5 sm:p-6 md:p-7 flex flex-col justify-between select-none font-mono text-[11px] sm:text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-3 text-zinc-400 gap-2">
        <span className="text-cyan-300 font-bold text-xs sm:text-sm truncate">CLEAN ARCHITECTURE ANDROID</span>
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-bold shrink-0">
          Room SQLite
        </span>
      </div>

      <div className="my-auto rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-3.5 sm:p-4 text-center space-y-1.5">
        <div className="text-zinc-200 text-[11px] sm:text-xs font-semibold truncate">
          Domain Layer ──&gt; Data Layer ──&gt; MVI
        </div>
        <div className="text-amber-300 font-bold text-xs sm:text-sm truncate">
          🔥 28 Días de Racha Inmutable Activa
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-500 pt-2 sm:pt-3 border-t border-white/[0.08]">
        <span className="truncate">Kotlin + Jetpack Compose</span>
        <span className="text-cyan-300 font-semibold truncate ml-2">Offline-First</span>
      </div>
    </div>
  );
}

/** Dispatcher to render the appropriate project visual */
function UnifiedProjectVisualCard({
  project,
  latency,
  isInferencing,
  onRunInference,
}: {
  project: UnifiedProject;
  latency: string;
  isInferencing: boolean;
  onRunInference: (e: React.MouseEvent) => void;
}) {
  if (project.image) {
    return (
      <div className="relative h-full w-full bg-[#080a14] overflow-hidden group">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 860px"
          priority={project.isFlagship}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a14]/60 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  if (project.isFlagship) {
    return (
      <ChurnInsightMockup
        latency={latency}
        isInferencing={isInferencing}
        onRunInference={onRunInference}
      />
    );
  }

  switch (project.repoName) {
    case "VisionTransit_AI":
      return <VisionTransitMockup />;
    case "wewinti-fullstack-app":
      return <NexiaMockup />;
    case "AI_Life_OS_mobile":
      return <AiLifeOsMockup />;
    case "ai-workflow-recorder":
      return <WorkflowRecorderMockup />;
    case "telecom-churn-ml-pipeline":
      return <TelecomChurnMockup />;
    case "novachef-restaurant-platform":
      return <NovaChefMockup />;
    case "qt-water-resources-system":
      return <QtWaterMockup />;
    case "GestorTareasPro":
    default:
      return <GestorTareasMockup />;
  }
}

/* ==========================================================================
   Master Expanded 3D Coverflow Perspective Gallery
   ========================================================================== */
function UnifiedCoverflowShowcase({
  projects,
  onSelectProject,
  latency,
  isInferencing,
  onRunInference,
}: {
  projects: UnifiedProject[];
  onSelectProject: (project: UnifiedProject) => void;
  latency: string;
  isInferencing: boolean;
  onRunInference: (e: React.MouseEvent) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0) return null;
  const active = projects[activeIndex] ?? projects[0]!;

  const prev = () => {
    playTick();
    setActiveIndex((curr) => (curr === 0 ? projects.length - 1 : curr - 1));
  };

  const next = () => {
    playTick();
    setActiveIndex((curr) => (curr === projects.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="relative py-4 w-full">
      {/* 3D Cinema-Scale Perspective Stage with Smooth Edge Fade Mask */}
      <div
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
        className="relative mx-auto h-[340px] sm:h-[440px] md:h-[520px] lg:h-[560px] w-full overflow-hidden flex items-center justify-center"
      >
        {/* Navigation Left Arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Proyecto anterior"
          className="absolute left-4 sm:left-10 lg:left-20 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-xl hover:bg-white/20 transition-all shadow-2xl active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" />
        </button>

        {/* Navigation Right Arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Proyecto siguiente"
          className="absolute right-4 sm:right-10 lg:right-20 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-xl hover:bg-white/20 transition-all shadow-2xl active:scale-95 cursor-pointer"
        >
          <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" />
        </button>

        {/* 3D Coverflow Cards Stack */}
        <div className="relative h-full w-full flex items-center justify-center">
          {projects.map((project, index) => {
            const offset = index - activeIndex;
            const isCenter = offset === 0;

            let translateX = "0%";
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;
            let rotateY = 0;
            let pointerEvents: "auto" | "none" = "auto";

            if (offset === 0) {
              translateX = "0%";
              scale = 1;
              zIndex = 30;
              opacity = 1;
              rotateY = 0;
            } else if (offset === -1 || (activeIndex === 0 && index === projects.length - 1)) {
              translateX = "-50%";
              scale = 0.82;
              zIndex = 20;
              opacity = 0.55;
              rotateY = 16;
            } else if (offset === 1 || (activeIndex === projects.length - 1 && index === 0)) {
              translateX = "50%";
              scale = 0.82;
              zIndex = 20;
              opacity = 0.55;
              rotateY = -16;
            } else if (offset === -2) {
              translateX = "-84%";
              scale = 0.68;
              zIndex = 10;
              opacity = 0.25;
              rotateY = 26;
            } else if (offset === 2) {
              translateX = "84%";
              scale = 0.68;
              zIndex = 10;
              opacity = 0.25;
              rotateY = -26;
            } else {
              translateX = offset < 0 ? "-120%" : "120%";
              scale = 0.5;
              zIndex = 0;
              opacity = 0;
              pointerEvents = "none";
            }

            return (
              <motion.div
                key={project.id}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  rotateY,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                }}
                style={{
                  zIndex,
                  perspective: 1200,
                  pointerEvents,
                }}
                onClick={() => {
                  if (isCenter) {
                    onSelectProject(project);
                  } else {
                    playTick();
                    setActiveIndex(index);
                  }
                }}
                className="absolute top-1/2 -translate-y-1/2 w-[320px] sm:w-[580px] md:w-[740px] lg:w-[840px] aspect-[16/10] cursor-pointer"
              >
                <div
                  className={`relative h-full w-full rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 ${
                    isCenter
                      ? "border-white/30 shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
                      : "border-white/10"
                  }`}
                >
                  <UnifiedProjectVisualCard
                    project={project}
                    latency={latency}
                    isInferencing={isInferencing}
                    onRunInference={onRunInference}
                  />

                  {/* Play / Inspect Overlay */}
                  {isCenter && (
                    <div className="absolute inset-0 pointer-events-none bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center group">
                      <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="h-7 w-7 sm:h-9 sm:w-9 fill-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Editorial Content Below Carousel */}
      <div className="mt-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-mono font-bold text-zinc-300">
            {active.isFlagship && <Sparkles className="h-3.5 w-3.5 text-amber-400" />}
            <span>{active.badge}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">{active.categoryLabel}</span>
          </div>

          {/* Centered Large Title */}
          <h4 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
            {active.title}
          </h4>

          {/* Centered Description */}
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            {active.description}
          </p>

          {/* Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-3xl mx-auto">
            {active.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-4 text-center"
              >
                <div
                  className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${
                    m.highlight ? "text-blue-400" : "text-white"
                  }`}
                >
                  {m.value}
                </div>
                <div className="mono-label mt-1 text-[11px] text-zinc-400 font-semibold">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Link / Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => onSelectProject(active)}
              title="Inspeccionar detalles técnicos"
              className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors underline underline-offset-8 cursor-pointer py-2"
            >
              <span>Ver Proyecto Completo &amp; Arquitectura</span>
              <span className="text-xl">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Main Work Section Component
   ========================================================================== */
export function Work({ content }: { content: PortfolioContent }) {
  const { work } = content;
  const activePillId = useId();

  const [activeCategory, setActiveCategory] = useState<"all" | "backend" | "data" | "mobile">(
    "all"
  );
  const [inspectProject, setInspectProject] = useState<UnifiedProject | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isInferencing, setIsInferencing] = useState(false);
  const [latency, setLatency] = useState("18.4 ms");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal Scroll Lock & Escape Key Handler
  useEffect(() => {
    if (inspectProject) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInspectProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inspectProject]);

  const handleRunInference = (e: React.MouseEvent) => {
    e.stopPropagation();
    playInference();
    setIsInferencing(true);
    const randomizedLatency = (14 + Math.random() * 5).toFixed(1);

    setTimeout(() => {
      setLatency(`${randomizedLatency} ms`);
      setIsInferencing(false);
      playSuccess();
    }, 400);
  };

  // Build unified project list (ChurnInsight + 8 Projects)
  const allProjects: UnifiedProject[] = [
    {
      id: "churninsight-flagship",
      category: "backend",
      categoryLabel: "Backend & ML",
      badge: "Proyecto Insignia",
      title: work.featured.title,
      repoName: "ChurnInsight-Backend",
      githubUrl: "https://github.com/OwerLopez/ChurnInsight-Backend",
      description: work.featured.summary,
      metrics: work.featured.metrics,
      tags: work.featured.tags,
      year: "2025",
      image: work.featured.image,
      isFlagship: true,
      links: work.featured.links,
    },
    ...work.projects.map((p) => ({
      id: p.repoName,
      category: p.category,
      categoryLabel: p.categoryLabel,
      badge: p.badge,
      title: p.title,
      repoName: p.repoName,
      githubUrl: p.githubUrl,
      description: p.description,
      metrics: p.metrics || [],
      tags: p.tags,
      year: p.year,
      image: p.image,
      isFlagship: false,
    })),
  ];

  const filterKeys: ("all" | "backend" | "data" | "mobile")[] = [
    "all",
    "backend",
    "data",
    "mobile",
  ];

  const filteredProjects =
    activeCategory === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const handleFilterChange = (key: "all" | "backend" | "data" | "mobile") => {
    playTick();
    setActiveCategory(key);
  };

  const handleOpenModal = useCallback((project: UnifiedProject) => {
    playSuccess();
    setInspectProject(project);
  }, []);

  return (
    <div aria-label="Work and Projects" className="w-full">
      {/* Top Header & Filter Controls (Contained for Optimal Legibility) */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <SectionHeader kicker={work.kicker} heading={work.heading} description={work.description} />

        {/* Category Filter Bar — Clean, Spaced, Capsule Pills */}
        <div className="my-8 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 p-1.5 rounded-full bg-[#0a0c16] border border-white/[0.08] shadow-inner">
            {filterKeys.map((key) => {
              const isActive = activeCategory === key;
              const label = work.filterLabels[key];
              const count =
                key === "all"
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === key).length;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleFilterChange(key)}
                  onMouseEnter={() => playHover()}
                  className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId={activePillId}
                      className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/20 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 font-bold">{label}</span>
                  <span
                    className={`relative z-10 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-white/[0.06] text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Master 3D Coverflow Perspective Gallery — Edge-to-Edge Full Width */}
      <div className="mb-8 w-full">
        <UnifiedCoverflowShowcase
          projects={filteredProjects}
          onSelectProject={handleOpenModal}
          latency={latency}
          isInferencing={isInferencing}
          onRunInference={handleRunInference}
        />
      </div>

      {/* Deep-Dive Floating Glassmorphism Modal with Bulletproof Scroll Lock */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {inspectProject && (
              <div
                data-lenis-prevent="true"
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8"
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setInspectProject(null)}
                  data-lenis-prevent="true"
                  className="fixed inset-0 bg-black/85 backdrop-blur-xl"
                />

                {/* Modal Window Container (Internal Scroll with full event isolation) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  style={{
                    overscrollBehavior: "contain",
                    WebkitOverflowScrolling: "touch",
                  }}
                  className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-3xl border border-white/[0.15] bg-[#0b0d18] p-6 sm:p-9 shadow-2xl text-white"
                >
                  {/* Modal Header */}
                  <div className="sticky top-0 z-20 -mt-2 -mx-2 px-2 pt-2 flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 bg-[#0b0d18] backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="ml-2 font-mono text-xs text-zinc-400">
                        repo://{inspectProject.repoName}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectProject(null)}
                      aria-label="Cerrar modal de inspección"
                      className="rounded-full p-1.5 text-zinc-400 hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="space-y-6">
                    {/* Viewport Canvas */}
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                      <UnifiedProjectVisualCard
                        project={inspectProject}
                        latency={latency}
                        isInferencing={isInferencing}
                        onRunInference={handleRunInference}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-1">
                        {inspectProject.badge} · {inspectProject.year}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{inspectProject.title}</h3>
                      <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {inspectProject.description}
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    {inspectProject.metrics && inspectProject.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {inspectProject.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                          >
                            <span className="text-xs font-mono text-zinc-500">{m.label}</span>
                            <div className="text-base font-mono font-bold text-white mt-1">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {inspectProject.tags.map((tag) => (
                        <Badge key={tag} variant="accent">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
                      <span className="font-mono text-xs text-zinc-500">
                        Auditado y verificado en GitHub
                      </span>

                      <a
                        href={inspectProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTick()}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-mono font-bold text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95"
                      >
                        <Github className="h-4 w-4" />
                        <span>Explorar Repositorio</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
