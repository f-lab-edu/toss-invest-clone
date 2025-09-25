import { useNavigate, useParams } from "react-router";
import StockTitle from "@/components/orders/StockTitle.tsx";
import StockDetailTabs from "@/components/orders/stock-detail/StockDetailTabs.tsx";
import type { StockDetailTab } from "@/types/orders.ts";
import { useEffect, useState } from "react";
import StockDetail from "@/components/orders/stock-detail/StockDetail.tsx";
import StockAnalytics from "@/components/orders/StockAnalytics.tsx";
import StockNews from "@/components/orders/StockNews.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchRecentDailyPrice, fetchSymbolInfo } from "@/apis/symbol.ts";
import { useStockDetailWebSocket } from "@/hooks/useStockDetailWebSocket.ts";
import { symbolAtom } from "@/stores/ordersAtom.ts";
import { useSetAtom } from "jotai";
import { useSymbolTimeSeries } from "@/hooks/useSymbolTimeSeries.ts";
import TickerTapeWidget from "@/components/charts/TickerTapeWidget.tsx";

function StockOrders() {
  const navigate = useNavigate();
  const { symbol, type } = useParams<{
    symbol: string;
    type: StockDetailTab;
  }>();

  const setSymbolAtomValue = useSetAtom(symbolAtom);
  const [stockDetailTab, setStockDetailTab] = useState<StockDetailTab>(
    type ?? "order",
  );

  useEffect(() => {
    if (!symbol) return;
    setSymbolAtomValue(symbol);
  }, [symbol, setSymbolAtomValue]);

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

  const { timeSeriesItems } = useSymbolTimeSeries(symbol!);

  const prevClosePrice = timeSeriesItems[0]?.close;

  const { rtSymbolPrice } = useStockDetailWebSocket(
    symbol!,
    symbolPrice?.close,
  );

  const handleChangeStockDetailTab = (next: StockDetailTab) => {
    setStockDetailTab(next);
    return navigate(`/stocks/${symbol}/${next}`, { replace: true });
  };

  return (
    <main className="flex flex-col min-h-[calc(100vh-52px)] mx-5 min-h-0">
      {symbolInfo && (
        <StockTitle
          symbolInfo={symbolInfo}
          currentPrice={rtSymbolPrice ?? symbolPrice?.open}
          closePrice={prevClosePrice}
        />
      )}
      <StockDetailTabs
        stockDetailTab={stockDetailTab}
        onChangeStockDetailTab={handleChangeStockDetailTab}
      />
      <div className="flex-1">
        {type === "order" && <StockDetail />}
        {type === "analytics" && <StockAnalytics />}
        {type === "news" && <StockNews />}
      </div>
      <footer className="sticky right-0 bottom-0 w-full z-10">
        <TickerTapeWidget />
      </footer>
    </main>
  );
}

export default StockOrders;
