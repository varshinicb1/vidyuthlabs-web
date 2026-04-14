import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

export function ComparisonSection() {
  return (
    <div className="py-32 px-6 md:px-24 bg-surface-dark text-primary-light border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-accent-coral font-bold mb-4">The Status Quo</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Why we built AnalyteX.</h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Traditional potentiostats belong in the last century. We engineered a better way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Traditional */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-black/40 border border-white/5 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">The Old Way</div>
            <div className="text-3xl font-black mb-10 text-white opacity-80">Desktop Potentiostats</div>
            
            <ul className="space-y-6">
              {[
                { label: 'Weight', value: '5,000g+' },
                { label: 'Cost', value: '₹5,00,000+' },
                { label: 'Mobility', value: 'Lab-bound' },
                { label: 'Learning Curve', value: 'Steep' },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-bold">{item.label}</div>
                    <div className="text-xl font-bold">{item.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AnalyteX */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-teal-900/40 to-black border border-teal-500/20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-teal/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="text-sm font-bold text-accent-teal uppercase tracking-widest mb-2">The Future</div>
            <div className="text-3xl font-black mb-10">VidyuthLabs AnalyteX</div>
            
            <ul className="space-y-6">
              {[
                { label: 'Weight', value: '150g' },
                { label: 'Cost', value: '₹25,000' },
                { label: 'Mobility', value: 'Pocket-sized' },
                { label: 'Learning Curve', value: 'Plug & Play' },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-accent-teal" />
                  </div>
                  <div>
                    <div className="text-sm text-teal-200/60 font-bold">{item.label}</div>
                    <div className="text-xl font-bold text-white">{item.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
