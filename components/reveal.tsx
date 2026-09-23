"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before starting — use to stagger siblings */
  delay?: number;
  className?: string;
}

/**
 * Fades and lifts its children into view the first time they are scrolled to.
 *
 * The important property here is that the *unanimated* state is the visible
 * one. The server renders a plain div with no opacity, and only after mount
 * does JavaScript opt an element in to animating. So if scripts are slow,
 * blocked or broken, the page still reads normally — the failure mode is
 * "no animation", never "invisible content".
 *
 * It also means:
 *   - `prefers-reduced-motion` simply returns early, leaving content visible
 *   - anything already on screen at mount is left alone, so there is no
 *     flash of hidden content above the fold
 *   - the effect only touches the DOM, so there is no cascading re-render
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen — showing it and then animating it in would read
    // as a flicker, so leave it as it is.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    element.dataset.reveal = "pending";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        element.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
