/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Game } from './components/Game';
import { useGameStore, Section } from './store';
import { UsecasesPage } from './components/UsecasesPage';
import { whatsappLink } from './config';
import founderImg from './assets/varshini.png';
import manjunathaImg from './assets/manjunatha.jpg';

const SECTIONS: { id: Section; title: string; subtitle: string; content: string }[] = [
  { id: 'hero', title: 'AnalyteX', subtitle: 'The Lab In Your Hand.', content: 'A portable potentiostat for lab-grade electrochemistry, anywhere. One device, an interchangeable sensor for every test.' },
  { id: 'sensor', title: 'NanoX Sensor', subtitle: 'Precision Engineering.', content: 'A gold ENIG screen-printed electrode with CE, WE, and RE contacts — coated with different nanomaterials for each application.' },
  { id: 'insertion', title: 'Seamless Integration', subtitle: 'Plug and Play.', content: 'Click the NanoX sensor into the AnalyteX device to begin. No wiring, no setup.' },
  { id: 'sample', title: 'Single Drop', subtitle: 'One Drop Is Enough.', content: 'A single drop of water, soil extract or food sample unlocks it all: Cyclic Voltammetry (CV), Impedance (EIS), and ultra-trace DPV.' },
  { id: 'analysis', title: 'Live Scanning', subtitle: 'Real-time CV & EIS.', content: 'Precise, lab-grade measurements generated instantly on the 2.8-inch touchscreen.' },
  { id: 'mobile', title: 'Mobile Sync', subtitle: 'AI Insights.', content: 'Every scan streams to the VidyuthLabs app over Wi-Fi and Bluetooth, where analytics and AI turn raw signals into clear answers.' },
  { id: 'results', title: 'Instant Results', subtitle: 'Contaminant Detected.', content: 'Lead (Pb): 12 ppb — above the safe limit. Trace-level detection with lab-grade precision, right in the field.' },
  { id: 'applications', title: 'Applications', subtitle: 'One Device, Every Field.', content: 'Heavy metals in water and food, formalin in seafood, soil and agriculture, research and industry — just change the sensor.' },
  { id: 'why-us', title: 'Why Us', subtitle: 'The Accessible Standard.', content: 'Benchtop instruments are heavy, lab-bound and out of reach. AnalyteX is pocket-sized, field-ready, and the most accessible way to run electrochemistry.' },
  { id: 'target-market', title: 'Target Market', subtitle: 'Who We Serve.', content: 'Water utilities, food and seafood exporters, agriculture, environmental agencies, industry, universities and research labs — worldwide.' },
  { id: 'vision', title: 'The Team', subtitle: 'Leadership & Advisory', content: 'The people driving VidyuthLabs forward.' }
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
      setStatusMessage('Pre-order received. We will email you to confirm your kit.');
      setTimeout(() => { onClose(); setStatus('idle'); setName(''); setEmail(''); setPhone(''); setMessage(''); }, 3000);
    } catch (err) {
      setStatus('error');
      setStatusMessage('Connection error.');
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-gray-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative"
        onClick={e => e.stopPropagation()}
        role="dialog"
      >
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">Reserve Your Kit</h2>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed border-l-2 border-cyan-400 pl-4 font-medium uppercase tracking-widest">
          Pre-order sensor kits now · AnalyteX device coming soon. No payment today — we confirm by email.
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
              {status === 'loading' ? 'Reserving...' : 'Reserve My Kit'}
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
  key?: any;
  section: typeof SECTIONS[0];
  onWaitlistClick: () => void;
}

