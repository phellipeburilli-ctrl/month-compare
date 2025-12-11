import { TrendingDown, Package, Layers, Users, UserCircle } from "lucide-react";
import {
  totalAdsOutubro,
  totalAdsNovembro,
  kpisAds,
  produtoAdsOutubro,
  produtoAdsNovembro,
  nichoOutubro,
  nichoNovembro,
} from "@/data/dashboardAdsData";

export function AdsExecutiveSummarySlide() {
  const topProdutoOut = produtoAdsOutubro[0];
  const topProdutoNov = produtoAdsNovembro[0];
  const topNichoOut = nichoOutubro[0];
  const topNichoNov = nichoNovembro[0];

  return (
    <div className="flex flex-col h-full px-12 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-4xl font-bold text-foreground mb-2">Resumo Executivo</h2>
        <p className="text-xl text-muted-foreground">Visão geral dos números de anúncios</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-6 mb-10 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
          <p className="text-muted-foreground text-lg mb-2">Outubro</p>
          <p className="text-5xl font-bold text-blue-400">{totalAdsOutubro}</p>
          <p className="text-sm text-muted-foreground mt-2">anúncios</p>
        </div>
        
        <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
          <p className="text-muted-foreground text-lg mb-2">Novembro</p>
          <p className="text-5xl font-bold text-purple-400">{totalAdsNovembro}</p>
          <p className="text-sm text-muted-foreground mt-2">anúncios</p>
        </div>
        
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingDown className="w-6 h-6 text-red-400" />
            <p className="text-muted-foreground text-lg">Variação</p>
          </div>
          <p className="text-5xl font-bold text-red-400">{kpisAds.variacaoTotal}%</p>
          <p className="text-sm text-muted-foreground mt-2">redução</p>
        </div>
      </div>

      {/* Destaques */}
      <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="p-5 rounded-xl bg-muted/30 border border-muted">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Top Produto</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-blue-400">Outubro:</span>
              <span className="font-medium text-foreground">{topProdutoOut.name} ({topProdutoOut.value})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-400">Novembro:</span>
              <span className="font-medium text-foreground">{topProdutoNov.name} ({topProdutoNov.value})</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-muted/30 border border-muted">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-foreground">Top Nicho</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-blue-400">Outubro:</span>
              <span className="font-medium text-foreground">{topNichoOut.name} ({topNichoOut.value})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-400">Novembro:</span>
              <span className="font-medium text-foreground">{topNichoNov.name} ({topNichoNov.value})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mudanças-chave */}
      <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in" style={{ animationDelay: "600ms" }}>
        <h3 className="font-semibold text-foreground mb-3">📊 Mudanças-chave:</h3>
        <ul className="grid grid-cols-2 gap-2 text-muted-foreground">
          <li>• KARYLIEF: de 1 para 17 anúncios (+1600%)</li>
          <li>• MEMYTS: de 28 para 13 anúncios (-53.6%)</li>
          <li>• LAELLIUM: de 17 para 0 anúncios (-100%)</li>
          <li>• JERTARIS: novo produto com 10 anúncios</li>
        </ul>
      </div>
    </div>
  );
}
