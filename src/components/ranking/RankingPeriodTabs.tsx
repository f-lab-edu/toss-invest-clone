import type { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import type { Period } from "@/types/ranking.ts";

type RankingPeriodTabsProps = {
  selectedRankingPeriod: Period;
  rankingPeriods: Period[];
  onRankingPeriodChange: (period: Period) => void;
};

const getPeriodText = (period: Period) => {
  switch (period) {
    case "rt":
      return "실시간";
    case "1d":
      return "1일";
    case "7d":
      return "1주일";
    case "1m":
      return "1개월";
    case "3m":
      return "3개월";
    case "6m":
      return "6개월";
    default:
      return "1년";
  }
};

const RankingPeriodTabs: FC<RankingPeriodTabsProps> = ({
  selectedRankingPeriod,
  rankingPeriods,
  onRankingPeriodChange,
}) => {
  return (
    <Tabs
      value={selectedRankingPeriod}
      onValueChange={(value: string) => onRankingPeriodChange(value as Period)}
    >
      <TabsList>
        {rankingPeriods.map((period) => (
          <TabsTrigger key={period} value={period}>
            {getPeriodText(period)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
export default RankingPeriodTabs;
