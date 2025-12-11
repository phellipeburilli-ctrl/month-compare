import { TrendingUp, TrendingDown, Target, Layers, Crown, AlertTriangle, Sparkles } from "lucide-react";
import { produtoAdsOutubro, produtoAdsNovembro, nichoOutubro, nichoNovembro, calculateGrowth } from "@/data/dashboardAdsData";

interface HighlightItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  trend?: "up" | "down" | "new";
  color: string;
}

function HighlightItem({ icon, title, value, subtitle, trend, color }: HighlightItemProps) {
  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${color} border border-white/10 hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
            {icon}
          </div>
          <div>
            <p className="text-xs text-white/70 uppercase tracking-wide">{title}</p>
            <p className="text-lg font-bold text-white">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`p-1.5 rounded-full ${
            trend === "up" ? "bg-green-500/20" : 
            trend === "down" ? "bg-red-500/20" : 
            "bg-yellow-500/20"
          }`}>
            {trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
            {trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
            {trend === "new" && <Sparkles className="w-4 h-4 text-yellow-400" />}
          </div>
        )}
      </div>
      <p className="text-xs text-white/60 mt-2">{subtitle}</p>
    </div>
  );
}

export function AdsHighlights() {
  // Calcular top produto (maior valor em novembro)
  const topProdutoNov = [...produtoAdsNovembro].sort((a, b) => b.value - a.value)[0];
  
  // Calcular maior crescimento produto
  const produtosComparados = produtoAdsNovembro.map(pNov => {
    const pOut = produtoAdsOutubro.find(p => p.name === pNov.name);
    const outValue = pOut?.value || 0;
    const growth = calculateGrowth(pNov.value, outValue);
    return { ...pNov, growth, outValue };
  }).filter(p => p.outValue > 0); // só produtos que existiam em outubro
  
  const maiorCrescimentoProduto = [...produtosComparados].sort((a, b) => b.growth - a.growth)[0];
  
  // Calcular maior queda produto
  const produtosQueda = produtoAdsOutubro.map(pOut => {
    const pNov = produtoAdsNovembro.find(p => p.name === pOut.name);
    const novValue = pNov?.value || 0;
    const growth = calculateGrowth(novValue, pOut.value);
    return { ...pOut, growth, novValue };
  }).filter(p => p.name !== "VAZIO");
  
  const maiorQuedaProduto = [...produtosQueda].sort((a, b) => a.growth - b.growth)[0];
  
  // Produtos novos em novembro
  const produtosNovos = produtoAdsNovembro.filter(pNov => 
    !produtoAdsOutubro.find(pOut => pOut.name === pNov.name)
  );
  
  // Top nicho novembro
  const topNichoNov = [...nichoNovembro].sort((a, b) => b.value - a.value)[0];
  
  // Maior crescimento nicho
  const nichosComparados = nichoNovembro.map(nNov => {
    const nOut = nichoOutubro.find(n => n.name === nNov.name);
    const outValue = nOut?.value || 0;
    const growth = calculateGrowth(nNov.value, outValue);
    return { ...nNov, growth, outValue };
  }).filter(n => n.outValue > 0);
  
  const maiorCrescimentoNicho = [...nichosComparados].sort((a, b) => b.growth - a.growth)[0];
  
  // Maior queda nicho
  const nichosQueda = nichoOutubro.map(nOut => {
    const nNov = nichoNovembro.find(n => n.name === nOut.name);
    const novValue = nNov?.value || 0;
    const growth = calculateGrowth(novValue, nOut.value);
    return { ...nOut, growth, novValue };
  }).filter(n => n.name !== "VAZIO");
  
  const maiorQuedaNicho = [...nichosQueda].sort((a, b) => a.growth - b.growth)[0];

  return (
    <div className="space-y-6">
      {/* Produtos Highlights */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Destaques de Produtos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <HighlightItem
            icon={<Crown className="w-5 h-5 text-yellow-400" />}
            title="Top Produto Novembro"
            value={topProdutoNov.name}
            subtitle={`${topProdutoNov.value} anúncios (${topProdutoNov.percentage}%)`}
            color="from-yellow-600/30 to-orange-600/20"
          />
          <HighlightItem
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
            title="Maior Crescimento"
            value={maiorCrescimentoProduto?.name || "-"}
            subtitle={maiorCrescimentoProduto ? `+${maiorCrescimentoProduto.growth.toFixed(0)}% (${maiorCrescimentoProduto.outValue} → ${maiorCrescimentoProduto.value})` : "-"}
            trend="up"
            color="from-green-600/30 to-emerald-600/20"
          />
          <HighlightItem
            icon={<TrendingDown className="w-5 h-5 text-red-400" />}
            title="Maior Queda"
            value={maiorQuedaProduto?.name || "-"}
            subtitle={maiorQuedaProduto ? `${maiorQuedaProduto.growth.toFixed(0)}% (${maiorQuedaProduto.value} → ${maiorQuedaProduto.novValue})` : "-"}
            trend="down"
            color="from-red-600/30 to-rose-600/20"
          />
          <HighlightItem
            icon={<Sparkles className="w-5 h-5 text-purple-400" />}
            title="Produtos Novos"
            value={produtosNovos.length > 0 ? produtosNovos.map(p => p.name).join(", ") : "Nenhum"}
            subtitle={produtosNovos.length > 0 ? `${produtosNovos.reduce((s, p) => s + p.value, 0)} anúncios` : "Sem novos produtos"}
            trend="new"
            color="from-purple-600/30 to-violet-600/20"
          />
        </div>
      </div>

      {/* Nichos Highlights */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Destaques de Nichos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <HighlightItem
            icon={<Crown className="w-5 h-5 text-yellow-400" />}
            title="Top Nicho Novembro"
            value={topNichoNov.name}
            subtitle={`${topNichoNov.value} anúncios (${topNichoNov.percentage}%)`}
            color="from-yellow-600/30 to-orange-600/20"
          />
          <HighlightItem
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
            title="Maior Crescimento"
            value={maiorCrescimentoNicho?.name || "-"}
            subtitle={maiorCrescimentoNicho ? `+${maiorCrescimentoNicho.growth.toFixed(0)}% (${maiorCrescimentoNicho.outValue} → ${maiorCrescimentoNicho.value})` : "-"}
            trend="up"
            color="from-green-600/30 to-emerald-600/20"
          />
          <HighlightItem
            icon={<TrendingDown className="w-5 h-5 text-red-400" />}
            title="Maior Queda"
            value={maiorQuedaNicho?.name || "-"}
            subtitle={maiorQuedaNicho ? `${maiorQuedaNicho.growth.toFixed(0)}% (${maiorQuedaNicho.value} → ${maiorQuedaNicho.novValue})` : "-"}
            trend="down"
            color="from-red-600/30 to-rose-600/20"
          />
          <HighlightItem
            icon={<AlertTriangle className="w-5 h-5 text-orange-400" />}
            title="Nichos Novos"
            value={nichoNovembro.filter(n => !nichoOutubro.find(no => no.name === n.name)).map(n => n.name).join(", ") || "Nenhum"}
            subtitle="Apareceram em Novembro"
            trend="new"
            color="from-orange-600/30 to-amber-600/20"
          />
        </div>
      </div>
    </div>
  );
}
