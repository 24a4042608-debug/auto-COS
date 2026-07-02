---
name: Aura & Thread
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c19'
  on-tertiary-container: '#838480'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e3e3de'
  tertiary-fixed-dim: '#c6c7c2'
  on-tertiary-fixed: '#1a1c19'
  on-tertiary-fixed-variant: '#454744'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-xl:
    fontFamily: Bodoni Moda
    fontSize: 80px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-unit: 8px
---

## Brand & Style

The brand personality is curated, exclusive, and understated. It targets a discerning audience that values slow fashion, craftsmanship, and timeless elegance over fast-moving trends. The UI must evoke a sense of calm, high-end retail experience, similar to walking into a flagship boutique on Avenue Montaigne.

The design style is **Minimalist Luxury**. It prioritizes high-quality photography and generous whitespace to allow products to breathe. The aesthetic is defined by:
- **Refinement:** Thin lines, restrained use of color, and meticulous alignment.
- **Editorial Feel:** Layouts that mirror high-end fashion magazines with asymmetrical grids and intentional typographic scale.
- **Sophistication:** Subtle transitions and a "less is more" approach to functional elements.

## Colors

The palette is rooted in high-contrast neutrals with a singular metallic accent to signify prestige.

- **Primary (#0A0A0A):** A "Deep Obsidian" used for typography, borders, and high-impact CTA backgrounds.
- **Secondary (#C5A059):** An "Antique Gold" used sparingly for interactive highlights, price labels, or luxury badges.
- **Tertiary (#F5F5F0):** "Soft Bone" serves as the primary background color, providing a warmer, more premium feel than stark white.
- **Neutral (#666666):** "Graphite" for secondary metadata and descriptive body text to maintain hierarchy without clutter.

## Typography

The typographic system relies on the interplay between the dramatic, high-contrast strokes of **Bodoni Moda** and the surgical precision of **Hanken Grotesk**.

- **Headlines:** Use Bodoni Moda for all storytelling and product titles. Tighten letter-spacing for large displays to increase the editorial "weight."
- **Body:** Hanken Grotesk is used for all functional text. Ensure generous line-height (1.6) to maintain readability within spacious layouts.
- **Labels:** Use uppercase Hanken Grotesk with expanded letter-spacing for navigation, tags, and small UI indicators to create a structured, architectural feel.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop to preserve the integrity of high-fashion imagery, and a fluid model for mobile.

- **Desktop (1440px+):** 12-column grid with 64px outer margins. Spacing between sections should be expansive (e.g., 120px - 160px) to signify luxury.
- **Mobile:** 4-column grid with 20px margins. Product cards should occupy 1 or 2 columns to keep images large and immersive.
- **Spacing Rhythm:** Use a base 8px unit for internal component spacing, but shift to 16px/24px for layout-level gaps.

## Elevation & Depth

To maintain a flat, modernist aesthetic, the design system avoids traditional shadows. Depth is achieved through **Tonal Layering** and **Low-Contrast Outlines**.

- **Surfaces:** Use slightly different shades of off-white (Tertiary) to distinguish between the page background and modal overlays.
- **Borders:** 1px solid lines in Primary (#0A0A0A) or a light grey (#E0E0E0) define structure without adding visual bulk.
- **Hover States:** Instead of elevation, use subtle opacity shifts or "color-fill" transitions. For example, a transparent button fills with solid black on hover.

## Shapes

The shape language is strictly **Sharp (0px)**. Roundness is avoided to maintain a high-fashion, architectural aesthetic. 

- **Buttons & Inputs:** Sharp 90-degree corners convey precision and discipline.
- **Imagery:** Product photography should be framed in rectangles. Circular crops are not permitted.
- **Dividers:** Use hairline (1px) horizontal and vertical strokes to organize content without breaking the flow.

## Components

- **Buttons:** Primary buttons are solid Primary (#0A0A0A) with white Label-sm text. Secondary buttons are outlined (1px). Hover states should invert the colors instantly.
- **Input Fields:** Bottom-border only (minimalist style). Labels should be small and float above the line.
- **Product Cards:** Full-bleed images with minimal text below. Prices should be displayed in the Gold accent color. On hover, the image should swap to a "lifestyle" or "detail" shot.
- **Chips/Filters:** Use text-only links with a thin underline for active states, rather than boxed chips, to reduce visual noise.
- **Navigation:** A centered logo with thin, uppercase links. Use a "mega-menu" for categories that utilizes the 12-column grid for imagery.
- **Checkboxes:** Small, square, sharp-cornered boxes that fill solid Primary when checked.