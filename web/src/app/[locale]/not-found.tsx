import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { defaultLocale } from "@/i18n/config";

/**
 * 404 page — kept simple and bilingual-safe.
 * Uses the default locale for the redirect link.
 */
export default function NotFound() {
  return (
    <main className="relative z-[2] flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mono-label">
        ERROR 404
      </div>
      <h1 className="mt-6 text-[clamp(2.5rem,8vw,5rem)] font-bold leading-none tracking-[-0.03em]">
        <span className="text-accent-gradient">Page not found</span>
      </h1>
      <p className="mt-6 max-w-[46ch] text-base text-[var(--color-muted)]">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(59,130,246,0.4)] transition-all duration-300 hover:scale-[1.02]"
      >
        <ArrowLeft className="h-4 w-4" />
        Go back
      </Link>
    </main>
  );
}
