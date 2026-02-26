import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Hero = () => {
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  const text1 = "Smart Growth,";
  const text2 = "better results.";

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer1 = setInterval(() => {
      if (index < text1.length) {
        setDisplayedText1(text1.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer1);
        let index2 = 0;
        const timer2 = setInterval(() => {
          if (index2 < text2.length) {
            setDisplayedText2(text2.slice(0, index2 + 1));
            index2++;
          } else {
            clearInterval(timer2);
            setTimeout(() => setShowSubtitle(true), 300);
            setTimeout(() => setShowButton(true), 600);
          }
        }, 80);
      }
    }, 80);

    return () => clearInterval(timer1);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !service || !budget) {
      toast.error("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setSubmitting(true);
    // Simulate submission
    await new Promise(r => setTimeout(r, 1000));
    toast.success("Quote request sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setService("");
    setBudget("");
    setSubmitting(false);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/5 via-background to-background cyber-grid" role="banner">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow floating-orb" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl animate-pulse-glow floating-orb" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-accent/5 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-accent/3 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <div className="relative mb-8 md:mb-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
                <span className="text-foreground font-semibold block mb-4 min-h-[1.2em]">
                  {displayedText1}
                  {displayedText1.length < text1.length && (
                    <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-pulse" />
                  )}
                </span>
                <span className="text-accent font-semibold block min-h-[1.2em]">
                  {displayedText2}
                  {displayedText1.length === text1.length && displayedText2.length < text2.length && (
                    <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-pulse" />
                  )}
                </span>
              </h1>
            </div>

            <div className={`relative mb-10 transition-all duration-700 ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Boost revenue, reduce workload, and scale faster & smarter with data and AI — let us show you how.
              </p>
            </div>

          </div>

          {/* Right side - Mini quote form */}
          <div className={`transition-all duration-700 delay-500 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <form 
              onSubmit={handleSubmit}
              className="bg-card/80 backdrop-blur-xl border border-border/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/10 space-y-5"
            >
              <div className="text-center mb-2">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                  Get a <span className="text-accent">Free Quote</span>
                </h2>
                <p className="text-sm text-foreground/50 mt-1">Tell us about your project</p>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50"
                />
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50">
                    <SelectValue placeholder="Service needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid-ads">Paid Advertising</SelectItem>
                    <SelectItem value="social-media">Social Media Management</SelectItem>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Solutions</SelectItem>
                    <SelectItem value="branding">Branding & Design</SelectItem>
                    <SelectItem value="full-service">Full Service Package</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-accent/50">
                    <SelectValue placeholder="Monthly budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500-1000">$500 – $1,000</SelectItem>
                    <SelectItem value="1000-3000">$1,000 – $3,000</SelectItem>
                    <SelectItem value="3000-5000">$3,000 – $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 – $10,000</SelectItem>
                    <SelectItem value="10000+">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl h-12 text-base hover:scale-[1.02] transition-all duration-300"
              >
                {submitting ? "Sending..." : "Request Free Quote"}
                {!submitting && <Send className="ml-2 w-4 h-4" />}
              </Button>

              <p className="text-[11px] text-foreground/30 text-center">
                No commitment required. We'll respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
};
