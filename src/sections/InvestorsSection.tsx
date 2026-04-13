import { motion } from 'framer-motion';
import { Linkedin, ArrowUpRight } from 'lucide-react';

const whyNow = [
  'Current IoT architectures are bottle-necked by energy limitations and battery reliance.',
  'Recent breakthroughs in nanomaterials and printable supercapacitors make self-powered systems viable.',
  'The AI models of the next decade require continuous, high-fidelity real-world context that current sensors cannot provide.'
];

export function InvestorsSection() {
  return (
    <section id="investors" className="relative min-h-screen py-24 md:py-32 px-6 lg:px-24 z-10 overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-24"
        >
          <h2 className="text-[11px] font-mono-tight tracking-[0.3em] text-zinc-600 uppercase mb-4">Investor Relations</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
            Building the infrastructure for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#00F5FF] font-medium">physical intelligence</span>.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Why Now */}
            <div>
              <h4 className="text-lg text-white mb-6 font-light flex items-center gap-3">
                <div className="w-6 h-px bg-[#00F5FF]" />
                Why Now
              </h4>
              <ul className="space-y-4">
                {whyNow.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex gap-3 text-zinc-400 font-light text-sm leading-relaxed"
                  >
                    <span className="text-zinc-700 font-mono-tight text-xs mt-1 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* What We're Building */}
            <div>
              <h4 className="text-lg text-white mb-6 font-light flex items-center gap-3">
                <div className="w-6 h-px bg-[#7A5CFF]" />
                What We're Building
              </h4>
              <p className="text-zinc-400 font-light text-sm leading-[1.8]">
                A scalable, self-powered sensing ecosystem. We design the materials, the energy harvesting storage, the embedded processing units, and the intelligence layer. An end-to-end stack for physical AI.
              </p>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Founder card */}
            <div className="relative p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden group hover:border-white/[0.1] transition-all duration-500">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00F5FF]/5 rounded-full blur-[80px] group-hover:bg-[#00F5FF]/10 transition-all duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <h4 className="text-[10px] tracking-[0.2em] text-[#00F5FF]/70 uppercase font-mono-tight mb-8">Founder & CEO</h4>
                
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-2xl md:text-3xl font-medium text-white tracking-tight">Varshini CB</h5>
                  <a 
                    href="https://www.linkedin.com/in/varshini-cb-821176360/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-[#00F5FF] transition-colors p-2 hover:bg-[#00F5FF]/10 rounded-full"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                
                <p className="text-xs font-mono-tight text-zinc-600 mb-6">RV College of Engineering (Undergraduate)</p>
                <p className="text-zinc-400 font-light text-sm leading-[1.8]">
                  Hands-on extensive work in nanomaterial synthesis, advanced electrochemical sensors, and deeply embedded systems. Bridging the gap between theoretical lab research and scalable physical technology.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-gradient-to-br from-white/[0.02] to-transparent">
              <h4 className="text-lg text-white font-light mb-4">Interested in backing the future of physical intelligence?</h4>
              <a 
                href="mailto:cbvarshini1@gmail.com"
                className="group inline-flex items-center gap-3 px-6 py-3 border border-zinc-800 hover:border-[#00F5FF]/50 text-zinc-300 hover:text-[#00F5FF] transition-all duration-300 font-mono-tight text-sm rounded-lg hover:bg-[#00F5FF]/5"
              >
                Request Deck
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
