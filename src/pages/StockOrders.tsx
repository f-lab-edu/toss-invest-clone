import { useNavigate, useParams } from "react-router";
import StockTitle from "@/components/orders/StockTitle.tsx";
import StockDetailTabs from "@/components/orders/stock-detail/StockDetailTabs.tsx";
import type { StockDetailTab } from "@/types/orders.ts";
import { useState } from "react";
import StockDetail from "@/components/orders/stock-detail/StockDetail.tsx";
import StockAnalytics from "@/components/orders/StockAnalytics.tsx";
import StockNews from "@/components/orders/StockNews.tsx";
import { useQuery } from "@tanstack/react-query";
import {
  fetchRecentDailyPrice,
  fetchSymbolInfo,
  fetchSymbolTimeSeries,
} from "@/apis/symbol.ts";
import { useStockDetailWebSocket } from "@/hooks/useStockDetailWebSocket.ts";

function StockOrders() {
  const navigate = useNavigate();
  const { symbol, type } = useParams<{
    symbol: string;
    type: StockDetailTab;
  }>();
  const [stockDetailTab, setStockDetailTab] = useState<StockDetailTab>(
    type ?? "order",
  );

  const { data: symbolInfo } = useQuery({
    queryKey: ["symbol-info", symbol],
    queryFn: () => fetchSymbolInfo(symbol!),
    enabled: !!symbol,
  });

  const { data: symbolPrice } = useQuery({
    queryKey: ["symbol-price", symbol],
    queryFn: () => fetchRecentDailyPrice(symbol!),
    enabled: !!symbol,
  });

  const { data: symbolTimeSeries } = useQuery({
    queryKey: ["symbol-time-series", symbol],
    queryFn: () => fetchSymbolTimeSeries(symbol!),
    enabled: !!symbol,
  });

  const { rtSymbolPrice } = useStockDetailWebSocket(
    symbol!,
    symbolPrice?.close,
  );

  const handleChangeStockDetailTab = (next: StockDetailTab) => {
    setStockDetailTab(next);
    return navigate(`/stocks/${symbol}/${next}`, { replace: true });
  };

  return (
    <main className="flex flex-col min-w-[712px] mx-5 min-h-0">
      {symbolInfo && (
        <StockTitle
          symbolInfo={symbolInfo}
          currentPrice={rtSymbolPrice ?? symbolPrice?.open}
          closePrice={symbolTimeSeries?.[0]?.close}
        />
      )}
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
