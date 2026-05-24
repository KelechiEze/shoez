import React, { useEffect, useRef, useState } from 'react';
import { KIDS_PRODUCTS } from '../../constants';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { SlidersHorizontal, Eye, ShoppingCart, Star, Sparkles } from 'lucide-react';

export default function KidsPage() {
  const { addToCart } = useCart();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
  
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filterTabs = ['All', 'Running', 'Lifestyle', 'Basketball'];

  const filteredProducts = KIDS_PRODUCTS.filter((product) => {
    if (selectedAgeGroup === 'All') return true;
    return product.category.toLowerCase().includes(selectedAgeGroup.toLowerCase());
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: -20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );

    tl.fromTo(filterRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.4'
    );

    if (gridRef.current) {
      const cards = gridRef.current.children;
      tl.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.8, rotate: -2 },
        { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.8, stagger: 0.1, ease: 'elastic.out(1, 0.75)' },
        '-=0.3'
      );
    }
  }, [selectedAgeGroup]);

  return (
    <div className="pt-28 pb-24 bg-[#f0f9ff] min-h-screen">
      {/* Playful Hero Banner - Responsive height */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 mb-8 md:mb-16">
        <div className="relative h-[300px] sm:h-[400px] md:h-[480px] rounded-xl md:rounded-3xl overflow-hidden bg-black flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1600&auto=format&fit=crop" 
              alt="Kids active play" 
              className="w-full h-full object-cover opacity-60 object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-950/80 via-black/30 to-transparent"></div>
          </div>

          {/* Content */}
          <div ref={headerRef} className="relative z-10 px-6 sm:px-8 md:px-16 max-w-2xl text-white">
            <div className="inline-flex items-center space-x-2 bg-sky-400 text-black px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-wider mb-3 md:mb-4">
              <Sparkles className="h-2 w-2 md:h-3 md:w-3" />
              <span>JUST FOR JUNIORS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-4 md:mb-6">
              PLAY WITHOUT <br />
              <span className="text-sky-300">LIMITS</span>
            </h1>
            <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-6 md:mb-8 leading-relaxed font-semibold max-w-md">
              Ultra elastic cushioning, reinforced wear barriers, and high traction waffle outsoles custom certified for elite speed.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <a 
                href="#kids-grid" 
                className="bg-sky-300 text-black px-6 md:px-8 py-2.5 md:py-3.5 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all inline-block text-center"
              >
                Find Their Fit
              </a>
              <span className="border border-white/20 px-6 md:px-8 py-2.5 md:py-3.5 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full text-white backdrop-blur-md text-center">
                Sizes 1Y - 7Y Available
              </span>
            </div>
          </div>
        </div>
      </div>

      <div id="kids-grid" className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Navigation / Filter Bar */}
        <div ref={filterRef} className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 pb-6 border-b border-sky-100">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <SlidersHorizontal className="h-3 w-3 md:h-4 md:w-4 text-black" />
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest">Store / Kids Selection</span>
          </div>

          {/* Horizontal scrollable filters on mobile */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max md:min-w-0">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedAgeGroup(tab)}
                  className={`px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    selectedAgeGroup === tab
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:text-black border border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid - 2 columns on mobile, 2 on tablet, 4 on desktop */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 min-h-[400px]"
        >
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl md:rounded-3xl p-3 md:p-4 border border-sky-50 transition-all duration-500 flex flex-col"
            >
              {/* Image box - removed group hover effects */}
              <div className="aspect-[4/5] bg-sky-50/40 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 flex items-center justify-center relative overflow-hidden">
                {product.isNew && (
                  <span className="absolute top-2 md:top-4 left-2 md:left-4 text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em] bg-yellow-400 text-black px-1.5 md:px-3 py-0.5 md:py-1 rounded-full z-10">
                    Fun Colorway
                  </span>
                )}
                
                {/* Make the image clickable */}
                <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-contain transition-all duration-700 drop-shadow-lg md:group-hover:scale-110 md:group-hover:rotate-12"
                    referrerPolicy="no-referrer"
                  />
                </Link>

                {/* Quick actions overlay - only visible on desktop hover */}
                <div className="hidden md:flex absolute inset-x-0 bottom-4 px-4 justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link 
                    to={`/product/${product.id}`}
                    className="p-3 bg-white hover:bg-black hover:text-white rounded-full shadow-lg text-black transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button 
                    onClick={() => addToCart({ ...product, quantity: 1, size: '4Y' })}
                    className="p-3 bg-sky-300 hover:bg-black hover:text-white rounded-full shadow-lg text-black transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>

                {/* Mobile quick add button - always visible on mobile */}
                <button 
                  onClick={() => addToCart({ ...product, quantity: 1, size: '4Y' })}
                  className="md:hidden absolute bottom-2 left-2 right-2 bg-black text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                >
                  Quick Add
                </button>
              </div>

              {/* Shoe Info */}
              <div className="flex-1 flex flex-col justify-between px-0 md:px-2">
                <Link to={`/product/${product.id}`} className="block">
                  <div>
                    <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                      <span className="text-[7px] md:text-[9px] font-bold text-sky-500 uppercase tracking-widest">{product.category}</span>
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-2 w-2 md:h-3 md:w-3 fill-current" />
                        <span className="text-[8px] md:text-[10px] font-bold text-black ml-0.5 md:ml-1">4.9</span>
                      </div>
                    </div>
                    <h3 className="text-[11px] md:text-sm font-black text-black tracking-tight md:group-hover:text-sky-500 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-[7px] md:text-[10px] text-gray-400 mt-0.5 md:mt-1 uppercase tracking-wider">
                      {product.colors || 4} Kid friendly colors
                    </p>
                  </div>
                </Link>

                <div className="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-50">
                  <span className="text-base md:text-lg font-black text-black">${product.price}</span>
                  <button 
                    onClick={() => addToCart({ ...product, quantity: 1, size: '4Y' })}
                    className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black hover:text-sky-500 transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">No products found matching this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}