import { type FC } from "react";
import TradingViewWidget from "@/components/charts/TradingViewWidget.tsx";
import CandleChartTabs from "@/components/orders/stock-detail/CandleChartTabs.tsx";

const StockCandleChart: FC = () => {
  return (
    <>
      <CandleChartTabs />
      <div className="flex-1 w-full h-full">
        <TradingViewWidget />
      </div>
    </>
  );
};

export default StockCandleChart;
