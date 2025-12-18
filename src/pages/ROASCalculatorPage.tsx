import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, Target } from "lucide-react";

const ROASCalculatorPage = () => {
  const [revenue, setRevenue] = useState<string>("");
  const [adSpend, setAdSpend] = useState<string>("");
  const [roas, setRoas] = useState<number | null>(null);

  const calculateROAS = () => {
    const revenueNum = parseFloat(revenue);
    const adSpendNum = parseFloat(adSpend);
    
    if (revenueNum > 0 && adSpendNum > 0) {
      const calculatedRoas = revenueNum / adSpendNum;
      setRoas(calculatedRoas);
    }
  };

  const resetCalculator = () => {
    setRevenue("");
    setAdSpend("");
    setRoas(null);
  };

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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Calculadora de <span className="text-primary">ROAS</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Calcula el retorno de tu inversión publicitaria y optimiza tus campañas de marketing digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Ingresa tus datos
                </CardTitle>
                <CardDescription>
                  Introduce los ingresos generados y el gasto en publicidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Ingresos generados ($)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="Ej: 10000"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="adSpend">Gasto en publicidad ($)</Label>
                  <Input
                    id="adSpend"
                    type="number"
                    placeholder="Ej: 2500"
                    value={adSpend}
                    onChange={(e) => setAdSpend(e.target.value)}
                    className="bg-background/50"
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={calculateROAS} className="flex-1">
                    Calcular ROAS
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    Limpiar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Resultado
                </CardTitle>
                <CardDescription>
                  Tu retorno sobre la inversión publicitaria
                </CardDescription>
              </CardHeader>
              <CardContent>
                {roas !== null ? (
                  <div className="space-y-6">
                    <div className={`p-6 rounded-xl ${getRoasStatus(roas).bg} text-center`}>
                      <p className="text-sm text-muted-foreground mb-2">Tu ROAS es</p>
                      <p className={`text-5xl font-bold ${getRoasStatus(roas).color}`}>
                        {roas.toFixed(2)}x
                      </p>
                      <p className={`mt-2 font-medium ${getRoasStatus(roas).color}`}>
                        {getRoasStatus(roas).label}
                      </p>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Por cada $1 invertido</span>
                        <span className="font-semibold">${roas.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Ganancia neta</span>
                        <span className="font-semibold">
                          ${(parseFloat(revenue) - parseFloat(adSpend)).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">ROI</span>
                        <span className="font-semibold">
                          {((roas - 1) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Ingresa tus datos para calcular el ROAS</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <Card className="mt-8 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>¿Qué es el ROAS?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">ROAS (Return on Ad Spend)</strong> es una métrica que mide 
                la efectividad de tus campañas publicitarias. Se calcula dividiendo los ingresos generados 
                entre el gasto en publicidad.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">ROAS 2x - 3x</p>
                  <p className="text-sm">Considerado aceptable para la mayoría de industrias</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">ROAS 4x+</p>
                  <p className="text-sm">Excelente rendimiento, campañas muy rentables</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ROASCalculatorPage;
