import type { FC } from "react";
import type { SymbolInfo } from "@/types/orders.ts";
import { calculateChangeRate } from "@/lib/utils.ts";
import { useAtomValue } from "jotai";
import { prevClosePriceAtom } from "@/stores/ordersAtom.ts";

type StockTitleProps = {
  symbolInfo: SymbolInfo;
  currentPrice: number;
};

const StockTitle: FC<StockTitleProps> = ({ symbolInfo, currentPrice }) => {
  const prevClosePrice = useAtomValue(prevClosePriceAtom);
  const { 변화량Text, 등락률Text, changeTextClass } = calculateChangeRate(
    currentPrice,
    prevClosePrice,
  );

  return (
    <div className="pt-1 pb-3">
      <div className="flex gap-x-2.5">
        <div>
          <img
            className="rounded-xl"
            src={
              symbolInfo.branding_icon_url +
              `?apiKey=${import.meta.env.VITE_POLYGON_API_KEY}`
            }
            width="48"
            height="48"
            alt="종목 이미지"
          />
        </div>
        <div>
          <div className="flex gap-x-1 text-[15px] font-semibold">
            <span>{symbolInfo.name_ko}</span>
            <span className="text-grey-500">{symbolInfo.symbol}</span>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-semibold">
              ${currentPrice?.toFixed(2)}
            </span>
            <span className="w-[1px] h-3 mx-2.5 bg-grey-opacity-300"></span>
            <span className="text-sm text-grey-700">
              지난 정규장보다{" "}
              <span className={changeTextClass}>
                {변화량Text} ({등락률Text}%)
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTitle;
