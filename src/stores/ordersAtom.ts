import { atom } from "jotai";
import type { ChartTimeFrame } from "@/types/orders.ts";

export const symbolAtom = atom<string | null>(null);
export const selectedChartTFAtom = atom<ChartTimeFrame>("1");
export const chartTFMinAtom = atom<ChartTimeFrame>("1");
