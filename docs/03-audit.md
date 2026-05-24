# 03 — Quality Audit

Systematic audit of The Lookbook against accessibility, SEO, performance, and semantic HTML standards.

---

## 1. Missing Alt Text on Images

**Status: NEEDS VERIFICATION**

The spec requires `alt` on every image:

- `ImageItem` interface has a required `alt: string` field (DATA-MODEL.md:10).
- `ProjectCard` uses `project.coverImage.alt` for the image alt (COMPONENTS.md:80).
- `ImageGallery` wraps images in `<figure>` + `<figcaption>` (COMPONENTS.md:159).
- CONVENTIONS.md:131 says "Always use `next/image`, never `<img>`" — which enforces alt.

**However**, the `Hero.tsx` component has no explicit alt text requirement in its spec (COMPONENTS.md:45–55). If the hero uses a decorative background image with `fill`, it should use `alt=""` (empty alt) to tell screen readers to skip it. If it's a meaningful image, it needs descriptive alt text.

**Recommendation:** Add a note in COMPONENTS.md:54 that decorative hero images must use `alt=""`, and informative ones must use a meaningful description. Verify in implementation.

---

## 2. Semantic HTML Correctness

**Status: MOSTLY CORRECT, one gap**

| Element | Spec'd? | Notes |
|---|---|---|
| `<nav aria-label="Main navigation">` | Yes (COMPONENTS.md:27) | Correct |
| `aria-current="page"` on active link | Yes (COMPONENTS.md:29) | Correct — tells SR "this is where you are" |
| `<figure>` + `<figcaption>` for gallery | Yes (COMPONENTS.md:159) | Correct |
| `role="tablist"` / `role="tab"` for sub-nav | Yes (COMPONENTS.md:136–138) | Correct — but COMPONENTS.md:138 also suggests `<nav>` with `<a>` as simpler alternative |
| `<Link>` for internal navigation | Yes (ROUTING.md:135) | Correct |
| `<main>` in root layout | Yes (ARCHITECTURE.md:24) | Correct — landmark for screen readers |

**Gap:** The `Footer` component spec (COMPONENTS.md:38–41) doesn't mention using `<nav>` or landmark roles for its secondary navigation links. Footer links should be wrapped in `<nav aria-label="Footer navigation">` or `<nav aria-label="Secondary">`.

**Recommendation:** Add `<nav aria-label="Footer navigation">` to Footer spec. Update COMPONENTS.md:39.

---

## 3. Accessibility of the Nav (Keyboard + Screen Reader)

**Status: MOSTLY CORRECT, one risk**

**Keyboard:**
- All links use `<Link>` from `next/link` → natively focusable (ROUTING.md:135).
- BUILD-ORDER.md:110 explicitly calls out "Tab through entire page, all interactive elements focusable."
- Focus rings specified as `focus-visible:ring-2 focus-visible:ring-accent` (STYLING.md:191).
- "Never remove outline from focused elements without providing an alternative" (STYLING.md:192).

**Screen Reader:**
- Nav has `aria-label="Main navigation"` (COMPONENTS.md:27) — distinguishes it from other navs.
- Active link gets `aria-current="page"` (COMPONENTS.md:29) — tells SR which page is current.
- Logo link has `aria-label="The Lookbook — home"` (COMPONENTS.md:28) — meaningful link text.
- Social links in footer require `aria-label` per icon (COMPONENTS.md:41) — prevents "link, link, link."

**Risk:** The `ProjectsSubNav` (COMPONENTS.md:120–138) offers two approaches: `role="tablist"` (complex ARIA) or `<nav>` with `<a>` (simpler). If the `role="tablist"` approach is chosen without proper keyboard handling (arrow keys for tab switching), it could be *less* accessible than plain links. The `<nav>` + `<a>` approach is simpler and robust.

**Recommendation:** Default to the `<nav>` + `<a>` approach for ProjectsSubNav. Only use `role="tablist"` if arrow-key navigation is implemented.

---

## 4. Completeness of SEO Metadata

**Status: COMPLETE per spec**

| Requirement | Root layout | Home | About | Projects | [slug] |
|---|---|---|---|---|---|
| `title` (with template) | `default: 'The Lookbook'` | Override exact | `'About'` | `'Projects'` | Dynamic from project |
| `description` | `'A curated portfolio...'` | `'Selected work...'` | `'[Creator] is a designer...'` | `'A full archive...'` | `project.tagline` |
| `openGraph` | type, siteName, image | Inherited | title, description, image | Inherited | title, description, image |
| `twitter:card` | `summary_large_image` | Inherited | Inherited | Inherited | `summary_large_image` |
| `robots` | index + follow | Inherited | Inherited | Inherited | Inherited |
| `metadataBase` | Set to `https://thelookbook.co` | — | — | — | — |

