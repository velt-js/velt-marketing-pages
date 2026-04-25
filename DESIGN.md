# Design Specification

## 1. Typography

Modern, high-tech aesthetic using a clean geometric sans-serif for a professional developer-tool feel.

- **Heading Font:** Urbanist, sans-serif
- **Body Font:** Urbanist, sans-serif

### Capitalization

- Headings use sentence case
- Navigation links use sentence case
- Buttons use sentence case
- Small labels (e.g., 'DASHBOARD PRODUCT') use all-caps

### Type Scale

- 72px - h1 - Main hero title, extra bold
- 40px - h2 - Section headings, bold
- 24px - h3 - Card headings, semibold
- 16px - body - Standard paragraphs, regularx
- 14px - labels - UI components and small metadata
- 12px - tags - Regular, semibold, all caps

### Font Weights

- 700 (Bold) - main headings
- 600 (Semibold) - button text, card titles and tags
- 400 (Regular) - body text and descriptions

### Line Heights

- 125% - h1 hero heading
- 150% - standard body text
- 1.5 - paragraph text for readability

### Letter Spacing

- -0.03em- h1 headings for tighter impact
- 0.6px - all-caps labels for legibility

## 2. Colors

A sophisticated high-contrast palette dominated by deep blacks and vibrant purples, accented by a diverse range of secondary colors representing multi-user collaboration.

- **Primary Color:** #625DF5 - primary brand purple used for main CTAs and active states

### Text Colors

- #FFFFFF - primary text on dark sections
- #000000 - primary text on light sections
- #8E8E8E - muted secondary/body text
- #B5B5B5 - footer link text

### Background Colors

- #000000 - hero, testimonials, and footer background
- #FFFFFF - feature and integration sections background
- #111111 - card backgrounds in dark sections
- #F7F7F7 - light card/section backgrounds

### Interactive Colors

- #625DF5 - primary button fill
- #FFFFFF - secondary button outline on dark
- #000000 - secondary button outline on light
- #FFFFFF 80% -  links on dark (100% opacity on hover)
- #000000 80% - link on light (100% opacity on hover)

### Accent Colors

- #E934BF - pink cursor/user indicator
- #0D9A5D - green cursor/user indicator
- #FF7162 - orange cursor/user indicator
- #FFCD2E - yellow highlight

### Gradients

- radial-gradient(rgba(0, 0, 0, 0.55)) - subtle depth in dark sections
- linear-gradient(rgba(247, 247, 247, 0)) - transparency transitions in cards

## 3. Theme

A mixed-theme approach that uses high-contrast 'zebra-striping' to separate major page sections.

