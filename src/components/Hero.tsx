import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import heroImg from '../assets/hero.png';
import oceanImg from '../assets/ocean.png';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 0: Black screen (0s - 1s)
    // Phase 1: Ocean ambience (1s - 3s)
    // Phase 2: Cloud/Text (3s - 5s)
    // Phase 3: Gear 5 Hero & CTA (5s+)
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 3000);
    const t3 = setTimeout(() => setPhase(3), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-black overflow-hidden">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Ocean Background */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${oceanImg})`, y, scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 0.4 : 0 }}
          transition={{ duration: 2 }}
        />

        {/* Hero Artwork */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
          style={{ backgroundImage: `url(${heroImg})`, y }}
          initial={{ opacity: 0, scale: 1.1, y: 50 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-20 opacity-60" />

        {/* Content */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-6xl md:text-9xl font-cinzel font-bold tracking-widest text-white drop-shadow-2xl mb-4">
              ONE PIECE
            </h1>
            <p className="text-xl md:text-3xl font-noto font-light tracking-[0.3em] text-accent uppercase">
              The Grand Line Experience
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="mt-16 px-8 py-4 glass text-white font-noto tracking-widest rounded-full uppercase text-sm font-semibold border border-white/20 hover:border-accent transition-colors"
          >
            Begin the Adventure
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
