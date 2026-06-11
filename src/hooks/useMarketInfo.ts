import { useMemo } from "react";
import { fetchMarketInfo } from "@/apis/market.ts";
import type { MarketInfo } from "@/types/market.ts";
import { useQuery } from "@tanstack/react-query";

export const useMarketInfo = () => {
  const isoDate = new Date().toISOString().slice(0, 10);

  const { data: marketInfoData, isLoading } = useQuery({
    queryKey: ["marketInfo", isoDate],
    queryFn: () => fetchMarketInfo(isoDate),
  });

  const marketInfo: MarketInfo | undefined = useMemo(() => {
    if (!marketInfoData) {
      return {
        startDateTime: null,
        endDateTime: null,
        marketName: "장 닫힘",
      };
    }
    const isoDateTime = new Date();
    const session_open = new Date(marketInfoData.session_open);
    const open_time = new Date(marketInfoData.open_time);
    const close_time = new Date(marketInfoData.close_time);
    const session_close = new Date(marketInfoData.session_close);

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
  }, [marketInfoData]);

  return { isMarketInfoLoading: isLoading, marketInfo };
};
