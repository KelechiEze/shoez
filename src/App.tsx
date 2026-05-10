/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
