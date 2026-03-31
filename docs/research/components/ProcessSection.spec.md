# ProcessSection Specification

## Overview
- **Target file:** `src/components/ProcessSection.tsx`
- **Interaction model:** scroll-driven card stacking

## DOM Structure
- `section` (Relative, h-[400vh])
  - `div` (Sticky container, top-0, h-screen)
    - `h2` ("HOW WE WORK" - Anton)
    - `div` (Cards container)
      - `ProcessCard` (repeating items, absolute positioned)

## Computed Styles (exact values from getComputedStyle)

### Card
- backgroundColor: #0A0A0A
- borderRadius: 32px
- border: 1px solid #222222
- padding: 40px
- height: 400px

## States & Behaviors

### Card Stacking
- **Trigger:** scroll progress
- **Animation:** cards stack on top of each other as the user scrolls. The previous card might scale down slightly (0.95) or fade out.
- **Implementation:** `framer-motion` `useScroll` and `useTransform`.

## Text Content (verbatim)
- "HOW WE WORK"
- Steps: Discovery Phase, Project Kickoff, Receive & Refine, Continue & Grow.

## Responsive Behavior
- **Desktop:** horizontal or vertical stacking.
- **Mobile:** simplified stacking or vertical list.
