const ChartSection = () => {
  return (
    <div className="flex gap-4 mt-1">
      {/* Main Chart */}
      <div className="bg-white rounded-xl shadow min-h-[360px] flex-1 flex items-center justify-center text-[0.94rem] text-gray-300">
        [Chart]
      </div>

      {/* Sidebar with Orderbook and Trades */}
      <div className="flex flex-col gap-4 w-[320px]">
        <div className="bg-white rounded-xl shadow min-h-[240px] flex items-center justify-center text-gray-400 text-[0.84rem]">
          [Orderbuch]
        </div>
        <div className="bg-white rounded-xl shadow min-h-[120px] flex items-center justify-center text-gray-400 text-[0.84rem]">
          [Trades]
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
