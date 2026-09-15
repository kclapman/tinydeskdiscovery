# Tiny Desk Discovery

An unofficial fan-made discovery site for NPR Tiny Desk performances — a taste-driven entry point, faceted browse, and performance detail pages that explain why each recommendation showed up. Everything is client-side and anonymous: taste and saves live in the browser, and a copyable link carries them.

## Stack

React + TypeScript + Vite, with React Router for real, linkable URLs (browse filters/sort/search all live in the query string; back/forward work).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

- `src/data/` — the mock catalog and facet/sort/related-scoring logic.
- `src/lib/` — app state (taste, saved, localStorage + share-link persistence) and small routing helpers.
- `src/components/` — shared UI (header, cards, filter rail, etc).
- `src/pages/` — the five screens: picker, home, browse, detail, saved.

## Known gaps vs. a real launch

- Thumbnails and the detail-page player are placeholders — the catalog has no YouTube video ID mapping yet. `Performance.videoId` is wired up so a real mapping slots in without further changes.
- Personnel credits are the mock catalog's placeholder text ("session player — guitar" etc.), not real credits.
