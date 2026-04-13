import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Network, Battery, Cpu, BrainCircuit } from 'lucide-react';

const products = [
  { id: 'nodes', name: 'Perpetual Nodes', icon: Network, what: 'Self-powered multi-modal sensors deployable in severe environments.', why: 'Eliminates battery anxiety. Once placed, they map environments indefinitely without maintenance.', fit: 'Seamlessly aggregates ambient energy via hybrid supercapacitor storage.', color: '#00F5FF' },
  { id: 'power', name: 'Nano-Capacitors', icon: Battery, what: 'Ultra-thin, printed energy storage layers integrated directly into PCBs.', why: 'Decouples device size from battery constraints. Acts as an instantaneous power reservoir.', fit: 'Powers high-cost burst transmissions for Sub-GHz and BLE modules.', color: '#3DD4EA' },
  { id: 'edge', name: 'Neuromorphic Edge', icon: Cpu, what: 'Spiking neural network (SNN) event-driven inference engine.', why: 'Reduces data transmission by 99% by only waking up the radio when specific anomalies are detected.', fit: 'Runs on less than 10µW, embedded right within the sensor firmware.', color: '#6AADDB' },
  { id: 'ink', name: 'Electrochemical Inks', icon: Activity, what: 'Proprietary printable inks for creating localized energy harvesting and storage.', why: 'Enables flexible, conformal, and invisible electronics on almost any surface.', fit: 'Manufacturable via standard roll-to-roll commercial printing lines.', color: '#9186CC' },
  { id: 'brain', name: 'Digital Twin Engine', icon: BrainCircuit, what: 'Physics-informed machine learning cloud platform.', why: 'Validates and iterates nanomaterial compositions autonomously with zero trial-and-error.', fit: 'Links hardware constraints to model predictions for immediate R&D scaling.', color: '#7A5CFF' }
];

export function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fully automated cycling — no clicks required
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeProduct = products[activeIndex];

  return (
    <section id="ecosystem" className="relative min-h-screen py-24 md:py-32 px-6 flex flex-col items-center justify-center z-10 w-full overflow-hidden">
      {/* Ambient glow behind active card */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 transition-colors duration-1000 pointer-events-none"
        style={{ backgroundColor: activeProduct.color }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-20"
      >
        <h2 className="text-[11px] font-mono-tight tracking-[0.3em] text-[#00F5FF]/70 uppercase mb-4">Ecosystem Overview</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">Constellation of Systems</h3>
      </motion.div>

      {/* Main card showcase */}
      <div className="w-full max-w-5xl">
        {/* Active product card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl md:rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            {/* Subtle corner glow */}
            <div 
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none"
              style={{ backgroundColor: activeProduct.color }}
            />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Left: Icon + Name */}
              <div className="flex flex-col items-start gap-6 md:min-w-[200px]">
                <div 
                  className="p-4 rounded-2xl border border-white/10"
                  style={{ backgroundColor: `${activeProduct.color}15` }}
                >
                  <activeProduct.icon className="w-8 h-8" style={{ color: activeProduct.color }} />
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-1">{activeProduct.name}</h4>
                  <span className="text-[11px] font-mono-tight tracking-[0.2em] text-zinc-600 uppercase">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Right: Details grid */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div>
                  <h5 className="text-[10px] uppercase tracking-[0.2em] mb-3 font-mono-tight" style={{ color: activeProduct.color }}>What it does</h5>
                  <p className="text-zinc-300 font-light text-sm leading-relaxed">{activeProduct.what}</p>
                </div>
                <div>
                  <h5 className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-3 font-mono-tight">Why it matters</h5>
                  <p className="text-zinc-300 font-light text-sm leading-relaxed">{activeProduct.why}</p>
                </div>
                <div>
                  <h5 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-3 font-mono-tight">Integration</h5>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed">{activeProduct.fit}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots + progress */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {products.map((p, idx) => {
            const Icon = p.icon;
            const isActive = idx === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => setActiveIndex(idx)}
                className={`group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-500 ${
                  isActive 
                    ? 'border-white/20 bg-white/[0.06] scale-110' 
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                }`}
                aria-label={p.name}
              >
                <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
                }`} />
                
                {/* Active ring animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeProductRing"
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: `${p.color}40` }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Auto-progress bar */}
        <div className="mt-4 mx-auto max-w-xs h-px bg-zinc-900 rounded-full overflow-hidden">
          <motion.div
            key={activeIndex}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-full origin-left"
            style={{ backgroundColor: activeProduct.color }}
          />
        </div>
      </div>
    </section>
  );
}
