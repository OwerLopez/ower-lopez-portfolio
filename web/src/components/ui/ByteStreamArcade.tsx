"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  RotateCcw, 
  Zap, 
  Cpu, 
  Flame, 
  Sparkles, 
  Activity, 
  Trash2,
  Trophy
} from "lucide-react";
import { playTick, playSuccess, playInference } from "@/lib/audio";
import type { ArcadeContent } from "@/types/content";

interface Packet {
  id: number;
  lane: 0 | 1 | 2;
  y: number; // 0 to 100%
  type: "clean" | "spike" | "boost";
  label: string;
}

export function ByteStreamArcade({ content }: { content: ArcadeContent }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [latency, setLatency] = useState(20.0);
  const [gcCooldown, setGcCooldown] = useState(0);
  const [activeLanePress, setActiveLanePress] = useState<number | null>(null);
  const [bannerFeedback, setBannerFeedback] = useState<string | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);

  const packetsRef = useRef<Packet[]>([]);
  const isPlayingRef = useRef(false);
  const nextPacketId = useRef(1);
  const animationFrameId = useRef<number | null>(null);
  const lastSpawnTime = useRef(0);

  // Load highscore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ower_portfolio_arcade_hs");
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch {
      /* ignore */
    }
  }, []);

  const saveHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      try {
        localStorage.setItem("ower_portfolio_arcade_hs", newScore.toString());
      } catch {
        /* ignore */
      }
    }
  };

  const triggerFeedback = (msg: string) => {
    setBannerFeedback(msg);
    setTimeout(() => setBannerFeedback(null), 1000);
  };

  const startGame = () => {
    playInference();
    setScore(0);
    setCombo(0);
    setLatency(20.0);
    setPackets([]);
    packetsRef.current = [];
    isPlayingRef.current = true;
    setIsPlaying(true);
    triggerFeedback("PIPELINE ONLINE · 20ms SLA");
  };

  const stopGame = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    saveHighScore(score);
  };

  // Garbage Collector Sweep Pulse
  const triggerGarbageCollector = useCallback(() => {
    if (gcCooldown > 0 || !isPlayingRef.current) return;
    playInference();
    setGcCooldown(100);

    // Vaporize any corrupted spikes currently in flight
    const current = packetsRef.current;
    const cleaned = current.filter((p) => p.type !== "spike");
    const vaporizedCount = current.length - cleaned.length;

    packetsRef.current = cleaned;
    setPackets([...cleaned]);

    if (vaporizedCount > 0) {
      playSuccess();
      const bonus = vaporizedCount * 250;
      setScore((s) => {
        const next = s + bonus;
        saveHighScore(next);
        return next;
      });
      setLatency((l) => Math.max(11.2, +(l - 2.5).toFixed(1)));
      triggerFeedback(`🧹 GC CLEANUP: +${bonus} PTS`);
    } else {
      triggerFeedback("🧹 GC REFRESH: HEAP OPTIMIZADO");
    }

    // Cooldown countdown
    const interval = setInterval(() => {
      setGcCooldown((prev) => {
        if (prev <= 10) {
          clearInterval(interval);
          return 0;
        }
        return prev - 10;
      });
    }, 200);
  }, [gcCooldown, score, highScore]);

  // Handle Lane Intercept (by lane 0, 1, 2)
  const interceptLane = useCallback((laneIndex: 0 | 1 | 2) => {
    if (!isPlayingRef.current) return;
    setActiveLanePress(laneIndex);
    setTimeout(() => setActiveLanePress(null), 150);

    const current = packetsRef.current;
    // Find closest packet in this lane in the hit window (y between 60% and 98%)
    const hitTarget = current.find((p) => p.lane === laneIndex && p.y >= 60 && p.y <= 98);

    if (hitTarget) {
      // Remove hit packet
      packetsRef.current = current.filter((p) => p.id !== hitTarget.id);
      setPackets([...packetsRef.current]);

      if (hitTarget.type === "clean" || hitTarget.type === "boost") {
        playSuccess();
        const multiplier = Math.min(8, Math.floor(combo / 4) + 1);
        const pts = (hitTarget.type === "boost" ? 250 : 100) * multiplier;
        
        setScore((s) => {
          const next = s + pts;
          saveHighScore(next);
          return next;
        });

        setCombo((c) => c + 1);
        setLatency((l) => Math.max(9.8, +(l - 0.4).toFixed(1)));
        triggerFeedback(`⚡ INTERCEPT: +${pts} (${multiplier}x)`);
      } else {
        // Hit a spike manually without GC
        playTick();
        setCombo(0);
        setLatency((l) => +(l + 8.5).toFixed(1));
        triggerFeedback("⚠️ SPIKE DETECTADO (+8ms)");
      }
    } else {
      // Missed tap
      playTick();
      setCombo(0);
    }
  }, [combo]);

  // Main Game Loop (RequestAnimationFrame)
  useEffect(() => {
    if (!isPlaying) return;

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Spawn packets periodically
      if (now - lastSpawnTime.current > Math.max(450, 950 - Math.min(score, 5000) / 10)) {
        lastSpawnTime.current = now;
        const lane = Math.floor(Math.random() * 3) as 0 | 1 | 2;
        const randType = Math.random();
        let type: "clean" | "spike" | "boost" = "clean";
        let label = "DATA_200";

        if (randType > 0.78) {
          type = "spike";
          label = "SPIKE_500";
        } else if (randType > 0.65) {
          type = "boost";
          label = "ONNX_FAST";
        }

        const newPacket: Packet = {
          id: nextPacketId.current++,
          lane,
          y: 0,
          type,
          label,
        };

        packetsRef.current.push(newPacket);
      }

      // Update positions
      const speed = 45 + Math.min(score / 150, 45); // percentage per second
      let latencyPenalty = 0;

      const remaining = packetsRef.current.map((p) => ({
        ...p,
        y: p.y + speed * dt,
      })).filter((p) => {
        if (p.y > 100) {
          // Missed packet reached bottom
          if (p.type === "clean") {
            latencyPenalty += 3.5;
          }
          return false;
        }
        return true;
      });

      if (latencyPenalty > 0) {
        setCombo(0);
        setLatency((l) => {
          const next = +(l + latencyPenalty).toFixed(1);
          if (next >= 60.0) {
            // Buffer overflow - Game Over
            triggerFeedback("💥 BUFFER OVERFLOW (>60ms SLA)");
            stopGame();
            return 60.0;
          }
          return next;
        });
      }

      packetsRef.current = remaining;
      setPackets(remaining);

      if (isPlayingRef.current) {
        animationFrameId.current = requestAnimationFrame(loop);
      }
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, score]);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.code === "Space") {
        e.preventDefault();
        triggerGarbageCollector();
      } else if (e.key === "1" || e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        interceptLane(0);
      } else if (e.key === "2" || e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
        interceptLane(1);
      } else if (e.key === "3" || e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        interceptLane(2);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [interceptLane, triggerGarbageCollector]);

  const laneLabels = [
    { name: "CH-0: JVM Ingest", key: "1 / A" },
    { name: "CH-1: ONNX Predict", key: "2 / S" },
    { name: "CH-2: Async Stream", key: "3 / D" },
  ];

  return (
    <div className="w-full rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0e101c]/98 via-[#090b14]/98 to-[#06070d]/98 p-5 sm:p-7 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_-5px_rgba(59,130,246,0.25)] relative overflow-hidden font-mono select-none">
      
      {/* Top Ambient Glow */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-3/4 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Arcade Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            <Cpu className="h-4 w-4 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                {content.title}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/15 border border-blue-500/30 text-blue-300">
                v2.4 Live
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden sm:block">
              {content.tagline}
            </p>
          </div>
        </div>

        {/* Live Status Pill & High Score */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 font-bold">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[10px] text-amber-200/70">{content.highScoreLabel}:</span>
            <span className="tabular-nums">{highScore}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SLA &lt; 20ms</span>
          </div>
        </div>
      </div>

      {/* Real-Time Dashboard Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        {/* Score */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
          <span className="text-[10px] text-zinc-500 font-semibold block uppercase">
            {content.scoreLabel}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-white tabular-nums block mt-0.5">
            {score}
          </span>
        </div>

        {/* P99 Latency */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
          <span className="text-[10px] text-zinc-500 font-semibold block uppercase">
            {content.latencyLabel}
          </span>
          <span className={`text-xl sm:text-2xl font-extrabold tabular-nums block mt-0.5 ${
            latency <= 20 ? "text-emerald-400" : latency <= 35 ? "text-amber-400" : "text-red-400"
          }`}>
            {latency} ms
          </span>
        </div>

        {/* Combo Streak */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
          <span className="text-[10px] text-zinc-500 font-semibold block uppercase flex items-center justify-center gap-1">
            <Flame className="h-3 w-3 text-amber-400" />
            {content.comboLabel}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-cyan-300 tabular-nums block mt-0.5">
            {combo}x
          </span>
        </div>

        {/* Garbage Collector Cooldown */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
          <span className="text-[10px] text-zinc-500 font-semibold block uppercase flex items-center justify-center gap-1">
            <Trash2 className="h-3 w-3 text-purple-400" />
            GC Status
          </span>
          <span className={`text-sm sm:text-base font-bold block mt-1 ${
            gcCooldown === 0 ? "text-emerald-400" : "text-purple-300"
          }`}>
            {gcCooldown === 0 ? "LISTO (READY)" : `${gcCooldown}% COOL`}
          </span>
        </div>
      </div>

      {/* Main Arcade Arena Display */}
      <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-black/60 border border-white/[0.1] overflow-hidden flex flex-col justify-between">
        
        {/* Subtle Lane Grid Divider Lines */}
        <div className="absolute inset-0 grid grid-cols-3 pointer-events-none divide-x divide-white/[0.06]">
          <div className="h-full w-full" />
          <div className="h-full w-full" />
          <div className="h-full w-full" />
        </div>

        {/* Target Intercept Hit Zone Indicator Line */}
        <div className="absolute bottom-12 inset-x-0 h-14 bg-gradient-to-t from-blue-500/15 via-cyan-500/10 to-transparent border-t border-cyan-500/40 pointer-events-none flex items-center justify-between px-3 text-[9px] text-cyan-400/80 font-bold">
          <span>◄ TARGET ZONE (60% - 95%) ►</span>
          <span>INTERCEPT LINE</span>
        </div>

        {/* Live Floating Packets */}
        <div className="relative h-full w-full">
          {packets.map((pkt) => {
            const laneLefts = ["left-[16.66%]", "left-[50%]", "left-[83.33%]"];
            const isSpike = pkt.type === "spike";
            const isBoost = pkt.type === "boost";

            return (
              <div
                key={pkt.id}
                style={{ top: `${pkt.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ${laneLefts[pkt.lane]}`}
              >
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-lg border transition-all ${
                    isSpike
                      ? "bg-red-950/90 border-red-500 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.7)] animate-pulse"
                      : isBoost
                      ? "bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                      : "bg-blue-950/90 border-blue-400 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isSpike ? "bg-red-400" : "bg-cyan-400"}`} />
                  <span>{pkt.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Feedback Overlay */}
        <AnimatePresence>
          {bannerFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600/90 border border-cyan-400 text-white text-xs font-bold shadow-xl pointer-events-none z-30"
            >
              {bannerFeedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle / Play Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-40">
            <div className="h-14 w-14 rounded-2xl bg-blue-600/20 border border-blue-500/50 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.5)] mb-3">
              <Activity className="h-7 w-7 text-cyan-300 animate-pulse" />
            </div>
            
            <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {content.title}
            </h4>
            <p className="text-xs text-zinc-400 max-w-md mt-1 mb-4 leading-relaxed">
              {content.instructions}
            </p>

            <button
              type="button"
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>{content.startCta}</span>
            </button>
          </div>
        )}

        {/* Bottom Interactive Tactile Lane Pads */}
        <div className="grid grid-cols-3 gap-2 p-2 bg-[#080a12]/90 border-t border-white/[0.08] z-20">
          {laneLabels.map((lane, idx) => (
            <button
              key={lane.name}
              type="button"
              onClick={() => interceptLane(idx as 0 | 1 | 2)}
              className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                activeLanePress === idx
                  ? "bg-cyan-500/30 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-95"
                  : "bg-white/[0.04] border-white/[0.08] hover:bg-blue-500/15 hover:border-blue-500/30"
              }`}
            >
              <div className="text-[10px] text-zinc-300 font-bold truncate">{lane.name}</div>
              <div className="text-[9px] text-cyan-400/80 font-mono mt-0.5">[{lane.key}]</div>
            </button>
          ))}
        </div>

      </div>

      {/* Action Bar: GC Sweep Button & Reset Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerGarbageCollector}
            disabled={gcCooldown > 0 || !isPlaying}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 font-bold transition-all disabled:opacity-40 cursor-pointer active:scale-95 shadow-sm"
          >
            <Trash2 className="h-3.5 w-3.5 text-purple-400" />
            <span>{content.gcButton}</span>
            <span className="text-[10px] text-purple-300/80">[SPACE]</span>
          </button>

          {isPlaying && (
            <button
              type="button"
              onClick={stopGame}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{content.resetButton}</span>
            </button>
          )}
        </div>

        <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-cyan-400 shrink-0" />
          <span>{content.tipText}</span>
        </p>
      </div>

    </div>
  );
}
