import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Package, TrendingUp, AlertTriangle, BarChart3, Truck, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import PortalLayout from "@/components/portal/PortalLayout";

// Products database with all fee structures
const PRODUCTS = [
  {
    id: "sunglasses",
    name: "Gafas de Sol",
    asp: 29.99,
    cogs: 8.50,
    referralPct: 0.15,
    fbaFee: 3.22,
    volumeFt3: 0.05,
    inboundUnit: 0.45,
    prepUnit: 0.30,
    returnsPct: 0.03,
    returnProcessing: 0.00,
    otherUnit: 0.25,
  },
  {
    id: "phone_case",
    name: "Funda de Teléfono",
    asp: 14.99,
    cogs: 2.80,
    referralPct: 0.15,
    fbaFee: 3.22,
    volumeFt3: 0.02,
    inboundUnit: 0.25,
    prepUnit: 0.20,
    returnsPct: 0.05,
    returnProcessing: 0.00,
    otherUnit: 0.10,
  },
  {
    id: "yoga_mat",
    name: "Mat de Yoga",
    asp: 34.99,
    cogs: 12.00,
    referralPct: 0.15,
    fbaFee: 5.68,
    volumeFt3: 0.35,
    inboundUnit: 1.20,
    prepUnit: 0.50,
    returnsPct: 0.04,
    returnProcessing: 2.00,
    otherUnit: 0.30,
  },
  {
    id: "supplements",
    name: "Suplementos",
    asp: 24.99,
    cogs: 6.00,
    referralPct: 0.15,
    fbaFee: 3.65,
    volumeFt3: 0.08,
    inboundUnit: 0.35,
    prepUnit: 0.25,
    returnsPct: 0.02,
    returnProcessing: 0.00,
    otherUnit: 0.15,
  },
  {
    id: "kitchen_gadget",
    name: "Gadget de Cocina",
    asp: 19.99,
    cogs: 5.50,
    referralPct: 0.15,
    fbaFee: 4.25,
    volumeFt3: 0.12,
    inboundUnit: 0.55,
    prepUnit: 0.35,
    returnsPct: 0.06,
    returnProcessing: 1.50,
    otherUnit: 0.20,
  },
];

// Marketplace multipliers
const MARKETPLACES = [
  { id: "US", name: "Estados Unidos", priceMultiplier: 1.0, costMultiplier: 1.0 },
  { id: "CA", name: "Canadá", priceMultiplier: 0.95, costMultiplier: 1.05 },
  { id: "UK", name: "Reino Unido", priceMultiplier: 1.10, costMultiplier: 1.15 },
  { id: "DE", name: "Alemania", priceMultiplier: 1.05, costMultiplier: 1.10 },
  { id: "MX", name: "México", priceMultiplier: 0.85, costMultiplier: 0.90 },
];

// Category benchmarks for ACoS and Funnel modes
const BENCHMARKS = {
  sunglasses: { acos: 0.25, ctr: 0.004, cvr: 0.08, cpc: 0.95 },
  phone_case: { acos: 0.30, ctr: 0.005, cvr: 0.10, cpc: 0.75 },
  yoga_mat: { acos: 0.22, ctr: 0.003, cvr: 0.06, cpc: 1.10 },
  supplements: { acos: 0.28, ctr: 0.004, cvr: 0.07, cpc: 1.25 },
  kitchen_gadget: { acos: 0.26, ctr: 0.004, cvr: 0.09, cpc: 0.85 },
};

// Storage rates by season (per cubic foot per month)
const STORAGE_RATES = {
  standard: 0.87, // Jan-Sep
  peak: 2.40,     // Oct-Dec
};

// Global fees
const GLOBAL_FEES = {
  professionalPlan: 39.99, // monthly
};

