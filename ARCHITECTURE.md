# ARCHITECTURE.md

## Route Table

| URL | File | Rendering | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | SSG | Static at build time |
| `/about` | `app/about/page.tsx` | SSG | Static at build time |
| `/projects` | `app/projects/page.tsx` | SSG | Can add search params for filter |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | SSG via `generateStaticParams` | One page per project slug |
| `*` (unmatched) | `app/not-found.tsx` | Static | Global catch-all |

No server-side dynamic routes needed — all data is static mock data.  
When you swap to a real CMS, `/projects/[slug]` becomes ISR with `revalidate: 60`.

---

## Layout Tree

```
RootLayout (app/layout.tsx)
  └── <html lang="en">
        <body>
          <Header />           ← sticky, shared across all routes
          <main>{children}</main>
          <Footer />
        </body>
        
        ↳ ProjectsLayout (app/projects/layout.tsx)
              <ProjectsSubNav />   ← only on /projects and /projects/[slug]
              {children}
```

`ProjectsLayout` is a **nested layout** — it wraps both the grid page and the detail page. This means the sub-nav persists when navigating between the grid and a project detail, which feels snappy and is architecturally correct.

---

## Static Generation

`app/projects/[slug]/page.tsx` must export:

```ts
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
```

This tells Next.js to pre-render one HTML file per slug at `npm run build`.  
Result: visiting `/projects/brand-identity-x` loads instantly — no server round-trip.

Also export `dynamicParams = false` to make unknown slugs return 404 instead of trying to render:

```ts
export const dynamicParams = false;
```

---

## Special Files Map

| File | Location | Trigger | Notes |
|---|---|---|---|
| `loading.tsx` | `app/projects/` | While `page.tsx` suspends | Renders `<LoadingSpinner />` skeleton |
| `loading.tsx` | `app/projects/[slug]/` | While detail page suspends | Full-page skeleton |
| `error.tsx` | `app/projects/` | Uncaught error in grid | **Must be a Client Component** (`'use client'`) |
| `error.tsx` | `app/projects/[slug]/` | Uncaught error in detail | **Must be a Client Component** |
| `not-found.tsx` | `app/projects/` | `notFound()` called in slug page | Shown when slug not in data |
| `not-found.tsx` | `app/` (root) | `notFound()` or unmatched URL | Global 404 fallback |
| `global-error.tsx` | `app/` | Error in root layout itself | Replaces the entire document |

`error.tsx` components receive `{ error: Error, reset: () => void }` props.  
Always include a "Try again" button that calls `reset()`.

`global-error.tsx` must render its own `<html>` and `<body>` tags because root layout is unavailable when it fires.

---

## Metadata Strategy

Every page exports a `metadata` object or a `generateMetadata` function.

**Static pages** (home, about, projects index) use the exported `metadata` const.  
**Dynamic pages** (`[slug]`) use `generateMetadata({ params })` to pull title and description from the project data.

See [METADATA.md](./METADATA.md) for full spec and OpenGraph image strategy.

---

## Image Strategy

All project images reference Unsplash URLs configured in `next.config.mjs` under `images.remotePatterns`.  

Use `next/image` everywhere:
- `priority` prop on hero and above-the-fold card images
- `placeholder="blur"` with a `blurDataURL` on project detail images
- Explicit `width` and `height` on all images — no layout shift

---

## Performance Targets

| Metric | Target | Approach |
|---|---|---|
| LCP | < 2.5s | SSG + `priority` on hero image |
| CLS | 0 | Explicit image dimensions everywhere |
| FID / INP | < 100ms | Minimal client JS (RSC default) |
| TTFB | < 200ms | Static files served from CDN edge |

---

## When to Go Dynamic (future)

| Need | Change |
|---|---|
| CMS-driven content | `generateMetadata` + `generateStaticParams` already in place; swap `lib/projects.ts` for fetch call |
| Search / filter with URL params | Add `searchParams` to `/projects/page.tsx`, keep SSG or switch to SSR |
| Contact form | Add a route handler `app/api/contact/route.ts` |
| Auth-gated work | Wrap `[slug]/page.tsx` in a middleware check |
