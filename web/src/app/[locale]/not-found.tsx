import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { defaultLocale } from "@/i18n/config";

export default function NotFound() {
  return (
    <main className="relative z-[2] flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="font-mono-token text-sm tracking-[0.25em] text-[var(--color-accent)]">
        ERROR 404
      </div>
      <h1 className="mt-6 text-[clamp(3rem,10vw,7rem)] font-bold leading-none tracking-[-0.04em]">
        <span className="text-gradient-accent">Pagina no encontrada</span>
      </h1>
      <p className="mt-6 max-w-[46ch] text-[1.05rem] text-[var(--color-muted)]">
        La ruta que buscas no existe o fue movida. Volvamos al inicio.
      </p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(43,92,255,0.4)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>
    </main>
  );
}
