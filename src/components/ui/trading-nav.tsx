import { useState } from "react";

interface TradingNavProps {
  onTradingModeChange?: (mode: string) => void;
}

const TradingNav = ({ onTradingModeChange }: TradingNavProps) => {
  const [activeTab, setActiveTab] = useState("Spot");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const marketOptions = [
    {
      name: "Spot",
      description: "Spot-Trading mit sofortiger Abwicklung",
      icon: "💱",
    },
    {
      name: "USDT-M Futures",
      description: "Perpetual-Futures abgerechnet in USDT",
      icon: "💰",
    },
    {
      name: "Coin-M Perpetual-Futures",
      description: "Futures-Trading ohne Ablaufdatum",
      icon: "⚡",
    },
    {
      name: "Coin-M Delivery-Futures",
      description: "Futures-Trading mit Ablaufdatum",
      icon: "⏰",
    },
    {
      name: "USDC-M Futures",
      description: "Perpetual-Futures abgerechnet in USDC",
      icon: "💲",
    },
  ];

  const navItems = [
    { name: "Market", hasDropdown: true },
    { name: "AI" },
    { name: "ML" },
    { name: "Database" },
    { name: "Whales" },
    { name: "News" },
    { name: "Settings" },
  ];

  const handleTabClick = (itemName: string) => {
    if (itemName === "Market") {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setActiveTab(itemName);
      setIsDropdownOpen(false);
      if (onTradingModeChange) {
        onTradingModeChange(itemName);
      }
    }
  };

  const handleMarketOptionClick = (option: string) => {
    setActiveTab("Market");
    setIsDropdownOpen(false);
    if (onTradingModeChange) {
      onTradingModeChange(option);
    }
  };

  return (
    <nav className="flex gap-2 mb-5">
      {navItems.map((item) => (
        <div key={item.name} className="relative">
          <button
            className={`px-5 py-1.5 rounded border-2 font-medium ${
              activeTab === item.name
                ? "border-[#e4261c] text-[#e4261c]"
                : "border-[#444] text-[#222]"
            }`}
            onClick={() => handleTabClick(item.name)}
          >
            {item.name}
            {item.hasDropdown && " ▼"}
          </button>

          {/* Market Dropdown */}
          {item.name === "Market" && isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 w-80 bg-white rounded-lg shadow-xl border">
              {marketOptions.map((option) => (
                <div
                  key={option.name}
                  className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleMarketOptionClick(option.name)}
                >
                  <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center mr-3 text-sm">
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {option.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {option.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Overlay to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default TradingNav;
