import { motion } from 'motion/react';
import { useRef, useEffect } from 'react';

export default function TrendingVideo() {
  // Video refs for ensuring infinite loop
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const video4Ref = useRef<HTMLVideoElement>(null);
  const video5Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure all videos play and loop
    const videos = [video1Ref, video2Ref, video3Ref, video4Ref, video5Ref];
    videos.forEach(videoRef => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Video play failed:", e));
      }
    });
  }, []);

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto space-y-24">
      <div className="space-y-12">
        <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Trending Now</h2>

        {/* Hero Video Section */}
        <div className="relative aspect-[21/9] w-full overflow-hidden group rounded-3xl">
          <video
            ref={video1Ref}
            src="/det1.mp4"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            autoPlay
            loop
            muted
            playsInline
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

      {/* Grid Video Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden group">
          <video
            ref={video2Ref}
            src="/det2.mp4"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute bottom-10 left-10">
             <p className="text-white text-lg font-bold leading-tight drop-shadow-lg">
               Summer Must-Haves:<br />Air Max Dia
             </p>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden group">
          <video
            ref={video3Ref}
            src="/det3.mp4"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute bottom-10 left-10">
             <p className="text-white text-lg font-bold leading-tight drop-shadow-lg">
               Air Jordan 11 Retro<br />Low LE
             </p>
          </div>
        </div>
      </div>

      {/* Custom Design Section with Video */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white relative overflow-hidden py-16">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fdbd1a]/20 skew-x-[-15deg] translate-x-1/2" />

         <div className="flex-1 space-y-6 z-10 px-6 md:px-0">
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

         <div className="flex-1 relative z-10 px-6 md:px-0">
            <motion.video
              ref={video4Ref}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              src="/det4.mp4"
              className="w-full h-auto drop-shadow-2xl rounded-2xl"
              autoPlay
              loop
              muted
              playsInline
            />
         </div>
      </div>
    </section>
  );
}