import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DetailedComparison } from "@/components/dashboard/DetailedComparison";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { HorizontalBarChart } from "@/components/dashboard/HorizontalBarChart";
import { ProductivityHighlights } from "@/components/dashboard/ProductivityHighlights";
import { CategoryHighlights } from "@/components/dashboard/CategoryHighlights";
import { PresentationMode, TOTAL_SLIDES } from "@/components/presentation/PresentationMode";
import { usePresentation } from "@/hooks/usePresentation";
import {
  tipoVideoOutubro,
  tipoVideoNovembro,
  produtoOutubro,
  produtoNovembro,
  findBestPerformer,
} from "@/data/dashboardData";
import { Video, Package } from "lucide-react";

const Index = () => {
  const presentation = usePresentation(TOTAL_SLIDES);

  // Calcular totais
  const totalVideoOut = tipoVideoOutubro.reduce((s, i) => s + i.value, 0);
  const totalVideoNov = tipoVideoNovembro.reduce((s, i) => s + i.value, 0);
  const totalProdOut = produtoOutubro.reduce((s, i) => s + i.value, 0);
  const totalProdNov = produtoNovembro.reduce((s, i) => s + i.value, 0);

  // Destaques
  const bestVideoOut = findBestPerformer(tipoVideoOutubro);
  const bestVideoNov = findBestPerformer(tipoVideoNovembro);
  
  const bestProdOut = findBestPerformer(produtoOutubro);
  const bestProdNov = findBestPerformer(produtoNovembro);

  // Render presentation mode
  if (presentation.isPresenting) {
    return (
      <PresentationMode
        currentSlide={presentation.currentSlide}
        totalSlides={presentation.totalSlides}
        onNext={presentation.nextSlide}
        onPrev={presentation.prevSlide}
        onExit={presentation.exitPresentation}
        onGoToSlide={presentation.goToSlide}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader onStartPresentation={presentation.startPresentation} />

        {/* Resumo Executivo */}
        <ProductivityHighlights />

        {/* Métricas principais */}
        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            Resumo por Categoria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title="Tipo de Vídeo"
              value={totalVideoNov}
              previousValue={totalVideoOut}
              subtitle={`Nov: ${bestVideoNov.name} | Out: ${bestVideoOut.name}`}
              icon={<Video className="h-5 w-5" />}
              variant="primary"
              delay={0}
            />
            <MetricCard
              title="Produtos"
              value={totalProdNov}
              previousValue={totalProdOut}
              subtitle={`Nov: ${bestProdNov.name} | Out: ${bestProdOut.name}`}
              icon={<Package className="h-5 w-5" />}
              variant="accent"
              delay={100}
            />
          </div>
        </section>

        {/* Visão Geral Detalhada */}
        <section className="mb-8">
          <DetailedComparison
            title="Visão Geral - Comparativo Mensal"
            subtitle="Detalhamento completo: Tipo de Vídeo e Produtos - Outubro vs Novembro 2025"
            tipoVideoOutubro={tipoVideoOutubro}
            tipoVideoNovembro={tipoVideoNovembro}
            produtoOutubro={produtoOutubro}
            produtoNovembro={produtoNovembro}
            delay={200}
          />
        </section>

        {/* Tipo de Vídeo */}
        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Tipo de Vídeo
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <DonutChart
              title="Outubro 2025"
              subtitle="Distribuição por categoria"
              data={tipoVideoOutubro}
              delay={300}
              colorType="video"
              badge={`${totalVideoOut} vídeos`}
            />
            <DonutChart
              title="Novembro 2025"
              subtitle="Distribuição por categoria"
              data={tipoVideoNovembro}
              delay={400}
              colorType="video"
              badge={`${totalVideoNov} vídeos`}
            />
          </div>
          <CategoryHighlights
            title="Tipo de Vídeo"
            dataOutubro={tipoVideoOutubro}
            dataNovembro={tipoVideoNovembro}
            totalOutubro={totalVideoOut}
            totalNovembro={totalVideoNov}
          />
        </section>

        {/* Produtos */}
        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-accent" />
            Produtos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <HorizontalBarChart
              title="Outubro 2025"
              subtitle="Produções por produto"
              data={produtoOutubro}
              delay={500}
              badge={`${totalProdOut} produções`}
            />
            <HorizontalBarChart
              title="Novembro 2025"
              subtitle="Produções por produto"
              data={produtoNovembro}
              delay={600}
              badge={`${totalProdNov} produções`}
            />
          </div>
          <CategoryHighlights
            title="Produtos"
            dataOutubro={produtoOutubro}
            dataNovembro={produtoNovembro}
            totalOutubro={totalProdOut}
            totalNovembro={totalProdNov}
          />
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "700ms" }}>
            Dashboard Audiovisual • XMX Corp • Outubro vs Novembro 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
