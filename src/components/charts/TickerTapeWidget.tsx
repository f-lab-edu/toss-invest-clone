import { memo, useEffect, useRef } from "react";

function TicketTapeWidget() {
  const container = useRef<HTMLDivElement | null>(null);
  const scriptRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!container.current || scriptRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "FX_IDC:USDKRW",
              "title": "달러 환율"
            },
            {
              "proName": "CBOE:VIX",
              "title": "VIX"
            },
            {
              "proName": "ICE:DX1!",
              "title": "달러 인덱스"
            },
            {
              "proName": "NASDAQ:NDX",
              "title": "나스닥"
            },
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500"
            },
            {
              "proName": "FOREXCOM:DJI",
              "title": "다우존스"
            }
          ],
          "colorTheme": "light",
          "locale": "kr",
          "largeChartUrl": "",
          "isTransparent": false,
          "showSymbolLogo": true,
          "displayMode": "adaptive"
        }`;
    scriptRef.current = script;
    if (container.current) container.current.appendChild(script);
    return () => {
      scriptRef.current?.remove();
      scriptRef.current = null;
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TicketTapeWidget);
