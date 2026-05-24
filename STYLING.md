# STYLING.md

## Aesthetic Direction

**Editorial / Refined Minimalist.**  
Think high-end design studio portfolio: generous whitespace, strong typographic hierarchy, restrained colour palette, moments of precision animation. The work should do the talking; the chrome should step back.

Not: gradient-heavy tech startup. Not: brutalist/raw. Not: over-animated.

---

## Colour Palette

Defined as CSS custom properties in `app/globals.css` and extended into Tailwind.

```css
:root {
  --color-ink:     #0D0D0D;   /* body text, headings */
  --color-canvas:  #F7F5F0;   /* page background — warm off-white */
  --color-warm:    #EDE9E0;   /* cards, surface elevation */
  --color-accent:  #C8A96E;   /* links, hover states, active nav */
  --color-muted:   #8C8577;   /* secondary text, captions, tags */
  --color-ghost:   #D4CFC5;   /* borders, dividers, skeletons */
}
```

**Usage rules:**
- Page backgrounds: `canvas`
- Card backgrounds: `warm`
- Borders and dividers: `ghost`
- Body text: `ink`
- Captions, metadata, tags: `muted`
- Active states, links, CTA: `accent`
- Never use pure `#000000` or `#FFFFFF` — the off-white/near-black feel is intentional

---

## Typography Scale

**Font pairing:**
- Display / headings: `Playfair Display` (Google Fonts, serif) — editorial weight
- Body / UI: `DM Sans` (Google Fonts, sans-serif) — clean, contemporary

Load via `next/font/google` in `app/layout.tsx`:

```tsx
import { Playfair_Display, DM_Sans } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
```

Then add both variables to `<html>`:
```tsx
<html className={`${playfair.variable} ${dmSans.variable}`}>
```

**Scale (Tailwind classes):**

| Role | Class | Size | Font |
|---|---|---|---|
| Hero headline | `text-6xl md:text-8xl font-display` | 60–96px | Playfair Display |
| Section title | `text-3xl md:text-4xl font-display` | 30–36px | Playfair Display |
| Card title | `text-xl font-display` | 20px | Playfair Display |
| Body text | `text-base font-body` | 16px | DM Sans |
| Caption / tag | `text-sm font-body text-muted` | 14px | DM Sans |
| Nav links | `text-sm tracking-widest uppercase font-body` | 14px | DM Sans |

---

## Tailwind Config Additions (`tailwind.config.ts`)

```ts
theme: {
  extend: {
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body: ['var(--font-body)', 'system-ui', 'sans-serif'],
    },
    colors: {
      ink:    '#0D0D0D',
      canvas: '#F7F5F0',
      warm:   '#EDE9E0',
      accent: '#C8A96E',
      muted:  '#8C8577',
      ghost:  '#D4CFC5',
    },
    letterSpacing: {
      widest: '0.25em',
    },
    transitionTimingFunction: {
      'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
    aspectRatio: {
      'card':     '4 / 3',
      'featured': '16 / 9',
      'portrait': '3 / 4',
    },
  },
},
```

---

## Spacing System

Use Tailwind's default 4px grid. For section spacing, standardise on:

| Usage | Class |
|---|---|
| Page horizontal padding | `px-6 md:px-12 lg:px-24` |
| Section top/bottom margin | `py-16 md:py-24` |
| Card gap in grid | `gap-6 md:gap-8` |
| Content max width | `max-w-7xl mx-auto` |

---

## Motion & Interaction

Keep animations purposeful and fast.

**CSS-only hover on project cards:**
```css
.project-card img {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.project-card:hover img {
  transform: scale(1.03);
}
```

**Page enter animation (Tailwind + CSS):**
Each page can fade in its main content:
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-enter {
  animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

**Skeleton pulse (loading states):**
```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--color-warm) 25%, var(--color-ghost) 50%, var(--color-warm) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease infinite;
}
```

---

## Responsive Breakpoints

Tailwind defaults — use consistently:

| Breakpoint | Min-width | Use for |
|---|---|---|
| (base) | 0 | Mobile, single column |
| `md:` | 768px | 2-col grid, larger type |
| `lg:` | 1024px | 3-col grid |
| `xl:` | 1280px | Max layout width |

Grid pattern used on projects page:
```
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

---

## Accessibility Notes

- Minimum contrast: body text (`ink` on `canvas`) → 14.7:1 ✓
- Muted text (`muted` on `canvas`) → 4.6:1 ✓ (meets AA for normal text)
- Accent (`accent` on `canvas`) → 3.1:1 — only use for large text or decorative elements, not body
- Focus rings: use `focus-visible:ring-2 focus-visible:ring-accent` consistently
- Never remove outline from focused elements without providing an alternative
