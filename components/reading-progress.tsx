"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline progress bar across the top of a long-form page.
 *
 * Like the header's scroll state, the value is written straight to the
 * DOM rather than held in React state — this updates on every scroll
 * frame, and re-rendering for it would be wasteful. Transform is used
 * rather than width so the browser can keep it on the compositor.
 *
 * Purely decorative: it is hidden from assistive tech, and it is not
 * rendered at all for visitors who have asked for reduced motion, for
 * whom a bar tracking the scroll is more distraction than information.
 */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.remove();
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      element.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    update();
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px"
    >
      <div
        ref={ref}
        className="bg-accent h-full origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
