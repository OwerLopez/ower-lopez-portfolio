"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, GitCommit, Github, RefreshCw } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { siteConfig } from "@/config/site";
import type { PortfolioContent } from "@/types/content";

interface GithubUser {
  public_repos?: number;
  followers?: number;
  pushed_at?: string;
  updated_at?: string;
}

interface Commit {
  sha: string;
  commit: { message: string; author?: { date?: string } | null };
}

function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
}

function timeAgo(iso: string | undefined): string {
  if (!iso) return "—";
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "hace segundos";
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} h`;
  return `hace ${Math.floor(seconds / 86400)} d`;
}

export function GitHubLive({ content }: { content: PortfolioContent }) {
  const { github } = content;

  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "ready"; user: GithubUser; commits: Commit[] }
    | { status: "error" }
  >({ status: "loading" });

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const [userRes, commitsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${siteConfig.githubUser}`, {
          headers: { Accept: "application/vnd.github+json" },
        }),
        fetch(`https://api.github.com/users/${siteConfig.githubUser}/commits?per_page=4`, {
          headers: { Accept: "application/vnd.github+json" },
        }),
      ]);
      if (!userRes.ok) {
        setState({ status: "error" });
        return;
      }
      const user = (await userRes.json()) as GithubUser;
      const commits = commitsRes.ok ? ((await commitsRes.json()) as Commit[]) : [];
      setState({ status: "ready", user, commits });
    } catch {
      setState({ status: "error" });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const lastPush =
    state.status === "ready"
      ? state.user.pushed_at
        ? (timeAgo(state.user.pushed_at) || formatDateShort(state.user.pushed_at))
        : "Sin actividad publica"
      : undefined;

  return (
    <section id="github" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12" aria-label="GitHub en vivo">
      <Reveal>
        <p className="font-mono-token mb-4 flex items-center gap-4 text-xs tracking-[0.35em] text-muted">
          <span className="inline-block h-px w-12 bg-line-strong" />
          {github.kicker}
        </p>
      </Reveal>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Reveal delay={80}>
            <h2 className="font-display text-3xl leading-[1.12] font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              {github.heading}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 text-base text-muted">{github.description}</p>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm text-ink transition-all duration-300 hover:border-[#8b5cf6]/50 hover:bg-surface-raised"
          >
            {github.viewAll}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      {/* Panel de telemetría */}
      <Reveal delay={220} variant="block">
        <div className="border-gradient relative overflow-hidden rounded-2xl bg-surface-raised p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#8b5cf6]/12 blur-[80px]"
          />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-ink" />
              <span className="font-mono-token text-sm font-semibold text-ink">
                github.com/{siteConfig.githubUser}
              </span>
            </div>
            <span className="rec-blink font-mono-token inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#34d399]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#34d399]" />
              {github.updatedLabel}
            </span>
          </div>

          {state.status === "error" ? (
            <p className="mt-10 rounded-xl border border-line bg-surface px-6 py-10 text-center text-sm text-muted">
              {github.errorText}
            </p>
          ) : (
            <dl className="mt-9 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
              {github.metrics.map((m, i) => {
                const display =
                  state.status === "ready"
                    ? i === 2
                      ? lastPush
                      : i === 0
                        ? String(state.user.public_repos ?? 0)
                        : String(state.user.followers ?? 0)
                    : "—";
                return (
                  <div
                    key={m.label}
                    className="bg-base px-6 py-8 transition-colors duration-300 hover:bg-surface"
                  >
                    <dd
                      className={`text-3xl font-bold tracking-tight tabular-nums sm:text-4xl ${i === 2 ? "text-ink" : "text-gradient-flame"}`}
                    >
                      {display}
                    </dd>
                    <dt className="font-mono-token mt-2 text-[10px] font-medium uppercase tracking-widest text-faint">
                      {m.label}
                    </dt>
                  </div>
                );
              })}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            {state.status === "loading" ? (
              <p className="flex items-center gap-3 font-mono-token text-xs text-muted">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                {github.loadingText}
              </p>
            ) : (
              <p className="font-mono-token text-xs text-faint">
                {siteConfig.githubUser} · {github.logTitle}
              </p>
            )}
          </div>

          {/* Log de commits */}
          <div className="mt-6 rounded-xl border border-line bg-surface p-5">
            <h3 className="font-mono-token mb-4 text-[10px] uppercase tracking-[0.25em] text-faint">
              {github.logTitle}
            </h3>
            {state.status === "ready" && state.commits.length === 0 ? (
              <p className="py-6 text-center font-mono-token text-xs text-faint">{github.logEmpty}</p>
            ) : state.status === "ready" ? (
              <ul className="divide-y divide-line/60">
                {state.commits.map((commit) => (
                  <li key={commit.sha} className="flex items-baseline gap-4 py-3.5">
                    <GitCommit className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8b5cf6]" />
                    <code className="font-mono-token text-xs text-muted">
                      {(commit.commit.message ?? "").split("\n")[0] || "—"}
                    </code>
                    <span className="ml-auto font-mono-token text-[10px] tabular-nums text-faint">
                      {commit.commit.author?.date
                        ? new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "short" }).format(
                            new Date(commit.commit.author.date),
                          )
                        : "—"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
