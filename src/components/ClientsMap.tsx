import { MapPin } from "lucide-react";

export const ClientsMap = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Global Presence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We proudly serve clients across the Americas, with a strong presence in the United States and Colombia.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* SVG Map of Americas */}
          <div className="relative w-full max-w-lg">
            <svg
              viewBox="0 0 400 500"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background */}
              <rect width="400" height="500" fill="transparent" />
              
              {/* USA - simplified shape */}
              <path
                d="M50 80 L180 70 L200 85 L220 75 L250 80 L260 100 L250 120 L220 130 L200 125 L180 135 L150 130 L120 140 L80 135 L60 120 L50 100 Z"
                className="fill-primary/80 stroke-primary stroke-2"
              />
              
              {/* Mexico */}
              <path
                d="M80 135 L120 140 L130 160 L120 180 L100 190 L90 180 L70 170 L65 150 Z"
                className="fill-muted-foreground/30 stroke-muted-foreground/50 stroke-1"
              />
              
              {/* Central America */}
              <path
                d="M100 190 L115 200 L120 220 L115 240 L105 250 L95 240 L90 220 L95 200 Z"
                className="fill-muted-foreground/30 stroke-muted-foreground/50 stroke-1"
              />
              
              {/* Colombia - highlighted */}
              <path
                d="M95 260 L120 255 L140 265 L150 285 L145 310 L125 325 L100 320 L85 300 L80 275 Z"
                className="fill-primary/80 stroke-primary stroke-2"
              />
              
              {/* Venezuela */}
              <path
                d="M140 265 L170 260 L185 275 L175 290 L150 285 Z"
                className="fill-muted-foreground/30 stroke-muted-foreground/50 stroke-1"
              />
              
              {/* Brazil */}
              <path
                d="M150 285 L175 290 L200 300 L220 330 L230 370 L210 410 L170 420 L140 400 L120 360 L125 325 L145 310 Z"
                className="fill-muted-foreground/30 stroke-muted-foreground/50 stroke-1"
              />
              
              {/* Peru/Ecuador */}
              <path
                d="M80 275 L100 320 L95 360 L70 370 L55 340 L60 300 Z"
                className="fill-muted-foreground/30 stroke-muted-foreground/50 stroke-1"
              />
              
              {/* Chile/Argentina */}
              <path
                d="M95 360 L120 360 L140 400 L130 450 L100 470 L85 450 L80 400 Z"
                className="fill-muted-foreground/30 stroke-muted-foreground/50 stroke-1"
              />
              
              {/* Canada */}
              <path
                d="M50 80 L80 50 L150 40 L200 45 L250 50 L280 65 L260 80 L250 80 L220 75 L200 85 L180 70 Z"
                className="fill-muted-foreground/30 stroke-muted-foreground/50 stroke-1"
              />
              
              {/* Location markers */}
              {/* USA marker */}
              <g className="animate-pulse">
                <circle cx="160" cy="105" r="8" className="fill-background stroke-primary stroke-2" />
                <circle cx="160" cy="105" r="4" className="fill-primary" />
              </g>
              
              {/* Colombia marker */}
              <g className="animate-pulse" style={{ animationDelay: "0.5s" }}>
                <circle cx="115" cy="290" r="8" className="fill-background stroke-primary stroke-2" />
                <circle cx="115" cy="290" r="4" className="fill-primary" />
              </g>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">United States</h3>
                <p className="text-sm text-muted-foreground">North American Operations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Colombia</h3>
                <p className="text-sm text-muted-foreground">Latin American Operations</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-xs">
              Our strategic locations allow us to serve clients across different time zones with dedicated support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
