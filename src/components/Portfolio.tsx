import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import basketballDunk from "@/assets/basketball-dunk.jpg";
import basketballAura from "@/assets/basketball-aura.jpg";
import basketballWarmup from "@/assets/basketball-warmup.jpg";
import basketballWalkout from "@/assets/basketball-walkout.jpg";

// Gallery images for basketball category
const basketballGallery = [
  { id: 1, src: basketballDunk, alt: "Basketball slam dunk action shot" },
  { id: 2, src: basketballAura, alt: "Basketball player on court" },
  { id: 3, src: basketballWarmup, alt: "Basketball warmup session" },
  { id: 4, src: basketballWalkout, alt: "Player walkout introduction" },
];

const categories = [
  { id: 1, name: "Basketball", coverImg: basketballDunk, gallery: basketballGallery },
];

export const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  const closeGallery = () => {
    setSelectedCategory(null);
    setCurrentIndex(0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCategory) {
      setCurrentIndex((prev) => (prev + 1) % selectedCategory.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCategory) {
      setCurrentIndex((prev) => (prev - 1 + selectedCategory.gallery.length) % selectedCategory.gallery.length);
    }
  };

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
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`portfolio-card aspect-[4/5] opacity-0 animate-fade-up cursor-pointer`}
              style={{ 
                animationFillMode: 'forwards',
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => openGallery(category)}
            >
              <img
                src={category.coverImg}
                alt={`${category.name} photography`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="font-display text-xl text-hero-foreground tracking-wider">
                  {category.name}
                </p>
                <p className="font-body text-sm text-hero-foreground/70 mt-1">
                  {category.gallery.length} photos
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Lightbox */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 z-50 bg-hero/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={closeGallery}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-hero-foreground hover:text-primary transition-colors z-20"
            onClick={closeGallery}
            aria-label="Close gallery"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-hero-foreground hover:text-primary transition-colors z-20 p-2"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Current image */}
          <img
            src={selectedCategory.gallery[currentIndex].src}
            alt={selectedCategory.gallery[currentIndex].alt}
            className="max-w-full max-h-[80vh] object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-hero-foreground hover:text-primary transition-colors z-20 p-2"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image counter and category */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="font-display text-2xl text-hero-foreground tracking-wider">
              {selectedCategory.name}
            </p>
            <p className="font-body text-sm text-hero-foreground/70 mt-2">
              {currentIndex + 1} / {selectedCategory.gallery.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
