# Cheaply Frontend Brandbook

This brandbook is grounded in the current implementation in `apps/web`. It documents the visual system, tone, and shadcn preset details that the frontend is using today.

## Brand Summary

Cheaply presents itself as:

- Smart, practical, and price-aware
- Trustworthy rather than flashy
- Irish-first and locally relevant
- Modern, minimal, and conversion-focused

The current landing page positions Cheaply as a shopping companion that helps users find deals across Irish retailers, with a strong emphasis on clarity and low friction.

## Core Brand Traits

- `Practical`: the UI is sparse, fast to scan, and built around a single action
- `Local`: references to Ireland are explicit in copy and labeling
- `Calm`: whitespace, soft backgrounds, and restrained motion do most of the work
- `Optimistic`: the green primary color and celebratory success states keep the product feeling positive

## Voice And Tone

Current frontend copy suggests the following writing style:

- Short sentences
- Plain English
- Light warmth, but not hype-heavy
- Product confidence without sounding salesy

Examples from the current interface:

- `Find the best deals across Irish retailers`
- `No spam. Just the launch date.`
- `We'll ping you the moment cheaply.ie goes live.`

Use copy that is:

- Direct
- Useful
- Specific
- Friendly without being cute

Avoid:

- Overwritten slogans
- Heavy startup jargon
- Aggressive discount language
- Generic global-market messaging that loses the Irish focus

## Proposed Brand Voice

Cheaply should sound like a sharp, trusted friend who knows where value is, but does not waste the user's time.

### Voice Pillars

- `Clear`: say what the product does in plain language
- `Savvy`: sound informed about prices and shopping without sounding smug
- `Grounded`: be practical, concrete, and locally relevant
- `Calm`: avoid urgency theater, noise, and exaggerated claims

### Personality Sliders

- More `useful` than `clever`
- More `confident` than `hyped`
- More `modern` than `quirky`
- More `local and informed` than `broad and generic`

### How Cheaply Should Sound

- Direct and easy to scan
- Smart without sounding technical
- Friendly without sounding overly familiar
- Helpful without sounding needy

### How Cheaply Should Not Sound

- Pushy
- Coupon-site chaotic
- Corporate and lifeless
- Trend-chasing or slang-heavy

### Light Irish Humor

Cheaply can carry a small bit of Irish wit, but only around the edges.

The right level is:

- dry
- understated
- warm
- recognisably local without trying too hard

The wrong level is:

- full-on comedy brand
- slang in every second line
- wink-wink copy that weakens trust
- stereotype-heavy "Irish" writing

Use humor mainly in:

- success states
- confirmation emails
- helper text
- launch messaging

Keep core product claims and price-related copy more direct and serious.

Good examples:

- `You're on the list. Sound.`
- `We'll give you a shout when we're live.`
- `No spam. No messing.`
- `Handy, isn't it?`

Use sparingly:

- `grand`
- `sound`
- `give you a shout`
- `go on so`

Avoid overdoing:

- `craic`
- `top of the morning`
- exaggerated slang spellings
- anything that reads like tourism copy

### Messaging Formula

The default structure for homepage and product copy should be:

`What it helps you do` + `where it helps you do it` + `why it is useful`

Example:

- `Find the best deals across Irish retailers.`
- `Track prices, catch drops, and buy at the right time.`

### Recommended Copy Principles

- Lead with the user benefit, not the company
- Prefer specific shopping outcomes over abstract promises
- Keep claims believable
- Mention Ireland when it adds clarity or trust
- Use short, natural sentences

### Preferred Vocabulary

Lean toward words like:

- deals
- prices
- track
- compare
- alerts
- retailers
- save
- best time to buy
- Irish retailers

Use cautiously:

- cheapest
- unbeatable
- revolutionary
- game-changing
- never-before-seen

### Example Tagline Directions

