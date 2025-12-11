import { BarChart3 } from "lucide-react";
import logo from "@/assets/logoxmx.png";

export function AdsCoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="animate-fade-in">
        <img 
          src={logo} 
          alt="XMX Corp" 
          className="h-20 mb-8 mx-auto opacity-90"
        />
      </div>
      
      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <BarChart3 className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
          Dashboard <span className="text-primary">ADS</span>
        </h1>
      </div>
      
      <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
        <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
          Comparativo <span className="text-blue-400">Outubro</span> vs <span className="text-purple-400">Novembro</span> 2025
        </p>
      </div>
      
      <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
        <div className="mt-8 px-8 py-4 rounded-xl bg-primary/10 border border-primary/20">
          <p className="text-lg text-muted-foreground">
            Equipe de Produção de Anúncios
          </p>
        </div>
      </div>
      
      <div className="animate-fade-in absolute bottom-20 text-muted-foreground text-sm" style={{ animationDelay: "800ms" }}>
        <p>Pressione <kbd className="px-2 py-1 rounded bg-muted">→</kbd> para continuar</p>
      </div>
    </div>
  );
}
