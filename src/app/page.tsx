import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/home/Footer";
import Features from "@/components/home/Features";
import OurMission from "@/components/home/OurMission";
import Brand from "@/components/home/Brand";
import ExploreFeature from "@/components/home/ExploreFeature";
import Testimonials from "@/components/home/Testimonials";
export default function ChatAppLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <OurMission />
      <Brand />
      <ExploreFeature />
      <Testimonials />
      <Footer />
    </div>
  );
}
