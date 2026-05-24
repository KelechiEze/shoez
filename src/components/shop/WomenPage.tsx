import React, { useEffect, useRef, useState } from 'react';
import { WOMEN_PRODUCTS } from '../../constants';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { SlidersHorizontal, Eye, ShoppingCart, Star } from 'lucide-react';

export default function WomenPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Lifestyle', 'Running', 'Vintage'];

  const filteredProducts = WOMEN_PRODUCTS.filter((product) => {
    if (selectedCategory === 'All') return true;
    return product.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
           product.name.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(headerRef.current, 
      { opacity: 0, scale: 0.98, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    );

    tl.fromTo(filterRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    );

    if (gridRef.current) {
      const cards = gridRef.current.children;
      tl.fromTo(cards,
        { opacity: 0, y: 40, rotateX: 10 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        '-=0.4'
      );
    }
  }, [selectedCategory]);

  return (
    <div className="pt-28 pb-24 bg-[#faf5f6] min-h-screen">
      {/* Editorial Women's Hero Banner - Responsive height */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 mb-8 md:mb-16">
        <div className="relative h-[300px] sm:h-[400px] md:h-[480px] rounded-xl md:rounded-3xl overflow-hidden bg-black flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1600&auto=format&fit=crop" 
              alt="Women's Athletic" 
              className="w-full h-full object-cover opacity-60 object-top scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-950/70 via-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div ref={headerRef} className="relative z-10 px-6 sm:px-8 md:px-16 max-w-2xl text-white">
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-pink-300 mb-2 md:mb-4 block">
              NIKE WOMEN'S ACTIVE & CHIC
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-3 md:mb-6">
              GRACE AND <br />
              <span className="text-pink-300">VELOCITY</span>
            </h1>
            <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-5 md:mb-8 leading-relaxed font-medium max-w-md">
              Celebrate premium aesthetics combined with engineered excellence. Uplifted silhouettes and pastel layers.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <a 
                href="#women-grid" 
                className="bg-pink-300 text-black px-6 md:px-8 py-2.5 md:py-3.5 text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all inline-block text-center"
              >
                Explore Now
              </a>
              <span className="border border-white/20 px-6 md:px-8 py-2.5 md:py-3.5 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full text-white backdrop-blur-md text-center">
                {WOMEN_PRODUCTS.length}+ Products
              </span>
            </div>
          </div>
        </div>
      </div>

      <div id="women-grid" className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Navigation / Filter Bar */}
        <div ref={filterRef} className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 pb-6 border-b border-pink-100">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <SlidersHorizontal className="h-3 w-3 md:h-4 md:w-4 text-black" />
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest">Aesthetics</span>
          </div>

          {/* Horizontal scrollable filters on mobile */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max md:min-w-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:text-black border border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {cat}
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
              className="bg-white rounded-xl md:rounded-3xl p-3 md:p-4 border border-pink-50/50 transition-all duration-500 flex flex-col"
            >
              {/* Image box - removed group hover effects */}
              <div className="aspect-[4/5] bg-[#faf6f7] rounded-xl md:rounded-2xl p-4 md:p-6 mb-3 md:mb-6 flex items-center justify-center relative overflow-hidden">
                {product.isNew && (
                  <span className="absolute top-2 md:top-4 left-2 md:left-4 text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em] bg-black text-white px-1.5 md:px-3 py-0.5 md:py-1 rounded-full z-10">
                    Hot Item
                  </span>
                )}
                
                {/* Make the image clickable */}
                <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-contain transition-all duration-700 drop-shadow-xl md:group-hover:scale-110 md:group-hover:-rotate-3"
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
                    onClick={() => addToCart({ ...product, quantity: 1, size: '7' })}
                    className="p-3 bg-pink-200 hover:bg-black hover:text-white rounded-full shadow-lg text-black transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>

                {/* Mobile quick add button - always visible on mobile */}
                <button 
                  onClick={() => addToCart({ ...product, quantity: 1, size: '7' })}
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
                      <span className="text-[7px] md:text-[9px] font-bold text-pink-400 uppercase tracking-widest">{product.category}</span>
                      <div className="flex items-center text-[#fdbd1a]">
                        <Star className="h-2 w-2 md:h-3 md:w-3 fill-current" />
                        <span className="text-[8px] md:text-[10px] font-bold text-black ml-0.5 md:ml-1">4.8</span>
                      </div>
                    </div>
                    <h3 className="text-[11px] md:text-sm font-black text-black tracking-tight md:group-hover:text-pink-400 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-[7px] md:text-[10px] text-gray-400 mt-0.5 md:mt-1 uppercase tracking-wider">
                      {product.colors || 3} Vibrant options
                    </p>
                  </div>
                </Link>

                <div className="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-50">
                  <span className="text-base md:text-lg font-black text-black">${product.price}</span>
                  <button 
                    onClick={() => addToCart({ ...product, quantity: 1, size: '7' })}
                    className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black hover:text-pink-400 transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">No products found matching this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}