import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useRef, useState } from "react";
import type { RankingItem } from "@/types/ranking.ts";

const WS_URL = "wss://stream.data.alpaca.markets/v2/delayed_sip";
type RTRow = { symbol: string; last?: number; size?: number; ts?: string };
type MSGRow = {
  S: string;
  T: string;
  c: Array<string>;
  i: number;
  p: number;
  s: number;
  t: string;
};

export const useStockWebSocket = (rankingPageItems: RankingItem[]) => {
  const prevSymbolsRef = useRef<string[]>([]);
  const authedRef = useRef(false);
  const lastMessages = useRef<MSGRow[]>([]);
  const [rtSymbols, setRTSymbols] = useState<RTRow[]>([]);

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
    if (readyState !== ReadyState.OPEN) return;

    const next = rankingPageItems.map(
      (stockInfo: RankingItem) => stockInfo.symbol,
    );

    const prev = prevSymbolsRef.current;
    const added = next.filter((sym: string) => !prev.includes(sym));
    const removed = prev.filter((sym: string) => !next.includes(sym));

    if (removed.length > 0) {
      sendJsonMessage({
        action: "unsubscribe",
        trades: removed,
      });
    }
    if (added.length > 0) {
      sendJsonMessage({
        action: "subscribe",
        trades: added,
      });
    }

    prevSymbolsRef.current = next;
    lastMessages.current = [];
  }, [rankingPageItems, readyState, sendJsonMessage]);

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
    }

    const prevMessages = lastMessages.current;
    lastMessages.current = [...prevMessages, ...msgs];
  }, [lastJsonMessage]);

  useEffect(() => {
    const id = setInterval(() => {
      setRTSymbols((prev) => {
        const next = [...prev];
        const messages = lastMessages.current;

        for (const msg of messages) {
          if (msg.T !== "t") continue;
          const sym = msg.S;
          const idx = next.findIndex((r) => r.symbol === sym);
          const upd: RTRow = {
            symbol: msg.S,
            last: msg.p,
            size: msg.s,
            ts: msg.t,
          };
          if (idx >= 0) next[idx] = { ...upd };
          else next.push(upd);
        }
        return next;
      });
    }, 500);

    return () => clearInterval(id);
  }, []);

  return { rtSymbols };
};
