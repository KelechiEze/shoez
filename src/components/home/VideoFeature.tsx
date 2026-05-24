import { motion } from 'motion/react';
import { useRef, useEffect } from 'react';

const VIDEO_ITEMS = [
  {
    id: 1,
    title: "Performance Excellence",
    subtitle: "Built for speed and comfort",
    videoUrl: "/det2.mp4",
  },
  {
    id: 2,
    title: "Street Style",
    subtitle: "Legacy meets modern design",
    videoUrl: "/det1.mp4",
  },
  {
    id: 3,
    title: "Dynamic Moves",
    subtitle: "Unmatched traction and support",
    videoUrl: "/det4.mp4",
  }
];

export default function VideoFeature() {
  // Create refs for each video
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Play all videos when component mounts
    videoRefs.current.forEach(video => {
      if (video) {
        video.play().catch(e => console.log("Video play failed:", e));
      }
    });
  }, []);

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        {VIDEO_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="flex-1 group relative aspect-[2/1] bg-black rounded-[4px] overflow-hidden"
          >
            <video
              ref={el => videoRefs.current[index] = el}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            >
              <source src={item.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-x-8 bottom-12 z-10 pointer-events-none">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-2 block">
                Feature {item.id}
              </span>
              <h3 className="text-3xl font-black text-white italic leading-tight uppercase tracking-tighter">
                {item.title}
              </h3>
              <p className="text-white/70 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                {item.subtitle}
              </p>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}