import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

export function InvestorsSection() {
  return (
    <section className="relative min-h-screen py-32 px-6 lg:px-24 border-t border-zinc-900 bg-black-base text-left z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-sm font-mono tracking-[0.2em] text-zinc-500 mb-4">INVESTOR RELATIONS</h2>
          <h3 className="text-4xl md:text-5xl font-light text-white">
            Building the infrastructure for <span className="text-[#7A5CFF] font-medium">physical intelligence</span>.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-16"
          >
            <div>
              <h4 className="text-xl text-white mb-4 border-b border-zinc-800 pb-2">Why Now</h4>
              <ul className="space-y-4 text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                <li>• Current IoT architectures are bottle-necked by energy limitations and battery reliance.</li>
                <li>• Recent breakthroughs in nanomaterials and printable supercapacitors make self-powered systems viable.</li>
                <li>• The AI models of the next decade require continuous, high-fidelity real-world context that current sensors cannot provide.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl text-white mb-4 border-b border-zinc-800 pb-2">What We're Building</h4>
              <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                A scalable, self-powered sensing ecosystem. We design the materials, the energy harvesting storage, the embedded processing units, and the intelligence layer. An end-to-end stack for physical AI.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-16"
          >
            <div className="p-8 border border-zinc-800 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F5FF]/10 blur-3xl group-hover:bg-[#00F5FF]/20 transition-all duration-700"></div>
              <h4 className="text-xs tracking-widest text-[#00F5FF] uppercase mb-6">Founder & CEO</h4>
              
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-3xl font-medium text-white">Varshini CB</h5>
                <a 
                  href="https://www.linkedin.com/in/varshini-cb-821176360/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-[#00F5FF] transition-colors p-2 hover:bg-[#00F5FF]/10 rounded-full"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              
              <p className="text-sm font-mono text-zinc-500 mb-6">RV College of Engineering (Undergraduate)</p>
              <p className="text-zinc-400 font-light text-sm">
                Hands-on extensive work in nanomaterial synthesis, advanced electrochemical sensors, and deeply embedded systems. Bridging the gap between theoretical lab research and scalable physical technology.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl text-white font-light">Interested in backing the future of physical intelligence?</h4>
              <a 
                href="mailto:cbvarshini1@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:border-[#00F5FF] text-white hover:text-[#00F5FF] transition-colors duration-300 font-mono text-sm"
              >
                Request Deck →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
