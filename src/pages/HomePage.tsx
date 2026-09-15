import { useNavigate } from 'react-router-dom';
import { ITEMS, MOODS, type Performance } from '../data/catalog';
import { EMPTY_FILTERS, GENRES, type FacetKey } from '../data/facets';
import { browseStateToParams } from '../lib/browseParams';
import { useAppState } from '../lib/appState';
import { ChipsRow } from '../components/ChipsRow';
import { CardRail } from '../components/CardRail';
import styles from './HomePage.module.css';

function browsePath(key?: FacetKey | null, val?: string): string {
  if (!key || !val) return '/browse';
  const params = browseStateToParams({ query: '', sort: 'relevance', filters: { ...EMPTY_FILTERS, [key]: [val] } });
  const qs = params.toString();
  return qs ? `/browse?${qs}` : '/browse';
}

interface Row {
  title: string;
  reason: string;
  items: Performance[];
  seeHref: string;
}

export function HomePage() {
  const navigate = useNavigate();
  const { taste, hasProfile } = useAppState();

  const rows: Row[] = (() => {
    if (hasProfile && taste.length) {
      const t0 = taste[0];
      const t1 = taste[1] || taste[0];
      const byMood = (m: string) => ITEMS.filter((p) => p.moods.includes(m));
      const outside = ITEMS.filter((p) => !p.moods.some((m) => taste.includes(m))).slice(0, 8);
      return [
        { title: `Because you picked "${t0}"`, reason: 'Your taste', items: byMood(t0), seeHref: browsePath('mood', t0) },
        { title: `More like "${t1}"`, reason: 'Your taste', items: byMood(t1), seeHref: browsePath('mood', t1) },
        { title: 'Outside your usual', reason: 'A stretch', items: outside, seeHref: '/browse' },
        {
          title: 'Short ones for a coffee break',
          reason: 'Under 15 minutes',
          items: ITEMS.filter((p) => p.mins < 15),
          seeHref: browsePath('rt', 'Under 15 min'),
        },
      ];
    }
    return [
      {
        title: 'Recently added',
        reason: 'New this month',
        items: ITEMS.slice().sort((a, b) => b.added - a.added).slice(0, 8),
        seeHref: '/browse',
      },
      {
        title: 'Most-loved',
        reason: 'The ones everyone sends you',
        items: ITEMS.slice().sort((a, b) => b.loves - a.loves).slice(0, 8),
        seeHref: '/browse',
      },
      {
        title: 'Deep cuts',
        reason: 'Fewer views than they deserve',
        items: ITEMS.slice().sort((a, b) => a.loves - b.loves).slice(0, 8),
        seeHref: '/browse',
      },
      {
        title: 'Under 15 minutes',
        reason: 'One-song-long attention spans welcome',
        items: ITEMS.filter((p) => p.mins < 15),
        seeHref: browsePath('rt', 'Under 15 min'),
      },
    ];
  })();

  return (
    <main className={styles.main}>
      <div className={styles.quickFilters}>
        <ChipsRow
          label="Genre"
          chips={GENRES.map((g) => ({ label: g, active: false, onClick: () => navigate(browsePath('genre', g)) }))}
        />
        <ChipsRow
          label="Mood"
          chips={MOODS.slice(0, 8).map((m) => ({ label: m, active: false, onClick: () => navigate(browsePath('mood', m)) }))}
        />
      </div>
      {rows.map((row) => (
        <section key={row.title} className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{row.title}</h2>
            <span className={styles.reason}>{row.reason}</span>
            <button type="button" onClick={() => navigate(row.seeHref)} className={styles.seeAll}>
              See all {row.items.length} →
            </button>
          </div>
          <CardRail items={row.items.slice(0, 8)} from="home" />
        </section>
      ))}
    </main>
  );
}
