import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, Send, HelpCircle, Shield, Truck, RotateCcw } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(headingRef.current,
      { opacity: 0, scale: 0.98, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    if (cardsRef.current) {
      tl.fromTo(cardsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      );
    }

    tl.fromTo(formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const services = [
    { icon: <Truck className="h-6 w-6 text-black" />, title: 'SHIPPING SUPPORT', desc: 'Queries regarding premium fast-lines' },
    { icon: <RotateCcw className="h-6 w-6 text-black" />, title: 'REFUNDS & REPLACEMENTS', desc: 'Secure 30-day wear-test returns' },
    { icon: <Shield className="h-6 w-6 text-black" />, title: 'AUTHENTICITY CHECK', desc: 'Verify your elite lab serials' },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header section */}
        <div ref={headingRef} className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fdbd1a]">
            NIKE ATHLETE SERVICES
          </span>
          <h1 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter text-black">
            CONTACT <br />
            <span className="text-gray-400">THE CLUB</span>
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest font-bold leading-relaxed">
            Need elite support? Reach out regarding sizing calculations, physical collections, custom footwear specs, or shipping pipelines.
          </p>
        </div>

        {/* Support Grid Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {services.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs hover:shadow-2xl hover:border-gray-200 transition-all duration-500 group text-center flex flex-col items-center space-y-4"
            >
              <div className="p-4 bg-gray-50 group-hover:bg-[#fdbd1a] transition-colors rounded-2xl">
                {item.icon}
              </div>
              <h3 className="text-xs font-black uppercase tracking-wider text-black">{item.title}</h3>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact Form & Office Location columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Quick contact channels (Col: 5) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-black text-white rounded-3xl p-10 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-gray-800 rounded-full blur-2xl opacity-50" />
              
              <h3 className="text-2xl font-black italic uppercase tracking-tight relative z-10 text-[#fdbd1a]">
                HEADQUARTERS
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-[#fdbd1a] mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Beaverton Campus</p>
                    <p className="text-xs font-semibold text-gray-200">1 Bowerman Dr, Beaverton, OR 97005, USA</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-[#fdbd1a] mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Direct Email</p>
                    <p className="text-xs font-semibold text-gray-200">concierge@nike-experience.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-[#fdbd1a] mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</p>
                    <p className="text-xs font-semibold text-gray-200">+1 (503) 671-6453</p>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="pt-6 border-t border-gray-800 text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                * Our support line is active 24/7 for Global Premium Nike Club members. Non-members response window stands at 12 hours max.
              </div>
            </div>
          </div>

          {/* Form container (Col: 7) */}
          <div ref={formRef} className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-black italic uppercase tracking-tight mb-8 text-black">
              SECURE CONNECT
            </h3>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Send className="h-6 w-6" />
                </div>
                <h4 className="text-md font-black uppercase tracking-wider text-black">TRANSMISSION CONFIRMED</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                  Your details has been securely locked in. <br /> Our athlete support reps will initiate contact instantly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">YOUR NAME</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. LeBron James"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. lebron@nike.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">SUBJECT CATEGORY</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Sizing Consultation"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">DETAILED INQUIRY</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Detail your request regarding standard custom builds, size curves, or orders..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-black hover:bg-[#fdbd1a] hover:text-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2"
                >
                  <span>Submit Inquiry</span>
                  <Send className="h-3 w-3" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
