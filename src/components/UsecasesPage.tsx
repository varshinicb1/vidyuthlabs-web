import { lazy, Suspense, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { CATALOGUE } from '../data/catalogue';
import { ErrorBoundary } from './ErrorBoundary';

const SpeViewer = lazy(() =>
  import('./three/SpeViewer').then((m) => ({ default: m.SpeViewer })),
);

export function UsecasesPage({ onBack, onPreorder }: { onBack: () => void; onPreorder: () => void }) {
  // Escape closes the catalogue, unless the pre-order dialog is open on top of it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('[aria-modal="true"]')) onBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black overflow-y-auto overscroll-contain"
      role="dialog"
      aria-label="Sensor catalogue"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <button
              onClick={onBack}
              autoFocus
              className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest">Back</span>
            </button>
            <div className="text-cyan-400 font-black text-xs uppercase tracking-[0.3em] mb-3">The Sensor Catalogue</div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4 uppercase italic">
              One Device.<br /><span className="text-cyan-400">Every Sensor.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl font-medium">
              The bare board is a gold ENIG screen-printed electrode. We coat the working electrode with
              different nanomaterials to unlock each application — so a single AnalyteX becomes a whole
              shelf of instruments. Drag any sensor to inspect it, then reserve your kit.
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={onPreorder}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all hover:scale-105 cursor-pointer shadow-[0_0_25px_rgba(0,229,255,0.35)]"
            >
              Pre-order a kit
            </button>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-3 text-center">
              AnalyteX device — coming soon
            </p>
          </div>
        </div>

        {/* Catalogue grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CATALOGUE.map((item, index) => (
            <motion.article
              key={item.id}
              id={item.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="group relative rounded-3xl border border-white/10 bg-gray-900/40 overflow-hidden hover:border-cyan-400/40 transition-colors"
            >
              {/* 3D viewer */}
              <div
                className="relative h-60"
                style={{ background: `radial-gradient(120% 90% at 50% 0%, rgba(${item.accent},0.18), transparent 70%)` }}
              >
                <ErrorBoundary>
                  <Suspense fallback={<div className="h-full w-full" />}>
                    <SpeViewer coating={item.coating} code={item.code} />
                  </Suspense>
                </ErrorBoundary>
                <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] font-black tracking-widest text-white">
                  {item.code}
                </span>
                <span
                  className="absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
                  style={{ background: `rgba(${item.accent},0.16)`, color: `rgb(${item.accent})` }}
                >
                  {item.techniques}
                </span>
              </div>

              {/* Content */}
              <div className="p-7 md:p-8 border-t border-white/10">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic">{item.title}</h2>
                <p className="mt-1 text-sm font-bold" style={{ color: `rgb(${item.accent})` }}>{item.tagline}</p>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">{item.description}</p>

                <ul className="mt-5 flex flex-col gap-2.5">
                  {item.whyBuy.map((reason) => (
                    <li key={reason} className="flex gap-3 text-sm text-gray-200">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: `rgb(${item.accent})` }} />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs">
                    <div className="font-mono text-gray-300">{item.analytes}</div>
                    <div className="mt-0.5 text-gray-600 uppercase tracking-wider font-bold text-[10px]">For: {item.forWho}</div>
                  </div>
                  <button
                    onClick={onPreorder}
                    className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-cyan-400 font-black uppercase tracking-widest text-sm px-6 py-3 rounded-full transition-all cursor-pointer"
                  >
                    Pre-order <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-cyan-400 p-10 md:p-14 rounded-[3rem] text-black">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3 italic">Reserve your kit today.</h2>
            <p className="text-base md:text-lg font-bold mb-8 opacity-80">
              Sensor kits are open for pre-order worldwide. The AnalyteX device is coming soon.
            </p>
            <button
              onClick={onPreorder}
              className="bg-black text-white px-12 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer"
            >
              Pre-order now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
