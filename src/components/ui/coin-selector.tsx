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

const CoinSelector = ({
  selectedCoin,
  onCoinSelect,
}: {
  selectedCoin: string;
  onCoinSelect: (coin: CoinData) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const coins: CoinData[] = [
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
  ];

  const handleCoinSelect = (coin: CoinData) => {
    onCoinSelect(coin);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        className="border-2 border-[#e4261c] text-[#e4261c] rounded px-0 py-1.5 font-medium bg-transparent my-auto w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCoin}&nbsp;&nbsp;&nbsp;&nbsp;
        <span>▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 max-w-[658px]">
          <div className="min-w-[441px] rounded-[13px] shadow-[0_3px_22px_0_rgba(40,60,120,0.13)] border-[1px] border-[#eee] bg-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center px-[21px] bg-[#f7fafd] font-bold h-10 text-[#65717c] tracking-[0.03em] border-b border-[#f3f3f3] text-[0.69rem]">
              <div className="w-[48px] text-center text-[#ffd600] text-[8.4px] leading-[13px]">
                ★
              </div>
              <div className="w-[120px] font-bold text-[0.58rem]">Coin</div>
              <div className="w-[115px] text-right text-[0.58rem]">
                Letzter Preis
              </div>
              <div className="w-[125px] text-right text-[0.58rem]">Δ 24h</div>
              <div className="w-[49px] text-center text-[0.57rem]">Live</div>
              <div className="w-[49px] text-center text-[0.57rem]">Hist</div>
            </div>

            {/* Coin Rows */}
            {coins.map((coin) => (
              <div
                key={coin.id}
                className={`flex items-center px-[21px] h-[43px] text-[0.77rem] cursor-pointer transition-all duration-[140ms] border-b border-[#f3f3f3] last:border-b-0 ${
                  coin.symbol === selectedCoin
                    ? "bg-[#eaffee]"
                    : "hover:bg-[#f5fafe]"
                }`}
                onClick={() => handleCoinSelect(coin)}
              >
                <div className="w-[48px] text-center">
                  <span
                    className={`text-[0.71em] ${
                      coin.isFavorite ? "text-[#ffd600]" : "text-[#e7e7e7]"
                    }`}
                  >
                    ★
                  </span>
                </div>
                <div className="w-[120px] font-bold">{coin.symbol}</div>
                <div className="w-[115px] text-right font-medium font-mono">
                  {coin.price}
                </div>
                <div
                  className={`w-[125px] text-right font-bold ${
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
