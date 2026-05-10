import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { motion } from 'motion/react';

const NIKE_ART = [
  { id: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', tag: 'Legacy' },
  { id: 2, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop', tag: 'Innovation' },
  { id: 3, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop', tag: 'Performance' },
  { id: 4, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop', tag: 'Style' },
  { id: 5, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop', tag: 'Culture' },
  { id: 6, image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop', tag: 'Vision' },
  { id: 7, image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=800&auto=format&fit=crop', tag: 'Originals' },
  { id: 8, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop', tag: 'Design' },
  { id: 9, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop', tag: 'Future' },
  { id: 10, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop', tag: 'Speed' },
  { id: 11, image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop', tag: 'Elite' },
  { id: 12, image: 'https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=800&auto=format&fit=crop', tag: 'Heritage' },
];

interface ScrollColumnProps {
  items: typeof NIKE_ART;
  direction: 'up' | 'down';
  speed: number;
  offsetTop?: string;
  heightClass: string;
}

const ScrollColumn: React.FC<ScrollColumnProps> = ({ items, direction, speed, offsetTop, heightClass }) => {
  const columnRef = useRef<HTMLDivElement>(null);
  
  // Triple the items for a smooth infinite loop
  const displayItems = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!columnRef.current) return;
      
      const totalHeight = columnRef.current.scrollHeight / 3;
      
      gsap.to(columnRef.current, {
        y: direction === 'up' ? -totalHeight : totalHeight,
        duration: speed,
        ease: 'none',
        repeat: -1,
        modifiers: {
          y: (y) => {
            const val = parseFloat(y);
            if (direction === 'up') {
              return `${val % totalHeight}px`;
            } else {
              return `${(val % totalHeight) - totalHeight}px`;
            }
          }
        }
      });
    });

    return () => ctx.revert();
  }, [direction, speed]);

  return (
    <div 
      className={`relative overflow-hidden ${heightClass} rounded-3xl group/col`}
      style={{ marginTop: offsetTop || '0px' }}
    >
      <div 
        ref={columnRef}
        className="flex flex-col gap-4"
      >
        {displayItems.map((item, idx) => (
          <div 
            key={`${item.id}-${idx}`} 
            className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-crosshair transform transition-all duration-500 hover:scale-[0.98] border border-black/5"
          >
            <img 
              src={item.image} 
              alt={item.tag} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            
            <div className="absolute top-4 left-4">
              <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-[0.2em]">
                {item.tag}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="text-white text-4xl font-black italic uppercase tracking-tighter drop-shadow-2xl opacity-10">NIKE</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function NikeShowcase() {
  // Deterministic shuffle
  const shuffle = (arr: typeof NIKE_ART, seed: number) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor((seed + i) * 9301 + 49297) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const columns = useMemo(() => ({
    c1: shuffle(NIKE_ART, 11),
    c2: shuffle(NIKE_ART, 22),
    c3: shuffle(NIKE_ART, 33),
    c4: shuffle(NIKE_ART, 44),
    c5: shuffle(NIKE_ART, 55),
  }), []);

  return (
    <section className="py-32 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden mb-[10px]">
      <div className="mb-20 text-center space-y-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fdbd1a]"
        >
          Limitness Innovation
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase italic"
        >
          The Archive
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-xs uppercase tracking-widest font-bold"
        >
          Decades of pushing boundaries. Every stitch tells a story of performance, culture, and the pursuit of greatness.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 h-[800px] mb-24">
        <ScrollColumn 
          items={columns.c1} 
          direction="up" 
          speed={40} 
          heightClass="h-full" 
          offsetTop="0px" 
        />
        <div className="hidden md:block">
           <ScrollColumn 
            items={columns.c2} 
            direction="down" 
            speed={35} 
            heightClass="h-[90%]" 
            offsetTop="80px" 
          />
        </div>
        <div className="hidden lg:block">
          <ScrollColumn 
            items={columns.c3} 
            direction="up" 
            speed={30} 
            heightClass="h-[80%]" 
            offsetTop="160px" 
          />
        </div>
        <div className="hidden md:block">
          <ScrollColumn 
            items={columns.c4} 
            direction="down" 
            speed={38} 
            heightClass="h-[90%]" 
            offsetTop="80px" 
          />
        </div>
        <ScrollColumn 
          items={columns.c5} 
          direction="up" 
          speed={45} 
          heightClass="h-full" 
          offsetTop="0px" 
        />
      </div>

      {/* Decorative Finish */}
      <div className="flex flex-col items-center">
         <div className="w-[1px] h-32 bg-gray-100 mb-8" />
         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">End of Exhibition</span>
      </div>
    </section>
  );
}
