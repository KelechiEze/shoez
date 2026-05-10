import { motion } from 'motion/react';

export default function Trending() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto space-y-24">
      <div className="space-y-12">
        <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Trending Now</h2>

        <div className="relative aspect-[21/9] w-full overflow-hidden group rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop"
            alt="React Presto"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-12 md:px-24">
            <span className="text-[11px] font-bold text-white/70 uppercase tracking-[0.3em] mb-4">
              New from Nike Sportswear
            </span>
            <h3 className="text-4xl md:text-6xl font-black text-white italic mb-6">
              REACT PRESTO
            </h3>
            <p className="text-white/80 text-sm max-w-xs mb-8">
              With React foam for the most comfortable Presto ever.
            </p>
            <button className="w-fit bg-white text-black px-8 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Shop
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden group">
          <img
            src="/IMG_3106.JPG.jpeg"
            alt="Summer Must-Haves"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-10 left-10">
             <p className="text-white text-lg font-bold leading-tight">
               Summer Must-Haves:<br />Air Max Dia
             </p>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden group">
          <img
            src="/IMG_3107.JPG.jpeg"
            alt="Air Jordan 11"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-10 left-10">
             <p className="text-white text-lg font-bold leading-tight">
               Air Jordan 11 Retro<br />Low LE
             </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white relative overflow-hidden py-16">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fdbd1a]/20 skew-x-[-15deg] translate-x-1/2" />

         <div className="flex-1 space-y-6 z-10">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
              Create your design
            </span>
            <h3 className="text-4xl md:text-6xl font-black text-black italic leading-none">
              NIKE REACT PRESTO<br />BY YOU
            </h3>
            <p className="text-gray-600 text-sm max-w-sm mb-8 leading-relaxed">
              Take advantage of brand new, proprietary cushioning technology with a fresh pair of Nike React shoes.
            </p>
            <button className="bg-black text-white px-10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Create
            </button>
         </div>

         <div className="flex-1 relative z-10">
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop"
              alt="Nike By You"
              className="w-full h-auto drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
         </div>
      </div>
    </section>
  );
}
