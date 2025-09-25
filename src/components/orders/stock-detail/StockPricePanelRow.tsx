import {
  calculateChangeRate,
  cn,
  commaFormat,
  formatMMDDV2,
  getNotionalText,
} from "@/lib/utils.ts";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import type { TimeSeriesItem } from "@/types/orders.ts";
import type { FC } from "react";

type StockPricePanelRowProps = {
  timeSeries: TimeSeriesItem;
  tSIdx: number;
};

const GRID_COLS = "[grid-template-columns:10%_10%_12%_16%_16%_12%_12%_12%]";
const ZEBRA_BG = "bg-[#F9FAFB]";
const StockPricePanelRow: FC<StockPricePanelRowProps> = ({
  timeSeries,
  tSIdx,
}) => {
  const { 등락률Text, changeTextClass } = calculateChangeRate(
    timeSeries.open,
    timeSeries.close,
  );

  return (
    <TableRow
      key={timeSeries.datetime}
      className={cn(
        "h-8 border-none hover:bg-transparent grid",
        GRID_COLS,
        tSIdx % 2 === 0 && ZEBRA_BG,
      )}
    >
      <TableCell className="text-sm">
        {formatMMDDV2(new Date(timeSeries.datetime))}
      </TableCell>
      <TableCell className="text-sm px-2 flex justify-center">
        ${timeSeries.close.toFixed(2)}
      </TableCell>
      <TableCell
        className={cn("text-sm px-2 flex justify-center", changeTextClass)}
      >
        {등락률Text}%
      </TableCell>
      <TableCell className="text-sm px-2 flex justify-end min-w-11">
        {commaFormat(timeSeries.volume)}
      </TableCell>
      <TableCell className="text-sm px-2 flex justify-center">
        ${getNotionalText(timeSeries.notional)}
      </TableCell>
      <TableCell className="text-sm px-2 flex justify-end">
        ${timeSeries.open.toFixed(2)}
      </TableCell>
      <TableCell className="text-sm px-2 flex justify-end">
        ${timeSeries.high.toFixed(2)}
      </TableCell>
      <TableCell className="text-sm px-2 flex justify-end">
        ${timeSeries.low.toFixed(2)}
      </TableCell>
    </TableRow>
  );
};

export default StockPricePanelRow;
