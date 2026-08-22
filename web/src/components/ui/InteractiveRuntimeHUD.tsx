"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Cpu, Server, Activity, CheckCircle2, ShieldAlert } from "lucide-react";
import { playTick, playInference, playSuccess } from "@/lib/audio";

export function InteractiveRuntimeHUD() {
  const [activeTab, setActiveTab] = useState<"inference" | "jvm" | "benchmark">("inference");
  const [isRunning, setIsRunning] = useState(false);
  const [inferenceResult, setInferenceResult] = useState<{
    latency: number;
    probability: number;
    risk: "ALTO" | "MEDIO" | "BAJO";
    timestamp: string;
  }>({
    latency: 18.4,
    probability: 84.2,
    risk: "ALTO",
    timestamp: "15:20:44.812",
  });

  const runSimulation = () => {
    setIsRunning(true);
    playInference();
    setTimeout(() => {
      const randomLatency = +(16 + Math.random() * 4.5).toFixed(1);
      const randomProb = +(78 + Math.random() * 18).toFixed(1);
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${Math.floor(
        now.getMilliseconds(),
      )}`;

      setInferenceResult({
        latency: randomLatency,
        probability: randomProb,
        risk: randomProb > 75 ? "ALTO" : "MEDIO",
        timestamp: timeStr,
      });
      setIsRunning(false);
      playSuccess();
    }, 450);
  };

  const handleTabChange = (tab: "inference" | "jvm" | "benchmark") => {
    playTick();
    setActiveTab(tab);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border-strong)] bg-gradient-to-b from-[#14141d]/90 to-[#0c0c12]/95 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(59,130,246,0.15)] relative overflow-hidden">
      {/* Subtle top edge glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-3/4 rounded-full bg-blue-500/20 blur-2xl" />

      {/* Terminal Header & Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-[var(--color-faint)] hidden sm:inline-block">
            runtime@churninsight-engine
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 rounded-lg bg-[var(--color-base)]/80 p-1 border border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => handleTabChange("inference")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
              activeTab === "inference"
                ? "bg-[var(--color-accent)] text-white shadow-sm font-semibold"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            <Cpu className="h-3 w-3" />
            <span>ONNX Live</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("jvm")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
              activeTab === "jvm"
                ? "bg-[var(--color-accent)] text-white shadow-sm font-semibold"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            <Server className="h-3 w-3" />
            <span>JVM Telemetry</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("benchmark")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
              activeTab === "benchmark"
                ? "bg-[var(--color-accent)] text-white shadow-sm font-semibold"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            <Activity className="h-3 w-3" />
            <span>100x Speed</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Live ONNX Inference Simulator */}
      <AnimatePresence mode="wait">
        {activeTab === "inference" && (
          <motion.div
            key="inference"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-4 font-mono text-xs"
          >
            {/* Real-time Status Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <span className="text-[10px] text-[var(--color-faint)] uppercase block mb-1">
                  Latencia P99
                </span>
                <span className="text-xl font-bold text-emerald-400 tabular-nums">
                  {inferenceResult.latency} ms
                </span>
                <span className="block text-[9px] text-emerald-500/80 mt-0.5">
                  ● In-Memory Native
                </span>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <span className="text-[10px] text-[var(--color-faint)] uppercase block mb-1">
                  Prob. Abandono
                </span>
                <span className="text-xl font-bold text-amber-400 tabular-nums">
                  {inferenceResult.probability}%
                </span>
                <span className="block text-[9px] text-amber-500/80 mt-0.5">
                  Riesgo: {inferenceResult.risk}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <span className="text-[10px] text-[var(--color-faint)] uppercase block mb-1">
                  Modelo ML
                </span>
                <span className="text-sm font-bold text-[var(--color-ink)] truncate block">
                  Random Forest
                </span>
                <span className="block text-[9px] text-[var(--color-accent)] mt-0.5">
                  ONNX C++ Runtime
                </span>
              </div>
            </div>

            {/* Feature Vector Payload View */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[#08080c] p-3.5 leading-relaxed text-[11px]">
              <div className="flex items-center justify-between text-[10px] text-[var(--color-faint)] mb-2 border-b border-[var(--color-border)] pb-1.5">
                <span>INPUT_TENSOR_VECTORS</span>
                <span>STATUS: 200 OK ({inferenceResult.timestamp})</span>
              </div>
              <div className="space-y-1 text-[var(--color-muted)]">
                <p>
                  <span className="text-cyan-400">contract_type</span>:{" "}
                  <span className="text-amber-300">&quot;month-to-month&quot;</span> |{" "}
                  <span className="text-cyan-400">tenure_months</span>:{" "}
                  <span className="text-purple-400">12</span>
                </p>
                <p>
                  <span className="text-cyan-400">monthly_charges</span>:{" "}
                  <span className="text-purple-400">$89.50</span> |{" "}
                  <span className="text-cyan-400">tech_support</span>:{" "}
                  <span className="text-red-400">0</span>
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[var(--color-faint)]">
                {isRunning ? "Calculando tensores..." : "Listo para inferencia"}
              </span>
              <button
                type="button"
                onClick={runSimulation}
                disabled={isRunning}
                className="group inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:bg-[var(--color-accent-hover)] hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isRunning ? (
                  <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Play className="h-3.5 w-3.5 fill-current" />
                )}
                <span>Simular Inferencia</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Tab 2: JVM Architecture Telemetry */}
        {activeTab === "jvm" && (
          <motion.div
            key="jvm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-3 font-mono text-xs"
          >
            <div className="space-y-2.5">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[var(--color-ink)] font-semibold">Overhead de Red Externo</span>
                  <span className="text-emerald-400 font-bold">0.0 ms (Cero Hops)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--color-surface)] overflow-hidden">
                  <div className="h-full w-0 bg-emerald-400" />
                </div>
                <span className="text-[10px] text-[var(--color-faint)] mt-1 block">
                  El modelo reside en el mismo heap de memoria que Spring Boot.
                </span>
              </div>

              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[var(--color-ink)] font-semibold">Memoria Heap JVM</span>
                  <span className="text-cyan-400 font-bold">~64 MB (Ultra Ligero)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--color-surface)] overflow-hidden">
                  <div className="h-full w-[20%] bg-cyan-400" />
                </div>
                <span className="text-[10px] text-[var(--color-faint)] mt-1 block">
                  ONNX runtime optimizado en C++ nativo vía JNI.
                </span>
              </div>

              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[var(--color-ink)] font-semibold">Seguridad & Autenticación</span>
                  <span className="text-purple-400 font-bold">JWT + RBAC</span>
                </div>
                <span className="text-[10px] text-[var(--color-faint)] block">
                  Endpoints protegidos con filtrado por rol y migraciones SQL versionadas.
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Benchmark Comparison Bar */}
        {activeTab === "benchmark" && (
          <motion.div
            key="benchmark"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-4 font-mono text-xs"
          >
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/80 p-4 space-y-4">
              {/* External API Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[var(--color-muted)]">API REST ML Externa (Python Flask/FastAPI)</span>
                  <span className="text-red-400 font-bold">2,000 ms</span>
                </div>
                <div className="h-3 w-full rounded-full bg-red-950/40 border border-red-500/20 overflow-hidden">
                  <div className="h-full w-full bg-red-500/80 rounded-full" />
                </div>
                <span className="text-[10px] text-[var(--color-faint)] mt-1 block">
                  Overhead: Red TLS + Serialización JSON + Cola de peticiones
                </span>
              </div>

              {/* Embedded ONNX Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[var(--color-ink)] font-bold">Inferencia Embebida ONNX (Spring Boot)</span>
                  <span className="text-emerald-400 font-bold text-sm">20 ms (100x más rápido)</span>
                </div>
                <div className="h-3 w-full rounded-full bg-emerald-950/40 border border-emerald-500/30 overflow-hidden">
                  <div className="h-full w-[2%] min-w-[12px] bg-emerald-400 rounded-full shadow-[0_0_12px_#34d399]" />
                </div>
                <span className="text-[10px] text-emerald-400/90 mt-1 block font-semibold">
                  ✓ Cero llamadas externas · Inferencia local en milisegundos
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
