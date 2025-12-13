import { cn } from "@/lib/utils";
import { findBestPerformer, findBiggestGrowth, responsavelOutubro, responsavelNovembro, moduloOutubro, moduloNovembro, getProductColor } from "@/data/dashboardBackendData";
import { Trophy, TrendingUp, Zap, Target } from "lucide-react";

interface HighlightCardProps {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ElementType;
    gradientFrom?: string;
    gradientTo?: string;
    customColor?: string;
    delay?: number;
}

function HighlightCard({
    title,
    value,
    subtitle,
    icon: Icon,
    gradientFrom = "from-purple-500",
    gradientTo = "to-violet-600",
    customColor,
    delay = 0
}: HighlightCardProps) {
    const bgStyle = customColor
        ? { backgroundColor: customColor }
        : undefined;

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
            )}
            style={{
                animationDelay: `${delay}ms`
            }}
        >
            {/* Gradient background overlay */}
            <div
                className={cn(
                    "absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-30",
                    !customColor && `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
                )}
                style={customColor ? { backgroundColor: customColor, opacity: 0.25 } : undefined}
            />

            {/* Icon */}
            <div
                className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                    !customColor && `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
                )}
                style={bgStyle}
            >
                <Icon className="w-5 h-5 text-white" />
            </div>

            {/* Title */}
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {title}
            </p>

            {/* Value */}
            <p className="text-lg font-bold text-foreground truncate" title={value}>
                {value}
            </p>

            {/* Subtitle */}
            <p className="text-sm text-muted-foreground mt-1">
                {subtitle}
            </p>
        </div>
    );
}

export function BackendHighlights() {
    const topPerformerOutubro = findBestPerformer(responsavelOutubro);
    const topPerformerNovembro = findBestPerformer(responsavelNovembro);

    // Calcular quem teve maior crescimento
    const dataOut = responsavelOutubro.map(d => ({ name: d.name, value: d.value }));
    const dataNov = responsavelNovembro.map(d => ({ name: d.name, value: d.value }));
    const biggestGrowth = findBiggestGrowth(dataOut, dataNov);

    // Calcular modulo mais ativo
    const topModuleOut = findBestPerformer(moduloOutubro);
    const topModuleNov = findBestPerformer(moduloNovembro);

    // Get product colors for modules
    const topModuleNovColor = getProductColor(topModuleNov.name);
    const topModuleOutColor = getProductColor(topModuleOut.name);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HighlightCard
                title="Destaque Novembro"
                value={topPerformerNovembro.name}
                subtitle={`${topPerformerNovembro.value} entregas realizados`}
                icon={Trophy}
                gradientFrom="from-yellow-500"
                gradientTo="to-amber-600"
                delay={0}
            />

            <HighlightCard
                title="Maior Crescimento"
                value={biggestGrowth.name}
                subtitle={`${Number(biggestGrowth.growth).toFixed(0)}% de aumento`}
                icon={TrendingUp}
                gradientFrom="from-emerald-500"
                gradientTo="to-green-600"
                delay={100}
            />

            <HighlightCard
                title="Módulo Top Nov"
                value={topModuleNov.name}
                subtitle={`${topModuleNov.value} entregas em Novembro`}
                icon={Zap}
                customColor={topModuleNovColor}
                delay={200}
            />

            <HighlightCard
                title="Módulo Top Out"
                value={topModuleOut.name}
                subtitle={`${topModuleOut.value} entregas em Outubro`}
                icon={Target}
                customColor={topModuleOutColor}
                delay={300}
            />
        </div>
    );
}
