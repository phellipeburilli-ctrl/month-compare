import { Users, UserCircle, TrendingUp, TrendingDown } from "lucide-react";
import { 
  squadOutubro, 
  squadNovembro, 
  assigneeOutubro, 
  assigneeNovembro,
  totalAdsOutubro,
  totalAdsNovembro 
} from "@/data/dashboardAdsData";

export function AdsSquadsSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Users className="w-8 h-8 text-green-400" />
          <h2 className="text-4xl font-bold text-foreground">Squads & Responsáveis</h2>
        </div>
        <p className="text-xl text-muted-foreground">Distribuição por equipe e profissional</p>
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* Squads */}
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            Squads
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Outubro */}
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-blue-400 font-medium mb-3">Outubro ({totalAdsOutubro})</p>
              {squadOutubro.map(item => (
                <div key={item.name} className="flex justify-between items-center py-2">
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-blue-400 font-bold">{item.value} ({item.percentage.toFixed(0)}%)</span>
                </div>
              ))}
            </div>
            
            {/* Novembro */}
            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <p className="text-purple-400 font-medium mb-3">Novembro ({totalAdsNovembro})</p>
              {squadNovembro.map(item => (
                <div key={item.name} className="flex justify-between items-center py-2">
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-purple-400 font-bold">{item.value} ({item.percentage.toFixed(0)}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insight Squad */}
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-yellow-400 font-semibold mb-1">📈 Crescimento Afiliados</p>
            <p className="text-sm text-muted-foreground">
              Afiliados cresceu de 9.8% para 22.9% do total (5 → 11 anúncios)
            </p>
          </div>
        </div>

        {/* Responsáveis */}
        <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-blue-400" />
            Responsáveis
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Outubro */}
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-blue-400 font-medium mb-3">Outubro</p>
              {assigneeOutubro.map(item => (
                <div key={item.name} className="flex justify-between items-center py-2 text-sm">
                  <span className="text-foreground truncate mr-2">{item.name.split(' ')[0]}</span>
                  <span className="text-blue-400 font-bold">{item.value}</span>
                </div>
              ))}
            </div>
            
            {/* Novembro */}
            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <p className="text-purple-400 font-medium mb-3">Novembro</p>
              {assigneeNovembro.map(item => (
                <div key={item.name} className="flex justify-between items-center py-2 text-sm">
                  <span className="text-foreground truncate mr-2">
                    {item.name.split(' ')[0]}
                    {!assigneeOutubro.find(a => a.name === item.name) && item.name !== "Colaborativo" && (
                      <span className="ml-1 px-1 text-[10px] bg-green-500/20 text-green-400 rounded">NOVO</span>
                    )}
                  </span>
                  <span className="text-purple-400 font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insight Responsáveis */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-primary font-semibold mb-1">👥 Equipe</p>
            <p className="text-sm text-muted-foreground">
              Rafael lidera nos dois meses. Amanda e trabalhos colaborativos são novos em Novembro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
