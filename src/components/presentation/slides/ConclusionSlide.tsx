import { Slide } from "../Slide";
import {
  kpis,
  produtoOutubro,
  produtoNovembro,
  tipoVideoNovembro,
  tipoVideoOutubro,
  calculateGrowth,
} from "@/data/dashboardData";
import { BarChart3, TrendingUp, TrendingDown, Sparkles, Lightbulb } from "lucide-react";
import logoXmx from "@/assets/logoxmx.png";

interface ConclusionSlideProps {
  isActive: boolean;
}

export function ConclusionSlide({ isActive }: ConclusionSlideProps) {
  // Calculate insights
  const garaherbOut = produtoOutubro.find((p) => p.name === "GARAHERB")?.value || 0;
  const garaherbNov = produtoNovembro.find((p) => p.name === "GARAHERB")?.value || 0;
  const garaherbGrowth = calculateGrowth(garaherbNov, garaherbOut);

  const memytsOut = produtoOutubro.find((p) => p.name === "MEMYTS")?.value || 0;
  const memytsNov = produtoNovembro.find((p) => p.name === "MEMYTS")?.value || 0;
  const memytsGrowth = calculateGrowth(memytsNov, memytsOut);

  const newVideoTypes = tipoVideoNovembro.filter(
    (item) => !tipoVideoOutubro.find((o) => o.name === item.name)
  );

  const newProducts = produtoNovembro.filter(
    (item) => !produtoOutubro.find((o) => o.name === item.name)
  );

  return (
    <Slide isActive={isActive} className="bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Conclusões
          </h2>
          <p className="text-muted-foreground text-lg">Principais insights do período</p>
        </div>

        {/* Key insights */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-display text-xl font-semibold text-foreground">Principais Insights</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <TrendingDown className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <p className="text-foreground">
                <span className="font-semibold">Queda de {Math.abs(kpis.variacaoTotal)}%</span> na produção total 
                ({kpis.totalOutubro} → {kpis.totalNovembro} entregas)
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <TrendingUp className="h-5 w-5 text-success mt-0.5 shrink-0" />
              <p className="text-foreground">
                <span className="font-semibold">GARAHERB</span> assumiu liderança em Novembro 
                <span className="text-success font-semibold"> (+{garaherbGrowth}%)</span>
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <TrendingDown className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <p className="text-foreground">
                <span className="font-semibold">MEMYTS</span> caiu de {memytsOut} para {memytsNov} produções
                <span className="text-destructive font-semibold"> ({memytsGrowth}%)</span>
              </p>
            </div>

            {newVideoTypes.length > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-foreground">
                  <span className="font-semibold">Novos tipos de vídeo:</span>{" "}
                  {newVideoTypes.map((t) => t.name).join(", ")}
                </p>
              </div>
            )}

            {newProducts.length > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                <Sparkles className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <p className="text-foreground">
                  <span className="font-semibold">Novos produtos:</span>{" "}
                  {newProducts.map((p) => p.name).join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Opportunities */}
        <div className="bg-muted/30 border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-accent" />
            <h3 className="font-display text-xl font-semibold text-foreground">Oportunidades</h3>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Investigar motivo da queda em MEMYTS
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Expandir estratégia do GARAHERB para outros produtos
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Avaliar desempenho dos novos tipos de vídeo (MICROLEAD, DOWNSELL)
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <img src={logoXmx} alt="XMX Corp" className="h-8 w-auto opacity-60" />
          <span className="text-muted-foreground text-sm">Dashboard Audiovisual • Outubro vs Novembro 2025</span>
        </div>
      </div>
    </Slide>
  );
}
