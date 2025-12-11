import { Layers, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { nichoOutubro, nichoNovembro, totalAdsOutubro, totalAdsNovembro } from "@/data/dashboardAdsData";

export function AdsNichosSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Layers className="w-8 h-8 text-yellow-400" />
          <h2 className="text-4xl font-bold text-foreground">Análise por Nicho</h2>
        </div>
        <p className="text-xl text-muted-foreground">Distribuição de anúncios por nicho de mercado</p>
      </div>

      {/* Comparativo lado a lado */}
      <div className="grid grid-cols-2 gap-8 flex-1 animate-fade-in" style={{ animationDelay: "200ms" }}>
        {/* Outubro */}
        <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-blue-400">Outubro</h3>
            <span className="text-muted-foreground">{totalAdsOutubro} anúncios</span>
          </div>
          <div className="space-y-3">
            {nichoOutubro.filter(n => n.name !== "VAZIO").map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm w-5">{index + 1}.</span>
                  <span className="text-foreground font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-400 font-bold text-lg">{item.value}</span>
                  <span className="text-muted-foreground text-sm w-16 text-right">{item.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Novembro */}
        <div className="p-6 rounded-xl bg-purple-500/5 border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-purple-400">Novembro</h3>
            <span className="text-muted-foreground">{totalAdsNovembro} anúncios</span>
          </div>
          <div className="space-y-3">
            {nichoNovembro.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm w-5">{index + 1}.</span>
                  <span className="text-foreground font-medium">{item.name}</span>
                  {!nichoOutubro.find(n => n.name === item.name) && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-400 rounded">NOVO</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-purple-400 font-bold text-lg">{item.value}</span>
                  <span className="text-muted-foreground text-sm w-16 text-right">{item.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-3 gap-4 mt-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <p className="font-semibold text-green-400">Maior Crescimento</p>
            <p className="text-sm text-muted-foreground">TINNITUS: 1 → 18 (+1700%)</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <TrendingDown className="w-5 h-5 text-red-400 mt-0.5" />
          <div>
            <p className="font-semibold text-red-400">Maior Queda</p>
            <p className="text-sm text-muted-foreground">EMAGRECIMENTO: 17 → 0 (-100%)</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-400">Novos Nichos</p>
            <p className="text-sm text-muted-foreground">PROSTATE, PAIN RELIEF</p>
          </div>
        </div>
      </div>
    </div>
  );
}
