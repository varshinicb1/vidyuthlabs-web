import { HeroSection } from '../sections/HeroSection';
import { VisionSection } from '../sections/VisionSection';
import { TechStackSection } from '../sections/TechStackSection';
import { ProductsSection } from '../sections/ProductsSection';
import { PhysicalAISection } from '../sections/PhysicalAISection';
import { InvestorsSection } from '../sections/InvestorsSection';
import { ManifestoSection } from '../sections/ManifestoSection';
import { ContactSection } from '../sections/ContactSection';
import { Logo } from './Brand';

export function Overlay() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 z-50 pointer-events-none mix-blend-screen">
        <div className="max-w-[1400px] w-full mx-auto flex justify-between items-center">
          <Logo className="pointer-events-auto" />
        </div>
      </header>

      <div className="flex flex-col w-full text-white selection:bg-[#00F5FF]/30">
        <HeroSection />
        <VisionSection />
        <TechStackSection />
        <ProductsSection />
        <PhysicalAISection />
        <InvestorsSection />
        <ManifestoSection />
        <ContactSection />
      </div>
    </>
  );
}
