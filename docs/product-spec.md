# Portfolio Hub — Product Plan & Specification

## 1. Product goal

Portfolio Hub is a compact, recruiter-facing website that explains Seongjoo Kim's engineering background and provides direct access to verified work. It should communicate a continuous career path from graphics kernels through real-time platform products to browser-based 3D CAD/CAM.

## 2. Primary audience

- Hiring managers evaluating frontend, graphics, platform, or data-visualization experience
- Engineers reviewing implementation depth and public portfolio evidence
- Recruiters who need a concise career overview before opening detailed projects

## 3. Information architecture

The site contains exactly three top-level tabs. Each tab must be addressable by URL hash and operable with mouse and keyboard.

| Tab | Hash | Purpose |
|---|---|---|
| My Info | `#my-info` | Short professional introduction and career summary |
| Experience | `#experience` | Verified company history, contribution areas, and public product links |
| Portfolio | `#portfolio` | Confirmed portfolio projects with live and source links |

Unknown or empty hashes fall back to My Info. Left and right arrow keys move focus and selection between tabs.

## 4. Content requirements

### My Info

- Display the name `SEONGJOO KIM`.
- Use the headline `I build reliable 3D experiences and the systems behind them.`
- Summarize eight years of Web, Electron, 3D rendering, and authentication experience.
- Provide GitHub and Portfolio actions.

### Experience

- Display verified experience in reverse chronological order: ImagoWorks, TmaxCloud, TmaxA&C, TmaxOS.
- Each entry includes company, role, team, period, summary, and three capability areas.
- ImagoWorks includes public links only for products directly connected to the documented work:
  - Dentbird Modeler — `https://dentbird.com/products/dentbird-modeler`
  - Dentbird Batch — `https://dentbird.com/products/dentbird-batch`
- Product links open in a new tab and must not expose internal application URLs.

### Portfolio

- Display exactly the currently confirmed projects: Ray Tracing Scene Lab, Airspace Replay, and my linear.
- Each card includes a visual, description, technology summary, three capability notes, and appropriate live/source actions.
- Do not invent metrics, projects, employers, or deployment URLs.

## 5. Experience principles

- Preserve the compact three-tab structure instead of creating a long one-page site.
- Maintain the dark graphite, cool-white, cobalt-accent visual system.
- Avoid horizontal overflow at the supported mobile viewport.
- Use semantic tabs, headings, links, and visible keyboard focus.
- Keep ray tracing and Airspace Replay renderers paused/off unless a user explicitly starts them in their respective projects.
- Present my linear as a local-first Electron issue manager, including its IndexedDB, Kotlin Spring synchronization, and Google OIDC with PKCE boundaries.

## 6. Acceptance criteria

| ID | Requirement | Automated coverage |
|---|---|---|
| NAV-01 | Three tabs render in the specified order and update the URL hash | Product Spec + E2E |
| NAV-02 | Arrow-key navigation updates focus and selected panel | E2E |
| INFO-01 | My Info shows the approved headline and career summary | Product Spec + E2E |
| EXP-01 | Four verified career entries render in reverse chronological order | Product Spec + E2E |
| EXP-02 | Dentbird Modeler and Batch use official HTTPS product URLs | Product Spec + E2E |
| PORT-01 | Only the three confirmed portfolio projects render | Product Spec + E2E |
| RESP-01 | The Experience page has no horizontal overflow at 390×844 | E2E |
| RESP-02 | The Portfolio page has no horizontal overflow at 390×844 | E2E |
| HOST-01 | Production build emits the Sites client, server, and hosting files | Sites worker test |

## 7. Definition of done

A change is complete when the product contract test, production build, Sites worker tests, and Chromium E2E suite pass locally and in GitHub Actions. Pull requests that change contracted content must update this document and `docs/product-spec.json` in the same commit.
