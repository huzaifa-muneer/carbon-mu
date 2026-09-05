# CARBON μ

A ready-to-deploy Next.js and TypeScript educational website exploring subsurface carbon storage. Built with React Three Fiber, Three.js, Drei and Lucide. No API keys, database, paid services, or scientific compute are needed to run this prototype.

## Run locally

Install Node.js 22 LTS or later, then open a terminal in this folder:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To verify production:

```sh
npm test
npm run build
npm start
```

## Deploy to Vercel

1. Extract the project ZIP.
2. Create a GitHub repository and upload the contents of `carbon-mu` (including `app`, `components`, `lib`, `package.json`, `package-lock.json`, and `tsconfig.json`). Do not upload `node_modules` or `.next`.
3. In Vercel, choose **Add New → Project** and import the repository.
4. Framework preset: **Next.js**. If you uploaded the enclosing `carbon-mu` directory, choose it as the **Root Directory**; otherwise leave the root at the repository root.
5. Keep the default build command `npm run build` and default output directory. No environment variables are required. Click **Deploy**.

Alternatively, from this folder, run `npx vercel` and follow the account and project prompts, then `npx vercel --prod` when ready to publish.

Official reference: https://vercel.com/docs/frameworks/full-stack/nextjs

## Included

- Dark responsive landing page and instrument interface.
- Orbitable conceptual 3D reservoir, injection well, five transparent geological layers and a luminous CO₂ plume.
- Layer visibility, opacity and upper-layer removal controls.
- Saturation, pressure and uncertainty display palettes (not measured fields).
- Animated selectable sample particle trajectories with pause/resume.
- Digital Twin, Particle Lab, AI Twin, Detector Lab and conceptual Earth modes.
- Measurement switches that change illustrative uncertainty and information scores.
- Detector selection and position sliders in Detector Lab, shared depth/area and exposure settings.
- Deterministic placement heuristic, with improvement compared with the starting array.
- Experiment JSON export including inputs, outputs and provenance.
- Methodology dialog and WebGL error fallback.

## Scientific limits and data integration

**This is a synthetic educational prototype, not a validated digital twin of Sleipner.** No measured Sleipner dataset was supplied, so no real dataset is claimed or included. Geological geometry, particle IDs, trajectories, momenta and field colors are illustrative. The Earth is a conceptual graticule, not satellite imagery. AI Twin is an evidence/uncertainty demonstration, not a learned reconstruction. Detector optimization is a fixed geometry heuristic, not an AI optimizer.

The pure functions in `lib/model.mjs` are the replacement point for scientific results. The illustrative per-detector rate is `12 * area * exp(-depth / 270)`. Expected counts are rate × exposure. Sensor evidence and geometry coverage reduce a 70% synthetic prior uncertainty. The information score is illustrative and must not be reported as measured expected information gain.

For scientific use, run Geant4/EcoMug and reconstruction training separately; validate detector response, material density, units and uncertainty calibration. Export compact precomputed response tables with provenance, coordinate systems and units, replace `predict()` with a validated table lookup or surrogate, and replace procedural geometry with measured reservoir data. The browser should consume processed results; do not execute particle Monte Carlo jobs in ordinary web requests.

Controls update session state only. Reloading resets the experiment. Export JSON to preserve a configuration record; import is not implemented. Detector placement uses accessible coordinate sliders rather than 3D dragging. Camera orbit and zoom are mouse/touch controlled; configuration controls are keyboard accessible. The opening experience uses a direct entry button rather than a cinematic Earth-to-underground flight.

## Verification

`npm test` checks model relationships and supported parameter extremes. `npm run build` performs the production compilation and TypeScript validation. Browser interaction/visual testing has not been performed in this delivery. WebGL support is required for the 3D view. Google Fonts are optional and have system-font fallbacks.

An optional feature-detected WebMCP read tool (`read_carbon_experiment`) exposes the current synthetic experiment in browsers that support it. Its runtime registration was not verified because a supported WebMCP test context was not available. Ordinary browser use does not depend on this API.
