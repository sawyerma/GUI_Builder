import { useState } from "react";

const TradingNav = () => {
  const [activeTab, setActiveTab] = useState("Spot");

  const navItems = [
    { name: "Spot", isActive: true },
    { name: "Futures", hasDropdown: true },
    { name: "AI" },
    { name: "ML" },
    { name: "Database" },
    { name: "Whales" },
    { name: "News" },
    { name: "Settings" },
  ];

  return (
    <nav className="flex gap-2 mb-5">
      {navItems.map((item) => (
        <div key={item.name} className="relative">
          <button
            className={`px-5 py-1.5 rounded border-2 font-medium ${
              item.name === "Spot"
                ? "border-[#e4261c] text-[#e4261c]"
                : "border-[#444] text-[#222]"
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            {item.name}
            {item.hasDropdown && " ▼"}
          </button>
        </div>
      ))}
    </nav>
  );
};

export default TradingNav;
