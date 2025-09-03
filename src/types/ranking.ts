export type Category = "notional" | "volume" | "gainers" | "losers";

export type Period = "rt" | "1d" | "7d" | "1m" | "3m" | "6m" | "1y";

export const PERIODS_BY_CATEGORY: Record<Category, Period[]> = {
  notional: ["rt", "1d", "7d", "1m", "3m", "6m", "1y"],
  volume: ["rt", "1d", "7d", "1m", "3m", "6m", "1y"],
  gainers: ["1d", "7d", "1m", "3m", "6m", "1y"], // 실시간 제외
  losers: ["1d", "7d", "1m", "3m", "6m", "1y"], // 실시간 제외
};

export type Stock = {
  rank: number;
  productCode: string;
  name: string;
  logoImageUrl: string;
  price: {
    base: number;
    close: number;
    Volume?: number;
    Amount?: number;
  };
  extraInfo: {
    Buy: number;
    Sell: number;
  };
};
