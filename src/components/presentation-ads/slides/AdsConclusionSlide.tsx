import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react";
import logo from "@/assets/logoxmx.png";

export function AdsConclusionSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-4xl font-bold text-foreground mb-2">Conclusões & Insights</h2>
        <p className="text-xl text-muted-foreground">Dashboard ADS - Outubro vs Novembro 2025</p>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Principais Insights */}
        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-semibold text-foreground">Principais Insights</h3>
          </div>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Queda de <span className="text-red-400 font-semibold">5.9%</span> na produção total (51 → 48)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><span className="text-green-400 font-semibold">KARYLIEF</span> assumiu liderança com crescimento de 1600%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><span className="text-red-400 font-semibold">LAELLIUM</span> saiu completamente da produção (-100%)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Nicho <span className="text-green-400 font-semibold">TINNITUS</span> cresceu 1700% (1 → 18)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Nicho <span className="text-red-400 font-semibold">EMAGRECIMENTO</span> zerou produção</span>
            </li>
          </ul>
        </div>

        {/* Crescimentos */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-green-400">Crescimentos</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ KARYLIEF: 1 → 17 (+1600%)</li>
              <li>✅ JERTARIS: 0 → 10 (novo)</li>
              <li>✅ GARAHERB: 2 → 4 (+100%)</li>
              <li>✅ Squad Afiliados: 5 → 11 (+120%)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <h3 className="font-semibold text-red-400">Quedas</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>❌ LAELLIUM: 17 → 0 (-100%)</li>
              <li>❌ MEMYTS: 28 → 13 (-53.6%)</li>
              <li>❌ Nicho EMAGRECIMENTO: 17 → 0</li>
              <li>❌ Nicho MEMORY: 28 → 13 (-53.6%)</li>
            </ul>
          </div>
        </div>

        {/* Oportunidades */}
        <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-semibold text-foreground">Oportunidades</h3>
          </div>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">💡</span>
              <span>Avaliar retorno do nicho EMAGRECIMENTO</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">💡</span>
              <span>Expandir estratégia de TINNITUS e PROSTATE</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">💡</span>
              <span>Investigar queda abrupta de LAELLIUM</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">💡</span>
              <span>Fortalecer squad Afiliados (crescimento de 120%)</span>
            </li>
          </ul>
        </div>

        {/* Logo e encerramento */}
        <div className="flex flex-col items-center justify-center animate-fade-in" style={{ animationDelay: "800ms" }}>
          <img src={logo} alt="XMX Corp" className="h-16 mb-4 opacity-80" />
          <p className="text-muted-foreground text-center">
            Equipe de Produção de Anúncios<br />
            <span className="text-primary">XMX Corp</span> - 2025
          </p>
        </div>
      </div>
    </div>
  );
}
