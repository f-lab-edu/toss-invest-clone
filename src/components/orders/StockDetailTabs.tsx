import type { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import type { StockDetailTab } from "@/types/orders.ts";

type StockDetailTabsProps = {
  stockDetailTab: StockDetailTab | undefined;
  onChangeStockDetailTab: (value: StockDetailTab) => void;
};

const StockDetailTabs: FC<StockDetailTabsProps> = ({
  stockDetailTab,
  onChangeStockDetailTab,
}) => {
  return (
    <Tabs
      className="pb-2.5"
      value={stockDetailTab}
      onValueChange={(value: string) => {
        onChangeStockDetailTab(value as StockDetailTab);
      }}
    >
      <TabsList variant="pill">
        <TabsTrigger variant="pill" value="order">
          차트 · 호가
        </TabsTrigger>
        <TabsTrigger variant="pill" value="analytics">
          종목정보
        </TabsTrigger>
        <TabsTrigger variant="pill" value="news">
          뉴스 · 공시
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default StockDetailTabs;
