import { useLocation } from 'react-router-dom';
import styles from './UrlBar.module.css';

export function UrlBar() {
  const location = useLocation();
  const host = typeof window !== 'undefined' ? window.location.host : 'tinydeskdiscovery.fan';
  return (
    <div className={styles.bar} aria-hidden="true">
      {host}
      {location.pathname}
      {location.search}
    </div>
  );
}
