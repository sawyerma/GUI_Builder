import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";
import Orderbook from "./orderbook";
import TradingChart from "./trading-chart";
import LatencyIndicators from "./latency-indicators";

const ChartSection = () => {
  return (
    <div className="mt-1">
      <div className="h-[500px]">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[500px] rounded-lg border"
        >
          {/* Chart Panel */}
          <ResizablePanel defaultSize={75} minSize={50}>
            <div className="h-full">
              <TradingChart />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Orderbook Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={50}>
            <div className="h-full">
              <Orderbook />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Instructions */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Ziehen Sie den Griff zwischen den Bereichen, um die Größe anzupassen
      </div>

      {/* Latency and System Status */}
      <LatencyIndicators systemStatus="stable" />
    </div>
  );
};
export default ChartSection;
