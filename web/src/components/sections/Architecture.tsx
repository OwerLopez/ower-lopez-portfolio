"use client";

import type { ArchitectureContent } from "@/types/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DataArchitecture } from "@/components/animations/DataArchitecture";

export function Architecture({ content }: { content: ArchitectureContent }) {
  return (
    <section
      id="architecture"
      className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-32"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Eyebrow className="justify-center mb-4">{content.eyebrow}</Eyebrow>
        <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.05] mb-4">
          {content.heading}
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg">
          {content.description}
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <DataArchitecture content={content} />
      </div>
    </section>
  );
}
