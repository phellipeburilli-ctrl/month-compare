import { SlideNavigation } from "./SlideNavigation";
import { CoverSlide } from "./slides/CoverSlide";
import { ExecutiveSummarySlide } from "./slides/ExecutiveSummarySlide";
import { ComparisonSlide } from "./slides/ComparisonSlide";
import { VideoTypeSlide } from "./slides/VideoTypeSlide";
import { ProductsSlide } from "./slides/ProductsSlide";
import { ConclusionSlide } from "./slides/ConclusionSlide";

interface PresentationModeProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  onGoToSlide: (index: number) => void;
}

export function PresentationMode({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onExit,
  onGoToSlide,
}: PresentationModeProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNext={onNext}
        onPrev={onPrev}
        onExit={onExit}
        onGoToSlide={onGoToSlide}
      />

      <div className="relative w-full h-full">
        <CoverSlide isActive={currentSlide === 0} />
        <ExecutiveSummarySlide isActive={currentSlide === 1} />
        <ComparisonSlide isActive={currentSlide === 2} />
        <VideoTypeSlide isActive={currentSlide === 3} />
        <ProductsSlide isActive={currentSlide === 4} />
        <ConclusionSlide isActive={currentSlide === 5} />
      </div>
    </div>
  );
}

export const TOTAL_SLIDES = 6;
