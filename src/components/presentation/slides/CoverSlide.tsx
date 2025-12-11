import { Slide } from "../Slide";
import logoXmx from "@/assets/logoxmx.png";

interface CoverSlideProps {
  isActive: boolean;
}

export function CoverSlide({ isActive }: CoverSlideProps) {
  return (
    <Slide isActive={isActive} className="bg-gradient-to-br from-background via-background to-primary/10">
      <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
        <img
          src={logoXmx}
          alt="XMX Corp Logo"
          className="h-24 md:h-32 w-auto object-contain"
        />
        
        <div className="space-y-4">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
            Dashboard Audiovisual
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
        </div>

        <div className="space-y-2">
          <p className="text-xl md:text-2xl text-primary font-semibold">
            Comparativo Outubro vs Novembro 2025
          </p>
          <p className="text-muted-foreground text-lg">
            Equipe de Produção Criativa
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-muted-foreground/60 text-sm animate-pulse">
          <span>Pressione</span>
          <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">→</kbd>
          <span>para começar</span>
        </div>
      </div>
    </Slide>
  );
}
