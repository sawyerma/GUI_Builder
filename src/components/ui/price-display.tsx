const PriceDisplay = () => {
  return (
    <div className="flex items-start gap-8 mb-1">
      {/* Price + Type */}
      <div className="flex flex-col items-start min-w-[170px]">
        <span className="text-[2.2rem] font-bold text-[#e4261c] leading-tight tracking-wider">
          104,911.62
        </span>
        <span className="text-base text-[#444] tracking-wider mt-0">SPOT</span>
      </div>

      {/* Market Data */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[1.07rem] mt-2 font-sans">
        <span>
          Δ 24h: <span className="text-red-600 font-bold">−3.56%</span>
        </span>
        <span>
          24h Hoch: <b>108,957.20</b>
        </span>
        <span>
          24h Tief: <b>103,399.96</b>
        </span>
        <span>
          24h Vol (BTC): <b>6.08K</b>
        </span>
        <span>
          24h Umsatz (USDT): <b>645.65M</b>
        </span>
        <span>
          Kategorie: <span className="font-bold">Public Chain</span>
        </span>
      </div>
    </div>
  );
};

export default PriceDisplay;
