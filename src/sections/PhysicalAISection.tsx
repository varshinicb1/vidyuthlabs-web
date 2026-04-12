import { motion } from 'framer-motion';
import { CryptographicText } from '../components/CryptographicText';

export function PhysicalAISection() {
  return (
    <section className="relative min-h-screen py-32 px-6 flex flex-col items-center justify-center text-center z-10 bg-gradient-to-b from-transparent to-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-5xl"
      >
        <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter text-zinc-500 mb-2">
          <CryptographicText text="This is not IoT." delay={200} />
        </h2>
        <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#7A5CFF] mb-16">
          <CryptographicText text="This is Physical AI." delay={800} />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 text-left">
          <div>
            <h4 className="text-[#00F5FF] font-mono text-sm tracking-widest mb-4">01. CONTINUOUS SENSING</h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              Moving past episodic data capture. Our self-powered nodes enable perpetual monitoring of their designated environments without energy degradation.
            </p>
          </div>
          <div>
            <h4 className="text-[#00F5FF] font-mono text-sm tracking-widest mb-4">02. EMBEDDED INTELLIGENCE</h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              Raw data is heavy. We process signals at the edge using ultra-low-power local inferencing, transmitting only actionable insights and anomalies.
            </p>
          </div>
          <div>
            <h4 className="text-[#00F5FF] font-mono text-sm tracking-widest mb-4">03. REAL-WORLD AWARENESS</h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              Transforming inert physical spaces into state-aware entities. Bridging the divide between digital processing and analog realities.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
