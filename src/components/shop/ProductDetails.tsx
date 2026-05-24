import { ALL_PRODUCTS } from '@/src/constants';
import { ChevronRight, Heart, Share2, ShoppingBag, Star, Check, CheckCircle, X, Ruler } from 'lucide-react';
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
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  
  const product = ALL_PRODUCTS.find((p) => p.id === id);
  const isFavorited = favorites.includes(id || '');

  // Size conversion data
  const sizeConversions = {
    'Nigeria': {
      '6': '39',
      '6.5': '39.5',
      '7': '40',
      '7.5': '40.5',
      '8': '41',
      '8.5': '42',
      '9': '42.5',
      '9.5': '43',
      '10': '44',
      '10.5': '44.5',
      '11': '45',
      '11.5': '45.5',
      '12': '46',
    },
    'US': {
      '6': '6',
      '6.5': '6.5',
      '7': '7',
      '7.5': '7.5',
      '8': '8',
      '8.5': '8.5',
      '9': '9',
      '9.5': '9.5',
      '10': '10',
      '10.5': '10.5',
      '11': '11',
      '11.5': '11.5',
      '12': '12',
    },
    'UK': {
      '6': '5.5',
      '6.5': '6',
      '7': '6.5',
      '7.5': '7',
      '8': '7.5',
      '8.5': '8',
      '9': '8.5',
      '9.5': '9',
      '10': '9.5',
      '10.5': '10',
      '11': '10.5',
      '11.5': '11',
      '12': '11.5',
    },
    'Australia': {
      '6': '5.5',
      '6.5': '6',
      '7': '6.5',
      '7.5': '7',
      '8': '7.5',
      '8.5': '8',
      '9': '8.5',
      '9.5': '9',
      '10': '9.5',
      '10.5': '10',
      '11': '10.5',
      '11.5': '11',
      '12': '11.5',
    },
    'China': {
      '6': '39',
      '6.5': '39.5',
      '7': '40',
      '7.5': '40.5',
      '8': '41',
      '8.5': '42',
      '9': '42.5',
      '9.5': '43',
      '10': '44',
      '10.5': '44.5',
      '11': '45',
      '11.5': '45.5',
      '12': '46',
    }
  };

  const countries = ['US', 'UK', 'Nigeria', 'Australia', 'China'];
  
  // Get the base US sizes from the product
  const usSizes = product?.sizes || ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];
  
  // Get displayed sizes based on selected country
  const getDisplaySizes = () => {
    const conversion = sizeConversions[selectedCountry as keyof typeof sizeConversions];
    if (selectedCountry === 'US') {
      return usSizes;
    }
    return usSizes.map(usSize => conversion[usSize as keyof typeof conversion]);
  };

  const displaySizes = getDisplaySizes();

  // Convert selected size back to US size for cart storage
  const getUSSize = (displaySize: string) => {
    if (selectedCountry === 'US') return displaySize;
    
    const conversion = sizeConversions[selectedCountry as keyof typeof sizeConversions];
    const entry = Object.entries(conversion).find(([_, value]) => value === displaySize);
    return entry ? entry[0] : displaySize;
  };

  const handleSizeSelect = (displaySize: string) => {
    setSelectedSize(displaySize);
    setShowSizeError(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 3000);
      return;
    }
    
    const usSize = getUSSize(selectedSize);
    addToCart({ ...product, selectedSize: usSize, displaySize: selectedSize, country: selectedCountry });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  useEffect(() => {
    // Reset selected size when country changes
    setSelectedSize(null);
    setShowSizeError(false);
  }, [selectedCountry]);

  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0);
    setSelectedSize(null);
    setShowSizeError(false);
    setSelectedCountry('US'); // Reset to US when product changes
  }, [id]);

  if (!product) {
    return (
      <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh] px-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-black underline hover:no-underline">Back to Shop</Link>
      </div>
    );
  }

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
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <>
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
                <div>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Select Size</span>
                  {selectedCountry !== 'US' && (
                    <p className="text-[8px] text-gray-500 mt-0.5">
                      Showing {selectedCountry} sizes
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="text-[9px] md:text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-widest underline underline-offset-4 flex items-center space-x-1"
                >
                  <Ruler className="h-3 w-3" />
                  <span>Size Guide</span>
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 md:gap-3">
                {displaySizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => handleSizeSelect(size)}
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

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter">Size Guide</h2>
                  <p className="text-xs text-gray-500 mt-1">Find your perfect fit across different countries</p>
                </div>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Country Selector */}
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {countries.map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedCountry(country);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedCountry === country
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 mt-3">
                  Showing sizes in <span className="font-bold text-black">{selectedCountry}</span> sizing
                </p>
              </div>

              {/* Size Conversion Table */}
              <div className="p-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-wider text-gray-400">US Size</th>
                      <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-wider text-gray-400">UK</th>
                      <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Nigeria</th>
                      <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Australia</th>
                      <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-wider text-gray-400">China</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usSizes.map((usSize) => (
                      <tr key={usSize} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm font-bold text-black">
                          {usSize}
                          {selectedSize === sizeConversions[selectedCountry as keyof typeof sizeConversions][usSize as keyof typeof sizeConversions.US] && (
                            <span className="ml-2 text-[8px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                              Selected
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {sizeConversions['UK'][usSize as keyof typeof sizeConversions.UK]}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {sizeConversions['Nigeria'][usSize as keyof typeof sizeConversions.Nigeria]}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {sizeConversions['Australia'][usSize as keyof typeof sizeConversions.Australia]}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {sizeConversions['China'][usSize as keyof typeof sizeConversions.China]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Size Guide Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 text-xs text-gray-600">
                  <div className="flex-1">
                    <h4 className="font-bold text-black mb-2 uppercase tracking-wider text-[10px]">How to Measure</h4>
                    <ul className="space-y-1 text-[10px]">
                      <li>1. Stand on a flat surface with your heel against a wall</li>
                      <li>2. Measure from the wall to the tip of your longest toe</li>
                      <li>3. Use the measurement to find your size in the chart above</li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-black mb-2 uppercase tracking-wider text-[10px]">Fit Tips</h4>
                    <ul className="space-y-1 text-[10px]">
                      <li>• This style fits true to size</li>
                      <li>• If you're between sizes, we recommend sizing up</li>
                      <li>• Consider width if you have wider feet</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="mt-4 w-full bg-black text-white py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}