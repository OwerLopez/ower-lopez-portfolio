"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { siteConfig } from "@/config/site";

interface Line {
  kind: "cmd" | "out" | "ok" | "err";
  text: string;
}

const COMMANDS = [
  "help",
  "whoami",
  "stack",
  "projects",
  "sql",
  "peru",
  "contact",
  "sudo hire-me",
  "clear",
] as const;

/** Salidas de cada comando (esteticas de terminal, datos reales del CV). */
function run(cmdRaw: string): Line[] {
  const cmd = cmdRaw.trim().toLowerCase();
  switch (cmd) {
    case "help":
      return [
        { kind: "out", text: "comandos disponibles:" },
        { kind: "ok", text: "  whoami        → quien soy" },
        { kind: "ok", text: "  stack         → tecnologias que uso" },
        { kind: "ok", text: "  projects      → proyectos clave" },
        { kind: "ok", text: "  sql           → consulta de metricas en vivo" },
        { kind: "ok", text: "  peru          → 🇵🇪" },
        { kind: "ok", text: "  contact       → hablemos" },
        { kind: "ok", text: "  sudo hire-me  → ..." },
        { kind: "ok", text: "  clear         → limpiar consola" },
      ];
    case "whoami":
      return [
        { kind: "out", text: "ower_frank_lopez_arela" },
        { kind: "ok", text: "→ Junior Data Engineer & Backend Developer" },
        { kind: "ok", text: "→ Ing. de Sistemas (9no ciclo) · UNSA · Quinto Superior" },
        { kind: "ok", text: "→ Backend en produccion @ Fundacion CALMA" },
        { kind: "ok", text: "→ 2× primer puesto (NEXIA 2026, Feria UNSA 2024)" },
      ];
    case "stack":
      return [
        { kind: "out", text: "$ cat ~/.stack" },
        { kind: "ok", text: "data:    SQL avanzado · Python · Pandas · Power BI" },
        { kind: "ok", text: "backend: Java 17 · Spring Boot · NestJS · Node.js" },
        { kind: "ok", text: "ml:      ONNX Runtime · Random Forest · XAI" },
        { kind: "ok", text: "db:      PostgreSQL · MySQL · SQL Server · MongoDB" },
        { kind: "ok", text: "cloud:   OCI · AWS (EC2,S3) · GCP" },
      ];
    case "projects":
      return [
        { kind: "out", text: "ls ~/projects --sort=impact" },
        { kind: "ok", text: "churninsight/   → ML embebido · 2000ms→20ms · recall 96%" },
        { kind: "ok", text: "nexia-2026/     → 1er puesto · MVP IA en <48h" },
        { kind: "ok", text: "chakrita/       → 1er puesto · IoT agricultura" },
        { kind: "ok", text: `↳ codigo: github.com/${siteConfig.githubUser}` },
      ];
    case "sql":
      return [
        { kind: "out", text: "=> SELECT skill, level FROM engineer WHERE focus='data';" },
        { kind: "ok", text: "┌─────────────────┬───────┐" },
        { kind: "ok", text: "│ sql_avanzado    │  ███  │" },
        { kind: "ok", text: "│ data_pipelines  │  ███  │" },
        { kind: "ok", text: "│ spring_boot     │  ███  │" },
        { kind: "ok", text: "└─────────────────┴───────┘" },
        { kind: "ok", text: "3 rows · 0.002s" },
      ];
    case "peru":
      return [
        { kind: "ok", text: "        🇵🇪  AREQUIPA, PERU" },
        { kind: "out", text: "  16.40°S 71.53°W · 2,335 m s.n.m." },
        { kind: "out", text: "  ciudad blanca · volcan Misti · sillar" },
        { kind: "ok", text: "  exportando ingenieria al mundo, UTC-5" },
      ];
    case "contact":
      return [
        { kind: "ok", text: `email:    ${siteConfig.email}` },
        { kind: "ok", text: `github:   github.com/${siteConfig.githubUser}` },
        { kind: "ok", text: "linkedin: /in/owerfrank-data" },
        { kind: "ok", text: "credly:   credly.com/users/ower-frank-lopez-arela" },
        { kind: "out", text: "status:   DISPONIBLE PARA ROLES JUNIOR DATA ENGINEER" },
      ];
    case "sudo hire-me":
      return [
        { kind: "out", text: "[sudo] password for recruiter: ********" },
        { kind: "ok", text: "✔ permisos concedidos." },
        { kind: "ok", text: "✔ candidato verificado: 51 certs · 2× 1er puesto" },
        { kind: "ok", text: "✔ agendando entrevista..." },
        { kind: "ok", text: `→ escribe a ${siteConfig.email} 🚀` },
      ];
    case "":
      return [];
    default:
      return [
        { kind: "err", text: `comando no encontrado: ${cmd}` },
        { kind: "out", text: "escribe 'help' para ver los comandos" },
      ];
  }
}

