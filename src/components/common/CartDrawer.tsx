import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">Your Bag</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="h-12 w-12 text-gray-200" />
                  <p className="text-gray-500 font-medium">Your bag is empty.</p>
                  <button
                    onClick={onClose}
                    className="text-xs font-bold uppercase tracking-widest underline underline-offset-4"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="w-full h-auto object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-tight line-clamp-1">{item.name}</h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-100 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-black text-gray-400"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-black text-gray-400"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-xs font-black">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:text-red-500 transition-colors self-start"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Total</span>
                  <span className="text-xl font-black">${cartTotal.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors"
                >
                  <span>Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
