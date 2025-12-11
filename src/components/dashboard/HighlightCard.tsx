import { cn } from "@/lib/utils";
import { Trophy, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface HighlightCardProps {
  title: string;
  item: string;
  value: number;
  percentage?: number;
  type: "best" | "worst";
  growth?: number;
}

export function HighlightCard({
  title,
  item,
  value,
  percentage,
  type,
  growth,
}: HighlightCardProps) {
  const isBest = type === "best";
  
  return (
    <div
      className={cn(
        "rounded-lg p-3 border transition-all duration-200 hover:scale-[1.02]",
        isBest 
          ? "bg-success/10 border-success/30" 
          : "bg-warning/10 border-warning/30"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {isBest ? (
          <Trophy className="h-4 w-4 text-success" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-warning" />
        )}
        <span className={cn(
          "text-xs font-semibold uppercase tracking-wide",
          isBest ? "text-success" : "text-warning"
        )}>
          {title}
        </span>
      </div>
      
      <p className="font-display text-sm font-bold text-foreground truncate" title={item}>
        {item}
      </p>
      
      <div className="flex items-center justify-between mt-1">
        <span className="text-lg font-bold text-foreground">
          {value.toLocaleString("pt-BR")}
        </span>
        {percentage !== undefined && (
          <span className="text-xs text-muted-foreground">
            ({percentage.toFixed(1)}%)
          </span>
        )}
      </div>
      
      {growth !== undefined && (
        <div className={cn(
          "flex items-center gap-1 mt-2 text-xs font-medium",
          growth >= 0 ? "text-success" : "text-destructive"
        )}>
          {growth >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{growth >= 0 ? "+" : ""}{growth.toFixed(1)}% vs mês anterior</span>
        </div>
      )}
    </div>
  );
}
