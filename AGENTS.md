# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.github/workflows/pages.yml`, the `build:pages` script, and the `/portfolio-hub/` asset base aligned so GitHub Pages remains the only production deployment.

## Active design decisions

- Use a compact three-tab structure: `My Info`, `Experience`, and `Portfolio`. Do not turn it into one long scrolling page.
- Match the selected dark graphite mockup with cool-white type, cobalt-blue accents, thin technical borders, and compact typography.
- Keep each tab within one desktop viewport when practical and preserve a clean mobile stack.
- Portfolio entries are compact cards within the Portfolio tab. The confirmed entries are `Ray Tracing Scene Lab`, `Airspace Replay`, `my linear`, `Observability Platform`, and `Vertex Studio CAD`; do not invent employers, dates, metrics, or additional projects.
- Replace live-preview/view actions on every portfolio card with an embedded `Product overview` dialog. The dialog explains the user problem, product journey, core capabilities, implementation evidence, and honest boundaries; it is a product story, not an architecture document. Keep public source-code links as secondary actions only when the repository is published.
- All five confirmed project repositories are public. Every portfolio card must retain its verified `https://github.com/lvucatmull/...` Source code action, including Observability Platform.
- The Portfolio Hub repository is public and deploys only the Hub to GitHub Pages from `main` at `https://lvucatmull.github.io/portfolio-hub/`. Preserve the Pages-specific `/portfolio-hub/` asset base and do not deploy linked projects from this repository.
- Airspace Replay lives in its own sibling project repository. Its default playback and idle renderer remain paused/off unless the user explicitly starts it.
- Treat `docs/product-spec.md` and `docs/product-spec.json` as the product contract. Update both when navigation, confirmed experience, product links, or portfolio entries change.
- Keep the GitHub quality workflow green: product-spec contract tests, production build, GitHub Pages build, and Chromium E2E must all pass.
- After a requested Portfolio Hub change is implemented and verified, commit it and push the current branch without waiting for a separate push request.
