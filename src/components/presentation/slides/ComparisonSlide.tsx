import { Slide } from "../Slide";
import {
  tipoVideoOutubro,
  tipoVideoNovembro,
  produtoOutubro,
  produtoNovembro,
  calculateGrowth,
} from "@/data/dashboardData";
import { TrendingUp, TrendingDown, Minus, Video, Package } from "lucide-react";

interface ComparisonSlideProps {
  isActive: boolean;
}

interface DataItem {
  name: string;
  value: number;
}

function combineData(outubro: DataItem[], novembro: DataItem[]) {
  const combined = new Map<string, { out: number; nov: number }>();
  
  outubro.forEach(item => {
    combined.set(item.name, { out: item.value, nov: 0 });
  });
  
  novembro.forEach(item => {
    const existing = combined.get(item.name);
    if (existing) {
      existing.nov = item.value;
    } else {
      combined.set(item.name, { out: 0, nov: item.value });
    }
  });

  return Array.from(combined.entries())
    .map(([name, values]) => ({
      name,
      outubro: values.out,
      novembro: values.nov,
      growth: calculateGrowth(values.nov, values.out),
    }))
    .sort((a, b) => b.outubro + b.novembro - (a.outubro + a.novembro));
}

function GrowthBadge({ growth, isNew, isGone }: { growth: number; isNew?: boolean; isGone?: boolean }) {
  if (isNew) {
    return <span className="text-xs px-2 py-0.5 rounded bg-success/20 text-success font-medium">NOVO</span>;
  }
  if (isGone) {
    return <span className="text-xs px-2 py-0.5 rounded bg-destructive/20 text-destructive font-medium">-100%</span>;
  }
  if (growth > 0) {
    return (
      <span className="text-success flex items-center gap-1 text-sm font-medium">
        <TrendingUp className="h-3 w-3" />+{growth}%
      </span>
    );
  }
  if (growth < 0) {
    return (
      <span className="text-destructive flex items-center gap-1 text-sm font-medium">
        <TrendingDown className="h-3 w-3" />{growth}%
      </span>
    );
  }
  return (
    <span className="text-muted-foreground flex items-center gap-1 text-sm">
      <Minus className="h-3 w-3" />0%
    </span>
  );
}

export function ComparisonSlide({ isActive }: ComparisonSlideProps) {
  const videoData = combineData(tipoVideoOutubro, tipoVideoNovembro).slice(0, 6);
  const productData = combineData(produtoOutubro, produtoNovembro).slice(0, 7);

  return (
    <Slide isActive={isActive}>
      <div className="w-full max-w-7xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Comparativo Mensal
          </h2>
          <p className="text-muted-foreground text-lg">Outubro vs Novembro 2025</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Types */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Video className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold text-foreground">Tipo de Vídeo</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-4 text-xs text-muted-foreground font-medium pb-2 border-b border-border">
                <span>Categoria</span>
                <span className="text-center">Out</span>
                <span className="text-center">Nov</span>
                <span className="text-right">Var.</span>
              </div>
              {videoData.map((item) => (
                <div key={item.name} className="grid grid-cols-4 items-center text-sm">
                  <span className="text-foreground font-medium truncate">{item.name}</span>
                  <span className="text-center text-muted-foreground">{item.outubro || "-"}</span>
                  <span className="text-center text-foreground">{item.novembro || "-"}</span>
                  <div className="flex justify-end">
                    <GrowthBadge
                      growth={item.growth}
                      isNew={item.outubro === 0}
                      isGone={item.novembro === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-accent" />
              <h3 className="font-display text-xl font-semibold text-foreground">Produtos</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-4 text-xs text-muted-foreground font-medium pb-2 border-b border-border">
                <span>Produto</span>
                <span className="text-center">Out</span>
                <span className="text-center">Nov</span>
                <span className="text-right">Var.</span>
              </div>
              {productData.map((item) => (
                <div key={item.name} className="grid grid-cols-4 items-center text-sm">
                  <span className="text-foreground font-medium truncate">{item.name}</span>
                  <span className="text-center text-muted-foreground">{item.outubro || "-"}</span>
                  <span className="text-center text-foreground">{item.novembro || "-"}</span>
                  <div className="flex justify-end">
                    <GrowthBadge
                      growth={item.growth}
                      isNew={item.outubro === 0}
                      isGone={item.novembro === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
