import { useNavigate } from 'react-router-dom';
import { MOODS } from '../data/catalog';
import { useAppState } from '../lib/appState';
import styles from './PickerPage.module.css';

export function PickerPage() {
  const navigate = useNavigate();
  const { taste, toggleTaste, completeTaste, skipTaste } = useAppState();
  const locked = taste.length < 3;

  const onContinue = () => {
    if (locked) return;
    completeTaste();
    navigate('/');
  };

  const onSkip = () => {
    skipTaste();
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <span className={styles.badge}>First visit</span>
      <h1 className={styles.h1}>Tell us what a good one feels like.</h1>
      <p className={styles.lede}>
        Not genres — feelings. Pick three or more and we'll build you a feed. You can change your mind whenever;
        nothing here is permanent.
      </p>
      <div className={styles.divider} />
      <div className={styles.grid}>
        {MOODS.map((mood) => {
          const picked = taste.includes(mood);
          return (
            <button
              key={mood}
              type="button"
              aria-pressed={picked}
              onClick={() => toggleTaste(mood)}
              className={picked ? `${styles.tile} ${styles.tileOn}` : styles.tile}
            >
              <span className={picked ? `${styles.mark} ${styles.markOn}` : styles.mark}>{picked ? '✓' : '+'}</span>
              <span>{mood}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.bottomBar}>
        <button type="button" disabled={locked} onClick={onContinue} className={locked ? `${styles.cta} ${styles.ctaDisabled}` : styles.cta}>
          {locked ? `Pick ${3 - taste.length} more to continue` : `Continue with ${taste.length} moods`}
        </button>
        <button type="button" onClick={onSkip} className={styles.skip}>
          Skip, just let me browse
        </button>
        <span className={styles.note}>Stored on this device only. Nothing is sent anywhere.</span>
      </div>
    </div>
  );
}
