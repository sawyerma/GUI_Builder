import TradingNav from "../components/ui/trading-nav";
import CoinTable from "../components/ui/coin-table";
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
      <div className="flex items-start gap-8 mb-1">
        {/* Coin Dropdown Table */}
        <CoinTable />

        {/* Price Display */}
        <PriceDisplay />
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
