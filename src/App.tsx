/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Game } from './components/Game';
import { useGameStore, Section } from './store';

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
  { id: 'future', title: 'Future Products', subtitle: 'Physical AI Swarm.', content: 'Printed battery and supercapacitor-powered solar sensor nodes.' },
  { id: 'vision', title: 'The Founder', subtitle: 'Varshini CB', content: 'CEO & Founder. 6th Sem EEE at RVCE. Chief Subsystem Engineer at Team Antariksh.' }
];

function SectionContent({ section, index }: { section: typeof SECTIONS[0], index: number }) {
  const { scrollYProgress } = useScroll();
  
  const start = index / SECTIONS.length;
  const end = (index + 1) / SECTIONS.length;
  
  const opacity = useTransform(scrollYProgress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, start + 0.02, end - 0.02, end], [20, 0, 0, -20]);

  return (
    <div 
      className={`min-h-[150vh] flex flex-col ${index % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} items-center text-center justify-center px-6 md:px-24 max-w-7xl mx-auto pointer-events-none`}
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="max-w-xl pointer-events-auto bg-black/60 md:bg-transparent p-6 md:p-0 rounded-3xl backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none shadow-2xl md:shadow-none mt-[50vh] md:mt-0"
      >
        <motion.h2 className="text-xs md:text-sm uppercase tracking-[0.4em] text-cyan-400 mb-2 md:mb-4 font-black">
          {section.id === 'vision' ? 'Meet the CEO' : section.title}
        </motion.h2>
        <motion.h1 className="text-3xl md:text-8xl font-black tracking-tighter text-white mb-4 md:mb-6 leading-none">
          {section.id === 'hero' ? section.title : section.subtitle}
        </motion.h1>
        <motion.p className="text-sm md:text-2xl text-gray-300 leading-relaxed md:leading-tight mb-0 md:mb-8 font-medium">
          {section.content}
        </motion.p>
        
        {section.id === 'vision' && (
          <div className="flex flex-col items-center md:items-start gap-6 mt-6 md:mt-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                 <img 
                   src="https://picsum.photos/seed/founder/400/400" 
                   alt="Varshini CB" 
                   className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
                   referrerPolicy="no-referrer"
                 />
              </div>
              <div className="text-center md:text-left flex flex-col justify-center">
                <div className="text-2xl md:text-4xl text-white font-black tracking-tight">Varshini CB</div>
                <div className="text-cyan-400 font-bold text-base md:text-lg mt-1">CEO & Founder, VidyuthLabs</div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">Hardware Design</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">Embedded Systems</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">Materials Science</span>
                </div>

                <a 
                  href="https://linkedin.com/in/varshini-cb" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center md:justify-start gap-2 mt-6 px-6 py-3 bg-[#0077b5] text-white text-sm font-bold rounded-full hover:bg-[#005582] transition-colors pointer-events-auto w-fit mx-auto md:mx-0 shadow-lg shadow-[#0077b5]/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
            
            <div className="text-left bg-white/5 p-6 rounded-2xl border border-white/10 mt-4">
              <h3 className="text-cyan-400 font-bold mb-2 uppercase tracking-widest text-xs">Background</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Currently pursuing a degree in Electrical and Electronics Engineering (6th Sem) at RVCE. 
                Serves as the Chief Subsystem Engineer at Team Antariksh, bringing extensive experience in 
                building complex hardware systems and leading technical teams. Passionate about bridging the gap 
                between advanced materials science and accessible healthcare technology.
              </p>
            </div>
          </div>
        )}

        {section.id === 'competitors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-6 md:mt-8">
            <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
              <div className="text-red-400 font-bold mb-1 text-sm md:text-base">Traditional</div>
              <div className="text-[10px] md:text-xs text-gray-500">₹8,00,000+ | 5kg | Lab Only</div>
            </div>
            <div className="bg-cyan-400/10 p-3 md:p-4 rounded-xl border border-cyan-400/20">
              <div className="text-cyan-400 font-bold mb-1 text-sm md:text-base">AnalyteX</div>
              <div className="text-[10px] md:text-xs text-gray-500">₹25,000 | 150g | Field Ready</div>
            </div>
          </div>
        )}
      </motion.div>
      
      {section.id === 'hero' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-600">Scroll for Cinematic Experience</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
      )}
    </div>
  );
}


export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const setTotalScrollProgress = useGameStore(state => state.setTotalScrollProgress);
  const setActiveSection = useGameStore(state => state.setActiveSection);

  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setTotalScrollProgress(latest);
      const sectionIndex = Math.min(
        Math.floor(latest * SECTIONS.length),
        SECTIONS.length - 1
      );
      setActiveSection(SECTIONS[sectionIndex].id);
    });
  }, [scrollYProgress, setTotalScrollProgress, setActiveSection]);

  return (
    <div className="bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* 3D Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Game />
      </div>

      {/* Navigation / Brand - Only visible on first page */}
      <motion.nav 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.02], [1, 0]) }}
        className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none"
      >
        <div className="flex flex-col">
          <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-white">VidyuthLabs</div>
          <div className="text-[10px] md:text-xs text-cyan-400 font-bold tracking-widest uppercase mt-1">Always on, always aware.</div>
        </div>
      </motion.nav>

      {/* Scrollable Content */}
      <main ref={containerRef} className="relative z-10">
        <div className="flex flex-col">
          {SECTIONS.map((section, i) => (
            <SectionContent key={section.id} section={section} index={i} />
          ))}
        </div>
      </main>

      {/* Footer / Progress */}
      <div className="fixed bottom-8 left-8 z-50">
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-mono text-gray-500">01</div>
          <div className="w-32 h-px bg-gray-800 relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-cyan-500"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />
          </div>
          <div className="text-[10px] font-mono text-gray-500">13</div>
        </div>
      </div>
    </div>
  );
}
