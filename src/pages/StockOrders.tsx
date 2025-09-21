import { useNavigate, useParams } from "react-router";
import StockTitle from "@/components/orders/StockTitle.tsx";
import StockDetailTabs from "@/components/orders/stock-detail/StockDetailTabs.tsx";
import type { StockDetailTab } from "@/types/orders.ts";
import { useState } from "react";
import StockDetail from "@/components/orders/stock-detail/StockDetail.tsx";

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
    <div className="flex flex-col h-full min-w-[712px] min-h-[calc(100vh-52px)] mx-5">
      <StockTitle symbol={symbol} />
      <StockDetailTabs
        stockDetailTab={stockDetailTab}
        onChangeStockDetailTab={handleChangeStockDetailTab}
      />
      <section className="flex-1 mb-6">
        {type === "order" && <StockDetail />}
      </section>
    </div>
  );
}

export default StockOrders;