const INTRO_CMD = "./ower --help";

/**
 * Terminal interactiva: auto-escribe una intro y luego acepta comandos reales
 * del visitante (tecleo o chips clicables). Todo corre en el cliente.
 */
export function InteractiveTerminal({ className }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(boxRef, { amount: 0.35 });

  const [typed, setTyped] = useState(0);
  const [booted, setBooted] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  // Intro auto-tipeada (respeta reduced-motion saltando la animacion)
  useEffect(() => {
    if (booted || !inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(INTRO_CMD.length);
      setLines(run("help"));
      setBooted(true);
      return;
    }
    if (typed < INTRO_CMD.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), 55);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines(run("help"));
      setBooted(true);
    }, 420);
    return () => clearTimeout(t);
  }, [inView, typed, booted]);

  // Autoscroll al fondo cuando hay nuevas lineas
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typed]);

  const submit = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    if (cmd.toLowerCase() === "clear") {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { kind: "cmd", text: cmd },
        ...run(cmd),
      ]);
    }
    setHistory((h) => [cmd, ...h].slice(0, 30));
    setHistIdx(-1);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit(value);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHistIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next < 0 ? -1 : next);
      setValue(next < 0 ? "" : history[next] ?? "");
    }
  };

  const color = (k: Line["kind"]) =>
    k === "cmd"
      ? "text-[#c9d4f5]"
      : k === "ok"
        ? "text-[#8fe3a8]"
        : k === "err"
          ? "text-[#ff8090]"
          : "text-[var(--color-muted)]";

  return (
    <div
      ref={boxRef}
      onClick={() => inputRef.current?.focus()}
      className={`cursor-text overflow-hidden rounded-[18px] border border-white/[0.09] bg-[rgba(6,7,11,0.92)] shadow-[0_24px_70px_rgba(0,0,0,0.5)] ${className ?? ""}`}
    >
      {/* Barra de titulo */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="font-mono-token ml-3 text-[10.5px] tracking-[0.12em] text-[var(--color-faint)]">
          ower@data-eng:~ — prueba a escribir
        </span>
      </div>

      <div
        ref={scrollRef}
        className="font-mono-token h-[300px] overflow-y-auto p-5 text-[12.5px] leading-[1.75]"
      >
        {/* Intro */}
        <div>
          <span className="select-none text-[var(--color-accent-2)]">$ </span>
          <span className="text-[#c9d4f5]">{INTRO_CMD.slice(0, typed)}</span>
          {!booted && (
            <span className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] bg-[var(--color-accent-2)] motion-safe:animate-[var(--animate-blink)]" />
          )}
        </div>

        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${color(line.kind)}`}>
            {line.kind === "cmd" ? (
              <>
                <span className="select-none text-[var(--color-accent-2)]">$ </span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}

        {/* Prompt vivo */}
        {booted && (
          <div className="flex items-center">
            <span className="select-none text-[var(--color-accent-2)]">$ </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="terminal input"
              className="ml-1 w-full bg-transparent text-[#c9d4f5] caret-[var(--color-accent-2)] outline-none placeholder:text-white/20"
              placeholder="escribe un comando… (help)"
            />
          </div>
        )}
      </div>

      {/* Chips de comandos (clave para movil) */}
      <div className="flex flex-wrap gap-1.5 border-t border-white/[0.07] bg-white/[0.015] px-4 py-3">
        {COMMANDS.filter((c) => c !== "clear").map((c) => (
          <button
            key={c}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              submit(c);
            }}
            className="font-mono-token rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10.5px] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent-2)]"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
