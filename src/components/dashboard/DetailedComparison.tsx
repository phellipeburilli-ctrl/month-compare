import { ChartCard } from "./ChartCard";
import { calculateGrowth } from "@/data/dashboardData";
import { TrendingUp, TrendingDown, Minus, Video, Package } from "lucide-react";

interface DataItem {
  name: string;
  value: number;
  percentage: number;
}

interface DetailedComparisonProps {
  title: string;
  subtitle?: string;
  tipoVideoOutubro: DataItem[];
  tipoVideoNovembro: DataItem[];
  produtoOutubro: DataItem[];
  produtoNovembro: DataItem[];
  delay?: number;
}

// Combina dados dos dois meses para comparação
function combineData(outubro: DataItem[], novembro: DataItem[]) {
  const allNames = new Set([
    ...outubro.map(i => i.name),
    ...novembro.map(i => i.name)
  ]);
  
  return Array.from(allNames).map(name => {
    const out = outubro.find(i => i.name === name);
    const nov = novembro.find(i => i.name === name);
    return {
      name,
      outubro: out?.value || 0,
      novembro: nov?.value || 0,
      growth: calculateGrowth(nov?.value || 0, out?.value || 0),
    };
  }).sort((a, b) => (b.outubro + b.novembro) - (a.outubro + a.novembro));
}

function GrowthBadge({ growth }: { growth: number }) {
  if (growth === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
        <Minus className="h-3 w-3" />
        0%
      </span>
    );
  }
  
  if (growth > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-success">
        <TrendingUp className="h-3 w-3" />
        +{growth}%
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-destructive">
      <TrendingDown className="h-3 w-3" />
      {growth}%
    </span>
  );
}

function ComparisonTable({ 
  data, 
  totalOut, 
  totalNov,
  icon,
  accentColor 
}: { 
  data: ReturnType<typeof combineData>;
  totalOut: number;
  totalNov: number;
  icon: React.ReactNode;
  accentColor: string;
}) {
  const totalGrowth = calculateGrowth(totalNov, totalOut);
  
  return (
    <div className="space-y-3">
      {/* Header com totais */}
      <div className={`flex items-center justify-between p-3 rounded-lg border ${accentColor}`}>
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold text-foreground">Total</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">Out: <strong className="text-foreground">{totalOut}</strong></span>
          <span className="text-muted-foreground">Nov: <strong className="text-foreground">{totalNov}</strong></span>
          <GrowthBadge growth={totalGrowth} />
        </div>
      </div>
      
      {/* Tabela de itens */}
      <div className="overflow-hidden rounded-lg border border-border/50">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border/50">
              <th className="text-left py-2 px-3 font-medium text-muted-foreground">Nome</th>
              <th className="text-center py-2 px-3 font-medium text-muted-foreground w-20">Out</th>
              <th className="text-center py-2 px-3 font-medium text-muted-foreground w-20">Nov</th>
              <th className="text-right py-2 px-3 font-medium text-muted-foreground w-24">Variação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={item.name} 
                className={`border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors ${
                  index === 0 ? 'bg-success/5' : ''
                }`}
              >
                <td className="py-2 px-3 font-medium text-foreground">
                  {index === 0 && <span className="text-success mr-1">●</span>}
                  {item.name}
                </td>
                <td className="text-center py-2 px-3 text-muted-foreground">
                  {item.outubro || '-'}
                </td>
                <td className="text-center py-2 px-3 text-foreground font-medium">
                  {item.novembro || '-'}
                </td>
                <td className="text-right py-2 px-3">
                  {item.outubro === 0 && item.novembro > 0 ? (
                    <span className="text-xs font-bold text-success">NOVO</span>
                  ) : item.novembro === 0 && item.outubro > 0 ? (
                    <span className="text-xs font-bold text-destructive">-100%</span>
                  ) : (
                    <GrowthBadge growth={item.growth} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DetailedComparison({
  title,
  subtitle,
  tipoVideoOutubro,
  tipoVideoNovembro,
  produtoOutubro,
  produtoNovembro,
  delay = 0,
}: DetailedComparisonProps) {
  const videoData = combineData(tipoVideoOutubro, tipoVideoNovembro);
  const produtoData = combineData(produtoOutubro, produtoNovembro);
  
  const totalVideoOut = tipoVideoOutubro.reduce((s, i) => s + i.value, 0);
  const totalVideoNov = tipoVideoNovembro.reduce((s, i) => s + i.value, 0);
  const totalProdOut = produtoOutubro.reduce((s, i) => s + i.value, 0);
  const totalProdNov = produtoNovembro.reduce((s, i) => s + i.value, 0);
  
  return (
    <ChartCard title={title} subtitle={subtitle} delay={delay}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tipo de Vídeo */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Video className="h-4 w-4 text-primary" />
            Tipo de Vídeo
          </h4>
          <ComparisonTable 
            data={videoData}
            totalOut={totalVideoOut}
            totalNov={totalVideoNov}
            icon={<Video className="h-4 w-4 text-primary" />}
            accentColor="bg-primary/10 border-primary/30"
          />
        </div>
        
        {/* Produtos */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Package className="h-4 w-4 text-accent" />
            Produtos
          </h4>
          <ComparisonTable 
            data={produtoData}
            totalOut={totalProdOut}
            totalNov={totalProdNov}
            icon={<Package className="h-4 w-4 text-accent" />}
            accentColor="bg-accent/10 border-accent/30"
          />
        </div>
      </div>
    </ChartCard>
  );
}
