## Goals
1. Brand the app as part of **Arindam Pal's** portfolio.
2. Bring in the animation language from the "Arindam's AWS Showcase" project (float, pulse-glow, animated data-flow lines, gradient text, grid background).
3. Replace the generic `lucide-react` icons in the Deployment Flow diagram with proper AWS service logos for ECS, EC2, ECR (plus IAM, CloudWatch).

## Changes

### 1. `src/styles.css` — animation utilities
Add the same utility layer used in the reference project:
- `@keyframes float`, `pulse-glow`, `data-flow`
- `.animate-float`, `.animate-pulse-glow`, `.animate-data-flow`
- `.text-gradient` (orange gradient clip), `.grid-bg` (subtle orange grid), `.shadow-glow`
- Reuse the existing black/orange tokens (no palette change).

### 2. Header & Hero — `src/routes/index.tsx`
- Header brand: replace "Ember" with **"Arindam Pal"** + a small "Portfolio" tag. Keep the flame icon.
- Add a `.grid-bg` layer behind the hero and a soft radial glow.
- Hero heading: keep current copy but apply `.text-gradient` to the highlighted word; add a subtitle line **"A project by Arindam Pal"**.
- Animate hero entrance with `animate-fade-in` (already available via tw-animate-css) and a floating flame badge using `animate-float`.
- Footer: change to `© {year} Arindam Pal · Built with Node + Docker`.

### 3. Deployment Flow diagram — `src/components/DeploymentDiagram.tsx`
- Replace lucide icons with real AWS service marks rendered as inline SVG components (no network calls, no new deps):
  - **EC2** — orange square with the white EC2 chip glyph
  - **ECR** — orange square with the container-registry glyph
  - **ECS** — orange square with the hexagonal ECS glyph
  - **IAM** — red square with the IAM shield-key glyph
  - **CloudWatch** — pink/magenta square with the CloudWatch chart glyph
  - **Docker** — official Docker whale (blue-on-transparent)
  - **GitHub** — keep the lucide GitHub mark (it's already accurate)
- Each AWS tile renders inside a rounded square that matches AWS's "Resource icon" style (solid color + white glyph).
- Apply `animate-float` to the service tiles (staggered via inline `animationDelay`) and `animate-pulse-glow` to the ECR/ECS tiles to highlight the push/pull path.
- Convert the SVG connecting lines to `animate-data-flow` (dashed orange strokes flowing in the direction of the arrow) so the diagram visibly "moves" like the reference project's AWS diagram.
- Keep the same node layout and edge labels (`code pull`, `image build`, `image push`, `image pull`, `logs`).

### 4. Page meta — `src/routes/index.tsx` `head()`
- Title: `Arindam Pal — Node.js on AWS ECS`
- Description / og:title / og:description updated to mention Arindam Pal's portfolio.

## Technical notes
- AWS logos will be small self-contained React components (inline SVG paths) inside `src/components/aws-icons.tsx` so the diagram stays dependency-free and fully themeable.
- Animations are pure CSS keyframes added to `src/styles.css` — no Framer Motion / GSAP install needed.
- No changes to the todo logic, Dockerfile, or DEPLOY.md.

## Out of scope
- No new pages or routes.
- No backend / DB.
- No changes to the build or deploy pipeline.
