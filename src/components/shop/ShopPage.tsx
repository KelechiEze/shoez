import { ALL_PRODUCTS } from '@/src/constants';
import { ChevronDown, Grid, Heart, LayoutGrid, ListFilter } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filterCategories = [
    'PRODUCT TYPE',
    'SIZE',
    'COLOR',
    'SHOP BY PRICE',
    'COLLECTION',
    'GENDER',
    'CLOSURE TYPE',
    'SHOE HEIGHT',
    'WIDTH',
    'TECHNOLOGY',
    'FEATURES',
  ];

  return (
    <div className="pt-24 pb-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
      {/* Header Info */}
      <div className="mb-12">
        <nav className="text-[9px] text-gray-500 mb-4 flex items-center space-x-2 uppercase tracking-widest">
          <Link to="/" className="hover:text-black transition-colors uppercase">HOME</Link>
          <span>/</span>
          <span className="text-black font-bold">SHOES</span>
        </nav>
        <div className="flex items-end justify-between">
          <h1 className="text-5xl font-black text-black italic tracking-tighter">SHOES</h1>
          <div className="text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 cursor-pointer border border-gray-100 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
            <span>SORT BY</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-48 space-y-1">
          {filterCategories.map((category) => (
            <div
              key={category}
              className="flex items-center justify-between py-5 border-t border-gray-100 group cursor-pointer"
            >
              <span className="text-[12px] font-bold uppercase tracking-wider text-black group-hover:pl-2 transition-all">
                {category}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors" />
            </div>
          ))}

          {/* Expanded Gender Example */}
          <div className="pb-8 space-y-3 pt-4">
             {['MEN', 'WOMEN', 'UNISEX'].map((gender) => (
               <label key={gender} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="w-4 h-4 border border-gray-300 rounded-sm group-hover:border-black transition-colors" />
                  <span className="text-[11px] font-medium text-gray-600 group-hover:text-black transition-colors uppercase tracking-widest">
                    {gender}
                  </span>
               </label>
             ))}
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8">
            {ALL_PRODUCTS.map((product) => (
              <div key={product.id} className="group">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/5] bg-[#f6f6f6] relative overflow-hidden mb-6 flex items-center justify-center p-12 rounded-3xl transition-all duration-500 group-hover:rounded-2xl">
                    {product.isNew && (
                      <span className="absolute top-6 left-6 text-[9px] font-black uppercase tracking-[0.2em] bg-black text-white px-3 py-1 rounded-full z-10">
                        Coming Soon
                      </span>
                    )}
                    {product.bestSeller && (
                      <span className="absolute top-6 left-6 text-[9px] font-black uppercase tracking-[0.2em] bg-[#fdbd1a] text-black px-3 py-1 rounded-full z-10">
                        Best Seller
                      </span>
                    )}
                    <button className="absolute top-6 right-6 p-2 rounded-full bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto object-contain transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 drop-shadow-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>
                <div className="space-y-1 px-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-bold text-black uppercase tracking-tight group-hover:text-[#fdbd1a] transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                    {product.colors} {product.colors === 1 ? 'Color' : 'Colors'}
                  </p>
                  <p className="text-sm font-black text-black mt-2">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 flex justify-center">
             <button className="px-16 py-4 border-2 border-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all rounded-full">
                Show More
             </button>
          </div>
        </main>
      </div>
    </div>
  );
}
