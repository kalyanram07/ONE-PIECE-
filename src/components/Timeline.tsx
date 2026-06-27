import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const arcs = [
  "East Blue",
  "Reverse Mountain",
  "Alabasta",
  "Skypiea",
  "Water 7",
  "Enies Lobby",
  "Thriller Bark",
  "Marineford",
  "Fish-Man Island",
  "Dressrosa",
  "Whole Cake Island",
  "Wano",
  "Egghead"
];

const TimelineNode = ({ arc, index }: { arc: string, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`flex items-center w-full my-12 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'}`}>
        <div className="glass p-6 rounded-2xl inline-block hover:bg-white/5 transition-colors cursor-default border border-white/10 hover:border-accent">
          <p className="text-xs text-white/50 tracking-[0.3em] uppercase mb-2">Arc {String(index + 1).padStart(2, '0')}</p>
          <h3 className="text-2xl font-cinzel text-white font-bold">{arc}</h3>
        </div>
      </div>
      
      {/* Node Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-accent z-10" />
    </motion.div>
  );
};

export const Timeline = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="journey" ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="text-center mb-24 relative z-20">
        <h2 className="text-5xl font-cinzel font-bold text-white mb-4">The Journey</h2>
        <p className="text-white/60 tracking-widest font-sans uppercase text-sm">Path to the Pirate King</p>
      </div>

      <div className="max-w-4xl mx-auto relative z-20 px-4">
        {/* Center Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-accent origin-top"
          style={{ scaleY: scrollYProgress }}
        />

        <div className="relative pb-24">
          {arcs.map((arc, index) => (
            <TimelineNode key={arc} arc={arc} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
