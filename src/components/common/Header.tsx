import { Heart, Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <svg
                className="h-8 w-auto text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.738-.273-1.99.635-3.756.47-.914 1.136-1.803 1.905-2.617a.6.6 0 011.05.351c-.135 1.132.182 1.83.952 2.094.46.157 1.057.067 1.79-.27L21 8.719z" />
              </svg>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Man', 'Woman', 'Kids', 'Collections', 'Contact'].map((item) => (
              <Link
                key={item}
                to="/shop"
                className="text-[10px] font-bold text-black uppercase tracking-widest hover:text-gray-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-black hover:text-gray-500 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-black hover:text-gray-500 relative transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[8px] font-black bg-black text-white w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:block text-[9px] font-black uppercase tracking-widest cursor-pointer ml-4 border border-gray-200 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all"
            >
              My Bag ({cartCount})
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
