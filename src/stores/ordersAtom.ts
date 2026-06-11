import { atom } from "jotai";
import type { ChartTimeFrame } from "@/types/orders.ts";
import type { SocketMsgRow } from "@/types/websocket.ts";

export const symbolAtom = atom<string | null>(null);
export const selectedChartTFAtom = atom<ChartTimeFrame>("1");
export const chartTFMinAtom = atom<ChartTimeFrame>("1");
export const realtimeSeriesAtom = atom<SocketMsgRow[] | null>(null);
export const prevClosePriceAtom = atom<number>(0);
