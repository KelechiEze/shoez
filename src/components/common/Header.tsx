import { Heart, Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Men', path: '/men' },
    { label: 'Women', path: '/women' },
    { label: 'Kids', path: '/kids' },
    { label: 'Collections', path: '/collections' },
    { label: 'Contact', path: '/contact' }
  ];

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 150,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 150,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 20 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          
          {/* Mobile Hamburger & Logo Block */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-black hover:text-gray-500 transition-colors p-1"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-auto text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.738-.273-1.99.635-3.756.47-.914 1.136-1.803 1.905-2.617a.6.6 0 011.05.351c-.135 1.132.182 1.83.952 2.094.46.157 1.057.067 1.79-.27L21 8.719z" />
              </svg>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-[10px] font-bold text-black uppercase tracking-widest hover:text-gray-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-black hover:text-gray-500 transition-colors p-1"
              aria-label="Open search overlay"
            >
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-black hover:text-gray-500 relative transition-colors p-1"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-[8px] font-black bg-black text-white w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:block text-[9px] font-black uppercase tracking-widest cursor-pointer ml-2 border border-gray-200 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all animate-fade-in"
            >
              My Bag ({cartCount})
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Slide Out Over) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-[100] md:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-full max-w-[340px] bg-black text-white z-[101] shadow-2xl flex flex-col p-8 md:hidden"
            >
              {/* Close Button Header */}
              <div className="flex justify-between items-center mb-16">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fdbd1a]">
                  Nike Experience
                </span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-white hover:text-[#fdbd1a] transition-colors focus:outline-none"
                  aria-label="Close navigation menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links inside Mobile Menu */}
              <nav className="flex flex-col space-y-8 flex-1">
                {navItems.map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#fdbd1a] transition-colors block py-1"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Drawer Footer Info */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 0.5, transition: { delay: 0.6 } }
                }}
                className="border-t border-zinc-900 pt-8"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#fdbd1a] mb-2">JUST DO IT</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  Unlimited Edition. Premium access to athlete collections.
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
