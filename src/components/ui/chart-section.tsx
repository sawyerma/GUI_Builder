const ChartSection = () => {
  return (
    <div className="flex gap-4 mt-1">
      {/* Main Chart */}
      <div className="bg-white rounded-xl shadow min-h-[360px] flex-1 flex items-center justify-center text-[0.94rem] text-gray-300">
        [Chart]
      </div>

      {/* Sidebar with Orderbook */}
      <div className="flex flex-col gap-4 w-[320px]">
        <div className="bg-white rounded-xl shadow min-h-[448px] flex items-center justify-center text-gray-400 text-[0.84rem]">
          [Orderbuch]
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
