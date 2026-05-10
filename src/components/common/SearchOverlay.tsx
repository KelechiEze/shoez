import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ALL_PRODUCTS } from '../../constants';
import { Link } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  const filteredItems = query.length > 1 
    ? ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[100] flex flex-col"
        >
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xl font-black uppercase italic tracking-tighter">Search</span>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-black" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="WHAT ARE YOU LOOKING FOR?"
                className="w-full bg-transparent border-b-2 border-black py-6 pl-12 text-3xl font-black uppercase italic tracking-tighter placeholder:text-gray-100 focus:outline-none"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  onClick={onClose}
                  className="group flex items-center space-x-4 p-4 border border-gray-50 rounded-2xl hover:border-black transition-all"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-xl p-2 flex-shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-full h-auto object-contain transform group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-tight">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">${item.price}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </Link>
              ))}

              {query.length > 1 && filteredItems.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400 font-medium">
                  No products found for "{query}"
                </div>
              )}
            </div>

            {query.length === 0 && (
              <div className="space-y-6">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Popular Searches</h5>
                <div className="flex flex-wrap gap-3">
                  {['Jordan 1', 'Air Max', 'Yeezy', 'React', 'Blazer'].map(s => (
                    <button 
                      key={s} 
                      onClick={() => setQuery(s)}
                      className="px-6 py-2 bg-gray-50 hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest rounded-full"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
