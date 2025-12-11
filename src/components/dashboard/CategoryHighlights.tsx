import { HighlightCard } from "./HighlightCard";
import { findBestPerformer, findWorstPerformer, calculateGrowth } from "@/data/dashboardData";
import { TrendingUp } from "lucide-react";

interface DataItem {
  name: string;
  value: number;
  percentage?: number;
}

interface CategoryHighlightsProps {
  title: string;
  dataOutubro: DataItem[];
  dataNovembro: DataItem[];
  totalOutubro: number;
  totalNovembro: number;
}

export function CategoryHighlights({
  title,
  dataOutubro,
  dataNovembro,
  totalOutubro,
  totalNovembro,
}: CategoryHighlightsProps) {
  const bestOutubro = findBestPerformer(dataOutubro);
  const worstOutubro = findWorstPerformer(dataOutubro);
  const bestNovembro = findBestPerformer(dataNovembro);
  const worstNovembro = findWorstPerformer(dataNovembro);
  
  const totalGrowth = calculateGrowth(totalNovembro, totalOutubro);
  
  // Calcular crescimento do melhor item (se existir em ambos os meses)
  const bestOutubroInNov = dataNovembro.find(d => d.name === bestOutubro.name);
  const bestGrowth = bestOutubroInNov 
    ? calculateGrowth(bestOutubroInNov.value, bestOutubro.value) 
    : undefined;

  return (
    <div className="powerbi-card p-4 rounded-xl animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Destaques: {title}
        </h3>
        <div className={`flex items-center gap-1 text-xs font-bold ${totalGrowth >= 0 ? 'text-success' : 'text-destructive'}`}>
          <span>{totalGrowth >= 0 ? '+' : ''}{totalGrowth}%</span>
          <span className="text-muted-foreground font-normal">crescimento total</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Outubro */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border/50 pb-2">
            Outubro ({totalOutubro.toLocaleString("pt-BR")})
          </p>
          <HighlightCard
            title="Mais Produzido"
            item={bestOutubro.name}
            value={bestOutubro.value}
            percentage={bestOutubro.percentage}
            type="best"
          />
          <HighlightCard
            title="Menos Produzido"
            item={worstOutubro.name}
            value={worstOutubro.value}
            percentage={worstOutubro.percentage}
            type="worst"
          />
        </div>
        
        {/* Novembro */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border/50 pb-2">
            Novembro ({totalNovembro.toLocaleString("pt-BR")})
          </p>
          <HighlightCard
            title="Mais Produzido"
            item={bestNovembro.name}
            value={bestNovembro.value}
            percentage={bestNovembro.percentage}
            type="best"
            growth={bestGrowth}
          />
          <HighlightCard
            title="Menos Produzido"
            item={worstNovembro.name}
            value={worstNovembro.value}
            percentage={worstNovembro.percentage}
            type="worst"
          />
        </div>
      </div>
    </div>
  );
}