- **Mode:** dark and light
- **Tint:** Pure dark mode (#000000) for high-impact sections, alternating with clean white (#FFFFFF) functional sections.
- **Contrast Style:** High contrast; deep blacks paired with bright whites and vibrant neon-like accent colors.

### Section Variations

- Hero: Dark background with grid pattern
- Features: Solid white background
- Integrations: Solid white with light grey cards
- Testimonials: Solid dark background
- Footer: Solid dark background

## 4. Spacing

Spacious and modern layout with generous vertical rhythm and consistent internal component padding.

- **Density:** spacious
- **Base Unit:** 8px
- **Rhythm:** Very consistent vertical flow, using large multiples of 8px (80, 112, 120) for section separation.

### Section Width

- 1200px - vertical max width for all content

### Section Padding

- 120px - vertical padding between major sections
- 80px - vertical padding for smaller content blocks

### Element Spacing

- 24px - gap between cards in grids
- 16px - spacing between icons and text in features
- 32px - margin below headings

## 5. Navigation

A comprehensive split navigation designed for utility and clear conversion paths.

- **Type:** split
- **Logo Position:** left
- **Link Grouping:** Centered primary links with dropdown indicators (Product, Use Cases, Resources) paired with right-aligned utility links (Sign In, Docs) and a CTA.
- **Styling:** 
  - Transparent background in the hero section, fixed position with high z-index (2147483647).
  - Converts into a solid white background and dark text for light mode section
  - Converts into a solid black background and white text for dark mode section
- **CTA Button:** Book Demo - Purple fill pill button on the far right.
- **Mobile Pattern:** Likely collapses to a hamburger menu given the split complexity at 1000px breakpoint.

## 6. Background

Uses alternating solid colors and subtle patterns to define content boundaries.

- **Main Background:** solid
- **Value:** #000000
- **Section Separation:** Sharp transitions between solid black and solid white sections provide the primary visual separation.

### Section Backgrounds

- Hero: Dark #000000 with a subtle dim grid/pixel pattern
- Features: Clean #FFFFFF for readability
- Integrations: #FFFFFF background with #F7F7F7 cards
  - Testimonials: #000000 background

### Overlays

- Semi-transparent gradients on product screenshots to simulate depth

### Decorative Elements

- Subtle background grid/dots in hero
- Blurred colorful glows behind floating UI elements in the hero

## 7. Content Layout

Grid-heavy structure focusing on readability and modular feature presentation.

- **Column Usage:** 3-column grid for testimonials and 'Get Started' steps; 2-column or full-width for major feature blocks.
- **Repetition:** The 3-column vertical card pattern is repeated for both social proof and the 'Get Started' guide to maintain consistency.

### Layout Patterns

#### Hero Stack

Center-aligned title, description, and dual-button CTA.

#### Feature Bento Grid

Large rounded containers with internal layouts for demonstrating software functionality.

#### Social Proof Carousel

Vertical cards containing quotes with marquee animation.

## 8. Visual Style & Imagery

Technical and collaborative tone using 'live UI' simulations and vibrant collaborative metaphors.

- **Illustrations:** None; uses simulated software UI components to demonstrate the product directly.
- **Icons:** Outlined monochrome icons for integrations; colored cursor icons to represent multiple users. Use [Tabler Icon Component](https://tabler.io/icons)
- **Photography:** Small circular avatar images for testimonials; otherwise focuses on software screenshots.
- **Infographics:** Product screenshots acting as functional diagrams (e.g., database spreadsheets with comment overlays).
- **Overall Tone:** Technical, collaborative, and sophisticated ('Developer-first').

## 9. Social Proof & Testimonials

Heavy use of high-authority testimonials and recognizable brand logos.

- **Logo Bars:** Integrations section functions as a logo bar, using 2-column cards for different categories.
- **Case Studies:** Implicit in testimonials with specific mentions of 'shipped in under 1 week'.
- **Styling:** Testimonials use a 3-column grid on a dark background with #111111 card fills and #FFFFFF text.]
- **Repetiton:** Use testimonial banner card component after features and other sections

### Formats

#### Testimonial Banner Card

Dark cards with #FFFFFF text, including a large quote, avatar, name, and company (e.g., @Google, @X).

#### Integration Logo Grid

Cards showcasing logos of supported libraries (Tiptap, Highcharts, React Flow) in their native colors.

## 10. Buttons & Interactive Elements

Consistent pill-shaped design with distinct primary and secondary variants.

- **Border Radius:** Pill-shaped/fully-rounded (radii value 737px or 999px equivalents) for all primary actions.
- **Sizing:** Large CTAs in Hero and section bottoms (48px height), standard nav and card buttons (36px height).
- **Icon Usage:** Small icons (e.g., GitHub logo or 'View Docs' icon) placed to the left of button text.

### Button Variants

#### Primary Filled

Background #625DF5, text #FFFFFF, curves (radius 8px), approx 12px top-bottom padding and 16px left-right padding, Urbanist Semibold.

#### Secondary Outline

Transparent background, border 1px #FFFFFF (on dark) or #000000 (on light), pill-shaped, text matches border color.

#### Nav CTA

Purple pill in navigation (#625DF5) for 'Book Demo'.

## 11. Text Alignment & Content Width

Centered alignment for impact in headers, left alignment for information density in cards.

- **Default Alignment:** left
- **Content Max Width:** 1200px

