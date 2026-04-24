# Cheaply.ie Design System

## Overview

Cheaply.ie is a map-first Irish grocery price-tracking landing page. The visual direction is quiet, useful, and product-led: a dark canvas, a live Ireland county map, compact price-alert toasts, and a restrained green accent. The interface should feel like an early product surface rather than a marketing splash page.

## Core Principles

- Lead with the Ireland map. It is the first major visual users should see.
- Keep the UI calm and sparse. Avoid extra decoration, blobs, gradients, and oversized marketing sections.
- Treat alerts as lightweight product signals, not large cards.
- Make layouts feel integrated into the page canvas. Do not put the map inside a card or framed preview.
- Prefer practical copy that explains the product in one sentence.
- Mobile must be designed first: map, alert, headline, signup, proof points.

## Brand

- Wordmark: `cheaply.ie`
- Wordmark treatment: muted `cheaply` plus green `.ie`.
- Use the wordmark once in the header. Avoid duplicate hero-sized brand text in the page body.
- Tone: plainspoken, Irish-friendly, but not gimmicky.
- Example headline: `Track prices across Ireland.`
- Example support copy: `Catch deal alerts and buy better across the retailers already in your weekly shop.`

## Color

Use the app's Tailwind/shadcn tokens from `apps/web/src/index.css`.

### Primary Palette

- Background: `--background`
  - Light: `oklch(1 0 0)`
  - Dark: `oklch(0.141 0.005 285.823)`
- Foreground: `--foreground`
  - Light: `oklch(0.141 0.005 285.823)`
  - Dark: `oklch(0.985 0 0)`
- Primary green: `--primary`
  - Light: `oklch(0.508 0.118 165.612)`
  - Dark: `oklch(0.432 0.095 166.913)`
- Muted text: `--muted-foreground`
- Borders: `--border`
- Cards/surfaces: `--card`

### Color Usage

- Use green only for `.ie`, active counties, alert dots, status highlights, and primary CTAs.
- Use muted gray for inactive county paths and secondary copy.
- Avoid large fields of green. It should guide attention, not dominate.
- Dark mode is the preferred visual personality for the landing page.

## Typography

- Font: `Manrope Variable` via `@fontsource-variable/manrope`.
- Fallback: system sans-serif.
- Headline style: bold, tight, high contrast, no negative letter spacing beyond existing Tailwind defaults.
- Body copy: readable, muted, 16-18px depending on viewport.
- Small metadata: uppercase, 8-12px, expanded tracking.

### Scale

- Header wordmark: `text-xl font-bold`.
- Hero headline: `text-4xl sm:text-5xl lg:text-6xl`, leading around `1.02`.
- Body copy: `text-base sm:text-lg`, relaxed line height.
- Feature labels: `text-xs font-medium`.
- Alert metadata: `8-10px`, uppercase, letter spaced.

## Layout

### Page Structure

1. Header with small wordmark and theme toggle.
2. Map-first hero area.
3. Product headline and waitlist form.
4. Three compact proof points.
5. Static footer with copyright and service status.

### Desktop

- Use a two-column hero:
  - Left/first column: launch badge above unframed map.
  - Right/second column: headline, copy, signup, proof points.
- Max page width: approximately `max-w-6xl`.
- Horizontal gap: `gap-x-10` to `gap-x-16`.
- Map column should be visually dominant.

### Mobile

- Single-column flow:
  - Header
  - Launch badge
  - Map
  - Dynamic toast
  - Headline
  - Signup
  - Proof points
  - Footer
- Keep the signup visible with minimal scrolling on common mobile viewports.
- Avoid fixed footers or absolutely positioned footer content.

## Map

- The Ireland map is a native inline SVG built from county path data.
- Do not render the map inside a card, frame, browser mockup, phone mockup, or iframe.
- Do not add a map title such as `Ireland`; the shape is self-explanatory.
- Inactive counties use muted gray.
- Active county uses primary green.
- County transitions should be smooth and subtle, around `duration-500`.
- Stroke should remain thin and low-contrast so county boundaries are visible without becoming noisy.

## Price Alert Toast

The price alert is a small dynamic toast, not a card.

### Behavior

- Toast should move near the currently active county.
- Compute position from active county bounds or center point.
- Clamp position so it stays readable and within the map area.
- Keep movement smooth with `transition-all duration-500`.
- The toast can overlap a small part of the map, but should not hide too much of the island.

### Visual Style

- Width: compact, roughly `168px` mobile and `188px` desktop.
- Padding: compact, around `p-1.5`.
- Surface: `bg-background/88` with backdrop blur.
- Border: use a subtle `ring-1 ring-border/70`.
- Radius: small, `rounded` or `rounded-md`.
- Shadow: subtle floating shadow.
- Dot: tiny green pulsing indicator.
- County/product/shop text should truncate to avoid expanding the toast.

### Content

- Metadata: `Price Alert`.
- County: uppercase green label.
- Main line: `{shop} has a new low price`.
- Product: one-line truncated item name.
- Price row: new price, struck-through old price, compact green discount chip.

## Components

### Buttons

- Use shadcn button primitives.
- Primary CTA uses the primary green token.
- Button height for forms: `h-12`.
- Copy should be short: `Join waitlist`, not long marketing phrasing.

### Inputs

- Use shadcn input primitives.
- Height: `h-12`.
- Placeholder: `your@email.com`.
- Keep input and button in one row on wider screens; stack on narrow screens.

### Badges

- Launch badge sits above the map.
- Use outline styling with green border/text and subtle green background.
- Badge copy: `Launching soon · Ireland`.

### Feature Proof Points

- Three compact items.
- Use Lucide icons, not emoji.
- Current icons:
  - `ShoppingBasket`
  - `MapPinned`
  - `Bell`
- Keep labels short:
  - `Track basket staples`
  - `Local Irish retailers`
  - `Catch real price drops`

## Motion

- Keep motion purposeful and restrained.
- Active county changes approximately every `2800ms`.
- Alert follows the active county with smooth positional transition.
- Avoid large entrance animations, bouncy effects, or decorative pulses.
- Pulsing is acceptable only for tiny live-status dots.

## Accessibility

- Map SVG can be `aria-hidden` if equivalent alert text is visible.
- Signup form must preserve native email validation.
- Keep text contrast readable in dark mode.
- Focus rings should use existing `--ring` token.
- Do not rely on color alone for form success/error states.

## Do

- Use the map as the hero's main product signal.
- Keep surfaces minimal and useful.
- Use green sparingly for live/active states.
- Prefer compact, information-rich alerts over large cards.
- Test mobile layouts in the in-app browser after any hero/map change.

## Don't

- Do not put the map in an iframe.
- Do not put the map in a card.
- Do not add decorative gradient blobs or orb backgrounds.
- Do not duplicate the `cheaply.ie` brand as both header and huge center headline.
- Do not let the toast grow based on long county names or product names.
- Do not let the toast permanently sit in one static corner if it can follow the county.
- Do not add large marketing sections above the map.

## Implementation Notes

- Main landing page: `apps/web/src/components/coming-soon.tsx`.
- Map component: `apps/web/src/components/ireland-price-map.tsx`.
- County SVG data: `apps/web/src/components/ireland-map-paths.ts`.
- Design tokens: `apps/web/src/index.css`.
- UI primitives: `apps/web/src/components/ui`.
- Icons: `lucide-react`.

Future UI work should read this file first, then follow the existing Tailwind/shadcn patterns in the app.
