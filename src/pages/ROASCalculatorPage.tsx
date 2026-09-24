import { useState, useMemo } from "react";
import { goToForm } from "@/config/links";
import { useLang } from "@/config/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, Target, ShoppingCart, MapPin, BarChart3, Zap, ArrowRight, Calendar } from "lucide-react";

// RevUp boost over market (CRO improvements, optimization, etc.)
const REVUP_BOOST = 0.20; // 20% improvement over market ROAS

// Sector benchmarks (sources: WordStream 2025, Dynamic Yield, Decile Q1 2025)
const SECTORS = [
  { id: "fashion", name: { en: "Fashion & Apparel", es: "Moda y ropa" }, cpcUS: 4.31, cvr: 0.0313, aovUS: 191 },
  { id: "home", name: { en: "Home Goods", es: "Artículos para el hogar" }, cpcUS: 3.86, cvr: 0.0146, aovUS: 266 },
  { id: "health", name: { en: "Health & Beauty", es: "Salud y belleza" }, cpcUS: 5.70, cvr: 0.0489, aovUS: 151 },
  { id: "food", name: { en: "Food & Beverage", es: "Alimentos y bebidas" }, cpcUS: 2.05, cvr: 0.0602, aovUS: 69 },
  { id: "supplements", name: { en: "Supplements", es: "Suplementos" }, cpcUS: 5.70, cvr: 0.0350, aovUS: 70 },
  { id: "electronics", name: { en: "Electronics", es: "Electrónica" }, cpcUS: 3.50, cvr: 0.0220, aovUS: 320 },
  { id: "pets", name: { en: "Pet Supplies", es: "Productos para mascotas" }, cpcUS: 3.20, cvr: 0.0380, aovUS: 85 },
];

// Country adjustments (WordStream CPC, GDP per capita PPP for AOV)
const LOCATIONS = [
  { id: "us", name: { en: "United States", es: "Estados Unidos" }, multCPC: 1.00, multAOV: 1.00 },
  { id: "mx", name: { en: "Mexico", es: "México" }, multCPC: 0.50, multAOV: 0.299 },
  { id: "co", name: { en: "Colombia", es: "Colombia" }, multCPC: 0.17, multAOV: 0.250 },
  { id: "ar", name: { en: "Argentina", es: "Argentina" }, multCPC: 0.25, multAOV: 0.280 },
  { id: "cl", name: { en: "Chile", es: "Chile" }, multCPC: 0.40, multAOV: 0.320 },
  { id: "pe", name: { en: "Peru", es: "Perú" }, multCPC: 0.20, multAOV: 0.180 },
  { id: "es", name: { en: "Spain", es: "España" }, multCPC: 0.75, multAOV: 0.520 },
];

