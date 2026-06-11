import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSymbolTimeSeries } from "@/apis/symbol.ts";
import type { Cursor } from "@/types/orders.ts";
import { useSetAtom } from "jotai";
import { prevClosePriceAtom } from "@/stores/ordersAtom.ts";

export const useSymbolTimeSeries = (symbol: string, pageSize: number = 10) => {
  const setPrevClosePrice = useSetAtom(prevClosePriceAtom);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["symbol-time-series", symbol, pageSize],
    initialPageParam: null,
    queryFn: ({ pageParam }: { pageParam: Cursor | null }) =>
      fetchSymbolTimeSeries(symbol, pageParam, pageSize),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
  });

  const timeSeriesItems = data?.pages.flatMap((p) => p.items) ?? [];
  setPrevClosePrice(timeSeriesItems[0]?.close);

  return {
    timeSeriesItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
