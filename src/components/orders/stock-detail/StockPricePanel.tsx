import { type FC, useState } from "react";
import { TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs.tsx";
import {
  TableHeader,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@/components/ui/table.tsx";
import { useSymbolTimeSeries } from "@/hooks/useSymbolTimeSeries.ts";
import { useAtomValue } from "jotai/index";
import { symbolAtom } from "@/stores/ordersAtom.ts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll.ts";
import StockPricePanelRow from "@/components/orders/stock-detail/StockPricePanelRow.tsx";
import { cn } from "@/lib/utils.ts";

const GRID_COLS = "[grid-template-columns:10%_10%_12%_16%_16%_12%_12%_12%]";
const StockPricePanel: FC = () => {
  const symbolAtomValue = useAtomValue(symbolAtom);
  const [priceStreamMode, setPriceStreamMode] = useState("daily");

  const { timeSeriesItems, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSymbolTimeSeries(symbolAtomValue!);

  const { loadMoreRef } = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  );

  return (
    <div className="flex flex-col">
      <div className="text-sm px-1.5 py-2 font-semibold">
        일별 · 실시간 시세
      </div>
      <div className="flex flex-col h-[100px] overflow-hidden">
        <Tabs
          className="h-8 flex-1"
          value={priceStreamMode}
          onValueChange={(value: string) => {
            setPriceStreamMode(value);
          }}
        >
          <TabsList className="w-full text-sm">
            <TabsTrigger className="w-full" value="realtime">
              실시간
            </TabsTrigger>
            <TabsTrigger className="w-full" value="daily">
              일별
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="min-h-0 overflow-auto">
          <div className="min-w-[540px] w-full">
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
                    <TableHead className="flex justify-center">
                      등락률
                    </TableHead>
                    <TableHead className="flex justify-end">
                      거래량(주)
                    </TableHead>
                    <TableHead className="flex justify-center">
                      거래대금
                    </TableHead>
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
                  <StockPricePanelRow timeSeries={timeSeries} tSIdx={tSIdx} />
                ))}
              </TableBody>
            </Table>
            {hasNextPage && <div ref={loadMoreRef}></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPricePanel;
