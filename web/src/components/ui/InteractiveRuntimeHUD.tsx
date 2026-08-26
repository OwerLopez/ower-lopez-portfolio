"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Layers, Terminal, ShieldCheck, Database, Cloud, Activity, Zap, Cpu } from "lucide-react";
import { playTick } from "@/lib/audio";

export function InteractiveRuntimeHUD() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "stack" | "architecture">("telemetry");

  const handleTabChange = (tab: "telemetry" | "stack" | "architecture") => {
    playTick();
    setActiveTab(tab);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border-strong)] bg-gradient-to-b from-[#12131c]/95 via-[#0d0e16]/95 to-[#08080d]/98 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(59,130,246,0.15)] relative overflow-hidden">
      {/* Subtle top edge ambient glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-3/4 rounded-full bg-blue-500/20 blur-2xl" />

      {/* Terminal Header & Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-[var(--color-faint)] flex items-center gap-1">
            <Terminal className="h-3 w-3 text-cyan-400" />
            ower@backend-runtime ~ live
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 rounded-lg bg-[#07080d] p-1 border border-white/[0.08]">
          <button
            type="button"
            onClick={() => handleTabChange("telemetry")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
              activeTab === "telemetry"
                ? "bg-blue-600/90 text-white shadow-sm font-semibold"
                : "text-[var(--color-muted)] hover:text-white"
            }`}
          >
            <Activity className="h-3 w-3 text-cyan-300" />
            <span>Telemetría</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("stack")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
              activeTab === "stack"
                ? "bg-blue-600/90 text-white shadow-sm font-semibold"
                : "text-[var(--color-muted)] hover:text-white"
            }`}
          >
            <Server className="h-3 w-3 text-blue-300" />
            <span>Stack Core</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("architecture")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
              activeTab === "architecture"
                ? "bg-blue-600/90 text-white shadow-sm font-semibold"
                : "text-[var(--color-muted)] hover:text-white"
            }`}
          >
            <Layers className="h-3 w-3 text-cyan-300" />
            <span>Arquitectura</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Live Engine Telemetry */}
      <AnimatePresence mode="wait">
        {activeTab === "telemetry" && (
          <motion.div
            key="telemetry"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-3 font-mono text-xs"
          >
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-blue-500/25 bg-blue-950/20 p-3">
                <div className="flex items-center justify-between text-[11px] text-blue-400 font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-cyan-400" />
                    Latencia Inferencia
                  </span>
                  <span className="text-emerald-400 font-extrabold">20 ms</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">P99 embebido (ONNX)</p>
                <span className="text-[10px] text-[var(--color-muted)]">Sin overhead de red externa</span>
              </div>

              <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-3">
                <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    Model Recall
                  </span>
                  <span className="text-emerald-300 font-extrabold">96.0%</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">Random Forest Model</p>
                <span className="text-[10px] text-[var(--color-muted)]">Optimizado para churn</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#07080d] p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--color-muted)] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  JVM 17 + Spring Boot 3.4 Runtime
                </span>
                <span className="text-blue-400 font-bold">ACTIVO</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--color-muted)] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  PostgreSQL Connection Pool & Migraciones
                </span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Core Stack */}
        {activeTab === "stack" && (
          <motion.div
            key="stack"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-3 font-mono text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/[0.08] bg-[#0c0d15] p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-blue-400 font-bold mb-1">
                  <Server className="h-3.5 w-3.5" />
                  <span>Backend Core</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">Java 17 · Spring Boot 3.4</p>
                <span className="text-[10px] text-[var(--color-muted)]">NestJS · Node.js · REST APIs</span>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#0c0d15] p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-bold mb-1">
                  <Database className="h-3.5 w-3.5" />
                  <span>Datos & SQL</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">PostgreSQL · MySQL · SQL Server</p>
                <span className="text-[10px] text-[var(--color-muted)]">MongoDB · Python ETL</span>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#0c0d15] p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-blue-400 font-bold mb-1">
                  <Cloud className="h-3.5 w-3.5" />
                  <span>Cloud & DevOps</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">Oracle Cloud (OCI) · AWS · GCP</p>
                <span className="text-[10px] text-[var(--color-muted)]">Docker · Git CI/CD</span>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#0c0d15] p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-bold mb-1">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>ML & Rendimiento</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">ONNX Runtime · Fast In-Memory</p>
                <span className="text-[10px] text-[var(--color-muted)]">Clean Architecture & Scrum</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Architecture & Lifecycle */}
        {activeTab === "architecture" && (
          <motion.div
            key="architecture"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-2.5 font-mono text-xs"
          >
            <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-blue-300">Pipeline de Datos 5 Etapas</span>
                <span className="text-[10px] text-emerald-400 font-bold">E1 → E5</span>
              </div>
              <p className="text-[11px] text-[var(--color-muted)]">
                Ingesta estructurada, procesamiento ETL, validación de esquemas, inferencia embebida y capa de servicio REST documentada.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#07080d] p-3 text-[11px] text-[var(--color-muted)] flex items-center justify-between">
              <span className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Arquitectura Limpia & Tipado Estricto
              </span>
              <span className="text-[10px] text-[var(--color-faint)]">Arequipa, Perú · UTC-5</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
