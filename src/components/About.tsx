import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Anchor, Info } from 'lucide-react';

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="py-40 bg-[#020202] relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      
      {/* Background Typography Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 left-[-10%] text-[20vw] font-cinzel font-black text-white/5 whitespace-nowrap select-none pointer-events-none"
      >
        WEALTH
      </motion.div>
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-2/4 right-[-10%] text-[20vw] font-cinzel font-black text-white/5 whitespace-nowrap select-none pointer-events-none"
      >
        FAME
      </motion.div>
      <motion.div 
        style={{ y: y1 }}
        className="absolute bottom-1/4 left-[-5%] text-[20vw] font-cinzel font-black text-white/5 whitespace-nowrap select-none pointer-events-none"
      >
        POWER
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto px-8 text-center"
      >
        <div className="flex justify-center mb-8">
          <Info className="w-12 h-12 text-yellow-600" />
        </div>
        
        <h2 className="text-sm font-sans tracking-[0.5em] text-red-600 uppercase mb-4">
          The Great Pirate Era
        </h2>
        
        <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-white mb-12 leading-tight">
          Inherited Will. <br/>
          <span className="text-white/50">The Destiny of the Age.</span>
        </h1>

        <div className="space-y-8 text-white/70 font-serif text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          <p>
            Gol D. Roger, the King of the Pirates, attained everything this world has to offer. The words he spoke at his execution drove people to the seas:
          </p>
          
          <blockquote className="border-l-4 border-yellow-600 pl-6 py-2 text-2xl font-cinzel text-white text-left italic bg-white/5 pr-6 rounded-r-lg">
            "My treasure? If you want it, you can have it. Seek it out! I left everything this world has to offer there!"
          </blockquote>

          <p>
            And so, countless men head toward the Grand Line in pursuit of their dreams. The world has truly entered a Great Pirate Era!
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center gap-4">
          <div className="w-px h-24 bg-gradient-to-b from-red-600 to-transparent" />
          <Anchor className="w-6 h-6 text-red-600 opacity-50" />
        </div>
      </motion.div>
    </section>
  );
};
