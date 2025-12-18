import { useState, useMemo } from "react";
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
  { id: "fashion", name: "Fashion & Apparel", cpcUS: 4.31, cvr: 0.0313, aovUS: 191 },
  { id: "home", name: "Home Goods", cpcUS: 3.86, cvr: 0.0146, aovUS: 266 },
  { id: "health", name: "Health & Beauty", cpcUS: 5.70, cvr: 0.0489, aovUS: 151 },
  { id: "food", name: "Food & Beverage", cpcUS: 2.05, cvr: 0.0602, aovUS: 69 },
  { id: "supplements", name: "Supplements", cpcUS: 5.70, cvr: 0.0350, aovUS: 70 },
  { id: "electronics", name: "Electronics", cpcUS: 3.50, cvr: 0.0220, aovUS: 320 },
  { id: "pets", name: "Pet Supplies", cpcUS: 3.20, cvr: 0.0380, aovUS: 85 },
];

// Country adjustments (WordStream CPC, GDP per capita PPP for AOV)
const LOCATIONS = [
  { id: "us", name: "United States", multCPC: 1.00, multAOV: 1.00 },
  { id: "mx", name: "Mexico", multCPC: 0.50, multAOV: 0.299 },
  { id: "co", name: "Colombia", multCPC: 0.17, multAOV: 0.250 },
  { id: "ar", name: "Argentina", multCPC: 0.25, multAOV: 0.280 },
  { id: "cl", name: "Chile", multCPC: 0.40, multAOV: 0.320 },
  { id: "pe", name: "Peru", multCPC: 0.20, multAOV: 0.180 },
  { id: "es", name: "Spain", multCPC: 0.75, multAOV: 0.520 },
];

const ROASCalculatorPage = () => {
  const [budget, setBudget] = useState<string>("");
  const [sectorId, setSectorId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");

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
    const roasMarket = revenueMarket / budgetNum;
    
    // RevUp ROAS calculations (includes additional boost)
    const ordersRevUp = clicks * cvrBase * (1 + REVUP_BOOST);
    const revenueRevUp = ordersRevUp * aovAdjusted;
    const roasRevUp = revenueRevUp / budgetNum;

    return {
      cpcAdjusted,
      aovAdjusted,
      clicks: Math.round(clicks),
      ordersMarket: Math.round(ordersMarket * 10) / 10,
      ordersRevUp: Math.round(ordersRevUp * 10) / 10,
      revenueMarket,
      revenueRevUp,
      roasMarket,
      roasRevUp,
      cvr: cvrBase * 100,
      roasImprovement: ((roasRevUp / roasMarket - 1) * 100).toFixed(0),
    };
  }, [budget, sectorId, locationId]);

  const getRoasStatus = (roasValue: number) => {
    if (roasValue >= 4) return { label: "Excellent", color: "text-green-500", bg: "bg-green-500/10" };
    if (roasValue >= 3) return { label: "Very Good", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (roasValue >= 2) return { label: "Good", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    if (roasValue >= 1) return { label: "Break-even", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { label: "Loss", color: "text-red-500", bg: "bg-red-500/10" };
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
              <span className="text-primary">ROAS</span> Calculator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Project your advertising return with updated benchmarks by industry and region.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Inputs Card */}
            <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Configure Your Scenario
                </CardTitle>
                <CardDescription>
                  You only need 3 inputs to project your results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Monthly Budget (USD)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g. 5000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sector" className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Sector / Industry
                  </Label>
                  <Select value={sectorId} onValueChange={setSectorId}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select your sector" />
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
                    Location / Country
                  </Label>
                  <Select value={locationId} onValueChange={setLocationId}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select the country" />
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

                {sectorId && locationId && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-3">Applied benchmarks:</p>
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
                          {(SECTORS.find(s => s.id === sectorId)!.cvr * 100 * 1.10).toFixed(2)}%
                        </span>
                      </div>
                      <div className="p-2 bg-muted/30 rounded col-span-2">
                        <span className="text-muted-foreground">Avg. Order Value:</span>
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
                  Results Projection
                </CardTitle>
                <CardDescription>
                  Estimation based on 2025 industry benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    {/* ROAS Comparativo */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* ROAS Mercado */}
                      <div className={`p-5 rounded-xl ${getRoasStatus(results.roasMarket).bg} text-center border border-border/30`}>
                        <p className="text-xs text-muted-foreground mb-1">Market ROAS</p>
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
                        <p className="text-xs text-muted-foreground mb-1">ROAS with RevUp</p>
                        <p className="text-4xl font-bold text-primary">
                          {results.roasRevUp.toFixed(2)}x
                        </p>
                        <p className="mt-1 text-sm font-medium text-primary">
                          Optimized
                        </p>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm">Revenue with RevUp</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">
                          ${results.revenueRevUp.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          vs ${results.revenueMarket.toLocaleString('en-US', { maximumFractionDigits: 0 })} market
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-sm">Orders with RevUp</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {results.ordersRevUp.toLocaleString('en-US', { maximumFractionDigits: 1 })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          vs {results.ordersMarket.toLocaleString('en-US', { maximumFractionDigits: 1 })} market
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Target className="w-4 h-4" />
                          <span className="text-sm">Estimated Clicks</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {results.clicks.toLocaleString('en-US')}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">Net Profit with RevUp</span>
                        </div>
                        <p className="text-2xl font-bold text-green-500">
                          ${(results.revenueRevUp - parseFloat(budget)).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="border-t border-border/50 pt-4">
                      <p className="text-sm text-muted-foreground mb-3">Calculation breakdown:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Region-adjusted CPC</span>
                          <span className="font-mono">${results.cpcAdjusted.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Adjusted Avg. Order Value</span>
                          <span className="font-mono">${results.aovAdjusted.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conversion Rate (CVR)</span>
                          <span className="font-mono">{results.cvr.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">RevUp Boost</span>
                          <span className="font-mono text-primary">+{(REVUP_BOOST * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Complete all 3 fields to see your projection</p>
                    <p className="text-sm mt-2">Budget + Sector + Location</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <Card className="mt-8 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Methodology & Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>
                This calculator uses <strong className="text-foreground">updated 2025 benchmarks</strong> from 
                recognized industry sources to project realistic results.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">CPC by Industry</p>
                  <p className="text-xs">WordStream Google Ads Benchmarks 2025</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Conversion Rates</p>
                  <p className="text-xs">Dynamic Yield eCommerce Benchmarks</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Avg. Order Value (AOV)</p>
                  <p className="text-xs">Decile Q1 2025 + Dynamic Yield</p>
                </div>
              </div>
              <p className="text-xs pt-2">
                * Country adjustments are based on CPC differences (WordStream) and purchasing power (GDP per capita PPP 2024).
              </p>
            </CardContent>
          </Card>

          {/* Legal Disclaimer */}
          <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              <strong className="text-foreground">Legal Disclaimer:</strong> The results shown in this calculator are 
              <strong className="text-foreground"> estimates based on industry benchmarks</strong> and do not constitute 
              guarantees or performance commitments. Actual results may vary significantly depending on 
              factors such as product quality, marketing strategy, competition, seasonality, and 
              market conditions. RevUp is not responsible for decisions made based on these projections.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-8 text-center p-8 bg-primary/5 rounded-xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-3">Ready to Maximize Your ROAS?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let our experts help you achieve these projections and beyond. Book a free consultation to discuss your growth strategy.
            </p>
            <Button 
              variant="glow" 
              size="lg"
              onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
              className="text-base md:text-lg px-8 py-6"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book a Free Consultation
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
