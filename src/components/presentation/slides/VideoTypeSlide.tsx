import { Slide } from "../Slide";
import { DonutChart } from "@/components/dashboard/DonutChart";
import {
  tipoVideoOutubro,
  tipoVideoNovembro,
  calculateGrowth,
  findBestPerformer,
} from "@/data/dashboardData";
import { Trophy, TrendingDown, Sparkles, Video } from "lucide-react";

interface VideoTypeSlideProps {
  isActive: boolean;
}

export function VideoTypeSlide({ isActive }: VideoTypeSlideProps) {
  const totalOut = tipoVideoOutubro.reduce((s, i) => s + i.value, 0);
  const totalNov = tipoVideoNovembro.reduce((s, i) => s + i.value, 0);

  const bestOut = findBestPerformer(tipoVideoOutubro);
  const bestNov = findBestPerformer(tipoVideoNovembro);

  // Find biggest drop
  const drops = tipoVideoOutubro
    .map((item) => {
      const novItem = tipoVideoNovembro.find((n) => n.name === item.name);
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

  // New categories
  const newCategories = tipoVideoNovembro.filter(
    (item) => !tipoVideoOutubro.find((o) => o.name === item.name)
  );

  return (
    <Slide isActive={isActive}>
      <div className="w-full max-w-7xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Video className="h-8 w-8 text-primary" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Tipo de Vídeo
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">Distribuição por categoria</p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonutChart
            title="Outubro 2025"
            subtitle="Distribuição por categoria"
            data={tipoVideoOutubro}
            colorType="video"
            badge={`${totalOut} vídeos`}
          />
          <DonutChart
            title="Novembro 2025"
            subtitle="Distribuição por categoria"
            data={tipoVideoNovembro}
            colorType="video"
            badge={`${totalNov} vídeos`}
          />
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 flex items-start gap-3">
            <Trophy className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Mais Produzido</p>
              <p className="font-semibold text-foreground">{bestOut.name}</p>
              <p className="text-xs text-muted-foreground">Líder em ambos os meses</p>
            </div>
          </div>

          {biggestDrop && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-start gap-3">
              <TrendingDown className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Maior Queda</p>
                <p className="font-semibold text-foreground">{biggestDrop.name}</p>
                <p className="text-xs text-destructive">{biggestDrop.growth}% ({biggestDrop.out} → {biggestDrop.nov})</p>
              </div>
            </div>
          )}

          {newCategories.length > 0 && (
            <div className="bg-success/10 border border-success/30 rounded-xl p-4 flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Novos em Nov</p>
                <p className="font-semibold text-foreground">{newCategories.map((c) => c.name).join(", ")}</p>
                <p className="text-xs text-success">Novas categorias</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Slide>
  );
}
