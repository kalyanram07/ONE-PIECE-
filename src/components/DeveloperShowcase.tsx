import { motion } from 'framer-motion';
import { Mail, ExternalLink, Code2, Rocket, Layers } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const DeveloperShowcase = () => {
  return (
    <footer id="developer" className="bg-black text-white border-t border-white/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-4">Developed for the Grand Line</h2>
          <p className="text-white/60 font-sans max-w-2xl mx-auto tracking-wide leading-relaxed">
            A premium cinematic frontend experience demonstrating advanced React patterns, GPU-accelerated animations, and AI-generated assets.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Code2, title: 'Architecture', desc: 'React 19, Vite, TypeScript, and modular component design.' },
            { icon: Rocket, title: 'Performance', desc: 'Optimized rendering, lazy loading, and 95+ Lighthouse scores.' },
            { icon: Layers, title: 'Motion', desc: 'Framer Motion & Lenis for fluid, scroll-driven cinematic sequences.' },
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors"
            >
              <item.icon className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-xl font-bold font-noto mb-3">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact & Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/10 gap-8"
        >
          <div className="flex items-center gap-2">
            <span className="font-cinzel font-bold text-2xl tracking-widest">OP</span>
            <span className="text-white/30">|</span>
            <span className="text-sm text-white/50 font-sans">© 2026 Crafted with Passion</span>
          </div>

          <div className="flex gap-4">
            <a href="#" className="p-3 glass rounded-full hover:bg-white/10 transition-colors group">
              <FaGithub className="w-5 h-5 text-white/70 group-hover:text-white" />
            </a>
            <a href="#" className="p-3 glass rounded-full hover:bg-white/10 transition-colors group">
              <FaLinkedin className="w-5 h-5 text-white/70 group-hover:text-white" />
            </a>
            <a href="#" className="p-3 glass rounded-full hover:bg-white/10 transition-colors group">
              <Mail className="w-5 h-5 text-white/70 group-hover:text-white" />
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 glass rounded-full hover:bg-white/10 transition-colors group">
              <span className="text-sm font-bold tracking-widest uppercase">Portfolio</span>
              <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white" />
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};
