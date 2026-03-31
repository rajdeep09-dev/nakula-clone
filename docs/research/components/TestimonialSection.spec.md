# TestimonialSection Specification

## Overview
- **Target file:** `src/components/TestimonialSection.tsx`
- **Interaction model:** static grid / reveal animations

## DOM Structure
- `section` (Relative, py-24)
  - `div` (Max-width container)
    - `div` (Header: rating + text)
    - `div` (Testimonials grid)
      - `TestimonialCard` (repeating items)

## Computed Styles (exact values from getComputedStyle)

### Rating
- fontSize: 32px
- color: #CACACA
- fontWeight: 600

### Intro Text (h3)
- fontSize: 40px md:48px
- color: #CACACA
- fontWeight: 600
- letterSpacing: -0.04em

### TestimonialCard
- backgroundColor: #141414
- borderRadius: 24px
- padding: 32px
- border: 1px solid #222222

## States & Behaviors

### Reveal
- **Trigger:** scroll into view
- **Animation:** items fade in and slide up.

## Text Content (verbatim)
- "4.9 /5 300+ Reviews on Clutch"
- "(TESTIMONIALS) We deliver data-driven and result-focused deliverables. Hear what they say about us."
- Testimonials: Mario Baskoro (CTO of Arjuna), Evelyn Widjaja (Marketing Lead at Bima), Karina Wulandari (Founder at Batavia).

## Responsive Behavior
- **Desktop:** 3 column grid for testimonials.
- **Mobile:** 1 column grid.
