# Portfolio Website

A reusable Vite + React + TypeScript portfolio template. Fork it, replace the placeholder content, and optionally wire Firebase Firestore so work/experience/skills can update without redeploying the site.

Live personal site that inspired this template: keep private. This repo is the public starter.

## Quick start

Requires Node 24 (see `.nvmrc`).

```bash
npm ci
npm run dev
```

Edit placeholder copy in `src/content.ts`. Swap icons under `public/`. Update SEO strings in `index.html`, `public/sitemap.xml`, and `public/site.webmanifest`.

## Optional Firebase content

The app boots from bundled `src/content.ts`. If Firebase env vars are set, it reads `portfolio/published` from Firestore and caches it in `localStorage` for 7 days.

```bash
cp .env.example .env.local
# fill VITE_FIREBASE_* from your Firebase web app config
```

Publish rules/indexes with your own Firebase project (do not reuse someone else's):

```bash
firebase use your-project-id
npm run deploy
```

Reseed from bundled defaults (needs Application Default Credentials):

```bash
GOOGLE_CLOUD_PROJECT=your-project-id npm run seed:content
```

Force browsers to refetch with `?refresh=1`.

## Quality gates

```bash
npm ci
npm run lint:prod
npm run typecheck
npm run test:coverage
npm run build
```

CI runs lint, typecheck, coverage, build, OSV, and Semgrep. Deploy stays manual.

## Customize checklist

1. Replace Alex Rivera placeholders with your name and links
2. Rewrite work, experience, skills, and about
3. Drop your mark into `public/mark.png` and regenerate OG/favicons
4. Point canonical/OG URLs at your domain
5. Optional: create Firestore `portfolio/published` and deploy rules
