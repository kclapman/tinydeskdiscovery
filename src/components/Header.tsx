import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ITEMS } from '../data/catalog';
import { useAppState } from '../lib/appState';
import { browseStateToParams, parseBrowseParams } from '../lib/browseParams';
import styles from './Header.module.css';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { saved } = useAppState();
  const onBrowse = location.pathname === '/browse';
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get('q') ?? '');

  useEffect(() => {
    if (onBrowse) setQuery(new URLSearchParams(location.search).get('q') ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, onBrowse]);

  const onChange = (v: string) => {
    setQuery(v);
    if (onBrowse) {
      const current = parseBrowseParams(new URLSearchParams(location.search));
      const params = browseStateToParams({ ...current, query: v });
      navigate({ pathname: '/browse', search: params.toString() }, { replace: true });
    }
  };

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !onBrowse) {
      const params = browseStateToParams({ query, filters: { genre: [], mood: [], instr: [], ens: [], region: [], decade: [], rt: [] }, sort: 'relevance' });
      navigate(`/browse${params.toString() ? `?${params.toString()}` : ''}`);
    }
  };

  const surprise = () => {
    const p = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    navigate(`/performance/${p.slug}`);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span className={styles.mark}>TD</span>
        <span className={styles.name}>Tiny Desk Discovery</span>
      </Link>
      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem)}>
          Home
        </NavLink>
        <NavLink to="/browse" className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem)}>
          Browse
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem)}>
          Saved ({saved.length})
        </NavLink>
      </nav>
      <div className={styles.searchCluster}>
        <input
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onSearchKey}
          placeholder="Search artists, songs, instruments…"
          aria-label="Search the catalog"
          className={styles.search}
        />
        <button onClick={surprise} className={`${styles.surprise} magic-button`}>
          Surprise me
        </button>
      </div>
      <Link to="/picker" className={styles.retune}>
        Retune
      </Link>
    </header>
  );
}
