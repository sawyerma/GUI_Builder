import { useState } from "react";
import DataContainer, { DataRow } from "./data-container";

interface OrderbookEntry {
  price: number;
  amount: number;
  total: number;
  side: "buy" | "sell";
}

interface Trade {
  id: string;
  price: number;
  amount: number;
  time: string;
  side: "buy" | "sell";
}

interface OrderbookProps {
  orders?: OrderbookEntry[];
  trades?: Trade[];
  currentPrice?: number;
  onDataUpdate?: (data: { orders: OrderbookEntry[]; trades: Trade[] }) => void;
  onTabChange?: (tab: "orderbook" | "trades") => void;
}

const Orderbook = ({
  orders = [],
  trades = [],
  currentPrice = 104534.14,
  onDataUpdate,
  onTabChange,
}: OrderbookProps) => {
  const [activeTab, setActiveTab] = useState<"orderbook" | "trades">(
    "orderbook",
  );

  const handleTabChange = (tab: "orderbook" | "trades") => {
    console.log("Tab change requested:", tab); // Debug log
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Dummy data for demonstration - will be replaced by real data
  const dummyOrders: OrderbookEntry[] = [
    // Sell orders (red) - higher prices
    { price: 104552.41, amount: 0.029067, total: 3039.0249, side: "sell" },
    { price: 104552.4, amount: 0.005812, total: 607.6585, side: "sell" },
    { price: 104552.37, amount: 0.024529, total: 2564.5651, side: "sell" },
    { price: 104552.32, amount: 0.013257, total: 1386.0501, side: "sell" },
    { price: 104552.3, amount: 0.005389, total: 563.4323, side: "sell" },
    { price: 104550.53, amount: 0.191083, total: 19977.8289, side: "sell" },
    { price: 104547.79, amount: 0.091836, total: 9601.2508, side: "sell" },
    { price: 104547.76, amount: 0.15131, total: 15819.1216, side: "sell" },
    { price: 104547.75, amount: 0.143441, total: 14996.4338, side: "sell" },
    { price: 104542.99, amount: 0.004781, total: 499.82, side: "sell" },
    { price: 104542.98, amount: 0.001434, total: 149.9146, side: "sell" },
    { price: 104542.36, amount: 0.106835, total: 11168.783, side: "sell" },
    { price: 104541.33, amount: 0.108614, total: 11354.652, side: "sell" },
    { price: 104537.98, amount: 0.064635, total: 6756.8123, side: "sell" },
    { price: 104534.15, amount: 0.134642, total: 14074.687, side: "sell" },

    // Buy orders (green) - lower prices
    { price: 104534.14, amount: 0.068625, total: 7173.6554, side: "buy" },
    { price: 104531.55, amount: 0.085906, total: 8979.8873, side: "buy" },
    { price: 104531.54, amount: 0.108879, total: 11381.2895, side: "buy" },
    { price: 104529.06, amount: 0.191083, total: 19973.7264, side: "buy" },
    { price: 104524.86, amount: 0.07914, total: 8272.0974, side: "buy" },
    { price: 104524.85, amount: 0.191083, total: 19972.9219, side: "buy" },
    { price: 104523.99, amount: 0.004781, total: 499.7292, side: "buy" },
    { price: 104523.62, amount: 0.09182, total: 9597.3588, side: "buy" },
    { price: 104520.7, amount: 0.10281, total: 10745.7732, side: "buy" },
    { price: 104520.65, amount: 0.191083, total: 19972.1194, side: "buy" },
    { price: 104520.62, amount: 0.004893, total: 511.4194, side: "buy" },
    { price: 104517.8, amount: 0.000716, total: 74.8347, side: "buy" },
    { price: 104517.15, amount: 0.155075, total: 16207.997, side: "buy" },
    { price: 104515.59, amount: 0.087365, total: 9131.0045, side: "buy" },
    { price: 104515.42, amount: 0.191083, total: 19971.12, side: "buy" },
  ];

  const dummyTrades: Trade[] = [
    {
      id: "1",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:59",
      side: "sell",
    },
    {
      id: "2",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:59",
      side: "sell",
    },
    {
      id: "3",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:58",
      side: "sell",
    },
    {
      id: "4",
      price: 104534.15,
      amount: 0.000173,
      time: "23:53:58",
      side: "buy",
    },
    {
      id: "5",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:58",
      side: "sell",
    },
    {
      id: "6",
      price: 104534.15,
      amount: 0.000116,
      time: "23:53:58",
      side: "buy",
    },
    {
      id: "7",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:58",
      side: "sell",
    },
    {
      id: "8",
      price: 104534.14,
      amount: 0.000145,
      time: "23:53:58",
      side: "sell",
    },
    {
      id: "9",
      price: 104534.15,
      amount: 0.000098,
      time: "23:53:57",
      side: "buy",
    },
    {
      id: "10",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:57",
      side: "sell",
    },
    {
      id: "11",
      price: 104534.14,
      amount: 0.000173,
      time: "23:53:57",
      side: "sell",
    },
    {
      id: "12",
      price: 104534.15,
      amount: 0.000135,
      time: "23:53:57",
      side: "buy",
    },
    {
      id: "13",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:57",
      side: "sell",
    },
    {
      id: "14",
      price: 104534.15,
      amount: 0.000173,
      time: "23:53:57",
      side: "buy",
    },
    {
      id: "15",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:57",
      side: "sell",
    },
    {
      id: "16",
      price: 104534.15,
      amount: 0.000135,
      time: "23:53:57",
      side: "buy",
    },
    {
      id: "17",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:56",
      side: "sell",
    },
    {
      id: "18",
      price: 104534.14,
      amount: 0.000106,
      time: "23:53:56",
      side: "sell",
    },
    {
      id: "19",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:56",
      side: "sell",
    },
    {
      id: "20",
      price: 104534.15,
      amount: 0.000106,
      time: "23:53:56",
      side: "buy",
    },
    {
      id: "21",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:56",
      side: "sell",
    },
    {
      id: "22",
      price: 104534.15,
      amount: 0.000106,
      time: "23:53:56",
      side: "buy",
    },
    {
      id: "23",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:55",
      side: "sell",
    },
    {
      id: "24",
      price: 104534.15,
      amount: 0.000116,
      time: "23:53:55",
      side: "buy",
    },
    {
      id: "25",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:55",
      side: "sell",
    },
    {
      id: "26",
      price: 104534.14,
      amount: 0.000135,
      time: "23:53:55",
      side: "sell",
    },
    {
      id: "27",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:55",
      side: "sell",
    },
    {
      id: "28",
      price: 104534.15,
      amount: 0.000135,
      time: "23:53:55",
      side: "buy",
    },
    {
      id: "29",
      price: 104534.14,
      amount: 0.000396,
      time: "23:53:54",
      side: "sell",
    },
    {
      id: "30",
      price: 104534.14,
      amount: 0.000164,
      time: "23:53:54",
      side: "sell",
    },
  ];

  const ordersToShow = orders.length > 0 ? orders : dummyOrders;
  const tradesToShow = trades.length > 0 ? trades : dummyTrades;

  // Convert your external data to display format
  const formatTradeData = (trades: Trade[]) => {
    return trades.map((trade) => ({
      col1: formatNumber(trade.price, 2),
      col2: trade.amount.toFixed(6),
      col3: trade.time,
      col1Color: trade.side === "buy" ? "text-green-500" : "text-red-500",
      col2Color: "text-gray-600",
      col3Color: "text-gray-500",
      arrow: trade.side === "buy" ? ("up" as const) : ("down" as const),
    }));
  };

  const formatOrderData = (orders: OrderbookEntry[]) => {
    return orders.map((order) => ({
      col1: formatNumber(order.price, 2),
      col2: order.amount.toFixed(6),
      col3: formatNumber(order.total),
      col1Color: order.side === "buy" ? "text-green-500" : "text-red-500",
      col2Color: "text-gray-600",
      col3Color: "text-gray-600",
      backgroundColor: order.side === "buy" ? "bg-green-50" : "bg-red-50",
      volumeWidth: getVolumeWidth(order.total, maxTotal),
    }));
  };

  const sellOrders = ordersToShow
    .filter((order) => order.side === "sell")
    .sort((a, b) => b.price - a.price);
  const buyOrders = ordersToShow
    .filter((order) => order.side === "buy")
    .sort((a, b) => b.price - a.price);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString("de-DE", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const getVolumeWidth = (total: number, maxTotal: number) => {
    return Math.min((total / maxTotal) * 100, 100);
  };

  const maxTotal = Math.max(...ordersToShow.map((order) => order.total));

  return (
    <div className="bg-white rounded-xl shadow h-full flex flex-col">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200 px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex relative">
            <button
              onClick={() => handleTabChange("orderbook")}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === "orderbook"
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Orderbuch
              {activeTab === "orderbook" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => handleTabChange("trades")}
              className={`px-4 py-2 text-sm font-medium transition-colors ml-6 relative ${
                activeTab === "trades"
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Markt-Trades
              {activeTab === "trades" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
          </div>

          {/* Settings Icon */}
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-4 h-4 flex flex-col justify-center gap-0.5">
              <div className="h-0.5 bg-current rounded"></div>
              <div className="h-0.5 bg-current rounded"></div>
              <div className="h-0.5 bg-current rounded"></div>
            </div>
          </div>
        </div>

        {/* Column Headers */}
        {activeTab === "orderbook" && (
          <div className="grid grid-cols-3 text-xs text-gray-500 pb-2">
            <div className="text-left">Preis (USDT)</div>
            <div className="text-center">Betrag (BTC)</div>
            <div className="text-right">Umsatz</div>
          </div>
        )}

        {activeTab === "trades" && (
          <div className="grid grid-cols-3 text-xs text-gray-500 pb-2">
            <div className="text-left">Preis (USDT)</div>
            <div className="text-center">Betrag (BTC)</div>
            <div className="text-right">Zeit</div>
          </div>
        )}

        {/* Precision Controls for Orderbook */}
        {activeTab === "orderbook" && (
          <div className="flex items-center gap-1 pb-3">
            <div className="flex gap-1">
              <button className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                📊
              </button>
              <button className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                📈
              </button>
              <button className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                📉
              </button>
            </div>
            <div className="ml-auto">
              <select className="text-xs bg-gray-100 border-none rounded px-2 py-1">
                <option>0.01</option>
                <option>0.1</option>
                <option>1</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "orderbook" ? (
          <div className="h-full flex flex-col">
            {/* Sell Orders */}
            <div className="flex-1 overflow-y-auto">
              {sellOrders.map((order, index) => (
                <div key={`sell-${index}`} className="relative">
                  {/* Volume Background */}
                  <div
                    className="absolute right-0 top-0 h-full bg-red-50"
                    style={{
                      width: `${getVolumeWidth(order.total, maxTotal)}%`,
                    }}
                  ></div>

                  {/* Order Row */}
                  <div className="relative grid grid-cols-3 text-xs py-1 px-4 hover:bg-gray-50">
                    <div className="text-red-500 font-mono">
                      {formatNumber(order.price, 2)}
                    </div>
                    <div className="text-center text-gray-600 font-mono">
                      {order.amount.toFixed(6)}
                    </div>
                    <div className="text-right text-gray-600 font-mono">
                      {formatNumber(order.total)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Price */}
            <div className="border-y border-gray-200 bg-gray-50 py-2 px-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-red-500">
                  {formatNumber(currentPrice, 2)} ↓
                </div>
                <div className="text-xs text-gray-500">
                  ≈ ${formatNumber(currentPrice - 10, 2)}
                </div>
              </div>
            </div>

            {/* Buy Orders */}
            <div className="flex-1 overflow-y-auto">
              {buyOrders.map((order, index) => (
                <div key={`buy-${index}`} className="relative">
                  {/* Volume Background */}
                  <div
                    className="absolute right-0 top-0 h-full bg-green-50"
                    style={{
                      width: `${getVolumeWidth(order.total, maxTotal)}%`,
                    }}
                  ></div>

                  {/* Order Row */}
                  <div className="relative grid grid-cols-3 text-xs py-1 px-4 hover:bg-gray-50">
                    <div className="text-green-500 font-mono">
                      {formatNumber(order.price, 2)}
                    </div>
                    <div className="text-center text-gray-600 font-mono">
                      {order.amount.toFixed(6)}
                    </div>
                    <div className="text-right text-gray-600 font-mono">
                      {formatNumber(order.total)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Trades Tab */
          <DataContainer>
            {formatTradeData(tradesToShow).map((tradeData, index) => (
              <DataRow
                key={tradesToShow[index]?.id || index}
                data={tradeData}
                layout="trades"
                onClick={() => {
                  console.log("Trade clicked:", tradesToShow[index]);
                }}
              />
            ))}
          </DataContainer>
        )}
      </div>
    </div>
  );
};

export default Orderbook;
