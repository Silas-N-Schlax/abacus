# Roadmap / Coming Updates

Tracks what's planned and not yet built. See the PR roadmap in the project history for the
full sequencing; this is the short version for anyone skimming the repo.

## Now (v1 target)
- County rate table + rules registry (JSON, effective-dated)
- Money/rounding utilities matching NCDOR's method
- Taxable base + E-500 bucket computation
- Manual county entry UI *(visual design not yet started — see note below)*
- Disclaimers, NCDOR links, "rules last verified" date
- Square CSV upload + parsing
- E-536 county schedule + cross-foot check against E-500
- Restaurant profile: Line 7 lockout, local prepared-meals-tax warning
  **(open question — see note below)**

## Not designed yet
The UI (grids, layout, copy-button placement, source-CSV display) has not had a dedicated
design pass. Any layout that shows up in early commits is a working placeholder for wiring
the data through — not the intended look. A real design pass happens before the manual-entry
UI ships.

## Style guide
`dev_notes/style-guide.html` is a living style guide — raw HTML pulling Optics from the CDN
so it opens in a browser with no build step. It currently covers the theme (colors) and raw
Optics components. As real UI components get designed, add them here too, so this stays the
one place to see "what's themed and what a component looks like" as the project grows —
update it alongside `src/stylesheet/`, don't let it go stale.

## Open question: does Abacus compute the local prepared-meals tax, or just warn about it?

The original plan (see `znotes/MASTERPLAN.md`) called for **warn-only**: the 1% local
prepared-meals tax (Wake, Mecklenburg, Cumberland, Dare, some towns) is administered by the
locality, not NCDOR, isn't on the E-500 at all, and Abacus would just flag "you owe this
separately, we don't compute it."

That needs revisiting: for a food truck that's the whole reason it's tedious — they're
exactly the audience who owes this tax in multiple counties (e.g. Wake) and would benefit
most from it actually being calculated, not just flagged. Before building this:
- Confirm the actual per-jurisdiction filing/payment mechanism for the 1% tax (each
  county/town may have its own portal, form, and due date — unlike the unified NCDOR system).
- Decide whether "compute" means just showing the amount owed (still filed elsewhere
  manually) vs. actually integrating with each locality's process (likely out of scope).
- If we do compute it, it needs its own effective-dated jurisdiction table (which
  counties/towns, at what rate) — same pattern as the county sales tax table, but this one
  isn't published by NCDOR, so the source needs to be found per-jurisdiction.

## Later
- Additional business profiles beyond restaurants
- Additional POS adapters (Toast, Clover, Shopify)
- Save/load a return as JSON
- Support for prior E-500 form versions (pre July-2026)

## Last verified against NCDOR
2026-08-29
