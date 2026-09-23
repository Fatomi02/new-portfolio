/**
 * Applies a previously chosen theme before the browser paints.
 *
 * Without this the page renders in the system theme for one frame and
 * then snaps to the stored choice — the classic dark-mode flash. The
 * script is deliberately tiny and synchronous so it runs ahead of paint.
 *
 * No attribute is set when the visitor has never used the toggle, which
 * leaves the `prefers-color-scheme` rules in globals.css in charge.
 */
const script = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
