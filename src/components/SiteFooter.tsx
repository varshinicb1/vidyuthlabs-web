import { COMPANY, CONTACT_EMAIL, DPIIT } from '../config';

/** Legal footer: registered entity, office address, contact and policy links. */
export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/10 pl-6 pr-12 md:pl-12 lg:pl-16 pt-14 pb-28 md:pb-24 md:pr-24 text-sm text-gray-400">
      <div className="grid gap-10 md:grid-cols-3 max-w-6xl">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" width={36} height={36} loading="lazy" className="w-9 h-9" />
            <span className="text-white font-black uppercase italic tracking-tighter text-xl">VidyuthLabs</span>
          </div>
          <p className="mt-4 text-gray-300 font-semibold">{COMPANY.legalName}</p>
          <p className="mt-1">CIN: {COMPANY.cin}</p>
          <p className="mt-1">
            DPIIT-recognised startup ·{' '}
            <a href={DPIIT.verifyUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-4 hover:text-gold-400">
              Certificate No. {DPIIT.certificateNo}
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-black mb-3">Registered Office</h3>
          <address className="not-italic leading-relaxed">
            {COMPANY.address.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </address>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-black mb-3">Contact</h3>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-white font-semibold hover:text-gold-400 transition-colors">
            {CONTACT_EMAIL}
          </a>
          <ul className="mt-5 space-y-2">
            <li><a href="/privacy/" className="hover:text-gold-400 transition-colors">Privacy Policy</a></li>
            <li><a href="/terms/" className="hover:text-gold-400 transition-colors">Terms of Use</a></li>
          </ul>
        </div>
      </div>

      <p className="mt-12 pt-6 border-t border-white/5 text-xs text-gray-500">
        © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
      </p>
    </footer>
  );
}
