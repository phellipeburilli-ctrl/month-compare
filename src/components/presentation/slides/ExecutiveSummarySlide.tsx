import { Slide } from "../Slide";
import { kpis } from "@/data/dashboardData";
import { TrendingDown, TrendingUp, Calendar, BarChart3, Package } from "lucide-react";

interface ExecutiveSummarySlideProps {
  isActive: boolean;
}

export function ExecutiveSummarySlide({ isActive }: ExecutiveSummarySlideProps) {
  const isPositive = kpis.variacaoTotal >= 0;

  return (
    <Slide isActive={isActive}>
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Resumo Executivo
          </h2>
          <p className="text-muted-foreground text-lg">Visão geral da produção</p>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Total Geral */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold text-foreground">{kpis.totalGeral}</p>
              <p className="text-muted-foreground mt-1">Total de Entregas</p>
            </div>
          </div>

          {/* Variação */}
          <div className={`bg-card border rounded-2xl p-6 text-center space-y-3 ${
            isPositive ? "border-success/30" : "border-destructive/30"
          }`}>
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${
              isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}>
              {isPositive ? <TrendingUp className="h-7 w-7" /> : <TrendingDown className="h-7 w-7" />}
            </div>
            <div>
              <p className={`text-5xl md:text-6xl font-bold ${
                isPositive ? "text-success" : "text-destructive"
              }`}>
                {kpis.variacaoTotal}%
              </p>
              <p className="text-muted-foreground mt-1">Variação Mensal</p>
            </div>
          </div>

          {/* Top Produto Nov */}
          <div className="bg-card border border-accent/30 rounded-2xl p-6 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent">
              <Package className="h-7 w-7" />
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">{kpis.topProdutoNovembro.name}</p>
              <p className="text-muted-foreground mt-1">Top Produto Nov ({kpis.topProdutoNovembro.value})</p>
            </div>
          </div>
        </div>

        {/* Monthly breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-muted/30 rounded-xl p-6 flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#4F7CFF]/10">
              <Calendar className="h-6 w-6 text-[#4F7CFF]" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{kpis.totalOutubro}</p>
              <p className="text-muted-foreground">Outubro 2025</p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{kpis.totalNovembro}</p>
              <p className="text-muted-foreground">Novembro 2025</p>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-muted/20 border border-border rounded-xl p-6 text-center">
          <p className="text-lg text-muted-foreground">
            <span className="text-foreground font-semibold">Queda de {Math.abs(kpis.totalOutubro - kpis.totalNovembro)} entregas</span> entre Outubro e Novembro, representando uma redução de{" "}
            <span className="text-destructive font-semibold">{Math.abs(kpis.variacaoTotal)}%</span> na produção total.
          </p>
        </div>
      </div>
    </Slide>
  );
}
