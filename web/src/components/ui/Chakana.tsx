/**
 * Chakana (cruz andina escalonada) — motivo cultural peruano dibujado sobre
 * una grilla 7×7. Decorativo; se usa como acento discreto. `spin` la hace
 * girar muy lentamente (desactivado por reduced-motion vía CSS global).
 */
const GRID = [
  ". . # # # . .",
  ". . # . # . .",
  "# # # . # # #",
  "# . . . . . #",
  "# # # . # # #",
  ". . # . # . .",
  ". . # # # . .",
].map((row) => row.split(" "));

const CELL = 100 / 7;

export function Chakana({
  className,
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      style={spin ? { animation: "var(--animate-spin-slow)" } : undefined}
    >
      {GRID.flatMap((row, y) =>
        row.map((cell, x) =>
          cell === "#" ? (
            <rect
              key={`${x}-${y}`}
              x={x * CELL + 0.6}
              y={y * CELL + 0.6}
              width={CELL - 1.2}
              height={CELL - 1.2}
              rx={1.6}
              fill="currentColor"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
