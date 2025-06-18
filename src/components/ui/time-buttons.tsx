import { useState } from "react";

const TimeButtons = () => {
  const [activeTime, setActiveTime] = useState("1s");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIntervals, setSelectedIntervals] = useState(
    new Set(["1s", "5s", "15s", "1m", "1h"]),
  );

  const displayIntervals = Array.from(selectedIntervals);

  const allIntervals = [
    { label: "1s", value: "1s" },
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
    { label: "15s", value: "15s" },
    { label: "30s", value: "30s" },
    { label: "1m", value: "1m" },
    { label: "2m", value: "2m" },
    { label: "5m", value: "5m" },
    { label: "10m", value: "10m" },
    { label: "15m", value: "15m" },
    { label: "30m", value: "30m" },
    { label: "1h", value: "1h" },
    { label: "2h", value: "2h" },
    { label: "4h", value: "4h" },
    { label: "6h", value: "6h" },
    { label: "12h", value: "12h" },
    { label: "1d", value: "1d" },
    { label: "1w", value: "1w" },
    { label: "1M", value: "1M" },
    { label: "6M", value: "6M" },
  ];

  const handleTimeSelect = (interval: string) => {
    setActiveTime(interval);
    setIsDropdownOpen(false);
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleIntervalToggle = (interval: string) => {
    const newSelected = new Set(selectedIntervals);
    if (newSelected.has(interval)) {
      newSelected.delete(interval);
    } else {
      newSelected.add(interval);
    }
    setSelectedIntervals(newSelected);
  };

  const handleSave = () => {
    setIsEditMode(false);
    // Optional: callback to parent component
  };

  return (
    <div className="flex items-center gap-2 my-3 text-sm">
      <label className="font-medium text-[#444] mr-2">Zeit</label>

      {/* Display Buttons */}
      {displayIntervals.map((interval) => (
        <button
          key={interval}
          className={`px-3 py-1 rounded border ${
            activeTime === interval
              ? "bg-[#1a48d8] text-white border-[#153289]"
              : "bg-gray-100 text-[#222] border-gray-300"
          }`}
          onClick={() => setActiveTime(interval)}
        >
          {interval}
        </button>
      ))}

      {/* Dropdown Button */}
      <div className="relative">
        <button
          className="px-3 py-1 rounded border bg-gray-100 text-[#222] border-gray-300 flex items-center gap-1"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          ▼
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-1 z-50 w-80 bg-white rounded-lg shadow-xl border">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Intervall auswählen
                </h3>
                <button
                  className="text-blue-500 text-sm font-medium"
                  onClick={isEditMode ? handleSave : handleEditToggle}
                >
                  {isEditMode ? "Speichern" : "Bearbeiten"}
                </button>
              </div>

              {/* Grid of time intervals */}
              <div className="grid grid-cols-4 gap-2">
                {allIntervals.map((interval) => (
                  <div
                    key={interval.value}
                    className={`h-10 rounded text-sm font-medium transition-colors relative flex items-center justify-center cursor-pointer ${
                      activeTime === interval.value && !isEditMode
                        ? "bg-blue-100 text-blue-600 border border-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() =>
                      isEditMode
                        ? handleIntervalToggle(interval.value)
                        : handleTimeSelect(interval.value)
                    }
                  >
                    {interval.label}

                    {/* Checkbox in edit mode */}
                    {isEditMode && (
                      <div className="absolute top-1 right-1">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                            selectedIntervals.has(interval.value)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {selectedIntervals.has(interval.value) ? "✓" : ""}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overlay to close dropdown */}
        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TimeButtons;
