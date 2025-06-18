import { useState } from "react";

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

type SortField = "favorite" | "coin" | "price" | "change" | "live" | "hist";
type SortDirection = "asc" | "desc" | "random";

const CoinSelector = ({
  selectedCoin,
  onCoinSelect,
}: {
  selectedCoin: string;
  onCoinSelect: (coin: CoinData) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>("coin");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [coins, setCoins] = useState<CoinData[]>([
    {
      id: "1",
      symbol: "BTC/USDT",
      price: "104,911.62",
      change: "-3.56 %",
      changePercent: -3.56,
      isFavorite: true,
      liveStatus: "green",
      histStatus: "green",
    },
    {
      id: "2",
      symbol: "ETH/USDT",
      price: "3,252.10",
      change: "+1.20 %",
      changePercent: 1.2,
      isFavorite: false,
      liveStatus: "green",
      histStatus: "red",
    },
    {
      id: "3",
      symbol: "SOL/USDT",
      price: "134.51",
      change: "+0.30 %",
      changePercent: 0.3,
      isFavorite: true,
      liveStatus: "green",
      histStatus: "green",
    },
    {
      id: "4",
      symbol: "BTC/USD",
      price: "104,420.00",
      change: "-0.18 %",
      changePercent: -0.18,
      isFavorite: false,
      liveStatus: "red",
      histStatus: "red",
    },
  ]);

  const sortCoins = (field: SortField) => {
    let newDirection: SortDirection = "asc";

    if (sortField === field) {
      if (sortDirection === "asc") {
        newDirection = "desc";
      } else if (sortDirection === "desc") {
        newDirection = field === "coin" ? "random" : "asc";
      } else {
        newDirection = "asc";
      }
    }

    setSortField(field);
    setSortDirection(newDirection);

    const sortedCoins = [...coins].sort((a, b) => {
      if (newDirection === "random") {
        return Math.random() - 0.5;
      }

      let aValue: any, bValue: any;

      switch (field) {
        case "favorite":
          aValue = a.isFavorite ? 1 : 0;
          bValue = b.isFavorite ? 1 : 0;
          break;
        case "coin":
          aValue = a.symbol;
          bValue = b.symbol;
          break;
        case "price":
          aValue = parseFloat(a.price.replace(/,/g, ""));
          bValue = parseFloat(b.price.replace(/,/g, ""));
          break;
        case "change":
          aValue = a.changePercent;
          bValue = b.changePercent;
          break;
        case "live":
          aValue = a.liveStatus === "green" ? 1 : 0;
          bValue = b.liveStatus === "green" ? 1 : 0;
          break;
        case "hist":
          aValue = a.histStatus === "green" ? 1 : 0;
          bValue = b.histStatus === "green" ? 1 : 0;
          break;
        default:
          return 0;
      }

      if (newDirection === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    setCoins(sortedCoins);
  };

  const handleCoinSelect = (coin: CoinData) => {
    onCoinSelect(coin);
    setIsOpen(false);
  };

  const toggleFavorite = (coinId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCoins(
      coins.map((coin) =>
        coin.id === coinId ? { ...coin, isFavorite: !coin.isFavorite } : coin,
      ),
    );
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        className="text-[#222] dark:text-white rounded px-0 py-1.5 font-medium bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 my-auto w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCoin}&nbsp;&nbsp;&nbsp;&nbsp;
        <span>▽</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 max-w-[658px]">
          <div className="min-w-[441px] rounded-[13px] shadow-[0_3px_22px_0_rgba(40,60,120,0.13)] border-[1px] border-[#eee] dark:border-[#666] bg-white dark:bg-gray-800 overflow-hidden">
            {/* Header */}
            <div className="flex items-center px-[21px] bg-[#f7fafd] dark:bg-gray-700 font-bold h-10 text-[#65717c] dark:text-gray-300 tracking-[0.03em] border-b border-[#f3f3f3] dark:border-gray-600 font-sans text-[11px]">
              <div
                className="w-[48px] text-center text-[#ffd600] text-[11px] cursor-pointer hover:bg-[#f0f8ff] transition-colors"
                onClick={() => sortCoins("favorite")}
              >
                ★
              </div>
              <div
                className="w-[110px] font-bold text-[11px] cursor-pointer hover:bg-[#f0f8ff] transition-colors"
                onClick={() => sortCoins("coin")}
              >
                Coin{" "}
                {sortField === "coin" &&
                  (sortDirection === "asc"
                    ? "↑"
                    : sortDirection === "desc"
                      ? "↓"
                      : "~")}
              </div>
              <div
                className="w-[105px] text-right text-[11px] cursor-pointer hover:bg-[#f0f8ff] transition-colors"
                onClick={() => sortCoins("price")}
              >
                Price{" "}
                {sortField === "price" && (sortDirection === "asc" ? "↑" : "↓")}
              </div>
              <div
                className="w-[135px] text-right text-[11px] cursor-pointer hover:bg-[#f0f8ff] transition-colors"
                onClick={() => sortCoins("change")}
              >
                Δ 24h{" "}
                {sortField === "change" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </div>
              <div
                className="w-[49px] text-center text-[11px] cursor-pointer hover:bg-[#f0f8ff] transition-colors"
                onClick={() => sortCoins("live")}
              >
                Live{" "}
                {sortField === "live" && (sortDirection === "asc" ? "↑" : "↓")}
              </div>
              <div
                className="w-[49px] text-center text-[11px] cursor-pointer hover:bg-[#f0f8ff] transition-colors"
                onClick={() => sortCoins("hist")}
              >
                Hist{" "}
                {sortField === "hist" && (sortDirection === "asc" ? "↑" : "↓")}
              </div>
            </div>

            {/* Coin Rows */}
            {coins.map((coin) => (
              <div
                key={coin.id}
                className={`flex items-center px-[21px] h-[43px] font-sans text-[11px] cursor-pointer transition-all duration-[140ms] border-b border-[#f3f3f3] dark:border-gray-600 last:border-b-0 ${
                  coin.symbol === selectedCoin
                    ? "bg-[#eaffee] dark:bg-gray-600"
                    : "hover:bg-[#f5fafe] dark:hover:bg-gray-700"
                }`}
                onClick={() => handleCoinSelect(coin)}
              >
                <div className="w-[48px] text-center">
                  <span
                    className={`text-[11px] cursor-pointer hover:scale-110 transition-transform ${
                      coin.isFavorite ? "text-[#ffd600]" : "text-[#e7e7e7]"
                    }`}
                    onClick={(e) => toggleFavorite(coin.id, e)}
                  >
                    ★
                  </span>
                </div>
                <div className="w-[110px] font-bold text-[11px] dark:text-white">
                  {coin.symbol}
                </div>
                <div className="w-[105px] text-right font-medium font-mono text-[11px]">
                  {coin.price}
                </div>
                <div
                  className={`w-[135px] text-right font-bold text-[11px] ${
                    coin.changePercent >= 0
                      ? "text-[#15b446]"
                      : "text-[#d53939]"
                  }`}
                >
                  {coin.change}
                </div>
                <div className="w-[49px] text-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full border-[1px] ${
                      coin.liveStatus === "green"
                        ? "bg-[#41cf58] border-[#40ba59]"
                        : "bg-[#ef4444] border-[#d73c3c]"
                    }`}
                  ></span>
                </div>
                <div className="w-[49px] text-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full border-[1px] ${
                      coin.histStatus === "green"
                        ? "bg-[#41cf58] border-[#40ba59]"
                        : "bg-[#ef4444] border-[#d73c3c]"
                    }`}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default CoinSelector;
