import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.svg 
        width="40" 
        height="40" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Glow Filter */}
        <defs>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Abstract Cyclic Voltammetry (CV) Curve */}
        {/* Path: Start mid-left -> sweep right -> oxidation peak up -> sweep left -> reduction peak down -> return */}
        <motion.path
          d="M 15,50 
             C 35,50 45,45 60,15 
             C 65,30 75,50 85,50 
             C 65,50 55,55 40,85 
             C 35,70 25,50 15,50 Z"
          stroke="url(#cvGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neonGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />

        <defs>
          <linearGradient id="cvGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="50%" stopColor="#7A5CFF" />
            <stop offset="100%" stopColor="#00F5FF" />
          </linearGradient>
        </defs>
      </motion.svg>

      {showText && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white font-semibold tracking-[0.15em] text-sm md:text-base uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        >
          VidyuthLabs
        </motion.span>
      )}
    </div>
  );
}
