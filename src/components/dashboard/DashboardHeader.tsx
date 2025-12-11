import { Calendar, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logoXmx from "@/assets/logoxmx.png";

interface DashboardHeaderProps {
  onStartPresentation?: () => void;
  title?: string;
  subtitle?: string;
  dashboardType?: "audiovisual" | "ads";
}

export function DashboardHeader({ 
  onStartPresentation,
  title = "Dashboard Audiovisual",
  subtitle = "Análise Comparativa • Equipe Criativa",
  dashboardType = "audiovisual"
}: DashboardHeaderProps) {
  const location = useLocation();
  
  return (
    <header className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={logoXmx} 
            alt="XMX Corp Logo" 
            className="h-14 w-auto object-contain"
          />
          <div className="h-10 w-px bg-border hidden sm:block" />
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Navigation between dashboards */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                size="sm"
                className="text-xs"
              >
                VSLs
              </Button>
            </Link>
            <Link to="/ads">
              <Button
                variant={location.pathname === "/ads" ? "default" : "ghost"}
                size="sm"
                className="text-xs"
              >
                ADS
              </Button>
            </Link>
          </div>
          
          {onStartPresentation && (
            <Button
              onClick={onStartPresentation}
              variant="default"
              className="gap-2"
            >
              <Presentation className="h-4 w-4" />
              <span className="hidden sm:inline">Apresentação</span>
            </Button>
          )}
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Outubro vs Novembro 2025
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </header>
  );
}
