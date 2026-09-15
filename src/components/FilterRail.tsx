import { ITEMS } from '../data/catalog';
import { FACET_DEFS, facetOptionLabel, filterItems, type FacetKey, type Filters } from '../data/facets';
import styles from './FilterRail.module.css';

interface FilterRailProps {
  filters: Filters;
  query: string;
  onToggle: (key: FacetKey, val: string) => void;
  onClearAll: () => void;
  hasActive: boolean;
  isMobile: boolean;
  open: boolean;
  onToggleOpen: () => void;
  activeCount: number;
}

export function FilterRail({ filters, query, onToggle, onClearAll, hasActive, isMobile, open, onToggleOpen, activeCount }: FilterRailProps) {
  return (
    <aside className={isMobile ? `${styles.rail} ${styles.railMobile}` : styles.rail}>
      {isMobile && (
        <button type="button" onClick={onToggleOpen} className={styles.mobileToggle}>
          {open ? 'Hide filters' : `Filters${activeCount ? ` (${activeCount})` : ''}`}
        </button>
      )}
      {open && (
        <div>
          <div className={styles.headRow}>
            <h2 className={styles.heading}>Filters</h2>
            <button
              type="button"
              onClick={onClearAll}
              className={styles.clearAll}
              style={{ visibility: hasActive ? 'visible' : 'hidden' }}
            >
              Clear all
            </button>
          </div>
          {FACET_DEFS.map((f) => (
            <section key={f.key} className={styles.section}>
              <h3 className={styles.sectionTitle}>{f.title}</h3>
              <div className={styles.optList}>
                {f.opts.map((opt) => {
                  const checked = filters[f.key].includes(opt);
                  const probe: Filters = { ...filters, [f.key]: checked ? filters[f.key] : [...filters[f.key], opt] };
                  const n = filterItems(ITEMS, probe, query).length;
                  return (
                    <label key={opt} className={styles.optLabel}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggle(f.key, opt)}
                        className={styles.checkbox}
                      />
                      <span className={checked ? styles.optTextChecked : styles.optText}>{facetOptionLabel(f.key, opt)}</span>
                      <span className={styles.count}>{n}</span>
                    </label>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </aside>
  );
}
