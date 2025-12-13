import { ChartCard } from "@/components/dashboard/ChartCard";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, LabelList, Cell } from "recharts";
import { Package, Smartphone, Users, Briefcase, Zap, Target } from "lucide-react";
import { useMemo } from "react";
import { getProductColor, getPlatformColor, getNichoColor } from "@/data/dashboardBackendData";

interface DataItem {
    name: string;
    value: number;
    percentage: number;
}

interface BackendCustomFieldsComparisonProps {
    title: string;
    subtitle: string;
    produtoBlackOutubro: DataItem[];
    produtoBlackNovembro: DataItem[];
    plataformaOutubro: DataItem[];
    plataformaNovembro: DataItem[];
    squadsOutubro: DataItem[];
    squadsNovembro: DataItem[];
    nichosOutubro: DataItem[];
    nichosNovembro: DataItem[];
    setorXmxOutubro: DataItem[];
    setorXmxNovembro: DataItem[];
}

const COLORS = {
    outubro: "#1D4ED8",    // Azul - Outubro
    novembro: "#059669",   // Verde - Novembro
};

interface HorizontalComparisonChartProps {
    title: string;
    icon: React.ElementType;
    dataOutubro: DataItem[];
    dataNovembro: DataItem[];
    delay?: number;
    maxItems?: number;
}

function HorizontalComparisonChart({
    title,
    icon: Icon,
    dataOutubro,
    dataNovembro,
    delay = 0,
    maxItems = 8
}: HorizontalComparisonChartProps) {
    const chartData = useMemo(() => {
        const allNames = new Set([
            ...dataOutubro.map(d => d.name),
            ...dataNovembro.map(d => d.name)
        ]);

        const combined = Array.from(allNames).map(name => {
            const outItem = dataOutubro.find(d => d.name === name);
            const novItem = dataNovembro.find(d => d.name === name);

            return {
                name: name.length > 18 ? name.substring(0, 18) + '...' : name,
                fullName: name,
                outubro: outItem?.value || 0,
                novembro: novItem?.value || 0,
                total: (outItem?.value || 0) + (novItem?.value || 0)
            };
        }).sort((a, b) => b.total - a.total);

        return combined.slice(0, maxItems);
    }, [dataOutubro, dataNovembro, maxItems]);

    const height = Math.max(280, chartData.length * 60);

    return (
        <ChartCard
            title={title}
            subtitle={`Comparativo Outubro vs Novembro`}
            delay={delay}
        >
            <div className="flex gap-4 mt-3 mb-4 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.outubro }}></div>
                    <span className="text-xs text-muted-foreground">Outubro</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.novembro }}></div>
                    <span className="text-xs text-muted-foreground">Novembro</span>
                </div>
            </div>

            <div className="w-full" style={{ height: `${height}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 5, right: 40, left: 80, bottom: 5 }}
                        barGap={2}
                        barCategoryGap="30%"
                    >
                        <XAxis
                            type="number"
                            stroke="#94A3B8"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            stroke="#64748B"
                            fontSize={11}
                            fontWeight={500}
                            width={80}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                padding: "10px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                            }}
                            formatter={(value: number, name: string) => [
                                <span className="font-bold">{value}</span>,
                                name === "outubro" ? "Outubro" : "Novembro"
                            ]}
                            labelFormatter={(label) => {
                                const item = chartData.find(d => d.name === label);
                                return item?.fullName || label;
                            }}
                        />

                        <Bar
                            dataKey="outubro"
                            fill={COLORS.outubro}
                            radius={[0, 4, 4, 0]}
                            barSize={14}
                        >
                            <LabelList
                                dataKey="outubro"
                                position="right"
                                fontSize={10}
                                fill="#1D4ED8"
                                fontWeight="600"
                                formatter={(val: number) => val > 0 ? val : ''}
                            />
                        </Bar>

                        <Bar
                            dataKey="novembro"
                            fill={COLORS.novembro}
                            radius={[0, 4, 4, 0]}
                            barSize={14}
                        >
                            <LabelList
                                dataKey="novembro"
                                position="right"
                                fontSize={10}
                                fill="#059669"
                                fontWeight="600"
                                formatter={(val: number) => val > 0 ? val : ''}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    );
}

interface ProductComparisonChartProps {
    title: string;
    subtitle?: string;
    dataOutubro: DataItem[];
    dataNovembro: DataItem[];
    delay?: number;
    maxItems?: number;
    colorFn?: (name: string) => string;
}

function ProductComparisonChart({
    title,
    subtitle,
    dataOutubro,
    dataNovembro,
    delay = 0,
    maxItems = 10,
    colorFn = getProductColor
}: ProductComparisonChartProps) {
    const chartData = useMemo(() => {
        const allNames = new Set([
            ...dataOutubro.map(d => d.name),
            ...dataNovembro.map(d => d.name)
        ]);

        const combined = Array.from(allNames).map(name => {
            const outItem = dataOutubro.find(d => d.name === name);
            const novItem = dataNovembro.find(d => d.name === name);

            // Clean product name (remove emojis)
            const cleanName = name.replace(/[^\w\s\u00C0-\u00FF]/g, '').trim();

            return {
                name: cleanName.length > 15 ? cleanName.substring(0, 15) + '...' : cleanName,
                fullName: cleanName,
                outubro: outItem?.value || 0,
                novembro: novItem?.value || 0,
                total: (outItem?.value || 0) + (novItem?.value || 0),
                color: colorFn(cleanName)
            };
        }).sort((a, b) => b.total - a.total);

        return combined.slice(0, maxItems);
    }, [dataOutubro, dataNovembro, maxItems, colorFn]);

    const height = Math.max(400, chartData.length * 50);

    return (
        <ChartCard
            title={title}
            subtitle={`Top ${maxItems} Produtos - Comparativo Mensal`}
            delay={delay}
        >
            {/* Color legend for products */}
            <div className="flex flex-wrap gap-3 mt-3 mb-4 justify-center">
                {chartData.slice(0, 8).map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                        <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-xs text-muted-foreground">{item.fullName}</span>
                    </div>
                ))}
            </div>

            <div className="w-full" style={{ height: `${height}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 5, right: 50, left: 100, bottom: 5 }}
                        barGap={2}
                        barCategoryGap="25%"
                    >
                        <XAxis
                            type="number"
                            stroke="#94A3B8"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            stroke="#64748B"
                            fontSize={11}
                            fontWeight={600}
                            width={100}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                padding: "10px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                            }}
                            formatter={(value: number, name: string) => [
                                <span className="font-bold">{value} entregas</span>,
                                name === "outubro" ? "Outubro" : "Novembro"
                            ]}
                            labelFormatter={(label) => {
                                const item = chartData.find(d => d.name === label);
                                return item?.fullName || label;
                            }}
                        />

                        {/* Outubro bars with product colors */}
                        <Bar
                            dataKey="outubro"
                            radius={[0, 4, 4, 0]}
                            barSize={16}
                            name="outubro"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`out-${index}`} fill={entry.color} fillOpacity={0.7} />
                            ))}
                            <LabelList
                                dataKey="outubro"
                                position="right"
                                fontSize={10}
                                fill="#475569"
                                fontWeight="600"
                                formatter={(val: number) => val > 0 ? val : ''}
                            />
                        </Bar>

                        {/* Novembro bars with product colors (full opacity) */}
                        <Bar
                            dataKey="novembro"
                            radius={[0, 4, 4, 0]}
                            barSize={16}
                            name="novembro"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`nov-${index}`} fill={entry.color} fillOpacity={1} />
                            ))}
                            <LabelList
                                dataKey="novembro"
                                position="right"
                                fontSize={10}
                                fill="#1E293B"
                                fontWeight="700"
                                formatter={(val: number) => val > 0 ? val : ''}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Month indicator */}
            <div className="flex justify-center gap-6 mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-2 rounded-sm bg-gradient-to-r from-purple-300 to-purple-400"></div>
                    <span className="text-xs text-muted-foreground">Outubro (mais claro)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-2 rounded-sm bg-gradient-to-r from-purple-500 to-purple-600"></div>
                    <span className="text-xs text-muted-foreground">Novembro (mais escuro)</span>
                </div>
            </div>
        </ChartCard>
    );
}

