import { useSearchParams } from 'react-router-dom';
import { ITEMS } from '../data/catalog';
import {
  EMPTY_FILTERS,
  activePairs,
  filterItems,
  removeActivePair,
  sortItems,
  toggleIn,
  SORTS,
  type FacetKey,
} from '../data/facets';
import { browseStateToParams, parseBrowseParams } from '../lib/browseParams';
import { useMediaQuery } from '../lib/useMediaQuery';
import { FilterRail } from '../components/FilterRail';
import { PerformanceCard } from '../components/PerformanceCard';
import { useState } from 'react';
import styles from './BrowsePage.module.css';

export function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [mobileRailOpen, setMobileRailOpen] = useState(false);

  const browseState = parseBrowseParams(searchParams);
  const { query, filters, sort } = browseState;

  const pushState = (patch: Partial<typeof browseState>) => {
    const next = { ...browseState, ...patch };
    setSearchParams(browseStateToParams(next));
  };

  const onToggleFacet = (key: FacetKey, val: string) => {
    pushState({ filters: { ...filters, [key]: toggleIn(filters[key], val) } });
  };

  const onClearAll = () => {
    setSearchParams(browseStateToParams({ query: '', filters: EMPTY_FILTERS, sort }));
  };

  const pairs = activePairs(filters, query);
  const results = sortItems(filterItems(ITEMS, filters, query), sort);

  const loosen = pairs
    .map((pair) => {
      const removed = removeActivePair(filters, query, pair);
      const n = filterItems(ITEMS, removed.filters, removed.query).length;
      return { pair, n };
    })
    .filter((l) => l.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 3);

  const railOpen = isMobile ? mobileRailOpen : true;

  return (
    <main className={isMobile ? styles.mainMobile : styles.main}>
      <FilterRail
        filters={filters}
        query={query}
        onToggle={onToggleFacet}
        onClearAll={onClearAll}
        hasActive={pairs.length > 0}
        isMobile={isMobile}
        open={railOpen}
        onToggleOpen={() => setMobileRailOpen((v) => !v)}
        activeCount={pairs.length}
      />
      <div className={styles.results}>
        <div className={styles.resultsHead}>
          <div>
            <h1 className={styles.title}>{pairs.length ? 'Filtered browse' : 'Everything'}</h1>
            <div className={styles.resultLine}>
              {results.length} of {ITEMS.length} performances
              {pairs.length ? ` · ${pairs.length} filter${pairs.length > 1 ? 's' : ''} active` : ''}
            </div>
          </div>
          <label className={styles.sortLabel}>
            <span className={styles.sortText}>Sort</span>
            <select
              value={sort}
              onChange={(e) => pushState({ sort: e.target.value as typeof sort })}
              className={styles.select}
            >
              {SORTS.map((s) => (
                <option key={s.v} value={s.v}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {pairs.length > 0 && (
          <div className={styles.pills}>
            {pairs.map((pair) => (
              <button
                key={`${pair.key}:${pair.val}`}
                type="button"
                onClick={() => {
                  const removed = removeActivePair(filters, query, pair);
                  pushState(removed);
                }}
                className={styles.pill}
              >
                {pair.key === '__q' ? `“${pair.val}”` : pair.val}
                <span className={styles.pillX}>✕</span>
              </button>
            ))}
          </div>
        )}
        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((p) => (
              <PerformanceCard key={p.id} p={p} from="browse" />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Nothing matches all of that — yet.</h2>
            <p className={styles.emptyBody}>Loosening one filter usually opens it right back up. Here's what's worth dropping:</p>
            <div className={styles.emptyActions}>
              {loosen.length > 0 ? (
                loosen.map(({ pair, n }) => (
                  <button
                    key={`${pair.key}:${pair.val}`}
                    type="button"
                    onClick={() => pushState(removeActivePair(filters, query, pair))}
                    className={styles.dropButton}
                  >
                    Drop "{pair.val}" → {n} results
                  </button>
                ))
              ) : (
                <button type="button" onClick={onClearAll} className={styles.dropButton}>
                  Clear everything → {ITEMS.length} results
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
