# One More Round

A responsive React app that helps a group choose a tabletop game they can play tonight. Set the group size, time budget, teaching allowance, and each person's mood; get explainable matches, choose a game, and share the plan.

**Live app:** https://one-more-round-ebon.vercel.app · **Public source:** https://github.com/sameerkhoja/one-more-round

## Run locally

Node 22 and npm are required.

```sh
npm ci
npm run dev
```

Open http://localhost:5180. No environment variables, database, API keys, or accounts are needed.

```sh
npm run check         # Matching invariants and production build
npm run test:browser  # Run with the local server and Google Chrome available
npm run preview      # Serve an existing production build
```

For hosted checks: `BASE_URL=https://YOUR-DEPLOYMENT npm run test:browser`.

## Features

- Eight curated tabletop games with publisher links and original decorative SVG illustrations.
- Strict player-count, duration, brainpower, and optional owned-game filters.
- Separate learning allowance so a short play duration doesn't hide teaching time.
- One equally weighted mood selection per player. Preference matches rank first; shorter sessions break ties.
- Persistent personal shelf and selected game using local storage.
- A session plan, including teaching, play time, and remaining time.
- Shareable URL snapshots that open correctly on another device without a server or account.
- Empty-state recovery, bounded input normalization, accessible native dialogs, and reduced-motion support.

## Scope and limitations

This is a working planning app, not a game host. Users need access to the physical games. The catalogue is curated and stored in the source; it does not search a live games service or represent store inventory. Publisher counts and durations are sourced; moods, teaching time, and brainpower are editorial estimates. The Crew timing is one mission/session, not the full campaign. Other games refer to one game/session, as explained in their detail panels.

Preferences and shelves stay in this browser. A share link includes a snapshot of the choices and selected game, but isn't a synchronized multiplayer room. No application analytics are installed; Vercel may keep ordinary hosting request logs. The app handles unavailable or malformed local storage without crashing.

## Implementation

React 19 + Vite, Lucide icons, locally bundled DM Sans and Space Grotesk fonts. Vercel hosts the static build. Wecapp informed the React/Vite workflow, browser testing, and Vercel deployment approach; this app is an independent implementation with no copied backend, credentials, data, or repository history. A server is unnecessary for the core experience.

Matching and share-state logic lives in `src/catalog.mjs`; UI and styles are in `src/main.jsx` and `src/style.css`. Original vector illustrations are in `src/Art.jsx`.

Research notes and data references: [docs/RESEARCH.md](docs/RESEARCH.md). Browser screenshots: [desktop](docs/desktop.png), [phone](docs/phone.png), [night plan](docs/night-plan.png).

## Deployment

Published to Vercel with the CLI. GitHub Actions runs the automated checks on every push. Vercel’s GitHub app connection was unavailable, so automatic deployment on push is not configured; redeploy with the Vercel CLI from this project.
