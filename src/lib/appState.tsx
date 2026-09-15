import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'tdd:state';

interface PersistedState {
  taste: string[];
  hasProfile: boolean;
  visited: boolean;
  saved: string[];
}

const DEFAULT_STATE: PersistedState = {
  taste: [],
  hasProfile: false,
  visited: false,
  saved: [],
};

function loadPersisted(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      taste: Array.isArray(parsed.taste) ? parsed.taste : [],
      hasProfile: !!parsed.hasProfile,
      visited: !!parsed.visited,
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function decodeShare(encoded: string): Partial<PersistedState> | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    const parsed = JSON.parse(json);
    const out: Partial<PersistedState> = {};
    if (Array.isArray(parsed.taste)) out.taste = parsed.taste;
    if (typeof parsed.hasProfile === 'boolean') out.hasProfile = parsed.hasProfile;
    if (Array.isArray(parsed.saved)) out.saved = parsed.saved;
    return out;
  } catch {
    return null;
  }
}

export function encodeShare(state: Pick<PersistedState, 'taste' | 'hasProfile' | 'saved'>): string {
  const json = JSON.stringify({ taste: state.taste, hasProfile: state.hasProfile, saved: state.saved });
  return btoa(unescape(encodeURIComponent(json)));
}

interface AppStateValue {
  taste: string[];
  hasProfile: boolean;
  visited: boolean;
  saved: string[];
  toggleTaste: (mood: string) => void;
  completeTaste: () => void;
  skipTaste: () => void;
  toggleSaved: (id: string) => void;
  removeSaved: (id: string) => void;
  moveSaved: (id: string, direction: -1 | 1) => void;
  shareUrl: () => string;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(() => {
    const base = loadPersisted();
    const params = new URLSearchParams(window.location.search);
    const shareParam = params.get('share');
    if (shareParam) {
      const shared = decodeShare(shareParam);
      if (shared) {
        const merged = { ...base, ...shared, visited: true };
        params.delete('share');
        const q = params.toString();
        const nextUrl = window.location.pathname + (q ? `?${q}` : '') + window.location.hash;
        window.history.replaceState(null, '', nextUrl);
        return merged;
      }
    }
    return base;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggleTaste = useCallback((mood: string) => {
    setState((s) => ({
      ...s,
      taste: s.taste.includes(mood) ? s.taste.filter((m) => m !== mood) : [...s.taste, mood],
    }));
  }, []);

  const completeTaste = useCallback(() => {
    setState((s) => (s.taste.length >= 3 ? { ...s, hasProfile: true, visited: true } : s));
  }, []);

  const skipTaste = useCallback(() => {
    setState((s) => ({ ...s, hasProfile: false, taste: [], visited: true }));
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
    }));
  }, []);

  const removeSaved = useCallback((id: string) => {
    setState((s) => ({ ...s, saved: s.saved.filter((x) => x !== id) }));
  }, []);

  const moveSaved = useCallback((id: string, direction: -1 | 1) => {
    setState((s) => {
      const i = s.saved.indexOf(id);
      const j = i + direction;
      if (i < 0 || j < 0 || j >= s.saved.length) return s;
      const next = s.saved.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return { ...s, saved: next };
    });
  }, []);

  const shareUrl = useCallback(() => {
    const encoded = encodeShare(state);
    const url = new URL(window.location.href);
    url.searchParams.set('share', encoded);
    return url.toString();
  }, [state]);

  const value = useMemo<AppStateValue>(
    () => ({
      taste: state.taste,
      hasProfile: state.hasProfile,
      visited: state.visited,
      saved: state.saved,
      toggleTaste,
      completeTaste,
      skipTaste,
      toggleSaved,
      removeSaved,
      moveSaved,
      shareUrl,
    }),
    [state, toggleTaste, completeTaste, skipTaste, toggleSaved, removeSaved, moveSaved, shareUrl],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
