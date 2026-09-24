import { Fragment } from "react";
import Link from "next/link";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-6 sm:pt-24 md:pt-32">
      {/*
        A soft warm halo behind the name. It is barely perceptible on its
        own — its job is to stop the top of the page reading as a flat
        rectangle of paper, and to pull the eye toward the headline.
        Decorative, so it is hidden from assistive tech and cannot be hit.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, var(--glow), transparent 70%)",
        }}
      />

      <div className="container-page relative">
        {profile.availableForWork && (
          <p className="border-line bg-raised text-muted mb-7 inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-3 text-xs shadow-[var(--shadow-sm)]">
            <span aria-hidden="true" className="relative flex size-1.5">
              {/* The ping is decoration; the dot underneath always shows,
                  so the badge still reads with animation suppressed. */}
              <span className="bg-accent absolute inline-flex size-full animate-ping rounded-full opacity-70 motion-reduce:hidden" />
              <span className="bg-accent relative inline-flex size-1.5 rounded-full" />
            </span>
            Available for work
          </p>
        )}

        <p className="eyebrow">
          {profile.role}
          <span aria-hidden="true" className="mx-2 opacity-50">
            ·
          </span>
          {profile.location}
        </p>

        {/*
          Each word is kept whole so a line can only break at a space.
          Without this a hyphenated name like "Abdul-Rahmon" breaks at its
          hyphen and splits across two lines.
        */}
        <h1 className="font-display text-display mt-5 max-w-[22ch]">
          {profile.name.split(" ").map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              {index > 0 && " "}
              <span className="whitespace-nowrap">{word}</span>
            </Fragment>
          ))}
        </h1>

        <p className="text-muted text-lead mt-7 max-w-[46ch]">
          {profile.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
          <Link href="/projects" className="btn btn-primary">
            View work
            <Arrow />
          </Link>

          <Link href="/#contact" className="btn btn-secondary">
            Get in touch
          </Link>

          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost"
            >
              <DownloadIcon />
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arrow size-3.5"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <path d="M8 2v8M4.5 7L8 10.5 11.5 7M2.5 13.5h11" />
    </svg>
  );
}
