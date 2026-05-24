import { HERO_SLIDES } from '@/src/constants';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const slide = HERO_SLIDES[current];

  const animateSlide = (nextIndex: number, direction: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(nextIndex);
        
        // Prepare new slide entrance
        gsap.fromTo(contentRef.current, 
          { 
            x: direction > 0 ? 300 : -300, 
            opacity: 0,
            skewX: direction > 0 ? -20 : 20,
            rotateY: direction > 0 ? 45 : -45,
            scale: 0.8
          },
          { 
            x: 0, 
            opacity: 1, 
            skewX: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            onComplete: () => setIsAnimating(false)
          }
        );

        // Animate background text too
        gsap.fromTo(bgTextRef.current,
          {
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.8
          },
          {
            x: 0,
            opacity: 0.05,
            scale: 1,
            duration: 1.2,
            ease: "power4.out"
          }
        );
      }
    });

    // Exit current slide
    tl.to(contentRef.current, {
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      skewX: direction > 0 ? 20 : -20,
      rotateY: direction > 0 ? -45 : 45,
      scale: 0.8,
      duration: 0.6,
      ease: "power3.in"
    });

    tl.to(bgTextRef.current, {
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power3.in"
    }, 0);
  };

  const nextSlide = () => {
    const nextIndex = (current + 1) % HERO_SLIDES.length;
    animateSlide(nextIndex, 1);
  };

  const prevSlide = () => {
    const nextIndex = (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    animateSlide(nextIndex, -1);
  };

  const goToSlide = (index: number) => {
    if (index === current) return;
    animateSlide(index, index > current ? 1 : -1);
  };

  // Auto-slide every 5 seconds (increased for better UX)
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current, isAnimating]);

  const marqueeText = "NIKE . JUST DO IT . AUTHENTIC PRODUCTS . WORLDWIDE SHIPPING . LEGENDARY PERFORMANCE . NEW ARRIVALS . PREMIUM QUALITY . ";

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[750px] w-full overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: slide.themeColor + '10' }}
    >
      {/* Background Accent Element */}
      <div
         ref={bgTextRef}
         className="absolute inset-0 z-0 flex items-center justify-center opacity-5 select-none pointer-events-none"
      >
         <span className="text-[22vw] font-black italic tracking-tighter uppercase">NIKE</span>
      </div>

      {/* Main Content Carousel */}
      <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center z-10">
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
        >
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <div className="relative mb-16 mt-[-1rem] w-fit">
                 <div className="absolute inset-0 -m-6 flex items-center justify-center">
                    {/* Spinning Text Circle around Logo */}
                    <motion.div
                       animate={{ rotate: -360 }}
                       transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                       className="w-[120px] h-[120px] flex items-center justify-center"
                    >
                       <svg viewBox="0 0 100 100" className="w-full h-full text-black/20 font-black uppercase text-[10px] tracking-widest">
                          <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                          <text>
                             <textPath href="#circlePath">NIKE . JUST DO IT . NIKE . JUST DO IT . </textPath>
                          </text>
                       </svg>
                    </motion.div>
                 </div>
                 <svg
                    className="h-10 w-auto text-black relative z-10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.738-.273-1.99.635-3.756.47-.914 1.136-1.803 1.905-2.617a.6.6 0 011.05.351c-.135 1.132.182 1.83.952 2.094.46.157 1.057.067 1.79-.27L21 8.719z" />
                  </svg>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-4 block">
                {slide.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-black leading-[0.85] tracking-tighter mb-6 uppercase italic">
                {slide.name.split(' ').slice(0, 2).join(' ')}<br />
                <span style={{ color: slide.themeColor }}>{slide.name.split(' ').slice(2).join(' ')}</span>
              </h1>
              <p className="text-gray-600 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                {slide.description}
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-4 bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all"
              >
                <span>Shop Now</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Pagination indicators */}
            <div className="flex space-x-3 pt-8">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="group"
                >
                  <div
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      i === current ? 'w-12 bg-black' : 'w-6 bg-gray-300 group-hover:bg-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Image Content */}
          <div className="relative h-[500px] flex items-center justify-center">
             <div className="relative z-20 transform -rotate-[25deg] scale-110">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.3)] filter contrast-125"
                  referrerPolicy="no-referrer"
                />
                {/* Decorative element behind shoe */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -inset-10 bg-gradient-to-tr from-white/0 to-white/20 rounded-full blur-3xl -z-10"
                />
             </div>

             {/* Large Bold Floating Text Overlay */}
             <div className="absolute inset-0 flex flex-col justify-center items-center select-none pointer-events-none opacity-20 z-0">
                <span className="text-[11vw] font-black text-black leading-none italic tracking-tighter">MAX</span>
                <span className="text-[8vw] font-black text-black leading-none italic tracking-tighter">NIKE</span>
             </div>
          </div>
        </div>
      </div>

      {/* Infinite Text Marquee Slider */}
      <div className="absolute bottom-0 left-0 w-full bg-black py-4 overflow-hidden z-20 border-t border-white/10">
         <motion.div
            animate={{ x: '-50%' }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap"
         >
            <span className="text-[14px] font-black uppercase text-white/40 tracking-[0.4em] px-8">{marqueeText}</span>
            <span className="text-[14px] font-black uppercase text-white/40 tracking-[0.4em] px-8">{marqueeText}</span>
         </motion.div>
      </div>

      {/* Manual Navigation Controls */}
      <div className="absolute bottom-16 right-12 z-30 flex space-x-4">
        <button 
          onClick={prevSlide}
          disabled={isAnimating}
          className="p-4 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all group disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={isAnimating}
          className="p-4 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all group disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  ); 
}