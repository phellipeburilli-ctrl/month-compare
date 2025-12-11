import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { AdsDetailedComparison } from "@/components/dashboard-ads/AdsDetailedComparison";
import { AdsHighlights } from "@/components/dashboard-ads/AdsHighlights";
import { AdsComparisonBarChart } from "@/components/dashboard-ads/AdsComparisonBarChart";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { usePresentation } from "@/hooks/usePresentation";
import { AdsPresentationMode } from "@/components/presentation-ads/AdsPresentationMode";
import { TrendingUp, TrendingDown, Target, Layers, Users, BarChart3 } from "lucide-react";
import {
  produtoAdsOutubro,
  produtoAdsNovembro,
  nichoOutubro,
  nichoNovembro,
  squadOutubro,
  squadNovembro,
  totalAdsOutubro,
  totalAdsNovembro,
  kpisAds,
  getNichoColor,
  getSquadColor,
} from "@/data/dashboardAdsData";

const DashboardAds = () => {
  const { isPresenting, currentSlide, startPresentation, exitPresentation, goToSlide, nextSlide, prevSlide } = usePresentation(6);

  if (isPresenting) {
    return (
      <AdsPresentationMode
        currentSlide={currentSlide}
        totalSlides={6}
        onNext={nextSlide}
        onPrev={prevSlide}
        onExit={exitPresentation}
        onGoToSlide={goToSlide}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader 
          onStartPresentation={startPresentation} 
          title="Dashboard ADS"
          subtitle="Análise Comparativa • Equipe de Anúncios"
          dashboardType="ads"
        />
        
        <main className="space-y-8">
          {/* KPIs Principais */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Outubro"
              value={totalAdsOutubro}
              previousValue={0}
              subtitle="Anúncios produzidos"
              icon={<BarChart3 className="w-5 h-5" />}
              variant="primary"
              delay={0}
            />
            <MetricCard
              title="Total Novembro"
              value={totalAdsNovembro}
              previousValue={totalAdsOutubro}
              subtitle="Anúncios produzidos"
              icon={<BarChart3 className="w-5 h-5" />}
              variant="accent"
              delay={100}
            />
            <MetricCard
              title="Total Geral"
              value={kpisAds.totalGeral}
              previousValue={0}
              subtitle="Soma dos dois meses"
              icon={<Target className="w-5 h-5" />}
              variant="success"
              delay={200}
            />
            <InsightCard
              title="Variação Mensal"
              value={`${kpisAds.variacaoTotal > 0 ? '+' : ''}${kpisAds.variacaoTotal}%`}
              description={kpisAds.variacaoTotal >= 0 ? "Crescimento no período" : "Redução no período"}
              icon={kpisAds.variacaoTotal >= 0 ? TrendingUp : TrendingDown}
              variant={kpisAds.variacaoTotal >= 0 ? "success" : "warning"}
              delay={300}
            />
          </section>

          {/* Destaques Visuais */}
          <section>
            <AdsHighlights />
          </section>

          {/* Gráficos Comparativos de Barras */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Comparativo Mensal - Evolução
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AdsComparisonBarChart
                title="Produtos - Outubro vs Novembro"
                subtitle="Comparativo de produção por produto"
                dataOutubro={produtoAdsOutubro}
                dataNovembro={produtoAdsNovembro}
                delay={0}
              />
              <AdsComparisonBarChart
                title="Nichos - Outubro vs Novembro"
                subtitle="Comparativo de produção por nicho"
                dataOutubro={nichoOutubro}
                dataNovembro={nichoNovembro}
                delay={100}
              />
            </div>
          </section>

          {/* Comparativo Detalhado */}
          <section>
            <AdsDetailedComparison
              title="Visão Geral - Comparativo Mensal"
              subtitle="Análise detalhada por categoria"
              nichoOutubro={nichoOutubro}
              nichoNovembro={nichoNovembro}
              produtoOutubro={produtoAdsOutubro}
              produtoNovembro={produtoAdsNovembro}
              squadOutubro={squadOutubro}
              squadNovembro={squadNovembro}
            />
          </section>

          {/* Nichos */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Distribuição por Nicho
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DonutChart
                title="Nichos - Outubro"
                subtitle={`${totalAdsOutubro} anúncios`}
                data={nichoOutubro.filter(n => n.name !== "VAZIO")}
                delay={0}
                colorFn={getNichoColor}
              />
              <DonutChart
                title="Nichos - Novembro"
                subtitle={`${totalAdsNovembro} anúncios`}
                data={nichoNovembro}
                delay={100}
                colorFn={getNichoColor}
              />
            </div>
          </section>

          {/* Squads */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Distribuição por Squad
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DonutChart
                title="Squads - Outubro"
                subtitle={`${totalAdsOutubro} anúncios`}
                data={squadOutubro}
                delay={0}
                colorFn={getSquadColor}
              />
              <DonutChart
                title="Squads - Novembro"
                subtitle={`${totalAdsNovembro} anúncios`}
                data={squadNovembro}
                delay={100}
                colorFn={getSquadColor}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardAds;
