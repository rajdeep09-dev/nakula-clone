# ServicesSection Specification

## Overview
- **Target file:** `src/components/ServicesSection.tsx`
- **Interaction model:** hover-driven list / accordion

## DOM Structure
- `section` (Relative, py-24)
  - `div` (Max-width container)
    - `h2` ("HOW WE CAN HELP" - Anton)
    - `div` (Services list)
      - `ServiceItem` (repeating items)

## Computed Styles (exact values from getComputedStyle)

### Heading (h2)
- fontSize: 80px md:120px
- fontFamily: Anton
- textTransform: uppercase
- color: #CACACA
- marginBottom: 80px

### ServiceItem
- borderTop: 1px solid #222222
- padding: 40px 0
- cursor: pointer
- transition: all 0.3s ease

### Service Number (h3)
- fontSize: 24px
- color: #555555 (muted)
- fontFamily: Geist

### Service Title (h3)
- fontSize: 32px md:48px
- color: #FFFFFF
- fontFamily: Geist
- fontWeight: 600

## States & Behaviors

### Service Hover
- **Trigger:** hover
- **Change:** background might shift to a darker gray or primary accent might appear (the dot is primary color).
- **Implementation:** `framer-motion` `whileHover`

## Text Content (verbatim)
- "HOW WE CAN HELP"
- "Web Design & Development", "Branding", "Social Media", "Motion Design"

## Responsive Behavior
- **Desktop:** horizontal layout for number and title.
- **Mobile:** stacked layout, smaller font sizes.
