import styles from './ChipsRow.module.css';

export interface Chip {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function ChipsRow({ label, chips }: { label: string; chips: Chip[] }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <div className={styles.track} data-scroll="true">
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={c.onClick}
            className={c.active ? `${styles.chip} ${styles.chipActive}` : styles.chip}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
