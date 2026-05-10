import { TOP_PICKS } from '@/src/constants';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function TopPicks() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-16">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#fdbd1a] mb-2 block">Curated Selection</span>
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Top Picks</h2>
        </div>
        <div className="flex space-x-3">
          <button className="p-2.5 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-2.5 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
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
              <div className="aspect-[4/5] bg-[#f6f6f6] relative overflow-hidden mb-5 flex items-center justify-center p-8 rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 drop-shadow-lg"
                  referrerPolicy="no-referrer"
                />
                
                {/* Fast Action Buttons */}
                <div className="absolute inset-x-3 bottom-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm text-[9px] font-bold uppercase tracking-widest">
                    Quick Add
                  </div>
                </div>
              </div>
            </Link>
            <div className="space-y-1.5 px-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-tight group-hover:text-[#fdbd1a] transition-colors line-clamp-1">{product.name}</h3>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em]">{product.category}</p>
                </div>
                <p className="text-xs font-black text-black">
                  ${product.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 h-[1px] bg-gray-100 relative overflow-hidden">
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
