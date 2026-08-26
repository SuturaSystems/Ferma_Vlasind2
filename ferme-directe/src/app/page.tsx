import HeroSection from '@/components/home/HeroSection';
import MarqueeFreshness from '@/components/home/MarqueeFreshness';
import SensoryRadar from '@/components/home/SensoryRadar';
import TactileProductGrid from '@/components/home/TactileProductGrid';
import StorytellingScroll from '@/components/home/StorytellingScroll';
import CrateBuilder from '@/components/home/CrateBuilder';
import RetroReviews from '@/components/home/RetroReviews';
import QuirkyFooter from '@/components/home/QuirkyFooter';

export const metadata = {
  title: 'Acasă | Ferma Directe - Tomate cu gust adevărat',
  description: 'Tomate de excepție, legume proaspete și produse artizanale direct de la ferma noastră. Stil de viață D2C, prospețime garantată.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeFreshness />
      <SensoryRadar />
      <StorytellingScroll />
      <TactileProductGrid />
      <CrateBuilder />
      <RetroReviews />
      {/* QuirkyFooter is full width and sits at the bottom, above the global footer or replacing it effectively on this page */}
      <QuirkyFooter />
    </>
  );
}
