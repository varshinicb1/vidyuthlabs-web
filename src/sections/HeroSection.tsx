import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const handleScrollDown = () => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#7A5CFF]/8 rounded-full blur-[120px] animate-[pulse-glow_8s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00F5FF]/6 rounded-full blur-[100px] animate-[pulse-glow_10s_ease-in-out_infinite_2s] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none animate-[grid-pulse_6s_ease-in-out_infinite]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Massive Abstract CV Curve Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none z-0">
        <motion.svg 
          viewBox="0 0 100 100" 
          fill="none" 
          className="w-[120vw] h-[120vh] max-w-[1200px]"
          initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          <motion.path
            d="M 15,50 C 35,50 45,45 60,15 C 65,30 75,50 85,50 C 65,50 55,55 40,85 C 35,70 25,50 15,50 Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.2 }}
          />
        </motion.svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
        className="z-10 flex flex-col items-center w-full max-w-5xl"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-8 px-5 py-2 rounded-full border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-2xl flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5FF] shadow-[0_0_12px_#00F5FF]"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono-tight text-zinc-400 tracking-[0.2em] uppercase">Physical Intelligence</span>
        </motion.div>

        {/* Main heading */}
        <h1 className="text-[clamp(3rem,10vw,9rem)] font-bold tracking-[-0.04em] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 mb-4 md:mb-6 pb-2">
          VIDYUTHLABS
        </h1>
        
        {/* Tagline */}
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="text-lg sm:text-2xl md:text-3xl font-extralight tracking-[0.08em] mb-6 md:mb-8"
        >
          <span className="text-[#00F5FF]/90">Always On.</span>
          <span className="text-zinc-500 mx-3">·</span>
          <span className="text-[#7A5CFF]/90">Always Aware.</span>
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="max-w-lg text-base md:text-lg font-light text-zinc-500 mb-16 px-4 text-center leading-relaxed"
        >
          Self-powered intelligence for the physical world.
        </motion.p>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors duration-500 group"
        >
          <span className="text-[10px] font-mono-tight tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
