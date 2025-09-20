import type { FC } from "react";

type StockTitleProps = {
  symbol: string | undefined;
};

const StockTitle: FC<StockTitleProps> = ({ symbol }) => {
  return (
    <div className="pt-1 pb-3">
      <div className="flex gap-x-2.5">
        <div>
          <img
            className="rounded-xl"
            src="/src/assets/profile.webp"
            width="48"
            height="48"
            alt="종목 이미지"
          />
        </div>
        <div>
          <div className="flex gap-x-1 text-[15px]">
            <span>디렉시온 테슬라 2배 ETF</span>
            <span className="text-grey-500">{symbol}</span>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-semibold">$18.91</span>
            <span className="w-[1px] h-3 mx-2.5 bg-grey-opacity-300"></span>
            <span className="text-sm text-grey-700">
              지난 정규장보다{" "}
              <span className="text-red-500">+$0.55 (3.0%)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTitle;
