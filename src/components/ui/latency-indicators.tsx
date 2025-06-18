interface LatencyIndicatorsProps {
  systemStatus?: "stable" | "unstable" | "reconnect";
}

const LatencyIndicators = ({
  systemStatus = "stable",
}: LatencyIndicatorsProps) => {
  const getSystemStatusConfig = () => {
    switch (systemStatus) {
      case "stable":
        return {
          text: "System connection stable",
          bgColor: "bg-green-100",
          textColor: "text-green-600",
          icon: "◉",
        };
      case "unstable":
        return {
          text: "System connection unstable",
          bgColor: "bg-orange-100",
          textColor: "text-orange-600",
          icon: "◉",
        };
      case "reconnect":
        return {
          text: "reconnect",
          bgColor: "bg-red-100",
          textColor: "text-red-600",
          icon: "◉",
        };
      default:
        return {
          text: "System connection stable",
          bgColor: "bg-green-100",
          textColor: "text-green-600",
          icon: "◉",
        };
    }
  };

  const statusConfig = getSystemStatusConfig();

  return (
    <>
      {/* System Connection Status - Left */}
      <div className="fixed left-8 bottom-6 z-50">
        <span
          className={`px-3 py-1 rounded ${statusConfig.bgColor} ${statusConfig.textColor} font-mono font-bold text-[0.63rem] flex items-center gap-1`}
        >
          <span>{statusConfig.icon}</span>
          {statusConfig.text}
        </span>
      </div>

      {/* Latency Indicators - Right */}
      <div className="fixed right-8 bottom-6 flex gap-4 z-50">
        <span className="px-3 py-1 rounded bg-[#e5fbe8] text-[#109825] font-mono font-bold text-[0.63rem]">
          FastAPI = 20ms
        </span>
        <span className="px-3 py-1 rounded bg-[#f0f8ff] text-[#1588d5] font-mono font-bold text-[0.63rem]">
          WS = 30ms
        </span>
      </div>
    </>
  );
};

export default LatencyIndicators;
