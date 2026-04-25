import { useNavigate, useParams } from "react-router";
import StockTitle from "@/components/orders/StockTitle.tsx";
import StockDetailTabs from "@/components/orders/stock-detail/StockDetailTabs.tsx";
import type { StockDetailTab } from "@/types/orders.ts";
import { useState } from "react";
import StockDetail from "@/components/orders/stock-detail/StockDetail.tsx";
import StockAnalytics from "@/components/orders/StockAnalytics.tsx";
import StockNews from "@/components/orders/StockNews.tsx";

function StockOrders() {
  const navigate = useNavigate();
  const { symbol, type } = useParams<{
    symbol: string;
    type: StockDetailTab;
  }>();
  const [stockDetailTab, setStockDetailTab] = useState<StockDetailTab>(
    type ?? "order",
  );

  const handleChangeStockDetailTab = (next: StockDetailTab) => {
    setStockDetailTab(next);
    return navigate(`/stocks/${symbol}/${next}`, { replace: true });
  };

  return (
    <main className="flex flex-col min-w-[712px] mx-5 min-h-0">
      <StockTitle symbol={symbol} />
      <StockDetailTabs
        stockDetailTab={stockDetailTab}
        onChangeStockDetailTab={handleChangeStockDetailTab}
      />
      {type === "order" && <StockDetail />}
      {type === "analytics" && <StockAnalytics />}
      {type === "news" && <StockNews />}
    </main>
  );
}

export default StockOrders;
