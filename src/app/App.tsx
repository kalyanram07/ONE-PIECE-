import { useEffect } from 'react';
import Lenis from 'lenis';
import { Hero } from '../components/Hero';
import { Navigation } from '../components/Navigation';
import { Timeline } from '../components/Timeline';
import { CharacterExperience } from '../components/CharacterExperience';
import { Gallery } from '../components/Gallery';
import { About } from '../components/About';
import { DeveloperShowcase } from '../components/DeveloperShowcase';
import { BackgroundAudio } from '../components/BackgroundAudio';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen font-noto">
      <Navigation />
      <Hero />
      <Timeline />
      <CharacterExperience />
      <Gallery />
      <About />
      <DeveloperShowcase />
      <BackgroundAudio />
    </div>
  );
}
