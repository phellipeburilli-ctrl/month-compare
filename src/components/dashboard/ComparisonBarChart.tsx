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
import { ChartCard } from "./ChartCard";
import { MONTH_COLORS, calculateGrowth } from "@/data/dashboardData";
import { TrendingUp } from "lucide-react";

interface ComparisonBarChartProps {
  title: string;
  subtitle?: string;
  data: Array<{ name: string; Outubro: number; Novembro: number }>;
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
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: MONTH_COLORS.outubro }}></span>
            <span className="text-muted-foreground">Outubro:</span>
            <span className="font-medium text-foreground">{outubro.toLocaleString("pt-BR")}</span>
          </p>
          <p className="text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: MONTH_COLORS.novembro }}></span>
            <span className="text-muted-foreground">Novembro:</span>
            <span className="font-medium text-foreground">{novembro.toLocaleString("pt-BR")}</span>
          </p>
          <p className="text-sm pt-1 border-t border-border/50 mt-1">
            <span className="text-muted-foreground">Crescimento:</span>
            <span className={`font-bold ml-1 ${crescimento >= 0 ? 'text-success' : 'text-destructive'}`}>
              {crescimento >= 0 ? '+' : ''}{crescimento}%
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// Custom label com badge de crescimento
const GrowthLabel = (props: any) => {
  const { x, y, width, value, index, data } = props;
  if (!data || !data[index]) return null;
  
  const outubro = data[index].Outubro;
  const novembro = data[index].Novembro;
  const growth = calculateGrowth(novembro, outubro);
  
  return (
    <g>
      <text
        x={x + width / 2}
        y={y - 25}
        fill="hsl(142 71% 45%)"
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
      >
        {growth >= 0 ? '+' : ''}{growth}%
      </text>
      <text
        x={x + width / 2}
        y={y - 8}
        fill="hsl(260 10% 65%)"
        textAnchor="middle"
        fontSize={10}
      >
        {value.toLocaleString("pt-BR")}
      </text>
    </g>
  );
};

export function ComparisonBarChart({ 
  title, 
  subtitle, 
  data, 
  delay = 0 
}: ComparisonBarChartProps) {
  // Calcular totais
  const totalOutubro = data.reduce((sum, item) => sum + item.Outubro, 0);
  const totalNovembro = data.reduce((sum, item) => sum + item.Novembro, 0);
  const totalGrowth = calculateGrowth(totalNovembro, totalOutubro);

  return (
    <ChartCard title={title} subtitle={subtitle} delay={delay}>
      {/* Badge de crescimento total */}
      <div className="flex items-center justify-end gap-2 mb-4 -mt-2">
        <div className="flex items-center gap-1.5 bg-success/10 border border-success/30 rounded-full px-3 py-1">
          <TrendingUp className="h-3.5 w-3.5 text-success" />
          <span className="text-xs font-bold text-success">
            +{totalGrowth}% crescimento total
          </span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="gradientNovembro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity={1} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="gradientOutubro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F7CFF" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3B5FC7" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(260 20% 20%)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
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
              fill="url(#gradientOutubro)"
              radius={[4, 4, 0, 0]}
              barSize={55}
            >
              <LabelList
                dataKey="Outubro"
                position="top"
                fill="hsl(260 10% 55%)"
                fontSize={10}
                formatter={(value: number) => value.toLocaleString("pt-BR")}
              />
            </Bar>
            <Bar
              dataKey="Novembro"
              fill="url(#gradientNovembro)"
              radius={[4, 4, 0, 0]}
              barSize={55}
            >
              <LabelList
                dataKey="Novembro"
                position="top"
                content={(props) => <GrowthLabel {...props} data={data} />}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
