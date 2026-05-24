import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles, Trophy, Calendar, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const SPECIAL_COLLECTIONS = [
  {
    id: 'col-1',
    name: 'Jordan Champion Series',
    year: '1991 - 1998 Legacy',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#e11d48',
    tag: 'HOOPS ICON',
    details: 'The shoes worn during MJ’s historic double three-peat. Re-engineered with modern Zoom cushioning but faithful to retro design lines.'
  },
  {
    id: 'col-2',
    name: 'Nike React Off-White',
    year: 'Luxe Architecture',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#fdbd1a',
    tag: 'DECONSTRUCTED',
    details: 'The iconic high fashion deconstructed architecture. Featuring trademark Helvetica branding, safety tags, and raw industrial foam lines.'
  },
  {
    id: 'col-3',
    name: 'Nike VaporMax Air Lab',
    year: 'Future Tech',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#38bdf8',
    tag: 'MAX SUSPENSION',
    details: 'Floating on atmospheric pressure. Designed in our innovation speed lab with 3D print weaves and pressurized air pillars.'
  },
  {
    id: 'col-4',
    name: 'Streetwear Vintage Classics',
    year: '77 Heritage',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#10b981',
    tag: 'ORIGINALS',
    details: 'Serrated leather Swooshes, weathered foam details, and classic vulcanized rubber outsoles. Pure 70s retro courtside mood.'
  }
];

export default function CollectionsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const headerRef = useRef<HTMLDivElement>(null);
  const flexContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(headerRef.current,
      { opacity: 0, scale: 0.96, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    if (flexContainerRef.current) {
      const items = flexContainerRef.current.children;
      tl.fromTo(items,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      );
    }
  }, []);

  return (
    <div className="pt-28 pb-24 bg-zinc-950 text-white min-h-screen selection:bg-zinc-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Title */}
        <div ref={headerRef} className="mb-24 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full">
            <Sparkles className="h-4 w-4 text-[#fdbd1a]" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-[#fdbd1a]">EXHIBITIONS & LAB CODES</span>
          </div>
          <h1 className="text-5xl sm:text-8xl font-black italic tracking-tighter uppercase leading-none">
            LEGENDARY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#fdbd1a] to-sky-400">
              COLLECTIONS
            </span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed tracking-wide font-medium">
            Explore the high-concept collaborative projects, micro-drops, and historic heritage releases direct from the Beaverton speed laboratories.
          </p>
        </div>

        {/* Dynamic Collections List */}
        <div ref={flexContainerRef} className="space-y-24">
          {SPECIAL_COLLECTIONS.map((col, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={col.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center justify-between border-b border-zinc-900 pb-20`}
              >
                {/* Visual Cover */}
                <div className="w-full lg:w-1/2 relative group rounded-3xl overflow-hidden aspect-[16/10] bg-zinc-900 border border-zinc-800">
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-500" />
                  
                  {/* Decorative Frame */}
                  <div 
                    className="absolute inset-4 border border-white/10 rounded-2xs z-20 pointer-events-none transition-transform duration-500 group-hover:scale-[0.98]"
                    style={{ borderColor: col.accentColor + '30' }}
                  />

                  <img 
                    src={col.image} 
                    alt={col.name} 
                    className="w-full h-full object-cover transform duration-1000 group-hover:scale-105"
                  />

                  {/* Corner Badge */}
                  <div className="absolute bottom-6 left-6 z-20 flex items-center space-x-2 bg-black/80 backdrop-blur-md px-4 py-2 border border-zinc-800 rounded-full">
                    <Calendar className="h-3 w-3 text-zinc-300" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300">{col.year}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="w-full lg:w-5/12 space-y-6">
                  <div className="flex items-center space-x-2">
                    <span 
                      className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full text-black"
                      style={{ backgroundColor: col.accentColor }}
                    >
                      {col.tag}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-500">0{index + 1} / SERIES</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter text-white">
                    {col.name}
                  </h2>

                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {col.details}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-3 pt-2">
                    {['Certified Original Construction', 'Full Air or React Core Suspension', 'Premium Bespoke Collectible Packaging'].map((item, id) => (
                      <li key={id} className="flex items-center space-x-3 text-zinc-300 font-semibold text-xs">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-8">
                    <Link 
                      to="/shop"
                      className="inline-flex items-center space-x-4 bg-white text-black hover:bg-zinc-100 px-10 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-full transition-all hover:translate-x-2"
                    >
                      <span>Examine Series</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-32 p-12 sm:p-20 rounded-3xl bg-zinc-900 border border-zinc-800 relative overflow-hidden flex flex-col items-center text-center space-y-6">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-[#fdbd1a]/10 rounded-full blur-3xl pointer-events-none" />
          
          <Trophy className="h-10 w-10 text-[#fdbd1a]" />
          <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter">NIKE MEMBER CHANNELS</h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl uppercase tracking-widest leading-relaxed">
            Gain secure priority invitations to shock drops, regional members-only colorways, and historical archives.
          </p>
          <button className="px-12 py-4 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-all rounded-full">
            Register for access
          </button>
        </div>
      </div>
    </div>
  );
}