- `Smarter shopping for Ireland.`
- `Track prices. Catch deals. Buy better.`
- `The easiest way to spot better prices across Irish retailers.`
- `A calmer way to shop smarter in Ireland.`

### Example Microcopy

CTA options:

- `Notify me`
- `Join the waitlist`
- `Get launch updates`

Supportive UI copy:

- `No spam. Just useful updates.`
- `We’ll let you know when Cheaply goes live.`
- `Track prices across the Irish shops you already use.`
- `No spam. No messing.`
- `We’ll give you a shout when we’re live.`

Success-state copy:

- `You're on the list.`
- `We'll let you know when it's live.`
- `Thanks. You're in for launch updates.`
- `You're on the list. Sound.`

## Visual Direction

The visual language is a clean landing-page aesthetic with a soft premium layer:

- Large centered wordmark
- Soft atmospheric blobs in the background
- Muted neutrals with a single green brand accent
- Fine borders and translucent surfaces
- Tight, simple composition with one primary CTA

The interface should feel more like a focused product waitlist than a loud ecommerce promotion.

## Logo And Wordmark Use

The current wordmark treatment is textual:

- `cheaply` in muted foreground
- `.ie` in the primary brand color

This creates two cues:

- The base brand is understated and modern
- The `.ie` suffix carries both the brand accent and the local market emphasis

If this treatment is reused elsewhere, preserve:

- The contrast between the muted base word and the highlighted suffix
- Generous scale
- Tight tracking
- Minimal surrounding noise

## Color System

The design system is driven by CSS variables in `src/index.css`.

### Primary Brand Color

- `--primary: oklch(0.508 0.118 165.612)`
- `--primary-foreground: oklch(0.979 0.021 166.113)`

Interpretation:

- A calm green leaning slightly toward teal
- Used for CTA buttons, emphasis, success-adjacent UI, and the `.ie` wordmark suffix

### Neutral Foundation

- `--background: oklch(1 0 0)`
- `--foreground: oklch(0.141 0.005 285.823)`
- `--card: oklch(1 0 0)`
- `--muted: oklch(0.967 0.001 286.375)`
- `--muted-foreground: oklch(0.552 0.016 285.938)`
- `--border: oklch(0.92 0.004 286.32)`

Interpretation:

- Clean white surfaces
- Soft zinc-like neutrals
- Low-contrast borders
- Text hierarchy built through neutral intensity, not extra color

### Supporting Tokens

- `--destructive: oklch(0.577 0.245 27.325)`
- `--ring: oklch(0.705 0.015 286.067)`
- `--radius: 0.625rem`

Use the destructive color only for errors and invalid states. The brand should remain primarily neutral + green.

### Dark Theme Status

Dark tokens are defined in `src/index.css`, but the current product expression is primarily a light-mode landing page. If dark mode becomes product-critical, it should preserve the same brand intent:

- muted neutrals
- green emphasis
- low-noise contrast
- restrained use of accent color

## Typography

The active app currently imports `@fontsource-variable/manrope`, but the underlying `radix-lyra` preset is officially described as mono-friendly and is commonly mapped to `JetBrains Mono`.

To keep the brandbook aligned with the preset direction, use this two-font system:

Typography guidance:

- Primary display and utility font: `JetBrains Mono Variable`
- Reading and support font: `system-ui, -apple-system, sans-serif`
- Tone: sharp, boxy, practical, readable
- Headings: compact, high-clarity, slightly editorial
- Body text: concise, neutral, and easy to scan

Current heading treatment:

- Large hero wordmark
- Tight tracking
- Heavy weight
- Minimal ornament

Typography should continue to favor:

- strong hierarchy
- short line lengths
- crisp product language
- mono-led accents rather than decorative display type

Practical guidance:

- Use `JetBrains Mono Variable` for wordmarks, badges, labels, pricing moments, and UI details where the Lyra character should be felt
- Use the system sans stack for longer paragraphs and support copy where readability matters more than personality
- Do not introduce soft rounded display fonts that fight the sharper Lyra baseline

