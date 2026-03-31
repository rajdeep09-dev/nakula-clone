# WorkSection Specification

## Overview
- **Target file:** `src/components/WorkSection.tsx`
- **Interaction model:** static grid / hover effects

## DOM Structure
- `section` (Relative, p-10)
  - `h2` ("Latest work" - Anton font)
  - `div` (Grid container)
    - `ProjectCard` (repeating items)

## Computed Styles (exact values from getComputedStyle)

### Container (section)
- backgroundColor: #0A0A0A
- padding: 80px 40px

### Heading (h2)
- fontSize: 120px md:180px
- fontFamily: Anton
- textTransform: uppercase
- color: #FFFFFF
- lineHeight: 0.8
- marginBottom: 60px

### ProjectCard
- borderRadius: 24px
- overflow: hidden
- backgroundColor: #141414
- transition: all 0.5s ease

## States & Behaviors

### Project Hover
- **Trigger:** hover
- **Change:** image scales slightly (1.05), border glow or shadow increases.
- **Implementation:** `framer-motion` `whileHover={{ scale: 1.02 }}` on the card and scale on the image.

## Text Content (verbatim)
- "Latest work"
- Projects: Arjuna, Bima, Mandala.

## Responsive Behavior
- **Desktop (1440px):** 2 or 3 column grid.
- **Mobile (390px):** 1 column grid, font size ~60px.
