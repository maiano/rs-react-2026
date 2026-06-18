# Galactic Archive

Next.js + TypeScript application for searching Star Wars characters.

The app was migrated from a Vite/React Router SPA to **Next.js App Router**. The main search page and character details are rendered on the server, while small interactive parts like theme switching, language switching, item selection, and CSV download controls stay on the client.

## What Is Implemented

- Next.js App Router with localized routes
- `next-intl` internationalization: English and Russian
- Shared layout with header, theme switcher, and language switcher
- Server-rendered character search results
- Server-rendered character details panel at `/[locale]/characters/[detailsId]`
- Static About page at `/[locale]/about`
- Localized 404 page
- Selected character state with Zustand
- Server-side CSV generation via `/api/selected-items/csv`
- Tailwind CSS v4 through PostCSS

## Routes

```text
/en
/ru
/en/characters?page=1
/en/characters/[detailsId]?page=1
/en/about
/api/selected-items/csv
```

`/` redirects to the default locale.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Checks

Type-check:

```bash
npx tsc --noEmit
```

Lint:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Build:

```bash
npm run build
```

## Notes For Reviewers

- API data is not translated; only UI and navigation text are localized.
- Character search and details use server-side `fetch` with `cache: 'no-store'`.
- The About page is statically generated.
- CSV content is compiled on the server.
