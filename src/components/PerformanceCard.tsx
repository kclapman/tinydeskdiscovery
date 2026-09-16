import { Link } from 'react-router-dom';
import type { Performance } from '../data/catalog';
import { YoutubeThumb } from './YoutubeThumb';
import styles from './PerformanceCard.module.css';

export type NavOrigin = 'home' | 'browse' | 'saved';

export function PerformanceCard({ p, from }: { p: Performance; from?: NavOrigin }) {
  const meta = `${p.year} · ${p.mins} min · ${p.ens === 'solo' ? 'solo' : 'full band'}`;
  const dur = `${p.mins}:00`;
  const state = from ? { from } : undefined;
  return (
    <article className={styles.card}>
      <Link to={`/performance/${p.slug}`} state={state} className={styles.thumb} aria-label={`Open ${p.artist}`}>
        {p.videoId && <YoutubeThumb videoId={p.videoId} alt="" />}
        <span className={styles.genrePill}>{p.genre}</span>
        <span className={styles.duration}>{dur}</span>
      </Link>
      <Link to={`/performance/${p.slug}`} state={state} className={styles.title}>
        {p.artist}
      </Link>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>{p.sub}</span>
        <span className={styles.badge}>{p.year}</span>
      </div>
      <div className={styles.meta}>{meta}</div>
    </article>
  );
}
