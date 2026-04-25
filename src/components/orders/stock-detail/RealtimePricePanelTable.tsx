import type { FC } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { cn } from "@/lib/utils.ts";
import { useAtomValue } from "jotai/index";
import { realtimeSeriesAtom } from "@/stores/ordersAtom.ts";
import RealtimePriceTableRow from "@/components/orders/stock-detail/RealtimePriceTableRow.tsx";

const GRID_COLS = "[grid-template-columns:18%_18%_32%_32%]";
const RealtimePricePanelTable: FC = () => {
  const realtimeSeriesItems = useAtomValue(realtimeSeriesAtom);

  return (
    <>
      <div className="sticky top-0 z-10 bg-white">
        <Table>
          <TableHeader>
            <TableRow
              className={cn(
                "text-sm border-none hover:bg-transparent grid",
                GRID_COLS,
              )}
            >
              <TableHead>체결가</TableHead>
              <TableHead className="flex justify-end">체결량(주)</TableHead>
              <TableHead className="flex justify-end">등락률</TableHead>
              <TableHead className="flex justify-end">시간</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      <Table>
        <TableBody>
          {realtimeSeriesItems?.map((timeSeries, tSIdx) => (
            <RealtimePriceTableRow
              key={tSIdx}
              timeSeries={timeSeries}
              tSIdx={tSIdx}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RealtimePricePanelTable;
