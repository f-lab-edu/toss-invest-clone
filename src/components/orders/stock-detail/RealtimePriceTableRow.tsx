import type { FC } from "react";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { calculateChangeRate, cn, formatHHmmss } from "@/lib/utils.ts";
import type { SocketMsgRow } from "@/types/websocket.ts";
import { useAtomValue } from "jotai/index";
import { prevClosePriceAtom } from "@/stores/ordersAtom.ts";

type RealtimePriceTableRowProps = {
  timeSeries: SocketMsgRow;
  tSIdx: number;
};

const GRID_COLS = "[grid-template-columns:18%_18%_32%_32%]";
const ZEBRA_BG = "bg-[#F9FAFB]";
const RealtimePriceTableRow: FC<RealtimePriceTableRowProps> = ({
  timeSeries,
  tSIdx,
}) => {
  const prevClosePrice = useAtomValue(prevClosePriceAtom);
  const { 등락률Text, changeTextClass } = calculateChangeRate(
    timeSeries.p,
    prevClosePrice,
  );

  return (
    <TableRow
      key={timeSeries.t}
      className={cn(
        "h-8 border-none hover:bg-transparent grid",
        GRID_COLS,
        tSIdx % 2 === 0 && ZEBRA_BG,
      )}
    >
      <TableCell className="text-sm">${timeSeries.p}</TableCell>
      <TableCell className="text-sm px-2 flex justify-end">
        {timeSeries.s}
      </TableCell>
      <TableCell
        className={cn("text-sm px-2 flex justify-end", changeTextClass)}
      >
        {등락률Text}%
      </TableCell>
      <TableCell className="text-sm px-2 flex justify-end">
        {formatHHmmss(new Date(timeSeries.t))}
      </TableCell>
    </TableRow>
  );
};

export default RealtimePriceTableRow;
