import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export const Contact = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!"
    });
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    setIsSubmitting(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Info */}
          <div>
            <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-2">
              Get In Touch
            </p>
            <h2 className="section-title text-foreground mb-6">
              Let's Capture
              <br />
              <span className="text-primary">Your Game</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              Have an upcoming game or event? Want to book a session? Send me a message 
              and let's make it happen. My parent will help coordinate all bookings.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                  <p className="font-display text-lg text-foreground tracking-wider">Email</p>
                  <a href="mailto:contact@tdphotography.com" className="font-body text-muted-foreground hover:text-primary transition-colors">
                    contact@tdphotography.com
                  </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-background" />
                </div>
                <div>
                  <p className="font-display text-lg text-foreground tracking-wider">Location</p>
                  <p className="font-body text-muted-foreground">Available for local games in middle region of indiana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-muted p-6 md:p-10 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-body text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Smith" className="bg-background border-border focus:border-primary" />
              </div>
              <div>
                <label htmlFor="email" className="block font-body text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" className="bg-background border-border focus:border-primary" />
              </div>
              <div>
                <label htmlFor="message" className="block font-body text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Tell me about your game or event..." rows={5} className="bg-background border-border focus:border-primary resize-none" />
              </div>
              <Button type="submit" variant="dark" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>}
              </Button>
              <p className="font-body text-xs text-muted-foreground text-center">
                Parent-supervised communication. All inquiries go through my parent first.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>;
};