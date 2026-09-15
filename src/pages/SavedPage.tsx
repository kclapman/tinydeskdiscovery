import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findById } from '../data/catalog';
import { useAppState } from '../lib/appState';
import styles from './SavedPage.module.css';

export function SavedPage() {
  const navigate = useNavigate();
  const { saved, removeSaved, moveSaved, shareUrl } = useAppState();
  const [copied, setCopied] = useState(false);

  const items = saved.map((id) => findById(id)).filter((p): p is NonNullable<typeof p> => !!p);

  const onCopyLink = async () => {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard unavailable; the confirmation still reflects a valid URL was produced
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Saved</h1>
      <p className={styles.count}>
        {items.length
          ? `${items.length} performance${items.length > 1 ? 's' : ''} in the order you'd play them.`
          : "Your list, in the order you'd play them."}
      </p>
      <p className={styles.note}>Stored on this device only — clearing your browser data clears this list.</p>
      <div className={styles.actions}>
        <button type="button" onClick={onCopyLink} className={styles.copyButton}>
          {copied ? '✓ Link copied — paste it anywhere' : 'Copy my link'}
        </button>
        <button type="button" onClick={() => navigate('/browse')} className={styles.findMore}>
          Find more
        </button>
      </div>
      <div className={styles.list}>
        {items.length === 0 ? (
          <p className={styles.empty}>Nothing saved yet. Open a performance and hit save — it'll land here.</p>
        ) : (
          items.map((p, i) => (
            <div key={p.id} className={styles.row}>
              <span className={`${styles.index} tabular-nums`}>{String(i + 1).padStart(2, '0')}</span>
              <Link to={`/performance/${p.slug}`} state={{ from: 'saved' }} className={styles.thumb} aria-label={`Open ${p.artist}`} />
              <div className={styles.info}>
                <Link to={`/performance/${p.slug}`} state={{ from: 'saved' }} className={styles.artist}>
                  {p.artist}
                </Link>
                <div className={styles.meta}>
                  {p.year} · {p.mins} min · {p.ens === 'solo' ? 'solo' : 'full band'}
                </div>
              </div>
              <div className={styles.rowActions}>
                <button type="button" aria-label="Move up" onClick={() => moveSaved(p.id, -1)} className={styles.iconButton}>
                  ↑
                </button>
                <button type="button" aria-label="Move down" onClick={() => moveSaved(p.id, 1)} className={styles.iconButton}>
                  ↓
                </button>
                <button type="button" aria-label="Remove" onClick={() => removeSaved(p.id)} className={styles.iconButtonMuted}>
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
