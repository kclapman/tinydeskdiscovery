import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { UrlBar } from './UrlBar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div>
      <Header />
      <UrlBar />
      <Outlet />
      <Footer />
    </div>
  );
}
