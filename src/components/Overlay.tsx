import { HeroSection } from '../sections/HeroSection';
import { VisionSection } from '../sections/VisionSection';
import { TechStackSection } from '../sections/TechStackSection';
import { ProductsSection } from '../sections/ProductsSection';
import { PhysicalAISection } from '../sections/PhysicalAISection';
import { InvestorsSection } from '../sections/InvestorsSection';
import { ManifestoSection } from '../sections/ManifestoSection';
import { ContactSection } from '../sections/ContactSection';
import { Navbar } from './Navbar';

export function Overlay() {
  return (
    <>
      <Navbar />

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
