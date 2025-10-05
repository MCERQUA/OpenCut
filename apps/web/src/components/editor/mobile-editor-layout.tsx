"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaPanel, TabBar } from "./media-panel";
import { PropertiesPanel } from "./properties-panel";
import { PreviewPanel } from "./preview-panel";
import { Timeline } from "./timeline";

export function MobileEditorLayout() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  return (
    <div className="flex-1 min-h-0 min-w-0 flex flex-col">
      {/* Main content area with collapsible panels */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Panel - Media */}
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 z-20 bg-background border-r transition-all duration-300",
            leftPanelOpen ? "w-[280px]" : "w-[48px]"
          )}
        >
          {/* Panel content */}
          <div
            className={cn(
              "h-full transition-opacity duration-300",
              leftPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <MediaPanel />
          </div>

          {/* Vertical icon strip when collapsed */}
          {!leftPanelOpen && (
            <div className="absolute inset-0 w-[48px] bg-panel">
              <TabBar />
            </div>
          )}

          {/* Toggle button */}
          <button
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-30",
              leftPanelOpen ? "-right-4" : "-right-3",
              "w-7 h-20 bg-background hover:bg-accent rounded-md",
              "flex items-center justify-center transition-all",
              "border border-border shadow-md",
              "group"
            )}
            aria-label={leftPanelOpen ? "Collapse media panel" : "Expand media panel"}
          >
            {leftPanelOpen ? (
              <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Center - Preview */}
        <div
          className={cn(
            "flex-1 transition-all duration-300",
            leftPanelOpen ? "ml-[280px]" : "ml-[48px]",
            rightPanelOpen ? "mr-[280px]" : "mr-[48px]"
          )}
        >
          <PreviewPanel />
        </div>

        {/* Right Panel - Properties */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 z-20 bg-background border-l transition-all duration-300",
            rightPanelOpen ? "w-[280px]" : "w-[48px]"
          )}
        >
          {/* Panel content */}
          <div
            className={cn(
              "h-full transition-opacity duration-300",
              rightPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <PropertiesPanel />
          </div>

          {/* Vertical icon strip when collapsed */}
          {!rightPanelOpen && (
            <div className="absolute inset-0 w-[48px] flex flex-col items-center justify-center py-2 gap-4">
              <div className="text-xs font-medium text-muted-foreground -rotate-90">Properties</div>
            </div>
          )}

          {/* Toggle button */}
          <button
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-30",
              rightPanelOpen ? "-left-4" : "-left-3",
              "w-7 h-20 bg-background hover:bg-accent rounded-md",
              "flex items-center justify-center transition-all",
              "border border-border shadow-md",
              "group"
            )}
            aria-label={rightPanelOpen ? "Collapse properties panel" : "Expand properties panel"}
          >
            {rightPanelOpen ? (
              <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      </div>

      {/* Timeline - fixed at bottom on mobile */}
      <div className="h-[200px] border-t bg-background">
        <Timeline />
      </div>
    </div>
  );
}