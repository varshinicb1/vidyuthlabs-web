import { Linkedin, Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <footer className="relative bg-black-base border-t border-zinc-900 py-24 text-center z-10 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#00F5FF]/30 to-transparent"></div>
      
      <div className="max-w-2xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">VIDYUTHLABS</h2>
        <p className="text-zinc-600 text-sm tracking-widest font-mono uppercase mb-16">The physical intelligence company</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-24">
          <a 
            href="mailto:cbvarshini1@gmail.com" 
            className="group flex flex-col items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-300"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 group-hover:border-[#00F5FF] group-hover:bg-[#00F5FF]/10 transition-all duration-300">
              <Mail className="w-5 h-5 group-hover:text-[#00F5FF] transition-colors" />
            </div>
            <span className="text-sm font-mono tracking-wider">Email</span>
          </a>

          <a 
            href="https://www.linkedin.com/company/vidyuthlabs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-300"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 group-hover:border-[#7A5CFF] group-hover:bg-[#7A5CFF]/10 transition-all duration-300">
              <Linkedin className="w-5 h-5 group-hover:text-[#7A5CFF] transition-colors" />
            </div>
            <span className="text-sm font-mono tracking-wider">LinkedIn</span>
          </a>
        </div>

        <div className="w-full text-zinc-700 text-xs flex justify-between items-center pt-8 border-t border-zinc-900/50">
          <div>© {new Date().getFullYear()} VidyuthLabs. All rights reserved.</div>
          <div className="font-mono text-zinc-600">Always on. Always aware.</div>
        </div>
      </div>
    </footer>
  );
}
