import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Send, Calendar, Clock, User, MapPinned } from "lucide-react";
import { useToast } from "@/hooks/use-toast";



export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    athleteName: "",
    eventDate: "",
    eventTime: "",
    location: "",
    serviceType: "",
    sport: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://n8n.delisedigital.com/webhook-test/e7c174ad-e398-427d-9339-82561c24b922', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send booking request');



      toast({
        title: "Booking Request Sent!",
        description: "Check your email for a confirmation. I'll get back to you soon!"
      });
      setFormData({
        name: "",
        email: "",
        athleteName: "",
        eventDate: "",
        eventTime: "",
        location: "",
        serviceType: "",
        sport: "",
        message: ""
      });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
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
                <div>
                  <p className="font-display text-lg text-foreground tracking-wider">Contact</p>
                  <a href="mailto:tysondelise55@gmail.com" className="font-body text-muted-foreground hover:text-primary transition-colors">
                    tysondelise55@gmail.com
                    <br />
                    317-833-5049
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-background" />
                </div>
                <div>
                  <p className="font-display text-lg text-foreground tracking-wider">Location</p>
                  <p className="font-body text-muted-foreground">Available for local games in middle region of Indiana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-muted p-6 md:p-10 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
              </div>

              {/* Athlete Info */}
              <div>
                <label htmlFor="athleteName" className="block font-body text-sm font-medium text-foreground mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Athlete Name
                </label>
                <Input
                  id="athleteName"
                  name="athleteName"
                  type="text"
                  required
                  value={formData.athleteName}
                  onChange={handleChange}
                  placeholder="Name of the athlete"
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eventDate" className="block font-body text-sm font-medium text-foreground mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Event Date
                  </label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="eventTime" className="block font-body text-sm font-medium text-foreground mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Event Time
                  </label>
                  <Input
                    id="eventTime"
                    name="eventTime"
                    type="time"
                    required
                    value={formData.eventTime}
                    onChange={handleChange}
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block font-body text-sm font-medium text-foreground mb-2">
                  <MapPinned className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Field/Gym name and address"
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              {/* Service and Sport */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="serviceType" className="block font-body text-sm font-medium text-foreground mb-2">
                    Service Type
                  </label>
                  <Select value={formData.serviceType} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}>
                    <SelectTrigger className="bg-background border-border focus:border-primary">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="single-game">Single Game ($50)</SelectItem>
                      <SelectItem value="season-pass">Season Pass ($350)</SelectItem>
                      <SelectItem value="team-package">Team Package ($200)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="sport" className="block font-body text-sm font-medium text-foreground mb-2">
                    Sport
                  </label>
                  <Select value={formData.sport} onValueChange={(value) => setFormData(prev => ({ ...prev, sport: value }))}>
                    <SelectTrigger className="bg-background border-border focus:border-primary">
                      <SelectValue placeholder="Select a sport" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="soccer">Soccer</SelectItem>
                      <SelectItem value="baseball">Baseball</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-body text-sm font-medium text-foreground mb-2">
                  Additional Details
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your game or event..."
                  rows={4}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>

              <Button type="submit" variant="dark" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : (
                  <>
                    Book Session
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              <p className="font-body text-xs text-muted-foreground text-center">
                Parent-supervised communication. All inquiries go through my parent first.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
