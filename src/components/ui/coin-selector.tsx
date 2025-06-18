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
  showLiveStatus = true,
  showHistStatus = true,
}: {
  selectedCoin: string;
  onCoinSelect: (coin: CoinData) => void;
  showLiveStatus?: boolean;
  showHistStatus?: boolean;
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
        <div className="absolute top-full left-0 mt-2 z-50 max-w-[480px]">
          <div className="min-w-[368px] rounded-xl shadow-2xl bg-white dark:bg-gray-800 overflow-hidden backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 font-bold h-9 text-gray-600 dark:text-gray-300 tracking-wide font-sans text-[10px] uppercase">
              <div
                className="w-[24px] text-center text-yellow-500 text-[10px] cursor-pointer hover:bg-white/50 dark:hover:bg-gray-600/50 rounded transition-all"
                onClick={() => sortCoins("favorite")}
              >
                ★
              </div>
              <div
                className="w-[70px] font-bold text-[10px] cursor-pointer hover:bg-white/50 dark:hover:bg-gray-600/50 rounded px-1 transition-all"
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
                className="w-[65px] text-right text-[10px] cursor-pointer hover:bg-white/50 dark:hover:bg-gray-600/50 rounded px-1 transition-all"
                onClick={() => sortCoins("price")}
              >
                Price{" "}
                {sortField === "price" && (sortDirection === "asc" ? "↑" : "↓")}
              </div>
              <div
                className="w-[55px] text-right text-[10px] cursor-pointer hover:bg-white/50 dark:hover:bg-gray-600/50 rounded px-1 transition-all"
                onClick={() => sortCoins("change")}
              >
                24h{" "}
                {sortField === "change" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </div>
              <div
                className="w-[26px] text-center text-[10px] cursor-pointer hover:bg-white/50 dark:hover:bg-gray-600/50 rounded px-1 transition-all"
                onClick={() => sortCoins("live")}
              >
                L{" "}
                {sortField === "live" && (sortDirection === "asc" ? "↑" : "↓")}
              </div>
              <div
                className="w-[26px] text-center text-[10px] cursor-pointer hover:bg-white/50 dark:hover:bg-gray-600/50 rounded px-1 transition-all"
                onClick={() => sortCoins("hist")}
              >
                H{" "}
                {sortField === "hist" && (sortDirection === "asc" ? "↑" : "↓")}
              </div>
            </div>

            {/* Coin Rows */}
            {coins.map((coin) => (
              <div
                key={coin.id}
                className={`flex items-center px-4 h-[36px] font-sans text-[10px] cursor-pointer transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                  coin.symbol === selectedCoin
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-sm"
                    : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600"
                }`}
                onClick={() => handleCoinSelect(coin)}
              >
                <div className="w-[24px] text-center">
                  <span
                    className={`text-[10px] cursor-pointer hover:scale-125 transition-transform duration-200 ${
                      coin.isFavorite
                        ? "text-yellow-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    onClick={(e) => toggleFavorite(coin.id, e)}
                  >
                    ★
                  </span>
                </div>
                <div className="w-[70px] font-bold text-[10px] dark:text-white truncate">
                  {coin.symbol}
                </div>
                <div className="w-[65px] text-right font-semibold text-[10px] dark:text-gray-200">
                  {coin.price}
                </div>
                <div
                  className={`w-[55px] text-right font-bold text-[10px] ${
                    coin.changePercent >= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.change}
                </div>
                <div className="w-[26px] text-center">
                  {showLiveStatus && (
                    <span
                      className="inline-block rounded-full shadow-sm"
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor:
                          coin.liveStatus === "green"
                            ? "rgba(16, 185, 129, 0.9)"
                            : "rgba(239, 68, 68, 0.9)",
                        border: "none",
                      }}
                    ></span>
                  )}
                </div>
                <div className="w-[26px] text-center">
                  {showHistStatus && (
                    <span
                      className="inline-block rounded-full shadow-sm"
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor:
                          coin.histStatus === "green"
                            ? "rgba(16, 185, 129, 0.9)"
                            : "rgba(239, 68, 68, 0.9)",
                        border: "none",
                      }}
                    ></span>
                  )}
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
