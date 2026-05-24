import { TOP_PICKS } from '@/src/constants';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useState } from 'react';

export default function TopPicks() {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleQuickAdd = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const handleToggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(productId);
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-12 md:mb-16">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#fdbd1a] mb-2 block">Curated Selection</span>
          <h2 className="text-2xl md:text-3xl font-black text-black tracking-tighter uppercase italic">Top Picks</h2>
        </div>
        <div className="hidden sm:flex space-x-3">
          <button className="p-2.5 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-2.5 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 2 columns on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-y-12 md:gap-x-6">
        {TOP_PICKS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
            className="group"
          >
            <Link to={`/product/${product.id}`}>
              <div className="aspect-[4/5] bg-[#f6f6f6] relative overflow-hidden mb-3 md:mb-5 flex items-center justify-center p-4 md:p-8 rounded-xl md:rounded-2xl">
                {/* Badges */}
                {product.isNew && (
                  <span className="absolute top-2 md:top-3 left-2 md:left-3 text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] bg-black text-white px-1.5 md:px-3 py-0.5 md:py-1 rounded-full z-10">
                    New
                  </span>
                )}
                {product.bestSeller && (
                  <span className="absolute top-2 md:top-3 left-2 md:left-3 text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] bg-[#fdbd1a] text-black px-1.5 md:px-3 py-0.5 md:py-1 rounded-full z-10">
                    Best Seller
                  </span>
                )}

                {/* Favorite Button */}
                <button 
                  onClick={(e) => handleToggleFavorite(product.id, e)}
                  className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 rounded-full bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Heart className={`h-3 w-3 md:h-3.5 md:w-3.5 transition-colors ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                </button>
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain transform group-hover:scale-110 group-hover:-rotate-6 md:group-hover:-rotate-12 transition-all duration-700 drop-shadow-lg"
                  referrerPolicy="no-referrer"
                />
                
                {/* Fast Action Buttons - Desktop */}
                <div className="hidden md:flex absolute inset-x-3 bottom-3 justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm hover:bg-black hover:text-white transition-colors group/btn"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 group-hover/btn:text-white" />
                  </button>
                  <button 
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                  >
                    {addedProductId === product.id ? 'Added!' : 'Quick Add'}
                  </button>
                </div>

                {/* Mobile Quick Add Button */}
                <button 
                  onClick={(e) => handleQuickAdd(product, e)}
                  className="md:hidden absolute bottom-2 left-2 right-2 bg-black text-white py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {addedProductId === product.id ? 'Added to Bag ✓' : 'Quick Add'}
                </button>
              </div>
            </Link>
            <div className="space-y-1 md:space-y-1.5 px-0.5 md:px-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-0.5 md:gap-0">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[11px] md:text-xs font-bold text-black uppercase tracking-tight group-hover:text-[#fdbd1a] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-[0.2em] truncate">
                    {product.category || 'Lifestyle'}
                  </p>
                </div>
                <p className="text-[11px] md:text-xs font-black text-black mt-0.5 md:mt-0">
                  ${product.price}
                </p>
              </div>
              {/* Color info for mobile */}
              {product.colors && (
                <p className="text-[7px] md:text-[9px] text-gray-400 uppercase tracking-widest">
                  {product.colors} {product.colors === 1 ? 'Color' : 'Colors'}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Navigation Arrows */}
      <div className="flex sm:hidden justify-center space-x-3 mt-8">
        <button className="p-2.5 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="p-2.5 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-16 md:mt-24 h-[1px] bg-gray-100 relative overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="absolute top-0 left-0 w-1/2 h-full bg-black/10" 
        />
      </div>
    </section>
  );
}