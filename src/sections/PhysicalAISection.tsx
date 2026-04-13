import { motion } from 'framer-motion';
import { CryptographicText } from '../components/CryptographicText';

const capabilities = [
  {
    num: '01',
    title: 'Continuous Sensing',
    desc: 'Moving past episodic data capture. Our self-powered nodes enable perpetual monitoring of their designated environments without energy degradation.',
    color: '#00F5FF'
  },
  {
    num: '02',
    title: 'Embedded Intelligence',
    desc: 'Raw data is heavy. We process signals at the edge using ultra-low-power local inferencing, transmitting only actionable insights and anomalies.',
    color: '#6AADDB'
  },
  {
    num: '03',
    title: 'Real-World Awareness',
    desc: 'Transforming inert physical spaces into state-aware entities. Bridging the divide between digital processing and analog realities.',
    color: '#7A5CFF'
  }
];

export function PhysicalAISection() {
  return (
    <section className="relative min-h-screen py-24 md:py-32 px-6 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7A5CFF]/[0.03] to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-5xl w-full"
      >
        {/* Headline */}
        <div className="mb-20 md:mb-28">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-zinc-600 mb-3">
            <CryptographicText text="This is not IoT." delay={200} />
          </h2>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.03em] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#7A5CFF]">
              <CryptographicText text="This is Physical AI." delay={800} />
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#7A5CFF]/40 to-transparent origin-center mt-6"
          />
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Top accent line */}
              <div className="w-8 h-[2px] mb-6 transition-all duration-500 group-hover:w-12" style={{ backgroundColor: cap.color }} />
              
              <h4 className="font-mono-tight text-xs tracking-[0.15em] mb-4 transition-colors duration-300" style={{ color: cap.color }}>
                {cap.num}. {cap.title.toUpperCase()}
              </h4>
              <p className="text-zinc-400 font-light text-sm leading-[1.8]">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
