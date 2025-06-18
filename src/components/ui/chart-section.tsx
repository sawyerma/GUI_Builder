import React, { useState, useRef, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";
import Orderbook from "./orderbook";

type LayoutMode = "horizontal" | "vertical" | "fullwidth";

interface DragState {
  isDragging: boolean;
  draggedItem: "chart" | "orderbook" | null;
  startPos: { x: number; y: number };
}

const ChartSection = () => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("horizontal");
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedItem: null,
    startPos: { x: 0, y: 0 },
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (
    item: "chart" | "orderbook",
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    setDragState({
      isDragging: true,
      draggedItem: item,
      startPos: { x: e.clientX, y: e.clientY },
    });
  };

  const handleDragEnd = (e: MouseEvent) => {
    if (!dragState.isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const dropX = e.clientX - containerRect.left;
    const dropY = e.clientY - containerRect.top;
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Intelligente Layout-Erkennung basierend auf Drop-Position
    if (dropY > containerHeight * 0.75) {
      // Unterer Bereich -> Vollbreite Layout
      setLayoutMode("fullwidth");
    } else if (dropX > containerWidth * 0.7) {
      // Rechter Bereich -> Horizontal Layout
      setLayoutMode("horizontal");
    } else if (dropY > containerHeight * 0.5 && dropX < containerWidth * 0.7) {
      // Mittlerer/unterer Bereich -> Vertikal Layout
      setLayoutMode("vertical");
    }

    setDragState({
      isDragging: false,
      draggedItem: null,
      startPos: { x: 0, y: 0 },
    });
  };

  const ChartContainer = ({
    isDraggable = true,
  }: {
    isDraggable?: boolean;
  }) => (
    <div
      className={`bg-white rounded-xl shadow h-full flex items-center justify-center p-4 ${
        isDraggable ? "cursor-grab active:cursor-grabbing" : ""
      } ${dragState.draggedItem === "chart" ? "opacity-50 scale-105 shadow-2xl" : ""}`}
      onMouseDown={isDraggable ? (e) => handleDragStart("chart", e) : undefined}
    >
      <div className="chart-container bg-white rounded-lg shadow-sm border min-w-[600px] min-h-[350px] w-full h-full flex items-center justify-center">
        <span className="text-gray-400 text-[0.94rem] select-none">
          [Chart] {isDraggable && "📊"}
        </span>
      </div>
    </div>
  );

  const OrderbookContainer = ({
    isDraggable = true,
  }: {
    isDraggable?: boolean;
  }) => (
    <div
      className={`h-full ${
        isDraggable ? "cursor-grab active:cursor-grabbing" : ""
      } ${dragState.draggedItem === "orderbook" ? "opacity-50 scale-105 shadow-2xl" : ""}`}
      onMouseDown={
        isDraggable ? (e) => handleDragStart("orderbook", e) : undefined
      }
    >
      <Orderbook />
    </div>
  );

  const renderLayout = () => {
    switch (layoutMode) {
      case "horizontal":
        return (
          <div className="h-[500px]">
            <ResizablePanelGroup
              direction="horizontal"
              className="min-h-[500px] rounded-lg border"
            >
              <ResizablePanel defaultSize={75} minSize={50}>
                <ChartContainer isDraggable={!dragState.isDragging} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={20} maxSize={50}>
                <OrderbookContainer isDraggable={!dragState.isDragging} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        );

      case "vertical":
        return (
          <div className="h-[700px]">
            <ResizablePanelGroup
              direction="vertical"
              className="min-h-[700px] rounded-lg border"
            >
              <ResizablePanel defaultSize={70} minSize={50}>
                <ChartContainer isDraggable={!dragState.isDragging} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <OrderbookContainer isDraggable={!dragState.isDragging} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        );

      case "fullwidth":
        return (
          <div className="space-y-4">
            <div className="h-[500px]">
              <ChartContainer isDraggable={!dragState.isDragging} />
            </div>
            <div className="h-[300px]">
              <OrderbookContainer isDraggable={!dragState.isDragging} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Global event listeners für Drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragState.isDragging) {
        e.preventDefault();
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (dragState.isDragging) {
        handleDragEnd(e);
      }
    };

    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState.isDragging]);

  return (
    <div className="mt-1" ref={containerRef}>
      {/* Drop Zones Overlay */}
      {dragState.isDragging && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Horizontal Zone */}
            <div className="absolute top-1/4 right-8 w-32 h-32 bg-blue-200/50 border-2 border-blue-400 border-dashed rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                ↔ Horizontal
              </span>
            </div>
            {/* Vertical Zone */}
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-200/50 border-2 border-green-400 border-dashed rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-medium text-sm">
                ↕ Vertikal
              </span>
            </div>
            {/* Fullwidth Zone */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-purple-200/50 border-2 border-purple-400 border-dashed rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-medium text-sm">
                ⬜ Vollbreite
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Layout */}
      {renderLayout()}

      {/* Instructions */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        <div>
          Aktuell:{" "}
          <strong>
            {layoutMode === "horizontal"
              ? "Horizontal"
              : layoutMode === "vertical"
                ? "Vertikal"
                : "Vollbreite"}
          </strong>
        </div>
        <div>Ziehen Sie Chart 📊 oder Orderbuch 📋 um das Layout zu ändern</div>
      </div>
    </div>
  );
};

export default ChartSection;
