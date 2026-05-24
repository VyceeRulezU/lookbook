# 06 — Lie Detector

Five statements about how App Router structures The Lookbook. Four are true. One is false.

---

## Statements

**A.** The root layout (`app/layout.tsx`) wraps the projects layout (`app/projects/layout.tsx`), which wraps both the grid page and the detail page.

**B.** `error.tsx` files catch errors thrown during rendering and must be Server Components because they handle error logic.

**C.** `dynamicParams = false` in `app/projects/[slug]/page.tsx` means any slug not returned by `generateStaticParams()` returns a 404 immediately without a server render attempt.

**D.** A `loading.tsx` file in `app/projects/` auto-creates a Suspense boundary around `app/projects/page.tsx`, showing a skeleton while the page resolves.

**E.** The `<ProjectsSubNav />` component is in `app/projects/layout.tsx`, so it appears on both `/projects` and `/projects/[slug]` pages.

---

## Investigation

### Statement A — TRUE

The layout nesting tree is:
```
RootLayout
  └── ProjectsLayout  ← wraps /projects and /projects/[slug]
```

Confirmation: ARCHITECTURE.md:20–34 shows the layout tree. ROUTING.md:9–22 describes the same nesting.

### Statement B — FALSE (the lie)

`error.tsx` files **must be Client Components** (`'use client'`), not Server Components. They need `useState`/`useEffect` for the `reset()` callback and error state. The statement says they "must be Server Components" — this is backwards.

Confirmation: COMPONENTS.md:3 ("Components are Server Components by default unless they need client-side interactivity") — error.tsx needs interactivity. ROUTING.md:53: "Must be a Client Component." ROUTING.md:55 shows `'use client'` at the top. CONVENTIONS.md:96: "`error.tsx` must be a Client Component with `'use client'` at top."

### Statement C — TRUE

Confirmation: ARCHITECTURE.md:52–56 explains that `dynamicParams = false` makes unknown slugs 404 "instead of trying to render." ROUTING.md:198–206: "any slug not returned by `generateStaticParams()` will 404 immediately at the CDN level — no server hit."

### Statement D — TRUE

Confirmation: ROUTING.md:28–30: "Next.js automatically wraps the `page.tsx` in a `<Suspense>` boundary and shows `loading.tsx` while the page resolves." The file `app/projects/loading.tsx` (ROUTING.md:42–47) renders `<LoadingSpinner variant="grid" />` as the skeleton.

### Statement E — TRUE

Confirmation: ARCHITECTURE.md:29–34: "`ProjectsLayout` is a **nested layout** — it wraps both the grid page and the detail page." The sub-nav is part of this layout, so it persists across both routes. ROUTING.md:22: "the sub-nav appears on both the grid page and the detail page."

---

## The Lie: Statement B

> `error.tsx` files catch errors thrown during rendering and must be Server Components because they handle error logic.

**False.** `error.tsx` must be a **Client Component** (with `'use client'`), not a Server Component. It needs React hooks (`useState` for error display, `useEffect` for logging, `onClick` for the reset button) — all of which require the browser runtime.

---

## Proof Table

| Statement | Verdict | Proof |
|---|---|---|
| A | TRUE | ARCHITECTURE.md:20–34, ROUTING.md:9–22 |
| B | **FALSE** | ROUTING.md:53 "Must be a Client Component", ROUTING.md:55 `'use client'`, CONVENTIONS.md:96 |
| C | TRUE | ARCHITECTURE.md:52–56, ROUTING.md:198–206 |
| D | TRUE | ROUTING.md:28–30, ROUTING.md:42–47 |
| E | TRUE | ARCHITECTURE.md:29–34, ROUTING.md:22 |