export function BackendCustomFieldsComparison({
    title,
    subtitle,
    produtoBlackOutubro,
    produtoBlackNovembro,
    plataformaOutubro,
    plataformaNovembro,
    squadsOutubro,
    squadsNovembro,
    nichosOutubro,
    nichosNovembro,
    setorXmxOutubro,
    setorXmxNovembro,
}: BackendCustomFieldsComparisonProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                <div>
                    <h2 className="text-xl font-bold text-foreground">{title}</h2>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
            </div>

            {/* Destaque: Produto Black - Full width with product colors */}
            <ProductComparisonChart
                title="Produto Black"
                dataOutubro={produtoBlackOutubro}
                dataNovembro={produtoBlackNovembro}
                delay={100}
                maxItems={10}
            />

            {/* Grid: Plataforma e Nichos - with custom colors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProductComparisonChart
                    title="Plataforma"
                    subtitle="Comparativo por plataforma"
                    dataOutubro={plataformaOutubro}
                    dataNovembro={plataformaNovembro}
                    delay={200}
                    maxItems={6}
                    colorFn={getPlatformColor}
                />
                <ProductComparisonChart
                    title="Nichos"
                    subtitle="Comparativo por nicho"
                    dataOutubro={nichosOutubro}
                    dataNovembro={nichosNovembro}
                    delay={250}
                    maxItems={6}
                    colorFn={getNichoColor}
                />
            </div>

            {/* Grid: Squads e Setor XMX - mantém cores azul/verde */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HorizontalComparisonChart
                    title="Squads"
                    icon={Users}
                    dataOutubro={squadsOutubro}
                    dataNovembro={squadsNovembro}
                    delay={300}
                    maxItems={6}
                />
                <HorizontalComparisonChart
                    title="Setor XMX"
                    icon={Briefcase}
                    dataOutubro={setorXmxOutubro}
                    dataNovembro={setorXmxNovembro}
                    delay={350}
                    maxItems={6}
                />
            </div>
        </div>
    );
}
