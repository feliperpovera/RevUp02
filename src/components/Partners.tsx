import { Award } from "lucide-react";

export const Partners = () => {
  const partners = [
    { name: "Meta" },
    { name: "Google" },
    { name: "TikTok" },
    { name: "Shopify" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className="text-accent" size={32} />
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Somos <span className="text-accent">Partners Oficiales</span>
            </h2>
          </div>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Certificados y respaldados por las plataformas líderes en publicidad digital y e-commerce
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-5xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300 w-full flex items-center justify-center"
            >
              <span className="text-2xl font-heading font-bold text-foreground/80 hover:text-accent transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
