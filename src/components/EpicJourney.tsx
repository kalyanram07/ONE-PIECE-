import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Images
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

const journeyData = [
  {
    arc: "Romance Dawn",
    title: "Luffy Gives Shanks His Hat",
    quote: '"Bring this hat back to me someday... when you\'ve become a great pirate."',
    desc: "A young Luffy cries after being saved by Shanks. Instead of scolding him... Shanks places his treasured straw hat on Luffy's head.",
    image: img1
  },
  {
    arc: "Orange Town",
    title: "Nami Begins Trusting Luffy",
    quote: '"You\'re... different from the other pirates."',
    desc: "For the first time, Nami starts believing there might actually be good pirates. A tiny emotional moment that changes everything.",
    image: img2
  },
  {
    arc: "Syrup Village",
    title: "Usopp Leaves Home",
    quote: '"I am a brave warrior of the sea!"',
    desc: "He isn't strong. He isn't fearless. But he sails anyway. A reminder that courage isn't the absence of fear.",
    image: img3
  },
  {
    arc: "Baratie",
    title: "Zoro's Promise",
    quote: '"I WILL NEVER LOSE AGAIN!"',
    desc: "After losing to Mihawk, Zoro raises his sword. Luffy simply smiles. He already believed him.",
    image: img4
  },
  {
    arc: "Arlong Park",
    title: '"Luffy... Help Me."',
    quote: '"OF COURSE I WILL!"',
    desc: "Nami finally breaks. She asks for help. Luffy silently places the straw hat on her head, then walks toward Arlong Park.",
    image: img5
  },
  {
    arc: "Loguetown",
    title: "Luffy Smiles Before Death",
    quote: '"Sorry... I\'m dead."',
    desc: "Just like Roger. He's about to die. Yet... he smiles. Everyone realizes Roger's spirit lives on.",
    image: img6
  },
  {
    arc: "Reverse Mountain",
    title: "Entering the Grand Line",
    quote: '"The Grand Line is right there!"',
    desc: "The beginning of the real adventure. Ocean currents. Storms. Dreams. Everything changes here.",
    image: img7
  },
  {
    arc: "Drum Island",
    title: "Hiluluk's Dream",
    quote: '"When do you think people die? When they are forgotten."',
    desc: "The cherry blossoms bloom. Chopper cries. One Piece becomes more than pirates.",
    image: img8
  },
  {
    arc: "Alabasta",
    title: "The X Mark",
    quote: '"No matter what happens, this mark on our left arms is the sign of our friendship!"',
    desc: "The Marines are watching. Nobody can speak. Instead... everyone raises their arm. The X mark. No words. Only friendship.",
    image: img9
  },
  {
    arc: "Skypiea",
    title: "Ringing the Golden Bell",
    quote: '"Let them hear it... The city of gold is in the sky!"',
    desc: "The bell echoes. Far below, Cricket hears it. His dream was true.",
    image: img10
  },
  {
    arc: "Water 7",
    title: "Luffy vs Usopp",
    quote: '"It\'s heavy..."',
    desc: "Friends become enemies. Neither wants to fight. Everyone cries.",
    image: img11
  },
  {
    arc: "Enies Lobby",
    title: '"I WANT TO LIVE!"',
    quote: '"Take me out to the sea with you!"',
    desc: "Robin, who spent her life running, finally chooses life. The Straw Hats declare war on the World Government.",
    image: img12
  },
  {
    arc: "Thriller Bark",
    title: "Nothing Happened",
    quote: '"Nothing happened."',
    desc: "After taking all of Luffy's pain... Sanji asks 'What happened?'. Zoro replies 'Nothing happened.' Absolute chills.",
    image: img13
  },
  {
    arc: "Sabaody",
    title: "The Crew Disappears",
    quote: '"I couldn\'t save... a single one of my friends!"',
    desc: "One by one... Everyone vanishes. Luffy screams. Complete helplessness.",
    image: img14
  },
  {
    arc: "Marineford",
    title: "Ace's Death",
    quote: '"Thank you... for loving me!"',
    desc: "The most heartbreaking moment. Ace dies smiling, thanking everyone for loving him.",
    image: img15
  },
  {
    arc: "Post-War",
    title: "3D2Y",
    quote: '"We will meet again in 2 years!"',
    desc: "The message isn't for enemies. It's for his crew. Wait two years. We'll return stronger.",
    image: img16
  },
  {
    arc: "Fish-Man Island",
    title: "Luffy Challenges Big Mom",
    quote: '"I will defeat you all and make Fish-Man Island my territory!"',
    desc: "Without fear. He declares war. A Yonko notices him.",
    image: img17
  },
  {
    arc: "Punk Hazard",
    title: "Pirate Alliance",
    quote: '"Are you going to betray me?"',
    desc: "Luffy and Law shake hands. The New World begins.",
    image: img18
  },
  {
    arc: "Dressrosa",
    title: "Gear Fourth",
    quote: '"I will not be crushed!"',
    desc: "Bounce Man. Everyone loses their minds.",
    image: img19
  },
  {
    arc: "Zou",
    title: '"Raizo is Safe"',
    quote: '"Raizo... is safe!"',
    desc: "The Minks endured torture for weeks. Yet they never betrayed Raizo. One sentence. Entire fandom cried.",
    image: img20
  },
  {
    arc: "Whole Cake Island",
    title: "Luffy Waits for Sanji",
    quote: '"I won\'t become Pirate King without you!"',
    desc: "One of Luffy's purest moments.",
    image: img21
  },
  {
    arc: "Wano",
    title: "Gear 5 Awakening",
    quote: '"I can do everything I wanted to do!"',
    desc: "Joy Boy returns. Drums of Liberation. White clouds. The impossible becomes reality.",
    image: img22
  },
  {
    arc: "Egghead",
    title: "Luffy vs Kizaru",
    quote: '"Things are getting fun!"',
    desc: "The world's strongest powers collide. Gear 5 shows complete freedom in combat.",
    image: img23
  },
  {
    arc: "Finale",
    title: "The Inherited Will",
    quote: '"Inherited Will, The Destiny of the Age, and the Dreams of the People... As long as people continue to pursue the meaning of freedom, these things shall never cease to be."',
    desc: "The greatest story ever told.",
    image: img24
  }
];

