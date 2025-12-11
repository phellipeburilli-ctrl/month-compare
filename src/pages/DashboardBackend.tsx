import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { BackendHighlights } from "@/components/dashboard-backend/BackendHighlights";
import { BackendDetailedComparison } from "@/components/dashboard-backend/BackendDetailedComparison";
import { BackendComparisonBarChart } from "@/components/dashboard-backend/BackendComparisonBarChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Server, Code, Layers, Flag, Loader2, RefreshCcw, Key, AlertCircle } from "lucide-react";
import {
    useClickUpData,
    calculateGrowth,
    saveApiToken,
    getApiToken,
    clearApiToken,
} from "@/hooks/useClickUpData";
import {
    tipoTarefaOutubro,
    tipoTarefaNovembro,
    responsavelOutubro,
    responsavelNovembro,
    prioridadeOutubro,
    prioridadeNovembro,
    moduloOutubro,
    moduloNovembro,
    totalBackendOutubro,
    totalBackendNovembro,
    kpisBackend,
    getTipoTarefaColor,
    getModuloColor,
} from "@/data/dashboardBackendData";

const DashboardBackend = () => {
    const [apiToken, setApiToken] = useState<string | null>(null);
    const [tokenInput, setTokenInput] = useState("");
    const [useRealData, setUseRealData] = useState(false);

    const { data: clickUpData, loading, error, refetch } = useClickUpData(useRealData ? apiToken : null);

    // Carregar token do localStorage
    useEffect(() => {
        const savedToken = getApiToken();
        if (savedToken) {
            setApiToken(savedToken);
        }
    }, []);

    // Salvar token
    const handleSaveToken = () => {
        if (tokenInput.trim()) {
            saveApiToken(tokenInput.trim());
            setApiToken(tokenInput.trim());
            setTokenInput("");
        }
    };

    // Limpar token
    const handleClearToken = () => {
        clearApiToken();
        setApiToken(null);
        setUseRealData(false);
    };

    // Dados a serem usados (mock ou real)
    const currentData = {
        outubro: {
            total: useRealData && clickUpData ? clickUpData.outubro.total : totalBackendOutubro,
            tipoTarefa: useRealData && clickUpData ? clickUpData.outubro.tipoTarefa : tipoTarefaOutubro,
            responsavel: useRealData && clickUpData ? clickUpData.outubro.responsavel : responsavelOutubro,
            prioridade: useRealData && clickUpData ? clickUpData.outubro.prioridade : prioridadeOutubro,
            modulo: useRealData && clickUpData ? clickUpData.outubro.modulo : moduloOutubro,
        },
        novembro: {
            total: useRealData && clickUpData ? clickUpData.novembro.total : totalBackendNovembro,
            tipoTarefa: useRealData && clickUpData ? clickUpData.novembro.tipoTarefa : tipoTarefaNovembro,
            responsavel: useRealData && clickUpData ? clickUpData.novembro.responsavel : responsavelNovembro,
            prioridade: useRealData && clickUpData ? clickUpData.novembro.prioridade : prioridadeNovembro,
            modulo: useRealData && clickUpData ? clickUpData.novembro.modulo : moduloNovembro,
        }
    };

    const totalGeral = currentData.outubro.total + currentData.novembro.total;
    const variacaoTotal = calculateGrowth(currentData.novembro.total, currentData.outubro.total);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader
                    title="Dashboard Backend"
                    subtitle="Análise Comparativa • Equipe de Desenvolvimento"
                    dashboardType="ads"
                />

                <main className="space-y-8">
                    {/* API Configuration Card */}
                    <section className="p-4 rounded-xl bg-card border border-border">
                        <div className="flex items-center gap-2 mb-3">
                            <Key className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Configuração da API ClickUp</h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {!apiToken ? (
                                <>
                                    <Input
                                        type="password"
                                        placeholder="Cole seu API Token do ClickUp"
                                        value={tokenInput}
                                        onChange={(e) => setTokenInput(e.target.value)}
                                        className="max-w-md"
                                    />
                                    <Button onClick={handleSaveToken} disabled={!tokenInput.trim()}>
                                        Salvar Token
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <span className="text-sm text-muted-foreground">
                                        Token configurado: {apiToken.slice(0, 15)}...
                                    </span>
                                    <Button
                                        variant={useRealData ? "default" : "outline"}
                                        onClick={() => setUseRealData(!useRealData)}
                                        disabled={loading}
                                    >
                                        {useRealData ? "Usando Dados Reais" : "Usar Dados Reais"}
                                    </Button>
                                    {useRealData && (
                                        <Button variant="outline" onClick={refetch} disabled={loading}>
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
                                        </Button>
                                    )}
                                    <Button variant="ghost" onClick={handleClearToken} className="text-red-400">
                                        Remover Token
                                    </Button>
                                </>
                            )}
                        </div>

                        {loading && (
                            <div className="flex items-center gap-2 mt-3 text-primary">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">Buscando dados do ClickUp...</span>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-2 mt-3 text-red-400">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {!useRealData && (
                            <p className="text-xs text-muted-foreground mt-2">
                                📊 Exibindo dados mockados. Configure seu token e clique em "Usar Dados Reais" para dados do ClickUp.
                            </p>
                        )}
                    </section>

                    {/* KPIs Principais */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            title="Total Outubro"
                            value={currentData.outubro.total}
                            previousValue={0}
                            subtitle="Tarefas aprovadas"
                            icon={<Server className="w-5 h-5" />}
                            variant="primary"
                            delay={0}
                        />
                        <MetricCard
                            title="Total Novembro"
                            value={currentData.novembro.total}
                            previousValue={currentData.outubro.total}
                            subtitle="Tarefas aprovadas"
                            icon={<Server className="w-5 h-5" />}
                            variant="accent"
                            delay={100}
                        />
                        <MetricCard
                            title="Total Geral"
                            value={totalGeral}
                            previousValue={0}
                            subtitle="Soma dos dois meses"
                            icon={<Code className="w-5 h-5" />}
                            variant="success"
                            delay={200}
                        />
                        <InsightCard
                            title="Variação Mensal"
                            value={`${variacaoTotal > 0 ? '+' : ''}${variacaoTotal}%`}
                            description={variacaoTotal >= 0 ? "Crescimento no período" : "Redução no período"}
                            icon={variacaoTotal >= 0 ? TrendingUp : TrendingDown}
                            variant={variacaoTotal >= 0 ? "success" : "warning"}
                            delay={300}
                        />
                    </section>

                    {/* Destaques Visuais - Apenas com dados mock por enquanto */}
                    {!useRealData && (
                        <section>
                            <BackendHighlights />
                        </section>
                    )}

                    {/* Gráficos Comparativos de Barras */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-primary" />
                            Comparativo Mensal - Evolução
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <BackendComparisonBarChart
                                title="Tipos de Tarefa - Outubro vs Novembro"
                                subtitle="Comparativo de entregas por tipo"
                                dataOutubro={currentData.outubro.tipoTarefa}
                                dataNovembro={currentData.novembro.tipoTarefa}
                                delay={0}
                            />
                            <BackendComparisonBarChart
                                title="Módulos - Outubro vs Novembro"
                                subtitle="Comparativo de entregas por módulo"
                                dataOutubro={currentData.outubro.modulo}
                                dataNovembro={currentData.novembro.modulo}
                                delay={100}
                            />
                        </div>
                    </section>

                    {/* Comparativo Detalhado */}
                    <section>
                        <BackendDetailedComparison
                            title="Visão Geral - Comparativo Mensal"
                            subtitle="Análise detalhada por categoria"
                            tipoOutubro={currentData.outubro.tipoTarefa}
                            tipoNovembro={currentData.novembro.tipoTarefa}
                            responsavelOutubro={currentData.outubro.responsavel}
                            responsavelNovembro={currentData.novembro.responsavel}
                            prioridadeOutubro={currentData.outubro.prioridade}
                            prioridadeNovembro={currentData.novembro.prioridade}
                        />
                    </section>

                    {/* Tipos de Tarefa */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-primary" />
                            Distribuição por Tipo de Tarefa
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DonutChart
                                title="Tipos - Outubro"
                                subtitle={`${currentData.outubro.total} entregas`}
                                data={currentData.outubro.tipoTarefa}
                                delay={0}
                                colorFn={getTipoTarefaColor}
                            />
                            <DonutChart
                                title="Tipos - Novembro"
                                subtitle={`${currentData.novembro.total} entregas`}
                                data={currentData.novembro.tipoTarefa}
                                delay={100}
                                colorFn={getTipoTarefaColor}
                            />
                        </div>
                    </section>

                    {/* Módulos */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Flag className="w-5 h-5 text-primary" />
                            Distribuição por Módulo
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DonutChart
                                title="Módulos - Outubro"
                                subtitle={`${currentData.outubro.total} entregas`}
                                data={currentData.outubro.modulo}
                                delay={0}
                                colorFn={getModuloColor}
                            />
                            <DonutChart
                                title="Módulos - Novembro"
                                subtitle={`${currentData.novembro.total} entregas`}
                                data={currentData.novembro.modulo}
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

export default DashboardBackend;
