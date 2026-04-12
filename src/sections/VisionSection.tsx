import { motion, type Variants } from 'framer-motion';

export function VisionSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.8
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[150vh] px-6 text-center py-32 z-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px" }}
        className="max-w-4xl space-y-32"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl font-light tracking-tight text-white/40">
          The world depends on <span className="text-white">power</span>.
        </motion.h2>
        
        <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl font-light tracking-tight text-white/40">
          Power creates <span className="text-zinc-600 line-through decoration-[#7A5CFF] decoration-2">limits</span>.
        </motion.h2>
        
        <motion.h2 variants={itemVariants} className="text-5xl md:text-8xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F5FF] to-white">
          We remove the dependency.
        </motion.h2>
      </motion.div>
    </section>
  );
}
