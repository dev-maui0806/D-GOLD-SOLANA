import Header from './components/Header';
import Banner from './components/Banner';
import HeroSection from './components/HeroSection';
import LegendSection from './components/LegendSection';
import TokenomicsSection from './components/TokenomicsSection';
import RoadmapSection from './components/RoadmapSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';

// Page order (top to bottom as user scrolls):
// [Nav] Header – sticky navigation
// 1. HeroSection – FRONT PAGE / landing (first thing users see)
// 2. Banner
// 3. LegendSection – “The Legend of D-GOLD”
// 4. TokenomicsSection (Private presale access)
// 5. RoadmapSection
// 6. FAQSection
// 7. FooterSection

function App() {
  return (
    <div className="bg-black">
      <Header />
      <HeroSection />   {/* 1 – Front page */}
      <Banner />        {/* 2 */}
      <LegendSection /> {/* 3 */}
      <TokenomicsSection /> {/* 4 – Private presale access */}
      <RoadmapSection />    {/* 5 */}
      <FAQSection />        {/* 6 */}
      <FooterSection />     {/* 7 */}
    </div>
  );
}

export default App;