function SectionContent({ section, onWaitlistClick }: SectionContentProps) {
  return (
    <div className={`min-h-[150dvh] flex flex-col items-center lg:items-start text-center lg:text-left justify-center px-6 md:px-12 lg:px-16 w-full mx-auto pointer-events-none`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:mx-0 w-full pointer-events-auto bg-black/60 lg:bg-transparent p-6 md:p-8 lg:p-0 rounded-3xl backdrop-blur-xl lg:backdrop-blur-none border border-white/10 lg:border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.5)] lg:shadow-none mt-[40dvh] md:mt-0"
      >
        <motion.h2 className="text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.4em] text-cyan-400 mb-2 md:mb-4 font-black drop-shadow-md break-words">
          {section.id === 'vision' ? 'Meet the Team' : section.title}
        </motion.h2>
        {/*
          Fluid, container-aware sizing instead of fixed breakpoint jumps.
          On desktop this text column is only the right HALF of the viewport
          (see <main className="lg:w-1/2 ...">), so a size keyed to raw
          viewport width (e.g. a flat lg:text-8xl) can be wider than the
          column actually available for it — which is exactly what caused
          long single words like "CONTAMINANT" to overflow their card. The
          clamp() below scales continuously with viewport width instead of
          jumping at 4 breakpoints, and its ceiling (4.5rem) is sized for the
          narrower desktop column, so it holds up at any window size, not
          just the ones we happened to test. break-words is a hard safety
          net in case future copy has an even longer word.
        */}
        <motion.h1 className="text-[clamp(1.875rem,4vw+1rem,4.5rem)] font-black tracking-tighter text-white mb-3 sm:mb-4 md:mb-6 leading-none drop-shadow-2xl uppercase break-words">
          {section.id === 'hero' ? section.title : section.subtitle}
        </motion.h1>
        <motion.p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed md:leading-tight mb-0 md:mb-8 font-medium drop-shadow-md break-words">
          {section.content}
        </motion.p>
        
        {section.id === 'hero' && (
           <div className="mt-8 flex justify-center lg:justify-start">
             <button onClick={onWaitlistClick} className="pointer-events-auto bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm md:text-lg py-3 md:py-4 px-8 md:px-12 rounded-full transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] uppercase tracking-widest hover:scale-105 active:scale-95">
               Pre-order Now
             </button>
           </div>
        )}
        
        {section.id === 'vision' && (
          <div className="flex flex-col items-center gap-6 mt-6 w-full">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-white/10">
                <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 overflow-hidden shadow-2xl">
                  <img src={founderImg} alt="Varshini CB" className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="text-2xl sm:text-3xl text-white font-black tracking-tight uppercase italic">Varshini CB</div>
                  <div className="text-cyan-400 font-bold text-sm sm:text-base uppercase tracking-widest mt-1">CEO & Founder, VidyuthLabs</div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-3 max-w-md">
                    Designing space-grade subsystems for Team Antariksh. Bringing orbital-class hardware engineering to portable bio-detectors.
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hardware Design</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">Embedded Systems</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">Materials Science</span>
                  </div>
                </div>
                <div className="flex sm:flex-col gap-2 shrink-0">
                  <a href="https://www.linkedin.com/in/varshini-cb-821176360/" target="_blank" rel="noreferrer" aria-label="Varshini CB on LinkedIn" className="w-11 h-11 flex items-center justify-center bg-[#0077b5] text-white rounded-full hover:bg-[#005582] transition-colors pointer-events-auto shadow-lg shadow-[#0077b5]/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href={whatsappLink("Hi Varshini, I'm interested in VidyuthLabs and would like to talk.")} target="_blank" rel="noreferrer" aria-label="Message Varshini on WhatsApp" className="w-11 h-11 flex items-center justify-center bg-[#25D366] text-white rounded-full hover:brightness-110 transition pointer-events-auto shadow-lg shadow-[#25D366]/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/></svg>
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 overflow-hidden shadow-2xl">
                  <img src={manjunathaImg} alt="Dr. Manjunatha C" className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="text-2xl sm:text-3xl text-white font-black tracking-tight uppercase italic">Dr. Manjunatha C</div>
                  <div className="text-cyan-400 font-bold text-sm sm:text-base uppercase tracking-widest mt-1">Chief Scientific Advisor</div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-3 max-w-md">
                    Associate Professor at RVCE, Department of Chemistry. 23 Years of Teaching and 18 Years of Research experience in inorganic nanomaterials.
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">M.Sc., Ph.D</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">Associate Professor</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">Inorganic Nanomaterials</span>
                  </div>
                </div>
                <a href="https://www.linkedin.com/in/manjunatha-channegowda-phd-21645a3a/" target="_blank" rel="noreferrer" className="shrink-0 w-11 h-11 flex items-center justify-center bg-[#0077b5] text-white rounded-full hover:bg-[#005582] transition-colors pointer-events-auto shadow-lg shadow-[#0077b5]/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {section.id === 'applications' && (
          <div className="mt-8 flex justify-center lg:justify-start">
            <button onClick={onWaitlistClick} className="pointer-events-auto bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm md:text-lg py-3 md:py-4 px-8 md:px-12 rounded-full transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] uppercase tracking-widest hover:scale-105 active:scale-95">
              Pre-order Sensors
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
  // Scoped to just the 11 story sections (not the CTA block that follows them),
  // so progress 0→1 is driven by their real measured height on this display —
  // not an assumption that content after them doesn't exist.
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionsRef, offset: ['start start', 'end end'] });
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showUsecases, setShowUsecases] = useState(false);

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
        <div ref={sectionsRef} className="flex flex-col">
          {SECTIONS.map((section) => (
            <SectionContent key={section.id} section={section} onWaitlistClick={() => setIsWaitlistOpen(true)} />
          ))}
        </div>

        <motion.div className="min-h-[60vh] flex flex-col items-start justify-center p-8 md:p-16 border-t border-white/5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
           <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-10 italic">Explore The <br/> Sensor Catalogue.</h2>
           <button onClick={() => setShowUsecases(true)} className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all cursor-pointer">
              Browse Sensors &amp; Pre-order
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">➔</div>
           </button>
        </motion.div>
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
        {showUsecases && <UsecasesPage onBack={() => setShowUsecases(false)} onPreorder={() => setIsWaitlistOpen(true)} />}
      </AnimatePresence>
    </div>
  );
}
