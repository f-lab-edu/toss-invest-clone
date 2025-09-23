import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Period } from "@/types/ranking.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatHHmm = (d: Date) => {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export const formatMMDD = (d: Date) => {
  return `${String(d.getMonth() + 1)}월 ${String(d.getDate())}일`;
};

export const range = (n: number): number[] =>
  n > 0 ? Array.from({ length: n }, (_, i) => i + 1) : [];

export const rangeInclusive = (start: number, end: number): number[] =>
  end >= start
    ? Array.from({ length: end - start + 1 }, (_, i) => start + i)
    : [];

export function commaFormat(number: number | undefined | null): string {
  if (number === undefined || number === null) {
    return "0";
  }
  return number.toLocaleString("en-US");
}

export const getNotionalText = (value: number) => {
  if (value < 10000000) {
    return commaFormat(Math.round(value));
  } else if (value < 100000000) {
    return commaFormat(Math.round(value / 1000)) + "만";
  } else if (value < 1000000000000) {
    return commaFormat(Math.round(value / 10000000) / 10) + "억";
  } else {
    return commaFormat(Math.round(value / 100000000000) / 10) + "조";
  }
};

export const getPeriodText = (period: Period) => {
  switch (period) {
    case "RT":
      return "실시간";
    case "1D":
      return "1일";
    case "7D":
      return "1주일";
    case "1M":
      return "1개월";
    case "3M":
      return "3개월";
    case "6M":
      return "6개월";
    default:
      return "1년";
  }
};

export function calculateChangeRate(
  current: number,
  anchor: number,
): {
  변화량: number;
  변화량Text: string;
  등락률: number;
  등락률Text: string;
  fixed: number;
  changeTextClass: string;
} {
  const 변화량 = current - anchor;
  const 등락률 = (변화량 / anchor) * 100;
  const fixed = Math.abs(등락률) >= 0.1 ? 1 : 2;
  const sign = 등락률 > 0 ? "+" : "-";
  const 등락률Text = `${sign}${Math.abs(등락률).toFixed(fixed)}`;
  const 변화량Text = `${sign}$${Math.abs(변화량).toFixed(fixed)}`;
  const changeTextClass = 등락률 > 0 ? "text-red-500" : "text-blue-600";

  return { 변화량, 변화량Text, 등락률, 등락률Text, fixed, changeTextClass };
}