## Shape Language

The UI has two distinct radius behaviors that work together:

- Core controls from shadcn primitives are mostly square-edged with `rounded-none`
- Marketing surfaces in the landing page use larger soft corners like `rounded-2xl`

This creates a useful contrast:

- Inputs and buttons feel precise and utilitarian
- Cards and feedback containers feel softer and more welcoming

Keep that balance. Do not make everything fully rounded or everything rigid.

## Layout Principles

The active landing page uses:

- A centered single-column hero
- Tight max width for focus
- One dominant action
- A secondary three-up feature grid
- Minimal footer messaging

Future frontend pages should preserve:

- strong focal point
- high whitespace
- limited simultaneous actions
- obvious next step

## Motion

Current motion is subtle and atmospheric:

- fade-in staging on content blocks
- soft pulsing background blobs
- hover color shifts on feature cards

Motion should:

- support polish, not steal attention
- remain soft and low-frequency
- avoid bouncy ecommerce tropes

## Imagery And Iconography

Current implementation uses:

- emoji for feature callouts
- Lucide as the configured icon library
- a restrained asset footprint overall

Guidance:

- Use Lucide for product UI and system clarity
- Use emoji sparingly, mainly in lightweight marketing or celebratory moments
- Prefer simple, high-contrast visuals over busy illustrations

## UI Component Character

The current primitives communicate a specific interaction style:

- Buttons are compact, square, and direct
- Inputs are minimal and low-noise
- Badges are understated and lightly outlined
- Cards rely on border, blur, and subtle background tint rather than heavy shadow

That means the interface should feel:

- efficient
- editorially clean
- slightly premium
- not playful or gamified

## Shadcn Preset In Use

The project uses the following `components.json` configuration:

- `style: radix-lyra`
- `rsc: false`
- `tsx: true`
- `iconLibrary: lucide`
- `rtl: false`
- `menuColor: default-translucent`
- `menuAccent: subtle`

Tailwind-related configuration:

- `css: src/index.css`
- `baseColor: zinc`
- `cssVariables: true`
- `prefix: ""`

Aliases:

- `components: @/components`
- `utils: @/lib/utils`
- `ui: @/components/ui`
- `lib: @/lib`
- `hooks: @/hooks`

### What This Means In Practice

- `radix-lyra` gives the UI a sharper, more editorial baseline than default shadcn presets
- `baseColor: zinc` aligns the system to cool neutral grays rather than warm beige or colored chrome
- `cssVariables: true` means the theme is controlled semantically through tokens, not hardcoded utility colors
- `default-translucent` and `subtle` menu settings support the low-noise, premium-soft direction
- `lucide` keeps iconography crisp and familiar
- Lyra is officially described as boxy, sharp, and mono-friendly, so the typography guidance above treats `JetBrains Mono Variable` as the preset-aligned signature face

## Implementation Notes

The current frontend brand is expressed mainly in:

- `src/index.css`
- `src/components/coming-soon.tsx`
- `src/components/ui/*`
- `components.json`

There is also unused starter scaffold in `src/App.tsx`. It is not part of the active routed app and should not be treated as part of the brand direction.

## Brand Guardrails

When extending the frontend, preserve these rules:

- Keep the Irish market positioning visible where relevant
- Prefer neutral surfaces with one strong accent color
- Keep copy concise and credible
- Use whitespace instead of decoration
- Use motion sparingly
- Preserve the current balance between precise controls and soft marketing containers

Avoid:

- loud gradient-heavy redesigns
- multiple competing accent colors
- generic SaaS purple styling
- overly rounded component sets
- cluttered dashboards without a clear visual hierarchy

## Recommended One-Line Brand Definition

Cheaply is a calm, modern Irish deals brand: practical at its core, polished in presentation, and focused on helping users act quickly with confidence.
