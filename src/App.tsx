/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useEffect, useId, useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useGameStore, Section } from './store';
import { UsecasesPage } from './components/UsecasesPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { COMPANY, DPIIT, GOOGLE_SCRIPT_URL, LINKEDIN, whatsappLink } from './config';
import { SiteFooter } from './components/SiteFooter';
import founderImg from './assets/varshini.webp';
import manjunathaImg from './assets/manjunatha.jpg';
import rishithejImg from './assets/rishithej.webp';
import certificateThumb from './assets/dpiit-certificate-thumb.webp';

// The WebGL scene (three.js + drei) is most of the JS bundle; load it after the
// page copy so the text is readable before the 3D scene has downloaded.
const Game = lazy(() => import('./components/Game').then((m) => ({ default: m.Game })));

const SECTIONS: { id: Section; title: string; subtitle: string; content: string }[] = [
  { id: 'hero', title: 'AnalyteX', subtitle: 'The Lab In Your Hand.', content: 'A portable potentiostat for lab-grade electrochemistry, anywhere. One device, an interchangeable sensor for every test.' },
  { id: 'sensor', title: 'NanoX Sensor', subtitle: 'Precision Engineering.', content: 'A gold ENIG screen-printed electrode with CE, WE, and RE contacts — coated with different nanomaterials for each application.' },
  { id: 'insertion', title: 'Seamless Integration', subtitle: 'Plug and Play.', content: 'Click the NanoX sensor into the AnalyteX device to begin. No wiring, no setup.' },
  { id: 'sample', title: 'Single Drop', subtitle: 'One Drop Is Enough.', content: 'A single drop of water, soil extract or food sample unlocks it all: Cyclic Voltammetry (CV), Impedance (EIS), and ultra-trace DPV.' },
  { id: 'analysis', title: 'Live Scanning', subtitle: 'Real-time CV & EIS.', content: 'Precise, lab-grade measurements generated instantly on the 2.8-inch touchscreen.' },
  { id: 'mobile', title: 'Mobile Sync', subtitle: 'AI Insights.', content: 'Every scan streams to the VidyuthLabs app over Wi-Fi and Bluetooth, where analytics and AI turn raw signals into clear answers.' },
  { id: 'results', title: 'Instant Results', subtitle: 'Contaminant Detected.', content: 'Example reading: Lead (Pb) 12 ppb — above the 10 ppb drinking-water limit (BIS IS 10500 / WHO). Trace-level detection, right in the field.' },
  { id: 'applications', title: 'Applications', subtitle: 'One Device, Every Field.', content: 'Heavy metals in water and food, formalin in seafood, soil and agriculture, research and industry — just change the sensor.' },
  { id: 'why-us', title: 'Why Us', subtitle: 'The Accessible Standard.', content: 'Benchtop instruments are heavy, lab-bound and out of reach. AnalyteX is pocket-sized, field-ready, and the most accessible way to run electrochemistry.' },
  { id: 'target-market', title: 'Target Market', subtitle: 'Who We Serve.', content: 'Water utilities, food and seafood exporters, agriculture, environmental agencies, industry, universities and research labs — worldwide.' },
  { id: 'vision', title: 'The Team', subtitle: 'Leadership & Advisory', content: 'The people driving VidyuthLabs forward.' }
];

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  tags: string[];
  img: string;
  linkedin: string;
  whatsapp?: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Varshini CB',
    role: 'Founder & CEO',
    bio: 'Leads VidyuthLabs and the AnalyteX and NanoX programme, from hardware design through to market. Electrical Engineering, RV College of Engineering (RVCE), Bengaluru.',
    tags: ['Hardware Design', 'Embedded Systems', 'Materials Science'],
    img: founderImg,
    linkedin: LINKEDIN.varshini,
    whatsapp: whatsappLink("Hi Varshini, I'm interested in VidyuthLabs and would like to talk."),
  },
  {
    name: 'Rishithej Bollam',
    role: 'Director & Co-Founder',
    bio: 'Managing Director of ML Dynamic Solutions and a director across deep-tech ventures in AI, sensing and capital. MSc in Entrepreneurship and Innovation Management, University of Leicester.',
    tags: ['Strategy', 'Corporate Governance', 'Partnerships'],
    img: rishithejImg,
    linkedin: LINKEDIN.rishithej,
  },
  {
    name: 'Dr. Manjunatha C',
    role: 'Chief Scientific Advisor',
    bio: 'Associate Professor at RVCE, Department of Chemistry. 23 Years of Teaching and 18 Years of Research experience in inorganic nanomaterials.',
    tags: ['M.Sc., Ph.D', 'Associate Professor', 'Inorganic Nanomaterials'],
    img: manjunathaImg,
    linkedin: LINKEDIN.manjunatha,
  },
];

