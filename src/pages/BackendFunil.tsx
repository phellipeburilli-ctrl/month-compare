import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { BackendHighlights } from "@/components/dashboard-backend/BackendHighlights";
import { BackendCustomFieldsComparison } from "@/components/dashboard-backend/BackendCustomFieldsComparison";
import { BackendModulesChart } from "@/components/dashboard-backend/BackendModulesChart";
import { Server, Code, Flag, TrendingUp, TrendingDown } from "lucide-react";

import {
    moduloOutubro, moduloNovembro,
    totalBackendOutubro, totalBackendNovembro,
    kpisBackend,
    getModuloColor,
    produtoBlackOutubro, produtoBlackNovembro,
    plataformaOutubro, plataformaNovembro,
    squadsOutubro, squadsNovembro,
    nichosOutubro, nichosNovembro,
    setorXmxOutubro, setorXmxNovembro
} from "@/data/dashboardBackendData";

const BackendFunil = () => {
    return (
        <div className="min-h-screen bg-background animate-fade-in">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader
                    title="Funil de Desenvolvimento"
                    subtitle="Análise Comparativa • Equipe de Desenvolvimento"
                    dashboardType="ads"
                />

                <main className="space-y-8 mt-8">
                    {/* KPIs Principais */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            title="Total Outubro"
                            value={totalBackendOutubro}
                            previousValue={0}
                            subtitle="Tarefas aprovadas"
                            icon={<Server className="w-5 h-5" />}
                            variant="primary"
                            delay={0}
                        />
                        <MetricCard
                            title="Total Novembro"
                            value={totalBackendNovembro}
                            previousValue={totalBackendOutubro}
                            subtitle="Tarefas aprovadas"
                            icon={<Server className="w-5 h-5" />}
                            variant="accent"
                            delay={100}
                        />
                        <MetricCard
                            title="Total Geral"
                            value={kpisBackend.totalGeral}
                            previousValue={0}
                            subtitle="Soma dos dois meses"
                            icon={<Code className="w-5 h-5" />}
                            variant="success"
                            delay={200}
                        />
                        <InsightCard
                            title="Variação Mensal"
                            value={`${kpisBackend.variacaoTotal > 0 ? '+' : ''}${kpisBackend.variacaoTotal}%`}
                            description={kpisBackend.variacaoTotal >= 0 ? "Crescimento no período" : "Redução no período"}
                            icon={kpisBackend.variacaoTotal >= 0 ? TrendingUp : TrendingDown}
                            variant={kpisBackend.variacaoTotal >= 0 ? "success" : "warning"}
                            delay={300}
                        />
                    </section>

                    {/* Destaques */}
                    <section>
                        <BackendHighlights />
                    </section>

                    {/* Gráficos Comparativos - Módulos */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-primary" />
                            Comparativo Mensal - Módulos
                        </h2>

                        {/* Módulos (Maior destaque) */}
                        <div className="w-full">
                            <BackendModulesChart
                                title="Análise de Módulos (PowerBI Visual)"
                                subtitle="Comparativo de entregas por módulo - Visualização Expandida"
                                dataOutubro={moduloOutubro}
                                dataNovembro={moduloNovembro}
                                delay={100}
                            />
                        </div>
                    </section>

                    {/* Comparativo de Campos Personalizados */}
                    <section>
                        <BackendCustomFieldsComparison
                            title="Análise de Custom Fields"
                            subtitle="Produto Black, Plataforma, Squads e Nichos (Fonte: Planilhas)"
                            produtoBlackOutubro={produtoBlackOutubro}
                            produtoBlackNovembro={produtoBlackNovembro}
                            plataformaOutubro={plataformaOutubro}
                            plataformaNovembro={plataformaNovembro}
                            squadsOutubro={squadsOutubro}
                            squadsNovembro={squadsNovembro}
                            nichosOutubro={nichosOutubro}
                            nichosNovembro={nichosNovembro}
                            setorXmxOutubro={setorXmxOutubro}
                            setorXmxNovembro={setorXmxNovembro}
                        />
                    </section>

                    {/* Distribuições (Donuts) - Apenas Módulos mantido */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Flag className="w-5 h-5 text-primary" />
                            Distribuição por Módulo
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DonutChart
                                title="Módulos - Outubro"
                                subtitle={`${totalBackendOutubro} entregas`}
                                data={moduloOutubro}
                                delay={0}
                                colorFn={getModuloColor}
                            />
                            <DonutChart
                                title="Módulos - Novembro"
                                subtitle={`${totalBackendNovembro} entregas`}
                                data={moduloNovembro}
                                delay={100}
                                colorFn={getModuloColor}
                            />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default BackendFunil;
