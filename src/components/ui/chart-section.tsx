import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";
import DraggableContainer from "./draggable-container";

type LayoutMode = "horizontal" | "vertical" | "fullwidth";

const ChartSection = () => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("horizontal");

  const ChartContainer = () => (
    <DraggableContainer
      className="bg-white rounded-xl shadow h-full flex items-center justify-center p-4"
      isDraggable={false}
    >
      <div className="chart-container bg-white rounded-lg shadow-sm border min-w-[600px] min-h-[350px] w-full h-full flex items-center justify-center">
        <span className="text-gray-400 text-[0.94rem] select-none">
          [Chart]
        </span>
      </div>
    </DraggableContainer>
  );

  const OrderbookContainer = () => (
    <DraggableContainer
      className="bg-white rounded-xl shadow h-full flex items-center justify-center"
      isDraggable={false}
    >
      <span className="text-gray-400 text-[0.84rem] select-none">
        [Orderbuch]
      </span>
    </DraggableContainer>
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
                <ChartContainer />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={20} maxSize={50}>
                <OrderbookContainer />
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
                <ChartContainer />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <OrderbookContainer />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        );

      case "fullwidth":
        return (
          <div className="space-y-4">
            {/* Chart auf volle Breite */}
            <div className="h-[500px]">
              <ChartContainer />
            </div>
            {/* Orderbuch darunter */}
            <div className="h-[300px]">
              <OrderbookContainer />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-1">
      {/* Layout Controls */}
      <div className="mb-4 flex gap-2 items-center">
        <span className="text-sm font-medium text-gray-600">Layout:</span>
        <button
          onClick={() => setLayoutMode("horizontal")}
          className={`px-3 py-1 text-xs rounded border transition-colors ${
            layoutMode === "horizontal"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Horizontal
        </button>
        <button
          onClick={() => setLayoutMode("vertical")}
          className={`px-3 py-1 text-xs rounded border transition-colors ${
            layoutMode === "vertical"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Vertikal
        </button>
        <button
          onClick={() => setLayoutMode("fullwidth")}
          className={`px-3 py-1 text-xs rounded border transition-colors ${
            layoutMode === "fullwidth"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Vollbreite
        </button>
      </div>

      {/* Dynamic Layout */}
      {renderLayout()}

      {/* Instructions */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        {layoutMode === "fullwidth"
          ? "Vollbreite: Chart und Orderbuch sind fest positioniert"
          : "Ziehen Sie den Griff zwischen den Bereichen, um die Größe anzupassen"}
      </div>
    </div>
  );
};

export default ChartSection;
