import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Single Game",
    price: "$75",
    description: "Perfect for capturing one special game",
    features: [
      "Full game coverage",
      "50+ edited photos",
      "Digital delivery within 48hrs",
      "Personal use license",
    ],
    popular: false,
  },
  {
    name: "Season Pass",
    price: "$499",
    description: "Best value for the dedicated athlete",
    features: [
      "Up to 10 games covered",
      "500+ edited photos",
      "Priority scheduling",
      "Online gallery",
      "Print-ready files",
      "Social media crops",
    ],
    popular: true,
  },
  {
    name: "Team Package",
    price: "$299",
    description: "Ideal for coaches and team managers",
    features: [
      "3 games covered",
      "150+ edited photos",
      "Team roster shots",
      "Shared team gallery",
      "Print release included",
    ],
    popular: false,
  },
];

export const Pricing = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-2">
            Packages
          </p>
          <h2 className="section-title text-foreground">
            Simple Pricing
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mt-4">
            Affordable rates for quality sports photography. All packages include professional editing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`relative bg-background rounded-lg p-6 md:p-8 shadow-sm opacity-0 animate-fade-up ${
                pkg.popular ? "ring-2 ring-primary" : ""
              }`}
              style={{
                animationFillMode: "forwards",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display text-2xl tracking-wider text-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  {pkg.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl text-foreground">{pkg.price}</span>
                  {pkg.name === "Season Pass" && (
                    <span className="font-body text-sm text-muted-foreground">/season</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-body text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.popular ? "dark" : "darkOutline"}
                size="lg"
                className="w-full"
                onClick={scrollToContact}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>

        <p className="font-body text-sm text-muted-foreground text-center mt-8">
          Custom packages available. Contact me for special requests or large events.
        </p>
      </div>
    </section>
  );
};
