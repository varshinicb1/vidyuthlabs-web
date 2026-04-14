import { motion } from 'motion/react';

export function VisionTimeline() {
  return (
    <div className="py-32 px-6 md:px-24 bg-gradient-to-b from-surface-dark to-black text-primary-light border-y border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-accent-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-accent-teal font-bold mb-4">The Vision</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Physical AI Swarms.</h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            AnalyteX is just node zero. We are building the infrastructure for distributed, real-time chemical intelligence.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-teal via-white/10 to-transparent" />

          {[
            {
              year: 'Phase 1',
              title: 'AnalyteX & VidyutX',
              desc: 'Establishing lab-grade pocket diagnostics.',
              active: true
            },
            {
              year: 'Phase 2',
              title: 'Continuous Monitoring',
              desc: 'Wearable biosensors for real-time human telemetry.',
              active: false
            },
            {
              year: 'Phase 3',
              title: 'Swarm Intelligence',
              desc: 'Printed battery & supercapacitor-powered solar sensor nodes covering entire ecosystems.',
              active: false
            }
          ].map((item, index) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`mb-16 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2" />
              
              <div className="absolute left-[16px] md:left-1/2 w-3 h-3 rounded-full md:-translate-x-1.5 mt-2 md:mt-0 bg-black border-2 border-accent-teal z-10">
                {item.active && <div className="absolute inset-0 rounded-full bg-accent-teal animate-ping" />}
              </div>
              
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                <div className={`text-sm font-bold tracking-widest uppercase mb-2 ${item.active ? 'text-accent-teal' : 'text-gray-500'}`}>
                  {item.year}
                </div>
                <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <h4 className="text-2xl font-bold mb-2 text-white">{item.title}</h4>
                  <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
