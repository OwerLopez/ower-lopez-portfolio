"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Github, Radio } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { GithubContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Counter } from "@/components/animations/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";

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
};

const PRIORITY = [
  "ChurnInsight-Backend",
  "telecom-churn-ml-pipeline",
  "ower-lopez-portfolio",
  "novachef-restaurant-platform",
  "ai-workflow-recorder",
];

const CACHE_KEY = "gh-live-v3";
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
        !chosen.includes(r)
    )
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  return [...chosen, ...rest].slice(0, 6);
}

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
        const { at, repos: r, profile: p } = JSON.parse(cached);
        if (Date.now() - at < CACHE_TTL) {
          setRepos(r);
          setProfile(p);
          return;
        }
      } catch {}
    }

    const load = async () => {
      try {
        const base = `https://api.github.com/users/${siteConfig.githubUser}`;
        const [pRes, rRes] = await Promise.all([
          fetch(base),
          fetch(`${base}/repos?sort=pushed&per_page=100`),
        ]);
        if (!pRes.ok || !rRes.ok) throw new Error("github api error");
        const p = (await pRes.json()) as Profile;
        const all = (await rRes.json()) as Repo[];
        const top = pickRepos(all);
        if (cancelled) return;
        setProfile(p);
        setRepos(top);
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ at: Date.now(), repos: top, profile: p })
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
      className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-32"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <div>
          <Eyebrow className="flex items-center gap-2 mb-4">
            <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>{content.eyebrow}</span>
          </Eyebrow>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
            {content.heading}
          </h2>
          <p className="text-zinc-400 max-w-xl text-base sm:text-lg mt-4">
            {content.description}
          </p>
        </div>

        {profile && (
          <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-[#09080d]/80 p-5 backdrop-blur-xl shrink-0">
            <div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-white">
                <Counter value={profile.public_repos} />
              </div>
              <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
                {content.reposLabel}
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-400">
                <Counter value={profile.followers} />
              </div>
              <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
                {content.followersLabel}
              </div>
            </div>
          </div>
        )}
      </div>

      {failed ? (
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-amber-400/50"
        >
          <span className="text-zinc-400">{content.errorText}</span>
          <span className="font-mono text-sm font-semibold text-amber-400 flex items-center gap-2">
            <Github className="h-4 w-4" /> github.com/{siteConfig.githubUser}
          </span>
        </a>
      ) : !repos ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl border border-white/10 bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <motion.a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-[#09080d]/80 p-6 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:border-amber-400/50 hover:shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-amber-400" />
                    <span className="font-mono text-sm font-bold text-white truncate">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-amber-400" />
                </div>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-6">
                  {repo.description || "—"}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs text-zinc-400">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: LANG_COLORS[repo.language] || "#ffc978" }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-400" /> {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3 text-cyan-400" /> {repo.forks_count}
                    </span>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-amber-400 hover:bg-white/10 hover:shadow-lg"
        >
          <Github className="h-4 w-4 text-amber-400" />
          <span>{content.viewAll}</span>
          <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
        </a>
      </div>
    </section>
  );
}
