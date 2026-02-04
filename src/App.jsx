import { useState } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import HeroSection from './components/HeroSection';
import LegendSection from './components/LegendSection';
import TokenomicsSection from './components/TokenomicsSection';
import RoadmapSection from './components/RoadmapSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';
import PresaleModal from './components/PresaleModal';

// Page order (top to bottom as user scrolls):
// [Nav] Header – sticky navigation
// 1. HeroSection – FRONT PAGE / landing (first thing users see)
// 2. Banner
// 3. LegendSection – “The Legend of D-GOLD”
// 4. TokenomicsSection – subscription tiers (Diamond / Gold / Silver)
// 5. RoadmapSection
// 6. FAQSection
// 7. FooterSection

function App() {
  const [presaleModalOpen, setPresaleModalOpen] = useState(false);

  return (
    <div className="bg-black">
      <Header onOpenPresale={() => setPresaleModalOpen(true)} />
      <HeroSection onOpenPresale={() => setPresaleModalOpen(true)} />
      <Banner />
      <LegendSection />
      <TokenomicsSection onOpenPresale={() => setPresaleModalOpen(true)} />
      <RoadmapSection />
      <FAQSection />
      <FooterSection />
      <PresaleModal isOpen={presaleModalOpen} onClose={() => setPresaleModalOpen(false)} />
    </div>
  );
}

export default App;
