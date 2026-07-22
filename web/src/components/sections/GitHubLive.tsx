"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { GithubContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/animations/Reveal";
import { Counter } from "@/components/animations/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TiltCard } from "@/components/ui/TiltCard";

interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
}

interface Profile {
  public_repos: number;
  followers: number;
}

/** Colores oficiales aproximados por lenguaje (paleta GitHub). */
const LANG_COLORS: Record<string, string> = {
  Java: "#b07219",
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  "Jupyter Notebook": "#DA5B0B",
  "C#": "#178600",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  TeX: "#3D6117",
};

/** Repos prioritarios (los mas relevantes para data/backend). */
const PRIORITY = [
  "ChurnInsight-Backend",
  "telecom-churn-ml-pipeline",
  "ChurnInsight-Frontend",
  "telecom-churn-eda",
  "novachef-restaurant-platform",
  "ai-workflow-recorder",
];

const CACHE_KEY = "gh-live-v2";
const CACHE_TTL = 30 * 60 * 1000;

function pickRepos(all: Repo[]): Repo[] {
  const byName = new Map(all.map((r) => [r.name, r]));
  const chosen: Repo[] = [];
  for (const name of PRIORITY) {
    const r = byName.get(name);
    if (r) chosen.push(r);
  }
  const rest = all
    .filter(
      (r) =>
        !r.fork &&
        r.name.toLowerCase() !== siteConfig.githubUser.toLowerCase() &&
        !chosen.includes(r),
    )
    .sort(
      (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    );
  return [...chosen, ...rest].slice(0, 6);
}

function timeAgo(iso: string, locale: Locale): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days < 1) return rtf.format(0, "day");
  if (days < 30) return rtf.format(-days, "day");
  if (days < 365) return rtf.format(-Math.round(days / 30), "month");
  return rtf.format(-Math.round(days / 365), "year");
}

/**
 * Seccion GitHub en vivo: consulta la API publica de GitHub desde el navegador
 * (cada visitante usa su propia cuota) y muestra los repos reales con enlaces.
 * Cachea 30 min en sessionStorage y degrada elegante si la API falla.
 */
export function GitHubLive({
  locale,
  content,
}: {
  locale: Locale;
  content: GithubContent;
}) {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { at, repos: r, profile: p } = JSON.parse(cached) as {
          at: number;
          repos: Repo[];
          profile: Profile;
        };
        if (Date.now() - at < CACHE_TTL) {
          setRepos(r);
          setProfile(p);
          return;
        }
      } catch {
        /* cache corrupta: se ignora */
      }
    }

    const load = async () => {
      try {
        const base = `https://api.github.com/users/${siteConfig.githubUser}`;
        const [pRes, rRes] = await Promise.all([
          fetch(base),
          fetch(`${base}/repos?sort=pushed&per_page=100`),
        ]);
        if (!pRes.ok || !rRes.ok) throw new Error("github api");
        const p = (await pRes.json()) as Profile;
        const all = (await rRes.json()) as Repo[];
        const top = pickRepos(all);
        if (cancelled) return;
        setProfile(p);
        setRepos(top);
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ at: Date.now(), repos: top, profile: p }),
        );
      } catch {
        if (!cancelled) setFailed(true);
      }
    };
    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="github"
      className="relative z-[2] mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)] py-[clamp(60px,9vw,120px)]"
    >
      <Reveal>
        <Eyebrow className="mb-4 flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          </span>
          {content.eyebrow}
        </Eyebrow>
      </Reveal>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal as="h2" className="text-[clamp(1.9rem,4vw,3.2rem)] font-bold tracking-[-0.03em]">
            {content.heading}
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-3 max-w-[52ch] text-[1.05rem] text-[var(--color-muted)]">
              {content.description}
            </p>
          </Reveal>
        </div>

        {!profile && !failed ? (
          <div className="flex h-[76px] w-[214px] items-center gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-4">
            <div className="flex-1 animate-pulse">
              <div className="h-6 w-12 rounded bg-white/10" />
              <div className="mt-2 h-3 w-16 rounded bg-white/5" />
            </div>
            <div className="h-8 w-px bg-white/[0.08]" />
            <div className="flex-1 animate-pulse">
              <div className="h-6 w-12 rounded bg-white/10" />
              <div className="mt-2 h-3 w-16 rounded bg-white/5" />
            </div>
          </div>
        ) : profile ? (
          <Reveal delay={150}>
            <div className="flex gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-4">
              <div>
                <div className="tabular-nums text-[1.7rem] font-bold leading-none">
                  <Counter value={profile.public_repos} />
                </div>
                <div className="font-mono-token mt-1 text-[9.5px] tracking-[0.12em] text-[var(--color-faint)]">
                  {content.reposLabel}
                </div>
              </div>
              <div className="w-px bg-white/[0.08]" />
              <div>
                <div className="tabular-nums text-[1.7rem] font-bold leading-none">
                  <Counter value={profile.followers} />
                </div>
                <div className="font-mono-token mt-1 text-[9.5px] tracking-[0.12em] text-[var(--color-faint)]">
                  {content.followersLabel}
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>

      <div className="mt-10">
        {failed ? (
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel flex items-center justify-between gap-4 rounded-2xl p-6 transition-colors hover:border-[var(--color-accent)]/40"
          >
            <span className="text-[var(--color-muted)]">{content.errorText}</span>
            <span className="inline-flex items-center gap-2 font-medium text-[var(--color-accent-2)]">
              <Github className="h-4 w-4" />
              github.com/{siteConfig.githubUser}
            </span>
          </a>
        ) : !repos ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[150px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              />
            ))}
            <p className="font-mono-token col-span-full text-center text-[11px] tracking-[0.1em] text-[var(--color-faint)]">
              {content.loadingText}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
                className="group glass-panel spin-border flex h-full flex-col rounded-2xl p-5 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex min-w-0 items-center gap-2">
                    <Github className="h-4 w-4 flex-none text-[var(--color-faint)]" />
                    <span className="truncate font-mono-token text-[13px] font-semibold text-[var(--color-ink)]">
                      {repo.name}
                    </span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 flex-none text-[var(--color-faint)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>

                <p className="mt-2.5 line-clamp-2 flex-1 text-[0.85rem] leading-relaxed text-[var(--color-muted)]">
                  {repo.description ?? "—"}
                </p>

                <div className="mt-4 flex items-center gap-4 text-[11px] text-[var(--color-faint)]">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: LANG_COLORS[repo.language] ?? "#8ab0ff" }}
                      />
                      <span className="font-mono-token">{repo.language}</span>
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" /> {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {repo.forks_count}
                    </span>
                  )}
                  <span className="font-mono-token ml-auto text-[10px]">
                    {content.updatedLabel} {timeAgo(repo.pushed_at, locale)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>

      <Reveal delay={120}>
        <div className="mt-8 text-center">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-6 py-3 text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/[0.12]"
          >
            <Github className="h-4 w-4" />
            {content.viewAll}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
