import { Instagram } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="font-display text-3xl tracking-widest"
          >
            LENS<span className="text-primary">.</span>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("#portfolio")}
              className="font-body text-sm text-background/70 hover:text-background transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("#about")}
              className="font-body text-sm text-background/70 hover:text-background transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="font-body text-sm text-background/70 hover:text-background transition-colors"
            >
              Contact
            </button>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="font-body text-sm text-background/60">
            © {currentYear} LENS Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
