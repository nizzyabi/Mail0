import HeroImage from "@/components/home/hero-image";
import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero";

export default function BetaSignup() {
  return (
    <div className="relative min-h-screen w-full overflow-auto">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#fff_100%)]"></div>
      <div className="relative mx-auto flex max-w-7xl flex-col">
        <Navbar />
        <Hero />
        <HeroImage />
      </div>
    </div>
  );
}
