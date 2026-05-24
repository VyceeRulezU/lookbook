# 01 — How App Router Works (ELI7)

> Commit message: `stage 1: raw generation`

This doc walks through the Next.js App Router mechanics in The Lookbook, one concept at a time.

---

## 1. Layouts wrap pages like Russian dolls

**File:** `app/layout.tsx` (ARCHITECTURE.md:20–28)

The root layout is the outermost shell. It renders the `<html>`, `<body>`, `<Header />`, `<Footer />`, and a `<main>{children}</main>` slot.

```tsx
// app/layout.tsx (simplified)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**ELI7:** Imagine a gift box. The root layout is the wrapping paper. Every page on the website goes inside `<main>{children}</main>`. The Header and Footer stay on the outside so they show on every page.

---

## 2. Pages are the inner content

**Files:**
- `app/page.tsx` → `/` (ARCHITECTURE.md:7)
- `app/about/page.tsx` → `/about` (ARCHITECTURE.md:8)
- `app/projects/page.tsx` → `/projects` (ARCHITECTURE.md:9)

Each `page.tsx` exports a React component. Next.js puts that component where `{children}` goes in the nearest parent layout.

**ELI7:** The root layout is the frame of a house — roof, walls, floor. Each page is the furniture inside. You can change the furniture (page) without rebuilding the walls (layout).

---

## 3. Nested layouts add extra layers

**File:** `app/projects/layout.tsx` (ARCHITECTURE.md:29–34)

The projects directory has its *own* layout file. It adds a `<ProjectsSubNav />` above `{children}`:

```tsx
// app/projects/layout.tsx
export default function ProjectsLayout({ children }) {
  return (
    <>
      <ProjectsSubNav />
      {children}
    </>
  );
}
```

This layout wraps **both** `/projects` and `/projects/[slug]` because they share the same segment in the URL tree.

**ELI7:** If the root layout is the whole house, the projects layout is a room inside it. The room has its own furniture (ProjectsSubNav) on top of whatever page is showing. Whether you're on the project list or a single project, the same sub-nav stays there.

**Composition chain (ROUTING.md:9–22):**

```
RootLayout            ← wraps EVERYTHING
  ├── / (page.tsx)    ← no projects layout for home
  ├── /about          ← no projects layout for about
  └── ProjectsLayout  ← only for /projects and /projects/[slug]
        ├── /projects           → projects/page.tsx
        └── /projects/[slug]    → projects/[slug]/page.tsx
```

---

## 4. Dynamic segments make URLs from data

**File:** `app/projects/[slug]/page.tsx` (ARCHITECTURE.md:39–56)

The `[slug]` folder is a **dynamic segment**. The square brackets mean "match any value here in the URL."

When a user visits `/projects/vessel-brand-identity`, Next.js passes `{ params: { slug: 'vessel-brand-identity' } }` to the page component.

**ELI7:** `[slug]` is like a bucket that catches whatever word you put in the URL. If the URL is `/projects/vessel-brand-identity`, the slug bucket catches `vessel-brand-identity`. If the URL is `/projects/forma-app`, the slug bucket catches `forma-app`.

---

## 5. `generateStaticParams` makes dynamic routes static

**File:** `app/projects/[slug]/page.tsx` (ARCHITECTURE.md:42–50)

```ts
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
```

This function tells Next.js: "At build time, look at all 8 projects. Pre-render an HTML file for each slug."

Result at `npm run build`:
```
/projects/vessel-brand-identity  →  pre-rendered HTML
/projects/forma-app              →  pre-rendered HTML
/projects/northlight-annual-report → pre-rendered HTML
... (5 more)
```

**ELI7:** Imagine you're baking cookies. `generateStaticParams` is a recipe that says "bake 8 cookies, one for each project." By the time the oven (build) is done, all 8 cookies (HTML pages) are ready. When someone visits, they grab a cookie instantly — no baking needed.

---

## 6. `dynamicParams = false` blocks unknown slugs

**File:** `app/projects/[slug]/page.tsx` (ARCHITECTURE.md:52–56)

```ts
export const dynamicParams = false;
```

This means: "Only accept slugs that were returned by `generateStaticParams`. Any other slug returns a 404 immediately."

**ELI7:** The bakery only baked 8 cookies. If someone asks for a 9th flavour that doesn't exist, the baker doesn't try to make a new one — they just say "404 — we don't have that."

---

## 7. `loading.tsx` shows a skeleton while the page loads

**Files:**
- `app/projects/loading.tsx` (ROUTING.md:35–47)
- `app/projects/[slug]/loading.tsx`

Each `loading.tsx` is automatically wrapped in a `<Suspense>` boundary by Next.js. When the page is still resolving (fetching data, etc.), the loading file renders instead.

```tsx
// app/projects/loading.tsx
import LoadingSpinner from '@/components/LoadingSpinner';
export default function Loading() {
  return <LoadingSpinner variant="grid" />;
}
```

**Where they sit:**

| loading.tsx Location | Shows when you navigate to |
|---|---|
| `app/projects/loading.tsx` | `/projects` |
| `app/projects/[slug]/loading.tsx` | `/projects/vessel-brand-identity` |

**ELI7:** `loading.tsx` is a "page coming soon" sign. While the real page is getting ready, a skeleton (grey rectangle shapes that shimmer) shows up so the page doesn't feel empty or broken.

---

## 8. `error.tsx` catches crashes

**Files:**
- `app/projects/error.tsx` (ROUTING.md:51–79)
- `app/projects/[slug]/error.tsx`

If a page throws an error at runtime, the nearest `error.tsx` renders instead. It receives `{ error, reset }` props so you can show the error message and a "Try again" button.

**MUST be a Client Component** (`'use client'` at the top).

```tsx
'use client';
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

