import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";
import Orderbook from "./orderbook";
import TradingChart from "./trading-chart";
import LatencyIndicators from "./latency-indicators";
import TradingTerminal from "./trading-terminal";

const ChartSection = ({
  selectedCoin = "BTC/USDT",
}: {
  selectedCoin?: string;
}) => {
  return (
    <div className="mt-1 space-y-4">
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
              <Orderbook selectedCoin={selectedCoin} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Trading Terminal */}
      <div className="mt-4 space-y-2">
        <TradingTerminal />

        {/* System Status - ALWAYS below terminal, never overlaps */}
        <div className="flex justify-end">
          <LatencyIndicators systemStatus="stable" />
        </div>
      </div>
    </div>
  );
};
export default ChartSection;
