import { MapPin, Globe } from "lucide-react";

export const ClientsMap = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Where We Operate
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Our Global Presence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We proudly serve clients across the Americas, with a strong presence in the United States and Colombia.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-3xl mx-auto">
          <div className="flex-1 w-full flex items-center gap-5 p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-xl">United States</h3>
              <p className="text-sm text-muted-foreground">North American Operations</p>
            </div>
          </div>
          
          <div className="flex-1 w-full flex items-center gap-5 p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-xl">Colombia</h3>
              <p className="text-sm text-muted-foreground">Latin American Operations</p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10 max-w-md mx-auto">
          Our strategic locations allow us to serve clients across different time zones with <span className="text-primary font-medium">dedicated 24/7 support</span>.
        </p>
      </div>
    </section>
  );
};
