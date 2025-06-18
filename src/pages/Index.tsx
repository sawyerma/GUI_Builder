import { useState } from "react";
import TradingNav from "../components/ui/trading-nav";
import PriceDisplay from "../components/ui/price-display";
import TimeButtons from "../components/ui/time-buttons";
import ChartSection from "../components/ui/chart-section";
import LatencyIndicators from "../components/ui/latency-indicators";
import CoinSelector from "../components/ui/coin-selector";

interface CoinData {
  id: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: number;
  isFavorite: boolean;
  liveStatus: "green" | "red";
  histStatus: "green" | "red";
}

const Index = () => {
  const [selectedCoin, setSelectedCoin] = useState("BTC/USDT");
  const [currentCoinData, setCurrentCoinData] = useState<CoinData>({
    id: "1",
    symbol: "BTC/USDT",
    price: "104,911.62",
    change: "-3.56%",
    changePercent: -3.56,
    isFavorite: true,
    liveStatus: "green",
    histStatus: "green",
  });

  const handleCoinSelect = (coin: CoinData) => {
    setSelectedCoin(coin.symbol);
    setCurrentCoinData(coin);
  };

  return (
    <div className="bg-[#fbfcfd] text-[#222] font-sans min-h-screen px-6 py-5">
      {/* Top Navigation */}
      <TradingNav />

      {/* Market & Price Section */}
      <div className="flex gap-5 max-lg:flex-col max-lg:gap-0">
        {/* Column 1: Coin Selector */}
        <div className="flex flex-col w-[17%] max-lg:w-full max-lg:ml-0">
          <CoinSelector
            selectedCoin={selectedCoin}
            onCoinSelect={handleCoinSelect}
          />
        </div>

        {/* Column 2: Price Display */}
        <div className="flex flex-col w-[83%] ml-5 max-lg:w-full max-lg:ml-0">
          <PriceDisplay currentCoinData={currentCoinData} />
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
