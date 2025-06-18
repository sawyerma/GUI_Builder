const LatencyIndicators = () => {
  return (
    <div className="fixed right-8 bottom-6 flex gap-4 z-50">
      <span className="px-3 py-1 rounded bg-[#e5fbe8] text-[#109825] font-mono font-bold text-[0.84rem]">
        FastAPI = 20ms
      </span>
      <span className="px-3 py-1 rounded bg-[#f0f8ff] text-[#1588d5] font-mono font-bold text-[0.84rem]">
        WS = 30ms
      </span>
    </div>
  );
};

export default LatencyIndicators;
