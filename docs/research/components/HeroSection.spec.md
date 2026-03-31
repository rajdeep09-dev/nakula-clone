# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Interaction model:** static / scroll-driven reveal

## DOM Structure
- `section` (Relative, overflow-hidden, h-screen)
  - `video` (Absolute, inset-0, object-cover, z-0)
  - `div` (Overlay, Absolute, inset-0, bg-black/20, z-10)
  - `div` (Content, Relative, z-20, flex, col, justify-end, items-end, p-10)
    - `h1` ("Beyond Visuals. Built with Vision.")
    - `p` ("We build brands, websites, and digital experiences with intention, clarity and care.")

## Computed Styles (exact values from getComputedStyle)

### Container (section)
- height: 100vh
- width: 100%
- position: relative
- display: flex
- flexDirection: column
- justifyContent: flex-end
- alignItems: flex-end
- padding: 40px

### Heading (h1)
- fontSize: 80px (approx based on Anton style)
- fontWeight: 400
- fontFamily: Anton
- lineHeight: 1
- textAlign: right
- color: #FFFFFF
- textTransform: uppercase

### Subtext (p)
- fontSize: 24px
- fontWeight: 600
- fontFamily: Geist
- lineHeight: 1.2
- textAlign: right
- color: #CACACA
- maxWidth: 500px

## States & Behaviors

### Entrance animation
- **Trigger:** page load
- **Animation:** Staggered fade-in and slide-up for characters/words.
- **Library:** Framer Motion

## Assets
- Background video: `public/videos/Qc6dhglAiYjaI04EEF5RsqHBU.mp4`

## Text Content (verbatim)
- "Beyond Visuals. Built with Vision."
- "We build brands, websites, and digital experiences with intention, clarity and care."

## Responsive Behavior
- **Desktop (1440px):** full screen, large typography
- **Mobile (390px):** font size reduces to ~40px, padding reduces to 20px.
