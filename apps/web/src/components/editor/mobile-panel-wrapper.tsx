"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

interface MobilePanelWrapperProps {
  children: React.ReactNode;
  side: "left" | "right";
  defaultOpen?: boolean;
  className?: string;
  keepIconsVisible?: boolean;
}

export function MobilePanelWrapper({
  children,
  side,
  defaultOpen = false,
  className,
  keepIconsVisible = true,
}: MobilePanelWrapperProps) {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile && !defaultOpen) {
      setIsOpen(false);
    }
  }, [isMobile, defaultOpen]);

  if (!isMobile) {
    // On desktop, render children normally
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        "relative h-full transition-all duration-300 ease-in-out",
        side === "left" ? "order-1" : "order-3",
        isOpen ? "w-[280px]" : keepIconsVisible ? "w-[48px]" : "w-0",
        className
      )}
    >
      {/* Panel Content */}
      <div
        className={cn(
          "h-full overflow-hidden transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          side === "left" ? "pr-8" : "pl-8"
        )}
      >
        {children}
      </div>

      {/* Icons Strip (when collapsed) */}
      {!isOpen && keepIconsVisible && (
        <div className="absolute inset-0 w-[48px] bg-background border-r border-border">
          {/* This would contain the vertical icon strip from MediaPanel */}
        </div>
      )}

      {/* Toggle Tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 z-50",
          "w-6 h-12 bg-muted hover:bg-muted/80 rounded-md",
          "flex items-center justify-center transition-colors",
          "border border-border shadow-sm",
          side === "left"
            ? isOpen
              ? "right-0 translate-x-full"
              : "right-0"
            : isOpen
            ? "left-0 -translate-x-full"
            : "left-0"
        )}
        aria-label={isOpen ? "Collapse panel" : "Expand panel"}
      >
        {side === "left" ? (
          isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )
        ) : isOpen ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}