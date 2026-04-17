import { motion } from 'motion/react';
import { ArrowLeft, Heart, Droplets, Waves, Leaf, Activity, Zap, ClipboardCheck } from 'lucide-react';

const USECASES = [
  {
    icon: <Heart className="w-8 h-8 text-rose-500" />,
    title: "Cardiac Emergency",
    subtitle: "Troponin I Detection",
    description: "Instant detection of cardiac biomarkers from a single blood drop. Enables life-saving diagnosis of Myocardial Infarction (Heart Attack) in local clinics or homes, reducing critical treatment time by hours.",
    value: "High Intensity Healthcare"
  },
  {
    icon: <Droplets className="w-8 h-8 text-cyan-500" />,
    title: "Water Safety",
    subtitle: "Heavy Metal Screening",
    description: "Real-time detection of Lead, Arsenic, and Cadmium in drinking water. Essential for remote communities and disaster zones where lab access is impossible.",
    value: "Environmental Health"
  },
  {
    icon: <Activity className="w-8 h-8 text-emerald-500" />,
    title: "Chronic Care",
    subtitle: "Creatinine & Glucose",
    description: "Point-of-care monitoring for Kidney disease and Diabetes. Lab-grade accuracy with a handheld device, allowing patients to track their health metrics without frequent hospital visits.",
    value: "Home Diagnostics"
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "Elite Athletics",
    subtitle: "Lactate Thresholds",
    description: "Real-time lactate monitoring for professional athletes. Precise electrochemical sensing allows for data-driven training optimization and injury prevention during peak performance.",
    value: "Sports Science"
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-500" />,
    title: "Precision Farming",
    subtitle: "Soil Nutrient Scan",
    description: "Detecting N-P-K levels and soil contaminants directly in the field. Empowers farmers to reduce fertilizer waste and maximize crop yield using low-cost VidyutX sensors.",
    value: "Smart Agriculture"
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-indigo-500" />,
    title: "Occupational Health",
    subtitle: "Cortisol Monitoring",
    description: "Tracking stress hormone levels in high-pressure environments (Pilots, Surgeons, First Responders) to ensure mental well-being and operational safety.",
    value: "Human Performance"
  },
  {
    icon: <Waves className="w-8 h-8 text-blue-400" />,
    title: "Industrial Effluents",
    subtitle: "Pollutant Tracking",
    description: "Autonomous sensors for monitoring industrial waste discharge in rivers. Real-time alerts for chemical leaks and environmental compliance.",
    value: "Industrial Compliance"
  }
];

export function UsecasesPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest">Back to Mission</span>
            </button>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4 uppercase">
              Real-World <br/><span className="text-cyan-400">Applications</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-medium">
              VidyuthLabs is bridging the gap between high-end laboratory instruments and on-field diagnostic needs.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="text-right">
                <div className="text-6xl font-black text-white/5 tracking-tighter uppercase leading-none">VidyuthLabs</div>
                <div className="text-sm text-gray-600 font-mono tracking-widest mt-2 uppercase">AnalyteX Ecosystem</div>
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USECASES.map((usecase, index) => (
            <motion.div
              key={usecase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-900/50 border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all hover:bg-gray-900/80"
            >
              <div className="mb-6 p-4 bg-black/50 rounded-2xl w-fit group-hover:scale-110 transition-transform shadow-xl">
                {usecase.icon}
              </div>
              
              <div className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] mb-2 uppercase opacity-80">
                {usecase.value}
              </div>
              
              <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                {usecase.title}
              </h3>
              <p className="text-sm text-gray-500 font-bold mb-4 uppercase tracking-wider">
                {usecase.subtitle}
              </p>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {usecase.description}
              </p>

              <div className="absolute top-4 right-8 opacity-5 text-8xl font-black pointer-events-none select-none">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 text-center">
           <div className="bg-cyan-400 p-12 rounded-[3rem] text-black">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Ready to prototype?</h2>
              <p className="text-lg font-bold mb-8 opacity-80">Join the waitlist to receive our early access developer kit.</p>
              <button 
                onClick={onBack}
                className="bg-black text-white px-12 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer"
              >
                Get Started
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
