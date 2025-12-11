import { ChevronLeft, ChevronRight, X, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  onGoToSlide: (index: number) => void;
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onExit,
  onGoToSlide,
}: SlideNavigationProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <>
      {/* Exit button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        onClick={onExit}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Fullscreen button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-16 z-50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        onClick={toggleFullscreen}
      >
        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
      </Button>

      {/* Previous button */}
      {currentSlide > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          onClick={onPrev}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      {/* Next button */}
      {currentSlide < totalSlides - 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          onClick={onNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}

      {/* Progress bar and indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
        {/* Slide indicators */}
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <span className="text-sm text-muted-foreground">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>

      {/* Keyboard hints */}
      <div className="absolute bottom-6 right-6 z-50 text-xs text-muted-foreground/50 hidden md:block">
        ← → Navegar • ESC Sair • F Fullscreen
      </div>
    </>
  );
}
