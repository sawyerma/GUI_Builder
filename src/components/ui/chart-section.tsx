import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";

const ChartSection = () => {
  return (
    <div className="mt-1 h-[500px]">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[500px] rounded-lg border"
      >
        {/* Main Chart Panel */}
        <ResizablePanel defaultSize={75} minSize={50}>
          <div className="bg-white rounded-xl shadow h-full flex items-center justify-center p-4">
            {/* Chart Container */}
            <div className="chart-container bg-white rounded-lg shadow-sm border min-w-[600px] min-h-[350px] w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-[0.94rem]">[Chart]</span>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Orderbook Panel */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="bg-white rounded-xl shadow h-full flex items-center justify-center">
            <span className="text-gray-400 text-[0.84rem]">[Orderbuch]</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ChartSection;
