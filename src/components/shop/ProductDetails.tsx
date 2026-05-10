import { ALL_PRODUCTS } from '@/src/constants';
import { ChevronRight, Heart, Share2, ShoppingBag, Star, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = ALL_PRODUCTS.find((p) => p.id === id);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (/* ... no changes here */
      <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-blue-600 hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const sizes = product.sizes || ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'];

  return (
    <div className="pt-24 pb-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
      {/* Breadcrumbs */}
      <nav className="text-[9px] text-gray-500 mb-8 flex items-center space-x-2 uppercase tracking-widest">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-black">Shoes</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-black font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-[#f6f6f6] rounded-2xl flex items-center justify-center p-12 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
             {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-[#f6f6f6] rounded-xl flex items-center justify-center p-4 cursor-pointer hover:bg-gray-200 transition-colors">
                   <img src={product.image} alt="" className="w-full h-auto object-contain opacity-50" referrerPolicy="no-referrer" />
                </div>
             ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#fdbd1a]">
                {product.category}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-black" />
                <span className="text-sm font-bold">4.9</span>
                <span className="text-xs text-gray-500">(124 reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-black uppercase leading-tight mb-4 tracking-tighter">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-black">${product.price}</p>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm">
            {product.description || 'Step into the future with legendary style. Built for comfort and designed for the streets, this silhouette brings heritage performance into your daily rotation.'}
          </p>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold uppercase tracking-widest">Select Size</span>
              <button className="text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-widest underline underline-offset-4">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className="py-3 text-xs font-medium border border-gray-200 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all uppercase"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-4">
            <button 
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all ${
                added ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {added ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
              <span>{added ? 'Added to Bag' : 'Add to Bag'}</span>
            </button>
            <button className="w-full border border-gray-200 py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5" />
              <span>Favorite</span>
            </button>
          </div>

          {/* Features */}
          <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Specifications</h4>
              <ul className="text-xs space-y-2 font-medium">
                <li>Responsive Cushioning</li>
                <li>Synthetic Leather Upper</li>
                <li>Rubber Traction Outsole</li>
              </ul>
            </div>
            <div className="space-y-2 flex flex-col justify-end">
               <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors">
                 <Share2 className="h-4 w-4" />
                 <span>Share this product</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
