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
          {/* SVG Map of Americas - Detailed outline */}
          <div className="relative w-full max-w-lg group">
            {/* Glow effect behind map */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full transform scale-75 group-hover:scale-90 transition-transform duration-700" />
            
            <svg
              viewBox="0 0 500 700"
              className="w-full h-auto relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                </linearGradient>
                
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Alaska */}
              <path
                d="M40 85 L55 70 L80 65 L95 75 L90 90 L75 100 L55 95 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Canada */}
              <path
                d="M95 50 L130 35 L180 30 L230 25 L280 30 L330 40 L370 55 L380 75 L365 95 L340 90 L310 85 L280 95 L250 90 L220 100 L190 95 L160 105 L130 100 L100 110 L90 95 L95 70 Z
                   M200 35 L210 30 L225 35 L220 45 L205 45 Z
                   M250 30 L265 25 L280 30 L275 40 L260 40 Z
                   M300 35 L320 30 L340 40 L335 55 L315 55 L300 45 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* USA - Highlighted */}
              <path
                d="M90 110 L130 100 L160 105 L190 95 L220 100 L250 90 L280 95 L310 85 L340 90 L365 95 L375 115 L370 140 L350 155 L320 160 L290 155 L260 165 L230 160 L200 170 L170 165 L140 175 L110 170 L95 150 L85 130 Z"
                fill="url(#highlightGradient)"
                className="stroke-primary"
                strokeWidth="2"
                filter="url(#glow)"
              />

              {/* Mexico */}
              <path
                d="M95 170 L140 175 L160 185 L155 210 L140 235 L120 250 L105 245 L95 225 L85 200 L80 180 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Guatemala */}
              <path
                d="M120 250 L135 248 L145 260 L138 270 L125 268 L118 258 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Honduras/El Salvador/Nicaragua */}
              <path
                d="M138 270 L155 265 L165 275 L160 290 L145 295 L135 285 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Costa Rica */}
              <path
                d="M145 295 L160 290 L165 305 L155 315 L145 310 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Panama */}
              <path
                d="M155 315 L175 310 L190 320 L185 330 L165 335 L155 325 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Colombia - Highlighted */}
              <path
                d="M165 335 L185 330 L210 340 L230 355 L235 380 L225 410 L200 420 L175 415 L155 395 L145 365 L150 345 Z"
                fill="url(#highlightGradient)"
                className="stroke-primary"
                strokeWidth="2"
                filter="url(#glow)"
              />

              {/* Venezuela */}
              <path
                d="M210 340 L250 330 L280 340 L290 360 L275 380 L250 385 L235 380 L230 355 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Guyana/Suriname/French Guiana */}
              <path
                d="M280 340 L310 335 L330 350 L325 375 L300 385 L290 360 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Ecuador */}
              <path
                d="M145 365 L155 395 L150 420 L130 425 L120 400 L125 375 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Peru */}
              <path
                d="M125 375 L145 365 L150 420 L155 460 L140 490 L115 495 L100 465 L105 420 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Brazil */}
              <path
                d="M200 420 L225 410 L250 385 L275 380 L300 385 L325 375 L350 390 L370 430 L380 480 L370 540 L340 580 L290 600 L240 590 L200 560 L180 510 L175 460 L175 415 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Bolivia */}
              <path
                d="M175 460 L200 455 L225 470 L220 510 L195 520 L175 505 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Paraguay */}
              <path
                d="M220 510 L250 505 L260 535 L240 550 L220 540 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Chile */}
              <path
                d="M140 490 L155 485 L160 530 L155 590 L145 640 L130 660 L120 640 L125 580 L130 530 L135 495 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Argentina */}
              <path
                d="M155 490 L195 520 L220 540 L240 550 L250 590 L235 640 L200 670 L165 665 L145 640 L155 590 L160 530 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Uruguay */}
              <path
                d="M260 535 L280 540 L285 565 L270 580 L250 575 L250 555 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Cuba */}
              <path
                d="M200 200 L240 195 L260 205 L250 215 L210 220 L195 210 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1.5"
              />

              {/* Caribbean islands simplified */}
              <path
                d="M280 220 L295 215 L300 225 L290 230 Z M310 235 L320 230 L325 240 L315 245 Z"
                fill="none"
                className="stroke-muted-foreground/40"
                strokeWidth="1"
              />

              {/* Location markers with pulse animation */}
              {/* USA marker */}
              <g className="cursor-pointer">
                <circle cx="230" cy="130" r="20" className="fill-primary/15 animate-ping" style={{ animationDuration: "2s" }} />
                <circle cx="230" cy="130" r="12" className="fill-background stroke-primary stroke-2" />
                <circle cx="230" cy="130" r="5" className="fill-primary" />
              </g>
              
              {/* Colombia marker */}
              <g className="cursor-pointer">
                <circle cx="190" cy="375" r="20" className="fill-primary/15 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
                <circle cx="190" cy="375" r="12" className="fill-background stroke-primary stroke-2" />
                <circle cx="190" cy="375" r="5" className="fill-primary" />
              </g>

              {/* Connection line */}
              <path
                d="M230 145 Q 180 260 190 360"
                fill="none"
                className="stroke-primary/40"
                strokeWidth="2"
                strokeDasharray="8 5"
              />

              {/* Country labels */}
              <text x="230" cy="155" className="fill-primary text-[10px] font-semibold" textAnchor="middle">USA</text>
              <text x="190" cy="400" className="fill-primary text-[10px] font-semibold" textAnchor="middle">COLOMBIA</text>
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