const ROUND_ICON = 'w-11 h-11 flex items-center justify-center text-white rounded-full transition pointer-events-auto shadow-lg';

function TeamMemberCard({ member, divider }: { key?: string; member: TeamMember; divider: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 ${divider ? 'border-b border-white/10' : ''}`}>
      <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 overflow-hidden shadow-2xl">
        <img src={member.img} alt={member.name} width={256} height={256} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
      </div>
      <div className="text-center sm:text-left flex-1">
        <div className="text-2xl sm:text-3xl text-white font-black tracking-tight uppercase italic">{member.name}</div>
        <div className="text-gold-400 font-bold text-sm sm:text-base uppercase tracking-widest mt-1">{member.role}</div>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-3 max-w-md">{member.bio}</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
          {member.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex sm:flex-col gap-2 shrink-0">
        <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`} className={`${ROUND_ICON} bg-[#0077b5] hover:bg-[#005582] shadow-[#0077b5]/20`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        {member.whatsapp && (
          <a href={member.whatsapp} target="_blank" rel="noreferrer" aria-label={`Message ${member.name} on WhatsApp`} className={`${ROUND_ICON} bg-[#25D366] hover:brightness-110 shadow-[#25D366]/20`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

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
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">Reserve Your Kit</h2>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed border-l-2 border-gold-400 pl-4 font-medium uppercase tracking-widest">
          Pre-order sensor kits now · AnalyteX device coming soon. No payment today — we confirm by email.
        </p>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-400/50">
               <span className="text-gold-400 text-2xl font-black">✓</span>
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
              autoFocus
              autoComplete="name"
              aria-label="Your Name"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-label="Your Email"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
            />
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              autoComplete="tel"
              aria-label="Mobile Number"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
            />
            <textarea 
              placeholder="How can VidyuthLabs help you?" 
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              aria-label="Message"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors resize-none"
            />
            {status === 'error' && <p className="text-red-400 text-sm mt-1">{statusMessage}</p>}
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-gold-400 hover:bg-gold-300 text-black font-bold py-3 rounded-xl transition-colors mt-2 disabled:opacity-50"
            >
              {status === 'loading' ? 'Reserving...' : 'Reserve My Kit'}
            </button>
            <p className="text-gray-500 text-xs leading-relaxed">
              We use these details only to process your pre-order and contact you about it. See our{' '}
              <a href="/privacy/" target="_blank" className="text-gray-300 underline underline-offset-2 hover:text-gold-400">Privacy Policy</a>.
            </p>
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
  // Exactly one <h1> on the page (the hero); every other section is an <h2>.
  const Heading = section.id === 'hero' ? 'h1' : 'h2';
  return (
    <div id={section.id} className={`relative min-h-[150dvh] flex flex-col items-center lg:items-start text-center lg:text-left justify-center px-6 md:px-12 lg:px-16 w-full mx-auto pointer-events-none`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:mx-0 w-full pointer-events-auto bg-black/60 lg:bg-transparent p-6 md:p-8 lg:p-0 rounded-3xl backdrop-blur-xl lg:backdrop-blur-none border border-white/10 lg:border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.5)] lg:shadow-none mt-[40dvh] md:mt-0"
      >
        <p className="text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.4em] text-gold-400 mb-2 md:mb-4 font-black drop-shadow-md break-words">
          {section.id === 'vision' ? 'Meet the Team' : section.title}
        </p>
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
        <Heading className="text-[clamp(1.875rem,4vw+1rem,4.5rem)] font-black tracking-tighter text-white mb-3 sm:mb-4 md:mb-6 leading-none drop-shadow-2xl uppercase break-words">
          {section.id === 'hero' ? section.title : section.subtitle}
        </Heading>
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed md:leading-tight mb-0 md:mb-8 font-medium drop-shadow-md break-words">
          {section.content}
        </p>
        
        {section.id === 'hero' && (
           <div className="mt-8 flex justify-center lg:justify-start">
             <button onClick={onWaitlistClick} className="pointer-events-auto bg-gold-400 hover:bg-gold-300 text-black font-black text-sm md:text-lg py-3 md:py-4 px-8 md:px-12 rounded-full transition-all shadow-[0_0_20px_rgba(212,162,76,0.4)] hover:shadow-[0_0_30px_rgba(212,162,76,0.6)] uppercase tracking-widest hover:scale-105 active:scale-95">
               Pre-order Now
             </button>
           </div>
        )}
        
        {section.id === 'vision' && (
          <div className="flex flex-col gap-6 mt-6 w-full">
            {TEAM.map((member, i) => (
              <TeamMemberCard key={member.name} member={member} divider={i < TEAM.length - 1} />
            ))}
          </div>
        )}

        {section.id === 'applications' && (
          <div className="mt-8 flex justify-center lg:justify-start">
            <button onClick={onWaitlistClick} className="pointer-events-auto bg-gold-400 hover:bg-gold-300 text-black font-black text-sm md:text-lg py-3 md:py-4 px-8 md:px-12 rounded-full transition-all shadow-[0_0_20px_rgba(212,162,76,0.4)] hover:shadow-[0_0_30px_rgba(212,162,76,0.6)] uppercase tracking-widest hover:scale-105 active:scale-95">
              Pre-order Sensors
            </button>
          </div>
        )}
      </motion.div>
      
      {section.id === 'hero' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute top-[calc(100dvh-8rem)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-[60]">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-black">Scroll to Explore</span>
          <div className="w-5 h-8 border-2 border-white/10 rounded-full flex justify-center p-1 relative bg-black/50">
            <motion.div className="w-1 h-2 bg-gold-400 rounded-full shadow-[0_0_10px_#d4a24c]" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

// The clock and custom cursor update every second / every mouse move. They
// live in their own components so those updates re-render only themselves,
// not the whole page and the WebGL scene.
function Clock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <>{time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</>;
}

function CyberCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);
  return (
    <>
      <motion.div className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold-400 pointer-events-none z-[9999] hidden lg:block" animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }} transition={{ type: 'spring', damping: 25, stiffness: 250 }} />
      <motion.div className="fixed top-0 left-0 w-1 h-1 bg-gold-400 rounded-full pointer-events-none z-[9999] hidden lg:block" animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }} />
    </>
  );
}

export default function App() {
  // Scoped to just the 11 story sections (not the CTA block that follows them),
  // so progress 0→1 is driven by their real measured height on this display —
  // not an assumption that content after them doesn't exist.
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionsRef, offset: ['start start', 'end end'] });
  const [showUsecases, setShowUsecases] = useState(false);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const activeSection = useGameStore(state => state.activeSection);
  const setActiveSection = useGameStore(state => state.setActiveSection);
  const setTotalScrollProgress = useGameStore(state => state.setTotalScrollProgress);

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      setTotalScrollProgress(latest);
      const sectionIndex = Math.min(Math.floor(latest * SECTIONS.length), SECTIONS.length - 1);
      setActiveSection(SECTIONS[sectionIndex].id);
    });
  }, [smoothProgress, setActiveSection, setTotalScrollProgress]);

  const isAtTop = activeSection === 'hero';

  // Scroll to the section's real position; sections are min-h-[150dvh], so
  // some (e.g. the team section on mobile) are taller than a fixed multiple.
  const scrollToSection = (id: Section) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-gold-500 selection:text-black min-h-screen cursor-crosshair overflow-x-hidden">
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      <CyberCursor />

      <div className="fixed inset-0 w-full z-0 pointer-events-none" aria-hidden="true">
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Game />
          </Suspense>
        </ErrorBoundary>
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
              <div className="flex items-center gap-3 md:gap-4">
                <img src="/logo.png" alt="" width={56} height={56} className="w-9 h-9 md:w-14 md:h-14 shrink-0" />
                <div className="text-2xl md:text-5xl font-black tracking-tighter uppercase text-white italic">VidyuthLabs</div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-[10px] text-gold-400 font-bold tracking-[0.4em] uppercase">Always on, always aware.</div>
                <div className="w-1 h-1 rounded-full bg-gold-400 animate-pulse" />
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  <Clock />
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
           <button onClick={() => setShowUsecases(true)} className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-gold-400 transition-all cursor-pointer">
              Browse Sensors &amp; Pre-order
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">➔</div>
           </button>
        </motion.div>

        <section id="recognition" aria-labelledby="recognition-heading" className="flex flex-col items-start p-8 md:p-16 border-t border-white/5">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold-400 font-black mb-4">Government of India · Startup India</p>
          <h2 id="recognition-heading" className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none italic mb-6">DPIIT-Recognised Startup.</h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            {COMPANY.legalName} is recognised as a startup by the Department for Promotion of Industry and Internal Trade
            (DPIIT), Ministry of Commerce &amp; Industry, Government of India.
          </p>
          <a href="/dpiit-certificate.webp" target="_blank" rel="noopener" aria-label="Open the full DPIIT certificate" className="block w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 hover:border-gold-400/60 transition-colors shadow-2xl">
            <img src={certificateThumb} alt={`DPIIT Certificate of Recognition ${DPIIT.certificateNo} issued to ${COMPANY.legalName}`} width={800} height={565} loading="lazy" decoding="async" className="w-full h-auto" />
          </a>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 w-full max-w-2xl mt-8">
            {[
              ['Certificate No.', DPIIT.certificateNo],
              ['Industry · Sector', `${DPIIT.industry} · ${DPIIT.sector}`],
              ['Date of Issue', DPIIT.issued],
              ['Valid Up To', DPIIT.validUpto],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</dt>
                <dd className="text-white font-bold mt-1">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href={DPIIT.verifyUrl} target="_blank" rel="noopener noreferrer" className="bg-gold-400 hover:bg-gold-300 text-black font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors">
              Verify on Startup India ↗
            </a>
            <a href="/dpiit-certificate.webp" target="_blank" rel="noopener" className="border border-white/20 hover:border-gold-400 text-white font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors">
              View Certificate
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Progress Footer */}
      <div className="fixed bottom-8 left-8 z-50 hidden md:flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-mono text-gold-400 font-black tracking-widest">
            {(SECTIONS.findIndex(s => s.id === activeSection) + 1).toString().padStart(2, '0')}
          </div>
          <div className="w-24 md:w-48 h-px bg-white/10 relative">
            <motion.div className="absolute top-0 left-0 h-full bg-gold-500 shadow-[0_0_15px_#d4a24c]" style={{ scaleX: smoothProgress, transformOrigin: 'left' }} />
          </div>
          <div className="text-[10px] font-mono text-gray-600 font-black">{SECTIONS.length.toString().padStart(2, '0')}</div>
        </div>
      </div>

      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {SECTIONS.map((section) => (
          <button key={section.id} onClick={() => scrollToSection(section.id)} aria-label={`Go to ${section.title}`} aria-current={section.id === activeSection ? 'step' : undefined} className="group relative flex items-center justify-end w-8 h-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded cursor-pointer">
            <span aria-hidden="true" className="absolute right-10 px-3 py-1 bg-gold-400 text-black text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all pointer-events-none whitespace-nowrap">
              {section.title}
            </span>
            <div className={`w-1 h-1 rounded-full transition-all duration-500 ${section.id === activeSection ? 'bg-gold-400 scale-[3]' : 'bg-white/20'}`} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showUsecases && <UsecasesPage onBack={() => setShowUsecases(false)} onPreorder={() => setIsWaitlistOpen(true)} />}
      </AnimatePresence>
    </div>
  );
}
