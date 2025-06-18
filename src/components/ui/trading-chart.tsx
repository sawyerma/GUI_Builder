import { useState } from "react";

const TradingChart = () => {
  const [selectedTool, setSelectedTool] = useState("crosshair");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1s");

  const tools = [
    { id: "crosshair", icon: "✚", tooltip: "Crosshair" },
    { id: "trend", icon: "📈", tooltip: "Trend Line" },
    { id: "horizontal", icon: "━", tooltip: "Horizontal Line" },
    { id: "vertical", icon: "┃", tooltip: "Vertical Line" },
    { id: "arrow", icon: "↗", tooltip: "Arrow" },
    { id: "text", icon: "T", tooltip: "Text" },
    { id: "info", icon: "ⓘ", tooltip: "Info" },
    { id: "measure", icon: "📏", tooltip: "Measure" },
    { id: "zoom", icon: "🔍", tooltip: "Zoom" },
    { id: "hand", icon: "✋", tooltip: "Hand" },
    { id: "magnet", icon: "🧲", tooltip: "Magnet" },
    { id: "settings", icon: "⚙", tooltip: "Settings" },
    { id: "screenshot", icon: "📷", tooltip: "Screenshot" },
    { id: "favorite", icon: "⭐", tooltip: "Add to Favorites" },
  ];

  const timeframes = ["1s", "1m", "5m", "15m", "1h", "4h", "1d", "1w"];

  const priceData = [
    { time: "21:17:26", price: 104976.23 },
    { time: "21:17:32", price: 104976.23 },
    { time: "21:18", price: 104965.51 },
    { time: "21:18:14", price: 104965.51 },
    { time: "21:18:28", price: 104976.21 },
    { time: "21:18:42", price: 104976.21 },
    { time: "21:19", price: 104900.0 },
    { time: "21:19:14", price: 104900.0 },
    { time: "21:19:28", price: 104865.42 },
    { time: "21:19:42", price: 104865.42 },
    { time: "21:20", price: 104845.12 },
    { time: "21:20:14", price: 104845.12 },
    { time: "21:20:28", price: 104820.15 },
    { time: "21:20:42", price: 104820.15 },
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow h-full flex flex-col relative">
      {/* Top Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <span className="font-semibold">BTC/USDT</span>
            <span className="text-gray-500">· 1s</span>
            {priceData.slice(-4).map((data, i) => (
              <span key={i} className="text-green-500 text-xs">
                {formatPrice(data.price)}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Original</span>
          <span>TradingView</span>
          <span>1st</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Timeframe Bar */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-200">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              selectedTimeframe === tf
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tf}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700">📊</button>
          <button className="text-gray-500 hover:text-gray-700">⚙</button>
          <button className="text-gray-500 hover:text-gray-700">⋯</button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="flex-1 flex relative">
        {/* Left Toolbar */}
        <div className="w-12 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-2 gap-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`w-8 h-8 flex items-center justify-center text-sm rounded transition-colors relative group ${
                selectedTool === tool.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              title={tool.tooltip}
            >
              {tool.icon}

              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {tool.tooltip}
              </div>
            </button>
          ))}
        </div>

        {/* Chart Content Area */}
        <div className="flex-1 relative">
          {/* Price Scale (Right) */}
          <div className="absolute right-0 top-0 bottom-16 w-20 bg-gray-50 border-l border-gray-200 flex flex-col justify-between text-xs text-gray-600 py-2">
            {[
              104280.0, 104260.0, 104240.0, 104220.0, 104200.0, 104180.0,
              104160.0, 104140.0, 104120.0, 104100.0, 104080.0, 104060.0,
              104040.0, 104020.0,
            ].map((price, i) => (
              <div key={i} className="px-2 text-right">
                {formatPrice(price)}
              </div>
            ))}

            {/* Current Price */}
            <div className="absolute top-1/2 right-0 bg-green-500 text-white px-2 py-0.5 text-xs transform -translate-y-1/2">
              104076.51
            </div>
          </div>

          {/* Main Chart Canvas */}
          <div className="absolute inset-0 right-20 bottom-16">
            <svg className="w-full h-full" viewBox="0 0 800 400">
              {/* Grid Lines */}
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 20"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Sample Candlesticks */}
              <g>
                {/* Red Candles */}
                <rect x="50" y="120" width="8" height="40" fill="#ef4444" />
                <rect x="100" y="100" width="8" height="60" fill="#ef4444" />
                <rect x="150" y="140" width="8" height="30" fill="#ef4444" />

                {/* Green Candles */}
                <rect x="200" y="160" width="8" height="35" fill="#22c55e" />
                <rect x="250" y="140" width="8" height="45" fill="#22c55e" />
                <rect x="300" y="130" width="8" height="50" fill="#22c55e" />

                {/* Wicks */}
                <line
                  x1="54"
                  y1="110"
                  x2="54"
                  y2="170"
                  stroke="#666"
                  strokeWidth="1"
                />
                <line
                  x1="104"
                  y1="90"
                  x2="104"
                  y2="180"
                  stroke="#666"
                  strokeWidth="1"
                />
                <line
                  x1="154"
                  y1="130"
                  x2="154"
                  y2="180"
                  stroke="#666"
                  strokeWidth="1"
                />
                <line
                  x1="204"
                  y1="150"
                  x2="204"
                  y2="200"
                  stroke="#666"
                  strokeWidth="1"
                />
                <line
                  x1="254"
                  y1="120"
                  x2="254"
                  y2="190"
                  stroke="#666"
                  strokeWidth="1"
                />
                <line
                  x1="304"
                  y1="110"
                  x2="304"
                  y2="185"
                  stroke="#666"
                  strokeWidth="1"
                />

                {/* Moving Average Lines */}
                <path
                  d="M 50 150 Q 100 140, 150 160 T 250 155 T 350 150"
                  stroke="#ff6b6b"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.7"
                />
                <path
                  d="M 50 170 Q 100 160, 150 175 T 250 170 T 350 165"
                  stroke="#4ecdc4"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.7"
                />
              </g>
            </svg>
          </div>

          {/* Volume Chart (Bottom) */}
          <div className="absolute bottom-0 left-0 right-20 h-16 bg-gray-50 border-t border-gray-200">
            <div className="flex items-end h-full px-2 gap-1">
              {[
                0.8, 1.2, 0.6, 1.5, 0.9, 1.1, 0.7, 1.3, 0.8, 1.0, 1.4, 0.5, 1.1,
                0.9,
              ].map((vol, i) => (
                <div
                  key={i}
                  className={`w-4 ${i % 3 === 0 ? "bg-red-400" : "bg-green-400"} opacity-70`}
                  style={{ height: `${vol * 40}px` }}
                />
              ))}
            </div>
          </div>

          {/* Time Scale (Bottom) */}
          <div className="absolute bottom-0 left-0 right-20 h-6 bg-white border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 px-4">
            {priceData.slice(0, 8).map((data, i) => (
              <span key={i}>{data.time}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-gray-100 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span>21:20:40 (UTC+2)</span>
          <span>O: 104076.51</span>
          <span>H: 104280.00</span>
          <span>L: 104020.00</span>
          <span>C: 104076.51</span>
          <span className="text-green-500">+56.49 (+0.05%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Vol: 100068.51</span>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;
