import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef } from 'react';
import { Swords, CloudLightning, Target, Utensils, Cross, BookOpen, Wrench, Music, Anchor, Crown, Compass, Droplet, Zap } from 'lucide-react';
import { FaSkull } from 'react-icons/fa';
import luffyImg from '../assets/luffy.png';
import zoroImg from '../assets/zoro.png';
import namiImg from '../assets/nami.png';
import usoppImg from '../assets/usopp.png';
import sanjiImg from '../assets/sanji.png';
import chopperImg from '../assets/chopper.png';
import robinImg from '../assets/robin.png';
import frankyImg from '../assets/franky.png';
import brookImg from '../assets/brook.png';
import jinbeImg from '../assets/jinbe.png';

const characters = [
  {
    id: 'luffy',
    name: 'LUFFY',
    fullName: 'MONKEY D. LUFFY',
    firstName: 'MONKEY D.',
    lastName: 'LUFFY',
    japaneseName: 'モンキー・D・ルフィ',
    role: 'CAPTAIN OF THE STRAW HAT PIRATES',
    quote: '"I don\'t want to conquer anything. I just think the guy with the most freedom in this whole ocean... is the Pirate King!"',
    stats: { Power: 100, Speed: 90, Intelligence: 40, Durability: 95, Leadership: 100 },
    devilFruit: { name: 'Gomu Gomu no Mi', type: '(Hito Hito no Mi, Model: Nika)' },
    haki: ['Conqueror\'s Haki', 'Armament Haki', 'Observation Haki'],
    dream: 'To become the Pirate King!',
    form: { name: 'GEAR 5', desc: 'The awakened form of his Devil Fruit. His body gains the properties of rubber and he fights with "freedom" itself!' },
    bounty: '3,000,000,000',
    image: luffyImg,
    icon: Crown
  },
  {
    id: 'zoro',
    name: 'ZORO',
    fullName: 'RORONOA ZORO',
    firstName: 'RORONOA',
    lastName: 'ZORO',
    japaneseName: 'ロロノア・ゾロ',
    role: 'COMBATANT OF THE STRAW HAT PIRATES',
    quote: '"A wound that\'d make an ordinary man unconscious... I won\'t lose to it. A wound that would kill an ordinary person... I won\'t lose to it!"',
    stats: { Power: 98, Speed: 85, Intelligence: 50, Durability: 100, Leadership: 70 },
    devilFruit: null,
    haki: ['Conqueror\'s Haki', 'Armament Haki', 'Observation Haki'],
    dream: 'To become the World\'s Greatest Swordsman!',
    form: { name: 'KING OF HELL', desc: 'By releasing all of his Advanced Conqueror\'s Haki, Zoro achieves his ultimate demonic state.' },
    bounty: '1,111,000,000',
    image: zoroImg,
    icon: Swords
  },
  {
    id: 'nami',
    name: 'NAMI',
    fullName: 'NAMI',
    firstName: 'CAT BURGLAR',
    lastName: 'NAMI',
    japaneseName: 'ナミ',
    role: 'NAVIGATOR OF THE STRAW HAT PIRATES',
    quote: '"What good is treasure if I\'m alone?"',
    stats: { Power: 40, Speed: 70, Intelligence: 100, Durability: 40, Leadership: 85 },
    devilFruit: null,
    haki: [],
    dream: 'To draw a map of the entire world!',
    form: { name: 'ZEUS BREEZE TEMPO', desc: 'Combining her Sorcery Clima-Tact with the homie Zeus for devastating lightning attacks.' },
    bounty: '366,000,000',
    image: namiImg,
    icon: CloudLightning
  },
  {
    id: 'usopp',
    name: 'USOPP',
    fullName: 'GOD USOPP',
    firstName: 'GOD',
    lastName: 'USOPP',
    japaneseName: 'ウソップ',
    role: 'SNIPER OF THE STRAW HAT PIRATES',
    quote: '"There comes a time when a man has to stand and fight! That time is when his friends\' dreams are being laughed at!"',
    stats: { Power: 30, Speed: 60, Intelligence: 85, Durability: 80, Leadership: 60 },
    devilFruit: null,
    haki: ['Observation Haki'],
    dream: 'To become a brave warrior of the sea!',
    form: { name: 'POP GREENS', desc: 'Using aggressive plant life from the Boin Archipelago as extremely versatile ammunition.' },
    bounty: '500,000,000',
    image: usoppImg,
    icon: Target
  },
  {
    id: 'sanji',
    name: 'SANJI',
    fullName: 'VINSMOKE SANJI',
    firstName: 'VINSMOKE',
    lastName: 'SANJI',
    japaneseName: 'ヴィンスモーク・サンジ',
    role: 'COOK OF THE STRAW HAT PIRATES',
    quote: '"I\'ll never kick a woman, even if I die!"',
    stats: { Power: 93, Speed: 98, Intelligence: 85, Durability: 90, Leadership: 65 },
    devilFruit: null,
    haki: ['Armament Haki', 'Observation Haki'],
    dream: 'To find the legendary All Blue!',
    form: { name: 'IFRIT JAMBE', desc: 'Combining his Germa exoskeleton with Armament Haki to create incredibly hot blue flames.' },
    bounty: '1,032,000,000',
    image: sanjiImg,
    icon: Utensils
  },
  {
    id: 'chopper',
    name: 'CHOPPER',
    fullName: 'TONY TONY CHOPPER',
    firstName: 'TONY TONY',
    lastName: 'CHOPPER',
    japaneseName: 'トニートニー・チョッパー',
    role: 'DOCTOR OF THE STRAW HAT PIRATES',
    quote: '"I\'ll become a doctor who can cure any disease! Because... there\'s no disease in this world that can\'t be cured!"',
    stats: { Power: 65, Speed: 60, Intelligence: 95, Durability: 70, Leadership: 30 },
    devilFruit: { name: 'Hito Hito no Mi', type: '(Zoan)' },
    haki: [],
    dream: 'To become a panacea capable of curing any disease!',
    form: { name: 'MONSTER POINT', desc: 'Consuming the Rumble Ball forces his Devil Fruit into an uncontrollable gigantic awakening.' },
    bounty: '1,000', 
    image: chopperImg,
    icon: Cross
  },
  {
    id: 'robin',
    name: 'ROBIN',
    fullName: 'NICO ROBIN',
    firstName: 'NICO',
    lastName: 'ROBIN',
    japaneseName: 'ニコ・ロビン',
    role: 'ARCHAEOLOGIST OF THE STRAW HAT PIRATES',
    quote: '"Fools who don\'t respect the past are likely to repeat it."',
    stats: { Power: 75, Speed: 65, Intelligence: 100, Durability: 60, Leadership: 50 },
    devilFruit: { name: 'Hana Hana no Mi', type: '(Paramecia)' },
    haki: [],
    dream: 'To find the Rio Poneglyph and uncover the True History!',
    form: { name: 'DEMONIO FLEUR', desc: 'Creating a massive demonic clone of herself using thousands of sprouted limbs.' },
    bounty: '930,000,000',
    image: robinImg,
    icon: BookOpen
  },
  {
    id: 'franky',
    name: 'FRANKY',
    fullName: 'FRANKY',
    firstName: 'IRON MAN',
    lastName: 'FRANKY',
    japaneseName: 'フランキー',
    role: 'SHIPWRIGHT OF THE STRAW HAT PIRATES',
    quote: '"No matter what kind of weapons a ship may have, there is no crime in existing!"',
    stats: { Power: 85, Speed: 40, Intelligence: 90, Durability: 95, Leadership: 60 },
    devilFruit: null,
    haki: [],
    dream: 'To build a dream ship that can sail to the end of the world!',
    form: { name: 'GENERAL FRANKY', desc: 'Piloting a giant robotic mecha equipped with laser beams and massive swords.' },
    bounty: '394,000,000',
    image: frankyImg,
    icon: Wrench
  },
  {
    id: 'brook',
    name: 'BROOK',
    fullName: 'BROOK',
    firstName: 'SOUL KING',
    lastName: 'BROOK',
    japaneseName: 'ブルック',
    role: 'MUSICIAN OF THE STRAW HAT PIRATES',
    quote: '"Death is never an apology!"',
    stats: { Power: 70, Speed: 95, Intelligence: 60, Durability: 40, Leadership: 50 },
    devilFruit: { name: 'Yomi Yomi no Mi', type: '(Paramecia)' },
    haki: [],
    dream: 'To reunite with the whale Laboon!',
    form: { name: 'SOUL KING', desc: 'Manipulating his own soul energy to freeze opponents with the chill of the underworld.' },
    bounty: '383,000,000',
    image: brookImg,
    icon: Music
  },
  {
    id: 'jinbe',
    name: 'JINBE',
    fullName: 'JINBE',
    firstName: 'FIRST SON OF THE SEA',
    lastName: 'JINBE',
    japaneseName: 'ジンベエ',
    role: 'HELMSMAN OF THE STRAW HAT PIRATES',
    quote: '"I am a man who wants to be part of the future Pirate King\'s crew... I can\'t be intimidated by a mere Emperor of the Sea!"',
    stats: { Power: 90, Speed: 75, Intelligence: 85, Durability: 95, Leadership: 90 },
    devilFruit: null,
    haki: ['Armament Haki', 'Observation Haki'],
    dream: 'To fulfill Fisher Tiger\'s will and achieve equality for Fish-Men!',
    form: { name: 'FISH-MAN KARATE', desc: 'A martial art manipulating the water inside the opponent\'s body for devastating shockwaves.' },
    bounty: '1,100,000,000',
    image: jinbeImg,
    icon: Anchor
  }
];

