import { type FC, useState } from "react";
import TradingViewWidget from "@/components/charts/TradingViewWidget.tsx";
import CandleChartTabs from "@/components/orders/stock-detail/CandleChartTabs.tsx";
import type { ChartTimeFrame } from "@/types/orders.ts";

const StockCandleChart: FC = () => {
  const [selectedChartTF, setSelectedChartTF] = useState<ChartTimeFrame>("3m");

  return (
    <>
      <CandleChartTabs
        selectedChartTF={selectedChartTF}
        onChangeChartTF={setSelectedChartTF}
      />
      <div className="flex-1 w-full h-full">
        <TradingViewWidget />
      </div>
    </>
  );
};

export default StockCandleChart;
