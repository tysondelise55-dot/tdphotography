import { Camera, Zap, Heart } from "lucide-react";
export const About = () => {
  return <section id="about" className="py-20 md:py-32 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Stats / Visual Side */}
          <div className="order-2 lg:order-1">
            
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-2">
              About Me
            </p>
            <h2 className="section-title text-foreground mb-6">
              Young. Driven.
              <br />
              <span className="text-primary">Focused.</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              I'm a 14-year-old sports photographer with a passion for capturing the intensity, 
              emotion, and raw energy of athletic competition. What started as a hobby at my 
              brother's soccer games has grown into a serious pursuit.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              I've shot football, basketball, soccer, baseball, track, and more. Every game 
              teaches me something new, and I'm always pushing to get that perfect shot.
            </p>

            {/* Values */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground tracking-wider">Quality First</h3>
                  <p className="font-body text-sm text-muted-foreground">Every shot is edited and delivered at the highest standard.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground tracking-wider">Fast Turnaround</h3>
                  <p className="font-body text-sm text-muted-foreground">Photos delivered within 48 hours of your game.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground tracking-wider">True Passion</h3>
                  <p className="font-body text-sm text-muted-foreground">I love what I do, and it shows in every frame.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};