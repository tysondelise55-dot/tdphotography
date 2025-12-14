import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-sports.jpg";
export const Hero = () => {
  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img alt="Dynamic sports action photography" className="w-full h-full object-cover" src="/lovable-uploads/684811e9-d504-477d-b990-4201b758a8d2.jpg" />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="font-body text-sm md:text-base uppercase tracking-[0.3em] text-hero-foreground/70 mb-4 opacity-0 animate-fade-up delay-100" style={{
        animationFillMode: 'forwards'
      }}>
          Sports Photography
        </p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-hero-foreground leading-none mb-6 opacity-0 animate-fade-up delay-200" style={{
        animationFillMode: 'forwards'
      }}>
          Capturing The Game
          <br />
          <span className="text-primary">Through My Lens</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-hero-foreground/80 max-w-xl mx-auto mb-10 opacity-0 animate-fade-up delay-300" style={{
        animationFillMode: 'forwards'
      }}>
          14-year-old photographer bringing energy, passion, and a fresh perspective to every shot.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up delay-400" style={{
        animationFillMode: 'forwards'
      }}>
          <Button variant="hero" size="xl" onClick={scrollToPortfolio}>
            View Portfolio
          </Button>
          <Button variant="heroOutline" size="xl" onClick={scrollToContact}>
            Book a Game
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button onClick={scrollToPortfolio} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-hero-foreground/60 hover:text-hero-foreground transition-colors animate-bounce" aria-label="Scroll to portfolio">
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>;
};