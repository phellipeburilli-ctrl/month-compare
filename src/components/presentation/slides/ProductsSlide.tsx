import { Slide } from "../Slide";
import { HorizontalBarChart } from "@/components/dashboard/HorizontalBarChart";
import {
  produtoOutubro,
  produtoNovembro,
  calculateGrowth,
  findBestPerformer,
} from "@/data/dashboardData";
import { Trophy, TrendingUp, TrendingDown, Sparkles, Package } from "lucide-react";

interface ProductsSlideProps {
  isActive: boolean;
}

export function ProductsSlide({ isActive }: ProductsSlideProps) {
  const totalOut = produtoOutubro.reduce((s, i) => s + i.value, 0);
  const totalNov = produtoNovembro.reduce((s, i) => s + i.value, 0);

  const bestOut = findBestPerformer(produtoOutubro);
  const bestNov = findBestPerformer(produtoNovembro);

  // Find biggest growth
  const growths = produtoNovembro
    .map((item) => {
      const outItem = produtoOutubro.find((o) => o.name === item.name);
      const outValue = outItem?.value || 0;
      return {
        name: item.name,
        growth: outValue > 0 ? calculateGrowth(item.value, outValue) : null,
        out: outValue,
        nov: item.value,
      };
    })
    .filter((g) => g.growth !== null && g.growth > 0)
    .sort((a, b) => (b.growth || 0) - (a.growth || 0));

  const biggestGrowth = growths[0];

  // Find biggest drop
  const drops = produtoOutubro
    .map((item) => {
      const novItem = produtoNovembro.find((n) => n.name === item.name);
      const novValue = novItem?.value || 0;
      return {
        name: item.name,
        growth: calculateGrowth(novValue, item.value),
        out: item.value,
        nov: novValue,
      };
    })
    .filter((d) => d.growth < 0)
    .sort((a, b) => a.growth - b.growth);

  const biggestDrop = drops[0];

  // New products
  const newProducts = produtoNovembro.filter(
    (item) => !produtoOutubro.find((o) => o.name === item.name)
  );

  return (
    <Slide isActive={isActive}>
      <div className="w-full max-w-7xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Package className="h-8 w-8 text-accent" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Produtos
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">Produções por produto</p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HorizontalBarChart
            title="Outubro 2025"
            subtitle="Produções por produto"
            data={produtoOutubro}
            badge={`${totalOut} produções`}
          />
          <HorizontalBarChart
            title="Novembro 2025"
            subtitle="Produções por produto"
            data={produtoNovembro}
            badge={`${totalNov} produções`}
          />
        </div>

        {/* Insights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted-foreground">Top Out</p>
            </div>
            <p className="font-semibold text-foreground text-sm">{bestOut.name}</p>
            <p className="text-xs text-muted-foreground">{bestOut.value} produções</p>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Top Nov</p>
            </div>
            <p className="font-semibold text-foreground text-sm">{bestNov.name}</p>
            <p className="text-xs text-muted-foreground">{bestNov.value} produções</p>
          </div>

          {biggestGrowth && (
            <div className="bg-success/10 border border-success/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <p className="text-xs text-muted-foreground">Maior Cresc.</p>
              </div>
              <p className="font-semibold text-foreground text-sm">{biggestGrowth.name}</p>
              <p className="text-xs text-success">+{biggestGrowth.growth}%</p>
            </div>
          )}

          {biggestDrop && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <p className="text-xs text-muted-foreground">Maior Queda</p>
              </div>
              <p className="font-semibold text-foreground text-sm">{biggestDrop.name}</p>
              <p className="text-xs text-destructive">{biggestDrop.growth}%</p>
            </div>
          )}
        </div>

        {/* New products */}
        {newProducts.length > 0 && (
          <div className="bg-success/5 border border-success/20 rounded-xl p-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Novos Produtos em Novembro:</p>
              <p className="font-semibold text-foreground">{newProducts.map((p) => p.name).join(", ")}</p>
            </div>
          </div>
        )}
      </div>
    </Slide>
  );
}
