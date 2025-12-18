import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, DollarSign, Target, ShoppingCart, MapPin, BarChart3, Percent } from "lucide-react";

// Benchmarks por sector (fuentes: WordStream 2025, Dynamic Yield, Decile Q1 2025)
const SECTORS = [
  { id: "fashion", name: "Fashion & Apparel", cpcUS: 4.31, cvr: 0.0313, aovUS: 191 },
  { id: "home", name: "Home Goods", cpcUS: 3.86, cvr: 0.0146, aovUS: 266 },
  { id: "health", name: "Health & Beauty", cpcUS: 5.70, cvr: 0.0489, aovUS: 151 },
  { id: "food", name: "Food & Beverage", cpcUS: 2.05, cvr: 0.0602, aovUS: 69 },
  { id: "supplements", name: "Supplements", cpcUS: 5.70, cvr: 0.0350, aovUS: 70 },
  { id: "electronics", name: "Electronics", cpcUS: 3.50, cvr: 0.0220, aovUS: 320 },
  { id: "pets", name: "Pet Supplies", cpcUS: 3.20, cvr: 0.0380, aovUS: 85 },
];

// Ajustes por país (WordStream CPC, PIB per cápita PPP para AOV)
const LOCATIONS = [
  { id: "us", name: "Estados Unidos", multCPC: 1.00, multAOV: 1.00 },
  { id: "mx", name: "México", multCPC: 0.50, multAOV: 0.299 },
  { id: "co", name: "Colombia", multCPC: 0.17, multAOV: 0.250 },
  { id: "ar", name: "Argentina", multCPC: 0.25, multAOV: 0.280 },
  { id: "cl", name: "Chile", multCPC: 0.40, multAOV: 0.320 },
  { id: "pe", name: "Perú", multCPC: 0.20, multAOV: 0.180 },
  { id: "es", name: "España", multCPC: 0.75, multAOV: 0.520 },
];

