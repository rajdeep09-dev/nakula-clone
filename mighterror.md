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
- **Error**: `Error: 'Reveal' is defined but never used. @typescript-eslint/no-unused-vars`
- **Error**: `Error: 'staggerItem' is defined but never used. @typescript-eslint/no-unused-vars`
- **Context**: Vercel's default build command runs `next lint`, which treats warnings as errors and halts the build.
- **Root Cause**: Cleaning up components or refactoring code left behind active imports that weren't utilized in the final JSX.
- **Resolution**: Surgically removed unused imports from `src/components/motion/background.tsx`, `src/components/sections/footer.tsx`, and `src/app/about/page.tsx`.

---

## 3. Deployment & Routing (404 Issues)

### Deployment Completed but 404 NOT_FOUND
- **Error**: `404: NOT_FOUND (Code: NOT_FOUND)`
- **Context**: Build finished successfully on Vercel, but the preview URL showed a 404 for the root page.
- **Root Cause**: Potential failure in Vercel's automatic framework detection or an issue with `.mjs` configuration files in certain Next.js versions.
- **Resolution**: 
    1. Added `vercel.json` with `"framework": "nextjs"` to force detection.
    2. Converted `next.config.mjs` to `next.config.js` using `module.exports` for maximum compatibility.
    3. Cleaned local `.next` cache before pushing.

---

## 4. Asset Acquisition Errors

### Browserless Download Timeout
- **Error**: `Download failed (status 408): Request has timed out`
- **Context**: Attempting to download the logo SVG directly from the live site via the MCP tool.
- **Root Cause**: Large assets or network restrictions on the target server preventing the headless browser from completing the buffer transfer within the timeout limit.
- **Resolution**: Used `run_shell_command` with `curl` to fetch assets directly, providing more robust control over the download process.

---

## 5. Dependency & Security Warnings

### Renamed Package Warning
- **Warning**: `@studio-freight/lenis` is renamed to `lenis`.
- **Impact**: Non-breaking, but potential for future support issues.
- **Resolution**: Maintained current version for compatibility with F12X skill requirements but noted for future migration.

### Security Vulnerabilities
- **Warning**: `next@14.2.15` and `glob` versions contain known vulnerabilities.
- **Impact**: Risk of security exploits in production.
- **Resolution**: Use `npm audit fix` where possible, or upgrade to Next.js 15+ if the architectural shift allows.

---

## 6. Import & Refactoring Errors

### Module Not Found after Renaming
- **Error**: `Module not found: Can't resolve '@/components/sections/navbar'`
- **Context**: Occurred after the Ultra-Premium upgrade where `navbar.tsx` was replaced by `ultra-nav.tsx`.
- **Root Cause**: Placeholder pages (`blogs`, `labs`, etc.) were still importing the old `Navbar` component which no longer existed in the file system.
- **Resolution**: Updated all placeholder page imports to use `UltraNav` instead of `Navbar`.

---

## 7. TypeScript Type Errors

### Invalid Component Prop Variant
- **Error**: `Type '"primary"' is not assignable to type '"default" | "secondary" | "outline" | "ghost" | "glass" | "neon" | undefined'`
- **Context**: Occurred in `src/components/sections/ultra-nav.tsx` when calling the `UltraButton` component.
- **Root Cause**: The `UltraButton` interface defines specific string literals for the `variant` prop (e.g., `"default"`, `"neon"`), but a non-existent `"primary"` variant was passed instead.
- **Resolution**: Changed the `variant` prop value from `"primary"` to `"default"` to align with the component's type definition.

---

## 8. ESLint vs. TypeScript Conflict

### Unused Variables from Prop Destructuring
- **Error**: `'onDrag' is assigned a value but never used. @typescript-eslint/no-unused-vars`
- **Context**: Occurred in `src/components/ui/premium-primitives.tsx` after attempting to fix TypeScript type conflicts by destructuring and omitting problematic props.
- **Root Cause**: While destructuring props like `onDrag` effectively removed them from the `safeProps` object (solving the TypeScript error), it created new variables in the scope that were never used, triggering ESLint's strict "no-unused-vars" rule.
- **Resolution**: Used a surgical `delete` operation on a cloned props object with type-casting to bypass both TypeScript conflicts and ESLint unused variable checks simultaneously.

---

## Summary of Resolution Strategy
1. **Linting**: Always run `npm run lint` locally before pushing to Vercel.
2. **Assets**: Prefer `curl` for direct asset mirroring.
3. **Config**: Use explicit `vercel.json` configurations to avoid detection ambiguity.
4. **Refactoring**: After renaming core components, perform a global search (`grep`) to update all import references.
5. **Type Safety**: Strictly adhere to component prop definitions; avoid using "common" variant names (like 'primary') if they aren't explicitly defined in the UI primitive.
6. **Prop Omitting**: When omitting props to solve type conflicts, avoid creating unused variables. Use the `delete` pattern or prefix with multiple underscores if the ESLint config allows.
