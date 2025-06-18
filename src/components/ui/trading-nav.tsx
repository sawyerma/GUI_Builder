import { useState } from "react";
import ThemeToggle from "./theme-toggle";

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
      // Don't send non-market buttons to tradingMode - only market dropdown options should be displayed under price
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
    <nav className="flex justify-between items-center mb-5">
      {/* Left side: Navigation items */}
      <div className="flex gap-2">
        {navItems.map((item) => (
          <div key={item.name} className="relative">
            <button
              className={`px-5 py-1.5 rounded font-medium transition-colors ${
                activeTab === item.name
                  ? "bg-[#e4261c] text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-[#222] dark:text-white"
              }`}
              onClick={() => handleTabClick(item.name)}
            >
              {item.name}
              {item.hasDropdown && " ▽"}
            </button>

            {/* Market Dropdown */}
            {item.name === "Market" && isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-600">
                {marketOptions.map((option) => (
                  <div
                    key={option.name}
                    className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                    onClick={() => handleMarketOptionClick(option.name)}
                  >
                    <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded flex items-center justify-center mr-3 text-sm">
                      {option.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {option.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {option.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side: Theme toggle */}
      <ThemeToggle />

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
