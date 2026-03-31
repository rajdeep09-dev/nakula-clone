# WhyUsSection Specification

## Overview
- **Target file:** `src/components/WhyUsSection.tsx`
- **Interaction model:** static / reveal animations

## DOM Structure
- `section` (Relative, py-20)
  - `div` (Max-width container)
    - `p` ("(WHY US)")
    - `h2` ("NUMBERS DON'T LIE" - Anton)
    - `p` (Description)
    - `div` (Stats grid)
      - `StatItem` (repeating items)

## Computed Styles (exact values from getComputedStyle)

### Heading (h2)
- fontSize: 80px md:120px
- fontFamily: Anton
- textTransform: uppercase
- color: #CACACA

### Stats Grid
- display: grid
- gridTemplateColumns: 1fr 1fr
- gap: 40px

## States & Behaviors

### Stats Reveal
- **Trigger:** scroll into view
- **Animation:** numbers might count up (optional) or just fade in.
- **Implementation:** `framer-motion` `whileInView`

## Text Content (verbatim)
- "229+ Successful projects completed"
- "5+ Years of experience"
- "99% Customer satisfaction"
- "18M In Client revenue growth"

## Responsive Behavior
- **Desktop:** 4 column stats grid.
- **Mobile:** 2 column stats grid.
