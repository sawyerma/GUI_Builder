import { useState } from "react";
import TradingNav from "../components/ui/trading-nav";
import PriceDisplay from "../components/ui/price-display";
import TimeButtons from "../components/ui/time-buttons";
import ChartSection from "../components/ui/chart-section";
import CoinSelector from "../components/ui/coin-selector";
import ThemeProvider from "../components/ui/theme-provider";
import Database from "./Database";
import AI from "./AI";
import ML from "./ML";
import Whales from "./Whales";
import News from "./News";

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
  const [viewMode, setViewMode] = useState<
    "trading" | "database" | "ai" | "ml" | "whales" | "news"
  >("trading");
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

  // Deine Marktdaten als Variablen - diese kannst du von deinem Programm übergeben
  const [marketData, setMarketData] = useState({
    change24h: "-3.56%", // Variable 1
    high24h: "110.157,20", // Variable 2
    low24h: "99.666,04", // Variable 3
    volume24h: "6.08K", // Variable 4
    turnover24h: "645.65M", // Variable 5
    category: "Public Chain", // Variable 6
  });

  // Trading Mode State (Spot oder Futures-Option)
  const [tradingMode, setTradingMode] = useState("Spot");

  const handleCoinSelect = (coin: CoinData) => {
    setSelectedCoin(coin.symbol);
    setCurrentCoinData(coin);
  };

  // Show different views based on mode
  if (viewMode === "database") {
    return <Database onBackToTrading={() => setViewMode("trading")} />;
  }
  if (viewMode === "ai") {
    return <AI onBackToTrading={() => setViewMode("trading")} />;
  }
  if (viewMode === "ml") {
    return <ML onBackToTrading={() => setViewMode("trading")} />;
  }
  if (viewMode === "whales") {
    return <Whales onBackToTrading={() => setViewMode("trading")} />;
  }
  if (viewMode === "news") {
    return <News onBackToTrading={() => setViewMode("trading")} />;
  }

  return (
    <ThemeProvider>
      <div
        className="bg-[#fbfcfd] dark:bg-gray-900 text-[#222] dark:text-white min-h-screen px-6 py-5 transition-colors"
        style={{
          fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'",
        }}
      >
        {/* Design Mode Switcher - Only visible for development */}
        <div className="fixed top-4 right-20 z-50 flex flex-wrap gap-1 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border dark:border-gray-600 max-w-80">
          <button
            onClick={() => setViewMode("trading")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              viewMode === "trading"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Trading
          </button>
          <button
            onClick={() => setViewMode("database")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              viewMode === "database"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Database
          </button>
          <button
            onClick={() => setViewMode("ai")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              viewMode === "ai"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            AI
          </button>
          <button
            onClick={() => setViewMode("ml")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              viewMode === "ml"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            ML
          </button>
          <button
            onClick={() => setViewMode("whales")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              viewMode === "whales"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Whales
          </button>
          <button
            onClick={() => setViewMode("news")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              viewMode === "news"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            News
          </button>
        </div>

        {/* Top Navigation */}
        <TradingNav
          onTradingModeChange={setTradingMode}
          onViewChange={setViewMode}
        />

        {/* Market & Price Section */}
        <div className="flex gap-5 max-lg:flex-col max-lg:gap-0">
          {/* Column 1: Coin Selector */}
          <div className="flex flex-col w-[17%] max-lg:w-full max-lg:ml-0">
            <CoinSelector
              selectedCoin={selectedCoin}
              onCoinSelect={handleCoinSelect}
              showLiveStatus={true}
              showHistStatus={true}
            />
          </div>

          {/* Column 2: Price Display */}
          <div className="flex flex-col w-[83%] ml-5 max-lg:w-full max-lg:ml-0">
            <PriceDisplay
              currentCoinData={currentCoinData}
              marketData={marketData}
              tradingMode={tradingMode}
            />
          </div>
        </div>

        {/* Time Buttons */}
        <TimeButtons />

        {/* Main Content: Chart + Orderbook */}
        <ChartSection selectedCoin={selectedCoin} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