export const EpicJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const sections = containerRef.current.children;
      let currentIdx = 0;
      
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        // If section is roughly in view
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          currentIdx = i;
          break;
        }
      }
      
      if (currentIdx !== activeIndex) {
        setActiveIndex(currentIdx);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeIndex]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth custom-scrollbar"
    >
      {journeyData.map((data, index) => {
        const isActive = index === activeIndex;
        return (
          <div 
            key={index} 
            className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden"
          >
            {/* Background Image with Parallax / Zoom effect */}
            <motion.div
              initial={false}
              animate={{ 
                scale: isActive ? 1.05 : 1,
                opacity: isActive ? 0.6 : 0.2
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${data.image})`, filter: 'brightness(0.7)' }}
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl px-6 md:px-12 w-full flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
                    <h4 className="text-red-500 font-sans tracking-[0.4em] uppercase text-sm md:text-base font-bold mb-4 drop-shadow-md">
                      {data.arc}
                    </h4>
                    <h2 className="text-4xl md:text-7xl font-cinzel font-bold text-white mb-8 tracking-wider drop-shadow-2xl">
                      {data.title}
                    </h2>
                    
                    <div className="w-24 h-[1px] bg-red-600/50 mx-auto mb-8" />
                    
                    <h3 className="text-xl md:text-3xl font-serif italic text-white/90 mb-6 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
                      {data.quote}
                    </h3>
                    
                    <p className="text-white/60 font-sans text-sm md:text-lg max-w-2xl mx-auto tracking-wide leading-loose">
                      {data.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scroll Indicator */}
            {index < journeyData.length - 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white font-bold">Scroll</span>
                <ChevronDown className="text-white w-5 h-5" />
              </div>
            )}
            
            {/* Progress Indicator */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {journeyData.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 transition-all duration-300 ${i === activeIndex ? 'h-8 bg-red-600' : 'h-2 bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        );
      })}
      
      {/* Scrollbar styles to hide standard scrollbar in this view */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
