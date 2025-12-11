import { useState, useEffect, useCallback } from "react";

export function usePresentation(totalSlides: number) {
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const startPresentation = useCallback(() => {
    setIsPresenting(true);
    setCurrentSlide(0);
  }, []);

  const exitPresentation = useCallback(() => {
    setIsPresenting(false);
    setCurrentSlide(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isPresenting) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevSlide();
          break;
        case "Escape":
          e.preventDefault();
          exitPresentation();
          break;
        case "f":
        case "F":
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPresenting, nextSlide, prevSlide, exitPresentation, goToSlide, totalSlides]);

  return {
    isPresenting,
    currentSlide,
    totalSlides,
    nextSlide,
    prevSlide,
    goToSlide,
    startPresentation,
    exitPresentation,
  };
}
