import { Fragment } from "react";
import Link from "next/link";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="container-page pt-16 pb-4 sm:pt-24 md:pt-32">
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
        <Link
          href="/projects"
          className="bg-fg text-bg rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
        >
          View work
        </Link>

        <Link
          href="/#contact"
          className="border-line hover:border-fg rounded-full border px-6 py-3 text-sm font-medium transition-colors"
        >
          Get in touch
        </Link>

        {profile.resumeUrl && (
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted hover:text-fg px-2 py-3 text-sm transition-colors"
          >
            Download CV
          </a>
        )}
      </div>
    </section>
  );
}
