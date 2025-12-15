import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Single Game",
    price: "$50",
    description: "Perfect for capturing one special game",
    features: [
      "Full game coverage",
      "30+ edited photos",
      "24-hour delivery",
      "Personal use license",
    ],
    popular: false,
  },
  {
    name: "Season Pass",
    price: "$350",
    description: "Best value for the dedicated athlete",
    features: [
      "8 games covered",
      "300+ edited photos",
      "Online gallery access",
      "Priority scheduling",
      "Print-ready files",
    ],
    popular: true,
  },
  {
    name: "Team Package",
    price: "$200",
    description: "Ideal for coaches and team managers",
    features: [
      "2 games covered",
      "Team photos included",
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
    <section id="pricing" className="py-24 md:py-40 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-body text-base uppercase tracking-[0.3em] text-primary mb-3">
            Packages
          </p>
          <h2 className="section-title text-foreground text-5xl md:text-6xl">
            Simple Pricing
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
            Affordable rates for quality sports photography. All packages include professional editing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`relative bg-background rounded-xl p-8 md:p-10 shadow-sm opacity-0 animate-fade-up ${
                pkg.popular ? "ring-2 ring-primary" : ""
              }`}
              style={{
                animationFillMode: "forwards",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider px-5 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-3xl tracking-wider text-foreground mb-3">
                  {pkg.name}
                </h3>
                <p className="font-body text-base text-muted-foreground mb-5">
                  {pkg.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-6xl text-foreground">{pkg.price}</span>
                  {pkg.name === "Season Pass" && (
                    <span className="font-body text-base text-muted-foreground">/season</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-body text-base text-foreground">{feature}</span>
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

        <p className="font-body text-base text-muted-foreground text-center mt-12">
          Custom packages available. Contact me for special requests or large events.
        </p>
      </div>
    </section>
  );
};
