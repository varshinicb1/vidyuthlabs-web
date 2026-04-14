import { motion } from 'motion/react';
import { HeartPulse, TestTube, Leaf, GraduationCap } from 'lucide-react';

const applications = [
  {
    title: 'Healthcare',
    description: 'Rapid point-of-care diagnostics for biomarkers like Troponin I, Cortisol, and Lactate.',
    icon: HeartPulse,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10'
  },
  {
    title: 'Environmental',
    description: 'On-site heavy metal quantification and water quality analysis capabilities.',
    icon: Leaf,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Research Labs',
    description: 'High-throughput electrochemical testing without the bottleneck of shared equipment.',
    icon: TestTube,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Education',
    description: 'Accessible, hands-on electrochemistry training for the next generation of scientists.',
    icon: GraduationCap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  }
];

export function ApplicationsGrid() {
  return (
    <div className="py-32 px-6 md:px-24 bg-surface-light text-primary-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-accent-teal-dark font-bold mb-4">Use Cases</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Designed for every field.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app, index) => (
            <motion.div 
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${app.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <app.icon className={`w-8 h-8 ${app.color}`} strokeWidth={1.5} />
              </div>
              <h4 className="text-2xl font-black mb-3">{app.title}</h4>
              <p className="text-gray-600 font-medium leading-relaxed">{app.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
