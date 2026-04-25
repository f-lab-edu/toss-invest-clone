import { type FC, useState } from "react";
import { TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs.tsx";
import DailyPricePanelTable from "@/components/orders/stock-detail/DailyPricePanelTable.tsx";
import RealtimePricePanelTable from "@/components/orders/stock-detail/RealtimePricePanelTable.tsx";

const StockPricePanel: FC = () => {
  const [priceStreamMode, setPriceStreamMode] = useState("daily");

  return (
    <div className="flex flex-col">
      <div className="text-sm px-1.5 py-2 font-semibold">
        일별 · 실시간 시세
      </div>
      <div className="flex flex-col h-[100px] overflow-hidden">
        <Tabs
          className="h-8"
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

        <div className="flex-1 min-h-0 overflow-auto">
          <div className="min-w-[540px] w-full">
            {priceStreamMode === "daily" && <DailyPricePanelTable />}
            {priceStreamMode === "realtime" && <RealtimePricePanelTable />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPricePanel;
