# Research and product decisions

Researched September 14, 2026.

## Comparable product

[Which Board Game?](https://whichboardgame.com/) already offers a large BoardGameGeek-backed catalogue with player, time, and difficulty filters. This app deliberately narrows the core experience to a small table's evening: each person picks a mood, teaching time is budgeted separately, and the final selection becomes a shareable plan. This is a product focus, not a claim of uniqueness.

## Data sources

- [Codenames, CGE](https://www.czechgames.com/for-press-games/codenames): standard team word game; 15-minute play estimate. We support the standard team experience for 4–8 players, not every optional variant.
- [Sushi Go!, Gamewright](https://www.gamewright.com/product/Sushi-Go): 2–5 players, 15 minutes; original game, not Party.
- [Just One, Repos](https://www.rprod.com/en/games/just-one): 3–7 players, 20 minutes.
- [The Crew, Thames & Kosmos](https://thamesandkosmos.com/products/the-crew) and [publisher demo sheet](https://www.thamesandkosmos.com/downloads/The_Crew_Demo_Sheet.pdf): 3–5 players, 20 minutes; a mission/session, not all 50 missions. Two-player variant excluded.
- [Cascadia, AEG](https://www.alderac.com/cascadia/): base game 1–4 players, 45 minutes. This planner focuses on groups of 2–8.
- [Forbidden Island, Gamewright](https://gamewright.com/product/Forbidden-island): 2–4 players, 30 minutes.
- [Azul, Next Move](https://www.nextmove-games.com/) and [Asmodee catalogue](https://www.asmodeena.com/TGCatalog2025-August.pdf): base game 2–4 players; planner allows 45 minutes.
- [Wavelength, CMYK](https://www.cmyk.games/products/wavelength): social guessing with team and small-group options. Planner limits the group to eight and uses an editorial 45-minute session allowance.

Teaching allowances (5–10 minutes), mood labels and brainpower are editorial estimates, not publisher guarantees. Durations are estimates; a group's pace can exceed them. No official box art is copied. The app's SVG art is decorative and original.

## Technical reference

[React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) informed the single source of truth for filters, shelf, and plan. Recommendations are derived rather than stored separately. URLs and persisted data are normalized through the same bounded schema before use.

## Verification

Eight automated test cases exercise the matching constraints over every supported player count, budget, learning toggle, and effort setting; equal mood weighting; exact time boundaries; shelf restrictions; malformed shared data; share round trips; and player-count changes.

The browser check covers group ranking, shelf persistence, confirmed plan persistence, sharing to a new browser context, no-match states, bounds, keyboard dismissal, a 390px phone layout, and blocked local storage. Hosted verification uses the same test after deployment. See the daily progress record outside this repository for publication status.
