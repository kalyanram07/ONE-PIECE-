import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Users, Map, Image as ImageIcon, Info, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export const Navigation = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { name: 'Crew', href: '#crew', icon: Users },
    { name: 'Journey', href: '#journey', icon: Map },
    { name: 'Gallery', href: '#gallery', icon: ImageIcon },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Developer', href: '#developer', icon: Code },
    { name: 'GitHub', href: '#github', icon: FaGithub },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-8 glass rounded-full px-8 py-4 shadow-2xl"
      >
        <div className="font-cinzel text-xl font-bold tracking-widest text-white mr-4">OP</div>
        <div className="flex gap-8 text-sm font-sans tracking-widest text-white/70 uppercase">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all flex items-center gap-2"
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 w-full z-50 md:hidden glass border-t border-white/10 px-6 py-4 flex justify-between items-center"
      >
        {links.slice(0, 5).map((link) => {
          const Icon = link.icon;
          return (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-white/70 hover:text-white hover:scale-110 transition-all flex flex-col items-center gap-1"
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </motion.nav>
    </>
  );
};
