# 04 — Cross-Check: Accessibility & Semantic Structure

This is a second-opinion review. I read the same markdown docs and focus specifically on **accessibility** and **semantic HTML structure** — the same areas covered in `03-audit.md`, but with fresh eyes.

---

## Process

I reviewed the following docs as if I were an accessibility auditor with no prior context:

- ARCHITECTURE.md (file tree, special files map)
- COMPONENTS.md (every component spec)
- ROUTING.md (layout nesting, special files)
- STYLING.md (colours, contrast, focus rings)
- CONVENTIONS.md (image usage, metadata rules)
- BUILD-ORDER.md (phase 9 polish checklist)

---

## Findings

### 1. Landmark Structure

**Root layout** (ARCHITECTURE.md:22–27):
```
<html>
  <body>
    <Header />
    <main>{children}</main>
    <Footer />
  </body>
</html>
```

This is clean. Screen readers get exactly three landmarks:
- `<header>` (implicit from `<Header />`)
- `<main>` (explicit)
- `<footer>` (implicit from `<Footer />`)

Rating: **PASS** — correct landmark structure, no redundant wrapping.

### 2. Header Nav — SR Experience

COMPONENTS.md:27 specifies `<nav aria-label="Main navigation">`. This ensures a screen reader user can jump directly to "Main navigation" landmark and distinguish it from the footer nav (which should get its own label).

COMPONENTS.md:29 specifies `aria-current="page"` on the active link. Screen readers announce "current page" when focused on that link.

Rating: **PASS** — but see cross-doc issue below.

### 3. Cross-Doc Gap: Footer Navigation

COMPONENTS.md:38–41 lists footer content but says nothing about a `<nav>` wrapper. The footer has "secondary nav: Projects, About, (optional) RSS" plus social links. Without a `<nav>` landmark, these links are just generic links inside `<footer>` — screen reader users can reach them but can't navigate to "footer navigation" efficiently.

Compare with the header, which explicitly gets `<nav aria-label="Main navigation">`.

Rating: **NEEDS FIX** — add `<nav aria-label="Footer navigation">` to COMPONENTS.md:39.

### 4. ProjectsSubNav — Tab vs Nav Pattern

COMPONENTS.md:136–138 offers two patterns:

> "Use `role="tablist"` + `role="tab"` + `aria-selected` / Or use `<nav>` with `<a>` tags if syncing to URL — simpler and more robust"

The second option (plain `<nav>` + `<a>`) is objectively more accessible:
- No ARIA required — native `<a>` elements are keyboard-focusable by default.
- Works without JavaScript — if JS fails, `<a>` tags still navigate.
- Screen readers navigate `<nav>` landmarks natively.
- No need for `aria-selected` management, arrow-key handlers, or `aria-controls`.

The `role="tablist"` pattern requires:
- Arrow key navigation within the tab list
- `aria-selected` toggling
- `aria-controls` pointing to the tab panel
- `tabindex="-1"` management for non-selected tabs

**Verdict:** The doc correctly identifies the simpler pattern as "simpler and more robust." This should be the *default*, not an "or." Recommend updating COMPONENTS.md:136–138 to prefer `<nav>` + `<a>` by default, with `role="tablist"` only if screen-reader-specific tab semantics are required.

### 5. Focus Management

STYLING.md:191–192:
> `focus-visible:ring-2 focus-visible:ring-accent`
> "Never remove outline from focused elements without providing an alternative"

The use of `focus-visible` (not `focus`) is important — it only shows the ring when the user is navigating by keyboard, not when clicking with a mouse. This is the correct modern pattern.

Rating: **PASS**

### 6. Colour Contrast