const ROASCalculatorPage = () => {
  const [budget, setBudget] = useState<string>("");
  const [sectorId, setSectorId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [cvrBoost, setCvrBoost] = useState<number>(0);

  const results = useMemo(() => {
    const budgetNum = parseFloat(budget);
    const sector = SECTORS.find(s => s.id === sectorId);
    const location = LOCATIONS.find(l => l.id === locationId);

    if (!budgetNum || budgetNum <= 0 || !sector || !location) {
      return null;
    }

    // Cálculos según las fórmulas
    const cpcAdjusted = sector.cpcUS * location.multCPC;
    const aovAdjusted = sector.aovUS * location.multAOV;
    const cvrAdjusted = sector.cvr * (1 + cvrBoost / 100);
    const clicks = budgetNum / cpcAdjusted;
    const orders = clicks * cvrAdjusted;
    const revenue = orders * aovAdjusted;
    const roas = revenue / budgetNum;

    return {
      cpcAdjusted,
      aovAdjusted,
      clicks: Math.round(clicks),
      orders: Math.round(orders * 10) / 10,
      revenue,
      roas,
      cvr: sector.cvr * 100,
      cvrAdjusted: cvrAdjusted * 100,
    };
  }, [budget, sectorId, locationId, cvrBoost]);

  const getRoasStatus = (roasValue: number) => {
    if (roasValue >= 4) return { label: "Excelente", color: "text-green-500", bg: "bg-green-500/10" };
    if (roasValue >= 3) return { label: "Muy Bueno", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (roasValue >= 2) return { label: "Bueno", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    if (roasValue >= 1) return { label: "Break-even", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { label: "Pérdida", color: "text-red-500", bg: "bg-red-500/10" };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Calculadora de <span className="text-primary">ROAS</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Proyecta tu retorno publicitario con benchmarks actualizados por industria y región.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Inputs Card */}
            <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Configura tu escenario
                </CardTitle>
                <CardDescription>
                  Solo necesitas 3 datos para proyectar tus resultados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Presupuesto mensual (USD)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Ej: 5000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sector" className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Sector / Industria
                  </Label>
                  <Select value={sectorId} onValueChange={setSectorId}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Selecciona tu sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((sector) => (
                        <SelectItem key={sector.id} value={sector.id}>
                          {sector.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Ubicación / País
                  </Label>
                  <Select value={locationId} onValueChange={setLocationId}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Selecciona el país" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Aumento de CVR
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[cvrBoost]}
                      onValueChange={(value) => setCvrBoost(value[0])}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-14 text-right">+{cvrBoost}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Simula mejoras de CVR por optimización de landing pages, CRO, etc.
                  </p>
                </div>

                {sectorId && locationId && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-3">Benchmarks aplicados:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-muted/30 rounded">
                        <span className="text-muted-foreground">CPC:</span>
                        <span className="ml-1 font-medium">
                          ${(SECTORS.find(s => s.id === sectorId)!.cpcUS * LOCATIONS.find(l => l.id === locationId)!.multCPC).toFixed(2)}
                        </span>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <span className="text-muted-foreground">CVR:</span>
                        <span className="ml-1 font-medium">
                          {((SECTORS.find(s => s.id === sectorId)!.cvr * (1 + cvrBoost / 100)) * 100).toFixed(2)}%
                          {cvrBoost > 0 && <span className="text-green-500 ml-1">(+{cvrBoost}%)</span>}
                        </span>
                      </div>
                      <div className="p-2 bg-muted/30 rounded col-span-2">
                        <span className="text-muted-foreground">Ticket promedio:</span>
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
            <Card className="lg:col-span-3 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Proyección de resultados
                </CardTitle>
                <CardDescription>
                  Estimación basada en benchmarks de industria 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    {/* ROAS Principal */}
                    <div className={`p-6 rounded-xl ${getRoasStatus(results.roas).bg} text-center`}>
                      <p className="text-sm text-muted-foreground mb-2">ROAS Proyectado</p>
                      <p className={`text-5xl font-bold ${getRoasStatus(results.roas).color}`}>
                        {results.roas.toFixed(2)}x
                      </p>
                      <p className={`mt-2 font-medium ${getRoasStatus(results.roas).color}`}>
                        {getRoasStatus(results.roas).label}
                      </p>
                    </div>

                    {/* Métricas Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm">Revenue estimado</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">
                          ${results.revenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-sm">Órdenes estimadas</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {results.orders.toLocaleString('en-US', { maximumFractionDigits: 1 })}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Target className="w-4 h-4" />
                          <span className="text-sm">Clics estimados</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {results.clicks.toLocaleString('en-US')}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">Ganancia neta</span>
                        </div>
                        <p className="text-2xl font-bold text-green-500">
                          ${(results.revenue - parseFloat(budget)).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>

                    {/* Desglose detallado */}
                    <div className="border-t border-border/50 pt-4">
                      <p className="text-sm text-muted-foreground mb-3">Desglose del cálculo:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CPC ajustado por región</span>
                          <span className="font-mono">${results.cpcAdjusted.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ticket promedio ajustado</span>
                          <span className="font-mono">${results.aovAdjusted.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tasa de conversión (CVR)</span>
                          <span className="font-mono">
                            {results.cvrAdjusted.toFixed(2)}%
                            {cvrBoost > 0 && <span className="text-green-500 ml-1">(+{cvrBoost}%)</span>}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Completa los 3 campos para ver tu proyección</p>
                    <p className="text-sm mt-2">Presupuesto + Sector + Ubicación</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <Card className="mt-8 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Metodología y fuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>
                Esta calculadora utiliza <strong className="text-foreground">benchmarks actualizados 2025</strong> de 
                fuentes reconocidas en la industria para proyectar resultados realistas.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">CPC por industria</p>
                  <p className="text-xs">WordStream Google Ads Benchmarks 2025</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Tasas de conversión</p>
                  <p className="text-xs">Dynamic Yield eCommerce Benchmarks</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Ticket promedio (AOV)</p>
                  <p className="text-xs">Decile Q1 2025 + Dynamic Yield</p>
                </div>
              </div>
              <p className="text-xs pt-2">
                * Los ajustes por país se basan en diferencias de CPC (WordStream) y poder adquisitivo (PIB per cápita PPP 2024).
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ROASCalculatorPage;
