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

interface MarketData {
  change24h: string; // z.B. "-3.56%"
  high24h: string; // z.B. "110.157,20"
  low24h: string; // z.B. "99.666,04"
  volume24h: string; // z.B. "6.08K"
  turnover24h: string; // z.B. "645.65M"
  category: string; // z.B. "Public Chain"
}

interface PriceDisplayProps {
  currentCoinData: CoinData;
  marketData?: MarketData; // Optional - falls nicht übergeben werden Dummy-Daten verwendet
  tradingMode?: string; // "Spot" oder gewählte Futures-Option
}

const PriceDisplay = ({
  currentCoinData,
  marketData,
  tradingMode = "Spot",
}: PriceDisplayProps) => {
  // Fallback zu Dummy-Daten wenn keine MarketData übergeben werden
  const defaultMarketData: MarketData = {
    change24h: currentCoinData.change,
    high24h: "108,957.20",
    low24h: "103,399.96",
    volume24h: "6.08K",
    turnover24h: "645.65M",
    category: "Public Chain",
  };

  const data = marketData || defaultMarketData;

  return (
    <div className="flex items-start gap-8 mb-1">
      {/* Price + Type */}
      <div className="flex flex-col items-start min-w-[170px]">
        <span className="text-[1.65rem] font-bold text-[#e4261c] leading-tight tracking-wider">
          {currentCoinData.price}
        </span>
        <span className="text-sm text-[#444] tracking-wider mt-0">
          {tradingMode}
        </span>
      </div>

      {/* Market Data - All in one line */}
      <div className="flex items-center gap-x-6 text-[0.8rem] mt-2 font-sans whitespace-nowrap">
        <span>
          Δ 24h:{" "}
          <span
            className={`font-bold ${currentCoinData.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {data.change24h}
          </span>
        </span>
        <span>
          24h Hoch: <b>{data.high24h}</b>
        </span>
        <span>
          24h Tief: <b>{data.low24h}</b>
        </span>
        <span>
          24h Vol ({currentCoinData.symbol.split("/")[0]}):{" "}
          <b>{data.volume24h}</b>
        </span>
        <span>
          24h Umsatz ({currentCoinData.symbol.split("/")[1]}):{" "}
          <b>{data.turnover24h}</b>
        </span>
        <span>
          Kategorie: <span className="font-bold">{data.category}</span>
        </span>
      </div>
    </div>
  );
};

export default PriceDisplay;
