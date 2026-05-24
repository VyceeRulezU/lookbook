# METADATA.md

## Strategy Overview

Next.js 15 Metadata API handles all SEO and social-sharing needs without a third-party library. Two patterns are used:

- **`export const metadata`** — static pages where all values are known at build time
- **`export async function generateMetadata({ params })`** — dynamic pages where values come from data

---

## Root Layout Defaults (`app/layout.tsx`)

The root layout sets site-wide defaults that all pages inherit and can override:

```ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://thelookbook.co'),  // required for absolute OG URLs
  title: {
    default: 'The Lookbook',
    template: '%s — The Lookbook',   // e.g. "Vessel Brand Identity — The Lookbook"
  },
  description: 'A curated portfolio of digital and print work by [Creator Name].',
  openGraph: {
    type: 'website',
    siteName: 'The Lookbook',
    images: [
      {
        url: '/og-image.png',   // 1200×630, stored in /public
        width: 1200,
        height: 630,
        alt: 'The Lookbook — portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@handle',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

---

## Home Page (`app/page.tsx`)

```ts
export const metadata: Metadata = {
  title: 'The Lookbook',   // no template suffix on home — override with exact string
  description: 'Selected work in web, mobile, and print by [Creator Name].',
};
```

---

## About Page (`app/about/page.tsx`)

```ts
export const metadata: Metadata = {
  title: 'About',
  description: '[Creator Name] is a designer and developer based in [City].',
  openGraph: {
    title: 'About — The Lookbook',
    description: '[Creator Name] is a designer and developer based in [City].',
  },
};
```

---

## Projects Index (`app/projects/page.tsx`)

```ts
export const metadata: Metadata = {
  title: 'Projects',
  description: 'A full archive of web, mobile, and print projects.',
};
```

---

## Project Detail (`app/projects/[slug]/page.tsx`)

This uses `generateMetadata` to pull title and description from the project:

```ts
import type { Metadata } from 'next';
import { getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) notFound();  // triggers not-found.tsx

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — The Lookbook`,
      description: project.tagline,
      images: [
        {
          url: project.coverImage.src,
          width: project.coverImage.width,
          height: project.coverImage.height,
          alt: project.coverImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.tagline,
      images: [project.coverImage.src],
    },
  };
}
```

---

## OG Image (`/public/og-image.png`)

The default OG image used on all pages that don't have a project-specific cover.

**Spec:** 1200×630px, PNG, under 500KB  
**Content:** Site name + creator name + a representative visual (e.g., a collage of 3 project thumbnails)

**Optional:** Use `next/og` (ImageResponse API) to generate OG images dynamically at build time:

```
app/
  opengraph-image.tsx        ← default OG image (generated)
  projects/[slug]/
    opengraph-image.tsx      ← per-project OG image (generated from cover + title)
```

This is more complex but produces project-specific social cards automatically.

---

## Checklist per Page

- [ ] `title` set (inherits `template` from root)
- [ ] `description` under 160 characters
- [ ] `openGraph.images` set (falls back to root if omitted)
- [ ] `robots` not blocking indexing in production
- [ ] `metadataBase` set in root layout (required for relative OG image URLs to work)