export default function PortalAmazonCalculatorPage() {
  // Inputs
  const [budget, setBudget] = useState<number>(1000);
  const [productId, setProductId] = useState<string>("sunglasses");
  const [marketplaceId, setMarketplaceId] = useState<string>("US");
  const [season, setSeason] = useState<string>("standard");
  const [calcMode, setCalcMode] = useState<string>("acos");
  
  // Custom overrides (advanced)
  const [customAcos, setCustomAcos] = useState<string>("");
  const [customCpc, setCustomCpc] = useState<string>("");
  const [customCvr, setCustomCvr] = useState<string>("");
  
  // Inventory inputs
  const [leadTimeDays, setLeadTimeDays] = useState<number>(30);
  const [bufferDays, setBufferDays] = useState<number>(7);
  const [safetyStock, setSafetyStock] = useState<number>(50);

  const results = useMemo(() => {
    const product = PRODUCTS.find(p => p.id === productId)!;
    const marketplace = MARKETPLACES.find(m => m.id === marketplaceId)!;
    const benchmark = BENCHMARKS[productId as keyof typeof BENCHMARKS];
    const storageRate = STORAGE_RATES[season as keyof typeof STORAGE_RATES];

    // Adjusted values by marketplace
    const asp = product.asp * marketplace.priceMultiplier;
    const cogs = product.cogs * marketplace.costMultiplier;
    const fbaFee = product.fbaFee * marketplace.costMultiplier;
    const inboundUnit = product.inboundUnit * marketplace.costMultiplier;

    // Per-unit costs (non-ads)
    const referralFeeUnit = asp * product.referralPct;
    const storageUnit = product.volumeFt3 * storageRate;
    const returnsReserveUnit = asp * product.returnsPct;
    
    const totalCostUnit = 
      referralFeeUnit + 
      fbaFee + 
      storageUnit + 
      cogs + 
      inboundUnit + 
      product.prepUnit + 
      returnsReserveUnit + 
      product.returnProcessing + 
      product.otherUnit;

    // Contribution Margin 1 (before ads)
    const cm1Unit = asp - totalCostUnit;
    const cm1Pct = (cm1Unit / asp) * 100;

    // Calculations based on mode
    let revenueAds = 0;
    let roas = 0;
    let unitsAds = 0;
    let adCostPerUnit = 0;
    let acosUsed = 0;
    let clicks = 0;
    let orders = 0;
    let cpcUsed = 0;
    let cvrUsed = 0;

    if (calcMode === "acos") {
      // ACoS Mode
      acosUsed = customAcos ? parseFloat(customAcos) / 100 : benchmark.acos;
      revenueAds = budget / acosUsed;
      roas = 1 / acosUsed;
      unitsAds = revenueAds / asp;
      adCostPerUnit = asp * acosUsed;
    } else {
      // Funnel Mode (CPC/CVR)
      cpcUsed = customCpc ? parseFloat(customCpc) : benchmark.cpc;
      cvrUsed = customCvr ? parseFloat(customCvr) / 100 : benchmark.cvr;
      clicks = budget / cpcUsed;
      orders = clicks * cvrUsed;
      unitsAds = orders;
      revenueAds = orders * asp;
      acosUsed = revenueAds > 0 ? budget / revenueAds : 0;
      roas = revenueAds > 0 ? revenueAds / budget : 0;
      adCostPerUnit = unitsAds > 0 ? budget / unitsAds : 0;
    }

    // Profit calculations
    const profitUnit = cm1Unit - adCostPerUnit;
    const profitTotal = profitUnit * unitsAds;
    const profitMarginPct = asp > 0 ? (profitUnit / asp) * 100 : 0;

    // PRO Metrics
    const breakEvenAcos = asp > 0 ? (cm1Unit / asp) * 100 : 0;
    const maxCpc = cm1Unit * (customCvr ? parseFloat(customCvr) / 100 : benchmark.cvr);
    const tacos = revenueAds > 0 ? (budget / revenueAds) * 100 : 0;

    // Inventory
    const dailyUnits = unitsAds / 30;
    const reorderPoint = dailyUnits * (leadTimeDays + bufferDays) + safetyStock;

    // Monthly costs breakdown
    const totalCogsCost = cogs * unitsAds;
    const totalReferralFees = referralFeeUnit * unitsAds;
    const totalFbaFees = fbaFee * unitsAds;
    const totalStorageFees = storageUnit * unitsAds;
    const totalInboundFees = inboundUnit * unitsAds;
    const totalPrepFees = product.prepUnit * unitsAds;
    const totalReturnsReserve = returnsReserveUnit * unitsAds;
    const totalOtherFees = (product.returnProcessing + product.otherUnit) * unitsAds;
    const proratedProfPlan = GLOBAL_FEES.professionalPlan;

    return {
      // Product info
      productName: product.name,
      asp,
      cogs,
      
      // Per unit breakdown
      referralFeeUnit,
      fbaFee,
      storageUnit,
      inboundUnit,
      prepUnit: product.prepUnit,
      returnsReserveUnit,
      returnProcessing: product.returnProcessing,
      otherUnit: product.otherUnit,
      totalCostUnit,
      cm1Unit,
      cm1Pct,
      
      // Ad metrics
      acosUsed: acosUsed * 100,
      roas,
      clicks,
      orders,
      cpcUsed,
      cvrUsed: cvrUsed * 100,
      adCostPerUnit,
      
      // Revenue & units
      revenueAds,
      unitsAds,
      
      // Profit
      profitUnit,
      profitTotal,
      profitMarginPct,
      
      // PRO metrics
      breakEvenAcos,
      maxCpc,
      tacos,
      
      // Inventory
      dailyUnits,
      reorderPoint,
      
      // Monthly totals
      totalCogsCost,
      totalReferralFees,
      totalFbaFees,
      totalStorageFees,
      totalInboundFees,
      totalPrepFees,
      totalReturnsReserve,
      totalOtherFees,
      proratedProfPlan,
      totalRevenue: revenueAds,
      totalAdSpend: budget,
      grossProfit: profitTotal,
    };
  }, [budget, productId, marketplaceId, season, calcMode, customAcos, customCpc, customCvr, leadTimeDays, bufferDays, safetyStock]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatNumber = (value: number, decimals = 0) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: decimals }).format(value);
  };

  const getProfitStatus = (profit: number) => {
    if (profit > 0) return { label: "Rentable", color: "text-green-400", bg: "bg-green-500/10" };
    if (profit === 0) return { label: "Break-even", color: "text-yellow-400", bg: "bg-yellow-500/10" };
    return { label: "Pérdida", color: "text-red-400", bg: "bg-red-500/10" };
  };

  const profitStatus = getProfitStatus(results.profitTotal);

  return (
    <PortalLayout>
      <TooltipProvider>
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Amazon FBA Calculator</h1>
              <p className="text-muted-foreground">Calcula rentabilidad, P&L y métricas PRO para tu negocio en Amazon</p>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* INPUTS Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Inputs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Budget */}
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="flex items-center gap-2">
                      Presupuesto Ads (USD/mes)
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tu inversión mensual en publicidad de Amazon</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="budget"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="pl-9"
                        min={0}
                      />
                    </div>
                  </div>

                  {/* Product */}
                  <div className="space-y-2">
                    <Label>Producto</Label>
                    <Select value={productId} onValueChange={setProductId}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCTS.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} (ASP: ${product.asp})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Marketplace */}
                  <div className="space-y-2">
                    <Label>Marketplace</Label>
                    <Select value={marketplaceId} onValueChange={setMarketplaceId}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MARKETPLACES.map(mp => (
                          <SelectItem key={mp.id} value={mp.id}>
                            {mp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Season */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Temporada
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>El storage fee de Amazon varía por temporada</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Select value={season} onValueChange={setSeason}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Ene–Sep (${STORAGE_RATES.standard}/ft³)</SelectItem>
                        <SelectItem value="peak">Oct–Dic (${STORAGE_RATES.peak}/ft³)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  {/* Calculation Mode */}
                  <div className="space-y-3">
                    <Label>Modo de Cálculo</Label>
                    <Tabs value={calcMode} onValueChange={setCalcMode} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="acos">ACoS</TabsTrigger>
                        <TabsTrigger value="funnel">Funnel</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="acos" className="mt-3 space-y-3">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">
                            ACoS % (dejar vacío para benchmark: {(BENCHMARKS[productId as keyof typeof BENCHMARKS]?.acos * 100).toFixed(0)}%)
                          </Label>
                          <Input
                            type="number"
                            placeholder={`${(BENCHMARKS[productId as keyof typeof BENCHMARKS]?.acos * 100).toFixed(0)}%`}
                            value={customAcos}
                            onChange={(e) => setCustomAcos(e.target.value)}
                            min={1}
                            max={100}
                          />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="funnel" className="mt-3 space-y-3">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">
                            CPC $ (benchmark: ${BENCHMARKS[productId as keyof typeof BENCHMARKS]?.cpc})
                          </Label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder={`$${BENCHMARKS[productId as keyof typeof BENCHMARKS]?.cpc}`}
                            value={customCpc}
                            onChange={(e) => setCustomCpc(e.target.value)}
                            min={0.01}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">
                            CVR % (benchmark: {(BENCHMARKS[productId as keyof typeof BENCHMARKS]?.cvr * 100).toFixed(1)}%)
                          </Label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder={`${(BENCHMARKS[productId as keyof typeof BENCHMARKS]?.cvr * 100).toFixed(1)}%`}
                            value={customCvr}
                            onChange={(e) => setCustomCvr(e.target.value)}
                            min={0.1}
                            max={100}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* RESULTS Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className={`${profitStatus.bg} border-border/50`}>
                  <CardContent className="pt-4 pb-3">
                    <p className="text-xs text-muted-foreground mb-1">Profit/mes</p>
                    <p className={`text-xl font-bold ${profitStatus.color}`}>
                      {formatCurrency(results.profitTotal)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{profitStatus.label}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="pt-4 pb-3">
                    <p className="text-xs text-muted-foreground mb-1">ROAS</p>
                    <p className="text-xl font-bold text-foreground">
                      {results.roas.toFixed(2)}x
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ACoS: {results.acosUsed.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="pt-4 pb-3">
                    <p className="text-xs text-muted-foreground mb-1">Revenue Ads</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatCurrency(results.revenueAds)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatNumber(results.unitsAds)} unidades
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="pt-4 pb-3">
                    <p className="text-xs text-muted-foreground mb-1">Profit/unidad</p>
                    <p className={`text-xl font-bold ${results.profitUnit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency(results.profitUnit)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Margen: {results.profitMarginPct.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* P&L Breakdown */}
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    P&L por Unidad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Costs breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Precio (ASP)</span>
                        <span className="font-medium text-green-400">{formatCurrency(results.asp)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">COGS/Landed</span>
                        <span className="text-red-400">-{formatCurrency(results.cogs)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Referral Fee ({(PRODUCTS.find(p => p.id === productId)?.referralPct || 0.15) * 100}%)</span>
                        <span className="text-red-400">-{formatCurrency(results.referralFeeUnit)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">FBA Fee</span>
                        <span className="text-red-400">-{formatCurrency(results.fbaFee)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Storage</span>
                        <span className="text-red-400">-{formatCurrency(results.storageUnit)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Inbound</span>
                        <span className="text-red-400">-{formatCurrency(results.inboundUnit)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Prep/Label</span>
                        <span className="text-red-400">-{formatCurrency(results.prepUnit)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Returns Reserve</span>
                        <span className="text-red-400">-{formatCurrency(results.returnsReserveUnit)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Other Fees</span>
                        <span className="text-red-400">-{formatCurrency(results.returnProcessing + results.otherUnit)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm font-medium">
                        <span>CM1 (antes de ads)</span>
                        <span className={results.cm1Unit >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {formatCurrency(results.cm1Unit)} ({results.cm1Pct.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ad Cost/unidad</span>
                        <span className="text-red-400">-{formatCurrency(results.adCostPerUnit)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Profit/unidad</span>
                        <span className={results.profitUnit >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {formatCurrency(results.profitUnit)}
                        </span>
                      </div>
                    </div>

                    {/* Right: Monthly totals */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground mb-3">Totales Mensuales</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Revenue Total</span>
                        <span className="text-green-400">{formatCurrency(results.totalRevenue)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">COGS Total</span>
                        <span className="text-red-400">-{formatCurrency(results.totalCogsCost)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amazon Fees</span>
                        <span className="text-red-400">-{formatCurrency(results.totalReferralFees + results.totalFbaFees + results.totalStorageFees)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Logistics</span>
                        <span className="text-red-400">-{formatCurrency(results.totalInboundFees + results.totalPrepFees)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Returns Reserve</span>
                        <span className="text-red-400">-{formatCurrency(results.totalReturnsReserve)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ad Spend</span>
                        <span className="text-red-400">-{formatCurrency(results.totalAdSpend)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Professional Plan</span>
                        <span className="text-red-400">-{formatCurrency(results.proratedProfPlan)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Gross Profit</span>
                        <span className={results.grossProfit >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {formatCurrency(results.grossProfit)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PRO Metrics & Inventory */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PRO Metrics */}
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Métricas PRO
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Break-even ACoS</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>ACoS máximo para no perder dinero</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className={`font-bold ${results.acosUsed < results.breakEvenAcos ? 'text-green-400' : 'text-red-400'}`}>
                        {results.breakEvenAcos.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Max CPC</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>CPC máximo para no perder (basado en CVR)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="font-bold text-foreground">
                        {formatCurrency(results.maxCpc)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">TACoS</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total Ad Cost of Sales (salud del negocio)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="font-bold text-foreground">
                        {results.tacos.toFixed(1)}%
                      </span>
                    </div>

                    {calcMode === "funnel" && (
                      <>
                        <Separator />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Clicks</span>
                          <span>{formatNumber(results.clicks)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Orders</span>
                          <span>{formatNumber(results.orders)}</span>
                        </div>
                      </>
                    )}

                    {results.acosUsed > results.breakEvenAcos && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-red-400">
                          Tu ACoS ({results.acosUsed.toFixed(1)}%) supera el break-even ({results.breakEvenAcos.toFixed(1)}%). Estás perdiendo dinero por cada venta.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Inventory */}
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      Inventario
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Lead Time</Label>
                        <Input
                          type="number"
                          value={leadTimeDays}
                          onChange={(e) => setLeadTimeDays(Number(e.target.value))}
                          min={1}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Buffer</Label>
                        <Input
                          type="number"
                          value={bufferDays}
                          onChange={(e) => setBufferDays(Number(e.target.value))}
                          min={0}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Safety Stock</Label>
                        <Input
                          type="number"
                          value={safetyStock}
                          onChange={(e) => setSafetyStock(Number(e.target.value))}
                          min={0}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Ventas diarias (est.)</span>
                      <span className="font-medium">{results.dailyUnits.toFixed(1)} unidades</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Reorder Point</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Punto de reorden recomendado para evitar stockouts</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="font-bold text-primary text-lg">
                        {formatNumber(results.reorderPoint)} unidades
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs text-muted-foreground mt-8 p-4 bg-muted/20 rounded-lg"
          >
            <p>
              <strong>Nota:</strong> Los fees de Amazon (FBA, referral, storage) son aproximados y pueden variar según tamaño, peso y actualizaciones de Amazon.
              Verifica siempre los valores actuales en tu Seller Central y la Revenue Calculator oficial.
            </p>
          </motion.div>
        </div>
      </TooltipProvider>
    </PortalLayout>
  );
}