STYLING.md:188–191:
| Pair | Ratio | Standard |
|---|---|---|
| `ink` (#0D0D0D) on `canvas` (#F7F5F0) | 14.7:1 | AAA |
| `muted` (#8C8577) on `canvas` (#F7F5F0) | 4.6:1 | AA |
| `accent` (#C8A96E) on `canvas` (#F7F5F0) | 3.1:1 | **FAIL AA for body text** |

The accent colour at 3.1:1 fails WCAG AA for normal text (<18px) but passes for large text (>18px) and decorative elements.

The doc correctly restricts it: "only use for large text or decorative elements, not body" (STYLING.md:190).

Rating: **PASS** — with the constraint documented and enforced.

### 7. Image Alt Text

DATA-MODEL.md:10: `alt: string` is required on every `ImageItem`.
COMPONENTS.md:80: "Image alt comes from `project.coverImage.alt`."
CONVENTIONS.md:131: "Always use `next/image`, never `<img>`" — the Next.js `Image` component requires alt text.

However, there is no fallback mechanism. If `project.coverImage.alt` is accidentally empty, an `alt=""` or a generic "Project image" could slip through. The data constraint says "`coverImage.alt` must be genuinely descriptive, not 'project image'" (DATA-MODEL.md:92) — but this is a human process, not enforced by TypeScript.

Rating: **PASS with caution** — relies on developer discipline. Could add a TypeScript brand type `type DescriptiveString = string & { __brand: 'descriptive' }` or a lint rule.

### 8. ImageGallery Figure/Figcaption

COMPONENTS.md:159: `<figure>` + `<figcaption>`. This is semantically correct — each gallery image is a self-contained content unit with a caption.

However, if the lightbox (COMPONENTS.md:161): "Lightbox must trap focus and close on Escape" — this is a complex interaction that requires:
- Focus trap (Tab cycles within lightbox, doesn't escape)
- Escape key to close
- Focus returned to the triggering image on close
- `aria-modal="true"` and `role="dialog"` on the lightbox container

The spec mentions focus trapping and Escape but not `aria-modal` or `role="dialog"`. This is a gap for screen reader users who wouldn't know the lightbox is a modal.

Rating: **PASS with gap** — add `aria-modal="true"` and `role="dialog"` to the lightbox spec.

### 9. Skip Link

There is **no skip-to-content link** anywhere in the spec. A skip link ("Skip to main content") is the most basic accessibility feature — it lets keyboard users bypass the Header nav and jump straight to `<main>`.

COMPONENTS.md:26–30 for Header doesn't mention it. ARCHITECTURE.md:22–27 for root layout doesn't mention it.

Rating: **MISSING** — add a skip link as the first focusable element in `app/layout.tsx`:
```tsx
// First child of <body>
<a href="#main-content" className="sr-only focus:not-sr-only focus:...">
  Skip to main content
</a>
```

### 10. Build-Order Polish Checklist

BUILD-ORDER.md:107–114 lists:
- "Test keyboard navigation: Tab through entire page, all interactive elements focusable" ✓
- "Check all images have descriptive `alt` text" ✓
- "Verify all `<Link>` components — no raw `<a>` for internal links" ✓

But notably missing: check for skip link, check for proper landmark structure, check for `aria-*` attributes.

---

## Summary Comparison with `03-audit.md`

| Issue | 03-audit.md | 04-cross-check.md |
|---|---|---|
| Hero alt text | Flagged | Not flagged (different focus) |
| Footer nav landmark | Flagged | **Flagged** — agreed |
| SubNav tab ARIA risk | Flagged | **Flagged** — stronger recommendation |
| Colour contrast | Flagged (passes) | **Flagged** — same conclusion |
| Lightbox aria-modal | Not flagged | **Flagged** — new finding |
| Skip link | Not flagged | **Flagged** — new finding |
| Font swap CLS | Flagged | Not flagged (not a11y/semantics) |
| blurDataURL | Flagged | Not flagged (not a11y/semantics) |

**Agreement:** Both audits flag footer nav landmark and SubNav ARIA complexity.

**New findings in cross-check:** Missing skip link, missing `aria-modal` on lightbox.

---

## Recommendations (ordered by impact)

1. **Add a skip-to-content link** as the first focusable element in the root layout. Largest impact for smallest effort.
2. **Prefer `<nav>` + `<a>`** for ProjectsSubNav. Avoid `role="tablist"` unless truly needed.
3. **Add `<nav aria-label="Footer navigation">`** to Footer.
4. **Add `role="dialog"` and `aria-modal="true"`** to the lightbox spec in ImageGallery.
5. **Add skip link check** to BUILD-ORDER.md phase 9 checklist.
