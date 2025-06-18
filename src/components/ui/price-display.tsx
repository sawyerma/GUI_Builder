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

interface PriceDisplayProps {
  currentCoinData: CoinData;
}

const PriceDisplay = ({ currentCoinData }: PriceDisplayProps) => {
  // Generate sample market data based on selected coin
  const getMarketData = (coin: CoinData) => {
    const baseData = {
      high: parseFloat(coin.price.replace(/,/g, "")) * 1.05,
      low: parseFloat(coin.price.replace(/,/g, "")) * 0.95,
      volume: coin.symbol.includes("BTC")
        ? "6.08K"
        : coin.symbol.includes("ETH")
          ? "12.5K"
          : "8.2K",
      turnover: coin.symbol.includes("BTC")
        ? "645.65M"
        : coin.symbol.includes("ETH")
          ? "42.8M"
          : "1.1M",
    };

    return {
      high: baseData.high.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      low: baseData.low.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      volume: baseData.volume,
      turnover: baseData.turnover,
    };
  };

  const marketData = getMarketData(currentCoinData);

  return (
    <div className="flex items-start gap-8 mb-1">
      {/* Price + Type */}
      <div className="flex flex-col items-start min-w-[170px]">
        <span className="text-[1.65rem] font-bold text-[#e4261c] leading-tight tracking-wider">
          {currentCoinData.price}
        </span>
        <span className="text-sm text-[#444] tracking-wider mt-0">SPOT</span>
      </div>

      {/* Market Data - All in one line */}
      <div className="flex items-center gap-x-6 text-[0.8rem] mt-2 font-sans whitespace-nowrap">
        <span>
          Δ 24h:{" "}
          <span
            className={`font-bold ${currentCoinData.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {currentCoinData.change}
          </span>
        </span>
        <span>
          24h Hoch: <b>{marketData.high}</b>
        </span>
        <span>
          24h Tief: <b>{marketData.low}</b>
        </span>
        <span>
          24h Vol ({currentCoinData.symbol.split("/")[0]}):{" "}
          <b>{marketData.volume}</b>
        </span>
        <span>
          24h Umsatz ({currentCoinData.symbol.split("/")[1]}):{" "}
          <b>{marketData.turnover}</b>
        </span>
        <span>
          Kategorie: <span className="font-bold">Public Chain</span>
        </span>
      </div>
    </div>
  );
};

export default PriceDisplay;
