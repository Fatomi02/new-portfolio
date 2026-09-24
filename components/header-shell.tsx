"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Gives the header a border and a stronger blur only once the page has
 * scrolled, so at the top it sits flush on the paper and gains weight as
 * content passes beneath it.
 *
 * The scroll state is written straight to the DOM as a data attribute
 * rather than held in React state: this fires on every scroll frame, and
 * re-rendering the header tree that often would be wasteful. The listener
 * is passive so it never blocks scrolling.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      element.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };

    update();
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      data-scrolled="false"
      className="site-header sticky top-0 z-40"
    >
      {children}
    </header>
  );
}
