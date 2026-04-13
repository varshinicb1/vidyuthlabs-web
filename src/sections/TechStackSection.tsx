import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const layers = [
  {
    id: 'intelligence',
    num: '05',
    title: 'Intelligence Layer',
    desc: 'Local, embedded inferencing trained on high-fidelity electrochemical data. Real-time decision-making without cloud dependency.',
    color: '#00F5FF'
  },
  {
    id: 'embedded',
    num: '04',
    title: 'Embedded Systems',
    desc: 'Ultra-low power micro-architectures processing analog signals at the edge with near-zero latency.',
    color: '#3DD4EA'
  },
  {
    id: 'sensing',
    num: '03',
    title: 'Electrochemical Sensing',
    desc: 'Advanced EIS and CV diagnostic capabilities miniaturized for continuous environmental and biological monitoring.',
    color: '#6AADDB'
  },
  {
    id: 'energy',
    num: '02',
    title: 'Energy',
    desc: 'Printable, high-density supercapacitors harvesting and storing ambient energy to power the entire stack.',
    color: '#9186CC'
  },
  {
    id: 'nano',
    num: '01',
    title: 'Nanomaterials',
    desc: 'Proprietary α-NiMoO₄ and specialized perovskites forming the foundational conductive and reactive interfaces.',
    color: '#7A5CFF'
  }
];

export function TechStackSection() {
  const [activeLayer, setActiveLayer] = useState<string>('intelligence');

  // Auto-cycle layers
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer(current => {
        const currentIdx = layers.findIndex(l => l.id === current);
        return layers[(currentIdx + 1) % layers.length].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeData = layers.find(l => l.id === activeLayer)!;

  return (
    <section id="technology" className="relative min-h-screen py-24 md:py-32 px-6 flex flex-col items-center justify-center z-10 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-24"
      >
        <h2 className="text-[11px] font-mono-tight tracking-[0.3em] text-[#00F5FF]/70 uppercase mb-4">Architecture</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">The Tech Stack</h3>
      </motion.div>

      {/* Stack visualization */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Layer stack */}
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          {layers.map((layer, idx) => {
            const isActive = activeLayer === layer.id;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                onClick={() => setActiveLayer(layer.id)}
                className={`
                  relative p-4 md:p-5 cursor-pointer transition-all duration-500 ease-out rounded-lg overflow-hidden
                  ${isActive 
                    ? 'bg-white/[0.06] shadow-[0_0_30px_rgba(0,245,255,0.06)]' 
                    : 'bg-white/[0.02] hover:bg-white/[0.04]'
                  }
                `}
              >
                {/* Active indicator bar */}
                <motion.div
                  initial={false}
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 bottom-0 w-[2px] origin-center"
                  style={{ backgroundColor: layer.color }}
                />

                <div className="flex items-center gap-4 pl-3">
                  <span className={`font-mono-tight text-xs transition-colors duration-300 ${isActive ? 'text-white/60' : 'text-zinc-700'}`}>
                    {layer.num}
                  </span>
                  <h3 className={`text-sm md:text-base font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                    {layer.title}
                  </h3>
                </div>

                {/* Mobile description accordion */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="lg:hidden overflow-hidden"
                    >
                      <p className="mt-3 pl-10 text-sm font-light text-zinc-400 leading-relaxed">
                        {layer.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Progress bar */}
          <div className="mt-4 w-full h-px bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              key={activeLayer}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4, ease: 'linear' }}
              className="h-full origin-left"
              style={{ backgroundColor: activeData.color }}
            />
          </div>
        </div>

        {/* Right: Description panel (desktop) */}
        <div className="hidden lg:flex w-full lg:w-1/2 min-h-[200px] items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 0.4 }}
              className="max-w-md"
            >
              <div 
                className="w-8 h-[2px] mb-6"
                style={{ backgroundColor: activeData.color }}
              />
              <h4 className="text-2xl md:text-3xl font-light text-white mb-5 tracking-tight">
                {activeData.title}
              </h4>
              <p className="text-base text-zinc-400 font-light leading-[1.8]">
                {activeData.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
