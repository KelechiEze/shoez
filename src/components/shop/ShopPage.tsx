import { ALL_PRODUCTS } from '@/src/constants';
import { Product } from '@/src/types';
import { ChevronDown, Grid, Heart, LayoutGrid, ListFilter, ShoppingBag, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(ALL_PRODUCTS);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const filterCategories = [
    { name: 'PRODUCT TYPE', options: ['Running', 'Lifestyle', 'Basketball', 'Training', 'Skate'] },
    { name: 'SIZE', options: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'] },
    { name: 'COLOR', options: ['Black', 'White', 'Red', 'Blue', 'Yellow', 'Green'] },
    { name: 'SHOP BY PRICE', options: ['Under $100', '$100-$150', '$150-$200', 'Over $200'] },
    { name: 'COLLECTION', options: ['Air Max', 'Jordan', 'Dunk', 'Pegasus', 'VaporMax'] },
    { name: 'GENDER', options: ['MEN', 'WOMEN', 'UNISEX'] },
    { name: 'CLOSURE TYPE', options: ['Lace-Up', 'Slip-On', 'Velcro'] },
    { name: 'SHOE HEIGHT', options: ['Low Top', 'Mid Top', 'High Top'] },
    { name: 'TECHNOLOGY', options: ['Air Max', 'React', 'Zoom', 'VaporMax'] },
    { name: 'FEATURES', options: ['Waterproof', 'Breathable', 'Lightweight', 'Eco-Friendly'] },
  ];

  // Apply filters
  useEffect(() => {
    let filtered = [...ALL_PRODUCTS];

    // Filter by gender
    if (selectedFilters['GENDER']?.length) {
      filtered = filtered.filter(product => 
        selectedFilters['GENDER'].some(gender => 
          product.category?.toUpperCase().includes(gender) || 
          (gender === 'UNISEX' && product)
        )
      );
    }

    // Filter by price
    if (selectedFilters['SHOP BY PRICE']?.length) {
      filtered = filtered.filter(product => {
        return selectedFilters['SHOP BY PRICE'].some(range => {
          if (range === 'Under $100') return product.price < 100;
          if (range === '$100-$150') return product.price >= 100 && product.price <= 150;
          if (range === '$150-$200') return product.price >= 150 && product.price <= 200;
          if (range === 'Over $200') return product.price > 200;
          return true;
        });
      });
    }

    setFilteredProducts(filtered);
  }, [selectedFilters]);

  const handleFilterChange = (category: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      if (current.includes(option)) {
        const updated = current.filter(item => item !== option);
        if (updated.length === 0) {
          const { [category]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [category]: updated };
      }
      return { ...prev, [category]: [...current, option] };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const hasActiveFilters = Object.keys(selectedFilters).length > 0;

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleToggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(productId);
  };

  return (
    <div className="pt-24 pb-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
      {/* Header Info */}
      <div className="mb-8 lg:mb-12">
        <nav className="text-[9px] text-gray-500 mb-4 flex items-center space-x-2 uppercase tracking-widest">
          <Link to="/" className="hover:text-black transition-colors uppercase">HOME</Link>
          <span>/</span>
          <span className="text-black font-bold">SHOES</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h1 className="text-4xl sm:text-5xl font-black text-black italic tracking-tighter">SHOES</h1>
          <div className="flex items-center space-x-3">
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <ListFilter className="h-4 w-4" />
              <span>FILTERS</span>
              {hasActiveFilters && (
                <span className="ml-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-[9px]">
                  {Object.values(selectedFilters).flat().length}
                </span>
              )}
            </button>
            <div className="text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 cursor-pointer border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
              <span>SORT BY</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Filters for Mobile */}
      <div className="lg:hidden overflow-x-auto pb-4 mb-6 -mx-4 px-4">
        <div className="flex space-x-2 min-w-max">
          {filterCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setIsMobileFiltersOpen(true)}
              className="px-4 py-2 border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-black transition-colors whitespace-nowrap"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 space-y-1">
          {filterCategories.map((category) => (
            <div key={category.name} className="border-t border-gray-100">
              <div className="py-5">
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                    {category.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
                
                {/* Options for this category */}
                <div className="mt-3 space-y-2">
                  {category.options.map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFilters[category.name]?.includes(option) || false}
                        onChange={() => handleFilterChange(category.name, option)}
                        className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-black checked:border-black cursor-pointer"
                      />
                      <span className="text-[11px] font-medium text-gray-600 group-hover:text-black transition-colors uppercase tracking-widest">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center space-x-2"
            >
              <X className="h-3 w-3" />
              <span>Clear all filters</span>
            </button>
          )}
        </aside>

        {/* Mobile Filters Modal */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
                <h3 className="font-bold uppercase tracking-wider">Filters</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 space-y-6">
                {filterCategories.map((category) => (
                  <div key={category.name} className="border-b border-gray-100 pb-4">
                    <div className="font-bold text-xs uppercase tracking-wider mb-3">{category.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {category.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleFilterChange(category.name, option)}
                          className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
                            selectedFilters[category.name]?.includes(option)
                              ? 'bg-black text-white'
                              : 'border border-gray-200 text-gray-600 hover:border-black'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 border border-gray-300 text-[10px] font-bold uppercase tracking-widest rounded-full"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <main className="flex-1">
          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(([category, options]) =>
                options.map(option => (
                  <button
                    key={`${category}-${option}`}
                    onClick={() => handleFilterChange(category, option)}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <span>{category}: {option}</span>
                    <X className="h-3 w-3" />
                  </button>
                ))
              )}
              <button
                onClick={clearFilters}
                className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black underline"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/5] bg-[#f6f6f6] relative overflow-hidden mb-3 md:mb-6 flex items-center justify-center p-6 md:p-12 rounded-2xl transition-all duration-500 group-hover:rounded-xl">
                    {product.isNew && (
                      <span className="absolute top-3 md:top-6 left-3 md:left-6 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] bg-black text-white px-2 md:px-3 py-1 rounded-full z-10">
                        Coming Soon
                      </span>
                    )}
                    {product.bestSeller && (
                      <span className="absolute top-3 md:top-6 left-3 md:left-6 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] bg-[#fdbd1a] text-black px-2 md:px-3 py-1 rounded-full z-10">
                        Best Seller
                      </span>
                    )}
                    <button 
                      onClick={(e) => handleToggleFavorite(product.id, e)}
                      className="absolute top-3 md:top-6 right-3 md:right-6 p-1.5 md:p-2 rounded-full bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <Heart className={`h-3 w-3 md:h-4 md:w-4 transition-colors ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto object-contain transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 drop-shadow-xl"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Quick Add Button for Mobile */}
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-3 left-3 right-3 bg-black text-white py-2 rounded-full text-[8px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity md:hidden"
                    >
                      Quick Add
                    </button>
                  </div>
                </Link>
                <div className="space-y-0.5 md:space-y-1 px-1 md:px-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xs md:text-sm font-bold text-black uppercase tracking-tight group-hover:text-[#fdbd1a] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                    {product.colors} {product.colors === 1 ? 'Color' : 'Colors'}
                  </p>
                  <p className="text-xs md:text-sm font-black text-black mt-1 md:mt-2">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">No products found with the selected filters.</p>
              <button onClick={clearFilters} className="text-black underline">Clear all filters</button>
            </div>
          )}

          <div className="mt-16 md:mt-24 flex justify-center">
            <button className="px-8 md:px-16 py-3 md:py-4 border-2 border-black text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all rounded-full">
              Show More
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}