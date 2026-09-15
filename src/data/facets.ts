import { MOODS, type Performance } from './catalog';

export type FacetKey = 'genre' | 'mood' | 'instr' | 'ens' | 'region' | 'decade' | 'rt';

export type Filters = Record<FacetKey, string[]>;

export const EMPTY_FILTERS: Filters = {
  genre: [],
  mood: [],
  instr: [],
  ens: [],
  region: [],
  decade: [],
  rt: [],
};

export const GENRES = ['hip-hop', 'indie rock', 'jazz', 'soul', 'Latin', 'country', 'classical'];
export const INSTR = ['vocals', 'piano', 'keys', 'guitar', 'bass', 'drums', 'horns', 'strings', 'percussion'];
export const REGIONS = ['US', 'UK', 'Canada', 'Mexico', 'Colombia'];
export const ENSEMBLES = ['solo', 'band'];
export const DECADES = ['2010s', '2020s'];
export const RUNTIMES = ['Under 15 min', '15–20 min', 'Over 20 min'];

export type SortKey = 'relevance' | 'newest' | 'oldest' | 'popular' | 'shortest';

export const SORTS: { v: SortKey; label: string }[] = [
  { v: 'relevance', label: 'Relevance' },
  { v: 'newest', label: 'Newest' },
  { v: 'oldest', label: 'Oldest' },
  { v: 'popular', label: 'Most loved' },
  { v: 'shortest', label: 'Shortest' },
];

interface FacetDef {
  key: FacetKey;
  title: string;
  opts: string[];
  get: (p: Performance) => string[];
}

export const FACET_DEFS: FacetDef[] = [
  { key: 'genre', title: 'Genre', opts: GENRES, get: (p) => [p.genre] },
  { key: 'mood', title: 'Mood / energy', opts: MOODS.slice(0, 8), get: (p) => p.moods },
  { key: 'instr', title: 'Instrumentation', opts: INSTR, get: (p) => p.instr },
  { key: 'ens', title: 'Solo or full band', opts: ENSEMBLES, get: (p) => [p.ens] },
  { key: 'region', title: 'Language / region', opts: REGIONS, get: (p) => [p.region] },
  { key: 'decade', title: 'Decade', opts: DECADES, get: (p) => [p.decade] },
  { key: 'rt', title: 'Runtime', opts: RUNTIMES, get: (p) => [p.rt] },
];

export function facetOptionLabel(key: FacetKey, opt: string): string {
  if (key === 'ens') return opt === 'solo' ? 'Solo' : 'Full band';
  return opt;
}

export function toggleIn(list: string[], v: string): string[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export function filterItems(items: Performance[], filters: Filters, query: string): Performance[] {
  const q = (query || '').trim().toLowerCase();
  return items.filter((p) => {
    for (const f of FACET_DEFS) {
      const sel = filters[f.key];
      if (!sel.length) continue;
      const vals = f.get(p);
      if (!sel.some((s) => vals.includes(s))) return false;
    }
    if (!q) return true;
    const hay = `${p.artist} ${p.genre} ${p.sub} ${p.instr.join(' ')} ${p.moods.join(' ')} ${p.setlist.join(' ')}`.toLowerCase();
    return hay.includes(q);
  });
}

export function sortItems(items: Performance[], sort: SortKey): Performance[] {
  const a = items.slice();
  if (sort === 'newest') a.sort((x, y) => y.added - x.added);
  else if (sort === 'oldest') a.sort((x, y) => x.year - y.year);
  else if (sort === 'popular') a.sort((x, y) => y.loves - x.loves);
  else if (sort === 'shortest') a.sort((x, y) => x.mins - y.mins);
  return a;
}

export interface ActiveFilterPair {
  key: FacetKey | '__q';
  val: string;
}

export function activePairs(filters: Filters, query: string): ActiveFilterPair[] {
  const pairs: ActiveFilterPair[] = [];
  for (const f of FACET_DEFS) {
    for (const v of filters[f.key]) pairs.push({ key: f.key, val: v });
  }
  if (query.trim()) pairs.unshift({ key: '__q', val: query.trim() });
  return pairs;
}

export function removeActivePair(filters: Filters, query: string, pair: ActiveFilterPair): { filters: Filters; query: string } {
  if (pair.key === '__q') return { filters, query: '' };
  const nf: Filters = { ...filters, [pair.key]: filters[pair.key].filter((x) => x !== pair.val) };
  return { filters: nf, query };
}

interface RelatedResult extends Performance {
  why: string;
  score: number;
}

export function relatedItems(all: Performance[], d: Performance, take = 7): RelatedResult[] {
  return all
    .filter((p) => p.id !== d.id)
    .map((p) => {
      const shared = p.moods.filter((m) => d.moods.includes(m));
      let score = shared.length * 3;
      let why = shared.length ? `also ${shared[0]}` : '';
      if (p.genre === d.genre) {
        score += 2;
        if (!why) why = `more ${d.genre}`;
      }
      const sharedI = p.instr.filter((x) => d.instr.includes(x));
      score += sharedI.length * 0.4;
      if (!why) why = 'fans of this also watched';
      if (p.ens === d.ens && shared.length) why = `also ${shared[0]}${d.ens === 'solo' ? ', also solo' : ''}`;
      return { ...p, why, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, take);
}
