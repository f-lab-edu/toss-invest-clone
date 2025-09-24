import type { FC } from "react";
import CaretDownIcon from "@/assets/caretDown.svg?react";
import { cn } from "@/lib/utils.ts";
import { type ChartTimeFrame, labelChartTimeFrame } from "@/types/orders.ts";
import { chartTFMinAtom, selectedChartTFAtom } from "@/stores/ordersAtom.ts";
import { useAtom } from "jotai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.tsx";

const MINUTE_TFS: ChartTimeFrame[] = [
  "1",
  "3",
  "5",
  "15",
  "30",
  "60",
  "120",
  "240",
];
const DAY_TFS: ChartTimeFrame[] = ["D", "W"];

const CandleChartTabs: FC = () => {
  const [selectedChartTF, setSelectedChartTF] = useAtom(selectedChartTFAtom);
  const [selectedMinuteTF, setSelectedMinuteTF] = useAtom(chartTFMinAtom);
  const onChangeMinuteTF = (mtf: ChartTimeFrame) => {
    setSelectedChartTF(mtf);
    setSelectedMinuteTF(mtf);
  };

  return (
    <div className="text-sm flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "flex items-center cursor-pointer py-1.5 px-3 rounded-md hover:bg-grey-opacity-200",
              !DAY_TFS.includes(selectedChartTF) && "bg-grey-opacity-100",
            )}
          >
            <span>
              {labelChartTimeFrame[selectedMinuteTF as ChartTimeFrame]}
            </span>
            <CaretDownIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-8" align="start">
          <DropdownMenuGroup>
            {MINUTE_TFS.map((mtf) => (
              <DropdownMenuItem
                key={mtf}
                onClick={() => onChangeMinuteTF(mtf)}
                className={cn(
                  "cursor-pointer",
                  selectedChartTF === mtf &&
                    "bg-grey-opacity-100 font-semibold",
                )}
              >
                {labelChartTimeFrame[mtf as ChartTimeFrame]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {DAY_TFS.map((tf) => (
        <button
          key={tf}
          type="button"
          onClick={() => setSelectedChartTF(tf as ChartTimeFrame)}
          className={cn(
            "cursor-pointer py-1.5 px-3 rounded-md hover:bg-grey-opacity-200",
            selectedChartTF === tf && "bg-grey-opacity-100",
          )}
        >
          {labelChartTimeFrame[tf as ChartTimeFrame]}
        </button>
      ))}
    </div>
  );
};

export default CandleChartTabs;
