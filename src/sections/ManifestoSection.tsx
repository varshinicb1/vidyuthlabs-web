import { motion } from 'framer-motion';
import { CryptographicText } from '../components/CryptographicText';

export function ManifestoSection() {
  return (
    <section className="relative min-h-[150vh] flex items-center justify-center bg-black-base text-center px-4 z-10 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7A5CFF] via-black to-black"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true, margin: "-100px" }}
        className="z-10 max-w-6xl"
      >
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-tight text-zinc-600">
          We are not building <span className="text-white line-through decoration-zinc-500">devices</span>.
        </h2>
        
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-tight text-white mt-8">
          We are building <CryptographicText text="awareness" className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#7A5CFF]" delay={500} speed={60}/> into the physical world.
        </h2>
      </motion.div>
    </section>
  );
}