**ELI7:** `error.tsx` is a safety net under a trapeze. If the page falls (crashes), the safety net catches it and shows a friendly "oops, try again" message instead of a blank white screen.

---

## 9. `not-found.tsx` handles missing content

**Files:**
- `app/not-found.tsx` — global 404 (ROUTING.md:100–103)
- `app/projects/not-found.tsx` — slug-specific 404

Triggered by calling `notFound()` from `next/navigation` inside a page:

```tsx
// app/projects/[slug]/page.tsx
const project = getProjectBySlug(params.slug);
if (!project) notFound();   // ← shows app/projects/not-found.tsx
```

**ELI7:** `not-found.tsx` is the "we looked everywhere, couldn't find it" page. If someone types a wrong URL or the data doesn't have what they asked for, Next.js shows this polite apology instead of a broken page.

---

## 10. Full request flow

Here's what happens when a user visits `/projects/forma-app`:

1. **RootLayout** renders its shell (Header, Footer, `<main>`).
2. **ProjectsLayout** renders inside `<main>`, adding `<ProjectsSubNav />`.
3. Next.js looks at the slug `forma-app`.
4. Because of `generateStaticParams`, the HTML for `forma-app` was pre-built.
5. Inside `<ProjectsLayout>{children}</ProjectsLayout>`, the pre-built page content renders.
6. If there's a loading delay, `app/projects/[slug]/loading.tsx` shows first.
7. If the page crashes, `app/projects/[slug]/error.tsx` catches it.
8. If the slug doesn't exist, `notFound()` triggers `app/projects/not-found.tsx`.

**ELI7:** When someone walks into the `/projects/forma-app` room, the house frame (RootLayout) is already there, the room furniture (ProjectsLayout) is already there, and the specific cookie on the plate (the page content) was baked during construction. All the visitor has to do is look at it — everything is ready before they arrive.

---

## Summary Table

| Concept | File/Folder | What it does |
|---|---|---|
| Root layout | `app/layout.tsx` | Shell: html, body, Header, Footer |
| Nested layout | `app/projects/layout.tsx` | Adds ProjectsSubNav under root |
| Static page | `app/page.tsx` | SSG — built at `npm run build` |
| Dynamic segment | `app/projects/[slug]/` | Catches any URL segment |
| Static params | `generateStaticParams()` | Pre-renders 8 slug pages |
| dynamicParams=false | `export const dynamicParams = false` | Blocks unknown slugs |
| Loading | `app/projects/loading.tsx` | Skeleton while page resolves |
| Error | `app/projects/error.tsx` | Catches crashes, has retry button |
| Not found | `app/projects/not-found.tsx` | Shown when `notFound()` called |
| Global not found | `app/not-found.tsx` | 404 for unmatched routes |
