import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, Target, ShoppingCart, MapPin, BarChart3, Zap, ArrowRight, Calendar } from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";

// RevUp boost over market (CRO improvements, optimization, etc.)
const REVUP_BOOST = 0.20; // 20% improvement over market ROAS

// Sector benchmarks (sources: WordStream 2025, Dynamic Yield, Decile Q1 2025)
const SECTORS = [
  { id: "fashion", name: "Fashion & Apparel", cpcUS: 4.31, cvr: 0.0313, aovUS: 191 },
  { id: "home", name: "Home & Furniture", cpcUS: 3.86, cvr: 0.0146, aovUS: 266 },
  { id: "health", name: "Health & Beauty", cpcUS: 5.70, cvr: 0.0489, aovUS: 151 },
  { id: "food", name: "Food & Beverage", cpcUS: 2.05, cvr: 0.0602, aovUS: 69 },
  { id: "supplements", name: "Supplements & Vitamins", cpcUS: 5.70, cvr: 0.0350, aovUS: 70 },
  { id: "electronics", name: "Electronics & Tech", cpcUS: 3.50, cvr: 0.0220, aovUS: 320 },
  { id: "pets", name: "Pet Supplies", cpcUS: 3.20, cvr: 0.0380, aovUS: 85 },
  { id: "jewelry", name: "Jewelry & Watches", cpcUS: 4.80, cvr: 0.0180, aovUS: 350 },
  { id: "sports", name: "Sports & Outdoors", cpcUS: 3.40, cvr: 0.0290, aovUS: 145 },
  { id: "baby", name: "Baby & Kids", cpcUS: 3.10, cvr: 0.0420, aovUS: 95 },
  { id: "automotive", name: "Automotive & Parts", cpcUS: 4.20, cvr: 0.0180, aovUS: 220 },
  { id: "office", name: "Office & School Supplies", cpcUS: 2.80, cvr: 0.0350, aovUS: 75 },
  { id: "garden", name: "Garden & Outdoor Living", cpcUS: 3.50, cvr: 0.0250, aovUS: 130 },
  { id: "travel", name: "Travel & Luggage", cpcUS: 4.00, cvr: 0.0200, aovUS: 180 },
  { id: "fitness", name: "Fitness & Gym Equipment", cpcUS: 4.50, cvr: 0.0280, aovUS: 200 },
  { id: "books", name: "Books & Media", cpcUS: 1.80, cvr: 0.0450, aovUS: 45 },
  { id: "toys", name: "Toys & Games", cpcUS: 2.90, cvr: 0.0380, aovUS: 65 },
  { id: "software", name: "Software & SaaS", cpcUS: 6.50, cvr: 0.0150, aovUS: 150 },
  { id: "education", name: "Education & Courses", cpcUS: 5.80, cvr: 0.0200, aovUS: 250 },
  { id: "legal", name: "Legal Services", cpcUS: 8.50, cvr: 0.0120, aovUS: 500 },
  { id: "realestate", name: "Real Estate", cpcUS: 7.20, cvr: 0.0100, aovUS: 1000 },
  { id: "finance", name: "Finance & Insurance", cpcUS: 9.00, cvr: 0.0110, aovUS: 400 },
  { id: "medical", name: "Medical & Healthcare", cpcUS: 7.50, cvr: 0.0130, aovUS: 300 },
  { id: "construction", name: "Construction & Tools", cpcUS: 4.80, cvr: 0.0160, aovUS: 280 },
  { id: "restaurants", name: "Restaurants & Delivery", cpcUS: 2.50, cvr: 0.0550, aovUS: 35 },
];

// Country adjustments (WordStream CPC, GDP per capita PPP for AOV)
const LOCATIONS = [
  { id: "us", name: "United States", multCPC: 1.00, multAOV: 1.00 },
  { id: "co", name: "Colombia", multCPC: 0.17, multAOV: 0.250 },
];

const PortalROASCalculatorPage = () => {
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

    const cpcAdjusted = sector.cpcUS * location.multCPC;
    const aovAdjusted = sector.aovUS * location.multAOV;
    const cvrBase = sector.cvr * 1.10;
    const clicks = budgetNum / cpcAdjusted;
    
    const ordersMarket = clicks * cvrBase;
    const revenueMarket = ordersMarket * aovAdjusted;
    const roasMarket = revenueMarket / budgetNum;
    
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
    <PortalLayout>
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">ROAS</span> Calculator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Project your advertising return with updated benchmarks by industry and region.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Inputs Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
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
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sector" className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Sector / Industry
                    </Label>
                    <Select value={sectorId} onValueChange={setSectorId}>
                      <SelectTrigger className="bg-input border-border">
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
                      <SelectTrigger className="bg-input border-border">
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
            </motion.div>

            {/* Results Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
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
                      {/* ROAS Comparison */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className={`p-5 rounded-xl ${getRoasStatus(results.roasMarket).bg} text-center border border-border/30`}>
                          <p className="text-xs text-muted-foreground mb-1">Market ROAS</p>
                          <p className={`text-3xl font-bold ${getRoasStatus(results.roasMarket).color}`}>
                            {results.roasMarket.toFixed(2)}x
                          </p>
                          <p className={`mt-1 text-sm font-medium ${getRoasStatus(results.roasMarket).color}`}>
                            {getRoasStatus(results.roasMarket).label}
                          </p>
                        </div>
                        
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

                      {/* Breakdown */}
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
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center p-8 bg-primary/5 rounded-xl border border-primary/20"
          >
            <h3 className="text-2xl font-bold mb-3 text-foreground">Ready to Maximize Your ROAS?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let our experts help you achieve these projections and beyond. Book a free consultation.
            </p>
            <Button 
              size="lg"
              onClick={() => window.open('https://calendly.com/revupagencygroup-info/30min?month=2025-11', '_blank')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              <strong className="text-foreground">Legal Disclaimer:</strong> The results shown are 
              <strong className="text-foreground"> estimates based on industry benchmarks</strong> and do not constitute 
              guarantees. Actual results may vary depending on product quality, strategy, competition, and market conditions.
            </p>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalROASCalculatorPage;
