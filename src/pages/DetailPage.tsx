import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ITEMS, findBySlug } from '../data/catalog';
import { relatedItems } from '../data/facets';
import { useAppState } from '../lib/appState';
import { VideoFacade } from '../components/VideoFacade';
import { YoutubeThumb } from '../components/YoutubeThumb';
import styles from './DetailPage.module.css';

const BACK_LABELS: Record<string, string> = {
  browse: 'Back to results',
  saved: 'Back to saved',
  home: 'Back to discovery',
};

export function DetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { saved, toggleSaved, shareUrl } = useAppState();
  const [copied, setCopied] = useState(false);

  const d = findBySlug(slug);
  if (!d) return <Navigate to="/" replace />;

  const from = (location.state as { from?: string } | null)?.from;
  const backLabel = BACK_LABELS[from ?? ''] ?? 'Back to discovery';
  const isSaved = saved.includes(d.id);

  const onBack = () => {
    if (from === 'browse' || from === 'saved') navigate(-1);
    else navigate('/');
  };

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

  const related = relatedItems(ITEMS, d, 7);
  const personnel = [`${d.artist.split(' & ')[0]} — ${d.instr[0]}`, ...d.instr.slice(1).map((x) => `session player — ${x}`)];
  const facts = [
    { k: 'Recorded', v: `March ${d.year} · NPR offices, Washington DC` },
    { k: 'Runtime', v: `${d.mins} min ${d.ens === 'solo' ? '· solo' : '· full band'}` },
    { k: 'Genre', v: `${d.genre} → ${d.sub}` },
    { k: 'Mood', v: d.moods.join(', ') },
    { k: 'Instruments', v: d.instr.join(', ') },
  ];
  const playerSlot = `youtube embed · ${d.slug}-tiny-desk`;

  return (
    <main className={styles.main}>
      <button type="button" onClick={onBack} className={styles.back}>
        ← {backLabel}
      </button>
      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <VideoFacade videoId={d.videoId} slotLabel={playerSlot} title={`${d.artist} — Tiny Desk Concert`} />
          <h1 className={styles.title}>{d.artist}</h1>
          <div className={styles.metaLong}>
            {d.genre} · {d.sub} · {d.year} · {d.mins} min
          </div>
          <p className={styles.blurb}>{d.blurb}</p>
          <div className={styles.divider} />
          <div className={styles.panels}>
            <section className={styles.panel}>
              <h2 className={styles.panelHeading}>Setlist</h2>
              <ol className={styles.list}>
                {d.setlist.map((t, i) => (
                  <li key={t} className={styles.listRow}>
                    <span className={`${styles.listIndex} tabular-nums`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.listText}>{t}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section className={styles.panel}>
              <h2 className={styles.panelHeading}>Personnel</h2>
              <ul className={styles.list}>
                {personnel.map((line) => (
                  <li key={line} className={styles.listRowSingle}>
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <aside className={styles.sidebar}>
          <button
            type="button"
            onClick={() => toggleSaved(d.id)}
            className={isSaved ? `${styles.saveButton} ${styles.saveButtonSaved}` : styles.saveButton}
          >
            {isSaved ? '✓ Saved to your list' : 'Save this one'}
          </button>
          <button type="button" onClick={onCopyLink} className={styles.copyButton}>
            {copied ? '✓ Link copied — paste it anywhere' : 'Copy my link'}
          </button>
          <p className={styles.shareNote}>
            Saves live in this browser. The link above carries your taste and saves, so it doubles as a backup and a
            way to send your feed to a friend.
          </p>
          <div className={styles.divider} />
          <dl className={styles.facts}>
            {facts.map((f) => (
              <div key={f.k} className={styles.factRow}>
                <dt className={styles.factKey}>{f.k}</dt>
                <dd className={styles.factVal}>{f.v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
      <div className={styles.divider} />
      <section className={styles.relatedSection}>
        <div className={styles.relatedHead}>
          <h2 className={styles.relatedTitle}>If you liked this one</h2>
          <span className={styles.relatedSub}>each with the reason it showed up</span>
        </div>
        <div className={styles.relatedRail} data-scroll="true">
          {related.map((p) => (
            <RelatedCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

function RelatedCard({ p }: { p: ReturnType<typeof relatedItems>[number] }) {
  const state = { from: 'detail' };
  return (
    <article className={styles.relatedCard}>
      <Link to={`/performance/${p.slug}`} state={state} className={styles.relatedThumb}>
        {p.videoId && <YoutubeThumb videoId={p.videoId} alt="" />}
        <span className={styles.relatedDuration}>{p.mins}:00</span>
      </Link>
      <span className={styles.relatedWhy}>{p.why}</span>
      <Link to={`/performance/${p.slug}`} state={state} className={styles.relatedArtist}>
        {p.artist}
      </Link>
      <div className={styles.relatedMeta}>
        {p.year} · {p.mins} min · {p.ens === 'solo' ? 'solo' : 'full band'}
      </div>
    </article>
  );
}
