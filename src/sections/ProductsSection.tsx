import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Network, Battery, Cpu, BrainCircuit } from 'lucide-react';

const products = [
  { id: 'nodes', name: 'Perpetual Nodes', icon: Network, what: 'Self-powered multi-modal sensors deployable in severe environments.', why: 'Eliminates battery anxiety. Once placed, they map environments indefinitely without maintenance.', fit: 'Seamlessly aggregates ambient energy via hybrid supercapacitor storage.' },
  { id: 'power', name: 'Nano-Capacitors', icon: Battery, what: 'Ultra-thin, printed energy storage layers integrated directly into PCBs.', why: 'Decouples device size from battery constraints. Acts as an instantaneous power reservoir.', fit: 'Powers high-cost burst transmissions for Sub-GHz and BLE modules.' },
  { id: 'edge', name: 'Neuromorphic Edge', icon: Cpu, what: 'Spiking neural network (SNN) event-driven inference engine.', why: 'Reduces data transmission by 99% by only waking up the radio when specific anomalies are detected.', fit: 'Runs on less than 10µW, embedded right within the sensor firmware.' },
  { id: 'ink', name: 'Electrochemical Inks', icon: Activity, what: 'Proprietary printable inks for creating localized energy harvesting and storage.', why: 'Enables flexible, conformal, and invisible electronics on almost any surface.', fit: 'Manufacturable via standard roll-to-roll commercial printing lines.' },
  { id: 'brain', name: 'Digital Twin Engine', icon: BrainCircuit, what: 'Physics-informed machine learning cloud platform.', why: 'Validates and iterates nanomaterial compositions autonomously with zero trial-and-error.', fit: 'Links hardware constraints to model predictions for immediate R&D scaling.' }
];

export function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Automated cycling
  useEffect(() => {
    if (isHoverPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => current === null ? 0 : (current + 1) % products.length);
    }, 4500); // 4.5 second cycle

    return () => clearInterval(interval);
  }, [isHoverPaused]);

  const activeProduct = activeIndex !== null ? products[activeIndex]?.id : null;

  const handleNodeClick = (index: number) => {
    setActiveIndex(index);
    setIsHoverPaused(true); // pause automation if user clicks specifically
    // optionally resume after some time
    setTimeout(() => setIsHoverPaused(false), 10000);
  };

  return (
    <section className="relative min-h-[120vh] py-24 md:py-32 px-6 flex flex-col items-center justify-center z-10 w-full overflow-hidden">
      <div className="absolute top-24 md:top-32 text-center w-full z-20">
        <h2 className="text-sm tracking-[0.3em] text-[#00F5FF] uppercase mb-4">Ecosystem Overview</h2>
        <h3 className="text-3xl md:text-5xl font-light text-white">Constellation of Systems</h3>
      </div>

      {/* Mobile / Tablet Vertical Stacked View */}
      <div className="w-full max-w-2xl mt-48 md:hidden flex flex-col gap-4 z-20 pb-20">
        {products.map((p, idx) => {
          const isActive = activeProduct === p.id;
          const Icon = p.icon;
          return (
            <motion.div 
              key={p.id}
              layout
              onClick={() => handleNodeClick(idx)}
              className={`rounded-2xl cursor-pointer overflow-hidden border transition-all duration-300 ${
                isActive ? 'bg-[#7A5CFF]/10 border-[#7A5CFF]/50 shadow-[0_0_20px_rgba(122,92,255,0.2)]' : 'bg-black/40 border-zinc-900/80 backdrop-blur-md'
              }`}
            >
              <div className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-full transition-colors ${isActive ? 'bg-[#7A5CFF]/20 text-[#00F5FF]' : 'bg-zinc-900 text-zinc-400'}`}>
                   <Icon className="w-6 h-6" />
                </div>
                <h4 className={`text-base font-medium ${isActive ? 'text-white' : 'text-zinc-300'}`}>{p.name}</h4>
              </div>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                      <div>
                        <h5 className="text-[10px] uppercase tracking-widest text-[#7A5CFF] mb-1">What it does</h5>
                        <p className="text-zinc-300 font-light text-sm">{p.what}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] uppercase tracking-widest text-[#00F5FF] mb-1">Why it matters</h5>
                        <p className="text-zinc-300 font-light text-sm">{p.why}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Integration</h5>
                        <p className="text-zinc-400 font-light text-sm">{p.fit}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop Circular Constellation View */}
      <div ref={containerRef} className="hidden md:flex relative w-full max-w-6xl mt-48 justify-center items-center h-[600px] z-20">
        {/* Abstract Node Network Representation in HTML overlay */}
        {products.map((product, idx) => {
          const angle = (idx / products.length) * Math.PI * 2;
          const radius = activeProduct === product.id ? 0 : 250;
          const isActive = activeProduct === product.id;
          const isHidden = activeProduct && !isActive;

          const x = isActive ? 0 : Math.cos(angle) * radius;
          const y = isActive ? -150 : Math.sin(angle) * radius;

          const Icon = product.icon;

          return (
            <motion.div
              key={product.id}
              className={`absolute cursor-pointer flex flex-col items-center justify-center`}
              initial={false}
              animate={{
                x, y,
                scale: isActive ? 1.2 : isHidden ? 0.3 : 1,
                opacity: isHidden ? 0.2 : 1,
                zIndex: isActive ? 50 : 10
              }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
              onClick={() => handleNodeClick(idx)}
            >
              <div className={`p-4 rounded-full border transition-all duration-300 ${isActive ? 'bg-[#7A5CFF]/20 border-[#7A5CFF] shadow-[0_0_30px_rgba(122,92,255,0.4)]' : 'bg-black/50 border-zinc-700 hover:border-[#00F5FF] hover:bg-[#00F5FF]/10 backdrop-blur-md'}`}>
                <Icon className={`w-8 h-8 ${isActive ? 'text-[#00F5FF]' : 'text-zinc-300'}`} />
              </div>
              {!activeProduct && (
                <div className="mt-4 text-xs font-mono text-zinc-400 tracking-wider w-32 text-center">
                  {product.name}
                </div>
              )}
            </motion.div>
          );
        })}

        <AnimatePresence>
          {activeProduct && (
            <motion.div
              initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16 w-full max-w-2xl bg-black/60 backdrop-blur-xl border border-[#7A5CFF]/30 p-8 rounded-2xl"
            >
              <button 
                onClick={() => setActiveIndex(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
              
              {(() => {
                const p = products.find(p => p.id === activeProduct)!;
                return (
                  <div className="space-y-6">
                    <h4 className="text-2xl font-light text-white">{p.name}</h4>
                    
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-[#7A5CFF] mb-2">What it does</h5>
                      <p className="text-zinc-300 font-light">{p.what}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-[#00F5FF] mb-2">Why it matters</h5>
                      <p className="text-zinc-300 font-light">{p.why}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Integration</h5>
                      <p className="text-zinc-400 font-light text-sm">{p.fit}</p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Central visual indicator if nothing is active */}
        {!activeProduct && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-1 h-1 bg-[#00F5FF] rounded-full shadow-[0_0_50px_10px_rgba(0,245,255,0.5)] animate-pulse"></div>
           </div>
        )}
      </div>
    </section>
  );
}
