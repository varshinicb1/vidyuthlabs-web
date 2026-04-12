import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const layers = [
  {
    id: 'intelligence',
    title: 'Intelligence Layer',
    desc: 'Local, embedded inferencing trained on high-fidelity electrochemical data. Real-time decision-making without cloud dependency.'
  },
  {
    id: 'embedded',
    title: 'Embedded Systems',
    desc: 'Ultra-low power micro-architectures processing analog signals at the edge with near-zero latency.'
  },
  {
    id: 'sensing',
    title: 'Electrochemical Sensing',
    desc: 'Advanced EIS and CV diagnostic capabilities miniaturized for continuous environmental and biological monitoring.'
  },
  {
    id: 'energy',
    title: 'Energy',
    desc: 'Printable, high-density supercapacitors harvesting and storing ambient energy to power the entire stack.'
  },
  {
    id: 'nano',
    title: 'Nanomaterials',
    desc: 'Proprietary α-NiMoO₄ and specialized perovskites forming the foundational conductive and reactive interfaces.'
  }
];

export function TechStackSection() {
  const [activeLayer, setActiveLayer] = useState<string | null>('intelligence');

  return (
    <section className="relative min-h-[120vh] py-32 px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 z-10">
      
      {/* Mobile Title */}
      <div className="lg:hidden w-full mb-8">
        <h2 className="text-sm tracking-[0.3em] text-[#00F5FF] uppercase mb-4">Architecture</h2>
        <h3 className="text-3xl font-light text-white">The Tech Stack</h3>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end gap-4 lg:gap-6">
        {layers.map((layer, idx) => {
          const isActive = activeLayer === layer.id;
          return (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => setActiveLayer(layer.id)}
              className={`
                w-full max-w-md p-5 md:p-6 border-l-2 cursor-pointer backdrop-blur-md
                transition-all duration-500 ease-out transform
                ${isActive 
                  ? 'border-[#00F5FF] bg-gradient-to-r from-[#00F5FF]/10 to-transparent translate-x-2 md:translate-x-4 shadow-[0_0_20px_rgba(0,245,255,0.05)]' 
                  : 'border-zinc-800 bg-black/40 hover:bg-zinc-900/60'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <span className={`font-mono text-sm transition-colors duration-300 ${isActive ? 'text-[#00F5FF]' : 'text-zinc-600'}`}>
                  0{layers.length - idx}
                </span>
                <h3 className={`text-lg md:text-xl font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                  {layer.title}
                </h3>
              </div>
              
              {/* Mobile Description Inline Accordion */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="lg:hidden mt-4 text-sm font-light text-zinc-300 leading-relaxed overflow-hidden"
                  >
                    {layer.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop Description Panel */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-64 items-center">
        <AnimatePresence mode="wait">
          {activeLayer && (
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="max-w-lg"
            >
              <h4 className="text-3xl font-light text-[#00F5FF] mb-6">
                {layers.find(l => l.id === activeLayer)?.title}
              </h4>
              <p className="text-lg text-zinc-300 font-light leading-relaxed">
                {layers.find(l => l.id === activeLayer)?.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
