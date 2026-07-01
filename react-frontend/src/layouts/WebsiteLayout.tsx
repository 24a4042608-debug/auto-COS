import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/layouts/Footer';

export default function WebsiteLayout() {
  return (
    <div className="theme-luxury min-h-screen flex flex-col relative overflow-x-hidden">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