**Line refs:** METADATA.md:16–47 (root), METADATA.md:53–58 (home), METADATA.md:63–73 (about), METADATA.md:79–84 (projects), METADATA.md:97–128 (slug).

**Concern:** `robots` is set to `{ index: true, follow: true }` in root (METADATA.md:41–45) but the checklist (METADATA.md:158) says "`robots` not blocking indexing in production." During development, should consider `{ index: false }` to prevent staging URLs from appearing in search results. The spec doesn't mention an environment check.

**Recommendation:** Use `process.env.NODE_ENV === 'production' ? { index: true, follow: true } : { index: false }` for the root metadata robots field.

---

## 5. Page Speed Implications of Image Strategy

**Status: GOOD with one caveat**

**What's done right:**
- `next/image` everywhere — automatic format negotiation (WebP/AVIF), lazy loading by default (CONVENTIONS.md:103–128).
- `priority` prop on above-the-fold images (ARCHITECTURE.md:95).
- `placeholder="blur"` with `blurDataURL` for project detail images (ARCHITECTURE.md:96).
- Explicit `width` and `height` on all images — zero CLS (ARCHITECTURE.md:97).
- Hero uses `fill` with `priority` for immediate LCP paint (COMPONENTS.md:53).

**Caveat:** The Unsplash remote pattern `remotePatterns` in `next.config.mjs` (ARCHITECTURE.md:93) is required for `next/image` to work with external URLs, but:
- Each image request still hits Unsplash's CDN — no local caching.
- `blurDataURL` needs a base64-encoded blurhash or a separate tiny image. If generated manually for 8 projects × 3–6 images each, that's 24–48 base64 strings to maintain. The spec doesn't mention how these are generated.
- 8 gallery images each (DATA-MODEL.md:29) at `w=1200&h=800` are large payloads. Only the first one should be visible above the fold.

**Recommendation:** 
1. Generate `blurDataURL` values programmatically with a build-time script, or use Next.js 15's built-in `placeholder="blur"` with local images.
2. Downstream gallery images should use `loading="lazy"` (default) — verify the gallery component doesn't accidentally override this with `priority`.
3. Add `sizes` attributes to responsive images for better bandwidth use.

---

## 6. Cumulative Layout Shift on the Hero Section

**Status: LOW RISK if implemented correctly**

**What prevents CLS:**
- Hero background image uses `next/image` with `fill` — requires a wrapping element with `position: relative` and explicit aspect ratio (CONVENTIONS.md:120–128).
- `priority` on the hero image (ARCHITECTURE.md:95) — forces immediate load, no layout shift from lazy load.

**What could cause CLS:**
1. If `Hero.tsx` doesn't set explicit dimensions on the container (`height: 100vh` or `aspect-ratio`).
2. If fonts (Playfair Display, DM Sans) load after the text renders, causing FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text).

**Font handling:**
- `next/font/google` is used with `display: 'swap'` (STYLING.md:49–60) — this shows a fallback font immediately and swaps to the real font when loaded. This prevents invisible text but can cause a layout shift if the fallback and real font have different metrics.

**Recommendation:**
1. Ensure the hero container has a fixed height (e.g., `h-[90vh] min-h-[600px]`) rather than relying on content height.
2. Consider using `display: 'optional'` instead of `display: 'swap'` for body text to avoid the swap if the network is slow (font is optional, not critical).
3. Add `size-adjust` font fallback metrics (CSS `@font-face` descriptor) or use Next.js 15's `adjustFontFallback` to minimise layout shift during font swap.

---

## Summary

| Issue | Severity | Action |
|---|---|---|
| Hero alt text unspecified | Medium | Add `alt=""` or meaningful alt to Hero spec |
| Footer nav no landmark | Low | Add `<nav aria-label="Footer navigation">` |
| ProjectsSubNav tab ARIA risk | Medium | Prefer `<nav>` + `<a>` approach |
| robots not environment-aware | Low | Add dev/production conditional |
| blurDataURL generation vague | Low | Document build-time generation script |
| Gallery image sizes missing | Low | Add `sizes` attribute to gallery |
| Hero container height | Medium | Add explicit min-height to hero spec |
| Font swap CLS | Low | Consider `adjustFontFallback` or `display: optional` |
