import { MapPin } from "lucide-react";

export const ClientsMap = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
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

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* SVG Map of Americas */}
          <div className="relative w-full max-w-md group">
            {/* Glow effect behind map */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full transform scale-75 group-hover:scale-90 transition-transform duration-700" />
            
            <svg
              viewBox="0 0 400 500"
              className="w-full h-auto relative z-10 drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradient for highlighted countries */}
                <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                </linearGradient>
                
                {/* Gradient for non-highlighted countries */}
                <linearGradient id="neutralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.1" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Shadow filter */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15"/>
                </filter>
              </defs>
              
              {/* Canada */}
              <path
                d="M50 80 L80 50 L150 40 L200 45 L250 50 L280 65 L260 80 L250 80 L220 75 L200 85 L180 70 Z"
                fill="url(#neutralGradient)"
                className="stroke-muted-foreground/30"
                strokeWidth="1"
                filter="url(#shadow)"
              />
              
              {/* USA - highlighted */}
              <path
                d="M50 80 L180 70 L200 85 L220 75 L250 80 L260 100 L250 120 L220 130 L200 125 L180 135 L150 130 L120 140 L80 135 L60 120 L50 100 Z"
                fill="url(#highlightGradient)"
                className="stroke-primary"
                strokeWidth="2"
                filter="url(#glow)"
              />
              
              {/* Mexico */}
              <path
                d="M80 135 L120 140 L130 160 L120 180 L100 190 L90 180 L70 170 L65 150 Z"
                fill="url(#neutralGradient)"
                className="stroke-muted-foreground/30"
                strokeWidth="1"
                filter="url(#shadow)"
              />
              
              {/* Central America */}
              <path
                d="M100 190 L115 200 L120 220 L115 240 L105 250 L95 240 L90 220 L95 200 Z"
                fill="url(#neutralGradient)"
                className="stroke-muted-foreground/30"
                strokeWidth="1"
                filter="url(#shadow)"
              />
              
              {/* Colombia - highlighted */}
              <path
                d="M95 260 L120 255 L140 265 L150 285 L145 310 L125 325 L100 320 L85 300 L80 275 Z"
                fill="url(#highlightGradient)"
                className="stroke-primary"
                strokeWidth="2"
                filter="url(#glow)"
              />
              
              {/* Venezuela */}
              <path
                d="M140 265 L170 260 L185 275 L175 290 L150 285 Z"
                fill="url(#neutralGradient)"
                className="stroke-muted-foreground/30"
                strokeWidth="1"
                filter="url(#shadow)"
              />
              
              {/* Brazil */}
              <path
                d="M150 285 L175 290 L200 300 L220 330 L230 370 L210 410 L170 420 L140 400 L120 360 L125 325 L145 310 Z"
                fill="url(#neutralGradient)"
                className="stroke-muted-foreground/30"
                strokeWidth="1"
                filter="url(#shadow)"
              />
              
              {/* Peru/Ecuador */}
              <path
                d="M80 275 L100 320 L95 360 L70 370 L55 340 L60 300 Z"
                fill="url(#neutralGradient)"
                className="stroke-muted-foreground/30"
                strokeWidth="1"
                filter="url(#shadow)"
              />
              
              {/* Chile/Argentina */}
              <path
                d="M95 360 L120 360 L140 400 L130 450 L100 470 L85 450 L80 400 Z"
                fill="url(#neutralGradient)"
                className="stroke-muted-foreground/30"
                strokeWidth="1"
                filter="url(#shadow)"
              />
              
              {/* Location markers with pulse animation */}
              {/* USA marker */}
              <g className="cursor-pointer">
                <circle cx="160" cy="105" r="16" className="fill-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
                <circle cx="160" cy="105" r="10" className="fill-background stroke-primary stroke-2 drop-shadow-lg" />
                <circle cx="160" cy="105" r="4" className="fill-primary" />
              </g>
              
              {/* Colombia marker */}
              <g className="cursor-pointer">
                <circle cx="115" cy="290" r="16" className="fill-primary/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
                <circle cx="115" cy="290" r="10" className="fill-background stroke-primary stroke-2 drop-shadow-lg" />
                <circle cx="115" cy="290" r="4" className="fill-primary" />
              </g>

              {/* Connection line between markers */}
              <path
                d="M160 115 Q 100 200 115 280"
                fill="none"
                className="stroke-primary/30"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5 p-5 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
              <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">United States</h3>
                <p className="text-sm text-muted-foreground">North American Operations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 p-5 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
              <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Colombia</h3>
                <p className="text-sm text-muted-foreground">Latin American Operations</p>
              </div>
            </div>

            <div className="p-5 bg-muted/50 rounded-xl border border-border/30">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our strategic locations allow us to serve clients across different time zones with <span className="text-primary font-medium">dedicated 24/7 support</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
