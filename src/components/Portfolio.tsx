import { useState } from "react";
import { X } from "lucide-react";

import basketballImg from "@/assets/portfolio-basketball.jpg";

const photos = [
  { id: 1, src: basketballImg, alt: "Basketball slam dunk action shot", category: "Basketball" },
];

export const Portfolio = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-2">
            My Work
          </p>
          <h2 className="section-title text-foreground">
            Portfolio
          </h2>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`portfolio-card aspect-[4/5] opacity-0 animate-fade-up`}
              style={{ 
                animationFillMode: 'forwards',
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="font-display text-xl text-hero-foreground tracking-wider">
                  {photo.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-hero/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-hero-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            className="max-w-full max-h-[90vh] object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <p className="font-display text-2xl text-hero-foreground tracking-wider">
              {selectedPhoto.category}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
