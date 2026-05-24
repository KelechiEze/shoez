import { ALL_PRODUCTS } from '@/src/constants';
import { ChevronRight, Heart, Share2, ShoppingBag, Star, Check, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useState, useEffect } from 'react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [showFavoriteSuccess, setShowFavoriteSuccess] = useState(false);
  
  const product = ALL_PRODUCTS.find((p) => p.id === id);
  const isFavorited = favorites.includes(id || '');

  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0);
    setSelectedSize(null);
    setShowSizeError(false);
  }, [id]);

  if (!product) {
    return (
      <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh] px-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-black underline hover:no-underline">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 3000);
      return;
    }
    
    addToCart({ ...product, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    setShowFavoriteSuccess(true);
    setTimeout(() => setShowFavoriteSuccess(false), 2000);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/product/${product.id}`;
    const shareText = `Check out ${product.name} on Nike Store!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const sizes = product.sizes || ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'];

  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
      {/* Breadcrumbs */}
      <nav className="text-[9px] text-gray-500 mb-6 md:mb-8 flex items-center space-x-2 uppercase tracking-widest">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-black">Shoes</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-black font-bold truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-[#f6f6f6] rounded-2xl flex items-center justify-center p-8 md:p-12 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="aspect-square bg-[#f6f6f6] rounded-xl flex items-center justify-center p-3 md:p-4 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <img 
                  src={product.image} 
                  alt={`${product.name} view ${i}`} 
                  className="w-full h-auto object-contain opacity-50 hover:opacity-100 transition-opacity" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 md:space-y-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#fdbd1a]">
                {product.category || 'Lifestyle'}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 md:h-4 md:w-4 fill-black" />
                <span className="text-xs md:text-sm font-bold">4.9</span>
                <span className="text-[10px] md:text-xs text-gray-500">(124 reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black uppercase leading-tight mb-3 md:mb-4 tracking-tighter">
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl font-bold text-black">${product.price}</p>
          </div>

          <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
            {product.description || 'Step into the future with legendary style. Built for comfort and designed for the streets, this silhouette brings heritage performance into your daily rotation.'}
          </p>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Select Size</span>
              <button className="text-[9px] md:text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-widest underline underline-offset-4">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 md:gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setShowSizeError(false);
                  }}
                  className={`py-2.5 md:py-3 text-xs md:text-sm font-medium border rounded-lg transition-all uppercase ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {showSizeError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-[10px] md:text-xs font-medium"
                >
                  Please select a size before adding to cart
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3 md:space-y-4">
            <button 
              onClick={handleAddToCart}
              className={`w-full py-3.5 md:py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center space-x-2 md:space-x-3 transition-all text-xs md:text-sm ${
                added ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {added ? <Check className="h-4 w-4 md:h-5 md:w-5" /> : <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />}
              <span>{added ? 'Added to Bag' : 'Add to Bag'}</span>
            </button>
            
            <div className="flex gap-3">
              <button 
                onClick={handleToggleFavorite}
                className="flex-1 border border-gray-200 py-3.5 md:py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center space-x-2 md:space-x-3 hover:bg-gray-50 transition-colors text-xs md:text-sm relative"
              >
                <Heart className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="flex-1 border border-gray-200 py-3.5 md:py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center space-x-2 md:space-x-3 hover:bg-gray-50 transition-colors text-xs md:text-sm"
              >
                <Share2 className="h-4 w-4 md:h-5 md:w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Success Messages */}
          <AnimatePresence>
            {showShareSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium z-50 flex items-center space-x-2 whitespace-nowrap"
              >
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                <span>Link copied to clipboard!</span>
              </motion.div>
            )}
            
            {showFavoriteSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium z-50 flex items-center space-x-2 whitespace-nowrap"
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5 fill-white" />
                <span>{isFavorited ? 'Removed from favorites' : 'Added to favorites'}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features */}
          <div className="pt-6 md:pt-8 border-t border-gray-100 grid grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Specifications</h4>
              <ul className="text-[10px] md:text-xs space-y-1.5 md:space-y-2 font-medium text-gray-600">
                <li>Responsive Cushioning</li>
                <li>Synthetic Leather Upper</li>
                <li>Rubber Traction Outsole</li>
                <li>Breathable Mesh Lining</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Product Code</h4>
              <p className="text-[10px] md:text-xs font-mono text-gray-600">NK-{product.id}-{Math.floor(Math.random() * 10000)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}