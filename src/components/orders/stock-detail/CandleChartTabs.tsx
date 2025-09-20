import type { FC } from "react";
import CaretDownIcon from "@/assets/caretDown.svg?react";
import { cn } from "@/lib/utils.ts";
import { type ChartTimeFrame, labelChartTimeFrame } from "@/types/orders.ts";

type CandleChartTabsProps = {
  selectedChartTF: ChartTimeFrame;
  onChangeChartTF: (chartTF: ChartTimeFrame) => void;
};

const CandleChartTabs: FC<CandleChartTabsProps> = ({
  selectedChartTF,
  onChangeChartTF,
}) => {
  const chartDayFrame: ChartTimeFrame[] = ["D", "W", "M", "Y"];
  return (
    <div className="text-sm flex items-center">
      <div
        className={cn(
          "flex items-center cursor-pointer py-1.5 px-3 rounded-md hover:bg-grey-opacity-200",
          !chartDayFrame.includes(selectedChartTF) && "bg-grey-opacity-100",
        )}
      >
        <span>3분</span>
        <CaretDownIcon />
      </div>
      {chartDayFrame.map((chartTF) => (
        <button
          key={chartTF}
          type="button"
          onClick={() => onChangeChartTF(chartTF as ChartTimeFrame)}
          className={cn(
            "cursor-pointer py-1.5 px-3 rounded-md hover:bg-grey-opacity-200",
            selectedChartTF === chartTF && "bg-grey-opacity-100",
          )}
        >
          {labelChartTimeFrame[chartTF as ChartTimeFrame]}
        </button>
      ))}
    </div>
  );
};

export default CandleChartTabs;
