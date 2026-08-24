"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Layers, Award, Terminal, CheckCircle2, ShieldCheck, Sparkles, Database, Cloud } from "lucide-react";
import { playTick } from "@/lib/audio";

export function InteractiveRuntimeHUD() {
  const [activeTab, setActiveTab] = useState<"stack" | "experience" | "education">("stack");

  const handleTabChange = (tab: "stack" | "experience" | "education") => {
    playTick();
    setActiveTab(tab);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border-strong)] bg-gradient-to-b from-[#14141d]/95 via-[#0e0f17]/95 to-[#08080d]/98 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(59,130,246,0.15)] relative overflow-hidden">
      {/* Subtle top edge ambient glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-3/4 rounded-full bg-blue-500/20 blur-2xl" />

      {/* Terminal Header & Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-[var(--color-faint)] flex items-center gap-1">
            <Terminal className="h-3 w-3 text-cyan-400" />
            ower@dev-hub ~ profile
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 rounded-lg bg-[var(--color-base)]/80 p-1 border border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => handleTabChange("stack")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
              activeTab === "stack"
                ? "bg-[var(--color-accent)] text-white shadow-sm font-semibold"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            <Server className="h-3 w-3" />
            <span>Stack Core</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("experience")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
              activeTab === "experience"
                ? "bg-[var(--color-accent)] text-white shadow-sm font-semibold"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>Experiencia</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("education")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
              activeTab === "education"
                ? "bg-[var(--color-accent)] text-white shadow-sm font-semibold"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            <Award className="h-3 w-3" />
            <span>Logros & Certs</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Stack & Servicios */}
      <AnimatePresence mode="wait">
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
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-blue-400 font-bold mb-1">
                  <Server className="h-3.5 w-3.5" />
                  <span>Backend Engineering</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">Java 17 · Spring Boot 3.4</p>
                <span className="text-[10px] text-[var(--color-muted)]">Node.js · NestJS · REST APIs · JWT</span>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-bold mb-1">
                  <Database className="h-3.5 w-3.5" />
                  <span>Bases de Datos & SQL</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">PostgreSQL · MySQL · SQL Server</p>
                <span className="text-[10px] text-[var(--color-muted)]">MongoDB · Migraciones SQL · ETL</span>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-purple-400 font-bold mb-1">
                  <Cloud className="h-3.5 w-3.5" />
                  <span>Cloud & DevOps</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">Oracle Cloud (OCI) · AWS</p>
                <span className="text-[10px] text-[var(--color-muted)]">Docker · Git · Google Cloud (GCP)</span>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold mb-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Datos & ML Aplicado</span>
                </div>
                <p className="text-[var(--color-ink)] font-semibold text-xs">Python 3.12 · Pandas · NumPy</p>
                <span className="text-[10px] text-[var(--color-muted)]">ONNX Runtime · Power BI · XAI</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#07080d] p-3 text-[11px] text-[var(--color-muted)] flex items-center justify-between">
              <span className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Arquitectura Limpia & Prácticas Scrum
              </span>
              <span className="text-[10px] text-[var(--color-faint)]">Arequipa, Perú · UTC-5</span>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Experiencia & Roles */}
        {activeTab === "experience" && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-2.5 font-mono text-xs"
          >
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[var(--color-ink)]">Fundación CALMA</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Feb 2026 → Hoy
                </span>
              </div>
              <p className="text-xs text-emerald-300 font-semibold">Backend Developer (prácticas)</p>
              <p className="text-[10px] text-[var(--color-muted)] mt-1">
                Desarrollo de servicios backend REST con autenticación JWT, lógica de negocio y gestión de PostgreSQL, MySQL y MongoDB.
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/25 bg-amber-950/20 p-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[var(--color-ink)]">Hackathon NEXIA 2026</span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  1er Puesto
                </span>
              </div>
              <p className="text-xs text-amber-300 font-semibold">Build with AI (IBM / GDG / JAKU)</p>
              <p className="text-[10px] text-[var(--color-muted)] mt-1">
                MVP de innovación educativa desarrollado en &lt;48h con Node.js, NestJS e integración de APIs de IA.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[var(--color-ink)]">ESAN · PRONABEC Beca 18</span>
                <span className="text-[10px] text-blue-400 font-bold">2024 — 2025</span>
              </div>
              <p className="text-[10px] text-[var(--color-muted)]">
                Operador informático y soporte en plataforma de datos para más de 2,000 postulantes de la región.
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Logros & Certificaciones */}
        {activeTab === "education" && (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-2.5 font-mono text-xs"
          >
            <div className="rounded-xl border border-blue-500/25 bg-blue-950/20 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[var(--color-ink)]">Ingeniería de Sistemas · UNSA</span>
                <span className="text-[10px] text-cyan-400 font-bold bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/30">
                  9no Ciclo
                </span>
              </div>
              <p className="text-xs text-cyan-300 font-semibold">Quinto Superior (Top 20% de rendimiento)</p>
              <span className="text-[10px] text-[var(--color-muted)] block mt-0.5">
                Secretario de la directiva del ACM Student Chapter UNSA (2024–2025).
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-base)]/70 p-2.5">
                <span className="text-[10px] text-amber-400 font-bold block">Oracle Certified</span>
                <span className="text-[11px] text-[var(--color-ink)] font-semibold block mt-0.5">OCI Foundations</span>
                <span className="text-[9px] text-[var(--color-muted)]">+ APEX Developer Pro</span>
              </div>

              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-base)]/70 p-2.5">
                <span className="text-[10px] text-cyan-400 font-bold block">Cloud Foundations</span>
                <span className="text-[11px] text-[var(--color-ink)] font-semibold block mt-0.5">AWS & Google Cloud</span>
                <span className="text-[9px] text-[var(--color-muted)]">Certificaciones oficiales</span>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)]/70 p-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[var(--color-ink)] block">ONE Tech — Data Science (440h)</span>
                <span className="text-[10px] text-[var(--color-muted)]">Alura Latam & Oracle Next Education</span>
              </div>
              <span className="text-xs text-emerald-400 font-bold">✓ Verificado</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
