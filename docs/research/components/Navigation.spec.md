# Navigation Specification

## Overview
- **Target file:** `src/components/Navigation.tsx`
- **Interaction model:** static (fixed overlay)

## DOM Structure
- `nav` (Fixed, top-0, left-0, width-full, z-50)
  - `div` (Logo container)
    - `NakulaLogo` (from icons.tsx)
  - `div` (Button container)
    - `button` ("LET'S TALK")

## Computed Styles (exact values from getComputedStyle)

### Container (nav)
- display: flex
- flexDirection: row
- justifyContent: space-between
- alignItems: center
- padding: 16px 40px
- height: 75px
- backgroundColor: transparent
- position: fixed
- top: 0
- left: 0
- width: 100%
- zIndex: 50

### Button ("LET'S TALK")
- backgroundColor: #1A1A1A (approx from dark palette)
- color: #CACACA
- borderRadius: 1000px
- padding: 12px 24px
- fontSize: 14px
- fontWeight: 700
- fontFamily: Geist
- border: 1px solid #333333
- transition: all 0.3s ease

## States & Behaviors

### Hover state (Button)
- **Trigger:** hover
- **Change:** backgroundColor: #333333, color: #FFFFFF
- **Transition:** transition: all 0.3s ease

## Assets
- Logo: `NakulaLogo` from `src/components/icons.tsx`

## Text Content (verbatim)
- "LET'S TALK"

## Responsive Behavior
- **Desktop (1440px):** standard flex layout
- **Mobile (390px):** padding reduces to 16px, logo size might adjust.
