import CTASection from "@/app/home/CTASection";
import HeroSection from "@/app/home/HeroSection";
import IntroTextSection from "@/app/home/IntroTextSection";
import PrinciplesSection from "@/app/home/PrinciplesSection";
import TrustStrip from "@/app/home/TrustStrip";

export default function HomePage() {
  return (
    <div className="editorial">
      <HeroSection />
      <TrustStrip />
      <IntroTextSection />
      <PrinciplesSection />
      <CTASection />
    </div>
  );
}
