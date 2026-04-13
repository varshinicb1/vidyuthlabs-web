import { motion } from 'framer-motion';
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  return (
    <footer id="contact" className="relative bg-black-base py-24 md:py-32 z-10 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7A5CFF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Main CTA Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
            Let's build the future.
          </h2>
          <p className="text-zinc-500 text-sm md:text-base font-light max-w-md mx-auto mb-10">
            We're looking for partners, investors, and collaborators who share our vision of perpetual physical intelligence.
          </p>
          <a
            href="mailto:cbvarshini1@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/[0.04] border border-white/10 hover:border-[#00F5FF]/40 text-white hover:text-[#00F5FF] transition-all duration-500 font-mono-tight text-sm tracking-widest uppercase rounded-xl hover:bg-[#00F5FF]/5 hover:shadow-[0_0_40px_rgba(0,245,255,0.08)]"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-4 mb-20"
        >
          <a 
            href="mailto:cbvarshini1@gmail.com" 
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/[0.06] bg-white/[0.02] hover:border-[#00F5FF]/30 hover:bg-[#00F5FF]/5 transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 text-zinc-500 group-hover:text-[#00F5FF] transition-colors" />
          </a>
          <a 
            href="https://www.linkedin.com/company/vidyuthlabs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/[0.06] bg-white/[0.02] hover:border-[#7A5CFF]/30 hover:bg-[#7A5CFF]/5 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-zinc-500 group-hover:text-[#7A5CFF] transition-colors" />
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-[0.15em] text-white/60 uppercase">VidyuthLabs</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-700">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-mono-tight text-zinc-600">Always on. Always aware.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
