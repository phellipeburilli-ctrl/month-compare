import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartCard } from "./ChartCard";
import { getProductColor } from "@/data/dashboardData";

interface HorizontalBarChartProps {
  title: string;
  subtitle?: string;
  data: Array<{ name: string; value: number }>;
  delay?: number;
  badge?: string;
  colorFn?: (name: string) => string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="powerbi-card p-3 shadow-lg">
        <p className="font-semibold text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Quantidade: <span className="font-medium text-primary">{data.value.toLocaleString("pt-BR")}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function HorizontalBarChart({ 
  title, 
  subtitle, 
  data, 
  delay = 0,
  badge,
  colorFn = getProductColor
}: HorizontalBarChartProps) {
  // Truncar nomes longos
  const processedData = data.map(item => ({
    ...item,
    displayName: item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name,
    fullName: item.name
  }));

  return (
    <ChartCard title={title} subtitle={subtitle} delay={delay} badge={badge}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <XAxis
              type="number"
              tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="displayName"
              tick={{ fill: "hsl(260 10% 55%)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={95}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(260 20% 15%)' }} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
              {processedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorFn(entry.fullName)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
