# Mighty Error Log: Parthh.in High-Fidelity Clone

This document tracks all critical errors, build failures, and deployment hurdles encountered during the development and deployment of the high-fidelity Next.js clone.

## 1. Environment & Build Errors

### SWC Binary Loading Failure
- **Error**: `⨯ Failed to load SWC binary for android/arm64`
- **Context**: Occurred during local `npm run build` on an Android/Termux environment.
- **Root Cause**: Next.js's Rust-based compiler (SWC) often lacks pre-compiled binaries for specific mobile architectures or requires manual installation of the `@next/swc-android-arm64` package.
- **Resolution**: Ignored for local development as long as `npx tsc --noEmit` passes, as Vercel uses a standard Linux environment where SWC is natively supported.

---

## 2. Vercel Build & Linting Failures

### Unused Imports (ESLint)
- **Error**: `Error: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars`
- **Context**: Vercel's default build command runs `next lint`, which treats warnings as errors and halts the build.
- **Resolution**: Surgically removed unused imports and variables across multiple components (e.g., `hero-ultra.tsx`, `skillset-ultra.tsx`, `dashboard-ultra.tsx`).

### JSX Parsing Errors (Unclosed Tags)
- **Error**: `Parsing error: JSX element 'Reveal' has no corresponding closing tag.`
- **Context**: Occurred in `dashboard-ultra.tsx` and `hero-ultra.tsx` after large code additions.
- **Root Cause**: Manual implementation of complex, high-density components (>500 lines) led to mismatched or missing closing tags for nested motion wrappers.
- **Resolution**: Meticulously reviewed file endings and nested structures to ensure every `div`, `Reveal`, and `section` was correctly closed.

---

## 3. Deployment & Routing (404 Issues)

### Deployment Completed but 404 NOT_FOUND
- **Error**: `404: NOT_FOUND (Code: NOT_FOUND)`
- **Context**: Build finished successfully on Vercel, but the preview URL showed a 404 for the root page.
- **Resolution**: 
    1. Added `vercel.json` with `"framework": "nextjs"` to force detection.
    2. Converted `next.config.mjs` to `next.config.js` using `module.exports` for maximum compatibility.

---

## 4. 3D & Third-Party Library Errors

### NPM ERESOLVE (React Version Conflict)
- **Error**: `npm error ERESOLVE unable to resolve dependency tree`
- **Context**: Occurred when installing `three` and `@react-three/fiber` in a project with `react@18.3.1`.
- **Root Cause**: Latest versions of `@react-three/fiber` expect React 19, while the project was initialized with React 18.
- **Resolution**: Used explicit versioning (`@react-three/fiber@8.17.10`) and `--legacy-peer-deps` to force compatible installations.

### R3F vs. SVG Namespace Conflict
- **Error**: `Type '...' is not assignable to type 'SVGLineElementAttributes<SVGLineElement>'`
- **Context**: In `ultra-globe.tsx`, the `<line>` component was misinterpreted as an SVG element by the compiler.
- **Root Cause**: TypeScript ambiguity when using standard HTML/SVG tag names inside a React Three Fiber scene without explicit casting or proper primitive usage.
- **Resolution**: Wrapped the 3D line geometry in a `<primitive object={new THREE.Line(geom)} />` to distinguish it from SVG elements.

### Implicit Any in Config Callbacks
- **Error**: `Parameter 'state' implicitly has an 'any' type.`
- **Context**: Occurred in `cobe` globe initialization inside `hero-ultra.tsx`.
- **Root Cause**: Third-party libraries without comprehensive `@types` packages often have implicit `any` in callback signatures.
- **Resolution**: Explicitly typed the parameter as `(state: Record<string, any>)` and used `// eslint-disable-next-line` where cast was unavoidable.

---

## 5. Import & Namespace Errors

### Duplicate Local Declarations
- **Error**: `Import declaration conflicts with local declaration of 'Lock'`
- **Context**: In `skillset-ultra.tsx`, `Lock` was both imported from `lucide-react` and defined as a local helper SVG function.
- **Resolution**: Removed the redundant local SVG functions in favor of the standardized Lucide icon imports.

---

## Summary of Resolution Strategy
1. **Linting**: Always run `npm run lint` locally before pushing to Vercel.
2. **Assets**: Prefer `curl` for direct asset mirroring to avoid MCP browser timeouts.
3. **Config**: Use explicit `vercel.json` configurations to avoid detection ambiguity.
4. **Refactoring**: After renaming core components, perform a global search (`grep`) to update all import references.
5. **Type Safety**: Strictly adhere to component prop definitions; use `npx tsc --noEmit` as the ultimate source of truth.
6. **3D Primitives**: Use `<primitive />` in R3F scenes to avoid HTML/SVG tag name collisions.
7. **Dependency Lock**: Force specific versions with `--legacy-peer-deps` when facing framework version mismatches (e.g., React 18 vs 19).
