import { EMPTY_FILTERS, FACET_DEFS, type Filters, type SortKey } from '../data/facets';

export interface BrowseState {
  query: string;
  filters: Filters;
  sort: SortKey;
}

const SORT_KEYS: SortKey[] = ['relevance', 'newest', 'oldest', 'popular', 'shortest'];

export function parseBrowseParams(params: URLSearchParams): BrowseState {
  const filters: Filters = { ...EMPTY_FILTERS };
  for (const f of FACET_DEFS) {
    filters[f.key] = params.getAll(f.key);
  }
  const sortParam = params.get('sort');
  const sort: SortKey = SORT_KEYS.includes(sortParam as SortKey) ? (sortParam as SortKey) : 'relevance';
  return {
    query: params.get('q') ?? '',
    filters,
    sort,
  };
}

export function browseStateToParams(state: BrowseState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.query.trim()) params.set('q', state.query.trim());
  for (const f of FACET_DEFS) {
    for (const v of state.filters[f.key]) params.append(f.key, v);
  }
  if (state.sort !== 'relevance') params.set('sort', state.sort);
  return params;
}
