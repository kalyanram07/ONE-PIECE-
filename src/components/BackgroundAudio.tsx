import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// TODO: The user will replace this file with their actual background score
import bgmAudio from '../assets/bgm.mp4';

export const BackgroundAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Hide the prompt after 5 seconds if they don't interact
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
      setShowPrompt(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
      
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full"
          >
            <Music className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-xs font-sans tracking-widest text-white uppercase">Enable Audio</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={togglePlay}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:border-red-500 hover:text-red-500 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 opacity-60 group-hover:scale-110 transition-transform" />
        )}
      </button>

      <audio
        ref={audioRef}
        src={bgmAudio}
        loop
        preload="auto"
      />
    </div>
  );
};
