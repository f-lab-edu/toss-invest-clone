import type { FC } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { cn } from "@/lib/utils.ts";
import DailyPriceTableRow from "@/components/orders/stock-detail/DailyPriceTableRow.tsx";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll.ts";
import { useSymbolTimeSeries } from "@/hooks/useSymbolTimeSeries.ts";
import { useAtomValue } from "jotai/index";
import { symbolAtom } from "@/stores/ordersAtom.ts";

const GRID_COLS = "[grid-template-columns:10%_10%_12%_16%_16%_12%_12%_12%]";
const DailyPricePanelTable: FC = () => {
  const symbolAtomValue = useAtomValue(symbolAtom);
  const { timeSeriesItems, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSymbolTimeSeries(symbolAtomValue!);

  const { loadMoreRef } = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  );

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
              <TableHead>일자</TableHead>
              <TableHead className="flex justify-center">종가</TableHead>
              <TableHead className="flex justify-center">등락률</TableHead>
              <TableHead className="flex justify-end">거래량(주)</TableHead>
              <TableHead className="flex justify-center">거래대금</TableHead>
              <TableHead className="flex justify-end">시가</TableHead>
              <TableHead className="flex justify-end">고가</TableHead>
              <TableHead className="flex justify-end">저가</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      <Table>
        <TableBody>
          {timeSeriesItems.map((timeSeries, tSIdx) => (
            <DailyPriceTableRow timeSeries={timeSeries} tSIdx={tSIdx} />
          ))}
        </TableBody>
      </Table>
      {hasNextPage && <div ref={loadMoreRef}></div>}
    </>
  );
};

export default DailyPricePanelTable;