const COPY = {
  en: {
    locale: "en-US",
    titleBefore: "",
    titleAfter: " Calculator",
    subtitle: "Project your advertising return with updated benchmarks by industry and region.",
    configTitle: "Configure Your Scenario",
    configDesc: "You only need 3 inputs to project your results",
    budgetLabel: "Monthly Budget (USD)",
    budgetPlaceholder: "e.g. 5000",
    sectorLabel: "Sector / Industry",
    sectorPlaceholder: "Select your sector",
    locationLabel: "Location / Country",
    locationPlaceholder: "Select the country",
    customRoasLabel: "Custom ROAS (optional)",
    customRoasPlaceholder: "e.g. 3.5 (leave empty for benchmark)",
    customRoasHint: "Override calculated ROAS with your target value",
    appliedBenchmarks: "Applied benchmarks:",
    cvrShort: "CVR:",
    aovShort: "Avg. Order Value:",
    resultsTitle: "Results Projection",
    resultsDesc: "Estimation based on 2025 industry benchmarks",
    marketRoas: "Market ROAS",
    revupRoas: "ROAS with RevUp",
    optimized: "Optimized",
    revenueRevUp: "Revenue with RevUp",
    market: "market",
    ordersRevUp: "Orders with RevUp",
    clicks: "Estimated Clicks",
    netProfit: "Net Profit with RevUp",
    breakdown: "Calculation breakdown:",
    cpcAdjusted: "Region-adjusted CPC",
    aovAdjusted: "Adjusted Avg. Order Value",
    cvrLabel: "Conversion Rate (CVR)",
    boost: "RevUp Boost",
    emptyTitle: "Complete all 3 fields to see your projection",
    emptyHint: "Budget + Sector + Location",
    status: { excellent: "Excellent", veryGood: "Very Good", good: "Good", breakEven: "Break-even", loss: "Loss" },
    methodTitle: "Methodology & Sources",
    methodA: "This calculator uses ",
    methodB: "updated 2025 benchmarks",
    methodC: " from recognized industry sources to project realistic results.",
    srcCpc: "CPC by Industry",
    srcCvr: "Conversion Rates",
    srcAov: "Avg. Order Value (AOV)",
    countryNote: "* Country adjustments are based on CPC differences (WordStream) and purchasing power (GDP per capita PPP 2024).",
    legalLabel: "Legal Disclaimer:",
    legalA: " The results shown in this calculator are",
    legalB: " estimates based on industry benchmarks",
    legalC: " and do not constitute guarantees or performance commitments. Actual results may vary significantly depending on factors such as product quality, marketing strategy, competition, seasonality, and market conditions. RevUp is not responsible for decisions made based on these projections.",
    ctaTitle: "Ready to Maximize Your ROAS?",
    ctaText: "Let our experts help you achieve these projections and beyond. Book a free consultation to discuss your growth strategy.",
    ctaButton: "Book a Free Consultation",
  },
  es: {
    locale: "es-US",
    titleBefore: "Calculadora de ",
    titleAfter: "",
    subtitle: "Proyecta el retorno de tu inversión publicitaria con benchmarks actualizados por industria y región.",
    configTitle: "Configura tu escenario",
    configDesc: "Solo necesitas 3 datos para proyectar tus resultados",
    budgetLabel: "Presupuesto publicitario mensual (USD)",
    budgetPlaceholder: "ej. 5000",
    sectorLabel: "Sector / Industria",
    sectorPlaceholder: "Selecciona tu sector",
    locationLabel: "Ubicación / País",
    locationPlaceholder: "Selecciona el país",
    customRoasLabel: "ROAS personalizado (opcional)",
    customRoasPlaceholder: "ej. 3.5 (déjalo vacío para usar el benchmark)",
    customRoasHint: "Reemplaza el ROAS calculado con tu valor objetivo",
    appliedBenchmarks: "Benchmarks aplicados:",
    cvrShort: "Conversión:",
    aovShort: "Ticket promedio:",
    resultsTitle: "Proyección de resultados",
    resultsDesc: "Estimación basada en benchmarks de la industria de 2025",
    marketRoas: "ROAS del mercado",
    revupRoas: "ROAS con RevUp",
    optimized: "Optimizado",
    revenueRevUp: "Ingresos con RevUp",
    market: "del mercado",
    ordersRevUp: "Pedidos con RevUp",
    clicks: "Clics estimados",
    netProfit: "Ganancia neta con RevUp",
    breakdown: "Desglose del cálculo:",
    cpcAdjusted: "Costo por clic (CPC) ajustado por región",
    aovAdjusted: "Ticket promedio ajustado",
    cvrLabel: "Tasa de conversión (CVR)",
    boost: "Impulso de RevUp",
    emptyTitle: "Completa los 3 campos para ver tu proyección",
    emptyHint: "Presupuesto + Sector + Ubicación",
    status: { excellent: "Excelente", veryGood: "Muy bueno", good: "Bueno", breakEven: "Punto de equilibrio", loss: "Pérdida" },
    methodTitle: "Metodología y fuentes",
    methodA: "Esta calculadora usa ",
    methodB: "benchmarks actualizados de 2025",
    methodC: " de fuentes reconocidas de la industria para proyectar resultados realistas.",
    srcCpc: "Costo por clic (CPC) por industria",
    srcCvr: "Tasas de conversión",
    srcAov: "Ticket promedio (AOV)",
    countryNote: "* Los ajustes por país se basan en las diferencias de CPC (WordStream) y en el poder adquisitivo (PIB per cápita PPA 2024).",
    legalLabel: "Aviso legal:",
    legalA: " Los resultados que muestra esta calculadora son",
    legalB: " estimaciones basadas en benchmarks de la industria",
    legalC: " y no constituyen garantías ni compromisos de rendimiento. Los resultados reales pueden variar significativamente según factores como la calidad del producto, la estrategia de marketing, la competencia, la estacionalidad y las condiciones del mercado. RevUp no se hace responsable de las decisiones tomadas con base en estas proyecciones.",
    ctaTitle: "¿Listo para maximizar tu ROAS?",
    ctaText: "Deja que nuestros expertos te ayuden a alcanzar estas proyecciones y superarlas. Agenda una consulta gratuita para hablar de tu estrategia de crecimiento.",
    ctaButton: "Agenda una consulta gratuita",
  },
};

