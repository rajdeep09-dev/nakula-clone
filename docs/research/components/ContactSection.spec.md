# ContactSection Specification

## Overview
- **Target file:** `src/components/ContactSection.tsx`
- **Interaction model:** static / reveal animations

## DOM Structure
- `section` (Relative, py-32)
  - `div` (Max-width container)
    - `h2` ("LET'S WORK TOGETHER" - Anton)
    - `p` (Description)
    - `button` ("GET IN TOUCH")

## Computed Styles (exact values from getComputedStyle)

### Heading (h2)
- fontSize: 80px md:150px
- fontFamily: Anton
- textTransform: uppercase
- color: #CACACA
- lineHeight: 0.8
- marginBottom: 40px

### Description (p)
- fontSize: 24px
- color: #555555
- maxWidth: 600px
- marginBottom: 60px

## States & Behaviors

### Button Hover
- **Trigger:** hover
- **Change:** background shifts to primary, text to white.

## Text Content (verbatim)
- "LET’S WORK TOGETHER"
- "Have a project in mind? We’d love to hear about it. Let’s create something great together!"
- "GET IN TOUCH"

## Responsive Behavior
- **Desktop:** large typography, centered.
- **Mobile:** font size ~60px.
