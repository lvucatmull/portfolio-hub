# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Active design decisions

- Use a compact three-tab structure: `My Info`, `Experience`, and `Portfolio`. Do not turn it into one long scrolling page.
- Match the selected dark graphite mockup with cool-white type, cobalt-blue accents, thin technical borders, and compact typography.
- Keep each tab within one desktop viewport when practical and preserve a clean mobile stack.
- Portfolio entries are compact cards within the Portfolio tab. The confirmed entries are `Ray Tracing Scene Lab`, `Airspace Replay`, `my linear`, and `Taedong (테동)`; do not invent employers, dates, metrics, or additional projects.
- Present Taedong as an Expo/React Native tennis community with native maps, NTRP-based partner and club discovery, meetup creation, and a Node.js API. Do not add a public source or live link until the repository is published.
- Airspace Replay lives in its own sibling project repository. Its default playback and idle renderer remain paused/off unless the user explicitly starts it.
- Treat `docs/product-spec.md` and `docs/product-spec.json` as the product contract. Update both when navigation, confirmed experience, product links, or portfolio entries change.
- Keep the GitHub quality workflow green: product-spec contract tests, production build, Sites worker tests, and Chromium E2E must all pass.
- After a requested Portfolio Hub change is implemented and verified, commit it and push the current branch without waiting for a separate push request.
