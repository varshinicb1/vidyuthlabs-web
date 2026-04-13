import { motion, type Variants } from 'framer-motion';

export function VisionSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.6
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: 'easeOut' }
    }
  };

  return (
    <section id="vision" className="relative flex flex-col items-center justify-center min-h-[130vh] px-6 text-center py-32 z-10 overflow-hidden">
      {/* Ambient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7A5CFF]/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        className="max-w-5xl space-y-24 md:space-y-32"
      >
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl md:text-7xl font-extralight tracking-tight text-white/30 leading-tight">
          The world depends on <span className="text-white font-light">power</span>.
        </motion.h2>
        
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl md:text-7xl font-extralight tracking-tight text-white/30 leading-tight">
          Power creates <span className="text-zinc-600 line-through decoration-[#7A5CFF]/60 decoration-2">limits</span>.
        </motion.h2>
        
        <motion.div variants={itemVariants} className="relative">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-[-0.03em] leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F5FF] to-white bg-[length:200%_100%] animate-[shimmer_6s_ease-in-out_infinite]">
              We remove the dependency.
            </span>
          </h2>
          {/* Underline accent */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            className="mt-6 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/50 to-transparent origin-center"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
