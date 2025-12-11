import { ChartCard } from "@/components/dashboard/ChartCard";
import { ArrowUp, ArrowDown, Minus, Layers, Target, Users, TrendingUp, Sparkles } from "lucide-react";

interface DataItem {
  name: string;
  value: number;
  percentage: number;
}

interface AdsDetailedComparisonProps {
  title: string;
  subtitle: string;
  nichoOutubro: DataItem[];
  nichoNovembro: DataItem[];
  produtoOutubro: DataItem[];
  produtoNovembro: DataItem[];
  squadOutubro: DataItem[];
  squadNovembro: DataItem[];
}

function combineData(outubro: DataItem[], novembro: DataItem[]) {
  const allNames = new Set([
    ...outubro.map(d => d.name),
    ...novembro.map(d => d.name)
  ]);

  const combined = Array.from(allNames).map(name => {
    const outItem = outubro.find(d => d.name === name);
    const novItem = novembro.find(d => d.name === name);
    const outValue = outItem?.value || 0;
    const novValue = novItem?.value || 0;

    let growth = 0;
    if (outValue === 0 && novValue > 0) growth = 100;
    else if (outValue > 0 && novValue === 0) growth = -100;
    else if (outValue > 0) growth = ((novValue - outValue) / outValue) * 100;

    return {
      name,
      outubro: outValue,
      novembro: novValue,
      growth,
      isNew: outValue === 0 && novValue > 0,
      isGone: outValue > 0 && novValue === 0,
    };
  });

  return combined.sort((a, b) => b.novembro - a.novembro);
}

function GrowthBadge({ growth, size = "sm" }: { growth: number; size?: "sm" | "lg" }) {
  const isLarge = size === "lg";

  if (growth > 0) {
    return (
      <span className={`inline-flex items-center gap-1 font-bold ${isLarge ? 'text-lg px-3 py-1 rounded-full bg-green-500/20' : ''} text-green-400`}>
        <ArrowUp className={isLarge ? "w-5 h-5" : "w-3 h-3"} />
        +{growth.toFixed(1)}%
      </span>
    );
  } else if (growth < 0) {
    return (
      <span className={`inline-flex items-center gap-1 font-bold ${isLarge ? 'text-lg px-3 py-1 rounded-full bg-red-500/20' : ''} text-red-400`}>
        <ArrowDown className={isLarge ? "w-5 h-5" : "w-3 h-3"} />
        {growth.toFixed(1)}%
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 text-muted-foreground ${isLarge ? 'text-lg' : ''}`}>
      <Minus className={isLarge ? "w-5 h-5" : "w-3 h-3"} />
      0%
    </span>
  );
}

interface ComparisonTableProps {
  title: string;
  icon: React.ElementType;
  data: ReturnType<typeof combineData>;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
  delay: number;
}

function ComparisonTable({ title, icon: Icon, data, gradientFrom, gradientTo, iconColor, delay }: ComparisonTableProps) {
  const totalOutubro = data.reduce((sum, item) => sum + item.outubro, 0);
  const totalNovembro = data.reduce((sum, item) => sum + item.novembro, 0);
  const totalGrowth = totalOutubro > 0 ? ((totalNovembro - totalOutubro) / totalOutubro) * 100 : 0;
  const filteredData = data.filter(item => item.name !== "VAZIO");
  const topItem = filteredData[0];

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/80 to-card border border-border/50 p-5 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background gradient decoration */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-lg">{title}</h4>
            <p className="text-xs text-muted-foreground">{filteredData.length} itens ativos</p>
          </div>
        </div>
        <GrowthBadge growth={totalGrowth} size="lg" />
      </div>

      {/* Total Summary Card */}
      <div className="relative mb-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className={`w-5 h-5 ${iconColor}`} />
            <span className="font-semibold text-foreground">Total de ADS</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{totalOutubro}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Outubro</div>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{totalNovembro}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Novembro</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Item Highlight */}
      {topItem && (
        <div className={`mb-4 p-3 rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-opacity-20`}>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Top {title.slice(0, -1)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm truncate max-w-[60%]">{topItem.name}</span>
            <span className="text-white/80 font-semibold">{topItem.novembro} ads</span>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-1.5">
        {filteredData.map((item, index) => {
          const maxValue = Math.max(totalOutubro, totalNovembro);
          const barWidthOut = maxValue > 0 ? (item.outubro / maxValue) * 100 : 0;
          const barWidthNov = maxValue > 0 ? (item.novembro / maxValue) * 100 : 0;

          return (
            <div
              key={item.name}
              className="group relative p-2.5 rounded-lg hover:bg-muted/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${index < 3 ? `bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white` : 'bg-muted text-muted-foreground'}`}>
                    {index + 1}
                  </span>
                  <span className="text-foreground text-sm font-medium truncate">{item.name}</span>
                  {item.isNew && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full animate-pulse">
                      NOVO
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`font-semibold ${item.outubro > 0 ? 'text-blue-400' : 'text-muted-foreground/50'}`}>
                      {item.outubro}
                    </span>
                    <span className="text-muted-foreground/50">→</span>
                    <span className={`font-semibold ${item.novembro > 0 ? 'text-purple-400' : 'text-muted-foreground/50'}`}>
                      {item.novembro}
                    </span>
                  </div>
                  <div className="w-14 text-right">
                    <GrowthBadge growth={item.growth} />
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="flex gap-1 h-1.5">
                <div className="flex-1 bg-blue-950/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${barWidthOut}%` }}
                  />
                </div>
                <div className="flex-1 bg-purple-950/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500"
                    style={{ width: `${barWidthNov}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
          <span className="text-xs text-muted-foreground">Outubro</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-400" />
          <span className="text-xs text-muted-foreground">Novembro</span>
        </div>
      </div>
    </div>
  );
}

export function AdsDetailedComparison({
  title,
  subtitle,
  nichoOutubro,
  nichoNovembro,
  produtoOutubro,
  produtoNovembro,
  squadOutubro,
  squadNovembro,
}: AdsDetailedComparisonProps) {
  const nichoData = combineData(nichoOutubro, nichoNovembro);
  const produtoData = combineData(produtoOutubro, produtoNovembro);
  const squadData = combineData(squadOutubro, squadNovembro);

  return (
    <ChartCard title={title} subtitle={subtitle} delay={0}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        <ComparisonTable
          title="Nichos"
          icon={Layers}
          data={nichoData}
          gradientFrom="from-yellow-500"
          gradientTo="to-orange-500"
          iconColor="text-yellow-400"
          delay={100}
        />
        <ComparisonTable
          title="Produtos"
          icon={Target}
          data={produtoData}
          gradientFrom="from-purple-500"
          gradientTo="to-pink-500"
          iconColor="text-purple-400"
          delay={200}
        />
        <ComparisonTable
          title="Squads"
          icon={Users}
          data={squadData}
          gradientFrom="from-green-500"
          gradientTo="to-emerald-500"
          iconColor="text-green-400"
          delay={300}
        />
      </div>
    </ChartCard>
  );
}
