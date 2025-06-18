import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";
import DraggableContainer from "./draggable-container";

const ChartSection = () => {
  return (
    <div className="mt-1 h-[500px]">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[500px] rounded-lg border"
      >
        {/* Main Chart Panel */}
        <ResizablePanel defaultSize={75} minSize={50}>
          <DraggableContainer
            className="bg-white rounded-xl shadow h-full flex items-center justify-center p-4"
            isDraggable={false}
          >
            {/* Chart Container - Specific requirements */}
            <div className="chart-container bg-white rounded-lg shadow-sm border min-w-[600px] min-h-[350px] w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-[0.94rem] select-none">
                [Chart]
              </span>
            </div>
          </DraggableContainer>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Orderbook Panel */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={50}>
          <DraggableContainer
            className="bg-white rounded-xl shadow h-full flex items-center justify-center"
            isDraggable={false}
          >
            <span className="text-gray-400 text-[0.84rem] select-none">
              [Orderbuch]
            </span>
          </DraggableContainer>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Instructions */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Ziehen Sie den Griff zwischen den Bereichen, um die Größe anzupassen
      </div>
    </div>
  );
};

export default ChartSection;
