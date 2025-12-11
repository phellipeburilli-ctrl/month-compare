import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { TrendingUp, TrendingDown } from "lucide-react";
import { calculateGrowth } from "@/data/dashboardAdsData";

interface AdsComparisonBarChartProps {
  title: string;
  subtitle?: string;
  dataOutubro: Array<{ name: string; value: number; percentage: number }>;
  dataNovembro: Array<{ name: string; value: number; percentage: number }>;
  delay?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const outubro = payload.find((p: any) => p.dataKey === "Outubro")?.value || 0;
    const novembro = payload.find((p: any) => p.dataKey === "Novembro")?.value || 0;
    const crescimento = calculateGrowth(novembro, outubro);
    
    return (
      <div className="powerbi-card p-3 shadow-lg">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-muted-foreground">Outubro:</span>
            <span className="font-medium text-foreground">{outubro}</span>
          </p>
          <p className="text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <span className="text-muted-foreground">Novembro:</span>
            <span className="font-medium text-foreground">{novembro}</span>
          </p>
          <p className="text-sm pt-1 border-t border-border/50 mt-1">
            <span className="text-muted-foreground">Variação:</span>
            <span className={`font-bold ml-1 ${crescimento >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {crescimento >= 0 ? '+' : ''}{crescimento.toFixed(1)}%
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function AdsComparisonBarChart({ 
  title, 
  subtitle, 
  dataOutubro, 
  dataNovembro,
  delay = 0 
}: AdsComparisonBarChartProps) {
  // Combinar dados para gráfico
  const allNames = new Set([
    ...dataOutubro.map(d => d.name),
    ...dataNovembro.map(d => d.name)
  ]);
  
  const chartData = Array.from(allNames)
    .filter(name => name !== "VAZIO")
    .map(name => {
      const outItem = dataOutubro.find(d => d.name === name);
      const novItem = dataNovembro.find(d => d.name === name);
      return {
        name: name.length > 12 ? name.substring(0, 12) + "..." : name,
        fullName: name,
        Outubro: outItem?.value || 0,
        Novembro: novItem?.value || 0,
      };
    })
    .sort((a, b) => (b.Outubro + b.Novembro) - (a.Outubro + a.Novembro));

  // Calcular totais
  const totalOutubro = chartData.reduce((sum, item) => sum + item.Outubro, 0);
  const totalNovembro = chartData.reduce((sum, item) => sum + item.Novembro, 0);
  const totalGrowth = calculateGrowth(totalNovembro, totalOutubro);

  return (
    <ChartCard title={title} subtitle={subtitle} delay={delay}>
      {/* Badge de variação total */}
      <div className="flex items-center justify-end gap-2 mb-4 -mt-2">
        <div className={`flex items-center gap-1.5 ${totalGrowth >= 0 ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'} border rounded-full px-3 py-1`}>
          {totalGrowth >= 0 ? (
            <TrendingUp className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-400" />
          )}
          <span className={`text-xs font-bold ${totalGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalGrowth >= 0 ? '+' : ''}{totalGrowth.toFixed(1)}% variação
          </span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <defs>
              <linearGradient id="gradientNovembroAds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity={1} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="gradientOutubroAds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(260 20% 20%)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(260 10% 55%)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(260 20% 15%)' }} />
            <Legend
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
            <Bar
              dataKey="Outubro"
              fill="url(#gradientOutubroAds)"
              radius={[4, 4, 0, 0]}
              barSize={30}
            >
              <LabelList
                dataKey="Outubro"
                position="top"
                fill="hsl(260 10% 55%)"
                fontSize={9}
              />
            </Bar>
            <Bar
              dataKey="Novembro"
              fill="url(#gradientNovembroAds)"
              radius={[4, 4, 0, 0]}
              barSize={30}
            >
              <LabelList
                dataKey="Novembro"
                position="top"
                fill="hsl(260 10% 55%)"
                fontSize={9}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
