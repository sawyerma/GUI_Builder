import { useState } from "react";

const TimeButtons = () => {
  const [activeTime, setActiveTime] = useState("1s");

  const timeIntervals = ["1s", "1m", "5m", "15m", "1h", "1d", "1w"];

  return (
    <div className="flex items-center gap-2 my-3 text-sm">
      <label className="font-medium text-[#444] mr-2">Zeit</label>
      {timeIntervals.map((interval) => (
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
    </div>
  );
};

export default TimeButtons;
