import TradingNav from "../components/ui/trading-nav";
import PriceDisplay from "../components/ui/price-display";
import TimeButtons from "../components/ui/time-buttons";
import ChartSection from "../components/ui/chart-section";
import LatencyIndicators from "../components/ui/latency-indicators";

const Index = () => {
  return (
    <div className="bg-[#fbfcfd] text-[#222] font-sans min-h-screen px-6 py-5">
      {/* Top Navigation */}
      <TradingNav />

      {/* Market & Price Section */}
      <div className="flex gap-5 max-lg:flex-col max-lg:gap-0">
        {/* Column 1: BTC/USDT Selector */}
        <div className="flex flex-col w-[17%] max-lg:w-full max-lg:ml-0">
          <button className="border-2 border-[#e4261c] text-[#e4261c] rounded px-0 py-1.5 font-medium bg-transparent my-auto">
            BTC/USDT&nbsp;&nbsp;&nbsp;&nbsp;
            <span>▼</span>
          </button>
        </div>

        {/* Column 2: Price Display */}
        <div className="flex flex-col w-[83%] ml-5 max-lg:w-full max-lg:ml-0">
          <PriceDisplay />
        </div>
      </div>

      {/* Time Buttons */}
      <TimeButtons />

      {/* Main Content: Chart + Orderbook */}
      <ChartSection />

      {/* Latency Indicators */}
      <LatencyIndicators />
    </div>
  );
};

export default Index;
