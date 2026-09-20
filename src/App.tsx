import Background3D from "./components/Background3D";
import CursorParticles from "./components/CursorParticles";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useSmoothMouse } from "./hooks/useMousePosition";

export default function App() {
  const mouse = useSmoothMouse(0.12);

  return (
    <div className="relative min-h-screen bg-ink text-cream">
      {/* fixed layers (never block interaction) */}
      <Background3D />
      <CursorParticles />
      <CustomCursor />
      <div className="noise-overlay" aria-hidden />

      <Navbar />

      <main className="relative z-10">
        <Hero mouse={mouse} />
        <Marquee />
        <Services />
        <Work />
        <About />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
