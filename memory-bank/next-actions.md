# Next Actions

## Portfolio Readiness

1. Expand README
   - Add project overview with live demo URL, screenshots, and key user flows.
   - Document core architecture: React Router, React Query, Jotai, Supabase, WebSocket data flow.
   - Highlight implementation decisions for real-time ranking, stock detail, and order form state.
   - Add troubleshooting notes and measurable outcomes from the project.

2. Add test setup
   - Add a `test` script and install/configure Vitest if the project will keep claiming Vitest support.
   - Cover ranking rendering, order input calculations, and WebSocket message handling.
   - Add CI-friendly commands for lint, test, and build.

3. Harden Supabase functions
   - Review Edge Functions outside the frontend build path.
   - Remove sensitive logs and replace ad-hoc response typing with explicit response contracts.
   - Verify function-level error handling, CORS responses, and required environment variables.

4. Improve responsive behavior
   - Decide whether the clone targets desktop only or supports mobile/tablet.
   - If desktop only, state that constraint clearly in README.
   - If responsive, replace fixed minimum widths with adaptive layouts for home and stock detail pages.

5. Prepare demo assets
   - Record short GIFs or screenshots for ranking, stock detail, and order form flows.
   - Add a seed/demo data note so reviewers can understand what they are seeing.
   - Confirm public environment variables and secret handling before publishing.

6. Optimize bundle
   - Investigate the Vite chunk size warning.
   - Consider route-level lazy loading for auth, home, and stock detail pages.
   - Split heavy chart/widget dependencies if they are not needed on first load.

## Recently Completed

- Fixed current ESLint failures.
- Confirmed `./node_modules/.bin/eslint .` passes.
- Confirmed `npm run build` passes with only the existing Vite chunk size warning.
