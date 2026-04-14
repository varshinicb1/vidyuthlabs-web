import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-6 md:px-24 bg-gradient-to-b from-primary-light to-surface-light text-primary-dark overflow-hidden pt-20">
      
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent-teal/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] bg-accent-coral/10 blur-[80px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-dark text-primary-light text-xs font-semibold mb-6 shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
          Hardware & AI
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
          The lab on your <span className="text-gradient">palm.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
          Lab-grade diagnostics and electrochemistry built for the field. Precision, portability, and physical intelligence merged into one device.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-primary-dark text-primary-light rounded-full font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300 w-full sm:w-auto">
            Book a Demo
          </button>
          <button className="px-8 py-4 bg-white text-primary-dark border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm w-full sm:w-auto">
            Explore Technology
          </button>
        </div>
      </motion.div>

      {/* Floating Stat Badges */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute w-full max-w-6xl mx-auto inset-x-0 bottom-32 hidden lg:block pointer-events-none"
      >
        <div className="absolute left-[10%] top-0 glass-card-light px-4 py-3 rounded-2xl">
          <div className="text-sm font-bold opacity-70">Resolution</div>
          <div className="text-xl font-black">10nA</div>
        </div>
        
        <div className="absolute right-[10%] top-10 glass-card-light px-4 py-3 rounded-2xl">
          <div className="text-sm font-bold opacity-70">Weight</div>
          <div className="text-xl font-black">150g</div>
        </div>
        
        <div className="absolute left-[20%] top-40 glass-card-light px-4 py-3 rounded-2xl">
          <div className="text-sm font-bold opacity-70">Price</div>
          <div className="text-xl font-black">₹25,000</div>
        </div>
      </motion.div>
    </div>
  );
}
