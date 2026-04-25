import type { FC } from "react";
import OrderFormCard from "@/components/orders/order-form/OrderFormCard.tsx";
import StockCandleChart from "@/components/orders/stock-detail/StockCandleChart.tsx";
import StockPricePanel from "@/components/orders/stock-detail/StockPricePanel.tsx";
import MyStockWidget from "@/components/orders/stock-detail/MyStockWidget.tsx";
import { Card } from "@/components/ui/card.tsx";

const StockDetail: FC = () => {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_295px] gap-x-2.5 items-stretch min-h-0">
      <div className="flex flex-col w-full gap-y-2.5">
        <Card className="w-full border-none p-2 h-[431px]">
          <StockCandleChart />
        </Card>
        <div className="h-[156px] grid grid-cols-4 gap-x-2.5">
          <Card className="col-span-3 border-none p-2">
            <StockPricePanel />
          </Card>
          <Card className="col-span-1 border-none p-2">
            <MyStockWidget />
          </Card>
        </div>
      </div>
      <Card className="w-[295px] h-[597px] shrink-0 border-none p-2">
        <OrderFormCard />
      </Card>
    </div>
  );
};

export default StockDetail;
