import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import BrandMarquee from "@/components/home/BrandMarquee";
import ViewAllCTA from "@/components/home/ViewAllCTA";
import RentalPromo from "@/components/home/RentalPromo";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";

export default function Home() {
  return (
    <div className="bg-brand-onyx">
      <div id="hero" className="scroll-mt-20">
        <HeroSection />
      </div>

      <CategorySection />

      <div id="katalog" className="scroll-mt-20">
          <FeaturedProducts />
          </div>

      <BrandMarquee />

      <ViewAllCTA />

      <div id="tentang" className="scroll-mt-20">
        <AboutSection />
      </div>

      <div id="rental" className="scroll-mt-20">
        <RentalPromo />
      </div>

      <WhyUs />

      <div id="testimoni" className="scroll-mt-20">
        <Testimonials />
      </div>

      <div id="kontak" className="scroll-mt-20">
        <WhatsAppCTA />
      </div>
    </div>
  );
}