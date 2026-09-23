import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="font-display text-h1 mt-4">This page doesn&rsquo;t exist</h1>
        <p className="text-muted text-lead mx-auto mt-5 max-w-[40ch]">
          The link may be out of date, or the page may have moved.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="bg-fg text-bg rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
          >
            Back home
          </Link>
          <Link
            href="/projects"
            className="border-line hover:border-fg rounded-full border px-6 py-3 text-sm font-medium transition-colors"
          >
            See the work
          </Link>
        </div>
      </div>
    </div>
  );
}
