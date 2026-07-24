# Portfolio Website

Public starter for a personal portfolio. Fork it, replace the **Alex Rivera** placeholders, and ship your own site.

This is intentionally plain template copy. The good writing lives on private sites. Make it yours.

## Stack

- Vite 8 + React 19 + TypeScript
- Optional Firebase Firestore for content that changes without redeploying
- Node 24 (see `.nvmrc`)
- Optional Docker / nginx image for Dockge

## Quick start

```bash
npm ci
npm run dev
```

Open the local URL Vite prints (usually `http://127.0.0.1:5173`).

## Customize

| What | Where |
|------|--------|
| Name, bio, work, skills, experience, contact | `src/content.ts` |
| Section titles that are still hardcoded | `src/components/*.tsx` (Work, Skills, Experience, About, Contact, Nav) |
| SEO title / description / OG URLs | `index.html`, `public/sitemap.xml`, `public/site.webmanifest` |
| Mark, favicons, social image | `public/mark.png`, `public/og.png`, `public/favicon*` |
| Theme colors / layout | `src/styles.css`, `src/theme.ts` |
| Contact form endpoint | `src/components/Contact.tsx` (FormSubmit-style `fetch`) |

Checklist before you call it done:

1. Replace every `Alex Rivera` / `example.com` / `TODO` string
2. Rewrite project cards and experience bullets so they are real
3. Drop your logo into `public/mark.png` and refresh OG/favicons
4. Point canonical and Open Graph URLs at your domain
5. Optional: wire Firebase (below)

## Optional Firebase content

Without env vars, the app uses bundled `src/content.ts`.

```bash
cp .env.example .env.local
# fill VITE_FIREBASE_* from your Firebase web app settings
```

Document shape: Firestore `portfolio/published` (public read, client write denied).

```bash
firebase use your-project-id
npm run deploy                 # hosting + rules/indexes
GOOGLE_CLOUD_PROJECT=your-project-id npm run seed:content
```

Browsers cache remote content for 7 days. Force refresh with `?refresh=1`.

## Quality gates

```bash
npm ci
npm run lint:prod
npm run typecheck
npm run test:coverage
npm run build
```

GitHub Actions runs the same gates plus OSV and Semgrep. Deploy is not automatic.

## Docker / Dockge

Production-style static serve (multi-stage build → nginx):

```bash
docker compose up -d --build
```

Default compose binds Tailscale on fsb-03 at `100.64.0.7:8091`. Change the host port in `compose.yaml` if that slot is taken, and update the lab port registry.

FSB live stack path: `/opt/stacks/portfolio-website`  
Public hostname: `https://portfolio.fullstackboston.com`

## License

See `LICENSE`.
