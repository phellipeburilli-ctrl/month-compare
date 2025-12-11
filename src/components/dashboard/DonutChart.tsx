import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChartCard } from "./ChartCard";
import { getVideoTypeColor, getProductColor } from "@/data/dashboardData";

interface DonutChartProps {
  title: string;
  subtitle?: string;
  data: Array<{ name: string; value: number; percentage?: number }>;
  delay?: number;
  showTotal?: boolean;
  colorType?: "video" | "product";
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
          Quantidade: <span className="font-medium text-foreground">{data.value.toLocaleString("pt-BR")}</span>
        </p>
        {data.percentage && (
          <p className="text-sm text-primary font-medium mt-1">
            {data.percentage.toFixed(1)}% do total
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function DonutChart({ 
  title, 
  subtitle, 
  data, 
  delay = 0, 
  showTotal = true,
  colorType = "video",
  badge,
  colorFn
}: DonutChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const getColor = colorFn || (colorType === "video" ? getVideoTypeColor : getProductColor);

  return (
    <ChartCard title={title} subtitle={subtitle} delay={delay} badge={badge}>
      <div className="h-72 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColor(entry.name)}
                  stroke="hsl(260 25% 8%)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
              formatter={(value: string) => (
                <span className="text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {showTotal && (
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="font-display text-xl font-bold text-foreground">
              {total.toLocaleString("pt-BR")}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Total</p>
          </div>
        )}
      </div>
    </ChartCard>
  );
}
