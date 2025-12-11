import { useEffect, useCallback } from "react";
import { Slide } from "@/components/presentation/Slide";
import { SlideNavigation } from "@/components/presentation/SlideNavigation";
import { AdsCoverSlide } from "./slides/AdsCoverSlide";
import { AdsExecutiveSummarySlide } from "./slides/AdsExecutiveSummarySlide";
import { AdsNichosSlide } from "./slides/AdsNichosSlide";
import { AdsProductsSlide } from "./slides/AdsProductsSlide";
import { AdsSquadsSlide } from "./slides/AdsSquadsSlide";
import { AdsConclusionSlide } from "./slides/AdsConclusionSlide";

interface AdsPresentationModeProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  onGoToSlide: (index: number) => void;
}

export function AdsPresentationMode({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onExit,
  onGoToSlide,
}: AdsPresentationModeProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case " ":
        onNext();
        break;
      case "ArrowLeft":
        onPrev();
        break;
      case "Escape":
        onExit();
        break;
      case "f":
      case "F":
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
        break;
    }
  }, [onNext, onPrev, onExit]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width * 0.3) {
      onPrev();
    } else if (x > width * 0.7) {
      onNext();
    }
  };

  const slides = [
    <AdsCoverSlide key="cover" />,
    <AdsExecutiveSummarySlide key="summary" />,
    <AdsNichosSlide key="nichos" />,
    <AdsProductsSlide key="products" />,
    <AdsSquadsSlide key="squads" />,
    <AdsConclusionSlide key="conclusion" />,
  ];

  return (
    <div 
      className="fixed inset-0 bg-background z-50 overflow-hidden"
      onClick={handleClick}
    >
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <Slide key={index} isActive={currentSlide === index}>
            {slide}
          </Slide>
        ))}
      </div>
      
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNext={onNext}
        onPrev={onPrev}
        onExit={onExit}
        onGoToSlide={onGoToSlide}
      />
    </div>
  );
}