const ProgressBar = ({ label, value }: { label: string, value: number }) => (
  <div className="flex items-center gap-4 mb-2">
    <span className="w-24 text-[10px] text-white/60 uppercase tracking-widest">{label}</span>
    <div className="flex-1 h-2 bg-neutral-800 rounded-sm overflow-hidden">
      <motion.div 
        className="h-full bg-red-600"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </div>
);

export const CharacterExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeChar = characters[activeIndex];
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalChars = characters.length;
    // Map latest (0 to 1) to an index (0 to totalChars - 1)
    let index = Math.floor(latest * totalChars);
    if (index >= totalChars) index = totalChars - 1;
    if (index < 0) index = 0;
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section ref={containerRef} id="crew" className="h-[400vh] w-full bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full text-white flex overflow-hidden font-sans select-none bg-[#0a0a0a]">
      
      {/* LEFT SIDEBAR */}
      <div className="w-64 h-full border-r border-white/10 flex flex-col items-center py-6 shrink-0 z-20 bg-[#0a0a0a]">
        <div className="mb-12">
          <FaSkull className="w-12 h-12 text-white/80" />
        </div>
        
        <div className="flex-1 w-full flex flex-col gap-1 overflow-y-auto custom-scrollbar px-4">
          {characters.map((char, i) => (
            <button
              key={char.id}
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors relative ${
                activeIndex === i ? 'text-white' : 'text-white/40 hover:bg-white/5 hover:text-white/80'
              }`}
            >
              {activeIndex === i && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-full bg-red-600 rounded-r-md"
                />
              )}
              <char.icon className="w-5 h-5 shrink-0" />
              <span className="text-xs uppercase tracking-[0.2em]">{char.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center text-white/30 gap-2">
          <span className="text-[10px] uppercase tracking-widest">Grand Line</span>
          <Compass className="w-8 h-8" />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 h-full relative flex flex-col">
        
        {/* TOP HEADER */}
        <div className="absolute top-0 w-full flex justify-center items-center py-6 z-30 pointer-events-none">
          <div className="flex items-center gap-3 text-white/50 text-xs tracking-[0.3em] uppercase">
            <FaSkull className="text-yellow-600" />
            <span>The Straw Hat Crew</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeChar.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col relative w-full h-full"
          >
            {/* EPIC BACKGROUND IMAGE (Right Side bias) */}
            <div className="absolute inset-0 w-full h-full">
              <motion.div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${activeChar.image})`, backgroundPosition: 'center right' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
            </div>

            {/* CHARACTER INFO (Left Side) */}
            <div className="absolute top-20 left-12 max-w-xl z-20">
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-cinzel text-white/80 tracking-widest mb-[-10px]"
              >
                {activeChar.firstName}
              </motion.h3>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-7xl md:text-9xl font-cinzel font-bold text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-2"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}
              >
                {activeChar.lastName}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-red-500 text-lg tracking-[0.3em] font-medium mb-6"
              >
                {activeChar.japaneseName}
              </motion.p>
              
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block bg-[#1a1a1a] border border-yellow-700/50 px-4 py-2 rounded-sm mb-8"
              >
                <span className="text-yellow-600/90 text-xs tracking-widest font-bold">{activeChar.role}</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative pl-4 border-l-2 border-red-700/50"
              >
                <span className="text-red-700 text-4xl absolute -left-2 -top-4 font-serif">"</span>
                <p className="text-white/80 italic leading-relaxed text-sm max-w-md">
                  {activeChar.quote}
                </p>
                <span className="text-red-700 text-4xl absolute bottom-0 font-serif translate-y-4 translate-x-2">"</span>
              </motion.div>
            </div>

            {/* WANTED POSTER (Top Right) */}
            <motion.div 
              initial={{ scale: 0.8, rotate: 10, opacity: 0 }}
              animate={{ scale: 1, rotate: 5, opacity: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="absolute top-16 right-16 w-56 bg-[#d4c5a9] p-3 shadow-2xl z-20 border-[3px] border-[#8b7355] flex flex-col items-center rotate-3"
              style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(100,60,20,0.4)' }}
            >
              <h2 className="text-[#3e2723] font-serif font-black text-4xl mb-1 tracking-widest border-b-2 border-[#3e2723] w-full text-center pb-1">WANTED</h2>
              <div className="w-full aspect-[3/4] border-2 border-[#3e2723] mb-2 overflow-hidden bg-neutral-300 relative">
                 <img src={activeChar.image} className="w-full h-full object-cover grayscale opacity-90 sepia-[0.3]" alt="wanted poster" />
              </div>
              <p className="text-[#3e2723] text-[9px] font-bold tracking-widest mb-1">DEAD OR ALIVE</p>
              <p className="text-[#3e2723] text-sm font-black tracking-tighter mb-1 font-serif">{activeChar.fullName}</p>
              <p className="text-[#3e2723] text-lg font-bold font-serif tracking-widest flex items-center gap-1">
                <span className="text-sm">฿</span>{activeChar.bounty}-
              </p>
              <p className="text-[#3e2723] text-[8px] tracking-widest w-full text-right mt-1 border-t border-[#3e2723] pt-1">MARINE</p>
            </motion.div>

            {/* BOTTOM INFO PANEL */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-16 left-12 right-12 z-20 flex gap-4 h-48"
            >
              {/* Stats Box */}
              <div className="bg-[#111111]/90 backdrop-blur-md border border-yellow-700/30 p-6 rounded-sm w-72 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <FaSkull className="text-yellow-600 w-4 h-4" />
                  <span className="text-xs text-yellow-600 tracking-widest font-bold">STATS</span>
                </div>
                {Object.entries(activeChar.stats).map(([label, val]) => (
                  <ProgressBar key={label} label={label} value={val} />
                ))}
              </div>

              {/* Details Box */}
              <div className="bg-[#111111]/90 backdrop-blur-md border border-white/5 p-6 rounded-sm flex-1 grid grid-cols-3 gap-6 items-center">
                
                {/* Devil Fruit / Haki / Dream */}
                <div className="col-span-2 flex justify-between h-full py-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <Droplet className="w-4 h-4 text-red-500" />
                       <span className="text-[10px] text-white/50 tracking-widest uppercase">Devil Fruit</span>
                    </div>
                    {activeChar.devilFruit ? (
                      <div>
                        <p className="text-xs text-white/90 font-bold tracking-wider">{activeChar.devilFruit.name}</p>
                        <p className="text-[10px] text-white/40">{activeChar.devilFruit.type}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-white/40 italic">None</p>
                    )}
                  </div>

                  <div className="flex-1 border-l border-white/10 pl-6">
                    <div className="flex items-center gap-2 mb-2">
                       <Zap className="w-4 h-4 text-yellow-500" />
                       <span className="text-[10px] text-white/50 tracking-widest uppercase">Haki</span>
                    </div>
                    {activeChar.haki.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {activeChar.haki.map(h => <p key={h} className="text-[10px] text-white/80">{h}</p>)}
                      </div>
                    ) : (
                      <p className="text-xs text-white/40 italic">None</p>
                    )}
                  </div>

                  <div className="flex-1 border-l border-white/10 pl-6">
                    <div className="flex items-center gap-2 mb-2">
                       <Crown className="w-4 h-4 text-yellow-600" />
                       <span className="text-[10px] text-white/50 tracking-widest uppercase">Dream</span>
                    </div>
                    <p className="text-xs text-white/90 font-medium leading-relaxed pr-4">
                      {activeChar.dream}
                    </p>
                  </div>
                </div>

                {/* Form Box */}
                <div className="col-span-1 h-full pl-6 border-l border-white/10 flex flex-col justify-center">
                  <h4 className="text-yellow-600 text-xl font-cinzel mb-2 tracking-wider">{activeChar.form.name}</h4>
                  <p className="text-[10px] text-white/60 leading-relaxed mb-4">
                    {activeChar.form.desc}
                  </p>
                  <div className="inline-block border border-yellow-600/50 bg-yellow-600/10 px-3 py-1 text-[10px] text-yellow-600 tracking-widest self-start rounded-sm">
                    ✦ {activeChar.form.name}
                  </div>
                </div>

              </div>
            </motion.div>

          </motion.div>
        </AnimatePresence>

        {/* BOTTOM NAV / PAGINATION */}
        <div className="absolute bottom-0 w-full border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-lg px-12 py-4 flex justify-between items-center z-30">
          <div className="w-32"></div> {/* Spacer */}
          <div className="flex items-center gap-6 text-white/40">
            <span className="text-xs tracking-[0.3em] font-medium text-white/80">
              {String(activeIndex + 1).padStart(2, '0')} <span className="text-white/30">/</span> {String(characters.length).padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-4">
             {/* Simple social mock dots */}
             <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer text-[10px]">IN</div>
             <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer text-[10px]">TW</div>
          </div>
        </div>

      </div>
      
      {/* Global Style overrides for this specific view */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
    </div>
    </section>
  );
};
