# AGENTS.md

Guidance for any AI coding agent (Claude Code, Codex, Cursor, etc.) working in this repo.
This file is the single source of truth — tool-specific files (e.g. `CLAUDE.md`) just point
here so there's nothing to keep in sync across tools.

**Keep this file under 200 lines.** If it's growing past that, cut detail rather than let it
sprawl — link out to `dev_notes/` for anything that needs more room than a note here.

## What this is

Abacus is a no-server, all-frontend tool that takes a Square POS sales report and computes
the county-split sales tax math for North Carolina's Form E-500 / E-536, so the numbers can
be copied into NCDOR's online filing app. **It computes and formats — it is not a tax
service** and never talks to a server; everything runs client-side.

## Commands

```sh
npm install
npm run dev         # Vite dev server
npm run build        # production build to dist/
npm run preview      # preview the production build
npm run lint          # eslint .
npm test              # vitest run (single pass, CI mode)
npm run test:watch    # vitest watch mode
npm run test:ui       # vitest with the browser UI
```

Run a single test file: `npx vitest run test/components/app.test.jsx`
Run tests matching a name: `npx vitest run -t "mounts and shows"`

There is no separate `vitest.config.js` — Vitest is configured inside the `test` block of
`vite.config.js` so the app and test runner always share one Vite pipeline.

## Conventions (deliberate, not defaults — don't "fix" these)

- **React class components**, not function components/hooks. This is an explicit project
  choice, not an oversight.
- **BEM** CSS naming (`block__element--modifier`) throughout `src/stylesheet/`.
- **`@rolemodel/optics`** is installed via npm and imported from
  `@rolemodel/optics/dist/css/optics.css` in `src/stylesheet/styles.css` — never via CDN in
  the built app. `dev_notes/style-guide.html` is the one deliberate exception: it loads
  Optics from jsDelivr on purpose, so it opens in a browser with zero build step.
- **TDD**: tests are written before implementation. Domain logic (once it exists — see
  below) must be unit-testable in complete isolation from React.
- Theme colors are edited in `src/stylesheet/theme/_theme.css` as `--op-color-*-h/-s/-l`
  triplets (Optics' HSL-token system), **not** as literal hex values anywhere else. Note:
  Optics' built-in component scale (buttons, badges, navbar, etc.) hardcodes its own
  lightness per shade step — only hue and saturation actually flow through from the theme
  override for those built-in components.
- Keep `dev_notes/style-guide.html`'s inline `:root` theme block in sync by hand with
  `src/stylesheet/theme/_theme.css` — there's no build step linking them.

## Architecture (planned — most of this does not exist yet)

The domain math is not implemented yet (still pre-PR-1 as of this writing); this is the
intended shape from `dev_notes/ROADMAP.md`, worth knowing before adding code so it lands in
the right place:

- **`src/js/`** will hold all tax-calculation logic as plain ES modules with **zero React
  imports** — pure functions over plain objects, so they're unit-testable standalone.
- **County rates and form-line definitions are data (JSON), not code**, and are
  **effective-dated** by filing period (NC's E-500 form and county rates both change on
  statutory dates — most recently July 2026). A rate change should be a data diff, not a
  logic change.
- **Money is integer cents**, never floats. Tax is computed from the *summed bucket amount ×
  rate*, then rounded half-up to the cent — matching NCDOR's method. Per-county tax must
  never be computed and summed separately; that drifts by pennies from the official figure.
- The **taxable base is derived** (pre-tax net sales + mandatory service charges, less
  discounts/refunds) — a POS's own reported tax figure is a cross-check against the computed
  tax, within an explicit tolerance, never the source of truth.
- Output has two forms that must reconcile: the **E-536** per-county schedule and the
  **E-500** rate-bucket lines (one county's sales can land on several E-500 lines at once).

## UI is not designed yet

Nothing in the repo's current markup/CSS (including `dev_notes/style-guide.html`) is a
finished screen design — it's scaffolding and a live theme/component reference. Don't treat
any existing layout as a spec to extend; a dedicated design pass happens before the real
manual-entry UI ships (see `dev_notes/ROADMAP.md`).

## Repo hygiene

- `dev_notes/` — **committed**, shared dev reference: the living style guide and the
  roadmap. Keep it current as things change.
- `znotes/` — **personal and gitignored** (via the repo owner's global gitignore). It will
  not exist in a fresh clone or for other contributors — never assume it's there or rely on
  its contents.
- `main` is protected: PRs require the `CI` check (lint + test + build) to pass and one
  approving review, with `CODEOWNERS` auto-requesting the repo owner as reviewer.
