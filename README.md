# Portfolio

A personal portfolio site — projects with case studies, a blog, and a working
contact form.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and MDX.

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

No environment variables are needed to run locally. The contact form works
straight away — without an API key it logs submissions to the terminal
instead of emailing them.

Other commands:

```bash
npm run build   # production build; fails on any type error
npm start       # serve the production build
npm run lint
```

---

## Filling in your content

Everything you need to change lives in `content/`. You should not have to
touch a component to update the site.

| File | What it controls |
| --- | --- |
| `content/profile.ts` | Name, role, tagline, bio, location, email, socials, skills, site URL |
| `content/experience.ts` | The "Where I've worked" timeline |
| `content/education.ts` | The "How I got here" timeline |
| `content/projects/_meta.ts` | Project cards: titles, summaries, stack, links, ordering |
| `content/projects/*.mdx` | The case study for each project |
| `content/blog/*.mdx` | Blog posts |

Each one is typed against `lib/content-types.ts`, so if you misspell a field
or leave a required one out, `npm run build` tells you exactly where — it
never ships as a blank space on the live site.

**Start with `content/profile.ts`.** Every `TODO` in it is something only you
can fill in.

### Adding a project

1. Add an entry to the `projects` array in `content/projects/_meta.ts`.
   Its position in the array is its position on the site.
2. Create `content/projects/<slug>.mdx` — the filename must match the `slug`
   exactly, or the build fails.
3. Optionally drop a cover image in `public/images/projects/` and point
   `cover` at it. Set `coverAlt` whenever you set `cover`.

With `cover: null` the card falls back to a typographic panel, which looks
deliberate rather than broken — so you can ship before you have screenshots.

Set `featured: true` to show a project on the home page. Everything appears
on `/projects` either way.

### Adding a blog post

Create `content/blog/<slug>.mdx`. The filename becomes the URL.

```md
---
title: "Your post title"
date: "2026-09-23"
summary: "One or two sentences, shown on the listing page and in search results."
tags: ["Next.js", "CSS"]
draft: true
---
```

`title` and `date` are required. `draft: true` keeps a post visible in
`npm run dev` and hides it from the production build, so you can leave
unfinished writing in the repository.

Code blocks are highlighted at build time. Add line numbers in braces to
highlight lines:

````md
```ts {2,5-7}
// highlighted lines 2, 5, 6 and 7
```
````

`content/blog/hello-world.mdx` is a sample post that shows every element the
prose styles cover. Delete it once you have written something real.

---

## Design

Colour, type scale and spacing are defined once at the top of
`app/globals.css`. Change them there and the whole site follows.

- **Palette** is declared as plain custom properties on `:root`, then mapped
  into Tailwind utilities *by reference* in `@theme inline` — which is why
  `bg-bg` and `text-fg` follow the theme switch with no extra work.
- **Dark mode** is three-state: system preference by default, overridden by
  an explicit choice from the toggle, remembered in `localStorage`. An inline
  script in `components/theme-script.tsx` applies the stored choice before
  first paint, so there is no flash.
- **Type** uses `clamp()` rather than breakpoints, so headings scale smoothly
  between phone and desktop instead of jumping.
- **Fonts** are Instrument Serif (display), Inter (body) and JetBrains Mono
  (code), self-hosted by `next/font` — no request to Google at runtime.

### A note on motion

`components/reveal.tsx` fades sections in as you scroll. The *unanimated*
state is the visible one: the server renders plain, and JavaScript only opts
elements in to animating after mount. If scripts are slow or blocked the page
still reads normally — the failure mode is "no animation", never "invisible
content". It also respects `prefers-reduced-motion`.

---

## Contact form

`components/contact-form.tsx` posts to `app/api/contact/route.ts`, which:

- validates with the shared schema in `lib/contact-schema.ts`
- silently accepts and discards submissions that fill the hidden honeypot
- rate-limits to 5 messages per IP per 10 minutes
- sends via [Resend](https://resend.com), or logs to the console if no API
  key is set

Validation runs on the server only, and the messages shown under each field
are the ones the server returns — one source of truth, and about 90 KB less
JavaScript for every visitor.

### Sending real email

1. Create a free Resend account (no card required) and generate an API key.
2. `cp .env.example .env.local` and set `RESEND_API_KEY`.
3. Set `CONTACT_TO_EMAIL` if you want enquiries somewhere other than the
   `email` in `content/profile.ts`.
4. To send from your own domain, verify it with Resend and set
   `CONTACT_FROM_EMAIL` to an address on it. Until then the shared
   `onboarding@resend.dev` sender is used, which only delivers to the email
   on your Resend account.

`.env.local` is gitignored. Never commit real keys.

---

## Deploying

The site is static apart from the contact endpoint, so it hosts anywhere that
runs Next.js. On Vercel:

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the defaults are
   correct, no configuration needed.
3. Add `RESEND_API_KEY` (and any other variables) under
   **Settings → Environment Variables**, then redeploy.

**You do not need to set a site URL.** Canonical tags, Open Graph tags,
`sitemap.xml` and `rss.xml` read the project's production domain from
Vercel automatically, so they are correct from the first deploy. If you
later put a custom domain in front, set `NEXT_PUBLIC_SITE_URL` to it —
`lib/site-url.ts` explains the order these are resolved in.

---

## What's where

```
app/
  layout.tsx            Fonts, metadata, header/footer, skip link
  page.tsx              Home: hero, work, about, experience, education, contact
  projects/             Project index and case-study pages
  blog/                 Post listing and post pages
  api/contact/          Contact form endpoint
  opengraph-image.tsx   Social share card, generated at build
  sitemap.ts robots.ts  Generated from the content files
  rss.xml/
components/             UI, all typed, client components marked "use client"
content/                Everything you edit — see the table above
lib/
  content-types.ts      The shapes content is checked against
  mdx.ts                Shared MDX pipeline for blog and case studies
  contact-schema.ts     Validation rules for the contact form
```

---

## Quality

Verified on the production build:

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 99 | 100 | 100 | 100 |
| Case study | 96 | 100 | 100 | 100 |
| Blog post | 96 | 100 | 100 | 100 |

Also checked: no horizontal scroll at 375 / 768 / 1440px, a visible focus ring
on every keyboard stop, headings in order, alt text on every image, and all
text at 4.5:1 contrast or better in both themes.
