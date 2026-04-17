/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Game } from './components/Game';
import { useGameStore, Section } from './store';
import { UsecasesPage } from './components/UsecasesPage';
import { FuturePage } from './components/FuturePage';
import founderImg from './assets/varshini.png';

const SECTIONS: { id: Section; title: string; subtitle: string; content: string }[] = [
  { id: 'hero', title: 'AnalyteX', subtitle: 'The Future of Physical AI.', content: 'Lab-grade electrochemistry on your palm. Precision meets portability.' },
  { id: 'sensor', title: 'VidyutX Sensor', subtitle: 'Precision Engineering.', content: 'High-sensitivity PCB-based detection with CE, WE, and RE contacts.' },
  { id: 'insertion', title: 'Seamless Integration', subtitle: 'Plug and Play.', content: 'Insert the VidyutX sensor into the AnalyteX device to begin.' },
  { id: 'sample', title: 'Single Drop Diagnostics', subtitle: 'Comprehensive Analysis.', content: 'One drop unlocks everything: Cyclic Voltammetry (CV) for redox behavior, EIS for binding kinetics, and DPV for ultra-trace quantification.' },
  { id: 'analysis', title: 'Live Scanning', subtitle: 'Real-time CV & EIS.', content: 'Precise instrument readings generated instantly on the device.' },
  { id: 'mobile', title: 'Mobile Sync', subtitle: 'Cloud Connected.', content: 'Seamlessly communicates with the VidyuthLabs mobile app.' },
  { id: 'results', title: 'Instant Results', subtitle: 'Biomarker Detected.', content: 'Troponin I: 0.04 ng/mL. Early myocardial infarction detection with lab-grade precision at the point of care.' },
  { id: 'applications', title: 'Applications', subtitle: 'Biomedical & Labs.', content: 'Multiplexed biomarker detection: Troponin, Cortisol, Lactate, and heavy metals using CV, EIS, and DPV.' },
  { id: 'competitors', title: 'Competitors', subtitle: 'The Market Gap.', content: 'Traditional potentiostats are 5kg+ and cost ₹5L+. They are lab-bound.' },
  { id: 'why-us', title: 'Why Us', subtitle: 'The VidyuthLabs Advantage.', content: 'Pocket-sized, ₹25,000, field-ready, 10nA resolution.' },
  { id: 'target-market', title: 'Target Market', subtitle: 'Who We Serve.', content: 'Researchers, clinics, environmental agencies, and educational institutions.' },
  { id: 'future', title: 'Future Pipeline', subtitle: 'Printed Organics.', content: 'Developing the future of molecular sensing via printed electronics on flexible substrates and multi-walled carbon nanotube arrays for extreme diagnostic sensitivity.' },
  { id: 'vision', title: 'The Founder', subtitle: 'Varshini CB', content: 'CEO & Founder. 6th Sem EEE at RVCE. Chief Subsystem Engineer at Team Antariksh.' }
];

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwt_dXRV9Dl6aUXOpXUS0NW_fPJzB7I6lHq6scKN-37oIr2pBiNqMBvU3D2cjvmtNqc/exec';

    try {
      const finalUrl = `${GOOGLE_SCRIPT_URL}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&message=${encodeURIComponent(message)}`;
      await fetch(finalUrl, { method: 'GET', mode: 'no-cors' });
      setStatus('success');
      setStatusMessage('Welcome to the future. You are on the waitlist.');
      setTimeout(() => { onClose(); setStatus('idle'); setName(''); setEmail(''); setPhone(''); setMessage(''); }, 3000);
    } catch (err) {
      setStatus('error');
      setStatusMessage('Connection error.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-gray-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative"
        onClick={e => e.stopPropagation()}
        role="dialog"
      >
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">VidyuthX Waitlist</h2>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed border-l-2 border-cyan-400 pl-4 font-medium uppercase tracking-widest">
          Join the priority queue for India's first portable Physical AI diagnostic node.
        </p>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/50">
               <span className="text-cyan-400 text-2xl font-black">✓</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Access Granted</h3>
            <p className="text-gray-400 text-sm italic">{statusMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={e => setName(e.target.value)}
              required
              aria-label="Your Name"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Your Email"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              aria-label="Mobile Number"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <textarea 
              placeholder="How can VidyuthLabs help you?" 
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              aria-label="Message"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
            />
            {status === 'error' && <p className="text-red-400 text-sm mt-1">{statusMessage}</p>}
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 rounded-xl transition-colors mt-2 disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-white text-sm py-2 transition-colors"
            >
              Cancel
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

interface SectionContentProps {
  section: typeof SECTIONS[0];
  index: number;
  onWaitlistClick: () => void;
  onFutureClick: () => void;
}

function SectionContent({ section, index, onWaitlistClick, onFutureClick }: SectionContentProps) {
  const { scrollYProgress } = useScroll();
  
  const start = index / SECTIONS.length;
  const end = (index + 1) / SECTIONS.length;
  
  const opacity = useTransform(scrollYProgress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, start + 0.02, end - 0.02, end], [20, 0, 0, -20]);

  return (
    <div className={`min-h-[150dvh] flex flex-col items-center lg:items-start text-center lg:text-left justify-center px-6 md:px-12 lg:px-16 w-full mx-auto pointer-events-none`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:mx-0 w-full pointer-events-auto bg-black/60 lg:bg-transparent p-6 md:p-8 lg:p-0 rounded-3xl backdrop-blur-xl lg:backdrop-blur-none border border-white/10 lg:border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.5)] lg:shadow-none mt-[40dvh] md:mt-0"
      >
        <motion.h2 className="text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.4em] text-cyan-400 mb-2 md:mb-4 font-black drop-shadow-md">
          {section.id === 'vision' ? 'Meet the CEO' : section.title}
        </motion.h2>
        <motion.h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white mb-3 sm:mb-4 md:mb-6 leading-none drop-shadow-2xl uppercase">
          {section.id === 'hero' ? section.title : section.subtitle}
        </motion.h1>
        <motion.p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed md:leading-tight mb-0 md:mb-8 font-medium drop-shadow-md">
          {section.content}
        </motion.p>
        
        {section.id === 'hero' && (
           <div className="mt-8 flex justify-center lg:justify-start">
             <button onClick={onWaitlistClick} className="pointer-events-auto bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm md:text-lg py-3 md:py-4 px-8 md:px-12 rounded-full transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] uppercase tracking-widest hover:scale-105 active:scale-95">
               Join the Waitlist
             </button>
           </div>
        )}
        
        {section.id === 'vision' && (
          <div className="flex flex-col items-center md:items-start gap-6 mt-6 md:mt-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                 <img src={founderImg} alt="Varshini CB" className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="text-center md:text-left flex flex-col justify-center">
                <div className="text-2xl md:text-4xl text-white font-black tracking-tight uppercase italic">Varshini CB</div>
                <div className="text-cyan-400 font-bold text-base md:text-lg mt-1 uppercase tracking-widest">CEO & Founder, VidyuthLabs</div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4 uppercase text-[10px] tracking-widest font-bold">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">Hardware Design</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">Embedded Systems</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">Materials Science</span>
                </div>

                <a href="https://www.linkedin.com/in/varshini-cb-821176360/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center md:justify-start gap-2 mt-6 px-6 py-3 bg-[#0077b5] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#005582] transition-colors pointer-events-auto w-fit mx-auto md:mx-0 shadow-lg shadow-[#0077b5]/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
            
            <div className="text-left bg-white/5 p-6 rounded-2xl border border-white/10 mt-4 max-w-xl">
              <h3 className="text-cyan-400 font-bold mb-2 uppercase tracking-[0.3em] text-[10px]">Background</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Designing space-grade subsystems for Team Antariksh. Bringing orbital-class hardware engineering to portable bio-detectors.
              </p>
            </div>
          </div>
        )}

        {section.id === 'competitors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-red-400 font-black mb-1 text-sm uppercase italic">Traditional</div>
              <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">₹8,00,000+ | 5kg | Lab Only</div>
            </div>
            <div className="bg-cyan-400/10 p-4 rounded-xl border border-cyan-400/20">
              <div className="text-cyan-400 font-black mb-1 text-sm uppercase italic">AnalyteX</div>
              <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">₹25,000 | 150g | Field Ready</div>
            </div>
          </div>
        )}

        {section.id === 'future' && (
           <div className="mt-8 flex justify-center lg:justify-start">
             <button onClick={onFutureClick} className="pointer-events-auto bg-transparent border border-white/20 text-white hover:bg-white hover:text-black font-black text-sm md:text-lg py-3 md:py-4 px-8 md:px-12 rounded-full transition-all uppercase tracking-widest hover:scale-105 active:scale-95">
               Explore R&D
             </button>
           </div>
        )}
      </motion.div>
      
      {section.id === 'hero' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-[60]">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-black">Scroll to Explore</span>
          <div className="w-5 h-8 border-2 border-white/10 rounded-full flex justify-center p-1 relative bg-black/50">
            <motion.div className="w-1 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00e5ff]" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showUsecases, setShowUsecases] = useState(false);
  const [showFuture, setShowFuture] = useState(false);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const activeSection = useGameStore(state => state.activeSection);
  const setActiveSection = useGameStore(state => state.setActiveSection);
  const setTotalScrollProgress = useGameStore(state => state.setTotalScrollProgress);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => { clearInterval(timer); window.removeEventListener('mousemove', handleMouse); };
  }, []);

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      setTotalScrollProgress(latest);
      const sectionIndex = Math.min(Math.floor(latest * SECTIONS.length), SECTIONS.length - 1);
      setActiveSection(SECTIONS[sectionIndex].id);
    });
  }, [smoothProgress]);

  const isAtTop = activeSection === 'hero';

  const scrollToSection = (index: number) => {
    window.scrollTo({ top: index * window.innerHeight * 1.5, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-cyan-500 selection:text-black min-h-screen cursor-crosshair overflow-x-hidden">
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Cyber Cursor */}
      <motion.div className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400 pointer-events-none z-[9999] hidden lg:block" animate={{ x: mousePos.x - 16, y: mousePos.y - 16, scale: isHovering ? 1.5 : 1, backgroundColor: isHovering ? 'rgba(0, 229, 255, 0.1)' : 'transparent' }} transition={{ type: 'spring', damping: 25, stiffness: 250 }} />
      <motion.div className="fixed top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[9999] hidden lg:block" animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }} />

      <div className="fixed inset-0 w-full z-0 pointer-events-none">
        <Game />
      </div>

      {/* Navigation / Brand - EXPLICIT FADE CONTROL */}
      <AnimatePresence>
        {isAtTop && (
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none"
          >
            <div className="flex flex-col pointer-events-auto">
              <div className="text-2xl md:text-5xl font-black tracking-tighter uppercase text-white italic">VidyuthLabs</div>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-[10px] text-cyan-400 font-bold tracking-[0.4em] uppercase">Always on, always aware.</div>
                <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="relative z-10 lg:w-1/2 lg:ml-[50%]">
        <div className="flex flex-col">
          {SECTIONS.map((section, i) => (
            <SectionContent key={section.id} section={section} index={i} onWaitlistClick={() => setIsWaitlistOpen(true)} onFutureClick={() => setShowFuture(true)} />
          ))}

          <motion.div className="min-h-[60vh] flex flex-col items-start justify-center p-8 md:p-16 border-t border-white/5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
             <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-10 italic">Go Beyond <br/> The Lab.</h2>
             <button onClick={() => setShowUsecases(true)} className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all cursor-pointer">
                Explore Usecases
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">➔</div>
             </button>
          </motion.div>
        </div>
      </main>

      {/* Progress Footer */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-mono text-cyan-400 font-black tracking-widest focus:outline-none">
            {(SECTIONS.findIndex(s => s.id === activeSection) + 1).toString().padStart(2, '0')}
          </div>
          <div className="w-24 md:w-48 h-px bg-white/10 relative">
            <motion.div className="absolute top-0 left-0 h-full bg-cyan-500 shadow-[0_0_15px_#00e5ff]" style={{ scaleX: smoothProgress, transformOrigin: 'left' }} />
          </div>
          <div className="text-[10px] font-mono text-gray-600 font-black">{SECTIONS.length.toString().padStart(2, '0')}</div>
        </div>
      </div>

      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {SECTIONS.map((section, i) => (
          <button key={section.id} onClick={() => scrollToSection(i)} className="group relative flex items-center justify-end w-8 h-4 focus:outline-none cursor-pointer">
            <span className="absolute right-10 px-3 py-1 bg-cyan-400 text-black text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
              {section.title}
            </span>
            <div className={`w-1 h-1 rounded-full transition-all duration-500 ${section.id === activeSection ? 'bg-cyan-400 scale-[3]' : 'bg-white/20'}`} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showUsecases && <UsecasesPage onBack={() => setShowUsecases(false)} />}
        {showFuture && <FuturePage onBack={() => setShowFuture(false)} />}
      </AnimatePresence>
    </div>
  );
}
