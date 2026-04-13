import { motion } from 'framer-motion';
import { CryptographicText } from '../components/CryptographicText';

export function ManifestoSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black-base text-center px-6 z-10 overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7A5CFF]/6 rounded-full blur-[200px]" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true, margin: "-100px" }}
        className="z-10 max-w-5xl"
      >
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-[1.2] text-zinc-600 mb-6 md:mb-8">
          We are not building <span className="text-white/80 line-through decoration-zinc-600/50 decoration-2">devices</span>.
        </h2>
        
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.03em] leading-[1.2] text-white">
          We are building{' '}
          <CryptographicText 
            text="awareness" 
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#7A5CFF]" 
            delay={500} 
            speed={60}
          />{' '}
          into the physical world.
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mt-10 mx-auto w-40 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/30 to-transparent origin-center"
        />
      </motion.div>
    </section>
  );
}
