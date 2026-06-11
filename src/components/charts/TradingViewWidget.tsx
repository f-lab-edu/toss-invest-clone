// TradingViewWidget.jsx
import { useEffect, useRef, memo } from "react";
import { useAtomValue } from "jotai";
import { selectedChartTFAtom, symbolAtom } from "@/stores/ordersAtom.ts";

function TradingViewWidget() {
  const container = useRef<HTMLDivElement | null>(null);
  const scriptRef = useRef<Element | null>(null);
  const symbolAtomValue = useAtomValue(symbolAtom);
  const chartTFAtomValue = useAtomValue(selectedChartTFAtom);

  useEffect(() => {
    if (!container.current || scriptRef.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "allow_symbol_change": false,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": true,
          "hide_legend": true,
          "hide_volume": true,
          "hotlist": false,
          "interval": "${chartTFAtomValue}",
          "locale": "kr",
          "save_image": false,
          "style": "1",
          "symbol": "NASDAQ:${symbolAtomValue}",
          "theme": "light",
          "timezone": "Asia/Seoul",
          "backgroundColor": "#ffffff",
          "gridColor": "rgba(156, 156, 156, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        }`;

    scriptRef.current = script;
    if (container.current) container.current.appendChild(script);
    return () => {
      scriptRef.current?.remove();
      scriptRef.current = null;
    };
  }, [symbolAtomValue, chartTFAtomValue]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "100%", width: "100%" }}
      ></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://kr.tradingview.com/symbols/NASDAQ-AAPL/?exchange=NASDAQ"
          rel="noopener nofollow"
          target="_blank"
        ></a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
