"use client";

import { motion } from "framer-motion";
import type { WorkContent } from "@/types/content";

type Props = Pick<
  WorkContent,
  "comparisonTitle" | "comparisonHeaders" | "comparison"
>;

/**
 * Tabla comparativa de proyectos con revelado por fila al entrar al viewport.
 * Scrollea horizontalmente en pantallas pequenas sin romper el layout.
 */
export function ProjectComparison({
  comparisonTitle,
  comparisonHeaders,
  comparison,
}: Props) {
  const headers = [
    comparisonHeaders.project,
    comparisonHeaders.domain,
    comparisonHeaders.stack,
    comparisonHeaders.result,
    comparisonHeaders.role,
    comparisonHeaders.year,
  ];

  return (
    <div>
      <div className="font-mono-token mb-5 text-[11px] tracking-[0.15em] text-[var(--color-faint)]">
        {comparisonTitle.toUpperCase()}
      </div>

      <div className="overflow-x-auto rounded-[18px] border border-white/[0.09] bg-white/[0.02]">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.09]">
              {headers.map((h) => (
                <th
                  key={h}
                  className="font-mono-token px-5 py-4 text-[10.5px] font-medium tracking-[0.12em] text-[var(--color-accent-2)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <motion.tr
                key={row.project}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
                className="group border-b border-white/[0.05] transition-colors last:border-0 hover:bg-[var(--color-accent)]/[0.05]"
              >
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-2 text-[0.98rem] font-semibold text-[var(--color-ink)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)] transition-transform duration-300 group-hover:scale-150" />
                    {row.project}
                  </span>
                </td>
                <td className="px-5 py-4 text-[0.9rem] text-[var(--color-muted)]">
                  {row.domain}
                </td>
                <td className="font-mono-token px-5 py-4 text-[0.82rem] text-[var(--color-faint)]">
                  {row.stack}
                </td>
                <td className="px-5 py-4 text-[0.9rem] font-medium text-[var(--color-accent-2)]">
                  {row.result}
                </td>
                <td className="px-5 py-4 text-[0.88rem] text-[var(--color-muted)]">
                  {row.role}
                </td>
                <td className="font-mono-token px-5 py-4 text-[0.85rem] text-[var(--color-faint)]">
                  {row.year}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
