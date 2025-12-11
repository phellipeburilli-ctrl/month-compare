import { TrendingUp, TrendingDown, Award, Target, Package, Video } from "lucide-react";
import { InsightCard } from "./InsightCard";
import { kpis, calculateGrowth } from "@/data/dashboardData";

export function ProductivityHighlights() {
  const isGrowthPositive = kpis.variacaoTotal >= 0;
  
  // Calcular variação do produto destaque
  const topProdOutVal = kpis.topProdutoOutubro.value;
  const topProdNovVal = kpis.topProdutoNovembro.value;
  
  return (
    <section className="mb-8">
      <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Award className="h-5 w-5 text-accent" />
        Resumo Executivo
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          title="Total Geral"
          value={kpis.totalGeral.toLocaleString("pt-BR")}
          description="Produções nos 2 meses"
          icon={Target}
          variant="primary"
          delay={100}
        />
        <InsightCard
          title={isGrowthPositive ? "Variação Mensal" : "Queda Mensal"}
          value={`${kpis.variacaoTotal > 0 ? '+' : ''}${kpis.variacaoTotal}%`}
          description={`Out: ${kpis.totalOutubro} → Nov: ${kpis.totalNovembro}`}
          icon={isGrowthPositive ? TrendingUp : TrendingDown}
          variant={isGrowthPositive ? "success" : "warning"}
          delay={200}
        />
        <InsightCard
          title="Top Produto Out"
          value={kpis.topProdutoOutubro.name}
          description={`${kpis.topProdutoOutubro.value} produções (${kpis.topProdutoOutubro.percentage?.toFixed(1)}%)`}
          icon={Package}
          variant="accent"
          delay={300}
        />
        <InsightCard
          title="Top Produto Nov"
          value={kpis.topProdutoNovembro.name}
          description={`${kpis.topProdutoNovembro.value} produções (${kpis.topProdutoNovembro.percentage?.toFixed(1)}%)`}
          icon={Package}
          variant="accent"
          delay={400}
        />
      </div>
    </section>
  );
}
