import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/common/Header';
import TrendingVideo from './components/home/Trendingvideo';
import Footer from './components/common/Footer';
import NikeShowcase from './components/home/NikeShowcase';
import Hero from './components/home/Hero';
import TopPicks from './components/home/TopPicks';
import Trending from './components/home/Trending';
import VideoFeature from './components/home/VideoFeature';
import ShopPage from './components/shop/ShopPage';
import ProductDetails from './components/shop/ProductDetails';
import CheckoutPage from './components/shop/CheckoutPage';
// Import new page components
import MenPage from './components/shop/MenPage';
import WomenPage from './components/shop/WomenPage';
import KidsPage from './components/shop/KidsPage';
import CollectionsPage from './components/shop/CollectionsPage';
import ContactPage from './components/shop/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <NikeShowcase />
      <TrendingVideo />
      <TopPicks />
      <VideoFeature />
      <Trending />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white font-sans text-black selection:bg-yellow-200">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                {/* New routes */}
                <Route path="/men" element={<MenPage />} />
                <Route path="/women" element={<WomenPage />} />
                <Route path="/kids" element={<KidsPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Optional: Add a 404 Not Found route */}
                <Route path="*" element={
                  <div className="pt-32 pb-24 px-4 text-center">
                    <h1 className="text-6xl font-black mb-4">404</h1>
                    <p className="text-gray-600 mb-8">Page not found</p>
                    <Link to="/" className="inline-block bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-colors">
                      Back to Home
                    </Link>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}