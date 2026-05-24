import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, CheckCircle2, ChevronRight, CreditCard, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-50 p-12 rounded-[2rem] flex flex-col items-center max-w-md"
        >
          <CheckCircle2 className="h-20 w-20 text-green-500 mb-6" />
          <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Payment Successful!</h1>
          <p className="text-gray-500 text-sm mb-8">
            Your order has been placed and will be with you shortly. Thank you for shopping with NIKE.
          </p>
          <Link
            to="/"
            className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Checkout Form */}
        <div className="flex-1 space-y-12">
          <div>
            <Link to="/shop" className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to shopping
            </Link>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Shipping Info */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 text-black">
                <Truck className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Shipping Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="FIRST NAME" className="col-span-1 bg-gray-50 border-none p-4 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-black outline-none" />
                <input required placeholder="LAST NAME" className="col-span-1 bg-gray-50 border-none p-4 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-black outline-none" />
                <input required placeholder="EMAIL ADDRESS" className="col-span-2 bg-gray-50 border-none p-4 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-black outline-none" />
                <input required placeholder="STREET ADDRESS" className="col-span-2 bg-gray-50 border-none p-4 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-black outline-none" />
                <input required placeholder="CITY" className="col-span-1 bg-gray-50 border-none p-4 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-black outline-none" />
                <input required placeholder="POSTAL CODE" className="col-span-1 bg-gray-50 border-none p-4 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-black outline-none" />
              </div>
            </section>

            {/* Payment */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 text-black">
                <CreditCard className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Payment Method</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="CARD NUMBER" className="col-span-2 bg-gray-50 border-none p-4 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-black outline-none" />
                <input required placeholder="EXP DATE (MM/YY)" className="col-span-1 bg-gray-50 border-none p-4 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-black outline-none" />
                <input required placeholder="CVV" className="col-span-1 bg-gray-50 border-none p-4 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-black outline-none" />
              </div>
            </section>

            <button
              disabled={isProcessing || cart.length === 0}
              className="w-full bg-black text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Complete Order</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-gray-50 p-8 rounded-[2rem] sticky top-32 space-y-8">
            <h3 className="text-lg font-black uppercase italic tracking-tighter">Order Summary</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs font-bold uppercase tracking-tight">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">x{item.quantity}</span>
                    <span className="line-clamp-1">{item.name}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {cart.length === 0 && <p className="text-gray-400 text-xs uppercase tracking-widest text-center py-4">Bag is empty</p>}
            </div>

            <div className="space-y-3 pt-8 border-t border-gray-200">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="flex justify-between pt-4 text-xl font-black text-black">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
