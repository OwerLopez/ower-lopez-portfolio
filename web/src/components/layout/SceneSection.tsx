import type { ReactNode } from "react";

/**
 * Envoltura de contenido para una escena del deck.
 *
 * Las secciones originales ya traen su propio `max-w-6xl` + `px-5` +
 * paddings verticales (`py-28` / `pt-24 pb-32`), así que este componente
 * solo asegura centrado vertical y evita doble wrapper. Se usa cuando la
 * escena contiene UNA sola sección; para combinaciones (Hero+Marquee,
 * Contact+Footer) se usa `SceneShell` directamente.
 */
export function SceneSection({ children }: { children: ReactNode }) {
  return <div className="flex min-h-full flex-col justify-center">{children}</div>;
}
