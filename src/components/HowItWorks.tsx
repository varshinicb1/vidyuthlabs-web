import { motion } from 'motion/react';
import { Droplet, Activity, Smartphone } from 'lucide-react';

const steps = [
  {
    title: 'Drop',
    description: 'Place a single drop of sample on the disposable VidyutX sensor strip.',
    icon: Droplet,
  },
  {
    title: 'Scan',
    description: 'AnalyteX performs lab-grade CV, EIS, and DPV measurements instantly.',
    icon: Activity,
  },
  {
    title: 'Results',
    description: 'Detailed insights synced to the cloud and available on your mobile device.',
    icon: Smartphone,
  }
];

export function HowItWorks() {
  return (
    <div className="py-32 px-6 md:px-24 bg-surface-light text-primary-dark relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-accent-teal-dark font-bold mb-4">How It Works</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight">Three steps to clarity.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-gray-200" />

          {steps.map((step, index) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full bg-white border border-gray-100 shadow-xl flex items-center justify-center mb-8 relative z-10 group hover:-translate-y-2 transition-transform duration-300">
                <step.icon className="w-12 h-12 text-primary-dark group-hover:text-accent-teal transition-colors" strokeWidth={1.5} />
                <div className="absolute -inset-2 bg-accent-teal/0 group-hover:bg-accent-teal/5 rounded-full transition-colors" />
              </div>
              
              <div className="text-xl font-black mb-3">{step.title}</div>
              <p className="text-gray-600 font-medium leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
