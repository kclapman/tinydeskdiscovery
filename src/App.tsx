import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { useAppState } from './lib/appState';
import { PickerPage } from './pages/PickerPage';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { DetailPage } from './pages/DetailPage';
import { SavedPage } from './pages/SavedPage';

function HomeGate() {
  const { visited } = useAppState();
  if (!visited) return <Navigate to="/picker" replace />;
  return <HomePage />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/picker" element={<PickerPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomeGate />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/performance/:slug" element={<DetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
