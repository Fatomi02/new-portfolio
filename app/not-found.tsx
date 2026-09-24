import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-muted/40 text-[6rem] leading-none sm:text-[9rem]">
          404
        </p>
        <h1 className="font-display text-h1 mt-2">
          This page doesn&rsquo;t exist
        </h1>
        <p className="text-muted text-lead mx-auto mt-5 max-w-[40ch]">
          The link may be out of date, or the page may have moved.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back home
          </Link>
          <Link href="/projects" className="btn btn-secondary">
            See the work
          </Link>
        </div>
      </div>
    </div>
  );
}
