import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideProps {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

export function Slide({ children, className, isActive = true }: SlideProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 transition-all duration-500",
        isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
}
