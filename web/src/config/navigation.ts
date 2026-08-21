/**
 * Centralized navigation / section registry.
 *
 * Every component that needs to know "which sections exist" reads from here
 * instead of maintaining its own hardcoded list. The `contentKey` maps each
 * section to its label inside `PortfolioContent.nav`.
 */

export interface SectionDef {
  /** Unique identifier — used as the HTML `id` and scroll target. */
  id: string;
  /** Key into `NavContent` for the locale-aware label. */
  contentKey: "work" | "expertise" | "experience" | "about" | "contact";
}

/**
 * Ordered list of navigable sections (excludes Hero — it's always first).
 * The order here dictates navbar link order, footer nav, and scroll-spy sequence.
 */
export const sections: SectionDef[] = [
  { id: "work", contentKey: "work" },
  { id: "expertise", contentKey: "expertise" },
  { id: "experience", contentKey: "experience" },
  { id: "about", contentKey: "about" },
  { id: "contact", contentKey: "contact" },
] as const;
