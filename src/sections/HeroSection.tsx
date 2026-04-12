import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Massive Abstract CV Curve Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
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
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        className="z-10 flex flex-col items-center w-full max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-6 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/30 backdrop-blur-xl flex items-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse shadow-[0_0_10px_#00F5FF]"></span>
          <span className="text-[10px] sm:text-xs font-mono text-zinc-400 tracking-widest uppercase">Physical Intelligence</span>
        </motion.div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-4 md:mb-6 drop-shadow-2xl text-center">
          VIDYUTHLABS
        </h1>
        
        <h2 className="text-xl sm:text-2xl md:text-4xl font-light text-[#00F5FF] mb-6 md:mb-8 tracking-wide text-center">
          Always On. Always Aware.
        </h2>
        
        <p className="max-w-xl text-base md:text-xl font-light text-zinc-400 mb-12 px-4 text-center">
          Self-powered intelligence for the physical world.
        </p>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="group relative px-6 py-3 font-mono text-sm tracking-widest text-[#00F5FF] overflow-hidden"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="relative z-10">INITIALIZE SCROLL</span>
          <div className="absolute inset-0 border border-[#00F5FF]/30 group-hover:border-[#00F5FF] transition-colors duration-500"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#00F5FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </motion.button>
      </motion.div>
    </section>
  );
}
