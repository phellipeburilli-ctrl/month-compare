import { ChartCard } from "@/components/dashboard/ChartCard";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, LabelList, Cell } from "recharts";
import { useMemo } from "react";
import { getProductColor } from "@/data/dashboardBackendData";

interface DataItem {
    name: string;
    value: number;
    percentage: number;
}

interface BackendModulesChartProps {
    title: string;
    subtitle: string;
    dataOutubro: DataItem[];
    dataNovembro: DataItem[];
    delay?: number;
}

export function BackendModulesChart({
    title,
    subtitle,
    dataOutubro,
    dataNovembro,
    delay = 0,
}: BackendModulesChartProps) {
    // Combine and prepare data for bar chart
    const chartData = useMemo(() => {
        // Get all unique module names
        const allNames = new Set([
            ...dataOutubro.map(d => d.name),
            ...dataNovembro.map(d => d.name)
        ]);

        // Create combined data and sort by total
        const combined = Array.from(allNames).map(name => {
            const outItem = dataOutubro.find(d => d.name === name);
            const novItem = dataNovembro.find(d => d.name === name);

            const outubroValue = outItem?.value || 0;
            const novembroValue = novItem?.value || 0;

            return {
                name: name.length > 15 ? name.substring(0, 15) + '...' : name,
                fullName: name,
                outubro: outubroValue,
                novembro: novembroValue,
                total: outubroValue + novembroValue,
                color: getProductColor(name)
            };
        }).sort((a, b) => b.total - a.total);

        return combined.slice(0, 8); // Top 8 most relevant modules only
    }, [dataOutubro, dataNovembro]);

    return (
        <ChartCard title={title} subtitle={subtitle} delay={delay}>
            {/* Product color legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 mb-6">
                {chartData.map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                        <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-xs text-muted-foreground">{item.fullName}</span>
                    </div>
                ))}
            </div>

            <div className="w-full" style={{ height: '450px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="horizontal"
                        margin={{ top: 30, right: 30, left: 20, bottom: 80 }}
                        barGap={4}
                        barCategoryGap="25%"
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                        <XAxis
                            type="category"
                            dataKey="name"
                            stroke="#64748B"
                            fontSize={11}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={{ stroke: '#E2E8F0' }}
                            angle={-35}
                            textAnchor="end"
                            height={80}
                            interval={0}
                        />
                        <YAxis
                            type="number"
                            stroke="#94A3B8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                padding: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                            }}
                            formatter={(value: number, name: string) => {
                                const labels: Record<string, string> = {
                                    outubro: "Outubro",
                                    novembro: "Novembro"
                                };
                                return [<span className="font-bold">{value} entregas</span>, labels[name] || name];
                            }}
                            labelFormatter={(label) => {
                                const item = chartData.find(d => d.name === label);
                                return item?.fullName || label;
                            }}
                        />

                        {/* Outubro Bar - with product colors (lighter opacity) */}
                        <Bar
                            dataKey="outubro"
                            radius={[4, 4, 0, 0]}
                            name="outubro"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`out-${index}`} fill={entry.color} fillOpacity={0.6} />
                            ))}
                            <LabelList
                                dataKey="outubro"
                                position="top"
                                fontSize={10}
                                fill="#475569"
                                fontWeight="600"
                                formatter={(val: number) => val > 0 ? val : ''}
                            />
                        </Bar>

                        {/* Novembro Bar - with product colors (full opacity) */}
                        <Bar
                            dataKey="novembro"
                            radius={[4, 4, 0, 0]}
                            name="novembro"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`nov-${index}`} fill={entry.color} fillOpacity={1} />
                            ))}
                            <LabelList
                                dataKey="novembro"
                                position="top"
                                fontSize={10}
                                fill="#1E293B"
                                fontWeight="700"
                                formatter={(val: number) => val > 0 ? val : ''}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Month indicator and Summary Stats */}
            <div className="flex justify-center gap-6 mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-2 rounded-sm opacity-60 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                    <span className="text-xs text-muted-foreground">Outubro (mais claro)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-2 rounded-sm bg-gradient-to-r from-purple-600 to-blue-600"></div>
                    <span className="text-xs text-muted-foreground">Novembro (mais escuro)</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                        {dataOutubro.reduce((sum, item) => sum + item.value, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Outubro</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">
                        {dataNovembro.reduce((sum, item) => sum + item.value, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Novembro</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-slate-700">
                        {dataOutubro.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Mês Out</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-slate-700">
                        {dataNovembro.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Mês Nov</p>
                </div>
            </div>
        </ChartCard>
    );
}
