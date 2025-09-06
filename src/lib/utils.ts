import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const range = (n: number): number[] =>
  n > 0 ? Array.from({ length: n }, (_, i) => i + 1) : [];

export const rangeInclusive = (start: number, end: number): number[] =>
  end >= start
    ? Array.from({ length: end - start + 1 }, (_, i) => start + i)
    : [];
