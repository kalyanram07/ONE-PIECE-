import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ImageIcon } from 'lucide-react';

import img1 from '../assets/journey/1_romance_dawn.jpg';
import img2 from '../assets/journey/2_orange_town.jpg';
import img3 from '../assets/journey/3_syrup_village.jpg';
import img4 from '../assets/zoro.png'; // Baratie
import img5 from '../assets/journey/5_arlong_park.jpg';
import img6 from '../assets/journey/6_loguetown.jpg';
import img7 from '../assets/journey/7_reverse_mountain.jpg';
import img8 from '../assets/journey/8_drum_island.jpg';
import img9 from '../assets/journey/9_alabasta.jpg';
import img10 from '../assets/journey/10_skypiea.jpg';
import img11 from '../assets/journey/11_water_7.jpg';
import img12 from '../assets/journey/12_enies_lobby.jpg';
import img13 from '../assets/journey/13_thriller_bark.jpg';
import img14 from '../assets/journey/14_sabaody.jpg';
import img15 from '../assets/journey/15_marineford.jpg';
import img16 from '../assets/journey/16_post_war.jpg';
import img17 from '../assets/journey/17_fish_man_island.jpg';
import img18 from '../assets/journey/18_punk_hazard.jpg';
import img19 from '../assets/franky.png'; // Dressrosa
import img20 from '../assets/robin.png'; // Zou
import img21 from '../assets/journey/21_whole_cake_island.jpg';
import img22 from '../assets/journey/22_wano.jpg';
import img23 from '../assets/journey/23_egghead.jpg';
import img24 from '../assets/journey/24_finale.jpg';

const galleryItems = [
  { id: 1, arc: "Romance Dawn", title: "Luffy Gives Shanks His Hat", image: img1, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { id: 2, arc: "Orange Town", title: "Nami Begins Trusting Luffy", image: img2, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 3, arc: "Syrup Village", title: "Usopp Leaves Home", image: img3, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { id: 4, arc: "Baratie", title: "Zoro's Promise", image: img4, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 5, arc: "Arlong Park", title: '"Luffy... Help Me."', image: img5, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { id: 6, arc: "Loguetown", title: "Luffy Smiles Before Death", image: img6, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 7, arc: "Reverse Mountain", title: "Entering the Grand Line", image: img7, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { id: 8, arc: "Drum Island", title: "Hiluluk's Dream", image: img8, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { id: 9, arc: "Alabasta", title: "The X Mark", image: img9, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 10, arc: "Skypiea", title: "Ringing the Golden Bell", image: img10, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 11, arc: "Water 7", title: "Luffy vs Usopp", image: img11, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { id: 12, arc: "Enies Lobby", title: '"I WANT TO LIVE!"', image: img12, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-3' },
  { id: 13, arc: "Thriller Bark", title: "Nothing Happened", image: img13, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 14, arc: "Sabaody", title: "The Crew Disappears", image: img14, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 15, arc: "Marineford", title: "Ace's Death", image: img15, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { id: 16, arc: "Post-War", title: "3D2Y", image: img16, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 17, arc: "Fish-Man Island", title: "Luffy Challenges Big Mom", image: img17, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { id: 18, arc: "Punk Hazard", title: "Pirate Alliance", image: img18, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { id: 19, arc: "Dressrosa", title: "Gear Fourth", image: img19, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 20, arc: "Zou", title: '"Raizo is Safe"', image: img20, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 21, arc: "Whole Cake Island", title: "Luffy Waits for Sanji", image: img21, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { id: 22, arc: "Wano", title: "Gear 5 Awakening", image: img22, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { id: 23, arc: "Egghead", title: "Luffy vs Kizaru", image: img23, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 24, arc: "Finale", title: "The Inherited Will", image: img24, colSpan: 'md:col-span-3', rowSpan: 'md:row-span-3' }
];

export const Gallery = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="gallery" ref={containerRef} className="py-32 bg-[#050505] relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <ImageIcon className="w-12 h-12 text-red-600 mb-6" />
          <h2 className="text-sm font-sans tracking-[0.5em] text-red-600 uppercase mb-4">
            The Journey
          </h2>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-white tracking-widest">
            Epic <span className="text-red-600">Sagas</span>
          </h1>
          <p className="text-white/40 mt-6 max-w-2xl font-serif text-lg">
            Witness the most legendary, goosebump-inducing moments from every major arc of the Great Pirate Era.
          </p>
        </div>

        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-4 auto-rows-[150px] gap-4">
          {galleryItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${item.colSpan} ${item.rowSpan} border border-white/10`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-red-500 text-xs md:text-sm tracking-[0.2em] uppercase font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.arc}
                </p>
                <h3 className="text-white font-cinzel font-bold text-lg md:text-2xl tracking-wider drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