const ROASCalculatorPage = () => {
  const lang = useLang();
  const t = COPY[lang];
  const [budget, setBudget] = useState<string>("");
  const [sectorId, setSectorId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [customRoas, setCustomRoas] = useState<string>("");

  const results = useMemo(() => {
    const budgetNum = parseFloat(budget);
    const sector = SECTORS.find(s => s.id === sectorId);
    const location = LOCATIONS.find(l => l.id === locationId);

    if (!budgetNum || budgetNum <= 0 || !sector || !location) {
      return null;
    }

    // Calculations based on formulas
    const cpcAdjusted = sector.cpcUS * location.multCPC;
    const aovAdjusted = sector.aovUS * location.multAOV;
    const cvrBase = sector.cvr * 1.10; // Slightly optimistic baseline (+10%)
    const clicks = budgetNum / cpcAdjusted;

    // Market ROAS calculations (without RevUp optimization)
    const ordersMarket = clicks * cvrBase;
    const revenueMarket = ordersMarket * aovAdjusted;
    let roasMarket = revenueMarket / budgetNum;

    // Allow custom ROAS override for market
    if (customRoas && parseFloat(customRoas) > 0) {
      roasMarket = parseFloat(customRoas);
    }

    // RevUp ROAS calculations (includes additional boost)
    const ordersRevUp = clicks * cvrBase * (1 + REVUP_BOOST);
    const revenueRevUp = ordersRevUp * aovAdjusted;
    let roasRevUp = revenueRevUp / budgetNum;

    // If custom ROAS was set, apply RevUp boost to that instead
    if (customRoas && parseFloat(customRoas) > 0) {
      roasRevUp = parseFloat(customRoas) * (1 + REVUP_BOOST);
    }

    return {
      cpcAdjusted,
      aovAdjusted,
      clicks: Math.round(clicks),
      ordersMarket: Math.round(ordersMarket * 10) / 10,
      ordersRevUp: Math.round(ordersRevUp * 10) / 10,
      revenueMarket: customRoas ? budgetNum * roasMarket : revenueMarket,
      revenueRevUp: customRoas ? budgetNum * roasRevUp : revenueRevUp,
      roasMarket,
      roasRevUp,
      cvr: cvrBase * 100,
      roasImprovement: ((roasRevUp / roasMarket - 1) * 100).toFixed(0),
    };
  }, [budget, sectorId, locationId, customRoas]);

  const getRoasStatus = (roasValue: number) => {
    if (roasValue >= 4) return { label: t.status.excellent, color: "text-green-500", bg: "bg-green-500/10" };
    if (roasValue >= 3) return { label: t.status.veryGood, color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (roasValue >= 2) return { label: t.status.good, color: "text-yellow-500", bg: "bg-yellow-500/10" };
    if (roasValue >= 1) return { label: t.status.breakEven, color: "text-orange-500", bg: "bg-orange-500/10" };
    return { label: t.status.loss, color: "text-red-500", bg: "bg-red-500/10" };
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.titleBefore}<span className="text-primary">ROAS</span>{t.titleAfter}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Inputs Card */}
            <Card className="lg:col-span-2 futuristic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  {t.configTitle}
                </CardTitle>
                <CardDescription>
                  {t.configDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">{t.budgetLabel}</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder={t.budgetPlaceholder}
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="bg-background/20 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector" className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    {t.sectorLabel}
                  </Label>
                  <Select value={sectorId} onValueChange={setSectorId}>
                    <SelectTrigger className="bg-background/20 backdrop-blur-sm">
                      <SelectValue placeholder={t.sectorPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((sector) => (
                        <SelectItem key={sector.id} value={sector.id}>
                          {sector.name[lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t.locationLabel}
                  </Label>
                  <Select value={locationId} onValueChange={setLocationId}>
                    <SelectTrigger className="bg-background/20 backdrop-blur-sm">
                      <SelectValue placeholder={t.locationPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name[lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customRoas" className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    {t.customRoasLabel}
                  </Label>
                  <Input
                    id="customRoas"
                    type="number"
                    step="0.1"
                    placeholder={t.customRoasPlaceholder}
                    value={customRoas}
                    onChange={(e) => setCustomRoas(e.target.value)}
                    className="bg-background/20 backdrop-blur-sm"
                    min={0.1}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t.customRoasHint}
                  </p>
                </div>

                {sectorId && locationId && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-3">{t.appliedBenchmarks}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-muted/30 rounded">
                        <span className="text-muted-foreground">CPC:</span>
                        <span className="ml-1 font-medium">
                          ${(SECTORS.find(s => s.id === sectorId)!.cpcUS * LOCATIONS.find(l => l.id === locationId)!.multCPC).toFixed(2)}
                        </span>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <span className="text-muted-foreground">{t.cvrShort}</span>
                        <span className="ml-1 font-medium">
                          {(SECTORS.find(s => s.id === sectorId)!.cvr * 100 * 1.10).toFixed(2)}%
                        </span>
                      </div>
                      <div className="p-2 bg-muted/30 rounded col-span-2">
                        <span className="text-muted-foreground">{t.aovShort}</span>
                        <span className="ml-1 font-medium">
                          ${(SECTORS.find(s => s.id === sectorId)!.aovUS * LOCATIONS.find(l => l.id === locationId)!.multAOV).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card className="lg:col-span-3 futuristic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  {t.resultsTitle}
                </CardTitle>
                <CardDescription>
                  {t.resultsDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    {/* ROAS Comparativo */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* ROAS Mercado */}
                      <div className={`p-5 rounded-xl ${getRoasStatus(results.roasMarket).bg} text-center border border-border/30`}>
                        <p className="text-xs text-muted-foreground mb-1">{t.marketRoas}</p>
                        <p className={`text-3xl font-bold ${getRoasStatus(results.roasMarket).color}`}>
                          {results.roasMarket.toFixed(2)}x
                        </p>
                        <p className={`mt-1 text-sm font-medium ${getRoasStatus(results.roasMarket).color}`}>
                          {getRoasStatus(results.roasMarket).label}
                        </p>
                      </div>

                      {/* ROAS RevUp */}
                      <div className="p-5 rounded-xl bg-primary/10 text-center border-2 border-primary/30 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          +{results.roasImprovement}%
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{t.revupRoas}</p>
                        <p className="text-4xl font-bold text-primary">
                          {results.roasRevUp.toFixed(2)}x
                        </p>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {t.optimized}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm">{t.revenueRevUp}</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">
                          ${results.revenueRevUp.toLocaleString(t.locale, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          vs ${results.revenueMarket.toLocaleString(t.locale, { maximumFractionDigits: 0 })} {t.market}
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-sm">{t.ordersRevUp}</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {results.ordersRevUp.toLocaleString(t.locale, { maximumFractionDigits: 1 })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          vs {results.ordersMarket.toLocaleString(t.locale, { maximumFractionDigits: 1 })} {t.market}
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Target className="w-4 h-4" />
                          <span className="text-sm">{t.clicks}</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {results.clicks.toLocaleString(t.locale)}
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">{t.netProfit}</span>
                        </div>
                        <p className="text-2xl font-bold text-green-500">
                          ${(results.revenueRevUp - parseFloat(budget)).toLocaleString(t.locale, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="border-t border-border/50 pt-4">
                      <p className="text-sm text-muted-foreground mb-3">{t.breakdown}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.cpcAdjusted}</span>
                          <span className="font-mono">${results.cpcAdjusted.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.aovAdjusted}</span>
                          <span className="font-mono">${results.aovAdjusted.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.cvrLabel}</span>
                          <span className="font-mono">{results.cvr.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.boost}</span>
                          <span className="font-mono text-primary">+{(REVUP_BOOST * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">{t.emptyTitle}</p>
                    <p className="text-sm mt-2">{t.emptyHint}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <Card className="mt-8 futuristic-card">
            <CardHeader>
              <CardTitle>{t.methodTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>
                {t.methodA}<strong className="text-foreground">{t.methodB}</strong>{t.methodC}
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t.srcCpc}</p>
                  <p className="text-xs">WordStream Google Ads Benchmarks 2025</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t.srcCvr}</p>
                  <p className="text-xs">Dynamic Yield eCommerce Benchmarks</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t.srcAov}</p>
                  <p className="text-xs">Decile Q1 2025 + Dynamic Yield</p>
                </div>
              </div>
              <p className="text-xs pt-2">
                {t.countryNote}
              </p>
            </CardContent>
          </Card>

          {/* Legal Disclaimer */}
          <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              <strong className="text-foreground">{t.legalLabel}</strong>{t.legalA}
              <strong className="text-foreground">{t.legalB}</strong>{t.legalC}
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-8 text-center p-8 bg-primary/5 rounded-xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-3">{t.ctaTitle}</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {t.ctaText}
            </p>
            <Button
              variant="glow"
              size="lg"
              onClick={goToForm}
              className="text-base md:text-lg px-8 py-6"
            >
              <Calendar className="mr-2 w-5 h-5" />
              {t.ctaButton}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ROASCalculatorPage;
