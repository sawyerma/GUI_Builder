import { useState } from "react";

const TimeButtons = () => {
  const [activeTime, setActiveTime] = useState("1s");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIntervals, setSelectedIntervals] = useState(
    new Set(["1s", "5M", "15M", "1S", "1T"]),
  );

  const displayIntervals = Array.from(selectedIntervals);

  const allIntervals = [
    { label: "Zeit", value: "zeit", disabled: true },
    { label: "1s", value: "1s" },
    { label: "1M", value: "1M" },
    { label: "2m", value: "2m" },
    { label: "3M", value: "3M" },
    { label: "5M", value: "5M" },
    { label: "15M", value: "15M" },
    { label: "30M", value: "30M" },
    { label: "1S", value: "1S" },
    { label: "2S", value: "2S" },
    { label: "4S", value: "4S" },
    { label: "6S", value: "6S" },
    { label: "8S", value: "8S" },
    { label: "12S", value: "12S" },
    { label: "1T", value: "1T" },
    { label: "3T", value: "3T" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1Mo" },
    { label: "3M", value: "3Mo" },
  ];

  const handleTimeSelect = (interval: string) => {
    if (interval === "zeit") return;
    setActiveTime(interval);
    setIsDropdownOpen(false);
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleIntervalToggle = (interval: string) => {
    if (interval === "zeit") return;

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
                    className={`h-10 rounded text-sm font-medium transition-colors relative flex items-center justify-center ${
                      interval.disabled
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : activeTime === interval.value && !isEditMode
                          ? "bg-blue-100 text-blue-600 border border-blue-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    }`}
                    onClick={() =>
                      isEditMode
                        ? handleIntervalToggle(interval.value)
                        : handleTimeSelect(interval.value)
                    }
                  >
                    {interval.label}

                    {/* Checkbox in edit mode */}
                    {isEditMode && !interval.disabled && (
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
