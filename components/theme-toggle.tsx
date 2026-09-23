"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/** Fired when this component changes the theme, so the label re-reads it. */
const THEME_CHANGE = "themechange";

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  window.addEventListener(THEME_CHANGE, onChange);

  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(THEME_CHANGE, onChange);
  };
}

/**
 * The theme is owned by the DOM, not by React — the inline script in
 * <ThemeScript /> sets it before the first paint. So it is read as
 * external state rather than mirrored into a useState.
 */
function getSnapshot(): Theme {
  const attribute = document.documentElement.getAttribute("data-theme");
  if (attribute === "light" || attribute === "dark") return attribute;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** The server cannot know; only the button's label depends on this. */
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);

    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or blocked storage — the choice just won't persist
    }

    window.dispatchEvent(new Event(THEME_CHANGE));
  }

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="text-muted hover:text-fg hover:border-line -mr-2 grid size-9 place-items-center rounded-full border border-transparent transition-colors"
    >
      {/* Which icon shows is decided in CSS by the same tri-state rules as
          the palette, so it is correct on the very first paint — no
          hydration flicker, and no JS needed to get it right. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="theme-icon-dark col-start-1 row-start-1 size-[18px]"
      >
        <circle cx="12" cy="12" r="4.25" />
        <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7L5.3 5.3" />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-icon-light col-start-1 row-start-1 size-[18px]"
      >
        <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />
      </svg>
    </button>
  );
}
