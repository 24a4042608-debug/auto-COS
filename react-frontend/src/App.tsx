import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Layouts
import WebsiteLayout from './layouts/WebsiteLayout';
import FilmLayout from './layouts/FilmLayout';
import DashboardLayout from './pages/dashboard/DashboardLayout';

// ── Portal Hub
import PortalHub from './pages/PortalHub';

// ── Fashion Platform (/fashion/*)
import FashionHomePage from './pages/website/HomePage';
import ProductsPage from './pages/website/ProductsPage';
import ProductDetailPage from './pages/website/product/ProductDetailPage';
import CollectionsPage from './pages/website/CollectionsPage';
import CollectionDetailPage from './pages/website/collection/CollectionDetailPage';
import LookbookPage from './pages/website/LookbookPage';
import JournalPage from './pages/website/JournalPage';
import AboutPage from './pages/website/AboutPage';
import ContactPage from './pages/website/ContactPage';

// ── Film Platform (/film/*)
import FilmHomePage from './pages/film/FilmHomePage';
import BrowsePage from './pages/film/BrowsePage';
import MovieDetailPage from './pages/film/MovieDetailPage';
import FilmAuthPage from './pages/film/AuthPage';
import WatchlistPage from './pages/film/WatchlistPage';
import HistoryPage from './pages/film/HistoryPage';

// ── Education Platform (/education/*)
import EducationHomePage from './pages/education/EducationHomePage';
import CourseDetailPage from './pages/education/CourseDetailPage';

// ── News Platform (/news/*)
import NewsHomePage from './pages/news/NewsHomePage';
import ArticleDetailPage from './pages/news/ArticleDetailPage';

// ── Booking Platform (/booking/*)
import BookingHomePage from './pages/booking/BookingHomePage';
import ServiceDetailPage from './pages/booking/ServiceDetailPage';

// ── Vlog Platform (/vlog/*)
import VlogHomePage from './pages/vlog/VlogHomePage';
import VideoDetailPage from './pages/vlog/VideoDetailPage';

// ── Admin Dashboard
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductsDashPage from './pages/dashboard/products/ProductsPage';
import CategoriesPage from './pages/dashboard/categories/CategoriesPage';
import BrandsPage from './pages/dashboard/brands/BrandsPage';
import MediaPage from './pages/dashboard/media/MediaPage';
import ImportExportPage from './pages/dashboard/import-export/ImportExportPage';
import SettingsPage from './pages/dashboard/settings/SettingsPage';
import PublisherPage from './pages/dashboard/publisher/PublisherPage';
import SuppliersPage from './pages/dashboard/suppliers/SuppliersPage';

// Auth
import LoginPage from './pages/auth/LoginPage';

const router = createBrowserRouter([

  // ── Portal Hub (root)
  { path: '/', element: <PortalHub /> },

  // ── Fashion Platform (/fashion/*)
  {
    path: '/fashion',
    element: <WebsiteLayout />,
    children: [
      { index: true, element: <FashionHomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'product/:slug', element: <ProductDetailPage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: 'collection/:slug', element: <CollectionDetailPage /> },
      { path: 'lookbook', element: <LookbookPage /> },
      { path: 'journal', element: <JournalPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },

  // ── Film Platform (/film/*) — own layout, no main nav
  {
    element: <FilmLayout />,
    children: [
      { path: '/film', element: <FilmHomePage /> },
      { path: '/film/browse', element: <BrowsePage /> },
      { path: '/film/movie/:slug', element: <MovieDetailPage /> },
      { path: '/film/auth', element: <FilmAuthPage /> },
      { path: '/film/watchlist', element: <WatchlistPage /> },
      { path: '/film/history', element: <HistoryPage /> },
    ],
  },

  // ── Education Platform (/education/*)
  { path: '/education', element: <EducationHomePage /> },
  { path: '/education/course/:slug', element: <CourseDetailPage /> },
  { path: '/education/courses', element: <EducationHomePage /> },
  { path: '/education/my-courses', element: <EducationHomePage /> },

  // ── News Platform (/news/*)
  { path: '/news', element: <NewsHomePage /> },
  { path: '/news/article/:slug', element: <ArticleDetailPage /> },
  { path: '/news/category/:slug', element: <NewsHomePage /> },
  { path: '/news/search', element: <NewsHomePage /> },

  // ── Booking Platform (/booking/*)
  { path: '/booking', element: <BookingHomePage /> },
  { path: '/booking/service/:slug', element: <ServiceDetailPage /> },
  { path: '/booking/services', element: <BookingHomePage /> },
  { path: '/booking/my-bookings', element: <BookingHomePage /> },

  // ── Vlog Platform (/vlog/*)
  { path: '/vlog', element: <VlogHomePage /> },
  { path: '/vlog/video/:slug', element: <VideoDetailPage /> },
  { path: '/vlog/creator/:handle', element: <VlogHomePage /> },
  { path: '/vlog/category/:tag', element: <VlogHomePage /> },

  // ── Admin Dashboard (/admin/* or /dashboard/*)
  {
    path: '/admin',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'products', element: <ProductsDashPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'brands', element: <BrandsPage /> },
      { path: 'media', element: <MediaPage /> },
      { path: 'import-export', element: <ImportExportPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'publisher', element: <PublisherPage /> },
      { path: 'suppliers', element: <SuppliersPage /> },
      // New platform admin sections (stub to main admin for now)
      { path: 'film', element: <DashboardPage /> },
      { path: 'education', element: <DashboardPage /> },
      { path: 'news', element: <DashboardPage /> },
      { path: 'booking', element: <DashboardPage /> },
      { path: 'vlog', element: <DashboardPage /> },
    ],
  },
  // Redirect old /dashboard to /admin
  { path: '/dashboard/*', element: <Navigate to="/admin" replace /> },

  // ── Auth
  { path: '/login', element: <LoginPage /> },

  // ── Legacy fashion redirect (old / routes that don't start with known prefixes)
  { path: '/products', element: <Navigate to="/fashion/products" replace /> },
  { path: '/product/:slug', element: <Navigate to="/fashion" replace /> },
  { path: '/collections', element: <Navigate to="/fashion/collections" replace /> },
  { path: '/collection/:slug', element: <Navigate to="/fashion/collections" replace /> },
  { path: '/lookbook', element: <Navigate to="/fashion/lookbook" replace /> },
  { path: '/journal', element: <Navigate to="/fashion/journal" replace /> },
  { path: '/about', element: <Navigate to="/fashion/about" replace /> },
  { path: '/contact', element: <Navigate to="/fashion/contact" replace /> },

  // ── Fallback
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
