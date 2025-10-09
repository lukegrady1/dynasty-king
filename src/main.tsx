import { StrictMode, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';

import App from './App';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop';

// Lazy load non-critical pages for faster initial load
const MenuPage = lazy(() => import('./pages/MenuPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Simple loading fallback
const PageLoader = () => <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

const router = createHashRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <Suspense fallback={<PageLoader />}><MenuPage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
