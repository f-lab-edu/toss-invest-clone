import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useRef, useState } from "react";
import { type MSGRow, WS_URL } from "@/types/websocket.ts";

export const useStockDetailWebSocket = (
  symbol: string,
  initialPrice: number,
) => {
  const authedRef = useRef(false);
  const lastMessages = useRef<MSGRow[]>([]);
  const [rtSymbolPrice, setRTSymbolPrice] = useState<number>(initialPrice);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: true,
      retryOnError: true, // 에러 발생 시 다시 구동
      shouldReconnect: () => true, // 지정된 간격으로 연결 다시 시도
      reconnectInterval: (n) => Math.min(1000 * 2 ** n, 10000), // 간격
    },
  );

  useEffect(() => {
    if (readyState !== ReadyState.OPEN || authedRef.current) return;

    sendJsonMessage({
      action: "auth",
      key: import.meta.env.VITE_ALPACA_KEY,
      secret: import.meta.env.VITE_ALPACA_SECRET_KEY,
    });
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    const msgs = Array.isArray(lastJsonMessage)
      ? lastJsonMessage
      : [lastJsonMessage];

    // 소켓 에러일 때 강제 새로고침
    if (msgs[0].T === "error") {
      window.location.reload();
    }

    if (msgs[0].T === "success" && msgs[0].msg === "authenticated") {
      authedRef.current = true;

      sendJsonMessage({
        action: "subscribe",
        trades: [symbol],
      });
    }

    const prevMessages = lastMessages.current;
    lastMessages.current = [...prevMessages, ...msgs];
  }, [lastJsonMessage]);

  useEffect(() => {
    const id = setInterval(() => {
      const messages = lastMessages.current;
      setRTSymbolPrice((prevPrice) => {
        // 최신 거래 가격 찾기
        for (let i = messages.length - 1; i >= 0; i--) {
          const msg = messages[i];
          if (msg.T === "t" && msg.S === symbol) {
            return msg.p;
          }
        }
        return prevPrice;
      });
    }, 500);

    return () => clearInterval(id);
  }, [symbol]);

  return { rtSymbolPrice };
};
