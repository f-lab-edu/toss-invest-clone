export type MarketInfo = {
  startDateTime: Date | null;
  endDateTime: Date | null;
  marketName: "프리마켓" | "정규장" | "애프터마켓" | "장 닫힘";
};
