import type { Performance } from '../data/catalog';
import { PerformanceCard, type NavOrigin } from './PerformanceCard';
import styles from './CardRail.module.css';

export function CardRail({ items, from }: { items: Performance[]; from?: NavOrigin }) {
  return (
    <div className={styles.rail} data-scroll="true">
      {items.map((p) => (
        <PerformanceCard key={p.id} p={p} from={from} />
      ))}
    </div>
  );
}
