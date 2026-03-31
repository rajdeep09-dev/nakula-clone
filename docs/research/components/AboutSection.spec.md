# AboutSection Specification

## Overview
- **Target file:** `src/components/AboutSection.tsx`
- **Interaction model:** scroll-driven (text highlight)

## DOM Structure
- `section` (Relative, h-[200vh])
  - `div` (Sticky, top-0, h-screen, flex, items-center, justify-center)
    - `div` (Max-width container)
      - `p` ("(ABOUT)")
      - `h2` (Large text with staggered highlights)

## Computed Styles (exact values from getComputedStyle)

### Section
- height: 200vh
- backgroundColor: #0A0A0A

### Large Text (h2)
- fontSize: 40px md:60px
- fontWeight: 600
- fontFamily: Geist
- lineHeight: 1.1
- letterSpacing: -0.04em
- color: #555555 (muted initial state)

## States & Behaviors

### Scroll Highlight
- **Trigger:** scroll progress through the 200vh section.
- **Animation:** words transition from #555555 to #CACACA (or white) as they enter the viewport "sweet spot".
- **Implementation:** use `framer-motion` `useScroll` and `useTransform`.

## Text Content (verbatim)
- "(ABOUT)"
- "We combines years of web design and branding expertise to craft meaningful, story-driven experiences."

## Responsive Behavior
- **Desktop (1440px):** large text, centered.
- **Mobile (390px):** text size ~32px, padding 20px.
