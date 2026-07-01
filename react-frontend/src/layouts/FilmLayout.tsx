import { Outlet, ScrollRestoration } from 'react-router-dom';
import { FilmProvider } from '../contexts/FilmContext';
import FilmNavbar from '../components/film/FilmNavbar';
import SharedFooter from '../components/SharedFooter';

export default function FilmLayout() {
  return (
    <FilmProvider>
      <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">
        <ScrollRestoration />
        <FilmNavbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <SharedFooter theme="dark" accentColor="#E50914" platformName="CineVault" />
      </div>
    </FilmProvider>
  );
}
