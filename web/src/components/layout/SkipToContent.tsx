/**
 * Accessibility: skip-to-content link — first focusable element in the page.
 * Visually hidden until focused via keyboard.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white opacity-0 transition-all duration-200 focus:translate-y-0 focus:opacity-100"
    >
      Skip to content
    </a>
  );
}
