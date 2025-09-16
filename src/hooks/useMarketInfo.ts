import { useEffect, useMemo, useState } from "react";
import { fetchMarketInfo } from "@/apis/market.ts";

type MarketInfo = {
  startDateTime: Date | null;
  endDateTime: Date | null;
  marketName: "프리마켓" | "정규장" | "애프터마켓" | "장 닫힘";
};

type MarketCalendarRow = {
  trade_date: string;
  session_open: string;
  open_time: string;
  close_time: string;
  session_close: string;
};

export const useMarketInfo = () => {
  const [rowData, setRowData] = useState<MarketCalendarRow | undefined>();
  const isoDate = new Date().toISOString().slice(0, 10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await fetchMarketInfo(isoDate);
        setRowData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [isoDate]);

  const marketInfo: MarketInfo | undefined = useMemo(() => {
    if (!rowData) return;
    const isoDateTime = new Date();
    const session_open = new Date(rowData.session_open);
    const open_time = new Date(rowData.open_time);
    const close_time = new Date(rowData.close_time);
    const session_close = new Date(rowData.session_close);

    if (isoDateTime < session_open)
      return {
        startDateTime: null,
        endDateTime: new Date(session_open),
        marketName: "장 닫힘",
      };
    if (isoDateTime < open_time)
      return {
        startDateTime: new Date(session_open),
        endDateTime: new Date(open_time),
        marketName: "프리마켓",
      };
    if (isoDateTime < close_time)
      return {
        startDateTime: new Date(open_time),
        endDateTime: new Date(close_time),
        marketName: "정규장",
      };
    if (isoDateTime < session_close)
      return {
        startDateTime: new Date(close_time),
        endDateTime: new Date(session_close),
        marketName: "애프터마켓",
      };
    return {
      startDateTime: new Date(session_close),
      endDateTime: null,
      marketName: "장 닫힘",
    };
  }, [rowData]);

  return { loading, marketInfo };
};
